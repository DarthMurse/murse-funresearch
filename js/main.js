document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('blog-grid');

    const res = await fetch('blogs.json');
    const blogs = await res.json();

    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const blog of blogs) {
        const card = document.createElement('a');
        card.className = 'blog-card';
        card.href = `html/blog.html?id=${blog.id}`;

        const coverSrc = blog.cover ? `blog/${blog.id}/${blog.cover}${blog.v ? '?v=' + blog.v : ''}` : '';

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
