import type { WidgetData } from "../../api/interaction/WidgetData";
import type { Interaction } from "../../api/interaction/Interaction";
import type { BaseUpdateBinder } from "../../api/binder/BaseUpdateBinder";
import type { BindingsObserver } from "../../api/binding/BindingsObserver";
import type { Widget } from "../../api/binder/BaseBinderBuilder";
import { Undo } from "../command/library/Undo";
import type { Binding } from "../../api/binding/Binding";
import { Redo } from "../command/library/Redo";
import type { PartialAnchorBinder, PartialButtonBinder, PartialInputBinder, PartialKeyBinder, PartialKeysBinder, PartialMultiTouchBinder, PartialPointBinder, PartialPointsBinder, PartialPointSrcTgtBinder, PartialScrollBinder, PartialSelectBinder, PartialSpinnerBinder, PartialTapBinder, PartialTextInputBinder, PartialTouchBinder, PartialTouchSrcTgtBinder, PartialUpdatePointBinder } from "../../api/binding/Bindings";
import type { UndoHistory } from "../../api/undo/UndoHistory";
import { Bindings } from "../../api/binding/Bindings";
import type { Logger } from "../../api/logging/Logger";
export declare class BindingsImpl extends Bindings {
    private observer;
    private readonly undoHistoryData;
    readonly logger: Logger;
    constructor(history?: UndoHistory, logger?: Logger);
    get undoHistory(): UndoHistory;
    nodeBinder(): BaseUpdateBinder;
    buttonBinder(): PartialButtonBinder;
    checkboxBinder(): PartialInputBinder;
    colorPickerBinder(): PartialInputBinder;
    comboBoxBinder(): PartialSelectBinder;
    spinnerBinder(): PartialSpinnerBinder;
    dateBinder(): PartialInputBinder;
    hyperlinkBinder(): PartialAnchorBinder;
    textInputBinder(timeout?: number): PartialTextInputBinder;
    touchDnDBinder(): PartialTouchSrcTgtBinder;
    multiTouchBinder(nbTouches: number): PartialMultiTouchBinder;
    tapBinder(nbTap: number): PartialTapBinder;
    longTouchBinder(duration: number): PartialTouchBinder;
    swipeBinder(horizontal: boolean, minVelocity: number, minLength: number, pxTolerance: number): PartialTouchSrcTgtBinder;
    panBinder(horizontal: boolean, minLength: number, pxTolerance: number): PartialTouchSrcTgtBinder;
    clickBinder(): PartialPointBinder;
    dbleClickBinder(): PartialUpdatePointBinder;
    pressBinder(): PartialPointBinder;
    longPressBinder(duration: number): PartialUpdatePointBinder;
    clicksBinder(nbClicks: number): PartialPointsBinder;
    mouseoutBinder(withBubbling: boolean): PartialPointBinder;
    mouseoverBinder(withBubbling: boolean): PartialPointBinder;
    mousemoveBinder(): PartialPointBinder;
    scrollBinder(): PartialScrollBinder;
    dndBinder(cancellable: boolean): PartialPointSrcTgtBinder;
    dragLockBinder(): PartialPointSrcTgtBinder;
    keyPressBinder(modifierAccepted: boolean): PartialKeyBinder;
    keysPressBinder(): PartialKeysBinder;
    keysTypeBinder(): PartialKeysBinder;
    keyTypeBinder(): PartialKeyBinder;
    undoRedoBinder(undo: Widget<HTMLButtonElement>, redo: Widget<HTMLButtonElement>): [
        Binding<Undo, Interaction<WidgetData<HTMLButtonElement>>, WidgetData<HTMLButtonElement>>,
        Binding<Redo, Interaction<WidgetData<HTMLButtonElement>>, WidgetData<HTMLButtonElement>>
    ];
    clear(): void;
    setBindingObserver(obs?: BindingsObserver): void;
}
