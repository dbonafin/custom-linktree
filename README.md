# Single release page

A mobile first, static music release page built with React, TypeScript, and Vite. It is designed to be reused for each single and deployed to Netlify without a server or content service.

## Update for a release

1. Replace the sample artist, title, date, YouTube URL, streaming URLs, and social URLs in [`src/release.ts`](src/release.ts).
2. Put the cover image in `public/` and set `artwork` to its path, such as `/my-single-cover.jpg`.
3. Set `isSample` to `false` to remove the sample-content banner.
4. Remove any platform or social entries you do not use. Empty or invalid URLs are hidden automatically.

The streaming links should point to this specific single on each service. The sample config uses service homepages and has no video configured; replace those before publishing.

## Run locally

```sh
npm install
npm run dev
```

## Deploy to Netlify

Connect the repository to Netlify. The included `netlify.toml` sets the build command to `npm run build` and the publish directory to `dist`. Each new release only requires updating `src/release.ts` (and the artwork if needed), then committing and deploying the changes.

YouTube playback is click to play with no autoplay. YouTube's embedded player counts a view when playback starts, subject to YouTube's validation. Autoplayed embeds do not increment views. See [YouTube's embed guidance](https://support.google.com/youtube/answer/171780?hl=en).
