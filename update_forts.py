import re
import os

filepath = r'D:\Incredible-India-Explorer\frontend\forts\script.js'
with open(filepath, 'r', encoding='utf-8') as f:
    js_content = f.read()

# 1. Rename 'bekal-fort' to 'bekal-sea-fort'
js_content = re.sub(r'id:\s*[\x22\x27]bekal-fort[\x22\x27]', 'id: "bekal-sea-fort"', js_content)

html_files = [
    'agra-fort', 'bahu-fort', 'bekal-sea-fort', 'bidar-fort', 'chandragiri-fort', 
    'chitradurga-fort', 'devikot-fort', 'diu-fort', 'fort-william', 'gagron-fort', 
    'jaigarh-fort', 'kumbhalgarh-fort', 'mirjan-fort', 'murud-janjira-fort', 
    'nahargarh-fort', 'panhala-fort', 'rajmachi-fort', 'ranthambore-fort', 
    'rohtasgarh-fort', 'st-angelo-fort', 'taragarh-fort', 'tiruchirappalli-rock-fort', 
    'torna-fort', 'vellore-fort', 'vijaydurg-fort'
]

# For each fort in the list, make sure it has customUrl
for fort in html_files:
    # Find the object for this fort
    pattern = r'(id:\s*[\x22\x27]' + re.escape(fort) + r'[\x22\x27][\s\S]*?)(?=\},|\}\];)'
    match = re.search(pattern, js_content)
    if match:
        obj_content = match.group(1)
        # If it has explorerUrl, replace it with customUrl
        if 'explorerUrl:' in obj_content:
            new_obj = re.sub(r'explorerUrl:\s*[\x22\x27][^\x22\x27]+[\x22\x27]', f'customUrl: "{fort}.html"', obj_content)
        # If it has customUrl, update it
        elif 'customUrl:' in obj_content:
            new_obj = re.sub(r'customUrl:\s*[\x22\x27][^\x22\x27]+[\x22\x27]', f'customUrl: "{fort}.html"', obj_content)
        # Otherwise append customUrl
        else:
            new_obj = obj_content + f',\n        customUrl: "{fort}.html"'
        
        js_content = js_content.replace(obj_content, new_obj)

# 2. Add raigad-fort to the end of the array if it doesn't exist
if 'id: "raigad-fort"' not in js_content:
    raigad_entry = '''    },
    {
        id: "raigad-fort",
        name: "Raigad Fort",
        location: "Raigad",
        state: "Maharashtra",
        built: "11th Century",
        builtBy: "Chhatrapati Shivaji Maharaj",
        era: "Maratha Era",
        architecture: "Maratha Military Architecture",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        history: "The Gibraltar of the East. The magnificent hill fort that served as the illustrious capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
        highlights: [
            "Served as Maratha Capital",
            "Coronation of Shivaji Maharaj",
            "Maha Darwaja",
            "Takmak Tok"
        ],
        customUrl: "raigad-fort.html"
    }'''
    js_content = js_content.replace('    }\n];', raigad_entry + '\n];')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(js_content)
print('Updated script.js successfully.')
