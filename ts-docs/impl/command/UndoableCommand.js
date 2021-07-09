import { CommandBase } from "./CommandBase";
export class UndoableCommand extends CommandBase {
    getUndoName() {
        return this.constructor.name;
    }
    getVisualSnapshot() {
        return undefined;
    }
}
