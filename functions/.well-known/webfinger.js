export async function onRequest(context) {
    const url = `https://mastodon.social/.well-known/webfinger?${context.request.url.split('?')[1]}`;
    return fetch(url, context.request);
  }
  