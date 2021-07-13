interface InteractionData {
}

@startuml
interface PointBaseData  {
    + target: EventTarget | null
    + currentTarget: EventTarget | null
    + clientX: number
    + clientY: number
    + pageX: number
    + pageY: number
    + screenX: number
    + screenY: number
    + altKey: boolean
    + ctrlKey: boolean
    + metaKey: boolean
    + shiftKey: boolean
    + timeStamp: number
}

interface SrcTgtPointsData<T extends PointBaseData> extends InteractionData {
    + src: T
    + tgt: T
    + diffClientX: number
    + diffClientY: number
    + diffPageX: number
    + diffPageY: number
    + diffScreenX: number
    + diffScreenY: number
}
@enduml
