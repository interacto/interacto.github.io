---
title: "Routines"
---

## What are `i` and `c` in binding routines?

```ts
multiTouchBinder(3)
    .toProduce(i => ...)
    .then((c, i) => ...)
    ...
    .bind();
```

The routines take different arguments. For example `toProduce` and `then` take an argument `i`.
The type of `i` is a sub-class of `InteractionData`: each user interaction exhibits specific data (we call interaction data)
that routines can handle. Here, the type of `i` is `MultiTouchData`.

```ts
multiTouchBinder(3)
    .first((c, i) => ...)
    .then((c, i) => ...)
    .end((c, i) => ...)
    ...
    .bind();
```

The `then` routine (and many other routines) takes an argument called `c`.
`c` refers to the ongoing command, allowing you to update it.

## How to register with widgets: the `on` and `onDynamic` routines

```ts
buttonBinder()
    .on(this.button.nativeElement)
    ...
    .bind();
```

The `on` routine identifies the widgets on which the user interaction will operate.
A binding can operate on several widgets:

```ts
buttonBinder()
    .on(this.button1.nativeElement, this.button2.nativeElement)
    ...
    .bind();
```

```ts
longTouchBinder(2000)
    .onDynamic(this.canvas.nativeElement)
    ...
    .bind();
```

The registration to widgets can be dynamic:
a binding can listen for changes in the children list of a given widget.
When new children are added, the binding will operate on them.
When children are removed, the binding will no longer operate on them.

```ts
dndBinder()
    .on(this.canvas.nativeElement)
    ...
    .bind();
```

Optimization: a user interaction does not listen for all the UI events that concern it.
For example a DnD is an assembly of press, drag, release, and key type events.
The user interaction registers with the strictly necessary events at a given instant:
a DnD starts with a pressure, so that the interaction listens for a pressure event.
The pressure must be followed by moves, so that the interaction listens for move events only, etc.

## Angular: using `on` with `ViewChildren`

Let's say you have a property in you Angular component that refers to a list of `div` elements:

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

```ts
dragLockBinder()
    .toProduce(d => new Translate(d.getSrcObject())
    ...bind();
```

The routine `toProduce` focuses on the production of a command.
This routine takes as argument an anonymous function that returns a command.
The binding calls the provided anonymous function while running to create a new command.
In the example, the routine `toProduce` is used to create `Translate` commands.

## How to filter user interaction data: the `when` routine (and `strictStart`)

```ts
longTouchBinder(2000)
    .onDynamic(this.canvas.nativeElement)
    .when(i => i.getSrcObject() instanceof SVGElement)
    ...
    .bind();
```

The `when` routine defines a contract that the user interaction data must fulfil to create/execute a command.
On this example `when` checks that the interaction operates on an SVG element contained by the canvas.
If when is never true, the binding does not create or executed a command.

The results of `when` may change during the execution of the interaction, for examples:
- it may be false on interaction start to be then true,
  so that the command is created only when is true to be executed on when the interaction ends;
- it may be true on interaction start to be then false,
  so that the command is first created (and possibly updated), but never executed as `when` must be true at the end
  of the interaction for executing the command.

```ts
dndBinder()
    .onDynamic(this.canvas.nativeElement)
    .when(i => i.getTgtObject() instanceof SVGElement)
    .strictStart()
    ...
    .bind();
```

The strictStart routine requires the routine when to return true on interaction start.
Otherwise the binding will cancel the ongoing user interaction.
For example with the code example, if the target object of the DnD is not an SVG element when the interaction starts,
then the binding will cancel the DnD.

## The `first` routine: interaction start

```ts
dragLockBinder()
    .toProduce(i => new Translate(d.getSrcObject())
    .onDynamic(this.canvas.nativeElement)
    .first((i, c) => i.getSrcObject().setEffect(new DropShadow()))
    .bind();
```

A binding calls the `first` routine right after the instantiation of a command, when the interaction starts.
It takes as arguments the current interaction data (`i`) and the current command (`c`).
The goal of `first` is to update command parameters or to provide specific user feedback at the beginning of an interaction execution.
For example with the example, `first` applies a blurred-shadow effect on the object to be moved.

## The `then` routine: interaction update

```ts
dragLockBinder()
    .toProduce(i => new Translate(i.getSrcObject())
    .onDynamic(this.canvas.nativeElement)
    .then((i, c) => c.setCoord(
    c.getShape().getX() + i.getEndX() - i.getSrcX(),
    c.getShape().getY() + i.getEndY() - i.getSrcY()))
    .bind();
```

On each update of the running user interaction, the `then` routine is called.
This routine takes as arguments the current interaction data (`i`) and the current command (`c`).
The main goal of the `then` routine is to update the parameters of the ongoing command using the current interaction data.
In the example, `then` updates the translation vector to move an object.

## The `end`, `cancel`, `endOrCancel` routines: Interaction Ends, Cancels, Ends or Canceled

```ts
    buttonBinder()
    .toProduce(_i => new Clear())
    .on(this.erase.nativeElement)
    ...
    .end((_c, _i) => this.status.nativeElement.textContent = 'Cleared')
    .bind();
```

When the interaction ends, the binding calls the routine `end` (if the `when` predicate is respected).
This routine takes as arguments the current interaction data (`_i`) and the current command (`_c`).
In the example, `end` changes the text message of a text widget.

```ts
dndBinder(true)
    .toProduce(_i => new MoveObject())
    .on(this.canvas.nativeElement)
    ...
    .cancel(i => this.showCancelAnimation(i))
    .bind();
```

Users can cancel some user interactions, such as the DnD
(when passing as argument `true` to specify that the interaction is cancellable).
Using the DnD, pressing the `escape` key cancels the ongoing DnD: the interaction is stopped and reinitialized and
the ongoing command aborted.

When an interaction is cancelled, the binding calls the `cancel` routine.
This routine takes as arguments the current interaction data (`i`).
In the example, `cancel` calls a method that shows an animation on the concerned node.

```ts
dndBinder(true)
    ...
    .endOrCancel(i => (i.getSrcObject() as HTMLElement).style.visibility = 'hidden')
    .bind();
```

When the interaction ends or is cancelled, the binding calls the routine `endOrCancel` (if the `when` predicate is respected for `end`).

This routine takes as arguments the current interaction data (`i`).
This routine does not replace `end` or `cancel`: the binding calls this routine right after `end` or `cancel`.

In the example, `endOrCancel` changes the style of the source object of the DnD.

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

This level logs information related to the executiong of the user interaction.

```ts
LogLevel.command
```

This level logs information related to the production of commands.

```ts
LogLevel.binding
```

This level logs information related to the behavior of the binding.

## The `stopImmediatePropagation` routine

```ts
swipeBinder(false, 200, 100, 20)
    ...
    .stopImmediatePropagation()
    .bind();
```

The routine `stopImmediatePropagation` follows the same idea as the method `stopImmediatePropagation` of the class `Event`:
it stops the propagation of the current event processed by the user interaction to the next bindings (and their user interaction)
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

```ts
longTouchBinder(2000)
    // Prevents the context menu to pop-up
    .preventDefault()
    .bind();
```

The routine `preventDefault` follows the same idea that the method `preventDefault` of the class `Event`:
it stops the default behavior of the browser on the event.

In the example, a long touch will lead the browser to show the context menu.
The use of `preventDefault` prevents this default behavior.
See the documentation related to [Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault).

## The `throttle` routine
This routine is not implemented in TypeScript yet (even if provided by the API, this has no effect).
