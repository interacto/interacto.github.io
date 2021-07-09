import type { PointData } from "../../api/interaction/PointData";
import { PointingDataBase } from "./PointingDataBase";
export declare class PointDataImpl extends PointingDataBase implements PointData {
    private buttonData;
    private buttonsData;
    private movementXData;
    private movementYData;
    private offsetXData;
    private offsetYData;
    private relatedTargetData;
    flush(): void;
    copy(data: PointData): void;
    get button(): number;
    get buttons(): number;
    get movementX(): number;
    get movementY(): number;
    get offsetX(): number;
    get offsetY(): number;
    get relatedTarget(): EventTarget | null;
}
