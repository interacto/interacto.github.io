export function isUndoableType(obj) {
    const undoable = obj;
    return undoable.undo !== undefined && undoable.redo !== undefined && undoable.getUndoName !== undefined;
}
