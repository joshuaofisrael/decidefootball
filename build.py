import os,re,json,html
D="https://decidefootball.com"
HAVE_DRAFT=os.path.exists("drafts/style.css")  # drafts/ is local-only; otherwise keep committed assets/style.css
css=open("drafts/style.css").read() if HAVE_DRAFT else ""
css=re.sub(r"```\w*","",css)
css=css.replace("background-color: #0b1f3a;\n    color: white;\n    min-height","background-color: #f6f8fa;\n    color: #1b1f24;\n    min-height").replace("'system-ui'","system-ui").replace(".skip {",".skip:focus{top:0}\n.skip {").replace("color: #666;\n    text-align: center;\n    padding","color: #d0d7de;\n    text-align: center;\n    padding")
css+="""
.card{background:#fff}.card a{color:#0b1f3a;text-decoration:none}.card h2,.card h3{font-size:1.1rem;margin:.5rem 1rem}.card p{margin:.3rem 1rem 1rem;font-size:.9rem;color:#444}
.card .tag{display:inline-block;margin:.75rem 1rem 0;font-size:.75rem}.brand{color:#fff;font-weight:700;font-size:1.5rem;text-decoration:none}
.tagline{color:#c9d6e3;margin:.25rem 0 .75rem;font-size:.95rem}nav{flex-wrap:wrap;gap:.25rem}main{flex:1}
.post a,.page a{color:#0b5cad}.meta{color:#555;font-size:.85rem}.sources{font-size:.9rem;border-top:1px solid #ccc;padding-top:.5rem}footer a{color:#d0d7de}
.src{color:#555}figure{margin:1rem 0}
.next-reads{margin:1.4rem 0}.next-reads h2{font-size:1.05rem;margin:0 0 .6rem}
.next-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr));gap:.75rem}
.ncard{background:#fff;border:1px solid #d0d7de;border-radius:8px;overflow:hidden}
.ncard a{color:#0b1f3a;text-decoration:none;display:block}
.ncard strong{display:block;margin:.45rem .65rem .65rem;font-size:.92rem;line-height:1.35;font-weight:650}
.ncard .src{margin:.15rem .65rem .5rem;text-align:left;font-size:.75rem}
.follow,.compare{margin:1.25rem 0;padding:.9rem 1rem;background:#fff;border:1px solid #d0d7de;border-radius:8px}
.follow h2,.compare h2{font-size:1.05rem;margin:.15rem 0 .45rem}.follow ul{margin:.3rem 0 .2rem;padding-left:1.15rem}
@media (max-width:640px){.next-grid{grid-template-columns:1fr}}
.leagues{display:flex;flex-wrap:wrap;gap:.4rem;margin:.5rem 0 1rem;padding:0;list-style:none}.leagues a{display:inline-block;padding:.25rem .6rem;border:1px solid #c9d6e3;border-radius:999px;color:#0b1f3a;text-decoration:none;font-size:.85rem;background:#fff}
.signup{background:#0b1f3a;color:#fff;border-radius:8px;padding:1rem 1.25rem;margin:1.5rem 0}.signup h2{margin:.2rem 0 .4rem;font-size:1.15rem}.signup input[type=email]{padding:.5rem;border-radius:6px;border:0;min-width:240px;max-width:100%}.signup button{padding:.5rem 1rem;border:0;border-radius:6px;background:#1a7f37;color:#fff;font-weight:700;cursor:pointer}.signup label{font-size:.85rem}.signup .hp{position:absolute;left:-9999px}.signup a{color:#c9d6e3}
.lg{font-size:.75rem;margin-left:.4rem;color:#0b5cad}
"""
if HAVE_DRAFT: os.makedirs("assets",exist_ok=True);open("assets/style.css","w").write(css)
CATS={"team-selection":"Team Selection","tactics":"Tactics","substitutions":"Substitutions","squad-and-transfers":"Squad and Transfers","under-pressure":"Under Pressure"}
LEAGUES={"premier-league":"Premier League","championship":"EFL Championship","league-one":"EFL League One","league-two":"EFL League Two","scottish-premiership":"Scottish Premiership","scottish-league-two":"Scottish League Two","la-liga":"La Liga","serie-a":"Serie A","bundesliga":"Bundesliga","ligue-1":"Ligue 1","eredivisie":"Eredivisie","primeira-liga":"Primeira Liga","mls":"MLS","champions-league":"Champions League","europa-league":"Europa League","conference-league":"Conference League","internationals":"Internationals"}
LEAGUES.update({"ghana-premier-league":"Ghana Premier League","south-african-premiership":"South African Premiership","npfl":"Nigeria Premier Football League"})
TAG="The decisions behind world football: team selection, tactics, substitutions, squad calls and the managers under pressure."
SIGNUP_URL="https://decidefootball-signups.joshofisrael.workers.dev/subscribe"
PUB={"@type":"NewsMediaOrganization","name":"Decide Football","url":D+"/","logo":{"@type":"ImageObject","url":D+"/assets/logo.png","width":600,"height":60},"publishingPrinciples":D+"/editorial-policy/","correctionsPolicy":D+"/editorial-policy/#corrections"}
def signup():
    return ('<section class="signup" aria-labelledby="su-h"><h2 id="su-h">The Decide Football briefing</h2><p>The biggest managerial decisions from across world football, by email. Free, and you can unsubscribe at any time.</p>'
     f'<form method="post" action="{SIGNUP_URL}"><label for="su-e" class="hp">Email address</label><input id="su-e" type="email" name="email" required placeholder="you@example.com" autocomplete="email"> <button type="submit">Sign up</button>'
     '<input class="hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true"><p><label><input type="checkbox" name="consent" value="yes" required> Email me the Decide Football briefing. See our <a href="/privacy/">privacy policy</a>.</label></p></form></section>')
