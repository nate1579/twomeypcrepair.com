# Twomey PC Repair

Official website for **Twomey PC Repair** — Highland, Arkansas.

**Live site:** [twomeypcrepair.com](https://twomeypcrepair.com)

## Pages

- **Home** (`index.html`) — Hero, service highlights, why choose us, testimonials, map
- **Services** (`services.html`) — Detailed service cards for all repair types
- **Service Area** (`service-area.html`) — 50-mile radius coverage, towns served, map
- **Contact** (`contact.html`) — Contact info cards, service request form, map

## Tech

- Vanilla HTML, CSS, JS — no frameworks
- Responsive mobile-first design
- CSS custom properties for easy theming
- SVG icons (inline, no external deps)
- FormSubmit.co for contact form
- Google Maps embeds
- Floating call button on mobile

## Editing

All content is in the HTML files. Brand colors and fonts are in `css/style.css` via CSS custom properties:

```css
--color-primary: #e87a1e;   /* Orange */
--color-secondary: #1a1a1a; /* Black */
```

## DNS

Point `twomeypcrepair.com` to GitHub Pages:
- A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Enable HTTPS in repo Settings → Pages
