import re

def update_css(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '.memory-card:focus-visible' not in content:
        content += "\n.memory-card:focus-visible {\n  outline: 3px solid var(--saffron, #ff9933);\n  outline-offset: 4px;\n}\n"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

update_css('frontend/national-symbols-memory/national-symbols-memory.css')
update_css('frontend/mountain-range-memory/style.css')
print("CSS updated successfully.")
