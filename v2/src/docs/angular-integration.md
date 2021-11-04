---
title: "Angular Integration"
index: 6
---


First, make sure you [installed Interacto and its Angular library](./installation#angular-and-npm).

Then, in your `app.module.ts` file add the `InteractoModule` into the `imports` array of `NgModule`.
Example:

```ts
@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      InteractoModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You have two ways to define Interacto bindings in Angular components: by defining bindings in `ngAfterViewInit`, or using dedicated Interacto directive in the HTML.

## Using Interacto Angular directives

The first way to use Interacto in Angular is to use dedicated Interacto directives. This follows the way developers usually program Angular apps. Let's start with a small example:
```html
<button [ioWidget]="binderClickEndGame">End game</button>
```
In the HTML file of a component, we defined a button that has the `ioWidget` directive. This directive points to the method `binderClickEndGame` defined in the component class.

```ts
public binderClickEndGame(binder: PartialButtonBinder): void {
  binder
    .toProduce(() => new AnonCmd(() => this.showEndGame()))
    .bind();
}
```
This method `binderClickEndGame` takes as argument a partly-configured Interacto binding that you can complete in the method. The user interaction is already selected as `ioWidget` looks at the HTML tag to identify the user interaction (here a button pressure). The widget on which the binding will operate is also selected: it is the HTML tag. So there is no need to use the routines `usingInteraction` and `on` in `binderClickEndGame`.

The type of the parameter of methods associated to directives depends on the selected Interacto directive. For example with `ioWidget` on a button, it is the type returned by `buttonBinder()`, so `PartialButtonBinder`. Please, refer to [the return type of the methods of `Bindings` methods](ts-docs/classes/bindings.html).

Here is an exhaustive list of the directives. All Interacto directives start with the `io` prefix:
- `ioWidget`. To use on HTML widgets, namely: button (use `buttonBinder()`), input (for radio and checkbox, use `checkboxBinder()`; for color `colorPickerBinder()`; for date `dateBinder()`; for number `spinnerBinder()`; for text `textInputBinder()`) , select (uses `comboBoxBinder()`), anchor (uses `hyperlinkBinder()`), textarea (uses `textInputBinder()`).
- `ioClick` for click
- `ioClicks` for clicks
- `ioDoubleClick` for double click
- `ioDnd` for DnD
- `ioDragLock` for drag lock
- `ioKeyPress` for key pressure
- `ioKeysPress` for keys pressures
- `ioKeyType` for key typing
- `ioKeysType` for keys typing
- `ioLongPress` for long pressure
- `ioLongTouch` for long touch 
- `ioMultiTouch` for multi-touches
- `ioPan` for panning
- `ioPress` for mouse pressure
- `ioSwipe` for swiping
- `ioTap` for tapping

For undo and redo, you can add `ioUndo` and `ioRedo` on specific buttons. These two buttons will then work with the undo history of Interacto. For example:

```html
<button ioUndo>Undo</button>
<button ioRedo>Redo</button>
```

By default, putting an Interacto directive on an HTML element uses the `on` routine for registering the element. In some cases on want to use `onDynamic`. To do so, you can add the Interacto routine `ioOnDynamic` on the same element. For example:

```html
<div ioOnDynamic [ioClick]="eltSelect" />
```

## Using `ngAfterViewInit`

You can define Interacto bindings without using Interacto directives. To do so your component needs to implements `AfterViewInit` to implement the Angular life-cycle method `ngAfterViewInit`: after the HTML view being initialized, you can handle its widgets to define Interacto bindings.

Second, you have to inject a `Bindings` instance in your component constructor, like this:
```ts
public constructor(public undoHistory: UndoHistory, public bindings: Bindings) {
}
```

Note that you can also inject the local undo history (you can already access through your `Bindings` instance).

Then, you can define Interacto bindings in the `ngAfterViewInit` method like this:

```ts
ngAfterViewInit(): void {
  this.bindings.reciprocalDndBinder(this.appComponent.handle, this.appComponent.spring)
    .onDynamic(this.canvas)
    .toProduce(i => new MoveRect(i.src.target as SVGRectElement))
    ...
    .bind();
}
```

Note that this way you need to have your widgets (here `this.canvas`) as attributes of your component class. This is the drawback of this may of defining bindings (quite verbose):

```ts
  @ViewChild('canvas')
  private canvas: ElementRef<SVGSVGElement>;
```




