/* eslint-disable */
/* global WebImporter */
/**
 * Parser for search-faq. Base: search.
 * Source: natwest.com "Find answers in our FAQs" search shelf (shelf_further_asst /
 *         faq_search) — a keyword search input for site/FAQ content.
 * Structure (from library-description): 1 column, 2 rows.
 *   Row 1: block name
 *   Row 2: an absolute/relative URL to the query index the search should use.
 * The block's decorate() reads the first <a href> as the index source and falls
 * back to `${codeBasePath}/query-index.json`, so we emit a link to the site query
 * index (the source FAQ form has no explicit index URL).
 */
export default function parse(element, { document }) {
  // The source search form has no query-index URL; use the site query index,
  // matching the block's default source convention.
  const indexUrl = '/query-index.json';
  const link = document.createElement('a');
  link.href = indexUrl;
  link.textContent = indexUrl;

  const cells = [
    [link],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'search-faq', cells });
  element.replaceWith(block);
}
