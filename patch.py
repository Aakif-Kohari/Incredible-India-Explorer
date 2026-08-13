import re

def update_national_symbols():
    path = 'frontend/national-symbols-memory/national-symbols-memory.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update cardHtml to include tabindex and aria-label
    content = re.sub(
        r'<button class="memory-card" type="button"',
        r'<button class="memory-card" type="button" tabindex="0" aria-label="Card  - Hidden"',
        content
    )

    # Add keydown to render
    content = re.sub(
        r'button\.addEventListener\("click", \(\) => flip\((button)\)\);',
        r'button.addEventListener("click", () => flip(button));\n      button.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(button); } });',
        content
    )

    # Update aria-label in flip
    content = re.sub(
        r'button\.classList\.add\("is-flipped"\);',
        r'button.classList.add("is-flipped");\n    button.setAttribute("aria-label", button.getAttribute("aria-label").replace("Hidden", "Revealed"));',
        content
    )

    # Update aria-label in checkMatch (reverting)
    content = re.sub(
        r'first\.classList\.remove\("is-flipped"\);(\s*)second\.classList\.remove\("is-flipped"\);',
        r'first.classList.remove("is-flipped");\n        first.setAttribute("aria-label", first.getAttribute("aria-label").replace("Revealed", "Hidden"));\1second.classList.remove("is-flipped");\n        second.setAttribute("aria-label", second.getAttribute("aria-label").replace("Revealed", "Hidden"));',
        content
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def update_mountain_range():
    path = 'frontend/mountain-range-memory/script.js'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update card HTML to include tabindex and aria-label
    content = re.sub(
        r'class="memory-card \ \"\s+type="button"',
        r'class="memory-card  "\n          type="button"\n          tabindex="0"\n          aria-label="Card  - "',
        content
    )

    # Add keydown in renderBoard
    content = re.sub(
        r'button\.addEventListener\("click", \(\) => flipCard\(button\.dataset\.card\)\);',
        r'button.addEventListener("click", () => flipCard(button.dataset.card));\n      button.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flipCard(button.dataset.card); } });',
        content
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_national_symbols()
update_mountain_range()
print("JS updated successfully.")
