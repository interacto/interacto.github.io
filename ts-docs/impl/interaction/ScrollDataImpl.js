import { InteractionDataBase } from "./InteractionDataBase";
export class ScrollDataImpl extends InteractionDataBase {
    constructor() {
        super(...arguments);
        this.scrollXData = 0;
        this.scrollYData = 0;
    }
    flush() {
        super.flush();
        this.scrollXData = 0;
        this.scrollYData = 0;
    }
    get scrollX() {
        return this.scrollXData;
    }
    get scrollY() {
        return this.scrollYData;
    }
    setScrollData(event) {
        super.copy(event);
        if (event.view !== null) {
            this.scrollXData = event.view.scrollX;
            this.scrollYData = event.view.scrollY;
        }
    }
}
