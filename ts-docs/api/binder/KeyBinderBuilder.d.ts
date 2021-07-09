export interface KeyBinderBuilder {
    with(...codes: ReadonlyArray<string>): KeyBinderBuilder;
}
