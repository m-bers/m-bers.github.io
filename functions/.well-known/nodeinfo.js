export async function onRequest(context) {
    const url = `https://mastodon.social/.well-known/nodeinfo`;
    return fetch(url, context.request);
  }
  