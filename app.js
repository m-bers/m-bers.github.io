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

// Recursively render replies
function renderReplies(reply, level = 1) {
    if (!reply) return '';

    const { author, record, replyCount } = reply;
    const padding = 20 * level; // Indent replies

    return `
        <div class="bluesky-reply" style="margin-left: ${padding}px;">
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
                <span>❤️ ${reply.likeCount || 0}</span>
                <span>🔄 ${reply.repostCount || 0}</span>
                <span>💬 ${replyCount || 0}</span>
            </div>
        </div>
        ${renderReplies(reply.parent, level + 1)} <!-- Render parent recursively -->
    `;
}

// Render the feed
function renderBlueskyFeed(feed) {
    const container = document.getElementById('bluesky-feed');
    container.innerHTML = ''; // Clear previous content

    feed.forEach(item => {
        const post = item.post;
        const author = post.author;

        // Render the main post
        const postHTML = `
            <div class="bluesky-post">
                <div class="bluesky-author">
                    <img src="${author.avatar}" alt="${author.displayName}" class="bluesky-avatar">
                    <div>
                        <div class="bluesky-name">${author.displayName}</div>
                        <div class="bluesky-handle">@${author.handle}</div>
                    </div>
                </div>
                <div class="bluesky-content">
                    <p>${post.record.text}</p>
                </div>
                <div class="bluesky-stats">
                    <span>❤️ ${post.likeCount || 0}</span>
                    <span>🔄 ${post.repostCount || 0}</span>
                    <span>💬 ${post.replyCount || 0}</span>
                </div>
                ${item.reply ? renderReplies(item.reply) : ''}
            </div>
        `;

        container.innerHTML += postHTML;
    });
}

// Fetch and render the feed on page load
document.addEventListener('DOMContentLoaded', async () => {
    const feed = await fetchBlueskyFeed();
    renderBlueskyFeed(feed);
});