FOOT='<footer><div class="wrap"><p><a href="/about/">About</a> · <a href="/editorial-policy/">Editorial policy</a> · <a href="/newsletter/">Newsletter</a> · <a href="/contact/">Contact</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/image-policy/">Image policy</a> · <a href="/feed.xml">RSS</a></p><p>© 2026 Decide Football</p></div></footer><script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{"token": "9c4f710ff2a04acb99c29039ac218aea"}\'></script></body></html>'
def page(title,desc,path,body,extra="",og_img=None,art=False):
    nav="".join(f'<a href="/category/{k}/">{v}</a>' for k,v in CATS.items() if CN.get(k,0))
    img=f'<meta property="og:image" content="{D}{og_img}">' if og_img else ""
    t,d=html.escape(title),html.escape(desc)
    return (f'<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n'
     f'<title>{t}</title><meta name="description" content="{d}"><link rel="canonical" href="{D}{path}"><meta name="robots" content="max-image-preview:large">\n'
     f'<meta property="og:type" content="{"article" if art else "website"}"><meta property="og:title" content="{t}"><meta property="og:description" content="{d}"><meta property="og:url" content="{D}{path}"><meta property="og:site_name" content="Decide Football"><meta property="og:locale" content="en_GB">{img}<meta name="twitter:card" content="summary_large_image">\n'
     f'<meta name="google-adsense-account" content="ca-pub-5681559774142917"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5681559774142917" crossorigin="anonymous"></script><script async src="https://www.googletagmanager.com/gtag/js?id=G-TNS68J7G3M"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag(\'js\',new Date());gtag(\'config\',\'G-TNS68J7G3M\');</script><link rel="icon" href="/assets/icon.png"><link rel="stylesheet" href="/assets/style.css"><link rel="alternate" type="application/rss+xml" title="Decide Football" href="/feed.xml">{extra}</head><body>\n'
     f'<a class="skip" href="#main">Skip to content</a><header><div class="wrap"><a class="brand" href="/">Decide Football</a><p class="tagline">{TAG}</p><nav aria-label="Sections"><a href="/">Latest</a>{nav}<a href="/leagues/">Leagues</a></nav></div></header>\n'
     f'<main id="main" class="wrap">{body}</main>\n'+FOOT)
def credit(img):
    if img and len(img)>2 and img[2]: return f'<figcaption class="src">{img[2]}</figcaption>'
    return '<figcaption class="src">AI-generated image. <a href="/image-policy/">Image policy</a></figcaption>'
def thumb(alt,img=None):
    inner=f'<img src="{img[0]}" alt="{html.escape(img[1])}" width="1280" height="720" loading="lazy" style="width:100%;height:auto;display:block">' if img else ""
    return f'<figure>{inner}{credit(img)}</figure>' if img else ""
