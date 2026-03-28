# Murse Fun Research

A personal blog site for mini research projects. Dark-themed, lightweight, no frameworks — just vanilla HTML/CSS/JS with markdown-powered blog posts and LaTeX math rendering.

## File Structure

```
murse-funresearch/
├── index.html              Main page
├── blogs.json              Generated manifest (do not edit manually)
├── build_manifest.py       Script to regenerate blogs.json
├── css/
│   └── main.css            All styling
├── js/
│   ├── main.js             Main page logic
│   └── blog.js             Blog page logic (markdown + LaTeX rendering)
├── html/
│   └── blog.html           Blog page template
└── blog/
    ├── 1/                  Blog #1
    │   ├── meta.json
    │   ├── blog.md
    │   └── cover.png
    ├── 2/                  Blog #2
    └── ...
```

## Adding a New Blog

1. Create a new folder under `blog/` with the next number (e.g., `blog/4/`).

2. Add a `meta.json` with the title and date:
   ```json
   {
       "title": "Your Blog Title",
       "date": "2026-04-01"
   }
   ```

3. Write your blog content in `blog.md`. You can use:
   - Standard markdown syntax
   - Inline math with `$...$` and display math with `$$...$$`
   - Images placed in the same folder, referenced by filename (e.g., `![alt](diagram.png)`)

4. Add a cover image as `cover.jpg` or `cover.png` in the same folder.

5. Regenerate the manifest:
   ```bash
   python build_manifest.py
   ```

6. Deploy the updated files to your server.

## Running Locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Dependencies

No build tools or package managers required. The site loads two libraries from CDN on the blog page only:

- [marked.js](https://github.com/markedjs/marked) — markdown to HTML
- [KaTeX](https://katex.org/) — LaTeX math rendering
