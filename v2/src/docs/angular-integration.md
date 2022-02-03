---
title: "Angular Integration"
index: 6
---


First, make sure you [installed Interacto and its Angular library](./installation#angular-and-npm).


## Interacto Module


In your `app.module.ts` file add the `InteractoModule` into the `imports` array of `NgModule`.
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

This will enable dependency injection and import all the interacto features.


## Using Interacto in Angular components

By default, you can inject as constructor parameters Interacto objects into your Angular components: the undo/redo history; and [the `Bindings` object](../ts-docs/classes/Bindings.html) (that permits the creation of Interacto bindings or access various Interacto data). For example:

```ts
public constructor(private undoHistory: UndoHistory, private bindings: Bindings) {
}
```

## Setting a specific undo/redo algorithm for an Angular component

By default, your app share a single undo/redo linear history created by the Interacto module.
In some cases, you may want to a specific undo/redo history for one Angular component, or you may use another undo algorithm.

Currently we provide two algorithms: the linear one (the standard we use by default); the tree algorithm (that keeps traces of undo/redo branches).
The following example uses the function `interactoTreeUndoProviders` we provide for injecting Interacto in this component to use the tree algorithm.

```ts
@Component({
  selector: 'app-tab-shapes',
  templateUrl: './tab-shapes.component.html',
  styleUrls: ['./tab-shapes.component.css'],
  // This provider is optional. It permits to have a specific Bindings and thus a specific UndoHistory for this
  // component. Useful when you want to have different undo histories.
  providers: [interactoTreeUndoProviders()]
})
export class TabShapesComponent { ... }
```

Similarly, to use a specific yet linear history for one component, you can use the method `interactoProviders` as depicted as follows:

```ts
@Component({
  selector: 'app-tab-text',
  templateUrl: './tab-text.component.html',
  styleUrls: ['./tab-text.component.css'],
  providers: [interactoProviders()]
})
export class TabTextComponent { ... }
```


## Defining Interacto bindings

You have two ways of defining Interacto bindings in Angular components: using dedicated Interacto directives in the HTML, or by defining bindings in `ngAfterViewInit`.



### Using Interacto Angular directives

The first way to use Interacto in Angular is to use dedicated Interacto directives. This follows the way developers usually program Angular apps. Using this technique, you do not have to inject any Interacto objects in your component's constructor.

Let us start with a small example:

```html
<button [ioButton]="binderClickEndGame">End game</button>
```
In the HTML file of a component, we define a button that has the `ioButton` directive. This directive points to the method `binderClickEndGame` defined in the component class.

```ts
// In your component
public binderClickEndGame(binder: PartialButtonBinder): void {
  binder
    .toProduceAnon(() => this.showEndGame())
    .bind();
}
```
This method `binderClickEndGame` takes as argument a partly-configured Interacto binding that you can complete in the method. The user interaction is already selected: `ioButton`  corresponds to a button interaction. The widget on which the binding will operate is also selected: it is the HTML tag. So there is no need to use the routines `usingInteraction` and `on` in `binderClickEndGame`.


Interacto also provides the HTML element that produced the user interaction as second parameter of the method that creates the Interacto binder, for example:

```ts
// in your component
public binderClickEndGame(binder: PartialButtonBinder, button: HTMLButtonElement): void {
  binder
    .toProduce(() => new AnonCmd(() => this.showEndGame()))
    .bind();
}
```


The parameter's type of the directive method depends on the selected Interacto directive. For example with `ioButton` on a button, it is the type returned by `buttonBinder()`, so `PartialButtonBinder`. Please, refer to [the return type of the methods of `Bindings` methods](../ts-docs/classes/Bindings.html).

Here is an exhaustive list of the directives. All Interacto directives start with the `io` prefix.

Mouse interactions:
- `ioClick` for click. `PartialPointBinder` as parameter type
- `ioClicks` for clicks. `PartialPointsBinder` as parameter type
- `ioDoubleClick` for double click. `PartialUpdatePointBinder` as parameter type
- `ioDnd` for DnD. `PartialPointSrcTgtBinder` as parameter type
- `ioDragLock` for drag lock. `PartialPointSrcTgtBinder` as parameter type
- `ioMousemove` for mouse move. `PartialPointBinder` as parameter type
- `ioLongMousedown` for long pressure. `PartialUpdatePointBinder` as parameter type
- `ioMousedown` for mouse pressure. `PartialPointBinder` as parameter type
- `ioMouseup` for mouse release. `PartialPointBinder` as parameter type
- `ioMouseenter` for mouse entering. `PartialPointBinder` as parameter type
- `ioMouseleave` for mouse leaving. `PartialPointBinder` as parameter type


Touch interactions:
- `ioLongTouch` for long touch. `PartialTouchBinder` as parameter type
- `ioMultiTouch` for multi-touches. `PartialMultiTouchBinder` as parameter type
- `ioPan` for panning. `PartialMultiTouchBinder` as parameter type
- `ioSwipe` for swiping. `PartialMultiTouchBinder` as parameter type
- `ioTap` for tapping. `PartialTapBinder` as parameter type

Keyboard interactions:
- `ioKeydown` for key pressure. `PartialKeyBinder` as parameter type
- `ioKeyup` for key release. `PartialKeyBinder` as parameter type
- `ioKeysdown` for keys pressures. `PartialKeysBinder` as parameter type
- `ioKeyType` for key typing. `PartialKeyBinder` as parameter type
- `ioKeysType` for keys typing. `PartialKeysBinder` as parameter type


Widget interactions:
- `ioButton` for buttons (uses `buttonBinder()`, `PartialButtonBinder`)
- `ioAnchor` for `a` tags (uses `hyperlinkBinder()`, `PartialAnchorBinder`)
- `ioSelect` for `select` tags (uses `comboBoxBinder()`, `PartialSelectBinder`)
- `ioTextarea` for `textarea` tags (uses `textInputBinder()`, `PartialTextInputBinder`)
- `ioTextinput` for text `input` tags (uses `textInputBinder()`, `PartialTextInputBinder`)
- `ioInput` for the following input types:
  - input radio and checkbox (uses `checkboxBinder()`, `PartialInputBinder`)
  - input color  (uses `colorPickerBinder()`, `PartialInputBinder`)
  - input date (uses `dateBinder()`, `PartialInputBinder`);
  - input number (uses `spinnerBinder()`, `PartialSpinnerBinder`);



#### Undo/redo


For undo and redo, you can add `ioUndo` and `ioRedo` on specific buttons. These two buttons will then work with the undo history of Interacto. For example:

```html
<button ioUndo>Undo</button>
<button ioRedo>Redo</button>
```

#### Dynamic registration on elements

By default, putting an Interacto directive on an HTML element uses the `on` routine for registering the element. In some cases on want to use `onDynamic`. To do so, you can add the Interacto routine `ioOnDynamic` on the same element. For example:

```html
<div ioOnDynamic [ioClick]="eltSelect" />
```



#### Passing extra parameters to the binder methods


If you want to pass extra parameters, you have to do as follows:

```html
<div [ioClick] (clickBinder)="binderClickLoad($event, m)" *ngFor="let m of myList">
  Play with '{{m}}'
</div>
```

In this code the directive has no value, so that it creates a partial binder and triggers and event with it. This event corresponds to the `clickBinder` directive that calls the method `binderClickLoad` with as parameters the created partial binder (the event `$event`) and additional parameters (here `m`). `binderClickLoad` looks like:

```ts
// in your component
public binderClickLoad(binder: PartialPointBinder, name: string): void {
  ...
}
```

The `xxxBinder` directive is proper to the user interaction you use. Here are all these directives. For:
- `ioClick`: `clickBinder`
- `ioClicks`: `clicksBinder`
- `ioDoubleClick`: `dbleclickBinder`
- `ioDnd`: `dndBinder`
- `ioDragLock`: `dragLockBinder`
- `ioMousemove`: `mousemoveBinder`
- `ioLongMousedown`: `longMousedownBinder`
- `ioMousedown`: `longTouchBinder`
- `ioMouseup`: `ioMouseup`
- `ioMouseenter`: `mouseenterBinder`
- `ioMouseleave`: `ioMouseleave`
- `ioLongTouch`: `longTouchBinder`
- `ioMultiTouch`: `multiTouchBinder`
- `ioPan`: `panBinder`
- `ioSwipe`: `swipeBinder`
- `ioTap`: `tapBinder`
- `ioKeydown`: `keydownBinder`
- `ioKeyup`: `keyupBinder`
- `ioKeysdown`: `keysdownBinder`
- `ioKeyType`: `keyTypeBinder`
- `ioKeysType`: `keysTypeBinder`
- `ioButton`: `buttonBinder`
- `ioAnchor`: `aBinder`
- `ioSelect`: `selectBinder`
- `ioTextarea`: `textareaBinder`
- `ioTextinput`: `textinputBinder`
- `ioInput`: `inputBinder`



## Using `ngAfterViewInit`

You can define Interacto bindings without using Interacto directives. To do so your component needs to implements `AfterViewInit` to implement the Angular life-cycle method `ngAfterViewInit`: after the HTML view being initialized, you can handle its widgets to define Interacto bindings.

Second, you have to [inject a `Bindings` instance in your component constructor](./angular-integration/#using-interacto-in-angular-components).

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

## Showing the undo/redo history

In the documentation we illustrate the undo/redo features using two buttons `undo` and `redo`.
For Angular, we also provide Angular components for displaying in a more sophisticated way the undo/redo history.
This component is called `io-linear-history`, and you can use it like in the following example:

```html
<as-split direction="horizontal">
  <as-split-area #h [size]="20">
    <io-linear-history></io-linear-history>
  </as-split-area>

  <as-split-area [size]="80">
    <textarea [ioTextarea]="writeTextBinder" rows="16" cols="100" value="{{dataService.txt}}"></textarea>
    <br/>
    <button [ioButton]="clearClicksBinder" class="clearTextButton">Clear text</button>
  </as-split-area>
</as-split>
```


