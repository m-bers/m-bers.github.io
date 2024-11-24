export async function onRequest(context) {
    return new Response(
      JSON.stringify({
        "@context": [
          "https://www.w3.org/ns/activitystreams",
          "https://w3id.org/security/v1",
          {
            "manuallyApprovesFollowers": "as:manuallyApprovesFollowers",
            "toot": "http://joinmastodon.org/ns#",
            "featured": {
              "@id": "toot:featured",
              "@type": "@id"
            },
            "featuredTags": {
              "@id": "toot:featuredTags",
              "@type": "@id"
            },
            "alsoKnownAs": {
              "@id": "as:alsoKnownAs",
              "@type": "@id"
            },
            "movedTo": {
              "@id": "as:movedTo",
              "@type": "@id"
            },
            "schema": "http://schema.org#",
            "PropertyValue": "schema:PropertyValue",
            "value": "schema:value",
            "discoverable": "toot:discoverable",
            "suspended": "toot:suspended",
            "memorial": "toot:memorial",
            "indexable": "toot:indexable",
            "attributionDomains": {
              "@id": "toot:attributionDomains",
              "@type": "@id"
            },
            "focalPoint": {
              "@container": "@list",
              "@id": "toot:focalPoint"
            }
          }
        ],
        "id": "https://mbe.rs/users/joshch",
        "type": "Person",
        "following": "https://mastodon.social/users/mbers/following",
        "followers": "https://mastodon.social/users/mbers/followers",
        "inbox": "https://mastodon.social/users/mbers/inbox",
        "outbox": "https://mastodon.social/users/mbers/outbox",
        "featured": "https://mastodon.social/users/mbers/collections/featured",
        "featuredTags": "https://mastodon.social/users/mbers/collections/tags",
        "preferredUsername": "joshch",
        "name": "Josh Chambers",
        "summary": "<p>Liberal means liberty</p>",
        "url": "https://mastodon.social/@mbers",
        "manuallyApprovesFollowers": false,
        "discoverable": false,
        "indexable": false,
        "published": "2022-12-16T00:00:00Z",
        "memorial": false,
        "publicKey": {
          "id": "https://mbe.rs/users/joshch#main-key",
          "owner": "https://mbe.rs/users/joshch",
          "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsrSAIjXgHdFumW1dFc90\n5tVZIg933//WRA7DuN4a+TijFstQxKjXfH9YF1/PDPaHINU3dEuMoF+BO1jJgAT1\nB9jfF1jkDcrk1LQHpN1GHXd4JUlY3KO4eG54jsFxo93+rs3usllyswhQzCBXhKky\n8or7CS8O4vxadQXJyCSDUzwgZRuRBtAPqNfoVu4iQ0q8mPqLxw7jyFuMu7R4EH0I\nPIETSV2O0dw9ngkQOfezcIbg5oQ3xPlN/DtW0ICa9Mt1BYvhjzYtzIneJX/dI8C2\nboXG36qckRCq9oVL7kyYrhfFGmpDYUCZCFOypBoXKNpeMHDreDpfjespPqHR6WcK\nLwIDAQAB\n-----END PUBLIC KEY-----\n"
        },
        "tag": [],
        "attachment": [
          {
            "type": "PropertyValue",
            "name": "website",
            "value": "<a href=\"https://joshcha.mbe.rs\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\">https://joshcha.mbe.rs</a>"
          }
        ],
        "endpoints": {
          "sharedInbox": "https://mastodon.social/inbox"
        },
        "icon": {
          "type": "Image",
          "mediaType": "image/jpeg",
          "url": "https://files.mastodon.social/accounts/avatars/109/520/867/471/046/500/original/0f6e0d3701ebe041.jpg"
        }
      }),
      {
        headers: { "Content-Type": "application/activity+json" },
      }
    );
  }
  