export async function onRequest(context) {
    return new Response(
      JSON.stringify({
        "@context": [
          "https://www.w3.org/ns/activitystreams",
          "https://w3id.org/security/v1"
        ],
        "id": "https://mbe.rs/users/joshch",
        "type": "Person",
        "preferredUsername": "joshch",
        "name": "Josh Ch",
        "summary": "This is my Fediverse alias.",
        "inbox": "https://mbe.rs/users/joshch/inbox",
        "outbox": "https://mbe.rs/users/joshch/outbox",
        "followers": "https://mbe.rs/users/joshch/followers",
        "following": "https://mbe.rs/users/joshch/following",
        "url": "https://mastodon.social/@mbers",
        "publicKey": {
          "id": "https://mbe.rs/users/joshch#main-key",
          "owner": "https://mbe.rs/users/joshch",
          "publicKeyPem": "YOUR_PUBLIC_KEY"
        }
      }),
      {
        headers: { "Content-Type": "application/activity+json" },
      }
    );
  }
  