# Hero image

`hero.gif` is the animated marquee at the top of the root [`README.md`](../../../../README.md).

## Source

`hero.html` is the editable source — a single self-contained HTML file (inline CSS, Google Fonts via `<link>`, timeline in plain JS). Open it in any browser to preview the animation; no build step.

Key numbers (all in `hero.html`):

| Element | Current value | Where |
|---|---|---|
| Stage | 1200 × 260 CSS px | `.stage { width/height }` |
| Brand column | 440 px | `grid-template-columns` on `.stage` |
| Wordmark font | 42 px | `.name` |
| Tagline / terminal body | 15.5 px mono | `.tagline`, `.term-body` |
| Animation loop | 20 s | `TIMELINE.loopEnd` |
| Rules count shown | "40+ battle-tested rules" | `.tagline` copy |

## Re-rendering

Requires Node, Puppeteer, and ffmpeg.

```bash
npm install puppeteer      # one-time, ~170 MB Chromium download
```

Capture at **2× retina** (the GIF is 2400 × 520 native so GitHub renders it crisp on high-DPI displays). The `deviceScaleFactor` setting is ignored by Chromium's screencast API, so the workaround is to size the viewport to 2× and apply `zoom: 2` to the body — and override the preview-only `@media (min-width: 1300px)` block so the body stays flush at (0, 0) in the capture.

Save as `capture.js` next to `hero.html`:

```js
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML = path.resolve('hero.html');
const OUT = path.resolve('frames');
const MANIFEST = path.resolve('frames.txt');
const DURATION_MS = 20000;   // must match TIMELINE.loopEnd in hero.html
const W = 1200, H = 260;

(async () => {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
  fs.mkdirSync(OUT);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--hide-scrollbars'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W * 2, height: H * 2, deviceScaleFactor: 1 });
  await page.goto('file://' + HTML, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: `
    html, body { margin: 0 !important; padding: 0 !important; }
    body { display: block !important; align-items: flex-start !important; justify-content: flex-start !important; }
  `});
  await page.evaluate(() => { document.body.style.zoom = '2'; });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 400));
  const client = await page.target().createCDPSession();
  const frames = []; let i = 0, startTs = null, stopped = false;
  client.on('Page.screencastFrame', async ({ data, metadata, sessionId }) => {
    try { await client.send('Page.screencastFrameAck', { sessionId }); } catch {}
    if (stopped) return;
    if (startTs === null) startTs = metadata.timestamp;
    const ms = (metadata.timestamp - startTs) * 1000;
    if (ms > DURATION_MS) { stopped = true; return; }
    const name = `f${String(i++).padStart(5, '0')}.png`;
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    frames.push({ name, ms });
  });
  await page.evaluate(() => window.runLoop && window.runLoop());
  await client.send('Page.startScreencast', { format: 'png', everyNthFrame: 1 });
  await new Promise(r => setTimeout(r, DURATION_MS + 400));
  try { await client.send('Page.stopScreencast'); } catch {}
  await browser.close();
  let txt = '';
  for (let j = 0; j < frames.length; j++) {
    const dur = (j + 1 < frames.length ? (frames[j+1].ms - frames[j].ms) / 1000 : 0.1).toFixed(4);
    txt += `file '${path.join(OUT, frames[j].name)}'\nduration ${dur}\n`;
  }
  txt += `file '${path.join(OUT, frames[frames.length-1].name)}'\n`;
  fs.writeFileSync(MANIFEST, txt);
})();
```

Then encode to GIF (two-pass palette):

```bash
node capture.js

ffmpeg -y -f concat -safe 0 -i frames.txt \
  -vf "fps=30,palettegen=stats_mode=diff:max_colors=256" palette.png

ffmpeg -y -f concat -safe 0 -i frames.txt -i palette.png \
  -lavfi "fps=30 [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" \
  -loop 0 hero.gif
```

Target size ≤ 10 MB. Current file is ~120 KB (the scene is mostly flat colors so palette encoding stays small even at 2×).
