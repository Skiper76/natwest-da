/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-cover. Base: cards.
 * Source: natwest.com clickable card shelf (clickablecard-shelf / clickablecard__list__item).
 * Structure (from library-description): 2 columns, multiple rows.
 *   Row 1: block name
 *   Each subsequent row = one card: [image, text content (title + description + link)]
 * Note: the shelf-level title/intro (clickablecard__title / clickablecard__text) are
 * section-level content, not cards, so they are not emitted as card rows.
 */
export default function parse(element, { document }) {
  // Each card is a clickable list item (an <a> wrapping title/text/image).
  let cards = Array.from(
    element.querySelectorAll('.clickablecard__list__item, .clickablecard__list--inner > a, .card-item')
  ).filter((c, i, arr) => !arr.some((other) => other !== c && other.contains(c)));

  const cells = [];

  cards.forEach((card) => {
    const image = card.querySelector(
      '.clickablecard__list__item__imagewrap img, .image img, .cmp-image img, img'
    );

    const textCell = [];
    const title = card.querySelector(
      '.clickablecard__list__item__titlewrap .cmp-title, .clickablecard__list__item__titlewrap .title-comp, .cmp-title, h2, h3, h4'
    );
    if (title) textCell.push(title);

    const body = card.querySelector(
      '.clickablecard__list__item__textwrap .cmp-text, .clickablecard__list__item__textwrap .comp-rich-text, .clickablecard__list__item__textwrap .text, .cmp-text.comp-rich-text'
    );
    if (body) textCell.push(body);

    // The card wrapper is itself a link — preserve it as a CTA so the card
    // remains clickable after import.
    const href = card.tagName === 'A'
      ? card.getAttribute('href')
      : (card.querySelector('a[href]') && card.querySelector('a[href]').getAttribute('href'));
    if (href && title) {
      const cta = document.createElement('a');
      cta.href = href;
      cta.textContent = title.textContent.trim();
      textCell.push(cta);
    }

    if (image || textCell.length) {
      cells.push([image || '', textCell.length ? textCell : '']);
    }
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-cover', cells });
  element.replaceWith(block);
}
