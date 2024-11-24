export async function onRequest(context) {
  const url = new URL(context.request.url);
  const resource = url.searchParams.get("resource");

  // Check if the resource matches the alias
  if (resource === "acct:joshch@mbe.rs") {
    // Return the WebFinger JSON for the alias
    return new Response(JSON.stringify({
      subject: "acct:joshch@mbe.rs",
      aliases: [
        "https://mastodon.social/@mbers",
        "https://mastodon.social/users/mbers"
      ],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: "https://mastodon.social/@mbers"
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: "https://mastodon.social/users/mbers"
        },
        {
          rel: "http://ostatus.org/schema/1.0/subscribe",
          template: "https://mastodon.social/authorize_interaction?uri={uri}"
        },
        {
          rel: "http://webfinger.net/rel/avatar",
          type: "image/jpeg",
          href: "https://files.mastodon.social/accounts/avatars/109/520/867/471/046/500/original/0f6e0d3701ebe041.jpg"
        }
      ]
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  // Otherwise, return 404 for unknown resources
  return new Response("Not Found", { status: 404 });
}
