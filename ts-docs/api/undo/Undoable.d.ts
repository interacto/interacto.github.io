export interface Undoable {
    undo(): void;
    redo(): void;
    getUndoName(): string;
    getVisualSnapshot(): SVGElement | string | undefined;
}
export declare function isUndoableType(obj: unknown): obj is Undoable;
