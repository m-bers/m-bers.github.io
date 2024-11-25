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

// Render a single post or reply
function renderPost(post, level = 0) {
    const padding = 20 * level; // Indentation for nested replies
    const { author, record, replyCount } = post;

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
            <div class="bluesky-stats">
                <span>❤️ ${post.likeCount || 0}</span>
                <span>🔄 ${post.repostCount || 0}</span>
                <span>💬 ${replyCount || 0}</span>
            </div>
        </div>
    `;
}

// Recursively render replies, including parent and root context
function renderThread(post, feed, level = 0) {
    // Render the current post
    let threadHTML = renderPost(post, level);

    // Check if the post has a reply context (parent or root)
    if (post.reply) {
        const { parent, root } = post.reply;

        // If a parent exists, find it in the feed and render it
        if (parent) {
            const parentPost = feed.find(item => item.post.uri === parent.uri);
            if (parentPost) {
                threadHTML = renderThread(parentPost.post, feed, level - 1) + threadHTML;
            }
        }

        // If a root exists, ensure it precedes all replies
        if (root && root.uri !== parent?.uri) {
            const rootPost = feed.find(item => item.post.uri === root.uri);
            if (rootPost) {
                threadHTML = renderThread(rootPost.post, feed, level - 1) + threadHTML;
            }
        }
    }

    return threadHTML;
}

// Render the entire feed
function renderBlueskyFeed(feed) {
    const container = document.getElementById('bluesky-feed');
    container.innerHTML = ''; // Clear previous content

    feed.forEach(item => {
        const post = item.post;

        // Check if it's a reply; render thread if true, or standalone post otherwise
        const postHTML = post.reply ? renderThread(post, feed) : renderPost(post);
        container.innerHTML += postHTML;
    });
}

// Fetch and render the feed on page load
document.addEventListener('DOMContentLoaded', async () => {
    const feed = await fetchBlueskyFeed();
    renderBlueskyFeed(feed);
});
