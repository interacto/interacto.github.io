---
title: "Commands/Undo"
index: 4
---

In Interacto, actions triggered by user interactions are represented by **commands**.
Each command is a class with methods indicating how to execute, and if necessary how to undo and redo an action.
This makes them easily reusable across your code and projects, and gives you access to Interacto's undo/redo system.

Commands all implement the `Command` interface, and the `Undoable` interface if they are undoable.
The simplest way to create a new command is to create a new class inheriting the provided `CommandBase` class, or, if the command
must be undoable, the `UndoableCommand` class.

## Anonymous command

```ts
bindings.clickBinder()
    .on(this.canvas)
    .toProduceAnon(() => {
        console.log('click');
    })
    .bind();
```

If you do not want to code your own command and prefer to use an anonymous function instead you can use the `toProduceAnon` routine.
This command takes as argument a lambda to be called on the execution of the command.

Note that this routine uses the predefined command `AnonCmd`. Using this command, the equivalent code of the previous example is (for illustrative, where `i` is the interaction data):

```ts
bindings.clickBinder()
    .on(this.canvas.nativeElement)
    .toProduce(i => new AnonCmd(() => {
        console.log(i.getSrcClientX());
    }))
    .bind();
```

## Defining an undoable command

```ts
import {UndoableCommand} from 'interacto';

export class DeleteAll extends UndoableCommand {
    private mementoContent: Array = [];
    
    public constructor(private readonly svgDoc: SVGSVGElement) { }
    
    protected override createMemento(): void {
        this.mementoContent = Array.from(this.svgDoc.children);
    }
    
    protected execution(): void {
        this.redo();
    }
    
    public undo(): void {
        this.mementoContent.forEach(node => this.svgDoc.appendChild(node));
    }
    
    public redo(): void {
        Array.from(this.svgDoc.children).forEach(node => node.remove());
    }
    
    public override getUndoName(): string {
        return 'Delete all the SVG elements';
    }
}
```

An undoable command can extend the class [`UndoableCommand`](../ts-docs/classes/UndoableCommand.html).
The command must then implement the methods `undo`, `redo`, and `getUndoName`.
`undo` and `redo` contain the code to execute when the user wishes to undo or redo the command.
The method `getUndoName` can be used to display a message inside widgets related to the undo/redo functionality.
For example, to give some information to the user about the command they are about to undo.

Developers do not directly call these methods: when an undoable command is executed, the binding puts it in a specific registry
that keeps track of all executed commands. Then, when the user clicks on the "Undo" button of an Interacto app,
the `undo` method of the last executed command from the registry will be automatically called.
To create the appropriate bindings for these buttons, use the predefined commands `Undo` and `Redo`,
as detailed in the following examples.

### Visual snapshot of commands

TODO. [See the documentation.](../ts-docs/classes/UndoableCommand.html#getVisualSnapshot)


## Undo/redo buttons

For Angular, please [look at the dedicated feature](angular-integration#undoredo) to use undo/redo in a more efficient way.

If you do not use the Angular way of doing undo/redo, you can define your own undo/redo bindings like this:

```ts
bindings.buttonBinder()
    .toProduce(() => new Undo())
    .on(this.undoButton)
    .bind();
```

To undo the latest executed undoable command, developers should define a dedicated binding.
This binding must use the predefined `Undo` command that asks to undoable commands registry to undo its latest undoable command.
Once undone, the registry put this command on the top of a stack of redoable commands.

### Redo

```ts
bindings.buttonBinder()
    .toProduce(() => new Redo())
    .on(this.redoButton)
    .bind();
```

To redo the latest undone command, developers should define a dedicated binding.
This binding must use the predefined `Redo` command that asks to undoable commands registry to redo its latest undone command.
Once redone, the registry put this command on the top of a stack of undoable commands.


## Undo/redo algorithms

TO COMPLETE. You can change the undo/redo algorithm when creating your bindings object.
By default, Interacto uses the [linear algorithm](../ts-docs/classes/UndoHistory.html). But we also provide [a tree algorithm](../ts-docs/classes/TreeUndoHistory.html).
