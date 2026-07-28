/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-legal. Base: accordion.
 * Source: natwest.com contextual help shelf used for legal/disclaimer content
 *         (contextualHelpShelf / contextualhelp / accordion-comp) — same DOM as
 *         accordion-help, but semantically the "legal stuff" band.
 * Structure (from library-description): 2 columns, multiple rows.
 *   Row 1: block name
 *   Each subsequent row = one accordion item: [title, expandable content]
 * Note: the shelf-level heading (.title-wrapper, e.g. "The legal stuff") is a
 * section label, NOT an accordion item, so it is excluded from the rows.
 */
export default function parse(element, { document }) {
  const panels = Array.from(
    element.querySelectorAll('.accordion-comp .panel, .panel-group .panel, .accordion-item, .panel.panel-default')
  ).filter((p, i, arr) => !arr.some((other) => other !== p && other.contains(p)));

  const cells = [];

  panels.forEach((panel) => {
    const title = panel.querySelector(
      '.panel-heading .cmp-title, .panel-heading .title-comp, .panel-heading h2, .panel-heading h3, .panel-heading h4, .accordion-header'
    );

    const content = panel.querySelector(
      '.panel-body .cmp-text, .panel-body .comp-rich-text, .panel-body .text, .panel-collapse .cmp-text, .panel-body, .accordion-content'
    );

    if (title || content) {
      cells.push([title || '', content || '']);
    }
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-legal', cells });
  element.replaceWith(block);
}
