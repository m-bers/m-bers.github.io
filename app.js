// Fetch the Bluesky feed
async function fetchBlueskyFeed() {
    const response = await fetch('https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=did%3Aplc%3A7ro33pumtighq5ssdp57hvr7&filter=posts_and_author_threads&includePins=true&limit=30');
    if (!response.ok) {
        console.error('Failed to fetch Bluesky feed');
        return [];
    }
    const data = await response.json();
    return data.feed;
}

// Render the feed
function renderBlueskyFeed(feed) {
    const container = document.getElementById('bluesky-feed');
    container.innerHTML = ''; // Clear previous content

    feed.forEach(item => {
        const post = item.post;
        const author = post.author;

        // Create post container
        const postDiv = document.createElement('div');
        postDiv.className = 'bluesky-post';

        // Author section
        const authorSection = `
            <div class="bluesky-author">
                <img src="${author.avatar}" alt="${author.displayName}" class="bluesky-avatar">
                <div>
                    <div class="bluesky-name">${author.displayName}</div>
                    <div class="bluesky-handle">@${author.handle}</div>
                </div>
            </div>
        `;

        // Post content
        const postContent = `
            <div class="bluesky-content">
                <p>${post.record.text}</p>
            </div>
        `;

        // Engagement stats
        const engagementStats = `
            <div class="bluesky-stats">
                <span>❤️ ${post.likeCount}</span>
                <span>🔄 ${post.repostCount}</span>
                <span>💬 ${post.replyCount}</span>
            </div>
        `;

        // Combine and append
        postDiv.innerHTML = authorSection + postContent + engagementStats;
        container.appendChild(postDiv);
    });
}

// Fetch and render the feed on page load
document.addEventListener('DOMContentLoaded', async () => {
    const feed = await fetchBlueskyFeed();
    renderBlueskyFeed(feed);
});
