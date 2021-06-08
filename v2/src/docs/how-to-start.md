---
title: "How to start"
---

## An example

```ts
ngAfterViewInit(): void {
    buttonBinder()
    .on(this.clearButton.nativeElement)
    .toProduce(() => new ClearText(this.text))
    .bind();
}
```

```java
    // This is only to demonstrate the collapsing feature, no code here.
```


The binding operates on `clearButton` to produce a command `ClearText`. Bindings are defined in `ngAfterViewInit` of the component.
The binding manages the (un-)registration with the button, the creation of the command on each button click, and the move of the executed commands in a commands registry for undo/redo purposes.

A binder follows the builder pattern: it configures the binding to define how to turn the selected user interaction into commands.
The terminal routine bind() builds the binding.

```ts
.toProduce(() => new ClearText(this.text))
```

Note that the `toProduce` routine must produce a command (ie, an instance of `CommandBase`).
See the code of `ClearText` on the right. See also the `AnonCmd` command introduced in this documentation if you do not want to define a class command.

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
export class ClearText extends CommandBase implements Undoable {
    private memento: string;
    
    public constructor(private text: TextData) { super(); }
    
    protected createMemento(): void {
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
    
    public getUndoName(): string {
    return 'Clear text';
    }
}
```

`ClearText` is an undoable command. The memento preserves the former content of text data. The binding and commands registry automatically call the methods of this command. You can place your commands wherever you want. We suggest grouping them into a command folder.
