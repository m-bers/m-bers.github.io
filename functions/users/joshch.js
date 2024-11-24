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
        "name": "Josh Chambers",
        "summary": "Liberal means liberty",
        "url": "https://mbe.rs/@joshch",
        "inbox": "https://mbe.rs/users/joshch/inbox",
        "outbox": "https://mbe.rs/users/joshch/outbox",
        "followers": "https://mbe.rs/users/joshch/followers",
        "publicKey": {
          "id": "https://mbe.rs/users/joshch#main-key",
          "owner": "https://mbe.rs/users/joshch",
          "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsrSAIjXgHdFumW1dFc90\n5tVZIg933//WRA7DuN4a+TijFstQxKjXfH9YF1/PDPaHINU3dEuMoF+BO1jJgAT1\nB9jfF1jkDcrk1LQHpN1GHXd4JUlY3KO4eG54jsFxo93+rs3usllyswhQzCBXhKky\n8or7CS8O4vxadQXJyCSDUzwgZRuRBtAPqNfoVu4iQ0q8mPqLxw7jyFuMu7R4EH0I\nPIETSV2O0dw9ngkQOfezcIbg5oQ3xPlN/DtW0ICa9Mt1BYvhjzYtzIneJX/dI8C2\nboXG36qckRCq9oVL7kyYrhfFGmpDYUCZCFOypBoXKNpeMHDreDpfjespPqHR6WcK\nLwIDAQAB\n-----END PUBLIC KEY-----\n"
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
  