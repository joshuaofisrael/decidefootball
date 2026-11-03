import json,urllib.request,os
def q(p):
    r=urllib.request.urlopen(urllib.request.Request("http://localhost:11434/api/generate",json.dumps({"model":"qwen2.5-coder:7b","prompt":p,"stream":False,"options":{"temperature":0.3}}).encode(),{"Content-Type":"application/json"}),timeout=600)
    return json.loads(r.read())["response"]
os.makedirs("drafts",exist_ok=True)
open("drafts/style.css","w").write(q("Write only a CSS file (no markdown fences, no explanation) for a fast, accessible, responsive football news site. Dark navy header (#0b1f3a) with white nav links, body system-ui font, max-width 1100px container class .wrap, .grid of article cards (CSS grid auto-fill minmax 280px), .card with border-radius 8px and shadow, .thumb placeholder box aspect-ratio 16/9 background #dfe6ee with centred grey text, .src small link under images, .tag category pill, article.post with readable 70ch width, blockquote with green left border #1a7f37, footer dark with small text, visible :focus outlines, skip-link class .skip."))
facts=json.load(open("facts.json"))
for slug,f in facts.items():
    open(f"drafts/{slug}.html","w").write(q("You are a British football journalist. Using ONLY the facts below, write 4-6 short paragraphs of HTML (<p> tags only, no headings, no markdown fences) about the manager's decision, in UK English, saying 'football' never 'soccer'. Do not add any fact, score, quote or name not in the facts. Do not invent quotes.\nFACTS:\n"+f))
print("done")
