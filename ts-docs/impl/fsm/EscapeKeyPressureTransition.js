import { KeyCode } from "./Events";
import { KeyPressureTransition } from "./KeyPressureTransition";
export class EscapeKeyPressureTransition extends KeyPressureTransition {
    constructor(srcState, tgtState) {
        super(srcState, tgtState);
    }
    isGuardOK(event) {
        return event.code === "Escape" || event.code === String(KeyCode.escape);
    }
}
