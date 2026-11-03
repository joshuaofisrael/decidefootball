import os,re,json,html
D="https://decidefootball.com"
css=open("drafts/style.css").read()
css=re.sub(r"```\w*","",css)
css=css.replace("background-color: #0b1f3a;\n    color: white;\n    min-height","background-color: #f6f8fa;\n    color: #1b1f24;\n    min-height").replace("'system-ui'","system-ui").replace(".skip {",".skip:focus{top:0}\n.skip {").replace("color: #666;\n    text-align: center;\n    padding","color: #d0d7de;\n    text-align: center;\n    padding")
css+="""
.card{background:#fff}.card a{color:#0b1f3a;text-decoration:none}.card h2,.card h3{font-size:1.1rem;margin:.5rem 1rem}.card p{margin:.3rem 1rem 1rem;font-size:.9rem;color:#444}
.card .tag{display:inline-block;margin:.75rem 1rem 0;font-size:.75rem}.brand{color:#fff;font-weight:700;font-size:1.5rem;text-decoration:none}
.tagline{color:#c9d6e3;margin:.25rem 0 .75rem;font-size:.95rem}nav{flex-wrap:wrap;gap:.25rem}main{flex:1}
.post a,.page a{color:#0b5cad}.meta{color:#555;font-size:.85rem}.sources{font-size:.9rem;border-top:1px solid #ccc;padding-top:.5rem}footer a{color:#d0d7de}
.src{color:#555}figure{margin:1rem 0}
"""
os.makedirs("assets",exist_ok=True);open("assets/style.css","w").write(css)
CATS={"team-selection":"Team Selection","tactics":"Tactics","substitutions":"Substitutions","squad-and-transfers":"Squad and Transfers","under-pressure":"Under Pressure"}
TAG="The decisions behind British football: team selection, tactics, substitutions and the managers under pressure."
def page(title,desc,path,body,extra=""):
    nav="".join(f'<a href="/category/{k}/">{v}</a>' for k,v in CATS.items())
    return f'''<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title><meta name="description" content="{html.escape(desc)}"><link rel="canonical" href="{D}{path}">
<meta property="og:type" content="{'article' if extra else 'website'}"><meta property="og:title" content="{html.escape(title)}"><meta property="og:description" content="{html.escape(desc)}"><meta property="og:url" content="{D}{path}"><meta property="og:site_name" content="Decide Football"><meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/style.css"><link rel="alternate" type="application/rss+xml" title="Decide Football" href="/feed.xml">{extra}</head><body>
<a class="skip" href="#main">Skip to content</a><header><div class="wrap"><a class="brand" href="/">Decide Football</a><p class="tagline">{TAG}</p><nav aria-label="Categories"><a href="/">Latest</a>{nav}</nav></div></header>
<main id="main" class="wrap">{body}</main>
<footer><div class="wrap"><p><a href="/about/">About</a> · <a href="/contact/">Contact</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/image-policy/">Image policy</a> · <a href="/feed.xml">RSS</a></p><p>© 2026 Joshua Israel Ventures LLC</p></div></footer></body></html>'''
def thumb(alt,img=None):
    inner=f'<img src="{img[0]}" alt="{html.escape(img[1])}" width="1280" height="720" loading="lazy" style="width:100%;height:auto;display:block">' if img else f'<div class="thumb" role="img" aria-label="{html.escape(alt)}">Image coming soon</div>'
    return f'<figure>{inner}<a class="src" href="/image-policy/">Source</a></figure>'
A=json.load(open("articles.json"))
A.sort(key=lambda a:a["date"],reverse=True)
def card(a): return f'<article class="card">{thumb(a["title"],a.get("image"))}<span class="tag">{CATS[a["cat"]]}</span><h2><a href="/news/{a["slug"]}/">{html.escape(a["title"])}</a></h2><p>{html.escape(a["desc"])}</p></article>'
def w(p,s): os.makedirs(os.path.dirname(p) or ".",exist_ok=True);open(p,"w").write(s)
w("index.html",page("Decide Football – the decisions behind British football",TAG,"/",'<h1>Latest decisions</h1><div class="grid">'+"".join(map(card,A))+"</div>"))
for k,v in CATS.items():
    L=[a for a in A if a["cat"]==k]
    w(f"category/{k}/index.html",page(f"{v} – Decide Football",f"{v}: managers' decisions in British football.",f"/category/{k}/",f'<h1>{v}</h1>'+('<div class="grid">'+"".join(map(card,L))+"</div>" if L else "<p>No stories in this section yet. Check back soon.</p>")))
