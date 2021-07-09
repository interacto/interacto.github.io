export function remove(array, elt) {
    const index = array.indexOf(elt);
    if (index > -1) {
        array.splice(index, 1);
    }
}
export function removeAt(array, index) {
    if (index > -1) {
        return array.splice(index, 1)[0];
    }
    return undefined;
}
export function peek(array) {
    return array[array.length - 1];
}
