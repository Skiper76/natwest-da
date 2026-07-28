/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-cards. Base: carousel.
 * Source: natwest.com "what I need to know" slider (whatineedtoknow / what_need_to_know_shelf).
 * Structure (from library-description): 2 columns, multiple rows.
 *   Row 1: block name
 *   Each subsequent row = one slide: [image, text content (title + description + CTA)]
 */
export default function parse(element, { document }) {
  // Each slide is a .item / .slick-slide. Exclude slick-generated clones so
  // duplicated slides aren't emitted twice.
  let slides = Array.from(element.querySelectorAll('.slick-track .item, .item.carosuel_sm_md, .slick-slide'))
    .filter((s) => !s.className.includes('slick-cloned'));

  // Dedupe: some markup nests .item inside .slick-slide (or vice versa).
  slides = slides.filter((s, i, arr) => !arr.some((other) => other !== s && other.contains(s)));

  const cells = [];

  slides.forEach((slide) => {
    const image = slide.querySelector('.img-container img, .img-carousel-wrapper img, .image img, img');

    const textCell = [];
    const title = slide.querySelector('.details .cmp-title, .details .title-comp, .cmp-title, h2, h3, h4');
    if (title) textCell.push(title);

    const body = slide.querySelector('.text-wrapper .cmp-text, .text-wrapper .comp-rich-text, .details .cmp-text');
    if (body) textCell.push(body);

    const cta = slide.querySelector('.item-cta a, .cta.button a, a.cta-button');
    if (cta && !textCell.some((el) => el.contains(cta))) textCell.push(cta);

    // A slide requires an image per the block spec; text is optional.
    if (image) {
      cells.push([image, textCell.length ? textCell : '']);
    }
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-cards', cells });
  element.replaceWith(block);
}
