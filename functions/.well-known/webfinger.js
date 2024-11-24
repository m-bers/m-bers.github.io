export async function onRequest(context) {
  const url = new URL(context.request.url);
  const resource = url.searchParams.get("resource");

  if (resource === "acct:joshch@mbe.rs") {
    return new Response(
      JSON.stringify({
        subject: "acct:joshch@mbe.rs",
        aliases: [
          "https://mbe.rs/@joshch",
          "https://mbe.rs/users/joshch"
        ],
        links: [
          {
            rel: "self",
            type: "application/activity+json",
            href: "https://mbe.rs/users/joshch"
          },
          {
            rel: "http://webfinger.net/rel/profile-page",
            type: "text/html",
            href: "https://mbe.rs/@joshch"
          },
          {
            rel: "http://ostatus.org/schema/1.0/subscribe",
            template: "https://mastodon.social/authorize_interaction?uri={uri}"
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