A=json.load(open("articles.json"))
A.sort(key=lambda a:a["date"],reverse=True)
from collections import Counter
CN=Counter(a["cat"] for a in A);LN=Counter(a["league"] for a in A)
NI='<meta name="robots" content="noindex,follow">'
def lg(a): return f'<a class="lg" href="/league/{a["league"]}/">{LEAGUES[a["league"]]}</a>'
def card(a): return f'<article class="card">{thumb(a["title"],a.get("image"))}<span class="tag">{CATS[a["cat"]]}</span>{lg(a)}<h2><a href="/news/{a["slug"]}/">{html.escape(a["title"])}</a></h2><p>{html.escape(a["desc"])}</p></article>'
def w(p,s): os.makedirs(os.path.dirname(p) or ".",exist_ok=True);open(p,"w").write(s)
def grid(L,empty): return '<div class="grid">'+"".join(map(card,L))+"</div>" if L else (f"<p>{empty}</p>" if empty else "")
leaguebar='<ul class="leagues">'+"".join(f'<li><a href="/league/{k}/">{v}</a></li>' for k,v in LEAGUES.items() if LN[k])+'</ul>'
def coll(name,desc,path): return '<script type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@type":"CollectionPage","name":name,"description":desc,"url":D+path,"isPartOf":{"@type":"WebSite","name":"Decide Football","url":D+"/"}})+'</script>'
site_ld='<script type="application/ld+json">'+json.dumps([{"@context":"https://schema.org","@type":"WebSite","name":"Decide Football","url":D+"/","inLanguage":"en-GB"},{"@context":"https://schema.org",**PUB}])+'</script>'
w("index.html",page("Decide Football – the decisions behind world football",TAG,"/",'<h1>Latest decisions</h1>'+leaguebar+grid(A[:6],"")+signup()+grid(A[6:],""),site_ld))
for k,v in CATS.items():
    L=[a for a in A if a["cat"]==k];d=f"{v}: the latest managers' and head coaches' decisions across world football."
    w(f"category/{k}/index.html",page(f"{v} – Decide Football",d,f"/category/{k}/",f'<h1>{v}</h1><p>{html.escape(d)}</p>'+grid(L,"No stories in this section at the moment.")+signup(),coll(v,d,f"/category/{k}/")+(NI if CN[k]<2 else "")))
for k,v in LEAGUES.items():
    L=[a for a in A if a["league"]==k];d=f"{v}: the latest decisions by managers and head coaches – team selection, tactics, substitutions, squad calls and the managers under pressure."
    w(f"league/{k}/index.html",page(f"{v} managers' decisions – Decide Football",d,f"/league/{k}/",f'<h1>{v}</h1><p>{html.escape(d)}</p>'+grid(L,"No stories from this competition at the moment.")+leaguebar,coll(v,d,f"/league/{k}/")+(NI if LN[k]<2 else "")))
w("leagues/index.html",page("Leagues and competitions – Decide Football","Browse managers' decisions by league and competition.","/leagues/",'<h1>Leagues and competitions</h1><ul>'+"".join(f'<li><a href="/league/{k}/">{v}</a> ({LN[k]})</li>' for k,v in LEAGUES.items() if LN[k])+'</ul>'))
GENERIC=set("under over after before with from into onto about against during within without across around between game games plan plans call calls decision decisions report news head coach manager managers football premier league match matches squad team teams side sides club clubs player players goal goals win wins won loss lose lost defeat victory first last next more most much many new old big top two three four five six seven eight nine ten one year years day days time since until very will your our his her its not but and for the what who why when where which this that those these them they their than then out off back half start starts faster future doubt pressure question winless run runs named names naming confirm confirms confirmed leaves left sack sacks sacked appoint appoints appointed replace replacement deal deals contract commitment beyond rules rule take takes tells told picks pick over nations group final decider attack attacks physical response changes restores restore keeps kept pain triple change rotation selection selects recalls recall hands hand youngest ever season end board returns touchline staff birthday happy tweet owner charge ended hours wide left semi beat beats beating demand demands chaotic leaders explained choice behind double midfield pivot false nine centre forward withdraw agreement framework departure bench backed comeback shortlist month workload include included included".split())
def slug_toks(slug):
    return [t for t in slug.split("-") if t not in GENERIC and len(t)>3]
