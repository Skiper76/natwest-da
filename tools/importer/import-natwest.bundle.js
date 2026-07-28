/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-natwest.js
  var import_natwest_exports = {};
  __export(import_natwest_exports, {
    default: () => import_natwest_default
  });

  // tools/importer/parsers/hero-purple.js
  function parse(element, { document }) {
    const image = element.querySelector(
      '.herobanner__image-content img, .image-wrapper img, img.image-wrap, img[class*="image"]'
    ) || element.querySelector("img");
    const heading = element.querySelector(
      ".title-wrapper h1, .title-comp, .header_one--title h1, h1, h2"
    );
    const subheading = element.querySelector(
      ".control_text .comp-rich-text, .control_text p, .comp-rich-text p"
    );
    const ctaLinks = Array.from(
      element.querySelectorAll(".cta-wrapper a, a.cta, a.cta-primary, a.button")
    );
    if (!heading && !subheading && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (image) {
      cells.push([image]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-purple", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-icon.js
  function parse2(element, { document }) {
    let cards = Array.from(
      element.querySelectorAll(
        ':scope .iconcards, :scope [class*="promoCard_"], :scope .taskpanel__list__item, :scope .card-item, :scope .whyus-card'
      )
    );
    if (!cards.length) {
      cards = Array.from(element.querySelectorAll(':scope [class*="GridColumn"]')).filter((c) => c.querySelector(".card-title, .card-text, .title-comp, .card-image img"));
    }
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(
        ".card-image img, .taskpanel__list__item__imgWrap img, .cmp-image img, img.image-wrap, img"
      );
      const textCell = [];
      const title = card.querySelector(
        ".card-title .cmp-title, .card-title .title-comp, .cmp-title, .title-comp, h2, h3, h4"
      );
      if (title) textCell.push(title);
      const body = card.querySelector(
        ".card-text .cmp-text, .card-text .comp-rich-text, .card-text .text, .card-description"
      );
      if (body) textCell.push(body);
      const cta = card.querySelector(
        ".taskpanel__list__item__ctaWrap a, .cta-wrapper a, :scope > a.button, .cta a.cta-button, a.cta-primary"
      );
      if (cta && !textCell.some((el) => el.contains(cta))) textCell.push(cta);
      if (image || textCell.length) {
        cells.push([image || "", textCell.length ? textCell : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-icon", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function buildTextCell(scope) {
    const cell = [];
    const title = scope.querySelector(
      ":scope .title-wrapper .cmp-title, :scope .cmp-title, :scope .title-comp, :scope h2, :scope h3, :scope h4"
    );
    if (title) cell.push(title);
    const textBlocks = Array.from(
      scope.querySelectorAll(".rte-wrapper .cmp-text, .cmp-text.comp-rich-text, .comp-rich-text, .rte-wrapper .text")
    ).filter((tb) => !cell.some((el) => el.contains(tb) || tb.contains(el)));
    textBlocks.forEach((tb) => cell.push(tb));
    const ctas = Array.from(
      scope.querySelectorAll(".additional-cta-wrapper a, .cta-wrapper a, .cta.button a, a.cta-button")
    );
    ctas.forEach((cta) => {
      if (!cell.some((el) => el.contains(cta))) cell.push(cta);
    });
    return cell;
  }
  function parse3(element, { document }) {
    const cells = [];
    const products = Array.from(element.querySelectorAll(":scope .product-comp"));
    if (products.length) {
      const row = products.map((product) => {
        const cell = [];
        const img = product.querySelector(".image-wrapper img, .image img, .cmp-image img");
        if (img) cell.push(img);
        cell.push(...buildTextCell(product));
        return cell.length ? cell : "";
      });
      if (row.some((c) => c !== "")) {
        cells.push(row);
      }
    } else {
      const shelf = element.querySelector(".single-article-shelf, .shelf-wrapper") || element;
      const imageWrapper = shelf.querySelector('.image-div, .image-wrapper, [class*="image-div"]');
      const image = imageWrapper && imageWrapper.querySelector("img") || shelf.querySelector(".article_image img");
      const textCell = buildTextCell(shelf);
      if (image) {
        const imgRight = element.className.includes("img-right") || shelf.className.includes("img-right");
        cells.push(imgRight ? [textCell.length ? textCell : "", image] : [image, textCell.length ? textCell : ""]);
      } else if (textCell.length) {
        cells.push([textCell]);
      }
    }
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-cards.js
  function parse4(element, { document }) {
    let slides = Array.from(element.querySelectorAll(".slick-track .item, .item.carosuel_sm_md, .slick-slide")).filter((s) => !s.className.includes("slick-cloned"));
    slides = slides.filter((s, i, arr) => !arr.some((other) => other !== s && other.contains(s)));
    const cells = [];
    slides.forEach((slide) => {
      const image = slide.querySelector(".img-container img, .img-carousel-wrapper img, .image img, img");
      const textCell = [];
      const title = slide.querySelector(".details .cmp-title, .details .title-comp, .cmp-title, h2, h3, h4");
      if (title) textCell.push(title);
      const body = slide.querySelector(".text-wrapper .cmp-text, .text-wrapper .comp-rich-text, .details .cmp-text");
      if (body) textCell.push(body);
      const cta = slide.querySelector(".item-cta a, .cta.button a, a.cta-button");
      if (cta && !textCell.some((el) => el.contains(cta))) textCell.push(cta);
      if (image) {
        cells.push([image, textCell.length ? textCell : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-help.js
  function parse5(element, { document }) {
    const panels = Array.from(
      element.querySelectorAll(".accordion-comp .panel, .panel-group .panel, .accordion-item, .panel.panel-default")
    ).filter((p, i, arr) => !arr.some((other) => other !== p && other.contains(p)));
    const cells = [];
    panels.forEach((panel) => {
      const title = panel.querySelector(
        ".panel-heading .cmp-title, .panel-heading .title-comp, .panel-heading h2, .panel-heading h3, .panel-heading h4, .accordion-header"
      );
      const content = panel.querySelector(
        ".panel-body .cmp-text, .panel-body .comp-rich-text, .panel-body .text, .panel-collapse .cmp-text, .panel-body, .accordion-content"
      );
      if (title || content) {
        cells.push([title || "", content || ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-help", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-legal.js
  function parse6(element, { document }) {
    const panels = Array.from(
      element.querySelectorAll(".accordion-comp .panel, .panel-group .panel, .accordion-item, .panel.panel-default")
    ).filter((p, i, arr) => !arr.some((other) => other !== p && other.contains(p)));
    const cells = [];
    panels.forEach((panel) => {
      const title = panel.querySelector(
        ".panel-heading .cmp-title, .panel-heading .title-comp, .panel-heading h2, .panel-heading h3, .panel-heading h4, .accordion-header"
      );
      const content = panel.querySelector(
        ".panel-body .cmp-text, .panel-body .comp-rich-text, .panel-body .text, .panel-collapse .cmp-text, .panel-body, .accordion-content"
      );
      if (title || content) {
        cells.push([title || "", content || ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-legal", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/search-faq.js
  function parse7(element, { document }) {
    const indexUrl = "/query-index.json";
    const link = document.createElement("a");
    link.href = indexUrl;
    link.textContent = indexUrl;
    const cells = [
      [link]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "search-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-cover.js
  function parse8(element, { document }) {
    let cards = Array.from(
      element.querySelectorAll(".clickablecard__list__item, .clickablecard__list--inner > a, .card-item")
    ).filter((c, i, arr) => !arr.some((other) => other !== c && other.contains(c)));
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(
        ".clickablecard__list__item__imagewrap img, .image img, .cmp-image img, img"
      );
      const textCell = [];
      const title = card.querySelector(
        ".clickablecard__list__item__titlewrap .cmp-title, .clickablecard__list__item__titlewrap .title-comp, .cmp-title, h2, h3, h4"
      );
      if (title) textCell.push(title);
      const body = card.querySelector(
        ".clickablecard__list__item__textwrap .cmp-text, .clickablecard__list__item__textwrap .comp-rich-text, .clickablecard__list__item__textwrap .text, .cmp-text.comp-rich-text"
      );
      if (body) textCell.push(body);
      const href = card.tagName === "A" ? card.getAttribute("href") : card.querySelector("a[href]") && card.querySelector("a[href]").getAttribute("href");
      if (href && title) {
        const cta = document.createElement("a");
        cta.href = href;
        cta.textContent = title.textContent.trim();
        textCell.push(cta);
      }
      if (image || textCell.length) {
        cells.push([image || "", textCell.length ? textCell : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-cover", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-tracker.js
  function parse9(element, { document }) {
    const selectorTab = element.querySelector(".selectorTab");
    const cards = selectorTab ? Array.from(selectorTab.querySelectorAll(".selectorTab-l .selectorcard")) : [];
    const panelImages = selectorTab ? Array.from(selectorTab.querySelectorAll('.selectorTab-r [id^="ariaControls-"]')) : [];
    const cells = [];
    cards.forEach((card, index) => {
      const labelCell = [];
      const title = card.querySelector(".title-wrapper .basictitle, .basictitle, .title-wrapper h2, h2, h3, .cmp-title");
      if (title) labelCell.push(title);
      const contentCell = [];
      const panelImage = panelImages[index] && panelImages[index].querySelector("img") || (panelImages[index] && panelImages[index].tagName === "IMG" ? panelImages[index] : null);
      if (panelImage) contentCell.push(panelImage);
      const desc = card.querySelector(".text-description .basictext, .text-wrapper .basictext, .text-description, .basictext");
      if (desc) contentCell.push(desc);
      if (labelCell.length || contentCell.length) {
        cells.push([labelCell.length ? labelCell : "", contentCell.length ? contentCell : ""]);
      }
    });
    if (!cells.length) {
      const items = Array.from(element.querySelectorAll(".mal-carousel-wrapper .item, .slick-track .item")).filter((it) => !it.className.includes("slick-cloned")).filter((it, i, arr) => !arr.some((other) => other !== it && other.contains(it)));
      items.forEach((item) => {
        const label = item.querySelector(".details h3, .text-comp, h2, h3");
        const contentCell = [];
        const img = item.querySelector(".img-container img, img");
        if (img) contentCell.push(img);
        const body = item.querySelector(".details .text-wrapper");
        if (body) contentCell.push(body);
        if (label || contentCell.length) {
          cells.push([label || "", contentCell.length ? contentCell : ""]);
        }
      });
    }
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-tracker", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-account.js
  function collectText(scope, textCell) {
    const title = scope.querySelector(
      ".product-card__leftside__title .cmp-title, .product-card__leftside__header__title .cmp-title, .cmp-title, .title-comp, h2, h3, h4"
    );
    if (title) textCell.push(title);
    const bodies = Array.from(scope.querySelectorAll(
      ".product-card__leftside__textarea__checktext .cmp-text, .product-card__rightside__term .cmp-text, .product-card__rightside__content__term .cmp-text, .cmp-text.comp-rich-text"
    )).filter((b, i, arr) => !arr.some((o) => o !== b && (o.contains(b) || b.contains(o)))).filter((b) => !textCell.some((el) => el.contains(b) || b.contains(el)));
    bodies.forEach((b) => textCell.push(b));
    const ctas = Array.from(scope.querySelectorAll(
      ".product-card__rightside__ctaWrapper a, .cta-wrapper a, .cta.button a, a.cta-button"
    ));
    ctas.forEach((cta) => {
      if (!textCell.some((el) => el.contains(cta))) textCell.push(cta);
    });
  }
  function parse10(element, { document }) {
    const cells = [];
    const productCards = Array.from(element.querySelectorAll(".productcard"));
    productCards.forEach((wrapper) => {
      const card = wrapper.querySelector("#product-card-desktop") || wrapper.querySelector("#productcard-mob") || wrapper.querySelector(".product-card") || wrapper;
      const image = card.querySelector(
        ".product-card__rightside__image img, .product-card__leftside__header__image img, .cmp-image img, img"
      );
      const textCell = [];
      collectText(card, textCell);
      if (image || textCell.length) {
        cells.push([image || "", textCell.length ? textCell : ""]);
      }
    });
    if (!cells.length) {
      const comps = Array.from(element.querySelectorAll(".productlist .product-comp, .multi-product-comp .product-comp")).filter((c, i, arr) => !arr.some((o) => o !== c && o.contains(c)));
      comps.forEach((comp) => {
        const image = comp.querySelector(".image-wrapper img, .image img, .cmp-image img");
        const textCell = [];
        collectText(comp, textCell);
        if (image || textCell.length) {
          cells.push([image || "", textCell.length ? textCell : ""]);
        }
      });
    }
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-account", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/natwest-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        "#onetrust-pc-sdk"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#ccm-init-root",
        "#ccm-init-chat-root",
        ".ccm-chat-app-root",
        ".ccm-body-container"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#mbox_AEM-NWB-PER-completion-prompt-1_9520797391098066",
        '[id^="mbox_AEM-NWB-PER-completion-prompt"]',
        ".completion-prompt"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#skiplinks",
        ".skip-links",
        ".skip-link-wrap"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        ".ia__footer",
        ".iah"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#smartBannerConfig"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".iah__search",
        "#navbar",
        ".lah__search__show"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#new-window-0",
        "#navigationTag",
        "#dumpParams",
        ".globaldropdown",
        ".iah__over-lay",
        ".ot-scrn-rdr"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "link",
        "meta",
        "noscript",
        "iframe",
        "source",
        "script",
        "style"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("onclick");
        el.removeAttribute("data-track");
        el.removeAttribute("data-tracking");
      });
    }
  }

  // tools/importer/transformers/natwest-sections.js
  var TransformHook2 = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function findSectionElement(root, selector) {
    const selectors = Array.isArray(selector) ? selector : [selector];
    for (const sel of selectors) {
      if (!sel) continue;
      try {
        const el = root.querySelector(sel);
        if (el) return el;
      } catch (e) {
      }
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload && payload.template;
      const sections = template && template.sections;
      if (!sections || sections.length < 2) {
        return;
      }
      const doc = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const sectionEl = findSectionElement(element, section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          if (sectionEl.parentNode) {
            sectionEl.parentNode.insertBefore(metaBlock, sectionEl.nextSibling);
          }
        }
        if (i > 0 && sectionEl.previousElementSibling) {
          const hr = doc.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-natwest.js
  var parsers = {
    "hero-purple": parse,
    "cards-icon": parse2,
    "columns-feature": parse3,
    "carousel-cards": parse4,
    "accordion-help": parse5,
    "accordion-legal": parse6,
    "search-faq": parse7,
    "cards-cover": parse8,
    "tabs-tracker": parse9,
    "cards-account": parse10
  };
  var TEMPLATES = [
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
  function resolveTemplate(url) {
    const clean = url.replace(/[#?].*$/, "");
    for (const t of TEMPLATES) {
      if ((t.urls || []).some((u) => u.replace(/[#?].*$/, "") === clean)) return t;
    }
    const path = (() => {
      try {
        return new URL(url).pathname;
      } catch (e) {
        return url;
      }
    })();
    if (path === "/" || path === "" || /\/index(\.html)?$/.test(path)) {
      return TEMPLATES.find((t) => t.name === "homepage") || TEMPLATES[0];
    }
    if (/support-centre|frequently-asked-questions|contact/.test(path)) {
      return TEMPLATES.find((t) => t.name === "content-article") || TEMPLATES[0];
    }
    if (/premier-banking|business$|corporates$|personal$/.test(path)) {
      return TEMPLATES.find((t) => t.name === "segment-landing") || TEMPLATES[0];
    }
    if (/mortgages|current-accounts|savings|loans|credit-cards|investments/.test(path)) {
      return TEMPLATES.find((t) => t.name === "product-detail") || TEMPLATES[0];
    }
    return TEMPLATES.find((t) => t.name === "product-overview") || TEMPLATES[0];
  }
  function executeTransformers(hookName, element, payload, template) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template });
    const transformers = [transform];
    if (template.sections && template.sections.length > 1) transformers.push(transform2);
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
        try {
          elements = document.querySelectorAll(selector);
        } catch (e) {
          return;
        }
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element });
        });
      });
    });
    return pageBlocks;
  }
  var import_natwest_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const originalURL = params.originalURL || url;
      const template = resolveTemplate(originalURL);
      const main = document.body;
      executeTransformers("beforeTransform", main, payload, template);
      const pageBlocks = findBlocksOnPage(document, template);
      const parsed = /* @__PURE__ */ new Set();
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        if (parsed.has(block.element)) return;
        let anc = block.element.parentElement;
        let skip = false;
        while (anc) {
          if (parsed.has(anc)) {
            skip = true;
            break;
          }
          anc = anc.parentElement;
        }
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
      executeTransformers("afterTransform", main, payload, template);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: template.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_natwest_exports);
})();
