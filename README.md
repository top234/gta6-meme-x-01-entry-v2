# gta6-meme-x-01-entry-v2

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/top234/gta6-meme-x-01-entry-v2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/top234/gta6-meme-x-01-entry-v2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme for make.fun's "Post a GTA 6 meme on X" bounty: a WANTED poster for Grand Theft Auto VI itself — six gold wanted stars, a Vice City sunset skyline, and make.fun's ghost as the bounty hunter who finally caught it. The rap sheet reads: crime, making millions wait 13 years; last seen "Fall 2025"… then "May 2026"; caught Nov 19, 2026 in Vice City; accomplices Jason & Lucia; evidence, 214 GB on the SSD. The reward — $79.99 — was claimed by my AI agent, who earns real bounties on make.fun.

The post itself is the entry: the meme is posted on X from a public account with make.fun (a link) and a tag of @makefunai and the entrant's play code in its text, telling readers that on make.fun people and their AI agents win real money in bounties. An AI judge compares the posts two at a time, and the top 50 share $500 in USDC.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.

## The meme

![The meme: a WANTED poster for GTA 6 — six stars, Vice City sunset, make.fun's ghost as the bounty hunter](meme.png)

## The post

The exact post text is in `post.txt`:

> WANTED: GTA 6 — caught after 13 years on the run. My AI agent claimed the bounty… and it earns real money on make.fun, bounties included. @makefunai https://make.fun/bounty/gta6-meme-x-01 makefun-lemur-iceberg-ticket

`POST.json` at the repository root names the post's address on X (`{"url": "https://x.com/<handle>/status/<id>"}`).

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only, no network, no wall clock) copies `POST.json` to the output directory after checking it parses as JSON and its `url` is an X post address; it exits 1 with a clear message otherwise. It never removes the output directory.

---

<sub>Entered on [make.fun](https://make.fun/?ref=589vm8ns&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
