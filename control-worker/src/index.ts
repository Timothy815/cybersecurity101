type KVStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
};

type Env = {
  SESSIONS: KVStore;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  ALLOWED_GITHUB_USER_ID: string;
  CONTROL_ORIGIN: string;
  CONTROL_RETURN_URL: string;
  REPOSITORY: string;
  BRANCH: string;
};

type Session = { accessToken: string; login: string; userId: number };

const catalogPath = "content/article-settings.json";
const githubHeaders = (token: string) => ({
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${token}`,
  "X-GitHub-Api-Version": "2026-03-10",
  "User-Agent": "cybersecurity101-control",
});

function randomToken(bytes = 32) {
  const data = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...data)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return btoa(String.fromCharCode(...new Uint8Array(digest))).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function cors(env: Env) {
  return {
    "Access-Control-Allow-Origin": env.CONTROL_ORIGIN,
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, PUT, POST, OPTIONS",
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
  };
}

function json(env: Env, body: unknown, status = 200) {
  return Response.json(body, { status, headers: cors(env) });
}

function allowedReturnUrl(value: string | null, env: Env) {
  if (!value) return env.CONTROL_RETURN_URL;
  try {
    const url = new URL(value);
    const expected = new URL(env.CONTROL_RETURN_URL);
    return url.origin === expected.origin && url.pathname === expected.pathname ? url.toString() : env.CONTROL_RETURN_URL;
  } catch { return env.CONTROL_RETURN_URL; }
}

async function sessionFor(request: Request, env: Env) {
  const token = request.headers.get("Authorization")?.match(/^Bearer ([A-Za-z0-9_-]{32,})$/)?.[1];
  if (!token) return null;
  const stored = await env.SESSIONS.get(`session:${token}`);
  return stored ? { token, value: JSON.parse(stored) as Session } : null;
}

function decodeBase64(value: string) {
  const bytes = Uint8Array.from(atob(value.replaceAll("\n", "")), character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function cleanString(value: unknown, label: string, max: number) {
  if (typeof value !== "string" || !value.trim() || value.length > max) throw new Error(`${label} is invalid.`);
  return value.trim();
}

function validateArticles(input: unknown) {
  if (!Array.isArray(input) || input.length < 3 || input.length > 200) throw new Error("The catalog size is invalid.");
  const slugs = new Set<string>();
  const articles = input.map((candidate, order) => {
    if (!candidate || typeof candidate !== "object") throw new Error("An article record is invalid.");
    const item = candidate as Record<string, unknown>;
    const slug = cleanString(item.slug, "Slug", 80);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugs.has(slug)) throw new Error(`The slug ${slug} is invalid or duplicated.`);
    slugs.add(slug);
    const kind = item.kind === "Dispatch" || item.kind === "Course document" ? item.kind : null;
    if (!kind) throw new Error(`The article type for ${slug} is invalid.`);
    const published = cleanString(item.published, "Publication date", 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(published) || Number.isNaN(Date.parse(`${published}T00:00:00Z`))) throw new Error(`The publication date for ${slug} is invalid.`);
    const href = cleanString(item.href, "Article path", 140);
    const pdfHref = cleanString(item.pdfHref, "PDF path", 180);
    if (!href.startsWith("/") || href.includes("..") || !pdfHref.startsWith("/articles/pdfs/") || !pdfHref.endsWith(".pdf") || pdfHref.includes("..")) throw new Error(`A publication path for ${slug} is invalid.`);
    const slidesHref = typeof item.slidesHref === "string" && item.slidesHref.trim() ? item.slidesHref.trim() : undefined;
    if (slidesHref && (slidesHref.length > 180 || !slidesHref.startsWith("/articles/slides/") || !slidesHref.endsWith(".pdf") || slidesHref.includes(".."))) throw new Error(`The slide path for ${slug} is invalid.`);
    const permanent = Boolean(item.permanent);
    const visible = permanent ? true : Boolean(item.visible);
    const bodyMarkdown = typeof item.bodyMarkdown === "string" ? item.bodyMarkdown.trim() : undefined;
    if (bodyMarkdown && bodyMarkdown.length > 60000) throw new Error(`${slug} is longer than the 60,000-character limit.`);
    if (bodyMarkdown && /<\s*(script|iframe|object|embed)\b/i.test(bodyMarkdown)) throw new Error(`${slug} contains disallowed embedded HTML.`);
    if (bodyMarkdown) {
      const discussion = /(?:^|\n)##\s+Questions (?:for Discussion|Worth Arguing About)\s*\n([\s\S]*)$/i.exec(bodyMarkdown);
      const questionLines = discussion?.[1].split("\n").map(line => line.trim()).filter(Boolean) ?? [];
      if (questionLines.length < 2 || questionLines.some(line => !/^\d+\.\s+.+\?$/.test(line))) throw new Error(`${slug} must end with separately numbered discussion questions.`);
    }
    return {
      slug,
      title: cleanString(item.title, "Title", 180),
      subtitle: cleanString(item.subtitle, "Subtitle", 320),
      deck: cleanString(item.deck ?? item.subtitle, "Deck", 320),
      published,
      subject: cleanString(item.subject, "Subject", 80),
      kind,
      readTime: cleanString(item.readTime, "Read time", 30),
      href,
      pdfHref,
      ...(slidesHref ? { slidesHref } : {}),
      ...(kind === "Dispatch" ? { edition: Math.max(1, Math.min(999, Number(item.edition) || 1)) } : {}),
      visible,
      ...(permanent ? { permanent: true } : {}),
      order,
      ...(bodyMarkdown ? { bodyMarkdown } : {}),
    };
  });
  if (!articles.some(article => article.kind === "Dispatch" && article.visible)) throw new Error("At least one dispatch must remain visible.");
  for (const required of ["course-syllabus", "acceptable-use-policy"]) if (!articles.some(article => article.slug === required && article.permanent)) throw new Error(`The permanent ${required} record cannot be removed.`);
  return articles;
}

async function githubCatalog(env: Env, session: Session) {
  const response = await fetch(`https://api.github.com/repos/${env.REPOSITORY}/contents/${catalogPath}?ref=${encodeURIComponent(env.BRANCH)}`, { headers: githubHeaders(session.accessToken) });
  if (!response.ok) throw new Error(`GitHub returned ${response.status} while reading the catalog.`);
  return response.json() as Promise<{ content: string; sha: string }>;
}

async function handle(request: Request, env: Env) {
  const url = new URL(request.url);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(env) });

  if (url.pathname === "/auth/start" && request.method === "GET") {
    const state = randomToken();
    const verifier = randomToken(48);
    const returnTo = allowedReturnUrl(url.searchParams.get("return_to"), env);
    await env.SESSIONS.put(`oauth:${state}`, JSON.stringify({ verifier, returnTo }), { expirationTtl: 600 });
    const callback = `${url.origin}/auth/callback`;
    const authorize = new URL("https://github.com/login/oauth/authorize");
    authorize.search = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, redirect_uri: callback, state, code_challenge: await sha256(verifier), code_challenge_method: "S256", allow_signup: "false" }).toString();
    return Response.redirect(authorize.toString(), 302);
  }

  if (url.pathname === "/auth/callback" && request.method === "GET") {
    const state = url.searchParams.get("state") ?? "";
    const code = url.searchParams.get("code") ?? "";
    const stored = await env.SESSIONS.get(`oauth:${state}`);
    await env.SESSIONS.delete(`oauth:${state}`);
    if (!stored || !code) return json(env, { message: "The sign-in request expired or was invalid." }, 400);
    const { verifier, returnTo } = JSON.parse(stored) as { verifier: string; returnTo: string };
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${url.origin}/auth/callback`, code_verifier: verifier }),
    });
    const tokenData = await tokenResponse.json() as { access_token?: string; expires_in?: number; error?: string; error_description?: string; message?: string };
    if (!tokenData.access_token) return json(env, { message: tokenData.error_description ?? tokenData.error ?? tokenData.message ?? "GitHub sign-in failed." }, 401);
    const userResponse = await fetch("https://api.github.com/user", { headers: githubHeaders(tokenData.access_token) });
    const user = await userResponse.json() as { id?: number; login?: string };
    if (!user.id || String(user.id) !== env.ALLOWED_GITHUB_USER_ID) return json(env, { message: "This GitHub account is not authorized to publish this site." }, 403);
    const session = randomToken(36);
    const ttl = Math.max(900, Math.min(tokenData.expires_in ?? 28800, 28800));
    await env.SESSIONS.put(`session:${session}`, JSON.stringify({ accessToken: tokenData.access_token, login: user.login, userId: user.id }), { expirationTtl: ttl });
    return Response.redirect(`${allowedReturnUrl(returnTo, env)}#session=${session}`, 302);
  }

  if (url.pathname === "/api/logout" && request.method === "POST") {
    const session = await sessionFor(request, env);
    if (session) await env.SESSIONS.delete(`session:${session.token}`);
    return json(env, { ok: true });
  }

  if (url.pathname === "/api/articles") {
    if (request.headers.get("Origin") !== env.CONTROL_ORIGIN) return json(env, { message: "This request origin is not allowed." }, 403);
    const authenticated = await sessionFor(request, env);
    if (!authenticated) return json(env, { message: "Authentication is required." }, 401);
    if (request.method === "GET") {
      try {
        const file = await githubCatalog(env, authenticated.value);
        return json(env, { articles: JSON.parse(decodeBase64(file.content)), sha: file.sha, user: authenticated.value.login });
      } catch (error) { return json(env, { message: error instanceof Error ? error.message : "Unable to read the catalog." }, 502); }
    }
    if (request.method === "PUT") {
      try {
        const raw = await request.text();
        if (raw.length > 950000) return json(env, { message: "The catalog payload is too large." }, 413);
        const payload = JSON.parse(raw) as { articles?: unknown; sha?: unknown };
        const articles = validateArticles(payload.articles);
        const sha = cleanString(payload.sha, "Catalog revision", 80);
        const response = await fetch(`https://api.github.com/repos/${env.REPOSITORY}/contents/${catalogPath}`, {
          method: "PUT",
          headers: { ...githubHeaders(authenticated.value.accessToken), "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Publish classroom article settings", content: encodeBase64(`${JSON.stringify(articles, null, 2)}\n`), sha, branch: env.BRANCH }),
        });
        const result = await response.json() as { content?: { sha?: string }; commit?: { html_url?: string }; message?: string };
        if (!response.ok) return json(env, { message: response.status === 409 ? "The catalog changed elsewhere. Reload before publishing again." : result.message ?? `GitHub returned ${response.status}.` }, response.status === 409 ? 409 : 502);
        return json(env, { sha: result.content?.sha, commitUrl: result.commit?.html_url });
      } catch (error) { return json(env, { message: error instanceof Error ? error.message : "The catalog update was rejected." }, 400); }
    }
  }

  return json(env, { message: "Not found." }, 404);
}

const worker = { fetch: handle };
export default worker;
