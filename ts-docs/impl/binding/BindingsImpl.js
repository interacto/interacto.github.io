import { ButtonPressed } from "../interaction/library/ButtonPressed";
import { UpdateBinder } from "../binder/UpdateBinder";
import { BoxChecked } from "../interaction/library/BoxChecked";
import { ColorPicked } from "../interaction/library/ColorPicked";
import { ComboBoxSelected } from "../interaction/library/ComboBoxSelected";
import { SpinnerChanged } from "../interaction/library/SpinnerChanged";
import { DatePicked } from "../interaction/library/DatePicked";
import { TextInputChanged } from "../interaction/library/TextInputChanged";
import { MultiTouch } from "../interaction/library/MultiTouch";
import { Tap } from "../interaction/library/Tap";
import { LongTouch } from "../interaction/library/LongTouch";
import { Swipe } from "../interaction/library/Swipe";
import { Pan } from "../interaction/library/Pan";
import { Click } from "../interaction/library/Click";
import { Press } from "../interaction/library/Press";
import { DnD } from "../interaction/library/DnD";
import { DoubleClick } from "../interaction/library/DoubleClick";
import { DragLock } from "../interaction/library/DragLock";
import { HyperLinkClicked } from "../interaction/library/HyperLinkClicked";
import { KeyPressed } from "../interaction/library/KeyPressed";
import { KeysPressed } from "../interaction/library/KeysPressed";
import { KeysTyped } from "../interaction/library/KeysTyped";
import { KeyTyped } from "../interaction/library/KeyTyped";
import { Scroll } from "../interaction/library/Scroll";
import { KeysBinder } from "../binder/KeysBinder";
import { TouchDnD } from "../interaction/library/TouchDnD";
import { LongPress } from "../interaction/library/LongPress";
import { Clicks } from "../interaction/library/Clicks";
import { Mouseout } from "../interaction/library/Mouseout";
import { Mouseover } from "../interaction/library/Mouseover";
import { Mousemove } from "../interaction/library/Mousemove";
import { Undo } from "../command/library/Undo";
import { Redo } from "../command/library/Redo";
import { UndoHistoryImpl } from "../undo/UndoHistoryImpl";
import { Bindings } from "../../api/binding/Bindings";
import { LoggerImpl } from "../logging/LoggerImpl";
export class BindingsImpl extends Bindings {
    constructor(history, logger) {
        super();
        this.undoHistoryData = history !== null && history !== void 0 ? history : new UndoHistoryImpl();
        this.logger = logger !== null && logger !== void 0 ? logger : new LoggerImpl();
    }
    get undoHistory() {
        return this.undoHistoryData;
    }
    nodeBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer);
    }
    buttonBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new ButtonPressed());
    }
    checkboxBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new BoxChecked());
    }
    colorPickerBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new ColorPicked());
    }
    comboBoxBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new ComboBoxSelected());
    }
    spinnerBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new SpinnerChanged());
    }
    dateBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new DatePicked());
    }
    hyperlinkBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new HyperLinkClicked());
    }
    textInputBinder(timeout) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new TextInputChanged(timeout));
    }
    touchDnDBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new TouchDnD());
    }
    multiTouchBinder(nbTouches) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new MultiTouch(nbTouches));
    }
    tapBinder(nbTap) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Tap(nbTap));
    }
    longTouchBinder(duration) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new LongTouch(duration));
    }
    swipeBinder(horizontal, minVelocity, minLength, pxTolerance) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Swipe(horizontal, minVelocity, minLength, pxTolerance));
    }
    panBinder(horizontal, minLength, pxTolerance) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Pan(horizontal, minLength, pxTolerance));
    }
    clickBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Click());
    }
    dbleClickBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new DoubleClick());
    }
    pressBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Press());
    }
    longPressBinder(duration) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new LongPress(duration));
    }
    clicksBinder(nbClicks) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Clicks(nbClicks));
    }
    mouseoutBinder(withBubbling) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Mouseout(withBubbling));
    }
    mouseoverBinder(withBubbling) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Mouseover(withBubbling));
    }
    mousemoveBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Mousemove());
    }
    scrollBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new Scroll());
    }
    dndBinder(cancellable) {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new DnD(cancellable));
    }
    dragLockBinder() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new DragLock());
    }
    keyPressBinder(modifierAccepted) {
        return new KeysBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new KeyPressed(modifierAccepted));
    }
    keysPressBinder() {
        return new KeysBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new KeysPressed());
    }
    keysTypeBinder() {
        return new KeysBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new KeysTyped());
    }
    keyTypeBinder() {
        return new KeysBinder(this.undoHistory, this.logger, this.observer)
            .usingInteraction(() => new KeyTyped());
    }
    undoRedoBinder(undo, redo) {
        return [
            this.buttonBinder()
                .on(undo)
                .toProduce(() => new Undo(this.undoHistory))
                .bind(),
            this.buttonBinder()
                .on(redo)
                .toProduce(() => new Redo(this.undoHistory))
                .bind()
        ];
    }
    clear() {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.clearObservedBindings();
        this.undoHistory.clear();
    }
    setBindingObserver(obs) {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.clearObservedBindings();
        this.observer = obs;
    }
}
