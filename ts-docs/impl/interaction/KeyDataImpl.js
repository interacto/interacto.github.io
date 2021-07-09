import { InteractionDataBase } from "./InteractionDataBase";
export class KeyDataImpl extends InteractionDataBase {
    constructor() {
        super(...arguments);
        this.codeData = "";
        this.keyData = "";
        this.locationData = 0;
        this.repeatData = false;
        this.altKeyData = false;
        this.ctrlKeyData = false;
        this.metaKeyData = false;
        this.shiftKeyData = false;
    }
    flush() {
        super.flush();
        this.codeData = "";
        this.keyData = "";
        this.locationData = 0;
        this.repeatData = false;
        this.altKeyData = false;
        this.ctrlKeyData = false;
        this.metaKeyData = false;
        this.shiftKeyData = false;
    }
    copy(data) {
        super.copy(data);
        this.codeData = data.code;
        this.keyData = data.key;
        this.locationData = data.location;
        this.repeatData = data.repeat;
        this.altKeyData = data.altKey;
        this.ctrlKeyData = data.ctrlKey;
        this.metaKeyData = data.metaKey;
        this.shiftKeyData = data.shiftKey;
    }
    get altKey() {
        return this.altKeyData;
    }
    get code() {
        return this.codeData;
    }
    get ctrlKey() {
        return this.ctrlKeyData;
    }
    get key() {
        return this.keyData;
    }
    get location() {
        return this.locationData;
    }
    get metaKey() {
        return this.metaKeyData;
    }
    get repeat() {
        return this.repeatData;
    }
    get shiftKey() {
        return this.shiftKeyData;
    }
}
