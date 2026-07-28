/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-icon. Base: cards.
 * Source: natwest.com icon/promo card shelves (taskpanel, promocard, comp_whyUs_shelf, quickaction)
 * Structure (from library-description): 2 columns, multiple rows.
 *   Row 1: block name
 *   Each subsequent row = one card: [image/icon, text content (title + description + CTA)]
 */
export default function parse(element, { document }) {
  // Each card is a discrete item. Handle multiple source variants:
  //  - promo/icon cards: .iconcards / [class*="promoCard_"]
  //  - quick-action (taskpanel): .taskpanel__list__item
  //  - why-us shelf: .whyus-card / .card-item
  let cards = Array.from(
    element.querySelectorAll(
      ':scope .iconcards, :scope [class*="promoCard_"], :scope .taskpanel__list__item, :scope .card-item, :scope .whyus-card'
    )
  );

  // Fallback: grid columns that look like individual cards (must have image or title)
  if (!cards.length) {
    cards = Array.from(element.querySelectorAll(':scope [class*="GridColumn"]'))
      .filter((c) => c.querySelector('.card-title, .card-text, .title-comp, .card-image img'));
  }

  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector(
      '.card-image img, .taskpanel__list__item__imgWrap img, .cmp-image img, img.image-wrap, img'
    );

    const textCell = [];
    const title = card.querySelector(
      '.card-title .cmp-title, .card-title .title-comp, .cmp-title, .title-comp, h2, h3, h4'
    );
    if (title) textCell.push(title);

    const body = card.querySelector(
      '.card-text .cmp-text, .card-text .comp-rich-text, .card-text .text, .card-description'
    );
    if (body) textCell.push(body);

    // CTA / label link. In the quick-action variant the link IS the card label
    // (no separate title/body), so include it as the text content in that case.
    const cta = card.querySelector(
      '.taskpanel__list__item__ctaWrap a, .cta-wrapper a, :scope > a.button, .cta a.cta-button, a.cta-primary'
    );
    if (cta && !textCell.some((el) => el.contains(cta))) textCell.push(cta);

    // Only emit a card row if it has real content
    if (image || textCell.length) {
      cells.push([image || '', textCell.length ? textCell : '']);
    }
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-icon', cells });
  element.replaceWith(block);
}
