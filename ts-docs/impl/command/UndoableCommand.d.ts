import { CommandBase } from "./CommandBase";
import type { Undoable } from "../../api/undo/Undoable";
export declare abstract class UndoableCommand extends CommandBase implements Undoable {
    getUndoName(): string;
    getVisualSnapshot(): SVGElement | string | undefined;
    abstract redo(): void;
    abstract undo(): void;
}
