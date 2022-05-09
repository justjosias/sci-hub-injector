// ==UserScript==
// @name Sci Hub Injector
// @version 1.2.1
// @updateURL https://raw.githubusercontent.com/justjosias/sci-hub-injector/main/sci-hub-inject.user.js
// @description Adds SciHub links to popular publishing websites to make free access to science even easier.
// @icon https://raw.githubusercontent.com/justjosias/sci-hub-injector/main/icon.png
// @include https://pubmed.ncbi.nlm.nih.gov/*
// @include https://www.nature.com/*
// @include https://www.tandfonline.com/*
// @include https://www.sciencedirect.com/*
// @include http://www.eurekaselect.com/*
// @include https://www.science.org/*
// @include https://dom-pubs.onlinelibrary.wiley.com/doi/*
// @include https://link.springer.com/*
// @include https://www.jstor.org/*
// @include https://www.researchgate.net/*
// @include https://ieeexplore.ieee.org/*
// @include https://journals.sagepub.com/*
// @include https://www.degruyter.com/*
// @include https://dl.acm.org/doi/*
// ==/UserScript==

const default_url = "https://sci-hub.se/";

function sciHubLink(doi) {
  let url = default_url;
  try {
    browser.storage.local.get("url").then((url_item) => url = url_item.url);
  } catch (error) {
    // ignore and use the default url
  }
  return url + doi;
}

function pubMed() {
  const doi = document.querySelector(".identifier.doi > a").innerText;
  const links = document.querySelector(".full-text-links-list");
  links.innerHTML += `
  <a class="link-item dialog-focus" href="${sciHubLink(
    doi
  )}" target="_blank" rel="noopener" title="See full text on SciHub"><img src="https://sci-hub.se/misc/img/logo_en.png" alt="full text provider logo"><span class="text">SciHub</span></a>
  `;
}

function nature() {
  const doi = document
    .querySelector(
      ".c-bibliographic-information__list-item--doi > p > span.c-bibliographic-information__value"
    )
    .textContent.split(".org/")[1];
  const menu = document.querySelector(
    "aside .c-nature-box.c-nature-box--side.u-hide-print"
  );
  menu.innerHTML += `
	<div class="js-access-button">
			<a href="${sciHubLink(doi)}" class="c-article__button">
				<img class="u-icon" width="18" height="18" aria-hidden="true" focusable="false" src="https://sci-hub.se/misc/img/ravenround.gif" />
				<span class="c-article__button-text" style="margin-left: 8px;">Access on SciHub</span>
			</a>
	</div>
	`;
}

function taylorFrancis() {
  const doi = document
    .querySelector(".dx-doi > a")
    .textContent.split(".org/")[1];
  const menu = document.querySelector(".tab-nav");
  menu.innerHTML += `
  <li role="tab" aria-selected="false" aria-expanded="false">
    <a class="grant-access" href="${sciHubLink(doi)}">
      Access on SciHub
    </a>
  </li>
	`;
}

function sciencedirect() {
  // Add timeout to prevent them from removing the link...
  setTimeout(() => {
    const doi = document.querySelector(".doi").textContent.split(".org/")[1];
    const menu = document.querySelector(".toolbar-buttons > ul");
    menu.innerHTML += `
    <li class="PrimaryCtaButton" id="PrimaryCtaButton">
    <a
      class="link-button link-button-primary accessbar-primary-link"
      role="button"
      rel="nofollow"
      href="${sciHubLink(doi)}"
      >
      <img width="24" height="24" src="https://sci-hub.se/misc/img/ravenround.gif" /> 
      <span class="link-button-text">Access on&nbsp;<strong>SciHub</strong></span></a
    >
  </li>
`;
  }, 1000);
}

function eurekaSelect() {
  const doiLinks = Array.from(document.querySelectorAll("a"))
    .filter((a) => a.href.includes("doi.org"))
    .map((a) => a.href);
  const doi = doiLinks[0].split(".org/")[1];
  const form = document.getElementById("addtocartForm");
  form.innerHTML += `
  <div class="col-md-4 text-right">
    <a href="${sciHubLink(doi)}" class="btn btn-download hvr-icon-hang">
    View on SciHub

    <img width="24" height="24" src="https://sci-hub.se/misc/img/ravenround.gif" /> 
    </a>
  </div>
  `;
}

