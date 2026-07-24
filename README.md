# West Cain Oakley — A Constellation Becoming

A complete static replacement website for **westcainoakley/constellation-becoming**.

The site is intentionally framework-free: plain HTML, CSS and vanilla JavaScript. There is no build step, package manager, CMS or backend.

## File structure

```text
/
├── index.html                 Homepage
├── observatory.html           Research centre and 6174 Protocol
├── storyspace.html            Creative collaboration and fiction
├── archive.html               First Observatory and archive placeholders
├── about.html                 Lucy & West
├── contact.html               Contact areas and mailto link
├── 404.html                   Static fallback page
├── style.css                  Entire design system and responsive layout
├── script.js                  Navigation, reveal, starfield and top button
├── robots.txt                 Basic search-crawler rules
├── README.md                  This file
└── assets/
    ├── README.md              Asset replacement notes
    ├── icons/
    │   └── favicon.svg
    └── images/
        ├── og-card.png        Social preview image
        ├── archive/           Archive placeholders / future source material
        ├── portraits/         Future portraits
        └── storyspace/        Future book and scene art
```

## Preview locally

The pages can be opened directly in a browser, but a tiny local server gives the most accurate preview.

### Python

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

### VS Code

Open the folder and use any static server extension such as Live Server. No compilation is required.

## Upload to GitHub

1. Preserve the current site first using a branch or downloaded zip (see below).
2. Copy every file and the complete `assets` directory into the root of the repository.
3. Commit and push the replacement files.
4. Check the repository's deployment status and open the production domain after Vercel completes.

Example command-line workflow:

```bash
git checkout -b archive/first-observatory
git push -u origin archive/first-observatory
git checkout main
# Replace the old site files with this package.
git add .
git commit -m "Build the new West Cain Oakley observatory"
git push origin main
```

## Vercel deployment

If the existing GitHub repository is already connected to Vercel, a push to the production branch should trigger a redeployment automatically.

For a plain static site, Vercel normally needs no build command. The output directory is the repository root. If the project has legacy framework settings, set:

- **Framework preset:** Other
- **Build command:** leave blank
- **Output directory:** leave blank or `.`
- **Install command:** leave blank

The actual repository and Vercel settings should be checked before changing them; this package does not alter deployment configuration.

## Replace images

Archive placeholders live in `assets/images/archive/`. The simplest path is to keep the existing filenames and replace the SVG files with your own images, then update the file extensions in `archive.html` if needed.

The archive card layout uses `object-fit: cover`, so both landscape and portrait source images will remain tidy. Add accurate `alt` text whenever an image is replaced.

Future portrait images belong in `assets/images/portraits/`. Future book, scene or story artwork belongs in `assets/images/storyspace/`.

The social sharing image is `assets/images/og-card.png`. Keep it at 1200 × 630 pixels for reliable Open Graph previews.

## Edit copy

Each page contains its own semantic HTML and can be edited directly.

Useful search phrases:

- Homepage hero: `A writer, a language model`
- Governing principle: `Contribution without capture`
- Main research framework: `The 6174 Protocol`
- Storyspace definition: `Meaning made in the register of story`
- Contact email: `hello@westcainoakley.com`

Shared visual styles are in `style.css`. Colours, fonts and spacing are controlled by CSS variables at the top of that file.

Shared behaviour is in `script.js`. The site remains readable without JavaScript; JavaScript adds the mobile menu, scroll reveals, starfield, active navigation and return-to-top button.

## Preserve the original site

Use at least one of these before replacing production files:

### Create an archive branch

```bash
git checkout -b archive/first-observatory
git push -u origin archive/first-observatory
git checkout main
```

### Create a tagged snapshot

```bash
git tag first-observatory-final
git push origin first-observatory-final
```

### Download a zip

On GitHub, open the repository, choose **Code → Download ZIP**, and store it outside the repository.

A branch is the most useful option because it preserves history and makes individual files easy to recover.

## Revert

If the new site is the most recent commit and has not been followed by other work:

```bash
git revert HEAD
git push origin main
```

To restore files from the archive branch without rewriting history:

```bash
git checkout archive/first-observatory -- .
git commit -m "Restore the First Observatory"
git push origin main
```

Avoid force-pushing unless you fully understand the impact on repository history and Vercel deployments.

## Accessibility and maintenance

- Semantic landmarks and headings are included.
- Navigation is keyboard accessible and closes with Escape.
- Focus states are visible.
- Colour contrast is designed for dark-mode readability.
- Motion is reduced when `prefers-reduced-motion` is enabled.
- The animated canvas is decorative and hidden from assistive technology.
- No forms collect data and no third-party scripts are loaded.

Before each release, check all pages at narrow mobile, tablet and desktop widths, test keyboard navigation, and confirm the placeholder email and social image are current.
