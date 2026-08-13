import re

path = 'frontend/mountain-range-memory/script.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Modify renderBoard to preserve focus
old_render = r'board\.innerHTML = cards\.map\(\(card\) => \{'
new_render = r'''const activeElementId = document.activeElement ? document.activeElement.dataset.card : null;
    board.innerHTML = cards.map((card) => {'''
content = re.sub(old_render, new_render, content)

old_listeners = r'board\.querySelectorAll\("\[data-card\]"\)\.forEach\(\(button\) => \{\s+button\.addEventListener\("click", \(\) => flipCard\(button\.dataset\.card\)\);\s+button\.addEventListener\("keydown", \(e\) => \{ if \(e\.key === "Enter" \|\| e\.key === " "\) \{ e\.preventDefault\(\); flipCard\(button\.dataset\.card\); \} \}\);\s+\}\);'
new_listeners = r'''board.querySelectorAll("[data-card]").forEach((button) => {
      button.addEventListener("click", () => flipCard(button.dataset.card));
      button.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(button.dataset.card); } });
      if (activeElementId && button.dataset.card === activeElementId) {
        button.focus();
      }
    });'''
content = re.sub(old_listeners, new_listeners, content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
