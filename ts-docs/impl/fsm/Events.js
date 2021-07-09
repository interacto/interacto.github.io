import { eventTypes } from "../../api/fsm/EventType";
export function isEventType(evtType) {
    return eventTypes.includes(evtType);
}
export function getTouch(touches, idToFind) {
    for (let i = 0; i < touches.length; i++) {
        if (touches[i].identifier === idToFind) {
            return touches[i];
        }
    }
    return undefined;
}
export function isTouchEvent(eventType) {
    return eventType === "touchstart" || eventType === "touchend" || eventType === "touchmove";
}
export function isMouseEvent(eventType) {
    return eventType === "mousedown" || eventType === "mouseup" || eventType === "mousemove" ||
        eventType === "mouseover" || eventType === "click" || eventType === "auxclick" || eventType === "mouseout" ||
        eventType === "mouseenter" || eventType === "mouseleave";
}
export function isKeyEvent(eventType) {
    return eventType === "keydown" || eventType === "keyup";
}
export function isButton(target) {
    return target instanceof HTMLButtonElement;
}
export function isCheckBox(target) {
    return target instanceof HTMLInputElement && target.getAttribute("type") === "checkbox";
}
export function isColorChoice(target) {
    return target instanceof HTMLInputElement && target.getAttribute("type") === "color";
}
export function isComboBox(target) {
    return target instanceof HTMLSelectElement;
}
export function isDatePicker(target) {
    return target instanceof HTMLInputElement && target.getAttribute("type") === "date";
}
export function isSpinner(target) {
    return target instanceof HTMLInputElement && target.getAttribute("type") === "number";
}
export function isHyperLink(target) {
    return target instanceof HTMLAnchorElement;
}
export function isTextInput(target) {
    return (target instanceof HTMLInputElement && target.getAttribute("type") === "text") ||
        target instanceof HTMLTextAreaElement;
}
export function isKeyDownEvent(event) {
    return event instanceof KeyboardEvent && isEventType(event.type) && event.type === "keydown";
}
export function isKeyUpEvent(event) {
    return event instanceof KeyboardEvent && isEventType(event.type) && event.type === "keyup";
}
export function isMouseDownEvent(event) {
    return event instanceof MouseEvent && isEventType(event.type) && event.type === "mousedown";
}
export function isScrollEvent(event) {
    return event instanceof UIEvent && isEventType(event.type) && event.type === "scroll";
}
export var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["escape"] = 27] = "escape";
})(KeyCode || (KeyCode = {}));
