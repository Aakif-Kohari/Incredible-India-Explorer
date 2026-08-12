import os
import re
import shutil

def resolve_html_conflicts(directory):
    # Regex to capture the entire HEAD picture block and the ======= side img tag
    conflict_pattern = re.compile(
        r'<<<<<<< HEAD\r?\n\s*<picture>.*?'
        r'<source srcset="([^"]+)" type="image/webp">.*?'
        r'<img([^>]*)>.*?'
        r'</picture>\r?\n=======\r?\n\s*<img([^>]*)>\r?\n>>>>>>> origin/feature/architectural-styles-guide',
        re.DOTALL
    )
    
    src_pattern = re.compile(r'src="([^"]+)"')

    for root, _, files in os.walk(directory):
        for file in files:
            if not file.endswith('.html'):
                continue
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            if '<<<<<<< HEAD' in content:
                print(f"Resolving conflicts in {path}...")
                
                def replacement(match):
                    head_img_attrs = match.group(2)
                    origin_img_attrs = match.group(3)
                    
                    # Extract the src from the origin img tag
                    src_match = src_pattern.search(origin_img_attrs)
                    if not src_match:
                        # Fallback if no src is found
                        return match.group(0)
                        
                    new_src = src_match.group(1)
                    
                    # Update srcset based on the new src
                    base, _ = os.path.splitext(new_src)
                    new_srcset = base + '.webp'
                    
                    # Instead of replacing just the src, we can keep the entire origin img tag,
                    # but wrap it in a <picture> tag with the new source.
                    # Wait! The origin img tag might have different alt/class attrs? 
                    # Usually we want the origin img attrs.
                    
                    return f'''<picture>
  <source srcset="{new_srcset}" type="image/webp">
  <img{origin_img_attrs}>
</picture>'''

                resolved = conflict_pattern.sub(replacement, content)
                
                if '<<<<<<< HEAD' in resolved:
                    print(f"  WARNING: There are still unresolved conflicts in {path}!")
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(resolved)

if __name__ == '__main__':
    resolve_html_conflicts('frontend')
