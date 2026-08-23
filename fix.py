import codecs, re
file_path = r"d:\Incredible-India-Explorer\frontend\forgotten-women-of-indian-history\women-data.js"
with codecs.open(file_path, "r", "utf-8") as f:
    text = f.read()
new_text = re.sub(r'url:\s*["\']\.\./([^/]+)/index\.html["\']', r'url: "../\1/"', text)
with codecs.open(file_path, "w", "utf-8") as f:
    f.write(new_text)
