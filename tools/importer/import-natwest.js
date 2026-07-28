/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroPurpleParser from './parsers/hero-purple.js';
import cardsIconParser from './parsers/cards-icon.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import carouselCardsParser from './parsers/carousel-cards.js';
import accordionHelpParser from './parsers/accordion-help.js';
import accordionLegalParser from './parsers/accordion-legal.js';
import searchFaqParser from './parsers/search-faq.js';
import cardsCoverParser from './parsers/cards-cover.js';
import tabsTrackerParser from './parsers/tabs-tracker.js';
import cardsAccountParser from './parsers/cards-account.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/natwest-cleanup.js';
import sectionsTransformer from './transformers/natwest-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-purple': heroPurpleParser,
  'cards-icon': cardsIconParser,
  'columns-feature': columnsFeatureParser,
  'carousel-cards': carouselCardsParser,
  'accordion-help': accordionHelpParser,
  'accordion-legal': accordionLegalParser,
  'search-faq': searchFaqParser,
  'cards-cover': cardsCoverParser,
  'tabs-tracker': tabsTrackerParser,
  'cards-account': cardsAccountParser,
};

// ALL TEMPLATES (embedded from page-templates.json)
const TEMPLATES = [
  {
    "name": "content-article",
    "urls": [
      "https://www.natwest.com/support-centre/contact-us.html",
      "https://personal.natwest.com/personal/credit-cards/balance-transfer-credit-card.html",
      "https://personal.natwest.com/personal/current-accounts/what-is-a-current-account.html",
      "https://personal.natwest.com/personal/investments/junior-isa.html",
      "https://www.natwest.com/accessibility.html",
      "https://www.natwest.com/accessibility/accessibility-tools.html",
      "https://www.natwest.com/accessibility/branch-accessibility.html",
      "https://www.natwest.com/accessibility/online-accessibility.html",
      "https://www.natwest.com/banking-with-natwest/banking-for-everyone.html",
      "https://www.natwest.com/banking-with-natwest/natwest-app.html",
      "https://www.natwest.com/banking-with-natwest/supporting-critical-workers.html"
    ],
    "representativeUrl": "https://www.natwest.com/support-centre/contact-us.html",
    "coverageGaps": [],
    "description": "Informational/content page: hero header followed by tabbed content sections, occasional forms and accordions",
    "blocks": [
      {
        "name": "hero-purple",
        "instances": [
          "section.hero-banner.championPurple",
          ".hero-banner.championPurple"
        ]
      },
      {
        "name": "cards-icon",
        "instances": [
          "section.taskpanel.shelf-container",
          ".taskpanel"
        ]
      },
      {
        "name": "search-faq",
        "instances": [
          "section.shelf_further_asst",
          ".shelf_further_asst"
        ]
      },
      {
        "name": "columns-feature",
        "instances": [
          "section.productlistingmultiple",
          ".productlistingmultiple"
        ]
      },
      {
        "name": "accordion-help",
        "instances": [
          "section.contextualHelpShelf",
          ".contextualHelpShelf"
        ]
      }
    ],
    "sections": [
      {
        "id": "help",
        "name": "Contextual help accordions",
        "selector": [
          "section.contextualHelpShelf"
        ],
        "style": "light",
        "blocks": [
          "accordion-help"
        ],
        "defaultContent": []
      }
    ]
  },
  {
    "name": "product-overview",
    "urls": [
      "https://personal.natwest.com/personal/insurance.html",
      "https://personal.natwest.com/personal/loans/can-i-repay-my-loan-early.html",
      "https://personal.natwest.com/personal/savings/first-saver.html",
      "https://www.natwest.com/accessibility/banking-my-way.html",
      "https://www.natwest.com/banking-with-natwest/register-for-online-banking.html",
      "https://www.natwest.com/business/bank-accounts/startup-bank-account.html",
      "https://www.natwest.com/business/frequently-asked-questions/Bank-accounts-and-supporting-info.html",
      "https://www.natwest.com/business/insights/sustainability.html",
      "https://www.natwest.com/corporates/insights/markets.html"
    ],
    "representativeUrl": "https://personal.natwest.com/personal/insurance.html",
    "coverageGaps": [],
    "description": "Product/marketing overview page: hero, tabbed content, feature cards and an accordion FAQ",
    "blocks": [
      {
        "name": "hero-purple",
        "instances": [
          "section.hero-banner.championPurple",
          ".hero-banner.shelf-container.championPurple"
        ]
      },
      {
        "name": "cards-icon",
        "instances": [
          "section.taskpanel.shelf-container",
          "section.comp_whyUs_shelf.shelf-container",
          ".comp_whyUs_shelf"
        ]
      },
      {
        "name": "cards-cover",
        "instances": [
          "section.clickablecard-shelf.shelf-container",
          ".clickablecard-shelf"
        ]
      },
      {
        "name": "tabs-tracker",
        "instances": [
          "section.multiplearticlelist.shelf-container",
          ".multiplearticlelist"
        ]
      },
      {
        "name": "columns-feature",
        "instances": [
          "div.singlearticlev2.theme-white .singlearticle.shelf-container",
          "div.singlearticlev2.theme-rose .singlearticle.shelf-container"
        ]
      },
      {
        "name": "accordion-legal",
        "instances": [
          "section.contextualHelpShelf.shelf-container",
          ".contextualHelpShelf"
        ]
      }
    ],
    "sections": [
      {
        "id": "rose",
        "name": "Already have insurance band",
        "selector": [
          "div.singlearticlev2.theme-rose"
        ],
        "style": "rose",
        "blocks": [
          "columns-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "legal",
        "name": "Legal accordion band",
        "selector": [
          "section.contextualHelpShelf"
        ],
        "style": "grey",
        "blocks": [
          "accordion-legal"
        ],
        "defaultContent": []
      }
    ]
  },
  {
    "name": "homepage",
    "urls": [
      "https://www.natwest.com/"
    ],
    "representativeUrl": "https://www.natwest.com/",
    "coverageGaps": [],
    "description": "Site homepage: hero banner, feature cards, tabbed sections and multiple carousels",
    "blocks": [
      {
        "name": "hero-purple",
        "instances": [
          ".herobanner.championPurple",
          ".herobanner"
        ]
      },
      {
        "name": "cards-icon",
        "instances": [
          "div.card-subsection.promocard-false"
        ]
      },
      {
        "name": "columns-feature",
        "instances": [
          "div.singlearticle.theme-purple",
          ".singlearticle.shelf-container",
          ".singlearticle"
        ]
      },
      {
        "name": "carousel-cards",
        "instances": [
          "div.whatineedtoknow.theme-white",
          "div.whatineedtoknow.theme-grey"
        ]
      }
    ],
    "sections": [
      {
        "id": "s3",
        "name": "Support 24/7 promo",
        "selector": [
          "#main-content-wrapper > div:nth-child(1) > section:nth-child(5)"
        ],
        "style": "light",
        "blocks": [],
        "defaultContent": [
          "h3",
          "p",
          "a.button",
          "a"
        ]
      },
      {
        "id": "s6",
        "name": "More from NatWest carousel",
        "selector": [
          "div.whatineedtoknow.theme-grey"
        ],
        "style": "grey",
        "blocks": [
          "carousel-cards"
        ],
        "defaultContent": [
          "h3"
        ]
      },
      {
        "id": "s7",
        "name": "Service quality + APP scams panels",
        "selector": [
          "#main-content-wrapper > div:nth-child(1) > section:nth-child(12)"
        ],
        "style": "light",
        "blocks": [
          "columns-feature"
        ],
        "defaultContent": [
          "h2",
          "h3",
          "p",
          "a"
        ]
      }
    ]
  },
  {
    "name": "product-detail",
    "urls": [
      "https://www.natwest.com/mortgages/first-time-buyers.html"
    ],
    "representativeUrl": "https://www.natwest.com/mortgages/first-time-buyers.html",
    "coverageGaps": [],
    "description": "Rich product detail page: hero plus many stacked tabbed content sections and accordion FAQs",
    "blocks": [
      {
        "name": "hero-purple",
        "instances": [
          "div.herobanner",
          ".herobanner"
        ]
      },
      {
        "name": "columns-feature",
        "instances": [
          "div.singlearticle.theme-white",
          "div.singlearticle.theme-grey",
          "div.singlearticle.theme-aqua",
          "div.singlearticle.theme-purple",
          "div.singlearticlev2.theme-rose",
          ".singlearticle"
        ]
      },
      {
        "name": "cards-cover",
        "instances": [
          "section.container.responsivegrid .clickablecard-shelf",
          "div.clickablecard-shelf"
        ]
      },
      {
        "name": "accordion-help",
        "instances": [
          "div.contextualhelp.theme-white",
          ".contextualhelp"
        ]
      }
    ],
    "sections": [
      {
        "id": "grey",
        "name": "Grey feature band",
        "selector": [
          "div.singlearticle.theme-grey"
        ],
        "style": "grey",
        "blocks": [
          "columns-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "aqua",
        "name": "Aqua feature band",
        "selector": [
          "div.singlearticle.theme-aqua"
        ],
        "style": "aqua",
        "blocks": [
          "columns-feature"
        ],
        "defaultContent": []
      },
      {
        "id": "purple",
        "name": "Purple feature band",
        "selector": [
          "div.singlearticle.theme-purple"
        ],
        "style": "purple",
        "blocks": [
          "columns-feature"
        ],
        "defaultContent": []
      }
    ]
  },
  {
    "name": "segment-landing",
    "urls": [
      "https://www.natwest.com/premier-banking.html"
    ],
    "representativeUrl": "https://www.natwest.com/premier-banking.html",
    "coverageGaps": [],
    "description": "Audience segment landing page: tab-driven navigation with hero, feature cards and accordion",
    "blocks": [
      {
        "name": "hero-purple",
        "instances": [
          "#premier-home-hero",
          ".herobanner"
        ]
      },
      {
        "name": "cards-icon",
        "instances": [
          ".comp_whyUs_shelf",
          ".whyusblockwrapper",
          ".taskpanel",
          ".quickaction"
        ]
      },
      {
        "name": "cards-account",
        "instances": [
          ".productCardShelf__comp",
          ".productcardshelf",
          ".productcomp-multiple-shelf"
        ]
      },
      {
        "name": "columns-feature",
        "instances": [
          ".single-article-shelf",
          ".singlearticlev2"
        ]
      },
      {
        "name": "accordion-help",
        "instances": [
          ".acclink-promo",
          ".contextualHelpShelf",
          ".accordion-comp"
        ]
      }
    ],
    "sections": [
      {
        "id": "whois",
        "name": "Who is Premier for band",
        "selector": [
          "#who-is-premier-for"
        ],
        "style": "purple",
        "blocks": [
          "cards-icon"
        ],
        "defaultContent": []
      },
      {
        "id": "closing",
        "name": "Closing CTA band",
        "selector": [
          ".shelf_standAlone"
        ],
        "style": "purple",
        "blocks": [],
        "defaultContent": [
          "h2",
          "p",
          "a.button"
        ]
      }
    ]
  }
];

/**
 * Choose the template for a given URL. Matches the URL against each template's
 * urls[]; falls back to structural heuristics on the path when no exact match.
 */
function resolveTemplate(url) {
  const clean = url.replace(/[#?].*$/, '');
  // exact URL membership first
  for (const t of TEMPLATES) {
    if ((t.urls || []).some((u) => u.replace(/[#?].*$/, '') === clean)) return t;
  }
  const path = (() => { try { return new URL(url).pathname; } catch (e) { return url; } })();
  // heuristic fallback by path
  if (path === '/' || path === '' || /\/index(\.html)?$/.test(path)) {
    return TEMPLATES.find((t) => t.name === 'homepage') || TEMPLATES[0];
  }
  if (/support-centre|frequently-asked-questions|contact/.test(path)) {
    return TEMPLATES.find((t) => t.name === 'content-article') || TEMPLATES[0];
  }
  if (/premier-banking|business$|corporates$|personal$/.test(path)) {
    return TEMPLATES.find((t) => t.name === 'segment-landing') || TEMPLATES[0];
  }
  if (/mortgages|current-accounts|savings|loans|credit-cards|investments/.test(path)) {
    return TEMPLATES.find((t) => t.name === 'product-detail') || TEMPLATES[0];
  }
  // default: product-overview (broadest content shape)
  return TEMPLATES.find((t) => t.name === 'product-overview') || TEMPLATES[0];
}

function executeTransformers(hookName, element, payload, template) {
  const enhancedPayload = { ...payload, template };
  const transformers = [cleanupTransformer];
  if (template.sections && template.sections.length > 1) transformers.push(sectionsTransformer);
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  (template.blocks || []).forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      let elements = [];
      try { elements = document.querySelectorAll(selector); } catch (e) { return; }
      elements.forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const originalURL = params.originalURL || url;
    const template = resolveTemplate(originalURL);
    const main = document.body;

    // 1. beforeTransform cleanup
    executeTransformers('beforeTransform', main, payload, template);

    // 2. discover + parse blocks (skip already-replaced/detached elements and nested duplicates)
    const pageBlocks = findBlocksOnPage(document, template);
    const parsed = new Set();
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      if (parsed.has(block.element)) return;
      // skip if an ancestor was already parsed (avoid double-parsing nested union selectors)
      let anc = block.element.parentElement;
      let skip = false;
      while (anc) { if (parsed.has(anc)) { skip = true; break; } anc = anc.parentElement; }
      if (skip) return;
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
          parsed.add(block.element);
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 3. afterTransform cleanup + section breaks/metadata
    executeTransformers('afterTransform', main, payload, template);

    // 4. built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, originalURL);

    // 5. sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: template.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
