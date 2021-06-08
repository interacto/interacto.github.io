---
title: "Commands/Undo"
---

## Commands

### Anonymous command: AnonCmd

```ts
clickBinder()
    .on(this.canvas.nativeElement)
    .toProduce(i => new AnonCmd(() => {
        console.log(i.getSrcClientX());
    }))
    .bind();
```

If you do not want to code your own command and prefer to use an anonymous function instead you can use the `AnonCmd` class.
This command takes as argument a lambda to be called on the execution of the command.
This lambda can use the interaction data `i`.

## Undo/Redo

```ts
export class DeleteAll
extends CommandBase implements Undoable {
    private mementoContent: Array = [];
    
    public constructor(private readonly svgDoc: SVGSVGElement) { super(); }
    
    protected createMemento(): void {
        this.mementoContent = Array.from(this.svgDoc.children);
    }
    
    protected execution(): void {
        this.redo();
    }
    
    public undo(): void {
        this.mementoContent
            .forEach(node => this.svgDoc.appendChild(node));
    }
    
    public redo(): void {
        Array.from(this.svgDoc.children)
            .forEach(node => node.remove());
    }
    
    public getUndoName(): string {
        return 'Delete all the SVG elements';
    }
}
```

[//]: # "TODO: Clarify: implements Undoable or extends UndoableCommand?"

An undoable command has to implement the interface `Undoable`.
The command must then implement the methods `undo`, `redo`, and `getUndoName`.
`undo` and `redo` contain the code to execute when the user wishes to undo or redo the command.
The method `getUndoName` can be used to display a message inside widgets related to the undo/redo functionality.
For example, to give some information to the user about the command they are about to undo.

Developers do not directly call these methods: when an undoable command is executed, the binding puts it in a specific registry
that keeps track of all executed commands. Then, when the user clicks on the "Undo" button of an Interacto app,
the `undo` method of the last executed command from the registry will be automatically called.
To create the appropriate bindings for these buttons, use the predefined commands `Undo` and `Redo`,
as detailed in the following examples.

### Undo

```ts
buttonBinder()
    .toProduce(() => new Undo())
    .on(this.undoButton.nativeElement)
    .bind();
```

To undo the latest executed undoable command, developers should define a dedicated binding.
This binding must use the predefined `Undo` command that asks to undoable commands registry to undo its latest undoable command.
Once undone, the registry put this command on the top of a stack of redoable commands.

### Redo

```ts
buttonBinder()
    .toProduce(() => new Redo())
    .on(this.redoButton.nativeElement)
    .bind();
```

To redo the latest undone command, developers should define a dedicated binding.
This binding must use the predefined `Redo` command that asks to undoable commands registry to redo its latest undone command.
Once redone, the registry put this command on the top of a stack of undoable commands.
