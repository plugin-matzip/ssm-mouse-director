// popupscript.ts
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const input = button.parentElement?.querySelector("input") as HTMLInputElement;
            if (input) {
                const url = input.value.trim();
                if (isValidURL(url)) {
                    const key = input.classList[1];
                    saveURLToChromeStorage(key, url);
                    alert(`URL saved for ${key}: ${url}`);
                } else {
                    alert("Please enter a valid URL.");
                }
            }
        });
    });
    restoreURLsFromChromeStorage();
});

function isValidURL(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function saveURLToChromeStorage(key: string, url: string): void {
    chrome.storage.local.get("savedURLs", (result) => {
        const urls = result.savedURLs || {};
        urls[key] = url;
        chrome.storage.local.set({ savedURLs: urls });
    });
}

function restoreURLsFromChromeStorage(): void {
    chrome.storage.local.get("savedURLs", (result) => {
        const urls = result.savedURLs as { [key: string]: string } || {};
        Object.entries(urls).forEach(([key, url]) => {
            const input = document.querySelector(`.${key}`) as HTMLInputElement;
            if (input) {
                input.value = url;
            }
        });
    });
}