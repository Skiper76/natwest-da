/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: natwest section breaks + section metadata.
 *
 * Driven entirely by payload.template.sections from page-templates.json.
 * For each section (processed in reverse so inserts do not shift earlier
 * matches): insert a <hr> before the section element when it is not the first
 * section, and append a Section Metadata block after the section element when
 * the section defines a `style`.
 *
 * All section selectors originate from page-templates.json and were verified
 * against the per-template captured cleaned.html files:
 *   - homepage: div.whatineedtoknow.theme-grey, #main-content-wrapper nth-child
 *   - product-overview: div.singlearticlev2.theme-rose, section.contextualHelpShelf
 *   - product-detail: div.singlearticle.theme-{grey,aqua,purple}
 *   - segment-landing: #who-is-premier-for, .shelf_standAlone
 *
 * Runs in afterTransform only (per reference guide).
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

/**
 * Resolve the first matching element for a section's selector list.
 * section.selector may be a string or an array of candidate selectors.
 */
function findSectionElement(root, selector) {
  const selectors = Array.isArray(selector) ? selector : [selector];
  for (const sel of selectors) {
    if (!sel) continue;
    try {
      const el = root.querySelector(sel);
      if (el) return el;
    } catch (e) {
      // Invalid selector for this DOM; skip and try the next candidate.
    }
  }
  return null;
}

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const template = payload && payload.template;
    const sections = template && template.sections;
    if (!sections || sections.length < 2) {
      // Section transformer only applies when a template has 2+ sections.
      return;
    }

    const doc = element.ownerDocument;

    // Process in reverse order so inserting <hr>/metadata for a later section
    // does not disturb the DOM position of earlier, not-yet-processed sections.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const sectionEl = findSectionElement(element, section.selector);
      if (!sectionEl) {
        // Selector did not match on this page; nothing to anchor to.
        continue;
      }

      // Append a Section Metadata block after the section when a style is set.
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        if (sectionEl.parentNode) {
          sectionEl.parentNode.insertBefore(metaBlock, sectionEl.nextSibling);
        }
      }

      // Insert a section break before every section except the first, and
      // only when there is preceding content to break away from.
      if (i > 0 && sectionEl.previousElementSibling) {
        const hr = doc.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }
}
