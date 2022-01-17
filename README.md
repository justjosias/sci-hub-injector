# Sci Hub Injector

Adds SciHub links to popular publisher websites to make accessing science even easier!

Inject freedom into science publisher websites, with style.

Please contribute new websites!

## Usage

* Chrome/Chromium: see instructions below.
* Firefox: https://addons.mozilla.org/en-US/firefox/addon/sci-hub-injector/
* Brave: should work when you replace `chrome://extensions` with `brave://extensions`. Not tested.

## Supported sites

- PubMed
- Nature
- Taylor and Francis
- DeGruyter
- Elsevier / ScienceDirect
- Eureka Select
- SagePub
- Science
- SpringerLink

## Screenshots

![PubMed Screenshot](.github/pubmed.png)
![Nature Screenshot](.github/nature.png)

## Installation

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

## Important legal notice

I don't recommend doing things that go against whatever laws that apply where you are. I condemn illegal activities. This is the user's reponsibility. SciHub is not affiliated in any way with this project.

---

Next, I'll quote a hero of mine, Aaron Swartz:

> [There is no justice in following unjust laws](https://openaccessmanifesto.wordpress.com).