function researchGate() {
  const doiLinks = Array.from(document.querySelectorAll("a"))
    .filter((a) => a.href.includes("doi.org"))
    .map((a) => a.href);
  const doi = doiLinks[0].split(".org/")[1];

  const menu = document.querySelector(".research-resources-summary__actions");
  const dropdown = menu.querySelector(".research-resources-summary__dropdown");

  const element = document.createElement("div");
  element.className = ("nova-legacy-l-flex__item hide-l")
  element.innerHTML += `
  <div class="nova-legacy-l-flex__item hide-l">
    <a
      class="nova-legacy-c-button nova-legacy-c-button--align-center nova-legacy-c-button--radius-m nova-legacy-c-button--size-m nova-legacy-c-button--color-blue nova-legacy-c-button--theme-ghost nova-legacy-c-button--width-auto js-lite-click"
      href="${sciHubLink(doi)}"
    >
      <img height="20" src="https://sci-hub.se/misc/img/ravenround.gif" />
      <span class="nova-legacy-c-button__label gtm-copy-link-btn">
        <span>Access on Sci-Hub</span>
      </span>
    </a>
  </div>
  `;
  menu.insertBefore(element, dropdown);
}

function science() {
  const doiLinks = Array.from(document.querySelectorAll("a"))
    .filter((a) => a.href.includes("doi.org"))
    .map((a) => a.href);
  const doi = doiLinks[0].split(".org/")[1];
  const menu = document.querySelector(".info-panel__formats.info-panel__item");
  menu.innerHTML += `
  <a
    href="${sciHubLink(doi)}"
    data-toggle="tooltip"
    title=""
    class="btn btn__request-access ml-1"
    data-original-title="GET ACCESS"
    ><img width="24" height="24" src="https://sci-hub.se/misc/img/ravenround.gif" class="mr-2" /> <span>get free access</span></a
  >
  `;
}

/* In honor of Aaron Swartz */
function jstor() {
  const doi = document.querySelector("[data-doi]").attributes.getNamedItem("data-doi").value;

  const menu = document.querySelector(".access-buttons");
  const element = document.createElement("div");
  element.innerHTML = `
  <a class="primary-access" data-sc="turnaway-inst-login" href="${sciHubLink(doi)}">
    <span class="btn-text white bold">Download</span>
    <img
      width="24px"
      src="https://sci-hub.se/misc/img/ravenround.gif"
      alt="SciHub Logo"
    />
    <br>
    <span class="btn-text white">Access on Sci-Hub</span>
  </a>
  `;
  element.style.cssText = "margin-top: var(--pharos-spacing-1-x);";
  menu.appendChild(element);
}

function wiley() {
  const doiLinks = Array.from(document.querySelectorAll("a"))
    .filter((a) => a.href.includes("doi.org"))
    .map((a) => a.href);
  const doi = doiLinks[0].split(".org/")[1];
  const menu = document.querySelector(".coolBar__second.rlist");
  menu.innerHTML += `
  <div class="coolBar__section coolBar--download PdfLink cloned">
    <a href="${sciHubLink(
      doi
    )}" title="SciHub" class="coolBar__ctrl pdf-download"
      ><img
        src="https://sci-hub.se/misc/img/ravenround.gif"
        alt="SciHub Logo"
      />
      Access on SciHub
    </a>
  </div>
  `;
}

function springerLink() {
  const url = document.location.href;
  const doi = getSpringerDoi(url);
  if (url.includes("journal")) {
    springerLinkJournal();
  } else if (url.includes("article")) {
    springerLinkArticle(doi);
  } else if (url.includes("chapter")) {
    springerLinkChapter(doi);
  } else {
    springerLinkGeneral(doi);
  }
}

