document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        window.location.href = '../index.html';
        return;
    }

    try {
        const metaRes = await fetch(`../blog/${id}/meta.json`);
        const meta = await metaRes.json();

        document.getElementById('blog-title').textContent = meta.title;
        document.getElementById('blog-date').textContent = meta.date;
        document.title = `${meta.title} - Murse Fun Research`;

        const mdRes = await fetch(`../blog/${id}/blog.md`);
        const mdText = await mdRes.text();

        const renderer = new marked.Renderer();
        const defaultImage = renderer.image.bind(renderer);
        renderer.image = function ({ href, title, text }) {
            if (href && !href.startsWith('http') && !href.startsWith('/')) {
                href = `../blog/${id}/${href}`;
            }
            return defaultImage({ href, title, text });
        };

        marked.setOptions({
            renderer,
            breaks: true,
        });

        document.getElementById('blog-content').innerHTML = marked.parse(mdText);
    } catch (err) {
        document.getElementById('blog-content').innerHTML =
            '<p>Failed to load blog post.</p>';
    }
});
