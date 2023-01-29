export async function handler(r: Request): Promise<Response> {
  return new Response(new URL(r.url).pathname);
}
