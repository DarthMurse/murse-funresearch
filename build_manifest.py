#!/usr/bin/env python3
"""Generate blogs.json manifest from blog/*/meta.json files."""
import json, os, glob, base64

MIME = {"jpg": "image/jpeg", "png": "image/png"}

blogs = []
for meta_path in sorted(glob.glob("blog/*/meta.json")):
    blog_dir = os.path.dirname(meta_path)
    blog_id = int(os.path.basename(blog_dir))
    with open(meta_path) as f:
        meta = json.load(f)
    cover_data = None
    for ext in ["jpg", "png"]:
        cover_path = os.path.join(blog_dir, f"cover.{ext}")
        if os.path.exists(cover_path):
            raw = open(cover_path, "rb").read()
            b64 = base64.b64encode(raw).decode()
            cover_data = f"data:{MIME[ext]};base64,{b64}"
            break
    blogs.append({"id": blog_id, "title": meta["title"], "date": meta["date"], "cover": cover_data})

with open("blogs.json", "w") as f:
    json.dump(blogs, f)

print(f"Generated blogs.json with {len(blogs)} entries")
