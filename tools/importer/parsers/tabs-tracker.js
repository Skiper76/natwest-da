/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-tracker. Base: tabs.
 * Source: natwest.com multiple-article-list "Insurance Tracker" shelf
 *         (multiplearticlelist / selectorTab). Desktop layout = a list of
 *         .selectorcard tabs on the left, each paired with a right-hand image
 *         (#ariaControls-N). A duplicate mobile carousel (.mal-carousel-wrapper)
 *         is ignored to avoid double content.
 * Structure (from library-description): 2 columns, multiple rows.
 *   Row 1: block name
 *   Each subsequent row = one tab: [tab label, tab content (image + description)]
 */
export default function parse(element, { document }) {
  // Desktop selector tabs (left column). Ignore the mobile carousel copy.
  const selectorTab = element.querySelector('.selectorTab');
  const cards = selectorTab
    ? Array.from(selectorTab.querySelectorAll('.selectorTab-l .selectorcard'))
    : [];

  // Right-hand images, keyed by their ariaControls index.
  const panelImages = selectorTab
    ? Array.from(selectorTab.querySelectorAll('.selectorTab-r [id^="ariaControls-"]'))
    : [];

  const cells = [];

  cards.forEach((card, index) => {
    // Tab label = the card's title.
    const labelCell = [];
    const title = card.querySelector('.title-wrapper .basictitle, .basictitle, .title-wrapper h2, h2, h3, .cmp-title');
    if (title) labelCell.push(title);

    // Tab content = the paired panel image + the card's short description.
    const contentCell = [];
    const panelImage = (panelImages[index] && panelImages[index].querySelector('img'))
      || (panelImages[index] && panelImages[index].tagName === 'IMG' ? panelImages[index] : null);
    if (panelImage) contentCell.push(panelImage);

    const desc = card.querySelector('.text-description .basictext, .text-wrapper .basictext, .text-description, .basictext');
    if (desc) contentCell.push(desc);

    if (labelCell.length || contentCell.length) {
      cells.push([labelCell.length ? labelCell : '', contentCell.length ? contentCell : '']);
    }
  });

  // Fallback: if no selector tabs found, try the mobile carousel items as tabs.
  if (!cells.length) {
    const items = Array.from(element.querySelectorAll('.mal-carousel-wrapper .item, .slick-track .item'))
      .filter((it) => !it.className.includes('slick-cloned'))
      .filter((it, i, arr) => !arr.some((other) => other !== it && other.contains(it)));
    items.forEach((item) => {
      const label = item.querySelector('.details h3, .text-comp, h2, h3');
      const contentCell = [];
      const img = item.querySelector('.img-container img, img');
      if (img) contentCell.push(img);
      const body = item.querySelector('.details .text-wrapper');
      if (body) contentCell.push(body);
      if (label || contentCell.length) {
        cells.push([label || '', contentCell.length ? contentCell : '']);
      }
    });
  }

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-tracker', cells });
  element.replaceWith(block);
}
