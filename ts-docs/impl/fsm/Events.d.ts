import type { EventType } from "../../api/fsm/EventType";
export declare function isEventType(evtType: string): evtType is EventType;
export declare function getTouch(touches: TouchList, idToFind?: number): Touch | undefined;
export declare function isTouchEvent(eventType: EventType): boolean;
export declare function isMouseEvent(eventType: EventType): boolean;
export declare function isKeyEvent(eventType: EventType): boolean;
export declare function isButton(target: EventTarget): target is HTMLButtonElement;
export declare function isCheckBox(target: EventTarget): target is HTMLInputElement;
export declare function isColorChoice(target: EventTarget): target is HTMLInputElement;
export declare function isComboBox(target: EventTarget): target is HTMLSelectElement;
export declare function isDatePicker(target: EventTarget): target is HTMLInputElement;
export declare function isSpinner(target: EventTarget): target is HTMLInputElement;
export declare function isHyperLink(target: EventTarget): target is HTMLAnchorElement;
export declare function isTextInput(target: EventTarget): target is HTMLInputElement | HTMLTextAreaElement;
export declare function isKeyDownEvent(event: Event): event is KeyboardEvent;
export declare function isKeyUpEvent(event: Event): event is KeyboardEvent;
export declare function isMouseDownEvent(event: Event): event is MouseEvent;
export declare function isScrollEvent(event: Event): event is UIEvent;
export declare enum KeyCode {
    escape = 27
}
