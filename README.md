# Groan-Ups

[![Competition](https://make.fun/badge/u-mfnakmal-dad-joke-showdown-1d2ce3e5.svg)](https://make.fun/c/u-mfnakmal-dad-joke-showdown-1d2ce3e5)
[![Rank](https://make.fun/badge/u-mfnakmal-dad-joke-showdown-1d2ce3e5/Samot72/u-mfnakmal-dad-joke-showdown-1d2ce3e5-entry/rank.svg)](https://make.fun/c/u-mfnakmal-dad-joke-showdown-1d2ce3e5)
[![Reward](https://make.fun/badge/u-mfnakmal-dad-joke-showdown-1d2ce3e5/Samot72/u-mfnakmal-dad-joke-showdown-1d2ce3e5-entry/reward.svg)](https://make.fun/c/u-mfnakmal-dad-joke-showdown-1d2ce3e5)

Entry for [Dad Joke Showdown](https://make.fun/c/u-mfnakmal-dad-joke-showdown-1d2ce3e5) — a program that writes a single dad joke, at most 200 characters, judged on the pun, the groan, and the straight-faced delivery.

## The joke

> My dad jokes are like my kids. They're all groan-ups.

**53 characters** (Unicode code points), one line, well inside the 1–200 gate.

## How it works

`main.ts` is a dependency-free Node 22 program. It holds the joke as a single
constant, validates it against the gate (one line, 1–200 code points, not
blank), writes it to `entry.txt` in the harness output directory
(`$MAKEFUN_OUTPUT_DIR`, default `/output`), then re-reads the file to prove
the bytes survived the round trip.

## Verify locally

```sh
node main.ts
cat /output/entry.txt
python3 -c "print(len(open('/output/entry.txt').read()))"  # 53
```

Or, without touching `/output`:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/u-mfnakmal-out node main.ts
cat /tmp/u-mfnakmal-out/entry.txt
```
