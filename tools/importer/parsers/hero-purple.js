/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-purple. Base: hero.
 * Source: natwest.com hero banner (section.herobanner.championPurple)
 * Structure (from library-description): 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: background/hero image (optional)
 *   Row 3: title (heading) + subheading + CTA(s)
 */
export default function parse(element, { document }) {
  // Row 2: hero image. Source uses a foreground illustration image.
  const image = element.querySelector(
    '.herobanner__image-content img, .image-wrapper img, img.image-wrap, img[class*="image"]'
  ) || element.querySelector('img');

  // Row 3 content: title, subheading, CTAs.
  // Prefer the hero's own title element; fall back to first heading inside the banner.
  // Text-only hero variants (e.g. support hub banners) contain only an h1/heading.
  const heading = element.querySelector(
    '.title-wrapper h1, .title-comp, .header_one--title h1, h1, h2'
  );
  const subheading = element.querySelector(
    '.control_text .comp-rich-text, .control_text p, .comp-rich-text p'
  );
  const ctaLinks = Array.from(
    element.querySelectorAll('.cta-wrapper a, a.cta, a.cta-primary, a.button')
  );

  // Empty-block guard
  if (!heading && !subheading && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (optional)
  if (image) {
    cells.push([image]);
  }

  // Row 3: title + subheading + CTAs (single cell holding all)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-purple', cells });
  element.replaceWith(block);
}
