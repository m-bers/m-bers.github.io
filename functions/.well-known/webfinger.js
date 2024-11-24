export async function onRequest(context) {
  const url = new URL(context.request.url);
  const resource = url.searchParams.get("resource");

  if (resource === "acct:joshch@mbe.rs") {
    return new Response(
      JSON.stringify({
        subject: "acct:joshch@mbe.rs",
        aliases: ["https://mastodon.social/@mbers"],
        links: [
          {
            rel: "self",
            type: "application/activity+json",
            href: "https://mbe.rs/users/joshch"
          },
          {
            rel: "http://webfinger.net/rel/profile-page",
            type: "text/html",
            href: "https://mastodon.social/@mbers"
          }
        ]
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response("Not Found", { status: 404 });
}
