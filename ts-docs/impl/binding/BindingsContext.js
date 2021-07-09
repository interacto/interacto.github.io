export class BindingsContext {
    constructor() {
        this.binds = [];
        this.disposables = [];
        this.cmds = [];
    }
    observeBinding(binding) {
        this.binds.push(binding);
        this.disposables.push(binding.produces.subscribe(cmd => this.cmds.push([cmd, binding])));
    }
    clearObservedBindings() {
        this.disposables.forEach(d => {
            d.unsubscribe();
        });
        this.binds.forEach(b => {
            b.uninstallBinding();
        });
    }
    get bindings() {
        return this.binds;
    }
    get commands() {
        return this.cmds.map(tuple => tuple[0]);
    }
    getCmd(index) {
        return this.cmds[index][0];
    }
    getCmdsProducedBy(binding) {
        return this.cmds
            .filter(c => c[1] === binding)
            .map(c => c[0]);
    }
}
