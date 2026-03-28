#!/usr/bin/env python3
"""Generate blogs.json manifest from blog/*/meta.json files."""
import json, os, glob

blogs = []
for meta_path in sorted(glob.glob("blog/*/meta.json")):
    blog_dir = os.path.dirname(meta_path)
    blog_id = int(os.path.basename(blog_dir))
    with open(meta_path) as f:
        meta = json.load(f)
    cover = None
    for ext in ["jpg", "png"]:
        if os.path.exists(os.path.join(blog_dir, f"cover.{ext}")):
            cover = f"cover.{ext}"
            break
    blogs.append({"id": blog_id, "title": meta["title"], "date": meta["date"], "cover": cover})

with open("blogs.json", "w") as f:
    json.dump(blogs, f, indent=4)

print(f"Generated blogs.json with {len(blogs)} entries")