for a in A:
    ld={"@context":"https://schema.org","@type":"NewsArticle","headline":a["title"],"description":a["desc"],"datePublished":a["date"],"dateModified":a["date"],"author":{"@type":"Organization","name":"Decide Football"},"publisher":{"@type":"Organization","name":"Joshua Israel Ventures LLC"},"mainEntityOfPage":f'{D}/news/{a["slug"]}/',"articleSection":CATS[a["cat"]]}
    src="".join(f'<li><a href="{u}" rel="noopener">{html.escape(n)}</a></li>' for n,u in a["sources"])
    body=f'<article class="post"><span class="tag">{CATS[a["cat"]]}</span><h1>{html.escape(a["title"])}</h1><p class="meta">By Decide Football · <time datetime="{a["date"]}">{a["date"][:10]}</time></p>{thumb(a["title"],a.get("image"))}{a["body"]}<div class="sources"><h2>Sources</h2><ul>{src}</ul></div></article>'
    w(f'news/{a["slug"]}/index.html',page(a["title"]+" – Decide Football",a["desc"],f'/news/{a["slug"]}/',body,'<script type="application/ld+json">'+json.dumps(ld)+'</script>'))
S={"about":("About","<p>Decide Football is a news site about one thing: the decisions made by managers and head coaches in British football. We cover team selection, tactical and formation changes, substitutions, rotation, dropping and recalling players, captaincy, penalty-taker choices, and the squad and transfer calls managers make and explain – plus the decisions behind sackings and the managers under pressure.</p><p>Every story centres on a specific manager's decision, the reasoning given for it and what followed. We quote managers, clubs and journalists exactly, link to the original post or report, and never invent quotes, scores or facts.</p><p>Decide Football is published by Joshua Israel Ventures LLC.</p>"),
"contact":("Contact","<p>For corrections, tips or other enquiries, email <a href=\"mailto:hello@decidefootball.com\">hello@decidefootball.com</a>. If you spot an error in a story, tell us which article and what is wrong and we will correct it promptly.</p>"),
"privacy":("Privacy policy","<p>Decide Football is published by Joshua Israel Ventures LLC. We use privacy-friendly analytics to count page views; it does not use cookies to track you across sites. If we introduce advertising, our advertising partners may use cookies to show and measure adverts, and we will update this page and ask for consent where the law requires it. If you email us, we use your address only to reply. Contact us to request access to or deletion of any data we hold about you.</p>"),
"terms":("Terms of use","<p>Content on Decide Football is provided for information only and may be updated or corrected. Quotes are reproduced from their original sources, which are linked. You may share links to our articles; please do not republish full articles without permission. Joshua Israel Ventures LLC is not liable for decisions made on the basis of this content.</p>"),
"image-policy":("Image policy","<p>All images on Decide Football are AI-generated illustrations. They do not show real events, real photographs or real people as they actually appeared, and they are not photos taken at any match. Every image on the site carries a small \"Source\" link to this page.</p><p>Where an image is not yet available, a placeholder is shown.</p>")}
for k,(t,b) in S.items(): w(f"{k}/index.html",page(f"{t} – Decide Football",t+" – Decide Football",f"/{k}/",f'<div class="page post"><h1>{t}</h1>{b}</div>'))
urls=["/"]+[f"/category/{k}/" for k in CATS]+[f'/news/{a["slug"]}/' for a in A]+[f"/{k}/" for k in S]
w("sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+"".join(f"<url><loc>{D}{u}</loc><lastmod>2026-11-03</lastmod></url>" for u in urls)+"</urlset>\n")
w("robots.txt","User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: https://decidefootball.com/sitemap.xml\n")
from email.utils import format_datetime;from datetime import datetime
items="".join(f'<item><title>{html.escape(a["title"])}</title><link>{D}/news/{a["slug"]}/</link><guid>{D}/news/{a["slug"]}/</guid><pubDate>{format_datetime(datetime.fromisoformat(a["date"]))}</pubDate><description>{html.escape(a["desc"])}</description></item>' for a in A)
w("feed.xml",f'<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Decide Football</title><link>{D}/</link><description>{TAG}</description><language>en-gb</language>{items}</channel></rss>\n')
w("CNAME","decidefootball.com\n");w(".nojekyll","")
w("404.html",page("Page not found – Decide Football","Page not found","/404.html",'<h1>Page not found</h1><p><a href="/">Back to the latest stories</a></p>'))
print("built",len(urls))
