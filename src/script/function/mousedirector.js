function initializeShiftOverlay() {
    var shiftKeyTimer = null;
    var isBackgroundActive = false;
    var overlayElement = null;
    var circleElement = null;
    function activateOverlay() {
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
    function deactivateOverlay() {
        if (overlayElement) {
            overlayElement.style.display = "none";
        }
        if (circleElement) {
            circleElement.style.display = "none";
        }
        isBackgroundActive = false;
    }
    function createOverlayElement() {
        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.zIndex = "9999";
        overlay.style.pointerEvents = "all";
        overlay.style.display = "none";
        return overlay;
    }
    function createCircleElement() {
        var circle = document.createElement("div");
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
    function createDividedCircle(circle) {
        var sections = [
            { className: 'top-left', top: '0', left: '0', width: 'calc(50% - 1px)', height: 'calc(50% - 1px)' },
            { className: 'top-right', top: '0', right: '0', width: 'calc(50% - 1px)', height: 'calc(50% - 1px)' },
            { className: 'bottom-left', bottom: '0', left: '0', width: 'calc(50% - 1px)', height: 'calc(50% - 1px)' },
            { className: 'bottom-right', bottom: '0', right: '0', width: 'calc(50% - 1px)', height: 'calc(50% - 1px)' }
        ];
        // 각 구역을 생성하여 원에 추가
        sections.forEach(function (section) {
            var sectionElement = document.createElement('div');
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
            sectionElement.addEventListener("mouseover", function () {
                sectionElement.style.transform = "scale(1.1)";
                sectionElement.style.boxShadow = "0px 0px 10px rgba(255, 255, 255, 0.7)";
            });
            sectionElement.addEventListener("mouseout", function () {
                sectionElement.style.transform = "scale(1)";
                sectionElement.style.boxShadow = "none";
            });
            circle.appendChild(sectionElement);
        });
    }
    function handleKeyDown(event) {
        if (event.key === "Escape" && !isBackgroundActive && !shiftKeyTimer) {
            shiftKeyTimer = window.setTimeout(function () {
                activateOverlay();
            }, 1200);
        }
    }
    function handleKeyUp(event) {
        if (event.key === "Escape") {
            clearShiftKeyTimer();
            if (isBackgroundActive) {
                deactivateOverlay();
            }
        }
    }
    function clearShiftKeyTimer() {
        if (shiftKeyTimer) {
            clearTimeout(shiftKeyTimer);
            shiftKeyTimer = null;
        }
    }
    function initializeListeners() {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
    }
    initializeListeners();
}
window.onload = function () {
    initializeShiftOverlay();
};
