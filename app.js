// Fetch the Bluesky feed
async function fetchBlueskyFeed() {
    const response = await fetch('https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=did%3Aplc%3A7ro33pumtighq5ssdp57hvr7&filter=posts_with_replies&includePins=true&limit=30');
    if (!response.ok) {
        console.error('Failed to fetch Bluesky feed');
        return [];
    }
    const data = await response.json();
    return data.feed;
}

// Helper to fetch a post by its URI
async function fetchPostByURI(uri) {
    const response = await fetch(uri.replace('at://', 'https://public.api.bsky.app/xrpc/app.bsky.feed.getPost?uri='));
    if (!response.ok) {
        console.warn(`Failed to fetch post: ${uri}`);
        return null;
    }
    const data = await response.json();
    return data.post || null;
}

// Render a single post (with author and content)
function renderSinglePost(post, level = 0) {
    const { author, record } = post;
    const padding = 20 * level; // Indent replies

    return `
        <div class="bluesky-post" style="margin-left: ${padding}px;">
            <div class="bluesky-author">
                <img src="${author.avatar}" alt="${author.displayName}" class="bluesky-avatar">
                <div>
                    <div class="bluesky-name">${author.displayName}</div>
                    <div class="bluesky-handle">@${author.handle}</div>
                </div>
            </div>
            <div class="bluesky-content">
                <p>${record.text}</p>
            </div>
        </div>
    `;
}

// Recursively render posts and their replies
async function renderPostWithReplies(post, level = 0) {
    let postHTML = '';

    // Render parent context
    if (post.record.reply?.parent) {
        const parent = await fetchPostByURI(post.record.reply.parent.uri);
        if (parent) {
            postHTML += await renderPostWithReplies(parent, level);
        }
    }

    // Render current post
    postHTML += renderSinglePost(post, level);

    return postHTML;
}

// Render the entire feed
async function renderBlueskyFeed(feed) {
    const container = document.getElementById('bluesky-feed');
    container.innerHTML = ''; // Clear previous content

    for (const item of feed) {
        const postHTML = await renderPostWithReplies(item.post);
        container.innerHTML += postHTML;
    }
}

// Fetch and render the feed on page load
document.addEventListener('DOMContentLoaded', async () => {
    const feed = await fetchBlueskyFeed();
    await renderBlueskyFeed(feed);
});