VOCAB=set(t for a in A for t in slug_toks(a["slug"]))
def names(a):
    found=set(slug_toks(a["slug"]))
    blob=a["title"].lower().replace("’","'").replace("'s"," ").replace("'", "")
    words=re.findall(r"[a-z0-9]+", blob)
    hits=[(i,w) for i,w in enumerate(words) if w in VOCAB]
    skip=set()
    for (i,_w),(j,_v) in zip(hits, hits[1:]):
        if j==i+1: skip.add(i); skip.add(j)
    for i,w in hits:
        if i not in skip: found.add(w)
    return found
def prev_name(blob, token):
    parts=[p for p in re.split(r"[^a-z0-9]+", blob.lower().replace("’","'")) if p]
    if token not in parts: return None
    i=parts.index(token); j=i-1
    while j>=0 and (parts[j] in GENERIC or len(parts[j])<=2): j-=1
    return parts[j] if j>=0 else None
def same_person(a,b,token):
    ba=a["slug"] if token in a["slug"].split("-") else a["title"]
    bb=b["slug"] if token in b["slug"].split("-") else b["title"]
    pa,pb=prev_name(ba, token), prev_name(bb, token)
    return not (pa and pb and pa!=pb)
NM={a["slug"]:names(a) for a in A}
DF=Counter(t for s in NM.values() for t in s)
EVERGREEN=("what-is-a-false-nine","double-pivot-explained")
COMPARE={
"double-pivot-explained":'<aside class="compare"><h2>Compare with</h2><p>A <a href="/news/what-is-a-false-nine/">false nine</a> is a centre-forward who leaves the last line. A double pivot is the pair in front of the defence. One creates a decision for the centre-backs. The other splits screening and passing between two midfielders.</p><p>Check another: <a href="/league/premier-league/">Premier League decisions</a> · <a href="/category/tactics/">all tactics</a>.</p></aside>',
"what-is-a-false-nine":'<aside class="compare"><h2>Compare with</h2><p>A <a href="/news/double-pivot-explained/">double pivot</a> is two deeper midfielders sharing the space in front of the back line. A false nine is the forward who drops away from the centre-backs. One is a build-up structure. The other is a movement on the last line.</p><p>Check another: <a href="/league/premier-league/">Premier League decisions</a> · <a href="/category/tactics/">all tactics</a>.</p></aside>',
}
def rel_score(a,b):
    s=0
    if a["league"]==b["league"]: s+=2
    if a["cat"]==b["cat"]: s+=3
    for t in NM[a["slug"]] & NM[b["slug"]]:
        if same_person(a,b,t) and 2<=DF[t]<=8: s+=8
    return s
def ncard(b):
    im=b["image"]; alt=html.escape(im[1]); title=html.escape(b["title"])
    return (f'<div class="ncard"><a href="/news/{b["slug"]}/"><img src="{im[0]}" alt="{alt}" width="1280" height="720" loading="lazy"><strong>{title}</strong></a>{credit(im)}</div>')
def next_block(items, heading, hid):
    if not items: return ""
    show=items[:4]
    if len(show)<3 and len(items)>=3: show=items[:3]
    cards="".join(ncard(b) for b in show)
    return f'<section class="next-reads" aria-labelledby="{hid}"><h2 id="{hid}">{heading}</h2><div class="next-grid">{cards}</div></section>'
def insert_mid(body, block):
    if not block: return body
    idxs=[m.start() for m in re.finditer(r"<h2\b", body)]
    if len(idxs)>=2: return body[:idxs[1]]+block+body[idxs[1]:]
    ps=[m.end() for m in re.finditer(r"</p>", body)]
    cut=ps[1] if len(ps)>=2 else (ps[0] if ps else len(body))
    return body[:cut]+block+body[cut:]
def later_stories(a):
    keys=[t for t in slug_toks(a["slug"]) if 2<=DF[t]<=8]
    out=[]
    for b in A:
        if b["date"]<=a["date"] or b["slug"]==a["slug"]: continue
        shared=[t for t in keys if t in NM[b["slug"]] and same_person(a,b,t)]
        if shared: out.append((len(shared), b["date"], b))
    out.sort(key=lambda t: t[1], reverse=True)
    return [b for _,_,b in out[:3]]
def earlier_story(a):
    keys=[t for t in slug_toks(a["slug"]) if 2<=DF[t]<=8]
    best=None
    for b in A:
        if b["date"]>=a["date"] or b["slug"]==a["slug"] or not b.get("image"): continue
        shared=[t for t in keys if t in NM[b["slug"]] and same_person(a,b,t)]
        if shared and (best is None or b["date"]>best["date"]): best=b
    return best
