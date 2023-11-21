---
title: "Home"
index: 0
---

## What is Interacto?

Interacto is a front-end framework for processing user interface events.
With Interacto developers handle user interactions (DnD, drag-lock, double-click, button click, pan, multi-touch, etc.) instead of low-level UI events.
Developers configure how to turn a selected user interaction into a (undoable) UI command using a fluent API.

Interacto is both implemented in TypeScript and Java (JavaFX). The TypeScript implementation will be the main focus
of this documentation, but both implementations are fairly similar. While most of the documentation will assume
that you are using Angular with the TypeScript implementation of Interacto, Interacto can also be used with
Vue.js or React.

If you are discovering Interacto, make sure to take a look at our [Getting Started](./how-to-start) page.

Try it [On StackBlitz](https://stackblitz.com/edit/interacto-angular-example-1?file=src%2Fapp%2Ftab-text%2Ftab-text.component.ts)


## Small Example

```ts
// This code follows the builder pattern: a developer configures how
// the executions of a selected user interaction will produce (undoable) user commands.

// The developer selects the long touch, with a timeout delay of 2000 ms
this.bindings.longTouchBinder(2000)
  // On each long touch of 2000 ms, a command DeleteElt will be executed. This command is
  // undoable and Interacto automatically records it in the current command history for undo/redo.
  .toProduce(i => new DeleteElt(this.canvas.nativeElement, i.currentTarget as SVGElement))
  // The long touch will operate on all the children (current and future) of 'canvas'
  .onDynamic(this.canvas)
  // Constraining the execution of the command:
  // nothing done is the targeted element is not the canvas (and not a children of it)
  .when(i => i.target !== this.canvas.nativeElement)
  // Prevents the context menu from popping up
  .preventDefault()
  // This code follows the builder pattern. So, 'bind' is the 'build' equivalent method
  // as it creates as output the corresponding Interacto binding.
  .bind();
```

See the [gallery]() for real examples.

## Academic usage

If you use Interacto for academic purposes, please cite:

[*Interacto: A Modern User Interaction Processing Model*, Arnaud Blouin, Jean-Marc Jézéquel, IEEE Transactions on Software Engineering, pp.1-20, 2021. ⟨10.1109/TSE.2021.3083321⟩](https://hal.inria.fr/hal-03231669)

```
@article{blouin:hal-03231669,
  TITLE = {{Interacto: A Modern User Interaction Processing Model}},
  AUTHOR = {Blouin, Arnaud and J{\'e}z{\'e}quel, Jean-Marc},
  URL = {https://hal.inria.fr/hal-03231669},
  JOURNAL = {{IEEE Transactions on Software Engineering}},
  PUBLISHER = {{Institute of Electrical and Electronics Engineers}},
  PAGES = {1-20},
  YEAR = {2021},
  DOI = {10.1109/TSE.2021.3083321},
  PDF = {https://hal.inria.fr/hal-03231669/file/main.pdf}
}

```

## Report Issues

If you find issues in the documentation, or if something is not clear, please [fill a bug report on Github](https://github.com/interacto/interacto.github.io/issues).


If you find issues in Interacto, or if you have suggestions, please [fill a bug report on Github](https://github.com/interacto/interacto-ts/issues).
