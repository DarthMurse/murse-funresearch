document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('blog-grid');
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

    for (const blog of valid) {
        const card = document.createElement('a');
        card.className = 'blog-card';
        card.href = `html/blog.html?id=${blog.id}`;

        const coverExt = await findCover(blog.id);
        const coverSrc = coverExt ? `blog/${blog.id}/cover.${coverExt}?t=${Date.now()}` : '';

        card.innerHTML = `
            ${coverSrc ? `<img class="blog-card-cover" src="${coverSrc}" alt="${blog.title}">` : ''}
            <div class="blog-card-info">
                <div class="blog-card-title">${blog.title}</div>
                <div class="blog-card-date">${blog.date}</div>
            </div>
        `;
        grid.appendChild(card);
    }
});

async function discoverBlogs() {
    const ids = [];
    for (let i = 1; i <= 100; i++) {
        try {
            const res = await fetch(`blog/${i}/meta.json`, { method: 'HEAD' });
            if (res.ok) {
                ids.push(i);
            } else {
                break;
            }
        } catch {
            break;
        }
    }
    return ids;
}

async function findCover(id) {
    for (const ext of ['jpg', 'png']) {
        try {
            const res = await fetch(`blog/${id}/cover.${ext}`, { method: 'HEAD' });
            if (res.ok) return ext;
        } catch {
            continue;
        }
    }
    return null;
}
