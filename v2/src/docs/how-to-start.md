---
title: "Getting started"
index: 2
---

## Main concepts

Interacto aims to make the job of UI developers easier by defining a novel input event processing model, namely the **user interaction processing model**.
Instead of combining low-level UI events, with Interacto you directly manipulate **user interactions** such as a Drag-and-Drop, a double click, a drag-lock, a multi-touch interaction, without worrying about how to implement them.
This lets developers focused on what does really matter: **how user interactions are turned into user actions (we call commands).**

But how do we link together a user interaction and a command to execute?
Using Interacto's **bindings**.

The next examples briefly illustrate Interacto and its *bindings* [using Angular/TypeScript code](./angular-integration).






### Bindings and binders

An Interacto **binding** is an object that turns the executions of one user interaction into (undoable) command instances. It allows you to link together an interaction, like pressing a button, to a command, like displaying a message in the console.

An Interacto **binder** is an object that configures one specific Interacto binding, following the builder pattern (it is a fluent API).
The role of binders is simply to help you instantiate new bindings easily, just like this:

```ts
this.bindings.buttonBinder()
    .toProduceAnon(() => console.log('Hello world'))
    .on(this.myButton)
    .bind();
```

This binder will build an Interacto binding that executes a command when the corresponding button is clicked.
As we can see here, this command will simply display "Hello world" in the console.
Note that this command is anonymous (it is not a class but an arrow/anonymous function).



### Interactions
Interacto supports a wide range of user interactions, whether they involve keyboard, mouse or touchscreen events.
Choosing what interaction you want to use is the first step of writing a new binder.

```ts
this.bindings.swipeBinder(true, 300, 500, 1, 50)
    .toProduce(() => new DeleteAll(this.canvas.nativeElement))
    .on(this.canvas)
    .when(i => i.touches[0].src.target === this.canvas.nativeElement)
    .bind();
```

This new example involves a swipe interaction (that has several parameters). When the user swipes (following the swipe parameters), the binding produces and executes a `DeleteAll` command at the end of the swipe. The swipe operates on the `canvas` object.

You can take a look at the different types of interactions Interacto offers [here](./interactions).



### Commands

When users perform a given interaction, they expect to be able to perform actions on your app, like displaying a page or deleting a to-do list item. 
With Interacto, developers encapsulate those actions inside **UI command classes**. 
This has two main benefits:
- It separates the command logic from the UI setup and description code,
making code clearer, more easily reusable and more testable.
- It gives support of undo/redo features to allow developers to make their commands undoable.

Here is how we can turn our previous Hello World example into a proper Interacto app.
Instead of producing an anonymous command, we created our own command class and instantiate it within the `toProduce` routine. 
Of course there is not much point to this exercise given the simplicity of the command to execute here, but commands quickly become one of the main building blocks of your application as its complexity increases.

```ts
buttonBinder()
    .toProduce(i => new DisplayInConsole('Hello world'))
    .on(this.myButton)
    .bind();
```

```ts
class DisplayInConsole extends CommandBase {
    public constructor(private text: string) {
    }

    // The execution() method is part of the Command interface defined by Interacto.
    // It contains the code to execute when the command is executed.
    protected execution(): void {
        console.log(text);
    }
}
```

You can learn more about commands [here](./commands).


### Routines

To create the exact binding that you need, binders are written using a set of configurable **routines**.
Here are the essential ones, that must be used in every binder:
- The first routine of a binder, like `buttonBinder`, specifies the user interaction to use.
- The `on` routine allows you to specify on which element (eg, button, text field) the interaction must operate.
- The `toProduce` or `toProduceAnon` routines specify the command to instantiate and execute and its arguments.
- Finally, the binder is concluded by the `bind` routine that builds the binding.

Depending on the effect you want to achieve, you might need to use supplementary routines.
You can learn more about these [here](./routines).


## A more complete example

Now that we have reviewed the base concepts of Interacto, let us take a loot at a slightly more complex example.
In this example, we want to build an Angular application with a text field that we can clear by clicking on a button.
Those edits should be undoable, so we will have to use Interacto's undo/redo features.

First, make sure to have Interacto properly [installed](./installation) in your project.
Then let us add some basic HTML elements (a text field and a button), and set up a binding that will clear the text field when the button is pressed. 
We will also create a service to store the current state of the text inside the field.

```html
<!--app.component.html-->
<textarea #writeTextBinder rows="4" cols="50" value="{{dataService.txt}}"></textarea>
<button #clearClicksBinder>Clear text</button>
```

