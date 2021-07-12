---
title: "Routines"
index: 5
---

Routines are methods that give configuration options for bindings. Some activate simple options like logging
(see [log](./routines#the-log-routine-logging)). Others, like
[first](./routines#the-first-routine-interaction-start) or
[end](./routines#the-end-cancel-endorcancel-routines-interaction-ends-cancels-ends-or-canceled), allow you
to specify an arrow function that will be executed at a given point during the interaction.

## What are `i` and `c` in binding routines?

```ts
multiTouchBinder(3)
    .toProduce(i => ...)
    .then((c, i) => ...)
    ...
    .bind();
```

Routines take different arguments, the two most common being `i` and `c`.

### The `i` argument

`toProduce` and `then` are examples of routines that take the `i` argument.
`i` represents what we call **interaction data**, the data exhibited by a given user interaction (what button was
clicked on by the user, what the current position of the mouse cursor is, etc.).
The type of `i` will always be a sub-class of `InteractionData`, but varies depending on the exact nature of the interaction
and what kind of data this interaction provides.

Here we use a MultiTouch interaction, therefore the type of `i` is `MultiTouchData`:

```ts
multiTouchBinder(3)
    .first((c, i) => ...)
    .then((c, i) => ...)
    .end((c, i) => ...)
    ...
    .bind();
```

### The `c` argument

The `then` routine (and many others) takes an argument called `c`.
`c` refers to the ongoing command, allowing you to update it during the interaction.

## Where to begin: selecting a user interaction

When configuring a binding, the first routine allows you to decide which user interaction to use.
See the [interaction documentation](./interactions) for details.


## How to register with widgets: the `on` and `onDynamic` routines

```ts
buttonBinder()
    .on(this.button.nativeElement)
    ...
    .bind();
```

The `on` routine identifies the widgets on which the user interaction will operate.
A single binding can operate on several widgets:

```ts
buttonBinder()
    .on(this.button1.nativeElement, this.button2.nativeElement)
    ...
    .bind();
```

The registration to widgets can be dynamic:
a binding can listen for changes in the children list of a given widget.
When new children are added, the binding will operate on them.
When children are removed, the binding will no longer operate on them.
This is done thanks to the `onDynamic` routine.

```ts
longTouchBinder(2000)
    .onDynamic(this.canvas.nativeElement)
    ...
    .bind();
```

Optimization: a user interaction does not listen for all the UI events that concern it.
For example a DnD is an assembly of press, drag, release, and key type events.
The user interaction registers with the strictly necessary events at a given instant:
a DnD starts with a pressure, so that the interaction listens for a pressure event.
The pressure must be followed by moves, so that the interaction listens for move events only, etc.

```ts
dndBinder()
    .on(this.canvas.nativeElement)
    ...
    .bind();
```

### Angular: using `on` with `ViewChildren`

Let's say you have a property in your Angular component that refers to a list of `div` elements:

```ts
@ViewChildren('divs')
private divs: QueryList<ElementRef<HTMLDivElement>>;
```

To register all the `div` elements from `divs`, you can write this `on` routine:

```ts
clickBinder()
    .on(...this.divs.toArray().map(e => e.nativeElement))
    ....bind();
```

This converts the `queryList` as an array of `div` objects.

## The `toProduce` routine : command creation

The role of the `toProduce` routine is to create the command that should be executed when the user successfully completes
the interaction. It is called once the interaction has begun and the condition of the
[`when()`](./routines#how-to-filter-user-interaction-data-the-when-routine-and-strictstart) routine is verified.
This routine takes as argument an anonymous function that returns the new command.

In this example, the `toProduce` routine is used to create a `Translate` command that will be executed once
a drag-and-drop interaction is completed.

```ts
dndBinder()
    .toProduce(i => new Translate(i.src.tgt())
    ...bind();
```

## How to filter user interaction data: the `when` routine (and `strictStart`)

### The `when` routine

The `when` routine defines a contract that the user interaction data must fulfil to create and execute a command.
The `toProduce` routine waits for `when` to return true before creating a command, and commands are only
executed if `when` returns true.
This routine takes as argument an anonymous function that returns a boolean. If `when` is not configured,
then it will always return true.

In this example, `when` checks that the interaction operates on an SVG element contained inside the canvas.
If `when` is never true, the binding does not create or execute the command.

```ts
longTouchBinder(2000)
    .onDynamic(this.canvas.nativeElement)
    .when(i => i.src.tgt() instanceof SVGElement)
    ...
    .bind();
```

The results of `when` may change during the execution of the interaction, for example:
- It may be false when the interaction starts, but then become true.
In this case, the command is created when `when` becomes true and is executed when the interaction ends;
- It may be true when the interaction starts, but then become false.
In this case, the command is created (and possibly updated) at the beginning of the interaction,
but never executed as `when` must be true at the end of the interaction in order to execute the command.

### The `strictStart` routine

The `strictStart` routine requires the `when` routine to return true when the interaction starts.
Otherwise, the binding will immediately cancel the ongoing user interaction.
In this code example, if the target object of the DnD is not an SVG element when the interaction starts,
then the binding will cancel the DnD.

```ts
dndBinder()
    .onDynamic(this.canvas.nativeElement)
    .when(i => i.target.tgt() instanceof SVGElement)
    .strictStart()
    ...
    .bind();
```

## The `first` routine: interaction start

A binding calls the `first` routine once right after the creation of the command.
It takes as arguments the current interaction data (`i`) and the current command (`c`).
The goal of `first` is to update command parameters or to provide specific user feedback at the beginning of
an interaction's execution.

In this example, `first` applies a blurred-shadow effect on the object to be moved.

```ts
dragLockBinder()
    .toProduce(i => new Translate(i.getSrcObject())
    .onDynamic(this.canvas.nativeElement)
    .first((i, c) => i.src.tgt().setEffect(new DropShadow()))
    .bind();
```

Note that just like for the creation of commands, the binding waits for `when` to return
true before executing `first`. It might therefore not be called right when the interaction starts.

## The `then` routine: interaction update

The `then` routine is called on each update of a running user interaction.
This routine takes as arguments the current interaction data (`i`) and the current command (`c`).

The main goal of the `then` routine is to update the parameters of the ongoing command using the current interaction data.
In this example, `then` updates the translation vector to move an object. Note that while the user's mouse is not
moving, the interaction will not be updated and `then` will therefore not be called.

```ts
dragLockBinder()
    .toProduce(i => new Translate(i.getSrcObject())
    .onDynamic(this.canvas.nativeElement)
    .then((i, c) => c.setCoord(
    c.getShape().getX() + i.getEndX() - i.getSrcX(),
    c.getShape().getY() + i.getEndY() - i.getSrcY()))
    .bind();
```

## The `end`, `cancel`, `endOrCancel` routines: Interaction Ends, Cancels, Ends or Canceled

### The `end` routine

When the interaction ends, the binding calls the `end` routine (if the `when` predicate is respected).
This routine takes as arguments the current interaction data (`i`) and the current command (`c`).
In the example, `end` changes the text message of a text widget when a button is clicked, after
the execution of a command that clears the contents of a text field.

```ts
buttonBinder()
    .toProduce(_i => new Clear())
    .on(this.erase.nativeElement)
    ...
    .end((_c, _i) => this.status.nativeElement.textContent = 'Cleared')
    .bind();
```

### The `cancel` routine

Users can cancel some user interactions, such as the DnD
(if `true` is passed as an argument to specify that the interaction is cancellable).
While using the DnD, pressing the `escape` key cancels the ongoing DnD: the interaction is stopped and reinitialized and
the ongoing command aborted.

When an interaction is cancelled, the binding calls the `cancel` routine, whether the `when` predicate is respected or not.
This routine takes as argument the current interaction data (`i`).

In the example, `cancel` calls a method that shows an animation on the concerned element.

```ts
dndBinder(true)
    .toProduce(i => new MoveObject())
    .on(this.canvas.nativeElement)
    ...
    .cancel(i => this.showCancelAnimation(i))
    .bind();
```

### The `endOrCancel` routine

When the interaction ends or is cancelled, the binding calls the `endOrCancel` routine
(if the interaction has ended normally, the `when` predicate has to be respected to call `endOrCancel`).

This routine takes as argument the current interaction data (`i`).
This routine does not replace `end` or `cancel`: the binding calls this routine right after `end` or `cancel`.

In the example, `endOrCancel` changes the style of the source object of the DnD.

```ts
dndBinder(true)
    ...
    .endOrCancel(i => (i.src.tgt() as HTMLElement).style.visibility = 'hidden')
    .bind();
```

## The `ifHadEffects` and `ifHadNoEffect` routines
The `ifHadEffects` and `ifHadNoEffect` routines are called at the end of a successful interaction, after the `end`
and `endOrCancel` routines.
They are called respectively if the command produced an effect, and if the command didn't.

To determine whether a command produced an effect, Interacto uses the `hadEffect()` method of the `Command` interface.
It returns true if the command produced an effect.
The default implementation for the `CommandBase` class returns true as long as the command has been executed at least once.
To customize this behaviour, you can redefine the `hadEffect()` method in your own commands.

In this example, a message indicates to the user if trying to change the color of an SVG element to blue 
had an effect or not. Here is the binding configuration code:

```ts
buttonBinder()
    .toProduce(i => new ChangeColorToBlue(mySVGElement))
    .on(this.myButton.nativeElement)
    ...
    .ifHadEffects((c, i) => this.status.nativeElement.textContent = 'The element is now blue!')
    .ifHadNoEffect((c, i) => this.status.nativeElement.textContent = 'The element was already blue.')
    .bind();
```

And here is the command code:

```ts
export class ChangeColorToBlue extends CommandBase {
    private previousColor: string | undefined;
    
    constructor(private readonly svgElt: SVGElement) {
        super();
    }
    
    protected execution(): void {
        this.previousColor = this.svgElt.getAttribute('fill');
        this.svgElt.setAttribute('fill', 'blue');
    }
    
    public hadEffect(): boolean {
        return this.previousColor !== 'blue';
    }
}
```

## The `ifCannotExecute` routine

When a binding tries to execute a command but fails because the command's `canExecute()` method returned false,
the binding calls the `ifCannotExecute` routine.
This routine takes as arguments the current interaction data (`i`) and the current command (`c`).

In this example, pressing the button executes a command that tries to purchase an item but fails if the user's
funds are insufficient.

```ts
buttonBinder()
    .toProduce(i => new PurchaseItem())
    .on(this.myButton.nativeElement)
    ...
    .ifCannotExecute((c, i) => this.status.nativeElement.textContent = 'You do not have enough money to purchase this item.')
    .bind();
```

## The `catch` routine

The `catch` routine allows the processing of errors during the execution of the binding.
This routine is called when an error is thrown in one of the arrow functions provided to the different routines.
This routine takes as argument the error (`ex`).

## The `log` routine: logging

```ts
nodeBinder()
    ...
    .log(LogLevel.interaction)
    .bind();
```

Bindings support logging systems at different levels.
In the example the binding logs the user interaction execution.
This feature is useful for debugging a binding.
There exists three logging levels:

```ts
LogLevel.interaction
```

This level logs information related to the execution of the user interaction.

```ts
LogLevel.command
```

This level logs information related to the production of commands.

```ts
LogLevel.binding
```

This level logs information related to the behavior of the binding.

## The `stopImmediatePropagation` routine

The `stopImmediatePropagation` routine follows the same idea as the `stopImmediatePropagation` method of the `Event` class :
it stops the propagation of the current event processed by the user interaction to the next bindings (and their user interaction).
See the documentation related to [Event.stopImmediatePropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation).
An example:

```ts
longTouchBinder(2000)
    ...
    // Consumes the events before the
    // multi-touch interaction use them
    .stopImmediatePropagation()
    .bind();

multiTouchBinder(2)
    ...
    .bind();
```

In this example the first binding consumes the touch event its long touch interaction will process.
This prevents the multi-touch interaction to start while doing a long touch.

## The `preventDefault` routine

The `preventDefault` routine follows the same idea as the `preventDefault` method from the `Event` class :
it stops the default behavior of the browser on the event.

In the example, a long touch will normally lead the browser to show the context menu, but we
might prefer to have our own custom menu appear.
The use of `preventDefault` prevents this default behavior from occurring.
See the documentation related to [Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault).

```ts
longTouchBinder(2000)
    // Prevents the context menu to pop-up
    .preventDefault()
    .bind();
```


## The `throttle` routine
This routine is not implemented in TypeScript yet (even if provided by the API, this has no effect).
