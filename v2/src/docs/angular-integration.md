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
- `ioClick` for click. `PartialPointBinder` as parameter type.
- `ioClicks` for clicks. `PartialPointsBinder` as parameter type.
- `ioDoubleClick` for double click. `PartialUpdatePointBinder` as parameter type.
- `ioDnd` for DnD. `PartialPointSrcTgtBinder` as parameter type.
- `ioDragLock` for drag lock. `PartialPointSrcTgtBinder` as parameter type.
- `ioLongMousedown` for long pressure. `PartialUpdatePointBinder` as parameter type.
- `ioMousedown` for mouse pressure. `PartialPointBinder` as parameter type.
- `ioMouseup` for mouse release. `PartialPointBinder` as parameter type.
- `ioMouseenter` for mouse entering. `PartialPointBinder` as parameter type.
- `ioMouseleave` for mouse leaving. `PartialPointBinder` as parameter type.
- `ioKeydown` for key pressure. `PartialKeyBinder` as parameter type.
- `ioMousemove` for mouse move. `PartialPointBinder` as parameter type.
- `ioKeyup` for key release. `PartialKeyBinder` as parameter type.
- `ioKeysdown` for keys pressures. `PartialKeysBinder` as parameter type.
- `ioKeyType` for key typing. `PartialKeyBinder` as parameter type.
- `ioKeysType` for keys typing. `PartialKeysBinder` as parameter type.
- `ioLongTouch` for long touch. `PartialTouchBinder` as parameter type.
- `ioMultiTouch` for multi-touches. `PartialMultiTouchBinder` as parameter type.
- `ioPan` for panning. `PartialMultiTouchBinder` as parameter type.
- `ioSwipe` for swiping. `PartialMultiTouchBinder` as parameter type.
- `ioTap` for tapping. `PartialTapBinder` as parameter type.
- `ioWidget`. To use on HTML widgets, namely: 
  - button (uses `buttonBinder()`, `PartialButtonBinder`)
  - input radio and checkbox (uses `checkboxBinder()`, `PartialInputBinder`)
  - input color  (uses `colorPickerBinder()`, `PartialInputBinder`)
  - input date (uses `dateBinder()`, `PartialInputBinder`);
  - input number (uses `spinnerBinder()`, `PartialSpinnerBinder`);
  - input text (uses `textInputBinder()`, `PartialTextInputBinder`)
  - select (uses `comboBoxBinder()`, `PartialSelectBinder`)
  - anchor (uses `hyperlinkBinder()`, `PartialAnchorBinder`)
  - textarea (uses `textInputBinder()`, `PartialTextInputBinder`)

For undo and redo, you can add `ioUndo` and `ioRedo` on specific buttons. These two buttons will then work with the undo history of Interacto. For example:

```html
<button ioUndo>Undo</button>
<button ioRedo>Redo</button>
```

By default, putting an Interacto directive on an HTML element uses the `on` routine for registering the element. In some cases on want to use `onDynamic`. To do so, you can add the Interacto routine `ioOnDynamic` on the same element. For example:

```html
<div ioOnDynamic [ioClick]="eltSelect" />
```

Interacto also provides the HTML element that produced the user interaction as second parameter of the method that creates the Interacto binder, for example:

```ts
public binderClickEndGame(binder: PartialButtonBinder, elt: HTMLDivElement): void {
  binder
    .toProduce(() => new AnonCmd(() => this.showEndGame()))
    .bind();
}
```

If you want to pass extra parameters, you have to do as follows:

```html
<div [ioClick] (ioBinder)="binderClickLoad($event, m)" *ngFor="let m of myList">
  Play with '{{m}}'
</div>
```

In this code the directive has no value, so that it creates a partial binder and triggers and event with it. This event corresponds to the `ioBinder` parameter in which the method `binderClickLoad` is called with as parameters the created partial binder (the event `$event`) and additional parameters (here `m`). `binderClickLoad` looks like:

```ts
public binderClickLoad(binder: PartialPointBinder, name: string): void {
  ...
}
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




