/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-account. Base: cards.
 * Source: natwest.com product/account card shelves. Two source families:
 *   A) product card shelf (productCardShelf__comp / productcardshelf): rich single
 *      product cards, each .productcard containing a mobile (#productcard-mob) and a
 *      desktop (#product-card-desktop) rendering of the same card.
 *   B) multiple-listing shelf (productcomp-multiple-shelf): a .productlist of
 *      .product-comp account cards (heading + copy + CTA, usually no image).
 * Structure (from library-description): 2 columns, multiple rows.
 *   Row 1: block name
 *   Each subsequent row = one card: [image, text content (title + description + CTAs)]
 * Cards without an image get an empty first cell so every row keeps 2 columns.
 */
function collectText(scope, textCell) {
  const title = scope.querySelector(
    '.product-card__leftside__title .cmp-title, .product-card__leftside__header__title .cmp-title, .cmp-title, .title-comp, h2, h3, h4'
  );
  if (title) textCell.push(title);

  const bodies = Array.from(scope.querySelectorAll(
    '.product-card__leftside__textarea__checktext .cmp-text, .product-card__rightside__term .cmp-text, .product-card__rightside__content__term .cmp-text, .cmp-text.comp-rich-text'
  )).filter((b, i, arr) => !arr.some((o) => o !== b && (o.contains(b) || b.contains(o))))
    .filter((b) => !textCell.some((el) => el.contains(b) || b.contains(el)));
  bodies.forEach((b) => textCell.push(b));

  const ctas = Array.from(scope.querySelectorAll(
    '.product-card__rightside__ctaWrapper a, .cta-wrapper a, .cta.button a, a.cta-button'
  ));
  ctas.forEach((cta) => {
    if (!textCell.some((el) => el.contains(cta))) textCell.push(cta);
  });
}

export default function parse(element, { document }) {
  const cells = [];

  // Family A: rich product cards.
  const productCards = Array.from(element.querySelectorAll('.productcard'));
  productCards.forEach((wrapper) => {
    // Prefer the desktop rendering; fall back to mobile / any .product-card.
    const card = wrapper.querySelector('#product-card-desktop')
      || wrapper.querySelector('#productcard-mob')
      || wrapper.querySelector('.product-card')
      || wrapper;
    const image = card.querySelector(
      '.product-card__rightside__image img, .product-card__leftside__header__image img, .cmp-image img, img'
    );
    const textCell = [];
    collectText(card, textCell);
    if (image || textCell.length) {
      cells.push([image || '', textCell.length ? textCell : '']);
    }
  });

  // Family B: multiple-listing account cards (only if no rich product cards found).
  if (!cells.length) {
    const comps = Array.from(element.querySelectorAll('.productlist .product-comp, .multi-product-comp .product-comp'))
      .filter((c, i, arr) => !arr.some((o) => o !== c && o.contains(c)));
    comps.forEach((comp) => {
      const image = comp.querySelector('.image-wrapper img, .image img, .cmp-image img');
      const textCell = [];
      collectText(comp, textCell);
      if (image || textCell.length) {
        cells.push([image || '', textCell.length ? textCell : '']);
      }
    });
  }

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-account', cells });
  element.replaceWith(block);
}