def follow_html(a):
    later=later_stories(a)
    bits=[]
    if later:
        items="".join(f'<li><a href="/news/{b["slug"]}/">{html.escape(b["title"])}</a></li>' for b in later)
        bits.append(f'<h2>What we reported next</h2><ul>{items}</ul>')
    hubs=f'<a href="/league/{a["league"]}/">{LEAGUES[a["league"]]}</a> and the <a href="/category/{a["cat"]}/">{CATS[a["cat"]]}</a> section'
    extra=""
    if a["cat"]=="tactics":
        guides=[f'<a href="/news/{s}/">{html.escape(next(x["title"] for x in A if x["slug"]==s))}</a>' for s in EVERGREEN if s!=a["slug"]]
        if guides: extra=" Tactical background: "+" and ".join(guides)+"."
    early=earlier_story(a)
    early_html=f' Earlier: <a href="/news/{early["slug"]}/">{html.escape(early["title"])}</a>.' if early else ""
    bits.append(f'<h2>Background</h2><p>More from {hubs}.{extra}{early_html}</p>')
    return f'<section class="follow" aria-label="Follow-up and background">{"".join(bits)}</section>'
for a in A:
    im=a.get("image")
    ld={"@context":"https://schema.org","@type":"NewsArticle","headline":a["title"][:110],"description":a["desc"],"datePublished":a["date"],"dateModified":a.get("modified",a["date"]),"inLanguage":"en-GB","author":{"@type":"Organization","name":"Decide Football","url":D+"/about/"},"publisher":PUB,"mainEntityOfPage":{"@type":"WebPage","@id":f'{D}/news/{a["slug"]}/'},"articleSection":CATS[a["cat"]],"keywords":[LEAGUES[a["league"]],CATS[a["cat"]]],"isAccessibleForFree":True}
    if im: ld["image"]=[{"@type":"ImageObject","url":D+im[0],"width":1280,"height":720}]
    crumbs={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":D+"/"},{"@type":"ListItem","position":2,"name":CATS[a["cat"]],"item":f'{D}/category/{a["cat"]}/'},{"@type":"ListItem","position":3,"name":a["title"]}]}
    src="".join(f'<li><a href="{u}" rel="noopener">{html.escape(n)}</a></li>' for n,u in a["sources"])
    ranked=sorted([b for b in A if b["slug"]!=a["slug"] and b.get("image")], key=lambda b:(rel_score(a,b), b["date"]), reverse=True)
    pool=[b for b in ranked if rel_score(a,b)>=3][:8]
    if len(pool)<3: pool=[b for b in ranked if rel_score(a,b)>=2][:8]
    mid, end = pool[:4], pool[4:8]
    if len(end)<3 and pool:
        seen={b["slug"] for b in end}; end=list(end)
        for b in pool:
            if b["slug"] in seen: continue
            end.append(b); seen.add(b["slug"])
            if len(end)>=3: break
    mid_html=next_block(mid, "Read next", "next-mid")
    end_html=next_block(end or mid, "More decisions", "next-end")
    body_html=insert_mid(a["body"], mid_html)
    compare=COMPARE.get(a["slug"], "")
    body=f'<article class="post"><a class="tag" href="/category/{a["cat"]}/">{CATS[a["cat"]]}</a>{lg(a)}<h1>{html.escape(a["title"])}</h1><p class="meta">By Decide Football · <time datetime="{a["date"]}">{a["date"][:10]}</time></p>{thumb(a["title"],im)}{body_html}{follow_html(a)}{compare}<div class="sources"><h2>Sources</h2><ul>{src}</ul><p>Spotted an error? See our <a href="/editorial-policy/#corrections">corrections policy</a>.</p></div>{signup()}{end_html}</article>'
    extra='<script type="application/ld+json">'+json.dumps([ld,crumbs])+'</script>'+f'<meta property="article:published_time" content="{a["date"]}"><meta property="article:section" content="{CATS[a["cat"]]}">'
    w(f'news/{a["slug"]}/index.html',page(a["title"]+" – Decide Football",a["desc"],f'/news/{a["slug"]}/',body,extra,im[0] if im else None,True))
LG=", ".join(f'<a href="/league/{k}/">{v}</a>' for k,v in LEAGUES.items())
S={"about":("About Decide Football",f"<p>Decide Football is a news site about one thing: the decisions made by managers and head coaches in association football around the world. We cover team selection, tactical and formation changes, substitutions, rotation, dropping and recalling players, captaincy, penalty-taker choices, the squad and transfer calls managers make and explain, and the managers under pressure.</p><p>Competitions we follow: {LG}.</p><p>Every story centres on one specific decision, the reasoning given for it and what followed. Read our <a href=\"/editorial-policy/\">editorial policy</a> to see how we report.</p><p>Contact: <a href=\"mailto:hello@decidefootball.com\">hello@decidefootball.com</a>.</p>"),
"editorial-policy":("Editorial policy","<h2>What we cover</h2><p>We report on decisions by managers and head coaches: who they pick, how they set up, when they change things, and the squad, transfer and leadership calls they make. Every article names the competition and centres on one manager's decision.</p><h2>Sourcing and accuracy</h2><p>Each article is built from named, linkable sources: official club and competition channels, press conferences, and established news organisations. We link to every source we use at the foot of the article. We quote exactly and never invent quotes, scores, statistics or facts. Where reports conflict or a claim is unconfirmed, we say so or leave it out.</p><p>Articles are researched and drafted with the help of AI tools and then checked line by line against the linked sources before publication.</p><h2>Independence</h2><p>We are not affiliated with any club, league, governing body or betting company. No one pays for coverage.</p><h2 id=\"corrections\">Corrections</h2><p>If we get something wrong we correct it promptly and, for any significant change, add a note to the article saying what changed. Report an error to <a href=\"mailto:hello@decidefootball.com\">hello@decidefootball.com</a> with the article link.</p><h2>Images</h2><p>Images are either AI-generated illustrations, labelled as such and explained in our <a href=\"/image-policy/\">image policy</a>, or Creative Commons photographs credited with the photographer, licence and source.</p><h2>Style</h2><p>We write in UK English and say football.</p>"),
"newsletter":("The Decide Football briefing","<p>Get the biggest managerial decisions from across world football by email. It's free, and every email has an unsubscribe link.</p>"+signup()),
"newsletter/thanks":("Thanks for signing up","<p>You're on the list for the Decide Football briefing. If something went wrong, please <a href=\"/newsletter/\">try again</a>.</p><p><a href=\"/\">Back to the latest stories</a></p>"),
"contact":("Contact","<p>For corrections, tips or other enquiries, email <a href=\"mailto:hello@decidefootball.com\">hello@decidefootball.com</a>. If you spot an error in a story, tell us which article and what is wrong and we will correct it promptly.</p>"),
"privacy":("Privacy policy","<p>Decide Football is published by Joshua Israel Ventures LLC. This policy explains what data we collect and how you can control it.</p><h2>Analytics</h2><p>We use Cloudflare Web Analytics, which counts page views without cookies and without tracking you across sites.</p><h2>Advertising and Google cookies</h2><p>We may show adverts served by Google and its partners. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the internet. You can opt out of personalised advertising in <a href=\"https://adssettings.google.com/\" rel=\"noopener\">Google Ads Settings</a>, or opt out of some third-party vendors' cookies at <a href=\"https://www.aboutads.info/choices/\" rel=\"noopener\">aboutads.info</a> and <a href=\"https://www.youronlinechoices.eu/\" rel=\"noopener\">youronlinechoices.eu</a>. Learn more in <a href=\"https://policies.google.com/technologies/partner-sites\" rel=\"noopener\">how Google uses information from sites that use its services</a>.</p><h2>Consent</h2><p>Before any advertising or measurement cookies are used for visitors in the UK, the European Economic Area and Switzerland, we will ask for consent through a Google-certified consent message. You will be able to change or withdraw your consent at any time through that message.</p><h2>Newsletter</h2><p>If you sign up for our newsletter we store your email address and the time you signed up, use it only to send the Decide Football briefing, and delete it if you unsubscribe or ask us to.</p><h2>Contact and your rights</h2><p>If you email us, we use your address only to reply. You can request access to, correction of or deletion of any data we hold about you by emailing <a href=\"mailto:hello@decidefootball.com\">hello@decidefootball.com</a>.</p>"),
"terms":("Terms of use","<p>Content on Decide Football is provided for information only and may be updated or corrected. Quotes are reproduced from their original sources, which are linked. You may share links to our articles; please do not republish full articles without permission. Joshua Israel Ventures LLC is not liable for decisions made on the basis of this content.</p>"),
"image-policy":("Image policy","<p>Most images on Decide Football are AI-generated illustrations. They do not show real events, real photographs or real people as they actually appeared, and they are not photos taken at any match. Each one is labelled AI-generated, and that label links to this page.</p><p>Some articles use Creative Commons photographs. These are credited under the image with the photographer, the licence and a link to the original.</p>")}
for k,(t,b) in S.items():
    ex='<meta name="robots" content="noindex">' if k=="newsletter/thanks" else ""
    w(f"{k}/index.html",page(f"{t} – Decide Football",t+" – Decide Football",f"/{k}/",f'<div class="page post"><h1>{t}</h1>{b}</div>',ex))
from datetime import datetime,timezone,timedelta
last=lambda L:max([a["date"][:10] for a in L] or ["2026-11-03"])
static_lastmod={"image-policy":"2026-11-20"}
urls=[("/",last(A))]+[(f"/category/{k}/",last([a for a in A if a["cat"]==k])) for k in CATS if CN[k]>=2]+[(f"/league/{k}/",last([a for a in A if a["league"]==k])) for k in LEAGUES if LN[k]>=2]+[("/leagues/",last(A))]+[(f'/news/{a["slug"]}/',a.get("modified",a["date"])[:10]) for a in A]+[(f"/{k}/",static_lastmod.get(k,"2026-11-05")) for k in S if k!="newsletter/thanks"]
w("sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+"".join(f"<url><loc>{D}{u}</loc><lastmod>{m}</lastmod></url>" for u,m in urls)+"</urlset>\n")
cut=datetime.now(timezone.utc)-timedelta(days=2)
NA=[a for a in A if datetime.fromisoformat(a["date"])>=cut] or A[:1]
w("news-sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">'+"".join(f'<url><loc>{D}/news/{a["slug"]}/</loc><news:news><news:publication><news:name>Decide Football</news:name><news:language>en</news:language></news:publication><news:publication_date>{a["date"]}</news:publication_date><news:title>{html.escape(a["title"])}</news:title></news:news></url>' for a in NA)+"</urlset>\n")
w("robots.txt","User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: https://decidefootball.com/sitemap.xml\nSitemap: https://decidefootball.com/news-sitemap.xml\n")
from email.utils import format_datetime
def enc(a):
    if not a.get("image"): return ""
    p=a["image"][0]; ext=p.rsplit(".",1)[1].replace("jpg","jpeg")
    try: n=os.path.getsize(p.lstrip("/"))
    except OSError: n=0
    return f'<enclosure url="{D}{p}" type="image/{ext}" length="{n}"/>'
items="".join(f'<item><title>{html.escape(a["title"])}</title><link>{D}/news/{a["slug"]}/</link><guid isPermaLink="true">{D}/news/{a["slug"]}/</guid><pubDate>{format_datetime(datetime.fromisoformat(a["date"]))}</pubDate><category>{CATS[a["cat"]]}</category><category>{LEAGUES[a["league"]]}</category><description>{html.escape(a["desc"])}</description>{enc(a)}</item>' for a in A)
w("feed.xml",f'<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Decide Football</title><link>{D}/</link><atom:link href="{D}/feed.xml" rel="self" type="application/rss+xml"/><description>{TAG}</description><language>en-gb</language><lastBuildDate>{format_datetime(datetime.fromisoformat(A[0]["date"]))}</lastBuildDate><image><url>{D}/assets/logo.png</url><title>Decide Football</title><link>{D}/</link></image>{items}</channel></rss>\n')
w("ads.txt","google.com, pub-5681559774142917, DIRECT, f08c47fec0942fa0\n");w("CNAME","decidefootball.com\n");w(".nojekyll","")
for s,lgk in [("carrick-names-united-team-roma","champions-league"),("iraola-press-conference-fenerbahce-nyoni","champions-league")]:
    w(f"news/{s}/index.html",f'<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Moved – Decide Football</title><meta name="robots" content="noindex"><link rel="canonical" href="{D}/league/{lgk}/"><meta http-equiv="refresh" content="0; url=/league/{lgk}/"></head><body><p>This story has been removed. <a href="/league/{lgk}/">See the latest {LEAGUES[lgk]} decisions</a>.</p></body></html>')
w("404.html",page("Page not found – Decide Football","Page not found","/404.html",'<h1>Page not found</h1><p><a href="/">Back to the latest stories</a></p>'))
print("built",len(urls))