```ts
//data.service.ts
@Injectable({
providedIn: 'root'
})
export class DataService {
    txt: string;

    public constructor() {
        this.txt = 'foo';
    }
}
```

Binders are provided by a `Bindings` object that we can obtain through dependency injection, thanks to the Interacto-angular library.
Note that for Angular [there is another way of defining bindings, more in the philosophy of Angular](./angular-integration#using-interacto-angular-directives) (we use here the other way as we find it simpler to understand Interacto's concepts).

```ts
//app.component.ts
export class AppComponent implements AfterViewInit {
    @ViewChild('clearButton')
    public clearButton: HTMLButtonElement;
    
    public constructor(public dataService: DataService, private bindings: Bindings) {
        // With Interacto-angular you can inject in components a Bindings single-instance that allows you
        // to define binders and bindings in ngAfterViewInit.
    }
    
    public ngAfterViewInit(): void {
        this.bindings.buttonBinder()
            .on(this.clearButton)
            .toProduce(() => new ClearText(this.text))
            .bind();
    }
}
```



As you can see here, you can define bindings in the `ngAfterViewInit` method of the component. 
This is because Interacto needs references to DOM elements to register our binding with the buttons and widgets that the user interacts with.
References to DOM elements are created in various ways depending on which library you are working with, but here is how we can reference our button in Angular:

```ts
export class MyComponent implements AfterViewInit {
    @ViewChild('clearbutton')
    private clearButton: ElementRef;
    ...
}
```

`clearButton` is a property of the component class.
This property refers to an HTML tag defined in the HTML document of the Angular component. The angular id of this tag is `#clearButton`.

```html
<button #clearButton>Clear</button>
```

```ts
this.bindings.buttonBinder()
    .on(this.clearButton)
    .toProduce(() => new ClearText(this.text))
    .bind();
```

This binding operates on the `clearButton` element to produce a `ClearText` command instance when the button is pressed (we will see how to write that command later).
It manages the registration and un-registration of the button, the creation of the command on each button click, and takes care of adding the command to a special undo/redo registry once it has been executed.
Thanks to this, our application automatically keeps a trace of the user's actions and we'll be able to easily add undo/redo features later on.

Ok, it is now time to write our `ClearText` command class. 
We usually place command classes inside a folder named "commands" to keep everything tidy, but you can use whatever system works for you.

```ts
// commands/ClearText.ts
export class ClearText extends UndoableCommand {
    private memento: string;
    
    public constructor(private text: TextData) { }
    
    protected override createMemento(): void {
        this.memento = this.text.text;
    }
    
    protected execution(): void {
        this.text.text = '';
    }
    
    public undo(): void {
        this.text.text = this.memento;
    }
    
    public redo(): void {
        this.execution();
    }
    
    public override getUndoName(): string {
        return 'Clear text';
    }
}
```

`ClearText` should be an undoable command. To signal this to Interacto, our class must inherit from `UndoableCommand`,
which itself is derived from the `CommandBase` class that we used earlier but also implements Interacto's `Undoable` interface.
If a command does not implement the `Undoable` interface, it will not be added to the undo/redo registry and will not be undoable.

There are a few methods you need to implement to make an undoable command work:
- `execution()` is universal to all commands and specifies the action that should be executed by the command. Here, we set the text from our DataService service to an empty string to empty the text field.
- `createMemento()` indicates to the binding how to take a "snapshot" of our application's state (create a memento) before executing the command, to be able to restore it if the user asks to undo the command.
Here, we only need to save the initial text content of the text field inside our `memento` property, since the command does not affect anything else.
- `undo()` specifies what the application should do when the user asks to undo the command. 
In our example, we use the `memento` property that still contains our old text to restore the DataService's text property to its previous value.
- `redo()` specifies what the application should do when the user asks to redo the command. A redo operation is
simply executing a command again after undoing it, so we can just reuse our `execution()` method.

You should not have to call any of these methods directly. The binding will take care of executing the command, undoing and redoing it when appropriate.

But how do we actually give the user a way to trigger those undo and redo operations?
We add two new buttons, and add to them the `ioUndo` and `ioRedo` Angular directives, and that's all.


```html
<button ioUndo>Undo</button>
<button ioRedo>Redo</button>
```

Want to see the full code? Our [examples](./irl-examples) page has Angular, Vue.js and React versions of this application, with many more features demonstrated.
