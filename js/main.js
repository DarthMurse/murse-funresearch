document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('blog-grid');

    // Fetch all meta.json in parallel; stop discovery at first missing id
    const blogIds = await discoverBlogs();

    const blogs = await Promise.all(blogIds.map(async (id) => {
        try {
            const res = await fetch(`blog/${id}/meta.json`);
            if (!res.ok) return null;
            const meta = await res.json();
            meta.id = id;
            return meta;
        } catch {
            return null;
        }
    }));

    const valid = blogs.filter(Boolean);
    valid.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Find all covers in parallel
    const coverMap = Object.fromEntries(
        await Promise.all(valid.map(async (blog) => {
            const ext = await findCover(blog.id);
            return [blog.id, ext];
        }))
    );

    for (const blog of valid) {
        const card = document.createElement('a');
        card.className = 'blog-card';
        card.href = `html/blog.html?id=${blog.id}`;

        const coverExt = coverMap[blog.id];
        const coverSrc = coverExt ? `blog/${blog.id}/cover.${coverExt}?t=${Date.now()}` : '';

        card.innerHTML = `
            ${coverSrc ? `<img class="blog-card-cover" src="${coverSrc}" alt="${blog.title}" loading="lazy">` : ''}
            <div class="blog-card-info">
                <div class="blog-card-title">${blog.title}</div>
                <div class="blog-card-date">${blog.date}</div>
            </div>
        `;
        grid.appendChild(card);
    }
});

async function discoverBlogs() {
    // Probe in parallel batches instead of sequentially
    const BATCH = 10;
    const ids = [];
    for (let start = 1; start <= 100; start += BATCH) {
        const batch = Array.from({ length: BATCH }, (_, i) => start + i);
        const results = await Promise.all(batch.map(async (i) => {
            try {
                const res = await fetch(`blog/${i}/meta.json`, { method: 'HEAD' });
                return res.ok ? i : null;
            } catch {
                return null;
            }
        }));
        const found = results.filter(Boolean);
        ids.push(...found);
        // If none in this batch succeeded, stop probing
        if (found.length === 0) break;
    }
    return ids;
}

async function findCover(id) {
    // Try both extensions in parallel
    const results = await Promise.all(
        ['jpg', 'png'].map(async (ext) => {
            try {
                const res = await fetch(`blog/${id}/cover.${ext}`, { method: 'HEAD' });
                return res.ok ? ext : null;
            } catch {
                return null;
            }
        })
    );
    return results.find(Boolean) || null;
}
