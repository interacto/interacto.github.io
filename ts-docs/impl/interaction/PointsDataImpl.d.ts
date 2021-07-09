import type { PointsData } from "../../api/interaction/PointsData";
import type { PointData } from "../../api/interaction/PointData";
export declare class PointsDataImpl implements PointsData {
    private currentPositionData?;
    private readonly pointsData;
    constructor();
    get points(): ReadonlyArray<PointData>;
    get currentPosition(): PointData | undefined;
    set currentPosition(position: PointData | undefined);
    get lastButton(): number | undefined;
    addPoint(ptData: PointData): void;
    flush(): void;
}
