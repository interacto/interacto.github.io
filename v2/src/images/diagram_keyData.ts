@startuml
interface UnitInteractionData extends InteractionData {
    + timeStamp: number
    + target: EventTarget | null
    + currentTarget: EventTarget | null
}

interface EventModifierData extends UnitInteractionData {
    + altKey: boolean
    + ctrlKey: boolean
    + metaKey: boolean
    + shiftKey: boolean
}

interface KeyData extends UnitInteractionData, EventModifierData {
    + code: string
    + key: string
    + location: number
    + repeat: boolean
}
@enduml
