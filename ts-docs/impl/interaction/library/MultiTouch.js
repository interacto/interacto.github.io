import { ConcurrentFSM } from "../../fsm/ConcurrentFSM";
import { ConcurrentInteraction } from "../ConcurrentInteraction";
import { TouchDnDFSM } from "./TouchDnD";
import { MultiTouchDataImpl } from "../MultiTouchDataImpl";
import { SrcTgtTouchDataImpl } from "../SrcTgtTouchDataImpl";
class MultiTouchFSM extends ConcurrentFSM {
    constructor(nbTouch) {
        super([...Array(nbTouch).keys()].map(_ => new TouchDnDFSM()));
    }
    buildFSM(dataHandler) {
        super.buildFSM(dataHandler);
        this.getConccurFSMs().forEach(fsm => {
            fsm.buildFSM(dataHandler);
        });
    }
    process(event) {
        if (!(event instanceof TouchEvent)) {
            return false;
        }
        const touches = this.getConccurFSMs()
            .filter(fsm => fsm.getTouchId() === event.changedTouches[0].identifier);
        if (touches.length > 0) {
            return touches[0].process(event);
        }
        return this.getConccurFSMs().some(conccurFSM => conccurFSM.process(event));
    }
}
export class MultiTouch extends ConcurrentInteraction {
    constructor(nbTouches) {
        super(new MultiTouchFSM(nbTouches), new MultiTouchDataImpl());
        this.handler = {
            "onTouch": (event) => {
                if (event.changedTouches.length > 0) {
                    const data = new SrcTgtTouchDataImpl();
                    data.copySrc(event.changedTouches[0], event);
                    data.copyTgt(event.changedTouches[0], event);
                    this._data.addTouchData(data);
                }
            },
            "onMove": (event) => {
                this._data.setTouch(event.changedTouches[0], event);
            },
            "onRelease": (event) => {
                this._data.setTouch(event.changedTouches[0], event);
            },
            "reinitData": () => {
                const currentIDs = this.fsm.getConccurFSMs()
                    .filter(fsm => fsm.started)
                    .map(fsm => fsm.getTouchId());
                this.data
                    .touches
                    .filter(data => !currentIDs.includes(data.src.identifier))
                    .forEach(data => {
                    this.data.removeTouchData(data.src.identifier);
                });
            }
        };
        this.fsm.buildFSM(this.handler);
    }
}
