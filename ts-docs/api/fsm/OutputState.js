export function isOutputStateType(obj) {
    return obj.exit !== undefined && obj.addTransition !== undefined &&
        obj.process !== undefined && obj.transitions !== undefined;
}
