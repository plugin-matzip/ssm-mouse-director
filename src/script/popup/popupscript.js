// popupscript.ts
document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll("button");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var _a;
            var input = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector("input");
            if (input) {
                var url = input.value.trim();
                if (isValidURL(url)) {
                    var key = input.classList[1];
                    saveURLToChromeStorage(key, url);
                    alert("URL saved for ".concat(key, ": ").concat(url));
                }
                else {
                    alert("Please enter a valid URL.");
                }
            }
        });
    });
    restoreURLsFromChromeStorage();
});
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function saveURLToChromeStorage(key, url) {
    chrome.storage.local.get("savedURLs", function (result) {
        var urls = result.savedURLs || {};
        urls[key] = url;
        chrome.storage.local.set({ savedURLs: urls });
    });
}
function restoreURLsFromChromeStorage() {
    chrome.storage.local.get("savedURLs", function (result) {
        var urls = result.savedURLs || {};
        Object.entries(urls).forEach(function (_a) {
            var key = _a[0], url = _a[1];
            var input = document.querySelector(".".concat(key));
            if (input) {
                input.value = url;
            }
        });
    });
}
