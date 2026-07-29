# NatWest Lab

An AEM Edge Delivery Services project recreating the NatWest.com experience — branding, layout, and content blocks — built on top of [aem-boilerplate](https://github.com/adobe/aem-boilerplate).

## Environments
- Preview: https://main--natwest-da--skiper76.aem.page/
- Live: https://main--natwest-da--skiper76.aem.live/

## Blocks

Alongside the standard boilerplate blocks (`cards`, `columns`, `footer`, `fragment`, `header`, `hero`, `widget`), this project adds a set of NatWest-specific blocks:

- `hero-purple` — brand-purple promotional hero banner
- `accordion-help`, `accordion-legal` — expandable FAQ/legal accordions
- `cards-account`, `cards-cover`, `cards-icon` — card variants for accounts, product covers, and icon+text callouts
- `carousel-cards` — swipeable card carousel
- `columns-feature` — feature panels with image/text columns
- `search-faq` — FAQ search
- `tabs-tracker` — tabbed status tracker

Brand tokens (colors, fonts, spacing) live in `styles/brand.css`.

## Documentation

Before working on this project, we recommend going through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
2. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
3. Open this directory in your favorite IDE and start coding :)
