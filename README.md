# Sci Hub Injector

Adds SciHub links to popular publisher websites to make accessing science even easier!

Inject free access into science publisher websites, with style.

Please contribute new websites!

## Usage

* [Userscript](https://github.com/justjosias/sci-hub-injector/raw/main/sci-hub-inject.user.js) (for any browser with [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://www.tampermonkey.net/) installed)
* Firefox: https://addons.mozilla.org/en-US/firefox/addon/scihub-injector/
* Chrome/Chromium: [see instructions below](#chromium-installation)
* Brave and Edge: see Chromium instructions

The userscript is recommended, since you can use it without it being approved by Mozilla or Google and still get automatic updates.

## Supported sites

- PubMed
- Nature
- Taylor and Francis
- DeGruyter
- Elsevier / ScienceDirect
- Eureka Select
- IEEEXPLORE
- SagePub
- Science
- SpringerLink
- JSTOR
- ResearchGate
- Wiley

## Screenshots

![PubMed Screenshot](.github/pubmed.png)
![Nature Screenshot](.github/nature.png)

## Chromium Installation

These instructions should work for most browsers based on Chromium, including Chrome, Brave, and Edge when you replace `chrome://extensions` with `brave://extensions`, `edge://extensions`, or equivalent.

1. Visit `chrome://extensions` (via omnibox or menu -> Tools -> Extensions).
2. Enable Developer mode by ticking the checkbox in the upper-right corner.
3. Click on the "Load unpacked extension..." button.
4. Select the directory containing your unpacked extension.

Copied from:
https://stackoverflow.com/questions/24577024/install-chrome-extension-form-outside-the-chrome-web-store

## Contributing

1. Add link to `manifest.json`.
2. Add a function to `inject.js`.

   2.1. Extract DOI from website.

   2.2. Add element with link to SciHub to DOM. Use the same classes and structure as the website, for niceness.

3. Add an `else if` clause to the if statement in the `addSciHubLink` function in `inject.js`.
4. Test to make sure it works.

Thanks!

## Mirrors and Forks

* [justjosias](https://github.com/justjosias/sci-hub-injector) (also at [Codeberg](https://codeberg.org/josias/sci-hub-injector) and [Josias's personal cgit](https://git.josias.dev/sci-hub-injector))
* [hilbertspace05](https://github.com/hilbertspace05/sci-hub-injector)
* [ghxm](https://github.com/ghxm/sci-hub-injector)
* [Original by rickwierenga](https://github.com/rickwierenga/sci-hub-injector) (removed)

## Legal notice

This project is not affliated in any way with SciHub. The copyright status of downloaded articles is the user's responsibility and not that of the developers of this addon.
