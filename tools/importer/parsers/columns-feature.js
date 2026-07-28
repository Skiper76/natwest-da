/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-feature. Base: columns.
 * Source: natwest.com feature bands. Two source families are handled:
 *   A) single-article shelf (singlearticle / single-article-shelf / singlearticlev2):
 *      one feature = title + body + CTAs, optionally a fifty-fifty image.
 *   B) multiple-listing shelf (productlistingmultiple / productcomp-multiple-shelf):
 *      a list of .product-comp items shown side by side; each item = image + heading + links.
 * Structure (from library-description): flexible columns/rows based on visual grouping.
 *   Row 1: block name. Row 2: one cell per visual column.
 *
 * Helper: build a text cell capturing ALL content within a container
 * (heading, rich text / paragraph link lists, CTAs) so nothing is dropped.
 */
function buildTextCell(scope) {
  const cell = [];
  const title = scope.querySelector(
    ':scope .title-wrapper .cmp-title, :scope .cmp-title, :scope .title-comp, :scope h2, :scope h3, :scope h4'
  );
  if (title) cell.push(title);

  // Grab every rich-text / text block so multi-paragraph link lists are preserved.
  const textBlocks = Array.from(
    scope.querySelectorAll('.rte-wrapper .cmp-text, .cmp-text.comp-rich-text, .comp-rich-text, .rte-wrapper .text')
  ).filter((tb) => !cell.some((el) => el.contains(tb) || tb.contains(el)));
  textBlocks.forEach((tb) => cell.push(tb));

  // CTAs that live outside the text blocks (e.g. "Search all FAQs", "Find out more").
  const ctas = Array.from(
    scope.querySelectorAll('.additional-cta-wrapper a, .cta-wrapper a, .cta.button a, a.cta-button')
  );
  ctas.forEach((cta) => {
    if (!cell.some((el) => el.contains(cta))) cell.push(cta);
  });
  return cell;
}

export default function parse(element, { document }) {
  const cells = [];

  // Family B: multiple-listing shelf — one column per product card.
  const products = Array.from(element.querySelectorAll(':scope .product-comp'));
  if (products.length) {
    const row = products.map((product) => {
      const cell = [];
      const img = product.querySelector('.image-wrapper img, .image img, .cmp-image img');
      if (img) cell.push(img);
      cell.push(...buildTextCell(product));
      return cell.length ? cell : '';
    });
    if (row.some((c) => c !== '')) {
      cells.push(row);
    }
  } else {
    // Family A: single-article feature band.
    const shelf = element.querySelector('.single-article-shelf, .shelf-wrapper') || element;

    const imageWrapper = shelf.querySelector('.image-div, .image-wrapper, [class*="image-div"]');
    const image = (imageWrapper && imageWrapper.querySelector('img'))
      || shelf.querySelector('.article_image img');

    const textCell = buildTextCell(shelf);

    if (image) {
      const imgRight = element.className.includes('img-right')
        || shelf.className.includes('img-right');
      cells.push(imgRight
        ? [textCell.length ? textCell : '', image]
        : [image, textCell.length ? textCell : '']);
    } else if (textCell.length) {
      cells.push([textCell]);
    }
  }

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