function getSpringerDoi(url) {
  return decodeURIComponent(url).match(/10.+?[^#]+/)?.[0];
}

function springerLinkJournal() {
  const articleListElements = Array.from(document.querySelectorAll(".app-volumes-and-issues__article-list > li"));
  for (const articleElement of articleListElements) {
    const articleUrl = articleElement.querySelector("h3 a").getAttribute("href");
    const doi = getSpringerDoi(articleUrl);
    articleElement.querySelector(".c-meta").innerHTML += `
      <li class="c-meta__item c-meta__item--block-sm-max">
        <a href="${sciHubLink(doi)}" title="SciHub">View on SciHub</a>
      </li>
    `;
  }
}

function springerLinkArticle(doi) {
  const details = document.querySelector(".c-article-info-details");
  details.innerHTML += `
    <a class="c-article-info-details__cite-as" href="${sciHubLink(doi)}" title="SciHub">
      <img width=24 height=24 src="https://sci-hub.se/misc/img/ravenround.gif" style="vertical-align:bottom"/>
      View On SciHub
    </a>
  `;
}

function springerLinkChapter(doi) {
  const contextContainer = document.querySelector("#altmetric-container > div > ul");
  contextContainer.innerHTML += `
    <li class="c-article-metrics-bar__item">
    <p class="c-article-metrics-bar__count">
    <a href="${sciHubLink(doi)}" title="SciHub">Sci-Hub</a>
    </p>
    </li>
  `;
}

function springerLinkGeneral(doi) {
  const contextContainer = document.querySelector(".main-context__container") || document.getElementById("book-metrics");
  contextContainer.innerHTML += `
    <div style="align-self:center">
      <a href="${sciHubLink(doi)}" title="SciHub">
        <img width=24 height=24 src="https://sci-hub.se/misc/img/ravenround.gif" style="width:24px; vertical-align:bottom"/>
        View On SciHub
      </a>
    </div>
  `;
}

function ieeexploreLink() {
  let foundLinks = [];
  document.querySelectorAll("a").forEach(l => {
    if (l.href.includes("doi.org")) {
      foundLinks.push(l.href);
    }
  });
  const doi = foundLinks[0].split(".org/")[1];
  const node = document.querySelector(".document-header-title-container .btn-container");
  node.innerHTML += `
        <button placement="bottom" class="layout-btn-white cite-this-btn">
            <a href="${sciHubLink(doi)}">Access on SciHub</a>
        </button>
    `;
}


function sagePub() {
  const doi = document.querySelector("meta[scheme='doi']").getAttribute("content");
  const menu = document.querySelector(".pdf-wrapper");
  menu.innerHTML += `
  <div id="menu-ao" role="button" class="articleToolsButton redButton smallButton">
    <a href="${sciHubLink(doi)}" title="SciHub"><span>Access via SciHub <img width=20 height=20 src="https://sci-hub.se/misc/img/ravenround.gif" style="width:20px; vertical-align: middle;"/></span></a>
  </div>
	`;
}

function deGruyter() {
  const url = document.location.href;

  if (url.includes("/document/")) {
    const doi = document.querySelector("meta[name='citation_doi']").getAttribute("content");
    const menu = document.querySelector("#docContent > div.offset-lg-1.col-lg-8.pb-2 > div.container-fluid.mx-2.d-flex.align-items-center.flex-wrap");
    menu.innerHTML += `
    <button id="citationsModalButton" type="button" class="btn btn-main-content ga_cite_this mr-2" aria-controls="citationsModal"><a href="${sciHubLink(doi)}">Access on SciHub</a>
    </button>
    `;

  } else if (url.includes("/journal/"))
  {
    const citeButtons = document.querySelectorAll('.searchResultActions');
    for (const citeButton of citeButtons) {
      citeButton.innerHTML += `
      <button id="citationsModalButton" type="button" class="btn btn-main-content ga_cite_this mr-2" aria-controls="citationsModal"><a href="${sciHubLink(citeButton.getAttribute('data-doi'))}">Access on SciHub</a>
      </button>
      `
    }
  }
}

function acm() {
    const url = document.location.href;
    // Regex for finding DOI in URL
    const regex = /10.\d{4,9}\/[-._;()/:A-Z0-9]+/i;
    let m;
    if ((m = regex.exec(url)) !== null) {
        const doi = m[0];
        const menu = document.querySelector(".get-access").parentElement.parentElement;
        menu.innerHTML += `
        <li>
            <a href="${sciHubLink(doi)}" class="get-access" >Access on SciHub</a>
        </li>
        `;
    }
}

function addSciHubLink() {
  const url = document.location.href;
  if (url.includes("pubmed.ncbi.nlm.nih.gov")) {
    pubMed();
  } else if (url.includes("nature.com")) {
    nature();
  } else if (url.includes("tandfonline.com")) {
    taylorFrancis();
  } else if (url.includes("www.sciencedirect.com")) {
    sciencedirect();
  } else if (url.includes("eurekaselect.com")) {
    eurekaSelect();
  } else if (url.includes("science.org")) {
    science();
  } else if (url.includes("wiley.com")) {
    wiley();
  } else if (url.includes("link.springer.com")) {
    springerLink();
  } else if (url.includes("jstor.org")) {
    jstor();
  } else if (url.includes("researchgate.net")) {
    researchGate();
  } else if (url.includes("ieeexplore.ieee.org/")) {
    ieeexploreLink();
  } else if (url.includes("journals.sagepub.com")) {
    sagePub();
  } else if (url.includes("degruyter.com")) {
    deGruyter();
  } else if (url.includes("dl.acm.org/doi")) {
    acm();
  }
}

addSciHubLink();
