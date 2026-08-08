import os
import re

files_to_fix = [
    'frontend/astronomy/astronomy.html',
    'frontend/coin/coin.html',
    'frontend/museums/museums.html',
    'frontend/stepwells/stepwells.html'
]

img_pattern = re.compile(r'(<img[^>]*src="(\.\./assets/[^"]+\.(png|jpg|jpeg))"[^>]*>)')

for file_path in files_to_fix:
    print(f"Fixing {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_img(match):
        img_tag = match.group(1)
        src_path = match.group(2)
        
        # Don't wrap if it's already in a picture tag. We can check if '<picture>' is right before it, 
        # but since we did checkout --theirs, they definitely aren't in picture tags (except if they already were).
        # We can just check safely by matching the content.
        
        base, ext = os.path.splitext(src_path)
        webp_src = base + '.webp'
        
        # We should ensure we don't accidentally wrap if we already wrapped it.
        # But this script runs once.
        return f'<picture>\n  <source srcset="{webp_src}" type="image/webp">\n  {img_tag}\n</picture>'

    # But we need to make sure we don't double wrap.
    # We can split the file by `<picture>` and only replace in the outside parts, or just run a regex that avoids it.
    # Actually, a simple approach: if the file already has `<picture>`, we can skip or be careful.
    # Since we did `checkout --theirs`, they shouldn't have `<picture>` for these tags unless they were always there.
    
    new_content = img_pattern.sub(replace_img, content)
    
    # We might have doubled wrapped if there was already a picture tag.
    # Let's clean up `<picture> <picture>... </picture> </picture>` just in case.
    new_content = new_content.replace('<picture>\n  <source srcset="', '%%TMP%%')
    new_content = re.sub(r'<picture>\s*%%TMP%%([^>]+)>\s*(<img[^>]+>)\s*</picture>\s*</picture>', r'<picture>\n  <source srcset="\1">\n  \2\n</picture>', new_content)
    new_content = new_content.replace('%%TMP%%', '<picture>\n  <source srcset="')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
