/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: natwest site-wide cleanup.
 *
 * Removes non-authorable NatWest AEM site chrome and widgets so the import
 * contains only page-level authorable content. Header and footer are
 * auto-populated in EDS, so all site chrome is stripped.
 *
 * ALL selectors below were verified against migration-work/cleaned.html
 * (homepage) and the per-template cleaned.html files. Source line references
 * point at the homepage capture.
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Overlays / widgets that must go before block parsing so they cannot
    // interfere with block matching.

    // OneTrust cookie/consent banner + preference centre. The single
    // #onetrust-consent-sdk wrapper (cleaned.html line 737) encloses the
    // banner (#onetrust-banner-sdk) and the preference centre (#onetrust-pc-sdk).
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '#onetrust-pc-sdk',
    ]);

    // Cora AI chatbot widget (ccm-* prefixed). Root at #ccm-init-root
    // (cleaned.html line 976); remove the whole widget tree.
    WebImporter.DOMUtils.remove(element, [
      '#ccm-init-root',
      '#ccm-init-chat-root',
      '.ccm-chat-app-root',
      '.ccm-body-container',
    ]);

    // Adobe Target personalization prompt (mbox). Only the completion-prompt
    // personalization mbox is non-authorable — other .mboxDefault wrappers
    // contain authorable blocks (e.g. the hero at #mbox_AEM-NWB-PER-hero-image),
    // so target the prompt specifically and NOT all .mboxDefault.
    WebImporter.DOMUtils.remove(element, [
      '#mbox_AEM-NWB-PER-completion-prompt-1_9520797391098066',
      '[id^="mbox_AEM-NWB-PER-completion-prompt"]',
      '.completion-prompt',
    ]);

    // Skip links (cleaned.html line 6) — accessibility helper, not authorable.
    WebImporter.DOMUtils.remove(element, [
      '#skiplinks',
      '.skip-links',
      '.skip-link-wrap',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome: header (global nav), footer, and the
    // NatWest footer wrapper (cleaned.html lines 6, 713).
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      '.ia__footer',
      '.iah',
    ]);

    // Smart app banner + config (cleaned.html line 5).
    WebImporter.DOMUtils.remove(element, [
      '#smartBannerConfig',
    ]);

    // Global search UI (part of the header shell, cleaned.html line 611).
    WebImporter.DOMUtils.remove(element, [
      '.iah__search',
      '#navbar',
      '.lah__search__show',
    ]);

    // Small non-authorable helper / offscreen elements.
    // #new-window-0 accessibility helper (line 737), #navigationTag / #dumpParams
    // AEM template inputs (lines 4-5), and the empty global dropdown (line 736).
    WebImporter.DOMUtils.remove(element, [
      '#new-window-0',
      '#navigationTag',
      '#dumpParams',
      '.globaldropdown',
      '.iah__over-lay',
      '.ot-scrn-rdr',
    ]);

    // Leftover / non-content elements: clientlib <link> stylesheets scattered
    // through the markup, <meta>, <noscript>, LivePerson and OneTrust <iframe>
    // (cleaned.html lines 970-975), and <source>.
    WebImporter.DOMUtils.remove(element, [
      'link',
      'meta',
      'noscript',
      'iframe',
      'source',
      'script',
      'style',
    ]);

    // Attribute cleanup: strip Adobe/analytics tracking and inline handlers
    // where present in the captured DOM.
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-track');
      el.removeAttribute('data-tracking');
    });
  }
}
