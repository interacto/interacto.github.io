import { InteractionDataBase } from "./InteractionDataBase";
import type { PointBaseData } from "../../api/interaction/PointBaseData";
export declare abstract class PointingDataBase extends InteractionDataBase implements PointBaseData {
    protected clientXData: number;
    protected clientYData: number;
    protected pageXData: number;
    protected pageYData: number;
    protected screenXData: number;
    protected screenYData: number;
    protected altKeyData: boolean;
    protected ctrlKeyData: boolean;
    protected metaKeyData: boolean;
    protected shiftKeyData: boolean;
    flush(): void;
    copy(data: PointBaseData): void;
    get clientX(): number;
    get clientY(): number;
    get pageX(): number;
    get pageY(): number;
    get screenX(): number;
    get screenY(): number;
    get altKey(): boolean;
    get ctrlKey(): boolean;
    get metaKey(): boolean;
    get shiftKey(): boolean;
}
