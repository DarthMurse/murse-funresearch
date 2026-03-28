#!/usr/bin/env python3
"""Generate blogs.json manifest from blog/*/meta.json files."""
import json, os, glob, hashlib

blogs = []
for meta_path in sorted(glob.glob("blog/*/meta.json")):
    blog_dir = os.path.dirname(meta_path)
    blog_id = int(os.path.basename(blog_dir))
    with open(meta_path) as f:
        meta = json.load(f)
    cover = None
    cover_hash = None
    for ext in ["jpg", "png"]:
        cover_path = os.path.join(blog_dir, f"cover.{ext}")
        if os.path.exists(cover_path):
            cover = f"cover.{ext}"
            cover_hash = hashlib.md5(open(cover_path, "rb").read()).hexdigest()[:8]
            break
    blogs.append({"id": blog_id, "title": meta["title"], "date": meta["date"], "cover": cover, "v": cover_hash})

with open("blogs.json", "w") as f:
    json.dump(blogs, f, indent=4)

print(f"Generated blogs.json with {len(blogs)} entries")
