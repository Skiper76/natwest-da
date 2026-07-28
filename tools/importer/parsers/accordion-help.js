/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-help. Base: accordion.
 * Source: natwest.com contextual help shelf (contextualHelpShelf / contextualhelp / accordion-comp).
 * Structure (from library-description): 2 columns, multiple rows.
 *   Row 1: block name
 *   Each subsequent row = one accordion item: [title, expandable content]
 * Note: the shelf-level heading (.title-wrapper) is a section label, NOT an
 * accordion item, so it is excluded from the rows.
 */
export default function parse(element, { document }) {
  // Each accordion item is a .panel / .accordion-item.
  const panels = Array.from(
    element.querySelectorAll('.accordion-comp .panel, .panel-group .panel, .accordion-item, .panel.panel-default')
  ).filter((p, i, arr) => !arr.some((other) => other !== p && other.contains(p)));

  const cells = [];

  panels.forEach((panel) => {
    // Title: the clickable heading of the panel.
    const title = panel.querySelector(
      '.panel-heading .cmp-title, .panel-heading .title-comp, .panel-heading h2, .panel-heading h3, .panel-heading h4, .accordion-header'
    );

    // Content: the collapsible body.
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-help', cells });
  element.replaceWith(block);
}
