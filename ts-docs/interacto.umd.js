(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Interacto = {}));
}(this, (function (exports) { 'use strict';

    function isEltRef(o) {
        return o.nativeElement instanceof EventTarget;
    }

    class Bindings {
    }

    (function (CmdStatus) {
        CmdStatus[CmdStatus["created"] = 0] = "created";
        CmdStatus[CmdStatus["executed"] = 1] = "executed";
        CmdStatus[CmdStatus["cancelled"] = 2] = "cancelled";
        CmdStatus[CmdStatus["done"] = 3] = "done";
        CmdStatus[CmdStatus["flushed"] = 4] = "flushed";
    })(exports.CmdStatus || (exports.CmdStatus = {}));

    const eventTypes = [
        "mousedown",
        "mouseup",
        "mousemove",
        "mouseover",
        "mouseout",
        "mouseenter",
        "mouseleave",
        "mousemove",
        "keydown",
        "keyup",
        "click",
        "auxclick",
        "input",
        "scroll",
        "change",
        "touchstart",
        "touchend",
        "touchmove"
    ];

    function isOutputStateType(obj) {
        return obj.exit !== undefined && obj.addTransition !== undefined &&
            obj.process !== undefined && obj.transitions !== undefined;
    }

    (function (LogLevel) {
        LogLevel[LogLevel["interaction"] = 0] = "interaction";
        LogLevel[LogLevel["binding"] = 1] = "binding";
        LogLevel[LogLevel["command"] = 2] = "command";
        LogLevel[LogLevel["usage"] = 3] = "usage";
    })(exports.LogLevel || (exports.LogLevel = {}));

    class UndoHistory {
    }

    function isUndoableType(obj) {
        const undoable = obj;
        return undoable.undo !== undefined && undoable.redo !== undefined && undoable.getUndoName !== undefined;
    }

    class Binder {
        constructor(undoHistory, logger, observer, binder) {
            var _a, _b, _c, _d, _e;
            Object.assign(this, binder);
            this.undoHistory = undoHistory;
            this.logger = logger;
            (_a = this.widgets) !== null && _a !== void 0 ? _a : (this.widgets = []);
            (_b = this.dynamicNodes) !== null && _b !== void 0 ? _b : (this.dynamicNodes = []);
            (_c = this.logLevels) !== null && _c !== void 0 ? _c : (this.logLevels = []);
            (_d = this.stopPropagation) !== null && _d !== void 0 ? _d : (this.stopPropagation = false);
            (_e = this.prevDefault) !== null && _e !== void 0 ? _e : (this.prevDefault = false);
            this.observer = observer;
        }
        on(widget, ...widgets) {
            const ws = [...widgets].concat(widget).map(w => {
                if (isEltRef(w)) {
                    return w.nativeElement;
                }
                return w;
            });
            const w = this.widgets.length === 0 ? ws : [...this.widgets].concat(ws);
            const dup = this.duplicate();
            dup.widgets = w;
            return dup;
        }
        onDynamic(node) {
            const dup = this.duplicate();
            const nodeEvt = isEltRef(node) ? node.nativeElement : node;
            dup.dynamicNodes = [...this.dynamicNodes].concat(nodeEvt);
            return dup;
        }
        first(fn) {
            const dup = this.duplicate();
            dup.firstFn = fn;
            return dup;
        }
        when(fn) {
            const dup = this.duplicate();
            dup.whenFn = fn;
            return dup;
        }
        ifHadEffects(fn) {
            const dup = this.duplicate();
            dup.hadEffectsFn = fn;
            return dup;
        }
        ifHadNoEffect(fn) {
            const dup = this.duplicate();
            dup.hadNoEffectFn = fn;
            return dup;
        }
        ifCannotExecute(fn) {
            const dup = this.duplicate();
            dup.cannotExecFn = fn;
            return dup;
        }
        end(fn) {
            const dup = this.duplicate();
            dup.endFn = fn;
            return dup;
        }
        log(...level) {
            const dup = this.duplicate();
            dup.logLevels = [...level];
            return dup;
        }
        stopImmediatePropagation() {
            const dup = this.duplicate();
            dup.stopPropagation = true;
            return dup;
        }
        preventDefault() {
            const dup = this.duplicate();
            dup.prevDefault = true;
            return dup;
        }
        catch(fn) {
            const dup = this.duplicate();
            dup.onErrFn = fn;
            return dup;
        }
        name(name) {
            const dup = this.duplicate();
            dup.bindingName = name;
            return dup;
        }
        usingInteraction(fn) {
            const dup = this.duplicate();
            dup.usingFn = fn;
            return dup;
        }
        toProduce(fn) {
            const dup = this.duplicate();
            dup.produceFn = fn;
            return dup;
        }
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isFunction(x) {
        return typeof x === 'function';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var _enable_super_gross_mode_that_will_cause_bad_things = false;
    var config = {
        Promise: undefined,
        set useDeprecatedSynchronousErrorHandling(value) {
            if (value) {
                var error = /*@__PURE__*/ new Error();
                /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
            }
            _enable_super_gross_mode_that_will_cause_bad_things = value;
        },
        get useDeprecatedSynchronousErrorHandling() {
            return _enable_super_gross_mode_that_will_cause_bad_things;
        },
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function hostReportError(err) {
        setTimeout(function () { throw err; }, 0);
    }

    /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
    var empty = {
        closed: true,
        next: function (value) { },
        error: function (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError(err);
            }
        },
        complete: function () { }
    };

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var isArray = /*@__PURE__*/ (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function isObject(x) {
        return x !== null && typeof x === 'object';
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var UnsubscriptionErrorImpl = /*@__PURE__*/ (function () {
        function UnsubscriptionErrorImpl(errors) {
            Error.call(this);
            this.message = errors ?
                errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
            return this;
        }
        UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return UnsubscriptionErrorImpl;
    })();
    var UnsubscriptionError = UnsubscriptionErrorImpl;

    /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
    var Subscription = /*@__PURE__*/ (function () {
        function Subscription(unsubscribe) {
            this.closed = false;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (unsubscribe) {
                this._ctorUnsubscribe = true;
                this._unsubscribe = unsubscribe;
            }
        }
        Subscription.prototype.unsubscribe = function () {
            var errors;
            if (this.closed) {
                return;
            }
            var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
            this.closed = true;
            this._parentOrParents = null;
            this._subscriptions = null;
            if (_parentOrParents instanceof Subscription) {
                _parentOrParents.remove(this);
            }
            else if (_parentOrParents !== null) {
                for (var index = 0; index < _parentOrParents.length; ++index) {
                    var parent_1 = _parentOrParents[index];
                    parent_1.remove(this);
                }
            }
            if (isFunction(_unsubscribe)) {
                if (_ctorUnsubscribe) {
                    this._unsubscribe = undefined;
                }
                try {
                    _unsubscribe.call(this);
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
                }
            }
            if (isArray(_subscriptions)) {
                var index = -1;
                var len = _subscriptions.length;
                while (++index < len) {
                    var sub = _subscriptions[index];
                    if (isObject(sub)) {
                        try {
                            sub.unsubscribe();
                        }
                        catch (e) {
                            errors = errors || [];
                            if (e instanceof UnsubscriptionError) {
                                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                            }
                            else {
                                errors.push(e);
                            }
                        }
                    }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        };
        Subscription.prototype.add = function (teardown) {
            var subscription = teardown;
            if (!teardown) {
                return Subscription.EMPTY;
            }
            switch (typeof teardown) {
                case 'function':
                    subscription = new Subscription(teardown);
                case 'object':
                    if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                        return subscription;
                    }
                    else if (this.closed) {
                        subscription.unsubscribe();
                        return subscription;
                    }
                    else if (!(subscription instanceof Subscription)) {
                        var tmp = subscription;
                        subscription = new Subscription();
                        subscription._subscriptions = [tmp];
                    }
                    break;
                default: {
                    throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
                }
            }
            var _parentOrParents = subscription._parentOrParents;
            if (_parentOrParents === null) {
                subscription._parentOrParents = this;
            }
            else if (_parentOrParents instanceof Subscription) {
                if (_parentOrParents === this) {
                    return subscription;
                }
                subscription._parentOrParents = [_parentOrParents, this];
            }
            else if (_parentOrParents.indexOf(this) === -1) {
                _parentOrParents.push(this);
            }
            else {
                return subscription;
            }
            var subscriptions = this._subscriptions;
            if (subscriptions === null) {
                this._subscriptions = [subscription];
            }
            else {
                subscriptions.push(subscription);
            }
            return subscription;
        };
        Subscription.prototype.remove = function (subscription) {
            var subscriptions = this._subscriptions;
            if (subscriptions) {
                var subscriptionIndex = subscriptions.indexOf(subscription);
                if (subscriptionIndex !== -1) {
                    subscriptions.splice(subscriptionIndex, 1);
                }
            }
        };
        Subscription.EMPTY = (function (empty) {
            empty.closed = true;
            return empty;
        }(new Subscription()));
        return Subscription;
    }());
    function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var rxSubscriber = /*@__PURE__*/ (function () {
        return typeof Symbol === 'function'
            ? /*@__PURE__*/ Symbol('rxSubscriber')
            : '@@rxSubscriber_' + /*@__PURE__*/ Math.random();
    })();

    /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
    var Subscriber = /*@__PURE__*/ (function (_super) {
        __extends(Subscriber, _super);
        function Subscriber(destinationOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this.syncErrorValue = null;
            _this.syncErrorThrown = false;
            _this.syncErrorThrowable = false;
            _this.isStopped = false;
            switch (arguments.length) {
                case 0:
                    _this.destination = empty;
                    break;
                case 1:
                    if (!destinationOrNext) {
                        _this.destination = empty;
                        break;
                    }
                    if (typeof destinationOrNext === 'object') {
                        if (destinationOrNext instanceof Subscriber) {
                            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                            _this.destination = destinationOrNext;
                            destinationOrNext.add(_this);
                        }
                        else {
                            _this.syncErrorThrowable = true;
                            _this.destination = new SafeSubscriber(_this, destinationOrNext);
                        }
                        break;
                    }
                default:
                    _this.syncErrorThrowable = true;
                    _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                    break;
            }
            return _this;
        }
        Subscriber.prototype[rxSubscriber] = function () { return this; };
        Subscriber.create = function (next, error, complete) {
            var subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = false;
            return subscriber;
        };
        Subscriber.prototype.next = function (value) {
            if (!this.isStopped) {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (!this.isStopped) {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            this.destination.error(err);
            this.unsubscribe();
        };
        Subscriber.prototype._complete = function () {
            this.destination.complete();
            this.unsubscribe();
        };
        Subscriber.prototype._unsubscribeAndRecycle = function () {
            var _parentOrParents = this._parentOrParents;
            this._parentOrParents = null;
            this.unsubscribe();
            this.closed = false;
            this.isStopped = false;
            this._parentOrParents = _parentOrParents;
            return this;
        };
        return Subscriber;
    }(Subscription));
    var SafeSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this._parentSubscriber = _parentSubscriber;
            var next;
            var context = _this;
            if (isFunction(observerOrNext)) {
                next = observerOrNext;
            }
            else if (observerOrNext) {
                next = observerOrNext.next;
                error = observerOrNext.error;
                complete = observerOrNext.complete;
                if (observerOrNext !== empty) {
                    context = Object.create(observerOrNext);
                    if (isFunction(context.unsubscribe)) {
                        _this.add(context.unsubscribe.bind(context));
                    }
                    context.unsubscribe = _this.unsubscribe.bind(_this);
                }
            }
            _this._context = context;
            _this._next = next;
            _this._error = error;
            _this._complete = complete;
            return _this;
        }
        SafeSubscriber.prototype.next = function (value) {
            if (!this.isStopped && this._next) {
                var _parentSubscriber = this._parentSubscriber;
                if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._next, value);
                }
                else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.error = function (err) {
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
                if (this._error) {
                    if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(this._error, err);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, this._error, err);
                        this.unsubscribe();
                    }
                }
                else if (!_parentSubscriber.syncErrorThrowable) {
                    this.unsubscribe();
                    if (useDeprecatedSynchronousErrorHandling) {
                        throw err;
                    }
                    hostReportError(err);
                }
                else {
                    if (useDeprecatedSynchronousErrorHandling) {
                        _parentSubscriber.syncErrorValue = err;
                        _parentSubscriber.syncErrorThrown = true;
                    }
                    else {
                        hostReportError(err);
                    }
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.complete = function () {
            var _this = this;
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                if (this._complete) {
                    var wrappedComplete = function () { return _this._complete.call(_this._context); };
                    if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(wrappedComplete);
                        this.unsubscribe();
                    }
                    else {
                        this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                        this.unsubscribe();
                    }
                }
                else {
                    this.unsubscribe();
                }
            }
        };
        SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                this.unsubscribe();
                if (config.useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                else {
                    hostReportError(err);
                }
            }
        };
        SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
            if (!config.useDeprecatedSynchronousErrorHandling) {
                throw new Error('bad call');
            }
            try {
                fn.call(this._context, value);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    parent.syncErrorValue = err;
                    parent.syncErrorThrown = true;
                    return true;
                }
                else {
                    hostReportError(err);
                    return true;
                }
            }
            return false;
        };
        SafeSubscriber.prototype._unsubscribe = function () {
            var _parentSubscriber = this._parentSubscriber;
            this._context = null;
            this._parentSubscriber = null;
            _parentSubscriber.unsubscribe();
        };
        return SafeSubscriber;
    }(Subscriber));

    /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
    function canReportError(observer) {
        while (observer) {
            var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
            if (closed_1 || isStopped) {
                return false;
            }
            else if (destination && destination instanceof Subscriber) {
                observer = destination;
            }
            else {
                observer = null;
            }
        }
        return true;
    }

    /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxSubscriber]) {
                return nextOrObserver[rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new Subscriber(empty);
        }
        return new Subscriber(nextOrObserver, error, complete);
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var observable = /*@__PURE__*/ (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    function identity(x) {
        return x;
    }

    /** PURE_IMPORTS_START _identity PURE_IMPORTS_END */
    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
    var Observable = /*@__PURE__*/ (function () {
        function Observable(subscribe) {
            this._isScalar = false;
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var operator = this.operator;
            var sink = toSubscriber(observerOrNext, error, complete);
            if (operator) {
                sink.add(operator.call(sink, this.source));
            }
            else {
                sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                    this._subscribe(sink) :
                    this._trySubscribe(sink));
            }
            if (config.useDeprecatedSynchronousErrorHandling) {
                if (sink.syncErrorThrowable) {
                    sink.syncErrorThrowable = false;
                    if (sink.syncErrorThrown) {
                        throw sink.syncErrorValue;
                    }
                }
            }
            return sink;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    sink.syncErrorThrown = true;
                    sink.syncErrorValue = err;
                }
                if (canReportError(sink)) {
                    sink.error(err);
                }
                else {
                    console.warn(err);
                }
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscription;
                subscription = _this.subscribe(function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        if (subscription) {
                            subscription.unsubscribe();
                        }
                    }
                }, reject, resolve);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var source = this.source;
            return source && source.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            if (operations.length === 0) {
                return this;
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        if (!promiseCtor) {
            promiseCtor =  Promise;
        }
        if (!promiseCtor) {
            throw new Error('no Promise impl found');
        }
        return promiseCtor;
    }

    /** PURE_IMPORTS_START  PURE_IMPORTS_END */
    var ObjectUnsubscribedErrorImpl = /*@__PURE__*/ (function () {
        function ObjectUnsubscribedErrorImpl() {
            Error.call(this);
            this.message = 'object unsubscribed';
            this.name = 'ObjectUnsubscribedError';
            return this;
        }
        ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
        return ObjectUnsubscribedErrorImpl;
    })();
    var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

    /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
    var SubjectSubscription = /*@__PURE__*/ (function (_super) {
        __extends(SubjectSubscription, _super);
        function SubjectSubscription(subject, subscriber) {
            var _this = _super.call(this) || this;
            _this.subject = subject;
            _this.subscriber = subscriber;
            _this.closed = false;
            return _this;
        }
        SubjectSubscription.prototype.unsubscribe = function () {
            if (this.closed) {
                return;
            }
            this.closed = true;
            var subject = this.subject;
            var observers = subject.observers;
            this.subject = null;
            if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                return;
            }
            var subscriberIndex = observers.indexOf(this.subscriber);
            if (subscriberIndex !== -1) {
                observers.splice(subscriberIndex, 1);
            }
        };
        return SubjectSubscription;
    }(Subscription));

    /** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
    var SubjectSubscriber = /*@__PURE__*/ (function (_super) {
        __extends(SubjectSubscriber, _super);
        function SubjectSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            return _this;
        }
        return SubjectSubscriber;
    }(Subscriber));
    var Subject = /*@__PURE__*/ (function (_super) {
        __extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.observers = [];
            _this.closed = false;
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype[rxSubscriber] = function () {
            return new SubjectSubscriber(this);
        };
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype.next = function (value) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            if (!this.isStopped) {
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].next(value);
                }
            }
        };
        Subject.prototype.error = function (err) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.hasError = true;
            this.thrownError = err;
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].error(err);
            }
            this.observers.length = 0;
        };
        Subject.prototype.complete = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            this.isStopped = true;
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].complete();
            }
            this.observers.length = 0;
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = true;
            this.closed = true;
            this.observers = null;
        };
        Subject.prototype._trySubscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else {
                return _super.prototype._trySubscribe.call(this, subscriber);
            }
        };
        Subject.prototype._subscribe = function (subscriber) {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
            else if (this.hasError) {
                subscriber.error(this.thrownError);
                return Subscription.EMPTY;
            }
            else if (this.isStopped) {
                subscriber.complete();
                return Subscription.EMPTY;
            }
            else {
                this.observers.push(subscriber);
                return new SubjectSubscription(this, subscriber);
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = /*@__PURE__*/ (function (_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var destination = this.destination;
            if (destination && destination.next) {
                destination.next(value);
            }
        };
        AnonymousSubject.prototype.error = function (err) {
            var destination = this.destination;
            if (destination && destination.error) {
                this.destination.error(err);
            }
        };
        AnonymousSubject.prototype.complete = function () {
            var destination = this.destination;
            if (destination && destination.complete) {
                this.destination.complete();
            }
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var source = this.source;
            if (source) {
                return this.source.subscribe(subscriber);
            }
            else {
                return Subscription.EMPTY;
            }
        };
        return AnonymousSubject;
    }(Subject));

    class CancelFSMException extends Error {
        constructor() {
            super();
        }
    }

    class MustBeUndoableCmdError extends Error {
        constructor(cmdProducer) {
            super(`The following command must be undoable: ${String(cmdProducer)}`);
        }
    }

    class BindingImpl {
        constructor(continuousExecution, strict, interaction, cmdProducer, widgets, undoHistory, logger, name) {
            this._name = name;
            this.logBinding = false;
            this.logCmd = false;
            this.logUsage = false;
            this._timeCancelled = 0;
            this._timeEnded = 0;
            this.cmdsProduced = new Subject();
            this.cmdProducer = cmdProducer;
            this._interaction = interaction;
            this._cmd = undefined;
            this.continuousCmdExecution = continuousExecution;
            this.strictStart = strict;
            this._activated = true;
            this.undoHistory = undoHistory;
            this.logger = logger;
            this._interaction.fsm.addHandler(this);
            interaction.registerToNodes(widgets);
        }
        get name() {
            var _a;
            return (_a = this._name) !== null && _a !== void 0 ? _a : this._interaction.constructor.name;
        }
        when() {
            return true;
        }
        clearEvents() {
            this._interaction.fullReinit();
        }
        createCommand() {
            try {
                const cmd = this.cmdProducer(this.interaction.data);
                if (this._name === undefined) {
                    this._name = `${this._interaction.constructor.name}:${cmd.constructor.name}`;
                }
                return cmd;
            }
            catch (ex) {
                this.logger.logBindingErr("Error while creating a command", ex);
                return undefined;
            }
        }
        catch(_err) {
        }
        first() {
        }
        then() {
        }
        end() {
        }
        cancel() {
        }
        endOrCancel() {
        }
        ifCmdHadNoEffect() {
        }
        ifCmdHadEffects() {
        }
        ifCannotExecuteCmd() {
        }
        get interaction() {
            return this._interaction;
        }
        get command() {
            return this._cmd;
        }
        get activated() {
            return this._activated;
        }
        set activated(activated) {
            if (this.logBinding) {
                this.logger.logBindingMsg(`Binding Activated: ${String(activated)}`);
            }
            this._activated = activated;
            this._interaction.setActivated(activated);
            if (!this._activated && this._cmd !== undefined) {
                this._cmd.flush();
                this._cmd = undefined;
            }
        }
        get running() {
            return this._interaction.isRunning();
        }
        fsmCancels() {
            if (this._cmd !== undefined) {
                if (this.logBinding) {
                    this.logger.logBindingMsg("Binding cancelled");
                }
                this._cmd.cancel();
                if (this.logCmd) {
                    this.logger.logCmdMsg("Cancelling command", this._cmd.constructor.name);
                }
                if (this.continuousCmdExecution) {
                    this.cancelContinousWithEffectsCmd(this._cmd);
                }
                this._cmd = undefined;
                this.cancel();
                this.endOrCancel();
                this._timeCancelled++;
            }
            if (this.logUsage) {
                this.logger.logBindingEnd(this.name, true);
            }
        }
        cancelContinousWithEffectsCmd(c) {
            if (isUndoableType(c)) {
                c.undo();
                if (this.logCmd) {
                    this.logger.logCmdMsg("Command undone", c.constructor.name);
                }
            }
            else {
                throw new MustBeUndoableCmdError(c);
            }
        }
        fsmStarts() {
            if (!this._activated) {
                return;
            }
            const ok = this.when();
            if (this.logBinding) {
                this.logger.logBindingMsg(`Starting binding: ${String(ok)}`);
            }
            if (ok) {
                this._cmd = this.createCommand();
                if (this._cmd !== undefined) {
                    this.first();
                    if (this.logCmd) {
                        this.logger.logCmdMsg("Command created and init", this._cmd.constructor.name);
                    }
                }
            }
            else {
                if (this.strictStart) {
                    if (this.logBinding) {
                        this.logger.logBindingMsg(`Cancelling starting interaction: ${this._interaction.constructor.name}`);
                    }
                    throw new CancelFSMException();
                }
            }
            if (this.logUsage) {
                this.logger.logBindingStart(this.name);
            }
        }
        fsmUpdates() {
            if (!this._activated) {
                return;
            }
            if (this.logBinding) {
                this.logger.logBindingMsg("Binding updates");
            }
            const cmd = this.createAndInitCommand();
            if (cmd !== undefined) {
                if (this.logCmd) {
                    this.logger.logCmdMsg("Command update");
                }
                this.then();
                if (this.continuousCmdExecution) {
                    this.continuousExecutionOnFSMUpdate(cmd);
                }
            }
        }
        continuousExecutionOnFSMUpdate(cmd) {
            const ok = cmd.execute();
            if (this.logCmd) {
                this.logger.logCmdMsg(`Try to execute command (continuous execution), is cmd undefined? ${String(this._cmd === undefined)}`);
            }
            if (ok instanceof Promise) {
                ok.then(executed => {
                    if (!executed) {
                        this.ifCannotExecuteCmd();
                    }
                    if (this.logCmd) {
                        this.logger.logCmdMsg(`Continuous command execution had this result: ${String(executed)}`);
                    }
                }).catch((ex) => {
                    this.logger.logCmdErr("Error while executing the command continuously", ex);
                });
            }
            else {
                if (!ok) {
                    this.ifCannotExecuteCmd();
                }
                if (this.logCmd) {
                    this.logger.logCmdMsg(`Continuous command execution had this result: ${String(ok)}`);
                }
            }
        }
        fsmStops() {
            if (!this._activated) {
                return;
            }
            if (this.logBinding) {
                this.logger.logBindingMsg("Binding stops");
            }
            let cancelled = false;
            const cmd = this.createAndInitCommand();
            if (cmd === undefined) {
                if (this._cmd !== undefined) {
                    if (this.logCmd) {
                        this.logger.logCmdMsg("Cancelling the command");
                    }
                    this._cmd.cancel();
                    this._cmd = undefined;
                    this._timeCancelled++;
                    cancelled = true;
                }
            }
            else {
                this.executeCommandOnFSMStop(cmd);
            }
            if (this.logUsage) {
                this.logger.logBindingEnd(this.name, cancelled);
            }
        }
        executeCommandOnFSMStop(cmd) {
            if (!this.continuousCmdExecution) {
                this.then();
                if (this.logCmd) {
                    this.logger.logCmdMsg("Command updated");
                }
            }
            const result = cmd.execute();
            if (result instanceof Promise) {
                result.then(executed => {
                    this._cmd = cmd;
                    this.afterCmdExecuted(cmd, executed);
                    this._cmd = undefined;
                    this._timeEnded++;
                }).catch((ex) => {
                    this.logger.logCmdErr("Error while executing the command", ex);
                    this._cmd = undefined;
                    this._timeEnded++;
                });
            }
            else {
                this.afterCmdExecuted(cmd, result);
                this._cmd = undefined;
                this._timeEnded++;
            }
        }
        createAndInitCommand() {
            const ok = this.when();
            if (this.logBinding) {
                this.logger.logBindingMsg(`when predicate is ${String(ok)}`);
            }
            if (ok) {
                if (this._cmd === undefined) {
                    if (this.logCmd) {
                        this.logger.logCmdMsg("Command creation");
                    }
                    this._cmd = this.createCommand();
                    if (this._cmd !== undefined) {
                        this.first();
                    }
                }
                return this._cmd;
            }
            return undefined;
        }
        afterCmdExecuted(cmd, ok) {
            if (this.logCmd) {
                this.logger.logCmdMsg(`Command execution had this result: ${String(ok)}`);
            }
            if (ok) {
                this.end();
                this.endOrCancel();
            }
            else {
                this.ifCannotExecuteCmd();
            }
            if (cmd.getStatus() !== exports.CmdStatus.executed) {
                return;
            }
            cmd.done();
            this.cmdsProduced.next(cmd);
            const hadEffect = cmd.hadEffect();
            if (this.logCmd) {
                this.logger.logCmdMsg(`Command execution had effect: ${String(hadEffect)}`);
            }
            if (hadEffect) {
                if (isUndoableType(cmd)) {
                    this.undoHistory.add(cmd);
                }
                this.ifCmdHadEffects();
            }
            else {
                this.ifCmdHadNoEffect();
            }
        }
        uninstallBinding() {
            this.activated = false;
            this.cmdsProduced.complete();
            this.logBinding = false;
            this.logCmd = false;
            this.logUsage = false;
            this._interaction.uninstall();
        }
        get produces() {
            return this.cmdsProduced;
        }
        get timesEnded() {
            return this._timeEnded;
        }
        get timesCancelled() {
            return this._timeCancelled;
        }
    }

    class AnonBinding extends BindingImpl {
        constructor(continuousExec, interaction, undoHistory, logger, cmdSupplierFn, widgets, dynamicNodes, strict, loggers, timeoutThrottle, stopPropagation, prevDefault, firstFn, thenFn, whenFn, endFn, cancelFn, endOrCancelFn, hadEffectsFn, hadNoEffectFn, cannotExecFn, onErrFn, name) {
            super(continuousExec, strict, interaction, cmdSupplierFn, widgets, undoHistory, logger, name);
            this.configureLoggers(loggers);
            this.firstFn = firstFn;
            this.thenFn = thenFn;
            this.cancelFn = cancelFn;
            this.endOrCancelFn = endOrCancelFn;
            this.whenFn = whenFn;
            this.onEndFn = endFn;
            this.hadEffectsFn = hadEffectsFn;
            this.hadNoEffectFn = hadNoEffectFn;
            this.cannotExecFn = cannotExecFn;
            this.onErrFn = onErrFn;
            this.interaction.stopImmediatePropagation = stopPropagation;
            this.interaction.preventDefault = prevDefault;
            this.interaction.setThrottleTimeout(timeoutThrottle);
            dynamicNodes.forEach(node => {
                interaction.registerToNodeChildren(node);
            });
        }
        configureLoggers(loggers) {
            if (loggers.length !== 0) {
                this.logCmd = loggers.includes(exports.LogLevel.command.valueOf());
                this.logBinding = loggers.includes(exports.LogLevel.binding.valueOf());
                this.logUsage = loggers.includes(exports.LogLevel.usage.valueOf());
                this.interaction.log(loggers.includes(exports.LogLevel.interaction.valueOf()));
            }
        }
        first() {
            const cmd = this.command;
            if (this.firstFn !== undefined && cmd !== undefined) {
                try {
                    this.firstFn(cmd, this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'first'", ex);
                }
            }
        }
        then() {
            const cmd = this.command;
            if (this.thenFn !== undefined && cmd !== undefined) {
                try {
                    this.thenFn(cmd, this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'then'", ex);
                }
            }
        }
        end() {
            const cmd = this.command;
            if (this.onEndFn !== undefined && cmd !== undefined) {
                try {
                    this.onEndFn(cmd, this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'end'", ex);
                }
            }
        }
        cancel() {
            if (this.cancelFn !== undefined) {
                try {
                    this.cancelFn(this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'cancel'", ex);
                }
            }
        }
        endOrCancel() {
            if (this.endOrCancelFn !== undefined) {
                try {
                    this.endOrCancelFn(this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'endOrCancel'", ex);
                }
            }
        }
        ifCmdHadNoEffect() {
            const cmd = this.command;
            if (this.hadNoEffectFn !== undefined && cmd !== undefined) {
                try {
                    this.hadNoEffectFn(cmd, this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'ifHadNoEffect'", ex);
                }
            }
        }
        ifCmdHadEffects() {
            const cmd = this.command;
            if (this.hadEffectsFn !== undefined && cmd !== undefined) {
                try {
                    this.hadEffectsFn(cmd, this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'ifHadEffects'", ex);
                }
            }
        }
        ifCannotExecuteCmd() {
            const cmd = this.command;
            if (this.cannotExecFn !== undefined && cmd !== undefined) {
                try {
                    this.cannotExecFn(cmd, this.interaction.data);
                }
                catch (ex) {
                    this.catch(ex);
                    this.logger.logBindingErr("Crash in 'ifCannotExecute'", ex);
                }
            }
        }
        when() {
            let ok;
            try {
                ok = this.whenFn === undefined || this.whenFn(this.interaction.data);
            }
            catch (ex) {
                ok = false;
                this.catch(ex);
                this.logger.logBindingErr("Crash in 'when'", ex);
            }
            if (this.logBinding) {
                this.logger.logBindingMsg(`Checking condition: ${String(ok)}`);
            }
            return ok;
        }
        catch(err) {
            if (this.onErrFn !== undefined) {
                try {
                    this.onErrFn(err);
                }
                catch (ex) {
                    this.logger.logBindingErr("Crash in 'catch'", ex);
                }
            }
        }
    }

    class KeysDataImpl {
        constructor() {
            this.keysData = [];
        }
        flush() {
            this.keysData.length = 0;
        }
        get keys() {
            return this.keysData;
        }
        addKey(key) {
            this.keysData.push(key);
        }
    }

    class InteractionDataBase {
        constructor() {
            this.currentTargetData = null;
            this.targetData = null;
            this.timeStampData = 0;
        }
        copy(data) {
            this.currentTargetData = data.currentTarget;
            this.targetData = data.target;
            this.timeStampData = data.timeStamp;
        }
        flush() {
            this.currentTargetData = null;
            this.targetData = null;
            this.timeStampData = 0;
        }
        get currentTarget() {
            return this.currentTargetData;
        }
        get target() {
            return this.targetData;
        }
        get timeStamp() {
            return this.timeStampData;
        }
    }

    class KeyDataImpl extends InteractionDataBase {
        constructor() {
            super(...arguments);
            this.codeData = "";
            this.keyData = "";
            this.locationData = 0;
            this.repeatData = false;
            this.altKeyData = false;
            this.ctrlKeyData = false;
            this.metaKeyData = false;
            this.shiftKeyData = false;
        }
        flush() {
            super.flush();
            this.codeData = "";
            this.keyData = "";
            this.locationData = 0;
            this.repeatData = false;
            this.altKeyData = false;
            this.ctrlKeyData = false;
            this.metaKeyData = false;
            this.shiftKeyData = false;
        }
        copy(data) {
            super.copy(data);
            this.codeData = data.code;
            this.keyData = data.key;
            this.locationData = data.location;
            this.repeatData = data.repeat;
            this.altKeyData = data.altKey;
            this.ctrlKeyData = data.ctrlKey;
            this.metaKeyData = data.metaKey;
            this.shiftKeyData = data.shiftKey;
        }
        get altKey() {
            return this.altKeyData;
        }
        get code() {
            return this.codeData;
        }
        get ctrlKey() {
            return this.ctrlKeyData;
        }
        get key() {
            return this.keyData;
        }
        get location() {
            return this.locationData;
        }
        get metaKey() {
            return this.metaKeyData;
        }
        get repeat() {
            return this.repeatData;
        }
        get shiftKey() {
            return this.shiftKeyData;
        }
    }

    class UpdateBinder extends Binder {
        constructor(undoHistory, logger, observer, binder) {
            var _a, _b, _c;
            super(undoHistory, logger, observer, binder);
            Object.assign(this, binder);
            (_a = this.continuousCmdExecution) !== null && _a !== void 0 ? _a : (this.continuousCmdExecution = false);
            (_b = this._strictStart) !== null && _b !== void 0 ? _b : (this._strictStart = false);
            (_c = this.throttleTimeout) !== null && _c !== void 0 ? _c : (this.throttleTimeout = 0);
        }
        then(fn) {
            const dup = this.duplicate();
            dup.thenFn = fn;
            return dup;
        }
        continuousExecution() {
            const dup = this.duplicate();
            dup.continuousCmdExecution = true;
            return dup;
        }
        cancel(fn) {
            const dup = this.duplicate();
            dup.cancelFn = fn;
            return dup;
        }
        endOrCancel(fn) {
            const dup = this.duplicate();
            dup.endOrCancelFn = fn;
            return dup;
        }
        strictStart() {
            const dup = this.duplicate();
            dup._strictStart = true;
            return dup;
        }
        throttle(timeout) {
            const dup = this.duplicate();
            dup.throttleTimeout = timeout;
            return dup;
        }
        on(widget, ...widgets) {
            return super.on(widget, ...widgets);
        }
        onDynamic(node) {
            return super.onDynamic(node);
        }
        first(fn) {
            return super.first(fn);
        }
        when(fn) {
            return super.when(fn);
        }
        ifHadEffects(fn) {
            return super.ifHadEffects(fn);
        }
        ifHadNoEffect(fn) {
            return super.ifHadNoEffect(fn);
        }
        ifCannotExecute(fn) {
            return super.ifCannotExecute(fn);
        }
        end(fn) {
            return super.end(fn);
        }
        log(...level) {
            return super.log(...level);
        }
        stopImmediatePropagation() {
            return super.stopImmediatePropagation();
        }
        preventDefault() {
            return super.preventDefault();
        }
        catch(fn) {
            return super.catch(fn);
        }
        name(name) {
            return super.name(name);
        }
        usingInteraction(fn) {
            return super.usingInteraction(fn);
        }
        toProduce(fn) {
            return super.toProduce(fn);
        }
        duplicate() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer, this);
        }
        bind() {
            var _a;
            if (this.usingFn === undefined) {
                throw new Error("The interaction supplier cannot be undefined here");
            }
            if (this.produceFn === undefined) {
                throw new Error("The command supplier cannot be undefined here");
            }
            const binding = new AnonBinding(this.continuousCmdExecution, this.usingFn(), this.undoHistory, this.logger, this.produceFn, [...this.widgets], [...this.dynamicNodes], this._strictStart, [...this.logLevels], this.throttleTimeout, this.stopPropagation, this.prevDefault, this.firstFn, this.thenFn, this.whenFn, this.endFn, this.cancelFn, this.endOrCancelFn, this.hadEffectsFn, this.hadNoEffectFn, this.cannotExecFn, this.onErrFn, this.bindingName);
            (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observeBinding(binding);
            return binding;
        }
    }

    class KeysBinder extends UpdateBinder {
        constructor(undoHistory, logger, observer, binder) {
            super(undoHistory, logger, observer, binder);
            Object.assign(this, binder);
            this.codes = this.codes === undefined ? [] : [...this.codes];
            this.checkCodeFn = (i) => {
                let currentCodes = [];
                if (i instanceof KeysDataImpl) {
                    currentCodes = i.keys.map(k => k.code);
                }
                else {
                    if (i instanceof KeyDataImpl) {
                        currentCodes = [i.code];
                    }
                }
                return (this.codes.length === 0 || this.codes.length === currentCodes.length &&
                    currentCodes.every((v) => this.codes.includes(v))) &&
                    (this.whenFn === undefined || this.whenFn(i));
            };
        }
        with(...keyCodes) {
            const dup = this.duplicate();
            dup.codes = [...keyCodes];
            return dup;
        }
        on(widget, ...widgets) {
            return super.on(widget, ...widgets);
        }
        onDynamic(node) {
            return super.onDynamic(node);
        }
        first(fn) {
            return super.first(fn);
        }
        when(fn) {
            return super.when(fn);
        }
        ifHadEffects(fn) {
            return super.ifHadEffects(fn);
        }
        ifHadNoEffect(fn) {
            return super.ifHadNoEffect(fn);
        }
        ifCannotExecute(fn) {
            return super.ifCannotExecute(fn);
        }
        end(fn) {
            return super.end(fn);
        }
        log(...level) {
            return super.log(...level);
        }
        stopImmediatePropagation() {
            return super.stopImmediatePropagation();
        }
        preventDefault() {
            return super.preventDefault();
        }
        then(fn) {
            return super.then(fn);
        }
        continuousExecution() {
            return super.continuousExecution();
        }
        strictStart() {
            return super.strictStart();
        }
        throttle(timeout) {
            return super.throttle(timeout);
        }
        cancel(fn) {
            return super.cancel(fn);
        }
        endOrCancel(fn) {
            return super.endOrCancel(fn);
        }
        catch(fn) {
            return super.catch(fn);
        }
        name(name) {
            return super.name(name);
        }
        toProduce(fn) {
            return super.toProduce(fn);
        }
        usingInteraction(fn) {
            return super.usingInteraction(fn);
        }
        duplicate() {
            return new KeysBinder(this.undoHistory, this.logger, this.observer, this);
        }
        bind() {
            var _a;
            if (this.usingFn === undefined) {
                throw new Error("The interaction supplier cannot be undefined here");
            }
            if (this.produceFn === undefined) {
                throw new Error("The command supplier cannot be undefined here");
            }
            const binding = new AnonBinding(this.continuousCmdExecution, this.usingFn(), this.undoHistory, this.logger, this.produceFn, [...this.widgets], [...this.dynamicNodes], this._strictStart, [...this.logLevels], this.throttleTimeout, this.stopPropagation, this.prevDefault, this.firstFn, this.thenFn, this.checkCodeFn, this.endFn, this.cancelFn, this.endOrCancelFn, this.hadEffectsFn, this.hadNoEffectFn, this.cannotExecFn, this.onErrFn, this.bindingName);
            (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observeBinding(binding);
            return binding;
        }
    }

    class BindingsContext {
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

    function isEventType(evtType) {
        return eventTypes.includes(evtType);
    }
    function getTouch(touches, idToFind) {
        for (let i = 0; i < touches.length; i++) {
            if (touches[i].identifier === idToFind) {
                return touches[i];
            }
        }
        return undefined;
    }
    function isTouchEvent(eventType) {
        return eventType === "touchstart" || eventType === "touchend" || eventType === "touchmove";
    }
    function isMouseEvent(eventType) {
        return eventType === "mousedown" || eventType === "mouseup" || eventType === "mousemove" ||
            eventType === "mouseover" || eventType === "click" || eventType === "auxclick" || eventType === "mouseout" ||
            eventType === "mouseenter" || eventType === "mouseleave";
    }
    function isKeyEvent(eventType) {
        return eventType === "keydown" || eventType === "keyup";
    }
    function isButton(target) {
        return target instanceof HTMLButtonElement;
    }
    function isCheckBox(target) {
        return target instanceof HTMLInputElement && target.getAttribute("type") === "checkbox";
    }
    function isColorChoice(target) {
        return target instanceof HTMLInputElement && target.getAttribute("type") === "color";
    }
    function isComboBox(target) {
        return target instanceof HTMLSelectElement;
    }
    function isDatePicker(target) {
        return target instanceof HTMLInputElement && target.getAttribute("type") === "date";
    }
    function isSpinner(target) {
        return target instanceof HTMLInputElement && target.getAttribute("type") === "number";
    }
    function isHyperLink(target) {
        return target instanceof HTMLAnchorElement;
    }
    function isTextInput(target) {
        return (target instanceof HTMLInputElement && target.getAttribute("type") === "text") ||
            target instanceof HTMLTextAreaElement;
    }
    function isKeyDownEvent(event) {
        return event instanceof KeyboardEvent && isEventType(event.type) && event.type === "keydown";
    }
    function isKeyUpEvent(event) {
        return event instanceof KeyboardEvent && isEventType(event.type) && event.type === "keyup";
    }
    function isMouseDownEvent(event) {
        return event instanceof MouseEvent && isEventType(event.type) && event.type === "mousedown";
    }
    function isScrollEvent(event) {
        return event instanceof UIEvent && isEventType(event.type) && event.type === "scroll";
    }
    (function (KeyCode) {
        KeyCode[KeyCode["escape"] = 27] = "escape";
    })(exports.KeyCode || (exports.KeyCode = {}));

    class TransitionBase {
        constructor(srcState, tgtState) {
            this.src = srcState;
            this.tgt = tgtState;
            this.src.addTransition(this);
        }
        execute(event) {
            if (this.accept(event) && this.isGuardOK(event)) {
                this.src.fsm.stopCurrentTimeout();
                this.action(event);
                this.src.exit();
                this.tgt.enter();
                return this.tgt;
            }
            return undefined;
        }
        action(_event) {
        }
        isGuardOK(_event) {
            return true;
        }
        get target() {
            return this.tgt;
        }
        uninstall() {
        }
    }

    class ButtonPressedTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(e) {
            return e.target !== null && isButton(e.target);
        }
        getAcceptedEvents() {
            return ["click", "auxclick"];
        }
    }

    class StateBase {
        constructor(stateMachine, stateName) {
            this.fsm = stateMachine;
            this.name = stateName;
        }
        checkStartingState() {
            if (!this.fsm.started && this.fsm.startingState === this) {
                this.fsm.onStarting();
            }
        }
        uninstall() {
        }
    }

    class TerminalState extends StateBase {
        constructor(stateMachine, stateName) {
            super(stateMachine, stateName);
        }
        enter() {
            this.checkStartingState();
            this.fsm.onTerminating();
        }
    }

    class OutputStateBase extends StateBase {
        constructor(stateMachine, stateName) {
            super(stateMachine, stateName);
            this._transitions = [];
        }
        process(event) {
            return this.transitions.find(tr => {
                try {
                    return tr.execute(event) !== undefined;
                }
                catch (ignored) {
                    return false;
                }
            }) !== undefined;
        }
        clearTransitions() {
            this._transitions.length = 0;
        }
        get transitions() {
            return [...this._transitions];
        }
        addTransition(tr) {
            this._transitions.push(tr);
        }
        uninstall() {
            super.uninstall();
            this.transitions.forEach(tr => {
                tr.uninstall();
            });
            this._transitions.length = 0;
        }
    }

    class InitState extends OutputStateBase {
        constructor(stateMachine, stateName) {
            super(stateMachine, stateName);
        }
        exit() {
            this.checkStartingState();
        }
    }

    class TimeoutTransition extends TransitionBase {
        constructor(srcState, tgtState, timeout, logger) {
            super(srcState, tgtState);
            this.logger = logger;
            this.timeouted = false;
            this.timeoutDuration = timeout;
            this.timeouted = false;
        }
        startTimeout() {
            if (this.timeoutThread === undefined) {
                const time = this.timeoutDuration();
                if (time <= 0) {
                    this.src.fsm.onTimeout();
                    return;
                }
                this.timeoutThread = window.setTimeout(() => {
                    var _a;
                    try {
                        this.timeouted = true;
                        this.src.fsm.onTimeout();
                    }
                    catch (ex) {
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("Exception on timeout of a timeout transition", ex);
                    }
                }, time);
            }
        }
        stopTimeout() {
            if (this.timeoutThread !== undefined) {
                clearTimeout(this.timeoutThread);
                this.timeoutThread = undefined;
            }
        }
        accept(event) {
            return this.timeouted;
        }
        isGuardOK(_event) {
            return this.timeouted;
        }
        execute(event) {
            try {
                if (this.accept(event) && this.isGuardOK(event)) {
                    this.src.exit();
                    this.action(event);
                    this.tgt.enter();
                    this.timeouted = false;
                    return this.tgt;
                }
                return undefined;
            }
            catch (ex) {
                this.timeouted = false;
                throw ex;
            }
        }
        getAcceptedEvents() {
            return [];
        }
    }

    function remove(array, elt) {
        const index = array.indexOf(elt);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    function removeAt(array, index) {
        if (index > -1) {
            return array.splice(index, 1)[0];
        }
        return undefined;
    }
    function peek(array) {
        return array[array.length - 1];
    }

    class FSMImpl {
        constructor(logger) {
            this.logger = logger;
            this.inner = false;
            this._started = false;
            this.initState = new InitState(this, "init");
            this._states = [this.initState];
            this.startingState = this.initState;
            this._currentState = this.initState;
            this.currentStatePublisher = new Subject();
            this.handlers = [];
            this.eventsToProcess = [];
            this.currentSubFSM = undefined;
            this._log = false;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            this.dataHandler = dataHandler;
        }
        get currentState() {
            return this._currentState;
        }
        set currentState(state) {
            const old = this._currentState;
            this._currentState = state;
            this.currentStatePublisher.next([old, this._currentState]);
        }
        get currentStateObservable() {
            return this.currentStatePublisher;
        }
        process(event) {
            if (isKeyUpEvent(event)) {
                this.removeKeyEvent(event.code);
            }
            const processed = this.processEvent(event);
            if (processed && isKeyDownEvent(event) && !(this._currentState instanceof InitState) &&
                this.eventsToProcess.find(evt => isKeyDownEvent(evt) && evt.code === event.code) === undefined) {
                this.addRemaningEventsToProcess(event);
            }
            return processed;
        }
        processEvent(event) {
            var _a, _b;
            if (this.currentSubFSM !== undefined) {
                if (this.log) {
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg(`processing event ${String(event.type)} in a sub-FSM`, this.constructor.name);
                }
                return this.currentSubFSM.process(event);
            }
            if (this.log) {
                (_b = this.logger) === null || _b === void 0 ? void 0 : _b.logInteractionMsg(`processing event ${String(event.type)} at state 
            ${this.currentState.name}: ${this.constructor.name}`, this.constructor.name);
            }
            return this.currentState.process(event);
        }
        get log() {
            return this._log;
        }
        set log(log) {
            this._log = log;
        }
        getDataHandler() {
            return this.dataHandler;
        }
        removeKeyEvent(key) {
            let removed = false;
            for (let i = 0, size = this.eventsToProcess.length; i < size && !removed; i++) {
                const event = this.eventsToProcess[i];
                if (event instanceof KeyboardEvent && event.code === key) {
                    removed = true;
                    removeAt(this.eventsToProcess, i);
                }
            }
        }
        enterStdState(state) {
            this.currentState = state;
            this.checkTimeoutTransition();
            if (this.started) {
                this.onUpdating();
            }
        }
        get started() {
            return this._started;
        }
        processRemainingEvents() {
            const list = [...this.eventsToProcess];
            list.forEach(event => {
                var _a;
                removeAt(this.eventsToProcess, 0);
                if (this.log) {
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Recycling event", this.constructor.name);
                }
                this.process(event);
            });
        }
        addRemaningEventsToProcess(event) {
            this.eventsToProcess.push(event);
        }
        onTerminating() {
            var _a;
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM ended", this.constructor.name);
            }
            if (this.started) {
                this.notifyHandlerOnStop();
            }
            this.reinit();
            this.processRemainingEvents();
        }
        onCancelling() {
            var _a;
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM cancelled", this.constructor.name);
            }
            if (this.started) {
                this.notifyHandlerOnCancel();
            }
            this.fullReinit();
        }
        onStarting() {
            var _a;
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM started", this.constructor.name);
            }
            this._started = true;
            this.notifyHandlerOnStart();
        }
        onUpdating() {
            var _a;
            if (this.started) {
                if (this.log) {
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM updated", this.constructor.name);
                }
                this.notifyHandlerOnUpdate();
            }
        }
        addState(state) {
            this._states.push(state);
        }
        reinit() {
            var _a, _b, _c;
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM reinitialised", this.constructor.name);
            }
            (_b = this.currentTimeout) === null || _b === void 0 ? void 0 : _b.stopTimeout();
            this._started = false;
            this.currentState = this.initState;
            this.currentTimeout = undefined;
            (_c = this.currentSubFSM) === null || _c === void 0 ? void 0 : _c.reinit();
            if (this.dataHandler !== undefined && !this.inner) {
                this.dataHandler.reinitData();
            }
        }
        fullReinit() {
            var _a;
            this.eventsToProcess.length = 0;
            this.reinit();
            (_a = this.currentSubFSM) === null || _a === void 0 ? void 0 : _a.fullReinit();
        }
        onTimeout() {
            var _a;
            if (this.currentTimeout !== undefined) {
                if (this.log) {
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Timeout", this.constructor.name);
                }
                const state = this.currentTimeout.execute();
                if (isOutputStateType(state)) {
                    this.currentState = state;
                    this.checkTimeoutTransition();
                }
            }
        }
        stopCurrentTimeout() {
            var _a;
            if (this.currentTimeout !== undefined) {
                if (this.log) {
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Timeout stopped", this.constructor.name);
                }
                this.currentTimeout.stopTimeout();
                this.currentTimeout = undefined;
            }
        }
        checkTimeoutTransition() {
            var _a;
            const tr = this.currentState.transitions
                .find(t => t instanceof TimeoutTransition);
            if (tr !== undefined) {
                if (this.log) {
                    (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Timeout starting", this.constructor.name);
                }
                this.currentTimeout = tr;
                this.currentTimeout.startTimeout();
            }
        }
        addHandler(handler) {
            this.handlers.push(handler);
        }
        removeHandler(handler) {
            remove(this.handlers, handler);
        }
        notifyHandlerOnStart() {
            var _a;
            try {
                this.handlers.forEach(handler => {
                    handler.fsmStarts();
                });
            }
            catch (ex) {
                if (ex instanceof CancelFSMException) {
                    this.onCancelling();
                    throw ex;
                }
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmStarts' produced an error", ex, this.constructor.name);
                this.onCancelling();
            }
        }
        notifyHandlerOnUpdate() {
            var _a;
            try {
                this.handlers.forEach(handler => {
                    handler.fsmUpdates();
                });
            }
            catch (ex) {
                if (ex instanceof CancelFSMException) {
                    this.onCancelling();
                    throw ex;
                }
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmUpdates' produced an error", ex, this.constructor.name);
                this.onCancelling();
            }
        }
        notifyHandlerOnStop() {
            var _a;
            try {
                [...this.handlers].forEach(handler => {
                    handler.fsmStops();
                });
            }
            catch (ex) {
                if (ex instanceof CancelFSMException) {
                    this.onCancelling();
                    throw ex;
                }
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmStops' produced an error", ex, this.constructor.name);
                this.onCancelling();
            }
        }
        notifyHandlerOnCancel() {
            var _a;
            try {
                [...this.handlers].forEach(handler => {
                    handler.fsmCancels();
                });
            }
            catch (ex) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmCancels' produced an error", ex, this.constructor.name);
            }
        }
        get states() {
            return [...this._states];
        }
        getEventsToProcess() {
            return [...this.eventsToProcess];
        }
        getInitState() {
            return this.initState;
        }
        uninstall() {
            this.fullReinit();
            this.log = false;
            this.currentStatePublisher.complete();
            this.currentSubFSM = undefined;
            this._states.forEach(state => {
                state.uninstall();
            });
            this._states.length = 0;
            this.dataHandler = undefined;
        }
    }

    class InteractionBase {
        constructor(fsm, data, logger) {
            this.logger = logger;
            this.activated = false;
            this.stopImmediatePropag = false;
            this.preventDef = false;
            this._data = data;
            this._fsm = fsm;
            this.disposable = this._fsm.currentStateObservable.subscribe(current => {
                this.updateEventsRegistered(current[1], current[0]);
            });
            this.activated = true;
            this.asLog = false;
            this.registeredNodes = new Set();
            this.mutationObservers = [];
            this.throttleTimeout = 0;
        }
        reinitData() {
            this._data.flush();
        }
        get data() {
            return this._data;
        }
        setThrottleTimeout(timeout) {
            this.throttleTimeout = timeout;
        }
        createThrottleTimeout() {
            var _a;
            (_a = this.currentThrottling) === null || _a === void 0 ? void 0 : _a.cancel();
            this.currentThrottling = undefined;
            const currTimeout = this.throttleTimeout;
            let rejection;
            let timeout;
            this.currentThrottling = new Promise((resolve, reject) => {
                rejection = reject;
                timeout = setTimeout(() => {
                    try {
                        const evt = this.latestThrottledEvent;
                        this.latestThrottledEvent = undefined;
                        if (evt !== undefined) {
                            this.directEventProcess(evt);
                        }
                        resolve();
                    }
                    catch (ex) {
                        rejection(ex);
                    }
                }, currTimeout);
            }).catch((ex) => {
                var _a;
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("Error during the throttling process", ex, this.constructor.name);
            });
            this.currentThrottling.cancel = () => {
                clearTimeout(timeout);
                rejection(new Error("cancellation"));
            };
        }
        checkThrottlingEvent(event) {
            const latestEvt = this.latestThrottledEvent;
            if (latestEvt === undefined || latestEvt.type !== event.type) {
                if (latestEvt !== undefined) {
                    this.directEventProcess(latestEvt);
                }
                this.latestThrottledEvent = event;
                this.createThrottleTimeout();
            }
            else {
                this.latestThrottledEvent = event;
            }
        }
        updateEventsRegistered(newState, oldState) {
            if (newState === oldState || this._fsm.states.length === 2) {
                return;
            }
            const currEvents = this.getCurrentAcceptedEvents(newState);
            const events = [...this.getEventTypesOf(oldState)];
            const eventsToRemove = events.filter(e => !currEvents.includes(e));
            const eventsToAdd = currEvents.filter(e => !events.includes(e));
            this.registeredNodes.forEach(n => {
                eventsToRemove.forEach(type => {
                    this.unregisterEventToNode(type, n);
                });
                eventsToAdd.forEach(type => {
                    this.registerEventToNode(type, n);
                });
            });
        }
        getCurrentAcceptedEvents(state) {
            return [...this.getEventTypesOf(state)];
        }
        callBackMutationObserver(mutationList) {
            mutationList.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    this.registerToNodes([node]);
                });
                mutation.removedNodes.forEach(node => {
                    this.unregisterFromNodes([node]);
                });
            });
        }
        getEventTypesOf(state) {
            const tr = state.transitions;
            if (tr.length === 0) {
                return [];
            }
            return tr.map(t => t.getAcceptedEvents())
                .reduce((a, b) => [...a, ...b]);
        }
        registerToNodes(widgets) {
            widgets.forEach(w => {
                this.registeredNodes.add(w);
                this.onNewNodeRegistered(w);
            });
        }
        unregisterFromNodes(widgets) {
            widgets.forEach(w => {
                this.registeredNodes.delete(w);
                this.onNodeUnregistered(w);
            });
        }
        onNodeUnregistered(node) {
            this.getEventTypesOf(this._fsm.currentState).forEach(type => {
                this.unregisterEventToNode(type, node);
            });
        }
        onNewNodeRegistered(node) {
            this.getEventTypesOf(this._fsm.currentState).forEach(type => {
                this.registerEventToNode(type, node);
            });
        }
        registerToNodeChildren(elementToObserve) {
            elementToObserve.childNodes.forEach((node) => {
                this.registerToNodes([node]);
            });
            const newMutationObserver = new MutationObserver(mutations => {
                this.callBackMutationObserver(mutations);
            });
            newMutationObserver.observe(elementToObserve, { "childList": true });
            this.mutationObservers.push(newMutationObserver);
        }
        registerEventToNode(eventType, node) {
            if (isMouseEvent(eventType)) {
                node.addEventListener(eventType, this.getMouseHandler());
                return;
            }
            if (isTouchEvent(eventType)) {
                node.addEventListener(eventType, this.getTouchHandler());
                return;
            }
            if (isKeyEvent(eventType)) {
                node.addEventListener(eventType, this.getKeyHandler());
                return;
            }
            if (eventType === "scroll") {
                node.addEventListener(eventType, this.getUIHandler());
            }
        }
        unregisterEventToNode(eventType, node) {
            if (isMouseEvent(eventType)) {
                node.removeEventListener(eventType, this.getMouseHandler());
                return;
            }
            if (isTouchEvent(eventType)) {
                node.removeEventListener(eventType, this.getTouchHandler());
                return;
            }
            if (isKeyEvent(eventType)) {
                node.removeEventListener(eventType, this.getKeyHandler());
                return;
            }
            if (eventType === "scroll") {
                node.removeEventListener(eventType, this.getUIHandler());
            }
        }
        registerActionHandlerClick(node) {
            node.addEventListener("click", this.getActionHandler());
            node.addEventListener("auxclick", this.getActionHandler());
        }
        unregisterActionHandlerClick(node) {
            node.removeEventListener("click", this.getActionHandler());
            node.removeEventListener("auxclick", this.getActionHandler());
        }
        registerActionHandlerInput(node) {
            node.addEventListener("input", this.getActionHandler());
        }
        unregisterActionHandlerInput(node) {
            node.removeEventListener("input", this.getActionHandler());
        }
        getActionHandler() {
            if (this.actionHandler === undefined) {
                this.actionHandler = (evt) => {
                    this.processEvent(evt);
                };
            }
            return this.actionHandler;
        }
        getMouseHandler() {
            if (this.mouseHandler === undefined) {
                this.mouseHandler = (evt) => {
                    this.processEvent(evt);
                };
            }
            return this.mouseHandler;
        }
        getTouchHandler() {
            if (this.touchHandler === undefined) {
                this.touchHandler = (evt) => {
                    this.processEvent(evt);
                };
            }
            return this.touchHandler;
        }
        getKeyHandler() {
            if (this.keyHandler === undefined) {
                this.keyHandler = (evt) => {
                    this.processEvent(evt);
                };
            }
            return this.keyHandler;
        }
        getUIHandler() {
            if (this.uiHandler === undefined) {
                this.uiHandler = (evt) => {
                    this.processEvent(evt);
                };
            }
            return this.uiHandler;
        }
        isRunning() {
            return this.activated && !(this._fsm.currentState instanceof InitState);
        }
        fullReinit() {
            this._fsm.fullReinit();
        }
        set stopImmediatePropagation(stop) {
            this.stopImmediatePropag = stop;
        }
        get stopImmediatePropagation() {
            return this.stopImmediatePropag;
        }
        set preventDefault(prevent) {
            this.preventDef = prevent;
        }
        get preventDefault() {
            return this.preventDef;
        }
        processEvent(event) {
            if (this.isActivated()) {
                if (this.throttleTimeout <= 0) {
                    this.directEventProcess(event);
                }
                else {
                    this.checkThrottlingEvent(event);
                }
            }
        }
        directEventProcess(event) {
            this._fsm.process(event);
            if (this.preventDef) {
                event.preventDefault();
            }
            if (this.stopImmediatePropag) {
                event.stopImmediatePropagation();
            }
        }
        log(log) {
            this.asLog = log;
            this._fsm.log = log;
        }
        isActivated() {
            return this.activated;
        }
        setActivated(activated) {
            var _a;
            if (this.asLog) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg(`Interaction activation: ${String(activated)}`, this.constructor.name);
            }
            this.activated = activated;
            if (!activated) {
                this._fsm.fullReinit();
            }
        }
        get fsm() {
            return this._fsm;
        }
        reinit() {
            this._fsm.reinit();
            this.reinitData();
        }
        uninstall() {
            this.disposable.unsubscribe();
            this.registeredNodes.forEach(n => {
                this.onNodeUnregistered(n);
            });
            this.registeredNodes.clear();
            this.mutationObservers.forEach(m => {
                m.disconnect();
            });
            this.mutationObservers.length = 0;
            this.setActivated(false);
        }
    }

    class WidgetDataImpl extends InteractionDataBase {
        get widget() {
            return this.targetData;
        }
    }

    class ButtonPressedFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const pressed = new TerminalState(this, "pressed");
            this.addState(pressed);
            const tr = new ButtonPressedTransition(this.initState, pressed);
            tr.action = (event) => {
                dataHandler.initToPressedHandler(event);
            };
        }
    }
    class ButtonPressed extends InteractionBase {
        constructor() {
            super(new ButtonPressedFSM(), new WidgetDataImpl());
            this.handler = {
                "initToPressedHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isButton(node)) {
                this.registerActionHandlerClick(node);
            }
        }
        onNodeUnregistered(node) {
            if (isButton(node)) {
                this.unregisterActionHandlerClick(node);
            }
        }
    }

    class BoxCheckPressedTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event.target !== null && isCheckBox(event.target);
        }
        getAcceptedEvents() {
            return ["input"];
        }
    }

    class BoxCheckedFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const checked = new TerminalState(this, "checked");
            this.addState(checked);
            const tr = new BoxCheckPressedTransition(this.initState, checked);
            tr.action = (event) => {
                dataHandler.initToCheckHandler(event);
            };
        }
    }
    class BoxChecked extends InteractionBase {
        constructor() {
            super(new BoxCheckedFSM(), new WidgetDataImpl());
            this.handler = {
                "initToCheckHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isCheckBox(node)) {
                this.registerActionHandlerInput(node);
            }
        }
        onNodeUnregistered(node) {
            if (isCheckBox(node)) {
                this.unregisterActionHandlerInput(node);
            }
        }
    }

    class ColorPickedTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event.target !== null && isColorChoice(event.target);
        }
        getAcceptedEvents() {
            return ["input"];
        }
    }

    class ColorPickedFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const picked = new TerminalState(this, "picked");
            this.addState(picked);
            const tr = new ColorPickedTransition(this.initState, picked);
            tr.action = (event) => {
                dataHandler.initToPickedHandler(event);
            };
        }
    }
    class ColorPicked extends InteractionBase {
        constructor() {
            super(new ColorPickedFSM(), new WidgetDataImpl());
            this.handler = {
                "initToPickedHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isColorChoice(node)) {
                this.registerActionHandlerInput(node);
            }
        }
        onNodeUnregistered(node) {
            if (isColorChoice(node)) {
                this.unregisterActionHandlerInput(node);
            }
        }
    }

    class ComboBoxTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event.target !== null && isComboBox(event.target);
        }
        getAcceptedEvents() {
            return ["input"];
        }
    }

    class ComboBoxSelectedFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const selected = new TerminalState(this, "selected");
            this.addState(selected);
            const tr = new ComboBoxTransition(this.initState, selected);
            tr.action = (event) => {
                dataHandler.initToSelectedHandler(event);
            };
        }
    }
    class ComboBoxSelected extends InteractionBase {
        constructor() {
            super(new ComboBoxSelectedFSM(), new WidgetDataImpl());
            this.handler = {
                "initToSelectedHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isComboBox(node)) {
                this.registerActionHandlerInput(node);
            }
        }
        onNodeUnregistered(node) {
            if (isComboBox(node)) {
                this.unregisterActionHandlerInput(node);
            }
        }
    }

    class SpinnerChangedTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event.target !== null && isSpinner(event.target);
        }
        getAcceptedEvents() {
            return ["input"];
        }
    }

    class StdState extends OutputStateBase {
        constructor(stateMachine, stateName) {
            super(stateMachine, stateName);
        }
        enter() {
            this.checkStartingState();
            this.fsm.enterStdState(this);
        }
        exit() {
        }
    }

    class SpinnerChangedFSM extends FSMImpl {
        static getTimeGap() {
            return SpinnerChangedFSM.timeGap;
        }
        static setTimeGap(timeGapBetweenClicks) {
            if (timeGapBetweenClicks > 0) {
                SpinnerChangedFSM.timeGap = timeGapBetweenClicks;
            }
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const changed = new StdState(this, "valueChanged");
            const ended = new TerminalState(this, "ended");
            this.addState(changed);
            this.addState(ended);
            const spinnerAction = (event) => {
                dataHandler.initToChangedHandler(event);
            };
            const changedInit = new SpinnerChangedTransition(this.initState, changed);
            changedInit.action = spinnerAction;
            const changedChanged = new SpinnerChangedTransition(changed, changed);
            changedChanged.action = spinnerAction;
            new TimeoutTransition(changed, ended, SpinnerChangedFSM.timeGapSupplier);
        }
    }
    SpinnerChangedFSM.timeGap = 300;
    SpinnerChangedFSM.timeGapSupplier = () => SpinnerChangedFSM.getTimeGap();
    class SpinnerChanged extends InteractionBase {
        constructor() {
            super(new SpinnerChangedFSM(), new WidgetDataImpl());
            this.handler = {
                "initToChangedHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isSpinner(node)) {
                this.registerActionHandlerInput(node);
            }
        }
        onNodeUnregistered(node) {
            if (isSpinner(node)) {
                this.unregisterActionHandlerInput(node);
            }
        }
    }

    class DatePickedTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event.target !== null && isDatePicker(event.target);
        }
        getAcceptedEvents() {
            return ["input"];
        }
    }

    class DatePickedFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const picked = new TerminalState(this, "picked");
            this.addState(picked);
            const tr = new DatePickedTransition(this.initState, picked);
            tr.action = (event) => {
                dataHandler.initToPickedHandler(event);
            };
        }
    }
    class DatePicked extends InteractionBase {
        constructor() {
            super(new DatePickedFSM(), new WidgetDataImpl());
            this.handler = {
                "initToPickedHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isDatePicker(node)) {
                this.registerActionHandlerInput(node);
            }
        }
        onNodeUnregistered(node) {
            if (isDatePicker(node)) {
                this.unregisterActionHandlerInput(node);
            }
        }
    }

    class TextInputChangedTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event.target !== null && isTextInput(event.target);
        }
        getAcceptedEvents() {
            return ["input"];
        }
    }

    class TextInputChangedFSM extends FSMImpl {
        constructor(timeSet) {
            super();
            this._timeGap = 1000;
            this.timeGapSupplier = () => this.getTimeGap();
            if (timeSet !== undefined) {
                this._timeGap = timeSet;
            }
        }
        getTimeGap() {
            return this._timeGap;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const changed = new StdState(this, "changed");
            const ended = new TerminalState(this, "ended");
            this.addState(changed);
            this.addState(ended);
            const trInit = new TextInputChangedTransition(this.initState, changed);
            trInit.action = (event) => {
                dataHandler.initToChangedHandler(event);
            };
            const trChanged = new TextInputChangedTransition(changed, changed);
            trChanged.action = (event) => {
                dataHandler.initToChangedHandler(event);
            };
            new TimeoutTransition(changed, ended, this.timeGapSupplier);
        }
    }
    class TextInputChanged extends InteractionBase {
        constructor(timeGap) {
            super(new TextInputChangedFSM(timeGap), new WidgetDataImpl());
            this.handler = {
                "initToChangedHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isTextInput(node)) {
                this.registerActionHandlerInput(node);
            }
        }
        onNodeUnregistered(node) {
            if (isTextInput(node)) {
                this.unregisterActionHandlerInput(node);
            }
        }
    }

    class ConcurrentFSM extends FSMImpl {
        constructor(fsms) {
            super();
            if (fsms.length < 2) {
                throw new Error(`Requires more that 1 FSM: ${String(fsms)}`);
            }
            const handler = {
                "fsmStarts": () => {
                    if (this.started) {
                        this.onStarting();
                    }
                },
                "fsmUpdates": () => {
                    this.onUpdating();
                },
                "fsmStops": () => {
                    this.onTerminating();
                },
                "fsmCancels": () => {
                    this.onCancelling();
                }
            };
            this.conccurFSMs = [...fsms];
            this.conccurFSMs.forEach(fsm => {
                fsm.addHandler(handler);
            });
        }
        getConccurFSMs() {
            return [...this.conccurFSMs];
        }
        process(event) {
            return this.conccurFSMs.some(conccurFSM => conccurFSM.process(event));
        }
        get started() {
            return this.conccurFSMs.every(fsm => fsm.started);
        }
        set log(log) {
            super.log = log;
            this.conccurFSMs.forEach(fsm => {
                fsm.log = log;
            });
        }
        uninstall() {
            super.uninstall();
            this.conccurFSMs.forEach(fsm => {
                fsm.uninstall();
            });
        }
    }

    class ConcurrentInteraction extends InteractionBase {
        constructor(fsm, data) {
            super(fsm, data);
            this.subscriptions = this.fsm.getConccurFSMs()
                .map(conc => conc.currentStateObservable
                .subscribe(current => {
                this.updateEventsRegistered(current[1], current[0]);
            }));
        }
        isRunning() {
            return this.isActivated() && this.fsm.started;
        }
        onNodeUnregistered(node) {
            this.getCurrentAcceptedEvents().forEach(type => {
                this.unregisterEventToNode(type, node);
            });
        }
        onNewNodeRegistered(node) {
            this.getCurrentAcceptedEvents().forEach(type => {
                this.registerEventToNode(type, node);
            });
        }
        getCurrentAcceptedEvents(_state) {
            return this.fsm.getConccurFSMs().flatMap(concFSM => [...this.getEventTypesOf(concFSM.currentState)]);
        }
        uninstall() {
            super.uninstall();
            this.subscriptions.forEach(sub => {
                sub.unsubscribe();
            });
        }
    }

    class TouchPressureTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(evt) {
            return evt instanceof TouchEvent && isEventType(evt.type) && this.getAcceptedEvents().includes(evt.type);
        }
        getAcceptedEvents() {
            return ["touchstart"];
        }
    }

    class TouchMoveTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(evt) {
            return evt instanceof TouchEvent && isEventType(evt.type) && this.getAcceptedEvents().includes(evt.type);
        }
        getAcceptedEvents() {
            return ["touchmove"];
        }
    }

    class TouchReleaseTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(evt) {
            return evt instanceof TouchEvent && isEventType(evt.type) && this.getAcceptedEvents().includes(evt.type);
        }
        getAcceptedEvents() {
            return ["touchend"];
        }
    }

    class PointingDataBase extends InteractionDataBase {
        constructor() {
            super(...arguments);
            this.clientXData = 0;
            this.clientYData = 0;
            this.pageXData = 0;
            this.pageYData = 0;
            this.screenXData = 0;
            this.screenYData = 0;
            this.altKeyData = false;
            this.ctrlKeyData = false;
            this.metaKeyData = false;
            this.shiftKeyData = false;
        }
        flush() {
            super.flush();
            this.clientXData = 0;
            this.clientYData = 0;
            this.pageXData = 0;
            this.pageYData = 0;
            this.screenXData = 0;
            this.screenYData = 0;
            this.altKeyData = false;
            this.ctrlKeyData = false;
            this.metaKeyData = false;
            this.shiftKeyData = false;
        }
        copy(data) {
            super.copy(data);
            this.clientXData = data.clientX;
            this.clientYData = data.clientY;
            this.pageXData = data.pageX;
            this.pageYData = data.pageY;
            this.screenXData = data.screenX;
            this.screenYData = data.screenY;
            this.altKeyData = data.altKey;
            this.ctrlKeyData = data.ctrlKey;
            this.metaKeyData = data.metaKey;
            this.shiftKeyData = data.shiftKey;
        }
        get clientX() {
            return this.clientXData;
        }
        get clientY() {
            return this.clientYData;
        }
        get pageX() {
            return this.pageXData;
        }
        get pageY() {
            return this.pageYData;
        }
        get screenX() {
            return this.screenXData;
        }
        get screenY() {
            return this.screenYData;
        }
        get altKey() {
            return this.altKeyData;
        }
        get ctrlKey() {
            return this.ctrlKeyData;
        }
        get metaKey() {
            return this.metaKeyData;
        }
        get shiftKey() {
            return this.shiftKeyData;
        }
    }

    class TouchDataImpl extends PointingDataBase {
        constructor() {
            super(...arguments);
            this.altitudeAngleData = 0;
            this.azimuthAngleData = 0;
            this.forceData = 0;
            this.identifierData = 0;
            this.radiusXData = 0;
            this.radiusYData = 0;
            this.rotationAngleData = 0;
            this.touchTypeData = "direct";
        }
        get altitudeAngle() {
            return this.altitudeAngleData;
        }
        get azimuthAngle() {
            return this.azimuthAngleData;
        }
        get force() {
            return this.forceData;
        }
        get identifier() {
            return this.identifierData;
        }
        get radiusX() {
            return this.radiusXData;
        }
        get radiusY() {
            return this.radiusYData;
        }
        get rotationAngle() {
            return this.rotationAngleData;
        }
        get touchType() {
            return this.touchTypeData;
        }
        copy(data) {
            super.copy(data);
            this.altitudeAngleData = data.altitudeAngle;
            this.azimuthAngleData = data.azimuthAngle;
            this.forceData = data.force;
            this.identifierData = data.identifier;
            this.radiusXData = data.radiusX;
            this.radiusYData = data.radiusY;
            this.rotationAngleData = data.rotationAngle;
            this.touchTypeData = data.touchType;
        }
        flush() {
            super.flush();
            this.altitudeAngleData = 0;
            this.azimuthAngleData = 0;
            this.forceData = 0;
            this.identifierData = 0;
            this.radiusXData = 0;
            this.radiusYData = 0;
            this.rotationAngleData = 0;
            this.touchTypeData = "direct";
        }
        static mergeTouchEventData(touch, evt) {
            const data = new TouchDataImpl();
            data.copy(touch);
            data.timeStampData = evt.timeStamp;
            data.altKeyData = evt.altKey;
            data.shiftKeyData = evt.shiftKey;
            data.ctrlKeyData = evt.ctrlKey;
            data.metaKeyData = evt.metaKey;
            data.currentTargetData = evt.currentTarget;
            return data;
        }
    }

    class SrcTgtTouchDataImpl {
        constructor() {
            this.srcData = new TouchDataImpl();
            this.tgtData = new TouchDataImpl();
        }
        get src() {
            return this.srcData;
        }
        get tgt() {
            return this.tgtData;
        }
        flush() {
            this.srcData.flush();
            this.tgtData.flush();
        }
        copySrc(data, evt) {
            this.srcData.copy(TouchDataImpl.mergeTouchEventData(data, evt));
        }
        copyTgt(data, evt) {
            this.tgtData.copy(TouchDataImpl.mergeTouchEventData(data, evt));
        }
        get diffClientX() {
            return this.tgt.clientX - this.src.clientX;
        }
        get diffClientY() {
            return this.tgt.clientY - this.src.clientY;
        }
        get diffPageX() {
            return this.tgt.pageX - this.src.pageX;
        }
        get diffPageY() {
            return this.tgt.pageY - this.src.pageY;
        }
        get diffScreenX() {
            return this.tgt.screenX - this.src.screenX;
        }
        get diffScreenY() {
            return this.tgt.screenY - this.src.screenY;
        }
    }

    class TouchDnDFSM extends FSMImpl {
        constructor() {
            super();
            this.touchID = undefined;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const touched = new StdState(this, "touched");
            const released = new TerminalState(this, "released");
            this.addState(touched);
            this.addState(released);
            const pressure = new TouchPressureTransition(this.initState, touched);
            pressure.action = (event) => {
                this.touchID = event.changedTouches[0].identifier;
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onTouch(event);
            };
            const move = new TouchMoveTransition(touched, touched);
            move.isGuardOK = (event) => event.changedTouches[0].identifier === this.touchID;
            move.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onMove(event);
            };
            const release = new TouchReleaseTransition(touched, released);
            release.isGuardOK = (event) => event.changedTouches[0].identifier === this.touchID;
            release.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onRelease(event);
            };
            super.buildFSM(dataHandler);
        }
        getTouchId() {
            return this.touchID;
        }
        reinit() {
            super.reinit();
            this.touchID = undefined;
        }
    }
    class TouchDnD extends InteractionBase {
        constructor(fsm) {
            super(fsm !== null && fsm !== void 0 ? fsm : new TouchDnDFSM(), new SrcTgtTouchDataImpl());
            this.handler = {
                "onTouch": (evt) => {
                    const touch = evt.changedTouches[0];
                    this._data.copySrc(touch, evt);
                    this._data.copyTgt(touch, evt);
                },
                "onMove": (evt) => {
                    this.setTgtData(evt);
                },
                "onRelease": (evt) => {
                    this.setTgtData(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        setTgtData(evt) {
            const touch = getTouch(evt.changedTouches, this.data.src.identifier);
            if (touch !== undefined) {
                this._data.copyTgt(touch, evt);
            }
        }
    }

    class MultiTouchDataImpl {
        constructor() {
            this.touchesData = new Map();
        }
        get touches() {
            return [...this.touchesData.values()];
        }
        addTouchData(data) {
            this.touchesData.set(data.src.identifier, data);
        }
        removeTouchData(id) {
            const tdata = this.touchesData.get(id);
            if (tdata !== undefined) {
                this.touchesData.delete(id);
                tdata.flush();
            }
        }
        flush() {
            this.touchesData.forEach(data => {
                data.flush();
            });
            this.touchesData.clear();
        }
        setTouch(tp, evt) {
            const tdata = this.touchesData.get(tp.identifier);
            if (tdata !== undefined) {
                tdata.copyTgt(tp, evt);
            }
        }
    }

    class MultiTouchFSM extends ConcurrentFSM {
        constructor(nbTouch) {
            super([...Array(nbTouch).keys()].map(_ => new TouchDnDFSM()));
        }
        buildFSM(dataHandler) {
            super.buildFSM(dataHandler);
            this.getConccurFSMs().forEach(fsm => {
                fsm.buildFSM(dataHandler);
            });
        }
        process(event) {
            if (!(event instanceof TouchEvent)) {
                return false;
            }
            const touches = this.getConccurFSMs()
                .filter(fsm => fsm.getTouchId() === event.changedTouches[0].identifier);
            if (touches.length > 0) {
                return touches[0].process(event);
            }
            return this.getConccurFSMs().some(conccurFSM => conccurFSM.process(event));
        }
    }
    class MultiTouch extends ConcurrentInteraction {
        constructor(nbTouches) {
            super(new MultiTouchFSM(nbTouches), new MultiTouchDataImpl());
            this.handler = {
                "onTouch": (event) => {
                    if (event.changedTouches.length > 0) {
                        const data = new SrcTgtTouchDataImpl();
                        data.copySrc(event.changedTouches[0], event);
                        data.copyTgt(event.changedTouches[0], event);
                        this._data.addTouchData(data);
                    }
                },
                "onMove": (event) => {
                    this._data.setTouch(event.changedTouches[0], event);
                },
                "onRelease": (event) => {
                    this._data.setTouch(event.changedTouches[0], event);
                },
                "reinitData": () => {
                    const currentIDs = this.fsm.getConccurFSMs()
                        .filter(fsm => fsm.started)
                        .map(fsm => fsm.getTouchId());
                    this.data
                        .touches
                        .filter(data => !currentIDs.includes(data.src.identifier))
                        .forEach(data => {
                        this.data.removeTouchData(data.src.identifier);
                    });
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class CancellingState extends StateBase {
        constructor(stateMachine, stateName) {
            super(stateMachine, stateName);
        }
        enter() {
            this.fsm.onCancelling();
        }
        uninstall() {
        }
    }

    class TapDataImpl {
        constructor() {
            this.tapsData = [];
        }
        get taps() {
            return [...this.tapsData];
        }
        addTapData(data) {
            this.tapsData.push(data);
        }
        flush() {
            this.tapsData.length = 0;
        }
    }

    class TapFSM extends FSMImpl {
        constructor(nbTaps) {
            super();
            this.nbTaps = nbTaps;
            this.countTaps = 0;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const touched = new StdState(this, "touched");
            const ended = new TerminalState(this, "ended");
            const timeouted = new CancellingState(this, "timeouted");
            this.addState(touched);
            this.addState(ended);
            this.addState(timeouted);
            const touchInit = new TouchReleaseTransition(this.initState, ended);
            const touchInitAction = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.tap(event);
            };
            touchInit.action = touchInitAction;
            touchInit.isGuardOK = (_event) => this.nbTaps === 1;
            const touchTouched = new TouchReleaseTransition(this.initState, touched);
            touchTouched.action = (event) => {
                this.countTaps++;
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.tap(event);
            };
            touchTouched.isGuardOK = (_event) => this.nbTaps > 1;
            const touchTouchedTouched = new TouchReleaseTransition(touched, touched);
            touchTouchedTouched.action = (event) => {
                this.countTaps++;
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.tap(event);
            };
            touchTouchedTouched.isGuardOK = (_event) => (this.countTaps + 1) < this.nbTaps;
            const touchEnded = new TouchReleaseTransition(touched, ended);
            touchEnded.action = touchInitAction;
            touchEnded.isGuardOK = (_event) => (this.countTaps + 1) === this.nbTaps;
            new TimeoutTransition(touched, timeouted, () => 1000);
        }
        reinit() {
            super.reinit();
            this.countTaps = 0;
        }
    }
    class Tap extends InteractionBase {
        constructor(numberTaps) {
            super(new TapFSM(numberTaps), new TapDataImpl());
            this.handler = {
                "tap": (evt) => {
                    if (evt.changedTouches.length > 0) {
                        const touch = new TouchDataImpl();
                        touch.copy(TouchDataImpl.mergeTouchEventData(evt.changedTouches[0], evt));
                        this._data.addTapData(touch);
                    }
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class LongTouchFSM extends FSMImpl {
        constructor(duration) {
            super();
            if (duration <= 0) {
                throw new Error("Incorrect duration");
            }
            this.duration = duration;
            this.currentTouchID = undefined;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            const touched = new StdState(this, "touched");
            const releasedTooEarly = new CancellingState(this, "releasedEarly");
            const timeouted = new TerminalState(this, "timeouted");
            this.addState(touched);
            this.addState(releasedTooEarly);
            this.addState(timeouted);
            const press = new TouchPressureTransition(this.initState, touched);
            press.action = (event) => {
                this.currentTouchID = event.changedTouches[0].identifier;
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.tap(event);
            };
            const release = new TouchReleaseTransition(touched, releasedTooEarly);
            release.isGuardOK = (event) => event.changedTouches[0].identifier === this.currentTouchID;
            new TimeoutTransition(touched, timeouted, () => this.duration);
            super.buildFSM(dataHandler);
        }
        reinit() {
            super.reinit();
            this.currentTouchID = undefined;
        }
    }
    class LongTouch extends InteractionBase {
        constructor(duration) {
            super(new LongTouchFSM(duration), new TouchDataImpl());
            this.handler = {
                "tap": (evt) => {
                    if (evt.changedTouches.length > 0) {
                        this._data.copy(TouchDataImpl.mergeTouchEventData(evt.changedTouches[0], evt));
                    }
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class PanFSM extends FSMImpl {
        constructor(horizontal, minLength, pxTolerance) {
            super();
            this.touchID = undefined;
            this.stableAxe = undefined;
            this.moveAxe = undefined;
            this.horizontal = horizontal;
            this.minLength = minLength;
            this.pxTolerance = pxTolerance;
        }
        getPanDistance(x, y) {
            const moveAxe2 = this.horizontal ? x : y;
            return this.moveAxe === undefined ? 0 : Math.abs(this.moveAxe - moveAxe2);
        }
        isStable(x, y) {
            const stableAxe2 = this.horizontal ? y : x;
            return this.stableAxe === undefined ? false : Math.abs(this.stableAxe - stableAxe2) <= this.pxTolerance;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const touched = new StdState(this, "touched");
            const moved = new StdState(this, "moved");
            const released = new TerminalState(this, "released");
            const cancelled = new CancellingState(this, "cancelled");
            this.addState(touched);
            this.addState(moved);
            this.addState(released);
            this.addState(cancelled);
            this.startingState = moved;
            const press = new TouchPressureTransition(this.initState, touched);
            press.action = (event) => {
                this.setInitialValueOnTouch(event);
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.touch(event);
            };
            const releaseTouched = new TouchReleaseTransition(touched, cancelled);
            releaseTouched.isGuardOK = (event) => event.changedTouches[0].identifier === this.touchID;
            this.configMove(touched, cancelled, moved, dataHandler);
            this.configRelease(moved, cancelled, released, dataHandler);
        }
        configMove(touched, cancelled, moved, dataHandler) {
            const isGuardMoveKO = (evt) => evt.changedTouches[0].identifier === this.touchID &&
                !this.isStable(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
            const moveTouched = new TouchMoveTransition(touched, cancelled);
            moveTouched.isGuardOK = isGuardMoveKO;
            const moveCancelled = new TouchMoveTransition(moved, cancelled);
            moveCancelled.isGuardOK = isGuardMoveKO;
            const isGuardMoveOK = (evt) => evt.changedTouches[0].identifier === this.touchID &&
                this.isStable(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
            const actionMoveOK = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.panning(event);
            };
            const moveTouchedOK = new TouchMoveTransition(touched, moved);
            moveTouchedOK.isGuardOK = isGuardMoveOK;
            moveTouchedOK.action = actionMoveOK;
            const moveMovedOK = new TouchMoveTransition(moved, moved);
            moveMovedOK.isGuardOK = isGuardMoveOK;
            moveMovedOK.action = actionMoveOK;
        }
        configRelease(moved, cancelled, released, dataHandler) {
            const releaseMoved = new TouchReleaseTransition(moved, cancelled);
            releaseMoved.isGuardOK = (evt) => evt.changedTouches[0].identifier === this.touchID &&
                !this.checkFinalPanConditions(evt);
            const releaseFinal = new TouchReleaseTransition(moved, released);
            releaseFinal.isGuardOK = (evt) => evt.changedTouches[0].identifier === this.touchID &&
                this.checkFinalPanConditions(evt);
            releaseFinal.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.panned(event);
            };
        }
        setInitialValueOnTouch(evt) {
            const touch = evt.changedTouches[0];
            this.touchID = touch.identifier;
            this.moveAxe = this.horizontal ? touch.clientX : touch.clientY;
            this.stableAxe = this.horizontal ? touch.clientY : touch.clientX;
        }
        checkFinalPanConditions(evt) {
            return this.getPanDistance(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY) >= this.minLength;
        }
        reinit() {
            super.reinit();
            this.touchID = undefined;
            this.stableAxe = undefined;
            this.moveAxe = undefined;
        }
    }
    class Pan extends InteractionBase {
        constructor(horizontal, minLength, pxTolerance, fsm) {
            super(fsm !== null && fsm !== void 0 ? fsm : new PanFSM(horizontal, minLength, pxTolerance), new SrcTgtTouchDataImpl());
            this.handler = {
                "touch": (evt) => {
                    const touch = evt.changedTouches[0];
                    this._data.copySrc(touch, evt);
                    this._data.copyTgt(touch, evt);
                },
                "panning": (evt) => {
                    this._data.copyTgt(evt.changedTouches[0], evt);
                },
                "panned": (evt) => {
                    this._data.copyTgt(evt.changedTouches[0], evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class SwipeFSM extends PanFSM {
        constructor(horizontal, minVelocity, minLength, pxTolerance) {
            super(horizontal, minLength, pxTolerance);
            this.minVelocity = minVelocity;
            this.t0 = 0;
        }
        computeVelocity(t1, x, y) {
            var _a;
            const value = this.horizontal ? x : y;
            const axe = (_a = this.moveAxe) !== null && _a !== void 0 ? _a : 0;
            return Math.abs(axe - value) / ((t1 - this.t0) / 1000);
        }
        setInitialValueOnTouch(evt) {
            super.setInitialValueOnTouch(evt);
            this.t0 = evt.timeStamp;
        }
        checkFinalPanConditions(evt) {
            return super.checkFinalPanConditions(evt) &&
                this.computeVelocity(evt.timeStamp, evt.changedTouches[0].clientX, evt.changedTouches[0].clientY) >= this.minVelocity;
        }
        reinit() {
            super.reinit();
            this.t0 = 0;
        }
    }
    class Swipe extends Pan {
        constructor(horizontal, minVelocity, minLength, pxTolerance) {
            super(horizontal, minLength, pxTolerance, new SwipeFSM(horizontal, minVelocity, minLength, pxTolerance));
        }
    }

    class ClickTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["click", "auxclick"];
        }
    }

    class PointDataImpl extends PointingDataBase {
        constructor() {
            super(...arguments);
            this.buttonData = 0;
            this.buttonsData = 0;
            this.movementXData = 0;
            this.movementYData = 0;
            this.offsetXData = 0;
            this.offsetYData = 0;
            this.relatedTargetData = null;
        }
        flush() {
            super.flush();
            this.buttonData = 0;
            this.buttonsData = 0;
            this.movementXData = 0;
            this.movementYData = 0;
            this.offsetXData = 0;
            this.offsetYData = 0;
            this.relatedTargetData = null;
        }
        copy(data) {
            super.copy(data);
            this.buttonData = data.button;
            this.buttonsData = data.buttons;
            this.movementXData = data.movementX;
            this.movementYData = data.movementY;
            this.offsetXData = data.offsetX;
            this.offsetYData = data.offsetY;
            this.relatedTargetData = data.relatedTarget;
        }
        get button() {
            return this.buttonData;
        }
        get buttons() {
            return this.buttonsData;
        }
        get movementX() {
            return this.movementXData;
        }
        get movementY() {
            return this.movementYData;
        }
        get offsetX() {
            return this.offsetXData;
        }
        get offsetY() {
            return this.offsetYData;
        }
        get relatedTarget() {
            return this.relatedTargetData;
        }
    }

    class ClickFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const clicked = new TerminalState(this, "clicked");
            this.addState(clicked);
            const clickt = new ClickTransition(this.initState, clicked);
            clickt.action = (event) => {
                this.setCheckButton(event.button);
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.initToClicked(event);
            };
            clickt.isGuardOK = (event) => this.checkButton === undefined || event.button === this.checkButton;
        }
        getCheckButton() {
            var _a;
            return (_a = this.checkButton) !== null && _a !== void 0 ? _a : -1;
        }
        setCheckButton(buttonToCheck) {
            if (this.checkButton === undefined) {
                this.checkButton = buttonToCheck;
            }
        }
        reinit() {
            super.reinit();
            this.checkButton = undefined;
        }
    }
    class Click extends InteractionBase {
        constructor(fsm, data) {
            super(fsm !== null && fsm !== void 0 ? fsm : new ClickFSM(), data !== null && data !== void 0 ? data : new PointDataImpl());
            this.handler = {
                "initToClicked": (evt) => {
                    this._data.copy(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class PressureTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return isMouseDownEvent(event);
        }
        getAcceptedEvents() {
            return ["mousedown"];
        }
    }

    class PressFSM extends FSMImpl {
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const pressed = new TerminalState(this, "pressed");
            this.addState(pressed);
            const pressure = new PressureTransition(this.initState, pressed);
            pressure.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.initToPress(event);
            };
        }
    }
    class Press extends InteractionBase {
        constructor() {
            super(new PressFSM(), new PointDataImpl());
            this.handler = {
                "initToPress": (evt) => {
                    this._data.copy(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class MoveTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["mousemove"];
        }
    }

    class KeyPressureTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return isKeyDownEvent(event);
        }
        getAcceptedEvents() {
            return ["keydown"];
        }
    }

    class EscapeKeyPressureTransition extends KeyPressureTransition {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        isGuardOK(event) {
            return event.code === "Escape" || event.code === String(exports.KeyCode.escape);
        }
    }

    class ReleaseTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["mouseup"];
        }
    }

    class SrcTgtPointsDataImpl {
        constructor() {
            this.srcData = new PointDataImpl();
            this.tgtData = new PointDataImpl();
        }
        get src() {
            return this.srcData;
        }
        get tgt() {
            return this.tgtData;
        }
        flush() {
            this.srcData.flush();
            this.tgtData.flush();
        }
        copySrc(data) {
            this.srcData.copy(data);
        }
        copyTgt(data) {
            this.tgtData.copy(data);
        }
        get diffClientX() {
            return this.tgt.clientX - this.src.clientX;
        }
        get diffClientY() {
            return this.tgt.clientY - this.src.clientY;
        }
        get diffPageX() {
            return this.tgt.pageX - this.src.pageX;
        }
        get diffPageY() {
            return this.tgt.pageY - this.src.pageY;
        }
        get diffScreenX() {
            return this.tgt.screenX - this.src.screenX;
        }
        get diffScreenY() {
            return this.tgt.screenY - this.src.screenY;
        }
    }

    class DnDFSM extends FSMImpl {
        constructor(cancellable) {
            super();
            this.cancellable = cancellable;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const pressed = new StdState(this, "pressed");
            const dragged = new StdState(this, "dragged");
            const released = new TerminalState(this, "released");
            const cancelled = new CancellingState(this, "cancelled");
            this.addState(pressed);
            this.addState(dragged);
            this.addState(released);
            this.addState(cancelled);
            this.startingState = dragged;
            const press = new PressureTransition(this.initState, pressed);
            press.action = (event) => {
                this.buttonToCheck = event.button;
                dataHandler.onPress(event);
            };
            const relCancel = new ReleaseTransition(pressed, cancelled);
            relCancel.isGuardOK = (event) => event.button === this.buttonToCheck;
            const guardMove = (event) => event.button === this.buttonToCheck;
            const actionMove = (event) => {
                dataHandler.onDrag(event);
            };
            const move = new MoveTransition(pressed, dragged);
            move.isGuardOK = guardMove;
            move.action = actionMove;
            const moveDrag = new MoveTransition(dragged, dragged);
            moveDrag.isGuardOK = guardMove;
            moveDrag.action = actionMove;
            const release = new ReleaseTransition(dragged, released);
            release.isGuardOK = (event) => {
                const tgt = event.currentTarget;
                return event.button === this.buttonToCheck && (!(tgt instanceof Element) || !tgt.classList.contains("ioDwellSpring"));
            };
            release.action = (event) => {
                dataHandler.onRelease(event);
            };
            this.configureCancellation(pressed, dragged, cancelled);
        }
        configureCancellation(pressed, dragged, cancelled) {
            if (this.cancellable) {
                new EscapeKeyPressureTransition(pressed, cancelled);
                new EscapeKeyPressureTransition(dragged, cancelled);
                const releaseCancel = new ReleaseTransition(dragged, cancelled);
                releaseCancel.isGuardOK = (event) => {
                    const tgt = event.currentTarget;
                    return event.button === this.buttonToCheck && tgt instanceof Element && tgt.classList.contains("ioDwellSpring");
                };
            }
        }
        reinit() {
            super.reinit();
            this.buttonToCheck = undefined;
        }
    }
    class DnD extends InteractionBase {
        constructor(cancellable) {
            super(new DnDFSM(cancellable), new SrcTgtPointsDataImpl());
            this.handler = {
                "onPress": (evt) => {
                    this._data.copySrc(evt);
                    this._data.copyTgt(evt);
                },
                "onDrag": (evt) => {
                    this._data.copyTgt(evt);
                },
                "onRelease": (evt) => {
                    this._data.copyTgt(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class SubFSMTransition extends TransitionBase {
        constructor(srcState, tgtState, fsm) {
            super(srcState, tgtState);
            this.subFSM = fsm;
            this.subFSM.inner = true;
            this.subFSMHandler = {
                "fsmStarts": () => {
                    this.src.exit();
                },
                "fsmUpdates": () => {
                    this.src.fsm.onUpdating();
                },
                "fsmStops": () => {
                    this.action(undefined);
                    this.unsetFSMHandler();
                    if (this.tgt instanceof TerminalState) {
                        this.tgt.enter();
                        return;
                    }
                    if (this.tgt instanceof CancellingState) {
                        this.cancelsFSM();
                        return;
                    }
                    if (isOutputStateType(this.tgt)) {
                        this.src.fsm.currentState = this.tgt;
                        this.tgt.enter();
                    }
                },
                "fsmCancels": () => {
                    this.cancelsFSM();
                }
            };
        }
        setUpFSMHandler() {
            this.subFSM.addHandler(this.subFSMHandler);
            this.src.fsm.currentSubFSM = this.subFSM;
            this.subStateSubscription = this.subFSM.currentStateObservable
                .subscribe(value => {
                this.src.fsm.currentState = value[1];
            });
        }
        unsetFSMHandler() {
            var _a;
            this.subFSM.removeHandler(this.subFSMHandler);
            this.src.fsm.currentSubFSM = undefined;
            (_a = this.subStateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        }
        cancelsFSM() {
            this.unsetFSMHandler();
            this.src.fsm.onCancelling();
        }
        execute(event) {
            const transition = this.findTransition(event);
            if (transition === undefined) {
                return undefined;
            }
            this.src.fsm.stopCurrentTimeout();
            this.setUpFSMHandler();
            this.subFSM.process(event);
            return transition.target;
        }
        accept(event) {
            return this.findTransition(event) !== undefined;
        }
        isGuardOK(event) {
            var _a, _b;
            return (_b = (_a = this.findTransition(event)) === null || _a === void 0 ? void 0 : _a.isGuardOK(event)) !== null && _b !== void 0 ? _b : false;
        }
        findTransition(event) {
            return this.subFSM
                .initState
                .transitions
                .find(tr => tr.accept(event));
        }
        getAcceptedEvents() {
            if (this.subFSM.initState.transitions.length === 0) {
                return [];
            }
            return this.subFSM.initState
                .transitions
                .map(tr => tr.getAcceptedEvents())
                .reduce((a, b) => [...a, ...b]);
        }
        uninstall() {
            this.unsetFSMHandler();
            this.subFSM.uninstall();
        }
    }

    class DoubleClickFSM extends FSMImpl {
        constructor() {
            super();
            this.firstClickFSM = new ClickFSM();
            this.sndClickFSM = new ClickFSM();
        }
        static getTimeGap() {
            return DoubleClickFSM.timeGap;
        }
        static setTimeGap(timeGapBetweenClicks) {
            if (timeGapBetweenClicks > 0) {
                DoubleClickFSM.timeGap = timeGapBetweenClicks;
            }
        }
        set log(log) {
            super.log = log;
            this.firstClickFSM.log = log;
            this.sndClickFSM.log = log;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            this.firstClickFSM.buildFSM();
            this.sndClickFSM.buildFSM();
            const dbleclicked = new TerminalState(this, "dbleclicked");
            const cancelled = new CancellingState(this, "cancelled");
            const clicked = new StdState(this, "clicked");
            this.addState(clicked);
            this.addState(dbleclicked);
            this.addState(cancelled);
            this.startingState = dbleclicked;
            const firstClick = new SubFSMTransition(this.initState, clicked, this.firstClickFSM);
            firstClick.action = () => {
                this.setCheckButton(this.firstClickFSM.getCheckButton());
            };
            const move = new MoveTransition(clicked, cancelled);
            move.isGuardOK = (event) => (this.checkButton === undefined || event instanceof MouseEvent &&
                event.button === this.checkButton);
            new TimeoutTransition(clicked, cancelled, DoubleClickFSM.timeGapSupplier);
            new SubFSMTransition(clicked, dbleclicked, this.sndClickFSM);
        }
        setCheckButton(buttonToCheck) {
            if (this.checkButton === undefined) {
                this.checkButton = buttonToCheck;
            }
            this.sndClickFSM.setCheckButton(buttonToCheck);
        }
        getCheckButton() {
            var _a;
            return (_a = this.checkButton) !== null && _a !== void 0 ? _a : -1;
        }
        fullReinit() {
            super.fullReinit();
            this.firstClickFSM.fullReinit();
            this.sndClickFSM.fullReinit();
        }
        reinit() {
            super.reinit();
            this.firstClickFSM.reinit();
            this.sndClickFSM.reinit();
            this.checkButton = undefined;
        }
    }
    DoubleClickFSM.timeGap = 300;
    DoubleClickFSM.timeGapSupplier = () => DoubleClickFSM.getTimeGap();
    class DoubleClick extends InteractionBase {
        constructor(fsm, data) {
            super(fsm !== null && fsm !== void 0 ? fsm : new DoubleClickFSM(), data !== null && data !== void 0 ? data : new PointDataImpl());
            new Click(this.fsm.firstClickFSM, this._data);
            this.fsm.buildFSM(this);
        }
    }

    class DragLockFSM extends FSMImpl {
        constructor() {
            super();
            this.firstDbleClick = new DoubleClickFSM();
            this.sndDbleClick = new DoubleClickFSM();
        }
        set log(log) {
            super.log = log;
            this.firstDbleClick.log = log;
            this.sndDbleClick.log = log;
        }
        reinit() {
            super.reinit();
            this.firstDbleClick.reinit();
            this.sndDbleClick.reinit();
            this.checkButton = undefined;
        }
        fullReinit() {
            super.fullReinit();
            this.firstDbleClick.fullReinit();
            this.sndDbleClick.fullReinit();
        }
        getDataHandler() {
            return this.dataHandler;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const cancelDbleClick = new DoubleClickFSM();
            this.firstDbleClick.buildFSM();
            this.sndDbleClick.buildFSM();
            cancelDbleClick.buildFSM();
            const dropped = new TerminalState(this, "dropped");
            const cancelled = new CancellingState(this, "cancelled");
            const locked = new StdState(this, "locked");
            const moved = new StdState(this, "moved");
            this.addState(dropped);
            this.addState(cancelled);
            this.addState(locked);
            this.addState(moved);
            const subTr = new SubFSMTransition(this.initState, locked, this.firstDbleClick);
            subTr.action = () => {
                const checkButton = this.firstDbleClick.getCheckButton();
                this.sndDbleClick.setCheckButton(checkButton);
                cancelDbleClick.setCheckButton(checkButton);
                dataHandler.onFirstDbleClick();
            };
            new SubFSMTransition(locked, cancelled, cancelDbleClick);
            const moveAction = (event) => {
                var _a;
                (_a = this.getDataHandler()) === null || _a === void 0 ? void 0 : _a.onMove(event);
            };
            const movelock = new MoveTransition(locked, moved);
            movelock.action = moveAction;
            const move = new MoveTransition(moved, moved);
            move.action = moveAction;
            new EscapeKeyPressureTransition(locked, cancelled);
            new EscapeKeyPressureTransition(moved, cancelled);
            new SubFSMTransition(moved, dropped, this.sndDbleClick);
        }
    }
    class DragLock extends InteractionBase {
        constructor() {
            super(new DragLockFSM(), new SrcTgtPointsDataImpl());
            const handler = {
                "onMove": (evt) => {
                    this.data.tgt.copy(evt);
                },
                "onFirstDbleClick": () => {
                    this.data.tgt.copy(this.data.src);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            new DoubleClick(this.fsm.firstDbleClick, this.data.src);
            new DoubleClick(this.fsm.sndDbleClick, this.data.tgt);
            this.fsm.buildFSM(handler);
        }
    }

    class HyperLinkTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event.target !== null && isHyperLink(event.target);
        }
        getAcceptedEvents() {
            return ["click", "auxclick"];
        }
    }

    class HyperLinkClickedFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const clicked = new TerminalState(this, "clicked");
            this.addState(clicked);
            const tr = new HyperLinkTransition(this.initState, clicked);
            tr.action = (event) => {
                dataHandler.initToClickedHandler(event);
            };
        }
    }
    class HyperLinkClicked extends InteractionBase {
        constructor() {
            super(new HyperLinkClickedFSM(), new WidgetDataImpl());
            this.handler = {
                "initToClickedHandler": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
        onNewNodeRegistered(node) {
            if (isHyperLink(node)) {
                this.registerActionHandlerInput(node);
            }
        }
        onNodeUnregistered(node) {
            if (isHyperLink(node)) {
                this.unregisterActionHandlerInput(node);
            }
        }
    }

    class KeyPressedFSM extends FSMImpl {
        constructor(modifierAccepted) {
            super();
            this.modifiersAccepted = modifierAccepted;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const pressed = new TerminalState(this, "pressed");
            this.addState(pressed);
            const kp = new KeyPressureTransition(this.initState, pressed);
            kp.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onKeyPressed(event);
            };
            kp.isGuardOK = (event) => this.modifiersAccepted ||
                (!event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey);
        }
        reinit() {
            super.reinit();
        }
    }
    class KeyPressed extends InteractionBase {
        constructor(modifierAccepted, fsm) {
            super(fsm !== null && fsm !== void 0 ? fsm : new KeyPressedFSM(modifierAccepted), new KeyDataImpl());
            this.handler = {
                "onKeyPressed": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class KeyReleaseTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return isKeyUpEvent(event);
        }
        getAcceptedEvents() {
            return ["keyup"];
        }
    }

    class KeysPressedFSM extends FSMImpl {
        constructor() {
            super();
            this.currentCodes = [];
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const pressed = new StdState(this, "pressed");
            const ended = new TerminalState(this, "ended");
            this.addState(pressed);
            this.addState(ended);
            const actionkp = (event) => {
                this.currentCodes.push(event.code);
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onKeyPressed(event);
            };
            const kpInit = new KeyPressureTransition(this.initState, pressed);
            kpInit.action = actionkp;
            const kpPressed = new KeyPressureTransition(pressed, pressed);
            kpPressed.action = actionkp;
            const kr = new KeyReleaseTransition(pressed, ended);
            kr.isGuardOK = (event) => this.currentCodes.find(value => value === event.code) !== undefined;
        }
        reinit() {
            this.currentCodes.length = 0;
            super.reinit();
        }
    }
    class KeysPressed extends InteractionBase {
        constructor() {
            super(new KeysPressedFSM(), new KeysDataImpl());
            this.handler = {
                "onKeyPressed": (event) => {
                    this._data.addKey(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class KeysTypedFSM extends FSMImpl {
        constructor() {
            super();
        }
        static getTimeGap() {
            return KeysTypedFSM.timeGap;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const keyup = new StdState(this, "keyup");
            const timeouted = new TerminalState(this, "timeouted");
            this.addState(keyup);
            this.addState(timeouted);
            const action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onKeyTyped(event);
            };
            const keyupInit = new KeyReleaseTransition(this.initState, keyup);
            const keyupSeq = new KeyReleaseTransition(keyup, keyup);
            keyupInit.action = action;
            keyupSeq.action = action;
            new TimeoutTransition(keyup, timeouted, KeysTypedFSM.timeGapSupplier);
        }
    }
    KeysTypedFSM.timeGap = 1000;
    KeysTypedFSM.timeGapSupplier = () => KeysTypedFSM.getTimeGap();
    class KeysTyped extends InteractionBase {
        constructor(logger) {
            super(new KeysTypedFSM(), new KeysDataImpl(), logger);
            const handler = {
                "onKeyTyped": (event) => {
                    this._data.addKey(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(handler);
        }
    }

    class KeyTypedFSM extends FSMImpl {
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const pressed = new StdState(this, "pressed");
            const typed = new TerminalState(this, "typed");
            this.startingState = typed;
            this.addState(pressed);
            this.addState(typed);
            const kp = new KeyPressureTransition(this.initState, pressed);
            kp.action = (event) => {
                this.checkKey = event.code;
            };
            const kr = new KeyReleaseTransition(pressed, typed);
            kr.isGuardOK = (event) => this.checkKey === undefined || event.code === this.checkKey;
            kr.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onKeyTyped(event);
            };
        }
        reinit() {
            super.reinit();
            this.checkKey = undefined;
        }
    }
    class KeyTyped extends InteractionBase {
        constructor() {
            super(new KeyTypedFSM(), new KeyDataImpl());
            this.handler = {
                "onKeyTyped": (event) => {
                    this._data.copy(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class ScrollTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return isScrollEvent(event);
        }
        getAcceptedEvents() {
            return ["scroll"];
        }
    }

    class ScrollDataImpl extends InteractionDataBase {
        constructor() {
            super(...arguments);
            this.scrollXData = 0;
            this.scrollYData = 0;
        }
        flush() {
            super.flush();
            this.scrollXData = 0;
            this.scrollYData = 0;
        }
        get scrollX() {
            return this.scrollXData;
        }
        get scrollY() {
            return this.scrollYData;
        }
        setScrollData(event) {
            super.copy(event);
            if (event.view !== null) {
                this.scrollXData = event.view.scrollX;
                this.scrollYData = event.view.scrollY;
            }
        }
    }

    class ScrollFSM extends FSMImpl {
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const scrolled = new TerminalState(this, "scrolled");
            this.addState(scrolled);
            const scroll = new ScrollTransition(this.initState, scrolled);
            scroll.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.initToScroll(event);
            };
        }
    }
    class Scroll extends InteractionBase {
        constructor() {
            super(new ScrollFSM(), new ScrollDataImpl());
            this.handler = {
                "initToScroll": (event) => {
                    this._data.setScrollData(event);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class LongPressFSM extends FSMImpl {
        constructor(duration) {
            super();
            if (duration <= 0) {
                throw new Error("Incorrect duration");
            }
            this.duration = duration;
            this.currentButton = undefined;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const down = new StdState(this, "down");
            const releasedTooEarly = new CancellingState(this, "releasedEarly");
            const timeouted = new TerminalState(this, "timeouted");
            this.addState(down);
            this.addState(releasedTooEarly);
            this.addState(timeouted);
            const press = new PressureTransition(this.initState, down);
            press.action = (event) => {
                this.currentButton = event.button;
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.press(event);
            };
            const release = new ReleaseTransition(down, releasedTooEarly);
            release.isGuardOK = (event) => event.button === this.currentButton;
            new TimeoutTransition(down, timeouted, () => this.duration);
        }
        reinit() {
            super.reinit();
            this.currentButton = undefined;
        }
    }
    class LongPress extends InteractionBase {
        constructor(duration) {
            super(new LongPressFSM(duration), new PointDataImpl());
            this.handler = {
                "press": (evt) => {
                    this._data.copy(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class PointsDataImpl {
        constructor() {
            this.pointsData = [];
        }
        get points() {
            return [...this.pointsData];
        }
        get currentPosition() {
            return this.currentPositionData;
        }
        set currentPosition(position) {
            this.currentPositionData = position;
        }
        get lastButton() {
            var _a;
            return (_a = peek(this.pointsData)) === null || _a === void 0 ? void 0 : _a.button;
        }
        addPoint(ptData) {
            this.pointsData.push(ptData);
        }
        flush() {
            this.pointsData.length = 0;
            this.currentPositionData = undefined;
        }
    }

    class ClicksFSM extends FSMImpl {
        constructor(nbClicks) {
            super();
            if (nbClicks <= 0) {
                throw new Error("The number of clicks must be greater than 1");
            }
            if (nbClicks === 1) {
                throw new Error("For a number of clicks that equals 1, use the Click interaction");
            }
            this.countClicks = 0;
            this.nbClicks = nbClicks;
        }
        reinit() {
            super.reinit();
            this.countClicks = 0;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const clicked = new StdState(this, "clicked");
            const ended = new TerminalState(this, "ended");
            const timeouted = new CancellingState(this, "timeouted");
            this.addState(clicked);
            this.addState(ended);
            this.addState(timeouted);
            const firstclick = new ClickTransition(this.initState, clicked);
            firstclick.action = (event) => {
                this.countClicks++;
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.click(event);
            };
            const newclick = new ClickTransition(clicked, clicked);
            newclick.action = (event) => {
                this.countClicks++;
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.click(event);
            };
            newclick.isGuardOK = (_event) => (this.countClicks + 1) < this.nbClicks;
            const finalclick = new ClickTransition(clicked, ended);
            finalclick.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.click(event);
            };
            finalclick.isGuardOK = (_event) => (this.countClicks + 1) === this.nbClicks;
            new TimeoutTransition(clicked, timeouted, () => 1000);
        }
    }
    class Clicks extends InteractionBase {
        constructor(numberClicks) {
            super(new ClicksFSM(numberClicks), new PointsDataImpl());
            this.handler = {
                "click": (evt) => {
                    const pt = new PointDataImpl();
                    pt.copy(evt);
                    this._data.addPoint(pt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class MouseoutTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["mouseout"];
        }
    }

    class MouseleaveTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["mouseleave"];
        }
    }

    class MouseoutFSM extends FSMImpl {
        constructor(withBubbling) {
            super();
            this.withBubbling = withBubbling;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const exited = new TerminalState(this, "exited");
            this.addState(exited);
            let exit;
            if (this.withBubbling) {
                exit = new MouseoutTransition(this.initState, exited);
            }
            else {
                exit = new MouseleaveTransition(this.initState, exited);
            }
            exit.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onExit(event);
            };
        }
    }
    class Mouseout extends InteractionBase {
        constructor(withBubbling) {
            super(new MouseoutFSM(withBubbling), new PointDataImpl());
            this.handler = {
                "onExit": (evt) => {
                    this._data.copy(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class MouseoverTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["mouseover"];
        }
    }

    class MouseenterTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["mouseenter"];
        }
    }

    class MouseoverFSM extends FSMImpl {
        constructor(withBubbling) {
            super();
            this.withBubbling = withBubbling;
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const entered = new TerminalState(this, "entered");
            this.addState(entered);
            let enter;
            if (this.withBubbling) {
                enter = new MouseoverTransition(this.initState, entered);
            }
            else {
                enter = new MouseenterTransition(this.initState, entered);
            }
            enter.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onEnter(event);
            };
        }
    }
    class Mouseover extends InteractionBase {
        constructor(withBubbling) {
            super(new MouseoverFSM(withBubbling), new PointDataImpl());
            this.handler = {
                "onEnter": (evt) => {
                    this._data.copy(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class MousemoveTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        accept(event) {
            return event instanceof MouseEvent && isEventType(event.type) && this.getAcceptedEvents().includes(event.type);
        }
        getAcceptedEvents() {
            return ["mousemove"];
        }
    }

    class MousemoveFSM extends FSMImpl {
        constructor() {
            super();
        }
        buildFSM(dataHandler) {
            if (this.states.length > 1) {
                return;
            }
            super.buildFSM(dataHandler);
            const moved = new TerminalState(this, "moved");
            this.addState(moved);
            const move = new MousemoveTransition(this.initState, moved);
            move.action = (event) => {
                dataHandler === null || dataHandler === void 0 ? void 0 : dataHandler.onMove(event);
            };
        }
    }
    class Mousemove extends InteractionBase {
        constructor() {
            super(new MousemoveFSM(), new PointDataImpl());
            this.handler = {
                "onMove": (evt) => {
                    this._data.copy(evt);
                },
                "reinitData": () => {
                    this.reinitData();
                }
            };
            this.fsm.buildFSM(this.handler);
        }
    }

    class CommandBase {
        constructor() {
            this.status = exports.CmdStatus.created;
        }
        flush() {
            this.status = exports.CmdStatus.flushed;
        }
        createMemento() {
        }
        execute() {
            let ok;
            if ((this.status === exports.CmdStatus.created || this.status === exports.CmdStatus.executed) && this.canExecute()) {
                if (this.status === exports.CmdStatus.created) {
                    this.createMemento();
                }
                ok = true;
                const result = this.execution();
                if (result instanceof Promise) {
                    return result
                        .then(() => {
                        this.status = exports.CmdStatus.executed;
                        return true;
                    })
                        .catch(() => {
                        this.status = exports.CmdStatus.executed;
                        return false;
                    });
                }
                this.status = exports.CmdStatus.executed;
            }
            else {
                ok = false;
            }
            return ok;
        }
        hadEffect() {
            return this.isDone();
        }
        done() {
            if (this.status === exports.CmdStatus.created || this.status === exports.CmdStatus.executed) {
                this.status = exports.CmdStatus.done;
            }
        }
        isDone() {
            return this.status === exports.CmdStatus.done;
        }
        cancel() {
            this.status = exports.CmdStatus.cancelled;
        }
        getStatus() {
            return this.status;
        }
        canExecute() {
            return true;
        }
    }

    class Undo extends CommandBase {
        constructor(undoHistory) {
            super();
            this.history = undoHistory;
        }
        canExecute() {
            return this.history.getLastUndo() !== undefined;
        }
        execution() {
            this.history.undo();
        }
    }

    class Redo extends CommandBase {
        constructor(undoHistory) {
            super();
            this.history = undoHistory;
        }
        canExecute() {
            return this.history.getLastRedo() !== undefined;
        }
        execution() {
            this.history.redo();
        }
    }

    class UndoHistoryImpl extends UndoHistory {
        constructor() {
            super();
            this.sizeMax = 0;
            this.undos = [];
            this.redos = [];
            this.sizeMax = 20;
            this.undoPublisher = new Subject();
            this.redoPublisher = new Subject();
        }
        undosObservable() {
            return this.undoPublisher;
        }
        redosObservable() {
            return this.redoPublisher;
        }
        clear() {
            if (this.undos.length > 0) {
                this.undos.length = 0;
                this.undoPublisher.next(undefined);
            }
            this.clearRedo();
        }
        clearRedo() {
            if (this.redos.length > 0) {
                this.redos.length = 0;
                this.redoPublisher.next(undefined);
            }
        }
        add(undoable) {
            if (this.sizeMax > 0) {
                if (this.undos.length === this.sizeMax) {
                    this.undos.shift();
                }
                this.undos.push(undoable);
                this.undoPublisher.next(undoable);
                this.clearRedo();
            }
        }
        undo() {
            const undoable = this.undos.pop();
            if (undoable !== undefined) {
                undoable.undo();
                this.redos.push(undoable);
                this.undoPublisher.next(this.getLastUndo());
                this.redoPublisher.next(undoable);
            }
        }
        redo() {
            const undoable = this.redos.pop();
            if (undoable !== undefined) {
                undoable.redo();
                this.undos.push(undoable);
                this.undoPublisher.next(undoable);
                this.redoPublisher.next(this.getLastRedo());
            }
        }
        getLastUndoMessage() {
            var _a;
            return (_a = peek(this.undos)) === null || _a === void 0 ? void 0 : _a.getUndoName();
        }
        getLastRedoMessage() {
            var _a;
            return (_a = peek(this.redos)) === null || _a === void 0 ? void 0 : _a.getUndoName();
        }
        getLastOrEmptyUndoMessage() {
            var _a;
            return (_a = this.getLastUndoMessage()) !== null && _a !== void 0 ? _a : "";
        }
        getLastOrEmptyRedoMessage() {
            var _a;
            return (_a = this.getLastRedoMessage()) !== null && _a !== void 0 ? _a : "";
        }
        getLastUndo() {
            return peek(this.undos);
        }
        getLastRedo() {
            return peek(this.redos);
        }
        getSizeMax() {
            return this.sizeMax;
        }
        setSizeMax(max) {
            if (max >= 0) {
                const removed = this.undos.splice(0, this.undos.length - max);
                if (this.undos.length === 0 && removed.length > 0) {
                    this.undoPublisher.next(undefined);
                }
                this.sizeMax = max;
            }
        }
        getUndo() {
            return this.undos;
        }
        getRedo() {
            return this.redos;
        }
    }

    class LoggingData {
        constructor(date, msg, level, name, type, sessionID, stack, frontVersion) {
            this.date = date;
            this.msg = msg;
            this.level = level;
            this.name = name;
            this.type = type;
            this.sessionID = sessionID;
            this.stack = stack;
            this.frontVersion = frontVersion;
        }
        toString() {
            const withstack = this.stack === undefined ? "" : `, ${this.stack}`;
            const withversion = this.frontVersion === undefined ? "" : ` ${this.frontVersion}`;
            return `${this.type}${withversion} [${this.sessionID}] [${this.level}:${this.name}] at ${this.date}: '${this.msg}'${withstack}`;
        }
    }
    class UsageLog {
        constructor(name, sessionID, date, frontVersion) {
            this.name = name;
            this.sessionID = sessionID;
            this.date = date;
            this.frontVersion = frontVersion;
            this.duration = 0;
            this.cancelled = false;
        }
        toString() {
            const withversion = this.frontVersion === undefined ? "" : ` v:${this.frontVersion}`;
            return `Usage.${withversion} id:${this.sessionID} binding:${this.name} ` +
                `date:${this.date} duration:${this.duration} cancelled:${String(this.cancelled)}`;
        }
    }
    class LoggerImpl {
        constructor(version) {
            this.frontVersion = version;
            this.ongoingBindings = [];
            this.serverAddress = undefined;
            this.writeConsole = true;
            this.sessionID = Date.now().toString(36) + Math.random().toString(36)
                .substr(2, 6);
        }
        processLoggingData(data) {
            if (this.writeConsole) {
                console.log(data.toString());
            }
            if (this.serverAddress !== undefined && data.type === "ERR") {
                const rq = new XMLHttpRequest();
                rq.open("POST", `${this.serverAddress}/api/err`, true);
                rq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                rq.send(JSON.stringify(data));
            }
        }
        formatError(ex) {
            var _a;
            if (ex instanceof Error) {
                return `${ex.message} ${(_a = ex.stack) !== null && _a !== void 0 ? _a : ""}`;
            }
            return String(ex);
        }
        logBindingErr(msg, ex, bindingName = "") {
            this.processLoggingData(new LoggingData(performance.now(), msg, "binding", bindingName, "ERR", this.sessionID, this.formatError(ex), this.frontVersion));
        }
        logBindingMsg(msg, bindingName = "") {
            this.processLoggingData(new LoggingData(performance.now(), msg, "binding", bindingName, "INFO", this.sessionID, undefined, this.frontVersion));
        }
        logCmdErr(msg, ex, cmdName = "") {
            this.processLoggingData(new LoggingData(performance.now(), msg, "command", cmdName, "ERR", this.sessionID, this.formatError(ex), this.frontVersion));
        }
        logCmdMsg(msg, cmdName = "") {
            this.processLoggingData(new LoggingData(performance.now(), msg, "command", cmdName, "INFO", this.sessionID, undefined, this.frontVersion));
        }
        logInteractionErr(msg, ex, interactionName = "") {
            this.processLoggingData(new LoggingData(performance.now(), msg, "interaction", interactionName, "ERR", this.sessionID, this.formatError(ex), this.frontVersion));
        }
        logInteractionMsg(msg, interactionName = "") {
            this.processLoggingData(new LoggingData(performance.now(), msg, "interaction", interactionName, "INFO", this.sessionID, undefined, this.frontVersion));
        }
        logBindingStart(bindingName) {
            this.ongoingBindings.push(new UsageLog(bindingName, this.sessionID, performance.now(), this.frontVersion));
        }
        logBindingEnd(bindingName, cancelled) {
            const logs = this.ongoingBindings.filter(d => bindingName.includes(d.name));
            this.ongoingBindings = this.ongoingBindings.filter(d => !logs.includes(d));
            if (logs.length === 1) {
                const log = logs[0];
                log.name = bindingName;
                log.duration = performance.now() - log.date;
                log.cancelled = cancelled;
                if (this.writeConsole) {
                    console.log(log.toString());
                }
                if (this.serverAddress !== undefined) {
                    const rq = new XMLHttpRequest();
                    rq.open("POST", `${this.serverAddress}/api/usage`, true);
                    rq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    rq.send(JSON.stringify(log));
                }
            }
        }
    }

    class BindingsImpl extends Bindings {
        constructor(history, logger) {
            super();
            this.undoHistoryData = history !== null && history !== void 0 ? history : new UndoHistoryImpl();
            this.logger = logger !== null && logger !== void 0 ? logger : new LoggerImpl();
        }
        get undoHistory() {
            return this.undoHistoryData;
        }
        nodeBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer);
        }
        buttonBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new ButtonPressed());
        }
        checkboxBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new BoxChecked());
        }
        colorPickerBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new ColorPicked());
        }
        comboBoxBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new ComboBoxSelected());
        }
        spinnerBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new SpinnerChanged());
        }
        dateBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new DatePicked());
        }
        hyperlinkBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new HyperLinkClicked());
        }
        textInputBinder(timeout) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new TextInputChanged(timeout));
        }
        touchDnDBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new TouchDnD());
        }
        multiTouchBinder(nbTouches) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new MultiTouch(nbTouches));
        }
        tapBinder(nbTap) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Tap(nbTap));
        }
        longTouchBinder(duration) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new LongTouch(duration));
        }
        swipeBinder(horizontal, minVelocity, minLength, pxTolerance) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Swipe(horizontal, minVelocity, minLength, pxTolerance));
        }
        panBinder(horizontal, minLength, pxTolerance) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Pan(horizontal, minLength, pxTolerance));
        }
        clickBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Click());
        }
        dbleClickBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new DoubleClick());
        }
        pressBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Press());
        }
        longPressBinder(duration) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new LongPress(duration));
        }
        clicksBinder(nbClicks) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Clicks(nbClicks));
        }
        mouseoutBinder(withBubbling) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Mouseout(withBubbling));
        }
        mouseoverBinder(withBubbling) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Mouseover(withBubbling));
        }
        mousemoveBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Mousemove());
        }
        scrollBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new Scroll());
        }
        dndBinder(cancellable) {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new DnD(cancellable));
        }
        dragLockBinder() {
            return new UpdateBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new DragLock());
        }
        keyPressBinder(modifierAccepted) {
            return new KeysBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new KeyPressed(modifierAccepted));
        }
        keysPressBinder() {
            return new KeysBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new KeysPressed());
        }
        keysTypeBinder() {
            return new KeysBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new KeysTyped());
        }
        keyTypeBinder() {
            return new KeysBinder(this.undoHistory, this.logger, this.observer)
                .usingInteraction(() => new KeyTyped());
        }
        undoRedoBinder(undo, redo) {
            return [
                this.buttonBinder()
                    .on(undo)
                    .toProduce(() => new Undo(this.undoHistory))
                    .bind(),
                this.buttonBinder()
                    .on(redo)
                    .toProduce(() => new Redo(this.undoHistory))
                    .bind()
            ];
        }
        clear() {
            var _a;
            (_a = this.observer) === null || _a === void 0 ? void 0 : _a.clearObservedBindings();
            this.undoHistory.clear();
        }
        setBindingObserver(obs) {
            var _a;
            (_a = this.observer) === null || _a === void 0 ? void 0 : _a.clearObservedBindings();
            this.observer = obs;
        }
    }

    class AnonCmd extends CommandBase {
        constructor(fct) {
            super();
            this.exec = fct;
        }
        canExecute() {
            return true;
        }
        execution() {
            this.exec();
        }
    }

    class UndoableCommand extends CommandBase {
        getUndoName() {
            return this.constructor.name;
        }
        getVisualSnapshot() {
            return undefined;
        }
    }

    class RedoNTimes extends CommandBase {
        constructor(undoHistory, numberOfRedos) {
            super();
            this.history = undoHistory;
            this.numberOfRedos = numberOfRedos;
        }
        canExecute() {
            return this.history.getRedo().length >= this.numberOfRedos;
        }
        execution() {
            for (let i = 0; i < this.numberOfRedos; i++) {
                this.history.redo();
            }
        }
    }

    class SetProperty extends UndoableCommand {
        constructor(obj, prop, newvalue) {
            super();
            this.obj = obj;
            this.prop = prop;
            this.newvalue = newvalue;
        }
        createMemento() {
            this.mementoValue = this.obj[this.prop];
        }
        execution() {
            this.obj[this.prop] = this.newvalue;
        }
        redo() {
            this.execution();
        }
        undo() {
            this.obj[this.prop] = this.mementoValue;
        }
        getUndoName() {
            return `Set ${String(this.prop)} value`;
        }
    }

    class SetProperties extends UndoableCommand {
        constructor(obj, newvalues) {
            super();
            this.obj = obj;
            this.compositeCmds = [];
            this.newvalues = newvalues;
        }
        get newvalues() {
            return this._newvalues;
        }
        set newvalues(v) {
            this._newvalues = v;
            for (const key in v) {
                this.compositeCmds.push(new SetProperty(this.obj, key, v[key]));
            }
        }
        execute() {
            this.compositeCmds.forEach(cmd => {
                void cmd.execute();
            });
            return super.execute();
        }
        execution() {
        }
        redo() {
            this.compositeCmds.forEach(cmd => {
                cmd.redo();
            });
        }
        undo() {
            this.compositeCmds.forEach(cmd => {
                cmd.undo();
            });
        }
    }

    class TransferArrayItem extends UndoableCommand {
        constructor(srcArray, tgtArray, srcIndex, tgtIndex, cmdName) {
            super();
            this._srcArray = srcArray;
            this._tgtArray = tgtArray;
            this._srcIndex = srcIndex;
            this._tgtIndex = tgtIndex;
            this.cmdName = cmdName;
        }
        execution() {
            this.redo();
        }
        canExecute() {
            return (this._srcIndex >= 0 && this._srcIndex < this._srcArray.length) &&
                (this._tgtIndex >= 0 && this._tgtIndex <= this._tgtArray.length);
        }
        getUndoName() {
            return this.cmdName;
        }
        redo() {
            const elt = this._srcArray[this._srcIndex];
            this._srcArray.splice(this._srcIndex, 1);
            this._tgtArray.splice(this._tgtIndex, 0, elt);
        }
        undo() {
            const elt = this._tgtArray[this._tgtIndex];
            this._tgtArray.splice(this._tgtIndex, 1);
            this._srcArray.splice(this._srcIndex, 0, elt);
        }
        get srcArray() {
            return this._srcArray;
        }
        set srcArray(value) {
            this._srcArray = value;
        }
        get tgtArray() {
            return this._tgtArray;
        }
        set tgtArray(value) {
            this._tgtArray = value;
        }
        get srcIndex() {
            return this._srcIndex;
        }
        set srcIndex(value) {
            this._srcIndex = value;
        }
        get tgtIndex() {
            return this._tgtIndex;
        }
        set tgtIndex(value) {
            this._tgtIndex = value;
        }
    }

    class UndoNTimes extends CommandBase {
        constructor(undoHistory, numberOfUndos) {
            super();
            this.history = undoHistory;
            this.numberOfUndos = numberOfUndos;
        }
        canExecute() {
            return this.history.getUndo().length >= this.numberOfUndos;
        }
        execution() {
            for (let i = 0; i < this.numberOfUndos; i++) {
                this.history.undo();
            }
        }
    }

    class WidgetTransition extends TransitionBase {
        constructor(srcState, tgtState) {
            super(srcState, tgtState);
        }
        getWidget() {
            return this.widget;
        }
        setWidget(widget) {
            this.widget = widget;
        }
    }

    class FittsLawDataImpl {
        constructor(t, w, h, d) {
            this.t = t;
            this.w = w;
            this.h = h;
            this.d = d;
        }
        getID(we) {
            return Math.log2((this.d / (we !== null && we !== void 0 ? we : this.w)) + 1);
        }
    }
    class FittsLaw {
        constructor(bSrc, bTgt, target) {
            this.data = [];
            this.providedTarget = target;
            this.handler = (evt) => {
                var _a;
                if (this._startX === undefined) {
                    this._startX = evt.screenX;
                    this._startY = evt.screenY;
                }
                this._target = (_a = this.providedTarget) !== null && _a !== void 0 ? _a : (evt.target instanceof Element ? evt.target : undefined);
            };
            this.obsSrc = bSrc.produces.subscribe(() => {
                this.reinit();
                document.body.addEventListener("mousemove", this.handler);
                const t0 = performance.now();
                const obsTgt = bTgt.produces.subscribe(() => {
                    var _a, _b, _c, _d;
                    const t1 = performance.now();
                    this.data.push(new FittsLawDataImpl(t1 - t0, (_b = (_a = this._target) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : NaN, (_d = (_c = this._target) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : NaN, this.computeD()));
                    obsTgt.unsubscribe();
                    document.body.removeEventListener("mousemove", this.handler);
                });
            });
        }
        computeD() {
            if (this._startX === undefined || this.providedTarget === undefined) {
                return NaN;
            }
            const a = this.providedTarget.clientLeft + this.providedTarget.clientWidth / 2 + this._startX;
            const b = this.providedTarget.clientTop + this.providedTarget.clientHeight / 2 + this._startY;
            return Math.sqrt(a ** 2 + b ** 2);
        }
        get we() {
            const ds = this.data.map(d => d.d);
            const mean = ds.reduce((a, b) => a + b) / ds.length;
            return Math.sqrt(ds.map(x => (x - mean) ** 2).reduce((a, b) => a + b) / ds.length);
        }
        getAB(effectiveTargetW = false) {
            const w = effectiveTargetW ? this.we : undefined;
            const xs = this.data.map(d => d.getID(w));
            const ys = this.data.map(d => d.t);
            let sumx = 0;
            let sumy = 0;
            let sumxy = 0;
            let sumxx = 0;
            let sumyy = 0;
            for (let i = 0; i < ys.length; i++) {
                sumx += xs[i];
                sumy += ys[i];
                sumxy += xs[i] * ys[i];
                sumxx += xs[i] ** 2;
                sumyy += ys[i] * ys[i];
            }
            const tmp = (ys.length * sumxy) - (sumx * sumy);
            const tmp2 = (ys.length * sumxx) - (sumx ** 2);
            const a = tmp / tmp2;
            const b = (sumy - a * sumx) / ys.length;
            const r = (tmp / Math.sqrt(tmp2 * (ys.length * sumyy - sumy ** 2))) ** 2;
            return [a, b, r];
        }
        uninstall() {
            this.obsSrc.unsubscribe();
            this.data.length = 0;
        }
        reinit() {
            this._startX = undefined;
            this._startY = undefined;
            this._target = undefined;
        }
    }

    exports.AnonBinding = AnonBinding;
    exports.AnonCmd = AnonCmd;
    exports.Binder = Binder;
    exports.BindingImpl = BindingImpl;
    exports.Bindings = Bindings;
    exports.BindingsContext = BindingsContext;
    exports.BindingsImpl = BindingsImpl;
    exports.BoxCheckPressedTransition = BoxCheckPressedTransition;
    exports.BoxChecked = BoxChecked;
    exports.ButtonPressed = ButtonPressed;
    exports.ButtonPressedTransition = ButtonPressedTransition;
    exports.CancelFSMException = CancelFSMException;
    exports.CancellingState = CancellingState;
    exports.Click = Click;
    exports.ClickFSM = ClickFSM;
    exports.ClickTransition = ClickTransition;
    exports.Clicks = Clicks;
    exports.ClicksFSM = ClicksFSM;
    exports.ColorPicked = ColorPicked;
    exports.ColorPickedTransition = ColorPickedTransition;
    exports.ComboBoxSelected = ComboBoxSelected;
    exports.ComboBoxTransition = ComboBoxTransition;
    exports.CommandBase = CommandBase;
    exports.ConcurrentFSM = ConcurrentFSM;
    exports.ConcurrentInteraction = ConcurrentInteraction;
    exports.DatePicked = DatePicked;
    exports.DatePickedTransition = DatePickedTransition;
    exports.DnD = DnD;
    exports.DoubleClick = DoubleClick;
    exports.DoubleClickFSM = DoubleClickFSM;
    exports.DragLock = DragLock;
    exports.EscapeKeyPressureTransition = EscapeKeyPressureTransition;
    exports.FSMImpl = FSMImpl;
    exports.FittsLaw = FittsLaw;
    exports.FittsLawDataImpl = FittsLawDataImpl;
    exports.HyperLinkClicked = HyperLinkClicked;
    exports.HyperLinkTransition = HyperLinkTransition;
    exports.InitState = InitState;
    exports.InteractionBase = InteractionBase;
    exports.InteractionDataBase = InteractionDataBase;
    exports.KeyDataImpl = KeyDataImpl;
    exports.KeyPressed = KeyPressed;
    exports.KeyPressedFSM = KeyPressedFSM;
    exports.KeyPressureTransition = KeyPressureTransition;
    exports.KeyReleaseTransition = KeyReleaseTransition;
    exports.KeyTyped = KeyTyped;
    exports.KeyTypedFSM = KeyTypedFSM;
    exports.KeysBinder = KeysBinder;
    exports.KeysDataImpl = KeysDataImpl;
    exports.KeysPressed = KeysPressed;
    exports.KeysPressedFSM = KeysPressedFSM;
    exports.KeysTyped = KeysTyped;
    exports.KeysTypedFSM = KeysTypedFSM;
    exports.LoggerImpl = LoggerImpl;
    exports.LoggingData = LoggingData;
    exports.LongPress = LongPress;
    exports.LongPressFSM = LongPressFSM;
    exports.LongTouch = LongTouch;
    exports.MouseenterTransition = MouseenterTransition;
    exports.MouseleaveTransition = MouseleaveTransition;
    exports.Mousemove = Mousemove;
    exports.MousemoveFSM = MousemoveFSM;
    exports.MousemoveTransition = MousemoveTransition;
    exports.Mouseout = Mouseout;
    exports.MouseoutFSM = MouseoutFSM;
    exports.MouseoutTransition = MouseoutTransition;
    exports.Mouseover = Mouseover;
    exports.MouseoverFSM = MouseoverFSM;
    exports.MouseoverTransition = MouseoverTransition;
    exports.MoveTransition = MoveTransition;
    exports.MultiTouch = MultiTouch;
    exports.MultiTouchDataImpl = MultiTouchDataImpl;
    exports.MustBeUndoableCmdError = MustBeUndoableCmdError;
    exports.OutputStateBase = OutputStateBase;
    exports.Pan = Pan;
    exports.PanFSM = PanFSM;
    exports.PointDataImpl = PointDataImpl;
    exports.PointingDataBase = PointingDataBase;
    exports.PointsDataImpl = PointsDataImpl;
    exports.Press = Press;
    exports.PressFSM = PressFSM;
    exports.PressureTransition = PressureTransition;
    exports.Redo = Redo;
    exports.RedoNTimes = RedoNTimes;
    exports.ReleaseTransition = ReleaseTransition;
    exports.Scroll = Scroll;
    exports.ScrollDataImpl = ScrollDataImpl;
    exports.ScrollFSM = ScrollFSM;
    exports.ScrollTransition = ScrollTransition;
    exports.SetProperties = SetProperties;
    exports.SetProperty = SetProperty;
    exports.SpinnerChanged = SpinnerChanged;
    exports.SpinnerChangedFSM = SpinnerChangedFSM;
    exports.SpinnerChangedTransition = SpinnerChangedTransition;
    exports.SrcTgtPointsDataImpl = SrcTgtPointsDataImpl;
    exports.SrcTgtTouchDataImpl = SrcTgtTouchDataImpl;
    exports.StateBase = StateBase;
    exports.StdState = StdState;
    exports.SubFSMTransition = SubFSMTransition;
    exports.Swipe = Swipe;
    exports.Tap = Tap;
    exports.TapDataImpl = TapDataImpl;
    exports.TerminalState = TerminalState;
    exports.TextInputChanged = TextInputChanged;
    exports.TextInputChangedTransition = TextInputChangedTransition;
    exports.TimeoutTransition = TimeoutTransition;
    exports.TouchDataImpl = TouchDataImpl;
    exports.TouchDnD = TouchDnD;
    exports.TouchDnDFSM = TouchDnDFSM;
    exports.TouchMoveTransition = TouchMoveTransition;
    exports.TouchPressureTransition = TouchPressureTransition;
    exports.TouchReleaseTransition = TouchReleaseTransition;
    exports.TransferArrayItem = TransferArrayItem;
    exports.TransitionBase = TransitionBase;
    exports.Undo = Undo;
    exports.UndoHistory = UndoHistory;
    exports.UndoHistoryImpl = UndoHistoryImpl;
    exports.UndoNTimes = UndoNTimes;
    exports.UndoableCommand = UndoableCommand;
    exports.UpdateBinder = UpdateBinder;
    exports.UsageLog = UsageLog;
    exports.WidgetDataImpl = WidgetDataImpl;
    exports.WidgetTransition = WidgetTransition;
    exports.eventTypes = eventTypes;
    exports.getTouch = getTouch;
    exports.isButton = isButton;
    exports.isCheckBox = isCheckBox;
    exports.isColorChoice = isColorChoice;
    exports.isComboBox = isComboBox;
    exports.isDatePicker = isDatePicker;
    exports.isEltRef = isEltRef;
    exports.isEventType = isEventType;
    exports.isHyperLink = isHyperLink;
    exports.isKeyDownEvent = isKeyDownEvent;
    exports.isKeyEvent = isKeyEvent;
    exports.isKeyUpEvent = isKeyUpEvent;
    exports.isMouseDownEvent = isMouseDownEvent;
    exports.isMouseEvent = isMouseEvent;
    exports.isOutputStateType = isOutputStateType;
    exports.isScrollEvent = isScrollEvent;
    exports.isSpinner = isSpinner;
    exports.isTextInput = isTextInput;
    exports.isTouchEvent = isTouchEvent;
    exports.isUndoableType = isUndoableType;
    exports.peek = peek;
    exports.remove = remove;
    exports.removeAt = removeAt;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=interacto.umd.js.map
