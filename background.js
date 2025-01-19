chrome.runtime.onInstalled.addListener(() => {
    
});

function saveURL(key, url) {
    chrome.storage.local.get("savedURLs", (result) => {
        const urls = result.savedURLs || {};
        urls[key] = url;
        chrome.storage.local.set({ savedURLs: urls });
    });
}

function restoreURLs() {
    chrome.storage.local.get("savedURLs", (result) => {
        console.log(result.savedURLs);
    });
}
