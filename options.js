const default_url = "https://sci-hub.se/";

browser.storage.local.get("url").then((url_item) => {
	let url = url_item.url;
	if (url == undefined) {
		url = default_url;
	}
	document.getElementById("url").value = url;
});

function updateText() {}

document.getElementsByTagName("button")[0].addEventListener("click", saveChanges);

function saveChanges() {
	browser.storage.local.set({ url: document.getElementById("url").value });
}
