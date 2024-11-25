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

// Recursively render posts and replies
function renderPost(post, level = 0) {
    const { author, record, replyCount } = post;
    const padding = 20 * level; // Indent replies based on nesting level

    let postHTML = `
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
            <div class="bluesky-stats">
                <span>❤️ ${post.likeCount || 0}</span>
                <span>🔄 ${post.repostCount || 0}</span>
                <span>💬 ${replyCount || 0}</span>
            </div>
        </div>
    `;

    // Check for nested replies
    if (post.reply) {
        const replyRoot = post.reply.root || post.reply.parent; // Choose the root or parent for threading
        if (replyRoot) {
            postHTML += renderPost(replyRoot, level + 1); // Render the reply recursively
        }
    }

    return postHTML;
}

// Render the entire feed
function renderBlueskyFeed(feed) {
    const container = document.getElementById('bluesky-feed');
    container.innerHTML = ''; // Clear previous content

    feed.forEach(item => {
        const postHTML = renderPost(item.post);
        container.innerHTML += postHTML;
    });
}

// Fetch and render the feed on page load
document.addEventListener('DOMContentLoaded', async () => {
    const feed = await fetchBlueskyFeed();
    renderBlueskyFeed(feed);
});
