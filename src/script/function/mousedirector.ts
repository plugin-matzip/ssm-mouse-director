function initializeEscOverlay(): void {
    var escKeyTimer: number | null = null;
    var isBackgroundActive = false;
    var overlayElement: HTMLElement | null = null;
    var circleElement: HTMLElement | null = null;
    var hoveredElement: HTMLElement | null = null;

    function activateOverlay(): void {
        if (!overlayElement) {
            overlayElement = createOverlayElement();
            document.body.appendChild(overlayElement);
        }
        if (!circleElement) {
            circleElement = createCircleElement();
            document.body.appendChild(circleElement);
        }
        overlayElement.style.display = "block";
        circleElement.style.display = "block";
        isBackgroundActive = true;
    }

    function deactivateOverlay(): void {
        if (overlayElement) {
            overlayElement.style.display = "none";
        }
        if (circleElement) {
            circleElement.style.display = "none";
        }
        isBackgroundActive = false;
    }

    function createOverlayElement(): HTMLElement {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.zIndex = "1000";
        overlay.style.pointerEvents = "all";
        overlay.style.display = "none";
        return overlay;
    }

    function createCircleElement(): HTMLElement {
        const circle = document.createElement("div");
        circle.style.position = "fixed";
        circle.style.top = "50%";
        circle.style.left = "50%";
        circle.style.transform = "translate(-50%, -50%)";
        circle.style.width = "700px";
        circle.style.height = "700px"; 
        circle.style.borderRadius = "50%";
        circle.style.backgroundColor = "transparent";
        circle.style.boxSizing = "border-box"; 
        circle.style.zIndex = "2000";
        circle.style.display = "none";
        circle.style.overflow = "hidden";

        createDividedCircle(circle);

        return circle;
    }

    function createDividedCircle(circle: HTMLElement): void {
        const sectionUrls = {
            top: "https://naver.com/",
            right: "https://daum.net/",
            bottom: "https://google.com/",
            left: "https://www.youtube.com/"
        };

        const sections = [
            {className: 'top-left', top: '0', left: '0', width: 'calc(50% - 3px)', height: 'calc(50% - 3px)', url: sectionUrls.top},
            {className: 'top-right', top: '0', right: '0', width: 'calc(50% - 3px)', height: 'calc(50% - 3px)', url: sectionUrls.right},
            {className: 'bottom-left', bottom: '0', left: '0', width: 'calc(50% - 3px)', height: 'calc(50% - 3px)', url: sectionUrls.left},
            {className: 'bottom-right', bottom: '0', right: '0', width: 'calc(50% - 3px)', height: 'calc(50% - 3px)', url: sectionUrls.bottom}
        ];

        // 각 구역을 생성하여 원에 추가
        sections.forEach((section) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = section.className;
            sectionElement.style.position = 'absolute';
            sectionElement.style.backgroundColor = 'black';
            sectionElement.style.top = section.top || '';
            sectionElement.style.left = section.left || '';
            sectionElement.style.right = section.right || '';
            sectionElement.style.bottom = section.bottom || '';
            sectionElement.style.width = section.width;
            sectionElement.style.height = section.height;
            sectionElement.style.transition = "transform 0.3s, box-shadow 0.3s";
            sectionElement.style.display = "flex";
            sectionElement.style.justifyContent = "center";
            sectionElement.style.alignItems = "center";
            sectionElement.style.color = "white";
            sectionElement.style.fontSize = "16px";
            sectionElement.style.textAlign = "center";
            sectionElement.dataset.url = section.url;
            
            const url = ''+section.url;
            sectionElement.innerText = url;
            
            sectionElement.addEventListener("mouseover", () => {
                hoveredElement = sectionElement;
                sectionElement.style.transform = "scale(1.02)";
                sectionElement.style.zIndex = "3000";
                sectionElement.style.boxShadow = "0px 0px 10px rgba(255, 255, 255, 0.7)";
            });

            sectionElement.addEventListener("mouseout", () => {
                hoveredElement = null;
                sectionElement.style.transform = "scale(1)";
                sectionElement.style.zIndex = "2000";
                sectionElement.style.boxShadow = "none";
            });
            
            sectionElement.addEventListener('click', () => {
                const url = sectionElement.dataset.url;
                if (url) {
                    window.location.href = url;
                }
            });

            circle.appendChild(sectionElement);
        });
    }

    function handleKeyDown(event: KeyboardEvent): void {
        if (event.key === "Escape" && !isBackgroundActive && !escKeyTimer) {
            escKeyTimer = window.setTimeout(() => {
                activateOverlay();
            }, 1200);
        }
    }

    function handleKeyUp(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            clearEscKeyTimer();
            if (hoveredElement) {
                const url = hoveredElement.dataset.url;
                if (url) {
                    window.location.href = url;
                }
            } else if (isBackgroundActive) {
                deactivateOverlay();
            }
        }
    }

    function clearEscKeyTimer(): void {
        if (escKeyTimer) {
            clearTimeout(escKeyTimer);
            escKeyTimer = null;
        }
    }

    function initializeListeners(): void {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
    }

    initializeListeners();
}

window.onload = () => {
    initializeEscOverlay();
};
