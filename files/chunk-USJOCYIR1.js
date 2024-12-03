var Kp = Object.defineProperty, Jp = Object.defineProperties;
var Xp = Object.getOwnPropertyDescriptors;
var sr = Object.getOwnPropertySymbols;
var Tu = Object.prototype.hasOwnProperty, Nu = Object.prototype.propertyIsEnumerable;
var Su = (e, t, n) => t in e ? Kp(e, t, {enumerable: !0, configurable: !0, writable: !0, value: n}) : e[t] = n,
    Ae = (e, t) => {
        for (var n in t ||= {}) Tu.call(t, n) && Su(e, n, t[n]);
        if (sr) for (var n of sr(t)) Nu.call(t, n) && Su(e, n, t[n]);
        return e
    }, Oe = (e, t) => Jp(e, Xp(t));
var nC = (e, t) => {
    var n = {};
    for (var r in e) Tu.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && sr) for (var r of sr(e)) t.indexOf(r) < 0 && Nu.call(e, r) && (n[r] = e[r]);
    return n
};
var eh = (e, t, n) => new Promise((r, o) => {
    var i = u => {
        try {
            a(n.next(u))
        } catch (c) {
            o(c)
        }
    }, s = u => {
        try {
            a(n.throw(u))
        } catch (c) {
            o(c)
        }
    }, a = u => u.done ? r(u.value) : Promise.resolve(u.value).then(i, s);
    a((n = n.apply(e, t)).next())
});

function Au(e, t) {
    return Object.is(e, t)
}

var q = null, _n = !1, ar = 1, ve = Symbol("SIGNAL");

function T(e) {
    let t = q;
    return q = e, t
}

function Ou() {
    return q
}

function th() {
    return _n
}

var qt = {
    version: 0,
    lastCleanEpoch: 0,
    dirty: !1,
    producerNode: void 0,
    producerLastReadVersion: void 0,
    producerIndexOfThis: void 0,
    nextProducerIndex: 0,
    liveConsumerNode: void 0,
    liveConsumerIndexOfThis: void 0,
    consumerAllowSignalWrites: !1,
    consumerIsAlwaysLive: !1,
    producerMustRecompute: () => !1,
    producerRecomputeValue: () => {
    },
    consumerMarkedDirty: () => {
    },
    consumerOnSignalRead: () => {
    }
};

function fi(e) {
    if (_n) throw new Error("");
    if (q === null) return;
    q.consumerOnSignalRead(e);
    let t = q.nextProducerIndex++;
    if (pr(q), t < q.producerNode.length && q.producerNode[t] !== e && Mn(q)) {
        let n = q.producerNode[t];
        fr(n, q.producerIndexOfThis[t])
    }
    q.producerNode[t] !== e && (q.producerNode[t] = e, q.producerIndexOfThis[t] = Mn(q) ? Lu(e, q, t) : 0), q.producerLastReadVersion[t] = e.version
}

function nh() {
    ar++
}

function Fu(e) {
    if (!(Mn(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === ar)) {
        if (!e.producerMustRecompute(e) && !lr(e)) {
            e.dirty = !1, e.lastCleanEpoch = ar;
            return
        }
        e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = ar
    }
}

function Ru(e) {
    if (e.liveConsumerNode === void 0) return;
    let t = _n;
    _n = !0;
    try {
        for (let n of e.liveConsumerNode) n.dirty || ku(n)
    } finally {
        _n = t
    }
}

function Pu() {
    return q?.consumerAllowSignalWrites !== !1
}

function ku(e) {
    e.dirty = !0, Ru(e), e.consumerMarkedDirty?.(e)
}

function xn(e) {
    return e && (e.nextProducerIndex = 0), T(e)
}

function cr(e, t) {
    if (T(t), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
        if (Mn(e)) for (let n = e.nextProducerIndex; n < e.producerNode.length; n++) fr(e.producerNode[n], e.producerIndexOfThis[n]);
        for (; e.producerNode.length > e.nextProducerIndex;) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop()
    }
}

function lr(e) {
    pr(e);
    for (let t = 0; t < e.producerNode.length; t++) {
        let n = e.producerNode[t], r = e.producerLastReadVersion[t];
        if (r !== n.version || (Fu(n), r !== n.version)) return !0
    }
    return !1
}

function dr(e) {
    if (pr(e), Mn(e)) for (let t = 0; t < e.producerNode.length; t++) fr(e.producerNode[t], e.producerIndexOfThis[t]);
    e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
}

function Lu(e, t, n) {
    if (ju(e), e.liveConsumerNode.length === 0 && Vu(e)) for (let r = 0; r < e.producerNode.length; r++) e.producerIndexOfThis[r] = Lu(e.producerNode[r], e, r);
    return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1
}

function fr(e, t) {
    if (ju(e), e.liveConsumerNode.length === 1 && Vu(e)) for (let r = 0; r < e.producerNode.length; r++) fr(e.producerNode[r], e.producerIndexOfThis[r]);
    let n = e.liveConsumerNode.length - 1;
    if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
        let r = e.liveConsumerIndexOfThis[t], o = e.liveConsumerNode[t];
        pr(o), o.producerIndexOfThis[r] = t
    }
}

function Mn(e) {
    return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
}

function pr(e) {
    e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= []
}

function ju(e) {
    e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= []
}

function Vu(e) {
    return e.producerNode !== void 0
}

function pi(e) {
    let t = Object.create(rh);
    t.computation = e;
    let n = () => {
        if (Fu(t), fi(t), t.value === ur) throw t.error;
        return t.value
    };
    return n[ve] = t, n
}

var ci = Symbol("UNSET"), li = Symbol("COMPUTING"), ur = Symbol("ERRORED"), rh = Oe(Ae({}, qt), {
    value: ci, dirty: !0, error: null, equal: Au, producerMustRecompute(e) {
        return e.value === ci || e.value === li
    }, producerRecomputeValue(e) {
        if (e.value === li) throw new Error("Detected cycle in computations.");
        let t = e.value;
        e.value = li;
        let n = xn(e), r;
        try {
            r = e.computation()
        } catch (o) {
            r = ur, e.error = o
        } finally {
            cr(e, n)
        }
        if (t !== ci && t !== ur && r !== ur && e.equal(t, r)) {
            e.value = t;
            return
        }
        e.value = r, e.version++
    }
});

function oh() {
    throw new Error
}

var Bu = oh;

function $u() {
    Bu()
}

function Hu(e) {
    Bu = e
}

var ih = null;

function Uu(e) {
    let t = Object.create(Gu);
    t.value = e;
    let n = () => (fi(t), t.value);
    return n[ve] = t, n
}

function hi(e, t) {
    Pu() || $u(), e.equal(e.value, t) || (e.value = t, sh(e))
}

function zu(e, t) {
    Pu() || $u(), hi(e, t(e.value))
}

var Gu = Oe(Ae({}, qt), {equal: Au, value: void 0});

function sh(e) {
    e.version++, nh(), Ru(e), ih?.()
}

function Wu(e, t, n) {
    let r = Object.create(ah);
    n && (r.consumerAllowSignalWrites = !0), r.fn = e, r.schedule = t;
    let o = u => {
        r.cleanupFn = u
    };

    function i(u) {
        return u.fn === null && u.schedule === null
    }

    function s(u) {
        i(u) || (dr(u), u.cleanupFn(), u.fn = null, u.schedule = null, u.cleanupFn = di)
    }

    let a = () => {
        if (r.fn === null) return;
        if (th()) throw new Error("Schedulers cannot synchronously execute watches while scheduling.");
        if (r.dirty = !1, r.hasRun && !lr(r)) return;
        r.hasRun = !0;
        let u = xn(r);
        try {
            r.cleanupFn(), r.cleanupFn = di, r.fn(o)
        } finally {
            cr(r, u)
        }
    };
    return r.ref = {notify: () => ku(r), run: a, cleanup: () => r.cleanupFn(), destroy: () => s(r), [ve]: r}, r.ref
}

var di = () => {
}, ah = Oe(Ae({}, qt), {
    consumerIsAlwaysLive: !0, consumerAllowSignalWrites: !1, consumerMarkedDirty: e => {
        e.schedule !== null && e.schedule(e.ref)
    }, hasRun: !1, cleanupFn: di
});

function v(e) {
    return typeof e == "function"
}

function Zt(e) {
    let n = e(r => {
        Error.call(r), r.stack = new Error().stack
    });
    return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
}

var hr = Zt(e => function (n) {
    e(this), this.message = n ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}` : "", this.name = "UnsubscriptionError", this.errors = n
});

function Et(e, t) {
    if (e) {
        let n = e.indexOf(t);
        0 <= n && e.splice(n, 1)
    }
}

var G = class e {
    constructor(t) {
        this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
    }

    unsubscribe() {
        let t;
        if (!this.closed) {
            this.closed = !0;
            let {_parentage: n} = this;
            if (n) if (this._parentage = null, Array.isArray(n)) for (let i of n) i.remove(this); else n.remove(this);
            let {initialTeardown: r} = this;
            if (v(r)) try {
                r()
            } catch (i) {
                t = i instanceof hr ? i.errors : [i]
            }
            let {_finalizers: o} = this;
            if (o) {
                this._finalizers = null;
                for (let i of o) try {
                    qu(i)
                } catch (s) {
                    t = t ?? [], s instanceof hr ? t = [...t, ...s.errors] : t.push(s)
                }
            }
            if (t) throw new hr(t)
        }
    }

    add(t) {
        var n;
        if (t && t !== this) if (this.closed) qu(t); else {
            if (t instanceof e) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this)
            }
            (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t)
        }
    }

    _hasParent(t) {
        let {_parentage: n} = this;
        return n === t || Array.isArray(n) && n.includes(t)
    }

    _addParent(t) {
        let {_parentage: n} = this;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
    }

    _removeParent(t) {
        let {_parentage: n} = this;
        n === t ? this._parentage = null : Array.isArray(n) && Et(n, t)
    }

    remove(t) {
        let {_finalizers: n} = this;
        n && Et(n, t), t instanceof e && t._removeParent(this)
    }
};
G.EMPTY = (() => {
    let e = new G;
    return e.closed = !0, e
})();
var gi = G.EMPTY;

function gr(e) {
    return e instanceof G || e && "closed" in e && v(e.remove) && v(e.add) && v(e.unsubscribe)
}

function qu(e) {
    v(e) ? e() : e.unsubscribe()
}

var Ce = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1
};
var Yt = {
    setTimeout(e, t, ...n) {
        let {delegate: r} = Yt;
        return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
    }, clearTimeout(e) {
        let {delegate: t} = Yt;
        return (t?.clearTimeout || clearTimeout)(e)
    }, delegate: void 0
};

function mr(e) {
    Yt.setTimeout(() => {
        let {onUnhandledError: t} = Ce;
        if (t) t(e); else throw e
    })
}

function Ue() {
}

var Zu = mi("C", void 0, void 0);

function Yu(e) {
    return mi("E", void 0, e)
}

function Qu(e) {
    return mi("N", e, void 0)
}

function mi(e, t, n) {
    return {kind: e, value: t, error: n}
}

var Ct = null;

function Qt(e) {
    if (Ce.useDeprecatedSynchronousErrorHandling) {
        let t = !Ct;
        if (t && (Ct = {errorThrown: !1, error: null}), e(), t) {
            let {errorThrown: n, error: r} = Ct;
            if (Ct = null, n) throw r
        }
    } else e()
}

function Ku(e) {
    Ce.useDeprecatedSynchronousErrorHandling && Ct && (Ct.errorThrown = !0, Ct.error = e)
}

var bt = class extends G {
    constructor(t) {
        super(), this.isStopped = !1, t ? (this.destination = t, gr(t) && t.add(this)) : this.destination = lh
    }

    static create(t, n, r) {
        return new ze(t, n, r)
    }

    next(t) {
        this.isStopped ? vi(Qu(t), this) : this._next(t)
    }

    error(t) {
        this.isStopped ? vi(Yu(t), this) : (this.isStopped = !0, this._error(t))
    }

    complete() {
        this.isStopped ? vi(Zu, this) : (this.isStopped = !0, this._complete())
    }

    unsubscribe() {
        this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
    }

    _next(t) {
        this.destination.next(t)
    }

    _error(t) {
        try {
            this.destination.error(t)
        } finally {
            this.unsubscribe()
        }
    }

    _complete() {
        try {
            this.destination.complete()
        } finally {
            this.unsubscribe()
        }
    }
}, uh = Function.prototype.bind;

function yi(e, t) {
    return uh.call(e, t)
}

var Di = class {
    constructor(t) {
        this.partialObserver = t
    }

    next(t) {
        let {partialObserver: n} = this;
        if (n.next) try {
            n.next(t)
        } catch (r) {
            yr(r)
        }
    }

    error(t) {
        let {partialObserver: n} = this;
        if (n.error) try {
            n.error(t)
        } catch (r) {
            yr(r)
        } else yr(t)
    }

    complete() {
        let {partialObserver: t} = this;
        if (t.complete) try {
            t.complete()
        } catch (n) {
            yr(n)
        }
    }
}, ze = class extends bt {
    constructor(t, n, r) {
        super();
        let o;
        if (v(t) || !t) o = {next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0}; else {
            let i;
            this && Ce.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = {
                next: t.next && yi(t.next, i),
                error: t.error && yi(t.error, i),
                complete: t.complete && yi(t.complete, i)
            }) : o = t
        }
        this.destination = new Di(o)
    }
};

function yr(e) {
    Ce.useDeprecatedSynchronousErrorHandling ? Ku(e) : mr(e)
}

function ch(e) {
    throw e
}

function vi(e, t) {
    let {onStoppedNotification: n} = Ce;
    n && Yt.setTimeout(() => n(e, t))
}

var lh = {closed: !0, next: Ue, error: ch, complete: Ue};
var Kt = typeof Symbol == "function" && Symbol.observable || "@@observable";

function K(e) {
    return e
}

function dh(...e) {
    return Ii(e)
}

function Ii(e) {
    return e.length === 0 ? K : e.length === 1 ? e[0] : function (n) {
        return e.reduce((r, o) => o(r), n)
    }
}

var _ = (() => {
    class e {
        constructor(n) {
            n && (this._subscribe = n)
        }

        lift(n) {
            let r = new e;
            return r.source = this, r.operator = n, r
        }

        subscribe(n, r, o) {
            let i = ph(n) ? n : new ze(n, r, o);
            return Qt(() => {
                let {operator: s, source: a} = this;
                i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
            }), i
        }

        _trySubscribe(n) {
            try {
                return this._subscribe(n)
            } catch (r) {
                n.error(r)
            }
        }

        forEach(n, r) {
            return r = Ju(r), new r((o, i) => {
                let s = new ze({
                    next: a => {
                        try {
                            n(a)
                        } catch (u) {
                            i(u), s.unsubscribe()
                        }
                    }, error: i, complete: o
                });
                this.subscribe(s)
            })
        }

        _subscribe(n) {
            var r;
            return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)
        }

        [Kt]() {
            return this
        }

        pipe(...n) {
            return Ii(n)(this)
        }

        toPromise(n) {
            return n = Ju(n), new n((r, o) => {
                let i;
                this.subscribe(s => i = s, s => o(s), () => r(i))
            })
        }
    }

    return e.create = t => new e(t), e
})();

function Ju(e) {
    var t;
    return (t = e ?? Ce.Promise) !== null && t !== void 0 ? t : Promise
}

function fh(e) {
    return e && v(e.next) && v(e.error) && v(e.complete)
}

function ph(e) {
    return e && e instanceof bt || fh(e) && gr(e)
}

function wi(e) {
    return v(e?.lift)
}

function w(e) {
    return t => {
        if (wi(t)) return t.lift(function (n) {
            try {
                return e(n, this)
            } catch (r) {
                this.error(r)
            }
        });
        throw new TypeError("Unable to lift unknown Observable type")
    }
}

function y(e, t, n, r, o) {
    return new Ei(e, t, n, r, o)
}

var Ei = class extends bt {
    constructor(t, n, r, o, i, s) {
        super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function (a) {
            try {
                n(a)
            } catch (u) {
                t.error(u)
            }
        } : super._next, this._error = o ? function (a) {
            try {
                o(a)
            } catch (u) {
                t.error(u)
            } finally {
                this.unsubscribe()
            }
        } : super._error, this._complete = r ? function () {
            try {
                r()
            } catch (a) {
                t.error(a)
            } finally {
                this.unsubscribe()
            }
        } : super._complete
    }

    unsubscribe() {
        var t;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let {closed: n} = this;
            super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this))
        }
    }
};

function Ci() {
    return w((e, t) => {
        let n = null;
        e._refCount++;
        let r = y(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount) {
                n = null;
                return
            }
            let o = e._connection, i = n;
            n = null, o && (!i || o === i) && o.unsubscribe(), t.unsubscribe()
        });
        e.subscribe(r), r.closed || (n = e.connect())
    })
}

var bi = class extends _ {
    constructor(t, n) {
        super(), this.source = t, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, wi(t) && (this.lift = t.lift)
    }

    _subscribe(t) {
        return this.getSubject().subscribe(t)
    }

    getSubject() {
        let t = this._subject;
        return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject
    }

    _teardown() {
        this._refCount = 0;
        let {_connection: t} = this;
        this._subject = this._connection = null, t?.unsubscribe()
    }

    connect() {
        let t = this._connection;
        if (!t) {
            t = this._connection = new G;
            let n = this.getSubject();
            t.add(this.source.subscribe(y(n, void 0, () => {
                this._teardown(), n.complete()
            }, r => {
                this._teardown(), n.error(r)
            }, () => this._teardown()))), t.closed && (this._connection = null, t = G.EMPTY)
        }
        return t
    }

    refCount() {
        return Ci()(this)
    }
};
var Xu = Zt(e => function () {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
});
var De = (() => {
    class e extends _ {
        constructor() {
            super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
        }

        lift(n) {
            let r = new vr(this, this);
            return r.operator = n, r
        }

        _throwIfClosed() {
            if (this.closed) throw new Xu
        }

        next(n) {
            Qt(() => {
                if (this._throwIfClosed(), !this.isStopped) {
                    this.currentObservers || (this.currentObservers = Array.from(this.observers));
                    for (let r of this.currentObservers) r.next(n)
                }
            })
        }

        error(n) {
            Qt(() => {
                if (this._throwIfClosed(), !this.isStopped) {
                    this.hasError = this.isStopped = !0, this.thrownError = n;
                    let {observers: r} = this;
                    for (; r.length;) r.shift().error(n)
                }
            })
        }

        complete() {
            Qt(() => {
                if (this._throwIfClosed(), !this.isStopped) {
                    this.isStopped = !0;
                    let {observers: n} = this;
                    for (; n.length;) n.shift().complete()
                }
            })
        }

        unsubscribe() {
            this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
        }

        get observed() {
            var n;
            return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0
        }

        _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n)
        }

        _subscribe(n) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
        }

        _innerSubscribe(n) {
            let {hasError: r, isStopped: o, observers: i} = this;
            return r || o ? gi : (this.currentObservers = null, i.push(n), new G(() => {
                this.currentObservers = null, Et(i, n)
            }))
        }

        _checkFinalizedStatuses(n) {
            let {hasError: r, thrownError: o, isStopped: i} = this;
            r ? n.error(o) : i && n.complete()
        }

        asObservable() {
            let n = new _;
            return n.source = this, n
        }
    }

    return e.create = (t, n) => new vr(t, n), e
})(), vr = class extends De {
    constructor(t, n) {
        super(), this.destination = t, this.source = n
    }

    next(t) {
        var n, r;
        (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || r === void 0 || r.call(n, t)
    }

    error(t) {
        var n, r;
        (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || r === void 0 || r.call(n, t)
    }

    complete() {
        var t, n;
        (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || n === void 0 || n.call(t)
    }

    _subscribe(t) {
        var n, r;
        return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null && r !== void 0 ? r : gi
    }
};
var Sn = class extends De {
    constructor(t) {
        super(), this._value = t
    }

    get value() {
        return this.getValue()
    }

    _subscribe(t) {
        let n = super._subscribe(t);
        return !n.closed && t.next(this._value), n
    }

    getValue() {
        let {hasError: t, thrownError: n, _value: r} = this;
        if (t) throw n;
        return this._throwIfClosed(), r
    }

    next(t) {
        super.next(this._value = t)
    }
};
var Tn = {
    now() {
        return (Tn.delegate || Date).now()
    }, delegate: void 0
};
var Nn = class extends De {
    constructor(t = 1 / 0, n = 1 / 0, r = Tn) {
        super(), this._bufferSize = t, this._windowTime = n, this._timestampProvider = r, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = n === 1 / 0, this._bufferSize = Math.max(1, t), this._windowTime = Math.max(1, n)
    }

    next(t) {
        let {isStopped: n, _buffer: r, _infiniteTimeWindow: o, _timestampProvider: i, _windowTime: s} = this;
        n || (r.push(t), !o && r.push(i.now() + s)), this._trimBuffer(), super.next(t)
    }

    _subscribe(t) {
        this._throwIfClosed(), this._trimBuffer();
        let n = this._innerSubscribe(t), {_infiniteTimeWindow: r, _buffer: o} = this, i = o.slice();
        for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2) t.next(i[s]);
        return this._checkFinalizedStatuses(t), n
    }

    _trimBuffer() {
        let {_bufferSize: t, _timestampProvider: n, _buffer: r, _infiniteTimeWindow: o} = this, i = (o ? 1 : 2) * t;
        if (t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o) {
            let s = n.now(), a = 0;
            for (let u = 1; u < r.length && r[u] <= s; u += 2) a = u;
            a && r.splice(0, a + 1)
        }
    }
};
var Dr = class extends G {
    constructor(t, n) {
        super()
    }

    schedule(t, n = 0) {
        return this
    }
};
var An = {
    setInterval(e, t, ...n) {
        let {delegate: r} = An;
        return r?.setInterval ? r.setInterval(e, t, ...n) : setInterval(e, t, ...n)
    }, clearInterval(e) {
        let {delegate: t} = An;
        return (t?.clearInterval || clearInterval)(e)
    }, delegate: void 0
};
var Jt = class extends Dr {
    constructor(t, n) {
        super(t, n), this.scheduler = t, this.work = n, this.pending = !1
    }

    schedule(t, n = 0) {
        var r;
        if (this.closed) return this;
        this.state = t;
        let o = this.id, i = this.scheduler;
        return o != null && (this.id = this.recycleAsyncId(i, o, n)), this.pending = !0, this.delay = n, this.id = (r = this.id) !== null && r !== void 0 ? r : this.requestAsyncId(i, this.id, n), this
    }

    requestAsyncId(t, n, r = 0) {
        return An.setInterval(t.flush.bind(t, this), r)
    }

    recycleAsyncId(t, n, r = 0) {
        if (r != null && this.delay === r && this.pending === !1) return n;
        n != null && An.clearInterval(n)
    }

    execute(t, n) {
        if (this.closed) return new Error("executing a cancelled action");
        this.pending = !1;
        let r = this._execute(t, n);
        if (r) return r;
        this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
    }

    _execute(t, n) {
        let r = !1, o;
        try {
            this.work(t)
        } catch (i) {
            r = !0, o = i || new Error("Scheduled action threw falsy error")
        }
        if (r) return this.unsubscribe(), o
    }

    unsubscribe() {
        if (!this.closed) {
            let {id: t, scheduler: n} = this, {actions: r} = n;
            this.work = this.state = this.scheduler = null, this.pending = !1, Et(r, this), t != null && (this.id = this.recycleAsyncId(n, t, null)), this.delay = null, super.unsubscribe()
        }
    }
};
var hh = 1, _i, Mi = {};

function ec(e) {
    return e in Mi ? (delete Mi[e], !0) : !1
}

var tc = {
    setImmediate(e) {
        let t = hh++;
        return Mi[t] = !0, _i || (_i = Promise.resolve()), _i.then(() => ec(t) && e()), t
    }, clearImmediate(e) {
        ec(e)
    }
};
var {setImmediate: gh, clearImmediate: mh} = tc, On = {
    setImmediate(...e) {
        let {delegate: t} = On;
        return (t?.setImmediate || gh)(...e)
    }, clearImmediate(e) {
        let {delegate: t} = On;
        return (t?.clearImmediate || mh)(e)
    }, delegate: void 0
};
var Ir = class extends Jt {
    constructor(t, n) {
        super(t, n), this.scheduler = t, this.work = n
    }

    requestAsyncId(t, n, r = 0) {
        return r !== null && r > 0 ? super.requestAsyncId(t, n, r) : (t.actions.push(this), t._scheduled || (t._scheduled = On.setImmediate(t.flush.bind(t, void 0))))
    }

    recycleAsyncId(t, n, r = 0) {
        var o;
        if (r != null ? r > 0 : this.delay > 0) return super.recycleAsyncId(t, n, r);
        let {actions: i} = t;
        n != null && ((o = i[i.length - 1]) === null || o === void 0 ? void 0 : o.id) !== n && (On.clearImmediate(n), t._scheduled === n && (t._scheduled = void 0))
    }
};
var Xt = class e {
    constructor(t, n = e.now) {
        this.schedulerActionCtor = t, this.now = n
    }

    schedule(t, n = 0, r) {
        return new this.schedulerActionCtor(this, t).schedule(r, n)
    }
};
Xt.now = Tn.now;
var en = class extends Xt {
    constructor(t, n = Xt.now) {
        super(t, n), this.actions = [], this._active = !1
    }

    flush(t) {
        let {actions: n} = this;
        if (this._active) {
            n.push(t);
            return
        }
        let r;
        this._active = !0;
        do if (r = t.execute(t.state, t.delay)) break; while (t = n.shift());
        if (this._active = !1, r) {
            for (; t = n.shift();) t.unsubscribe();
            throw r
        }
    }
};
var wr = class extends en {
    flush(t) {
        this._active = !0;
        let n = this._scheduled;
        this._scheduled = void 0;
        let {actions: r} = this, o;
        t = t || r.shift();
        do if (o = t.execute(t.state, t.delay)) break; while ((t = r[0]) && t.id === n && r.shift());
        if (this._active = !1, o) {
            for (; (t = r[0]) && t.id === n && r.shift();) t.unsubscribe();
            throw o
        }
    }
};
var yh = new wr(Ir);
var _t = new en(Jt), nc = _t;
var Ge = new _(e => e.complete());

function Er(e) {
    return e && v(e.schedule)
}

function xi(e) {
    return e[e.length - 1]
}

function at(e) {
    return v(xi(e)) ? e.pop() : void 0
}

function Fe(e) {
    return Er(xi(e)) ? e.pop() : void 0
}

function rc(e, t) {
    return typeof xi(e) == "number" ? e.pop() : t
}

function ic(e, t, n, r) {
    function o(i) {
        return i instanceof n ? i : new n(function (s) {
            s(i)
        })
    }

    return new (n || (n = Promise))(function (i, s) {
        function a(l) {
            try {
                c(r.next(l))
            } catch (d) {
                s(d)
            }
        }

        function u(l) {
            try {
                c(r.throw(l))
            } catch (d) {
                s(d)
            }
        }

        function c(l) {
            l.done ? i(l.value) : o(l.value).then(a, u)
        }

        c((r = r.apply(e, t || [])).next())
    })
}

function oc(e) {
    var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
    if (n) return n.call(e);
    if (e && typeof e.length == "number") return {
        next: function () {
            return e && r >= e.length && (e = void 0), {value: e && e[r++], done: !e}
        }
    };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
}

function Mt(e) {
    return this instanceof Mt ? (this.v = e, this) : new Mt(e)
}

function sc(e, t, n) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var r = n.apply(e, t || []), o, i = [];
    return o = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", s), o[Symbol.asyncIterator] = function () {
        return this
    }, o;

    function s(f) {
        return function (h) {
            return Promise.resolve(h).then(f, d)
        }
    }

    function a(f, h) {
        r[f] && (o[f] = function (g) {
            return new Promise(function (E, m) {
                i.push([f, g, E, m]) > 1 || u(f, g)
            })
        }, h && (o[f] = h(o[f])))
    }

    function u(f, h) {
        try {
            c(r[f](h))
        } catch (g) {
            p(i[0][3], g)
        }
    }

    function c(f) {
        f.value instanceof Mt ? Promise.resolve(f.value.v).then(l, d) : p(i[0][2], f)
    }

    function l(f) {
        u("next", f)
    }

    function d(f) {
        u("throw", f)
    }

    function p(f, h) {
        f(h), i.shift(), i.length && u(i[0][0], i[0][1])
    }
}

function ac(e) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var t = e[Symbol.asyncIterator], n;
    return t ? t.call(e) : (e = typeof oc == "function" ? oc(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function () {
        return this
    }, n);

    function r(i) {
        n[i] = e[i] && function (s) {
            return new Promise(function (a, u) {
                s = e[i](s), o(a, u, s.done, s.value)
            })
        }
    }

    function o(i, s, a, u) {
        Promise.resolve(u).then(function (c) {
            i({value: c, done: a})
        }, s)
    }
}

var tn = e => e && typeof e.length == "number" && typeof e != "function";

function Cr(e) {
    return v(e?.then)
}

function br(e) {
    return v(e[Kt])
}

function _r(e) {
    return Symbol.asyncIterator && v(e?.[Symbol.asyncIterator])
}

function Mr(e) {
    return new TypeError(`You provided ${e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
}

function vh() {
    return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator
}

var xr = vh();

function Sr(e) {
    return v(e?.[xr])
}

function Tr(e) {
    return sc(this, arguments, function* () {
        let n = e.getReader();
        try {
            for (; ;) {
                let {value: r, done: o} = yield Mt(n.read());
                if (o) return yield Mt(void 0);
                yield yield Mt(r)
            }
        } finally {
            n.releaseLock()
        }
    })
}

function Nr(e) {
    return v(e?.getReader)
}

function x(e) {
    if (e instanceof _) return e;
    if (e != null) {
        if (br(e)) return Dh(e);
        if (tn(e)) return Ih(e);
        if (Cr(e)) return wh(e);
        if (_r(e)) return uc(e);
        if (Sr(e)) return Eh(e);
        if (Nr(e)) return Ch(e)
    }
    throw Mr(e)
}

function Dh(e) {
    return new _(t => {
        let n = e[Kt]();
        if (v(n.subscribe)) return n.subscribe(t);
        throw new TypeError("Provided object does not correctly implement Symbol.observable")
    })
}

function Ih(e) {
    return new _(t => {
        for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
        t.complete()
    })
}

function wh(e) {
    return new _(t => {
        e.then(n => {
            t.closed || (t.next(n), t.complete())
        }, n => t.error(n)).then(null, mr)
    })
}

function Eh(e) {
    return new _(t => {
        for (let n of e) if (t.next(n), t.closed) return;
        t.complete()
    })
}

function uc(e) {
    return new _(t => {
        bh(e, t).catch(n => t.error(n))
    })
}

function Ch(e) {
    return uc(Tr(e))
}

function bh(e, t) {
    var n, r, o, i;
    return ic(this, void 0, void 0, function* () {
        try {
            for (n = ac(e); r = yield n.next(), !r.done;) {
                let s = r.value;
                if (t.next(s), t.closed) return
            }
        } catch (s) {
            o = {error: s}
        } finally {
            try {
                r && !r.done && (i = n.return) && (yield i.call(n))
            } finally {
                if (o) throw o.error
            }
        }
        t.complete()
    })
}

function ce(e, t, n, r = 0, o = !1) {
    let i = t.schedule(function () {
        n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
    }, r);
    if (e.add(i), !o) return i
}

function Ar(e, t = 0) {
    return w((n, r) => {
        n.subscribe(y(r, o => ce(r, e, () => r.next(o), t), () => ce(r, e, () => r.complete(), t), o => ce(r, e, () => r.error(o), t)))
    })
}

function Or(e, t = 0) {
    return w((n, r) => {
        r.add(e.schedule(() => n.subscribe(r), t))
    })
}

function cc(e, t) {
    return x(e).pipe(Or(t), Ar(t))
}

function lc(e, t) {
    return x(e).pipe(Or(t), Ar(t))
}

function dc(e, t) {
    return new _(n => {
        let r = 0;
        return t.schedule(function () {
            r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
        })
    })
}

function fc(e, t) {
    return new _(n => {
        let r;
        return ce(n, t, () => {
            r = e[xr](), ce(n, t, () => {
                let o, i;
                try {
                    ({value: o, done: i} = r.next())
                } catch (s) {
                    n.error(s);
                    return
                }
                i ? n.complete() : n.next(o)
            }, 0, !0)
        }), () => v(r?.return) && r.return()
    })
}

function Fr(e, t) {
    if (!e) throw new Error("Iterable cannot be null");
    return new _(n => {
        ce(n, t, () => {
            let r = e[Symbol.asyncIterator]();
            ce(n, t, () => {
                r.next().then(o => {
                    o.done ? n.complete() : n.next(o.value)
                })
            }, 0, !0)
        })
    })
}

function pc(e, t) {
    return Fr(Tr(e), t)
}

function hc(e, t) {
    if (e != null) {
        if (br(e)) return cc(e, t);
        if (tn(e)) return dc(e, t);
        if (Cr(e)) return lc(e, t);
        if (_r(e)) return Fr(e, t);
        if (Sr(e)) return fc(e, t);
        if (Nr(e)) return pc(e, t)
    }
    throw Mr(e)
}

function Re(e, t) {
    return t ? hc(e, t) : x(e)
}

function Si(...e) {
    let t = Fe(e);
    return Re(e, t)
}

function _h(e, t) {
    let n = v(e) ? e : () => e, r = o => o.error(n());
    return new _(t ? o => t.schedule(r, 0, o) : r)
}

function Mh(e) {
    return !!e && (e instanceof _ || v(e.lift) && v(e.subscribe))
}

var xt = Zt(e => function () {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence"
});

function gc(e) {
    return e instanceof Date && !isNaN(e)
}

function Pe(e, t) {
    return w((n, r) => {
        let o = 0;
        n.subscribe(y(r, i => {
            r.next(e.call(t, i, o++))
        }))
    })
}

var {isArray: xh} = Array;

function Sh(e, t) {
    return xh(t) ? e(...t) : e(t)
}

function ut(e) {
    return Pe(t => Sh(e, t))
}

var {isArray: Th} = Array, {getPrototypeOf: Nh, prototype: Ah, keys: Oh} = Object;

function Rr(e) {
    if (e.length === 1) {
        let t = e[0];
        if (Th(t)) return {args: t, keys: null};
        if (Fh(t)) {
            let n = Oh(t);
            return {args: n.map(r => t[r]), keys: n}
        }
    }
    return {args: e, keys: null}
}

function Fh(e) {
    return e && typeof e == "object" && Nh(e) === Ah
}

function Pr(e, t) {
    return e.reduce((n, r, o) => (n[r] = t[o], n), {})
}

function Rh(...e) {
    let t = Fe(e), n = at(e), {args: r, keys: o} = Rr(e);
    if (r.length === 0) return Re([], t);
    let i = new _(Ph(r, t, o ? s => Pr(o, s) : K));
    return n ? i.pipe(ut(n)) : i
}

function Ph(e, t, n = K) {
    return r => {
        mc(t, () => {
            let {length: o} = e, i = new Array(o), s = o, a = o;
            for (let u = 0; u < o; u++) mc(t, () => {
                let c = Re(e[u], t), l = !1;
                c.subscribe(y(r, d => {
                    i[u] = d, l || (l = !0, a--), a || r.next(n(i.slice()))
                }, () => {
                    --s || r.complete()
                }))
            }, r)
        }, r)
    }
}

function mc(e, t, n) {
    e ? ce(n, e, t) : t()
}

function yc(e, t, n, r, o, i, s, a) {
    let u = [], c = 0, l = 0, d = !1, p = () => {
        d && !u.length && !c && t.complete()
    }, f = g => c < r ? h(g) : u.push(g), h = g => {
        i && t.next(g), c++;
        let E = !1;
        x(n(g, l++)).subscribe(y(t, m => {
            o?.(m), i ? f(m) : t.next(m)
        }, () => {
            E = !0
        }, void 0, () => {
            if (E) try {
                for (c--; u.length && c < r;) {
                    let m = u.shift();
                    s ? ce(t, s, () => h(m)) : h(m)
                }
                p()
            } catch (m) {
                t.error(m)
            }
        }))
    };
    return e.subscribe(y(t, f, () => {
        d = !0, p()
    })), () => {
        a?.()
    }
}

function be(e, t, n = 1 / 0) {
    return v(t) ? be((r, o) => Pe((i, s) => t(r, i, o, s))(x(e(r, o))), n) : (typeof t == "number" && (n = t), w((r, o) => yc(r, o, e, n)))
}

function Fn(e = 1 / 0) {
    return be(K, e)
}

function vc() {
    return Fn(1)
}

function ct(...e) {
    return vc()(Re(e, Fe(e)))
}

function kh(e) {
    return new _(t => {
        x(e()).subscribe(t)
    })
}

function Lh(...e) {
    let t = at(e), {args: n, keys: r} = Rr(e), o = new _(i => {
        let {length: s} = n;
        if (!s) {
            i.complete();
            return
        }
        let a = new Array(s), u = s, c = s;
        for (let l = 0; l < s; l++) {
            let d = !1;
            x(n[l]).subscribe(y(i, p => {
                d || (d = !0, c--), a[l] = p
            }, () => u--, void 0, () => {
                (!u || !d) && (c || i.next(r ? Pr(r, a) : a), i.complete())
            }))
        }
    });
    return t ? o.pipe(ut(t)) : o
}

var jh = ["addListener", "removeListener"], Vh = ["addEventListener", "removeEventListener"], Bh = ["on", "off"];

function Ti(e, t, n, r) {
    if (v(n) && (r = n, n = void 0), r) return Ti(e, t, n).pipe(ut(r));
    let [o, i] = Uh(e) ? Vh.map(s => a => e[s](t, a, n)) : $h(e) ? jh.map(Dc(e, t)) : Hh(e) ? Bh.map(Dc(e, t)) : [];
    if (!o && tn(e)) return be(s => Ti(s, t, n))(x(e));
    if (!o) throw new TypeError("Invalid event target");
    return new _(s => {
        let a = (...u) => s.next(1 < u.length ? u : u[0]);
        return o(a), () => i(a)
    })
}

function Dc(e, t) {
    return n => r => e[n](t, r)
}

function $h(e) {
    return v(e.addListener) && v(e.removeListener)
}

function Hh(e) {
    return v(e.on) && v(e.off)
}

function Uh(e) {
    return v(e.addEventListener) && v(e.removeEventListener)
}

function Ic(e, t, n) {
    return n ? Ic(e, t).pipe(ut(n)) : new _(r => {
        let o = (...s) => r.next(s.length === 1 ? s[0] : s), i = e(o);
        return v(t) ? () => t(o, i) : void 0
    })
}

function Rn(e = 0, t, n = nc) {
    let r = -1;
    return t != null && (Er(t) ? n = t : r = t), new _(o => {
        let i = gc(e) ? +e - n.now() : e;
        i < 0 && (i = 0);
        let s = 0;
        return n.schedule(function () {
            o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete())
        }, i)
    })
}

function zh(...e) {
    let t = Fe(e), n = rc(e, 1 / 0), r = e;
    return r.length ? r.length === 1 ? x(r[0]) : Fn(n)(Re(r, t)) : Ge
}

var {isArray: Gh} = Array;

function kr(e) {
    return e.length === 1 && Gh(e[0]) ? e[0] : e
}

function St(e, t) {
    return w((n, r) => {
        let o = 0;
        n.subscribe(y(r, i => e.call(t, i, o++) && r.next(i)))
    })
}

function Wh(...e) {
    return e = kr(e), e.length === 1 ? x(e[0]) : new _(qh(e))
}

function qh(e) {
    return t => {
        let n = [];
        for (let r = 0; n && !t.closed && r < e.length; r++) n.push(x(e[r]).subscribe(y(t, o => {
            if (n) {
                for (let i = 0; i < n.length; i++) i !== r && n[i].unsubscribe();
                n = null
            }
            t.next(o)
        })))
    }
}

function Zh(...e) {
    let t = at(e), n = kr(e);
    return n.length ? new _(r => {
        let o = n.map(() => []), i = n.map(() => !1);
        r.add(() => {
            o = i = null
        });
        for (let s = 0; !r.closed && s < n.length; s++) x(n[s]).subscribe(y(r, a => {
            if (o[s].push(a), o.every(u => u.length)) {
                let u = o.map(c => c.shift());
                r.next(t ? t(...u) : u), o.some((c, l) => !c.length && i[l]) && r.complete()
            }
        }, () => {
            i[s] = !0, !o[s].length && r.complete()
        }));
        return () => {
            o = i = null
        }
    }) : Ge
}

function wc(e) {
    return w((t, n) => {
        let r = !1, o = null, i = null, s = !1, a = () => {
            if (i?.unsubscribe(), i = null, r) {
                r = !1;
                let c = o;
                o = null, n.next(c)
            }
            s && n.complete()
        }, u = () => {
            i = null, s && n.complete()
        };
        t.subscribe(y(n, c => {
            r = !0, o = c, i || x(e(c)).subscribe(i = y(n, a, u))
        }, () => {
            s = !0, (!r || !i || i.closed) && n.complete()
        }))
    })
}

function Yh(e, t = _t) {
    return wc(() => Rn(e, t))
}

function Ec(e) {
    return w((t, n) => {
        let r = null, o = !1, i;
        r = t.subscribe(y(n, void 0, void 0, s => {
            i = x(e(s, Ec(e)(t))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0
        })), o && (r.unsubscribe(), r = null, i.subscribe(n))
    })
}

function Cc(e, t, n, r, o) {
    return (i, s) => {
        let a = n, u = t, c = 0;
        i.subscribe(y(s, l => {
            let d = c++;
            u = a ? e(u, l, d) : (a = !0, l), r && s.next(u)
        }, o && (() => {
            a && s.next(u), s.complete()
        })))
    }
}

function Qh(e, t) {
    return v(t) ? be(e, t, 1) : be(e, 1)
}

function Kh(e, t = _t) {
    return w((n, r) => {
        let o = null, i = null, s = null, a = () => {
            if (o) {
                o.unsubscribe(), o = null;
                let c = i;
                i = null, r.next(c)
            }
        };

        function u() {
            let c = s + e, l = t.now();
            if (l < c) {
                o = this.schedule(void 0, c - l), r.add(o);
                return
            }
            a()
        }

        n.subscribe(y(r, c => {
            i = c, s = t.now(), o || (o = t.schedule(u, e), r.add(o))
        }, () => {
            a(), r.complete()
        }, void 0, () => {
            i = o = null
        }))
    })
}

function Pn(e) {
    return w((t, n) => {
        let r = !1;
        t.subscribe(y(n, o => {
            r = !0, n.next(o)
        }, () => {
            r || n.next(e), n.complete()
        }))
    })
}

function nn(e) {
    return e <= 0 ? () => Ge : w((t, n) => {
        let r = 0;
        t.subscribe(y(n, o => {
            ++r <= e && (n.next(o), e <= r && n.complete())
        }))
    })
}

function bc() {
    return w((e, t) => {
        e.subscribe(y(t, Ue))
    })
}

function Ni(e) {
    return Pe(() => e)
}

function Ai(e, t) {
    return t ? n => ct(t.pipe(nn(1), bc()), n.pipe(Ai(e))) : be((n, r) => x(e(n, r)).pipe(nn(1), Ni(n)))
}

function Jh(e, t = _t) {
    let n = Rn(e, t);
    return Ai(() => n)
}

function Xh(e, t = K) {
    return e = e ?? eg, w((n, r) => {
        let o, i = !0;
        n.subscribe(y(r, s => {
            let a = t(s);
            (i || !e(o, a)) && (i = !1, o = a, r.next(s))
        }))
    })
}

function eg(e, t) {
    return e === t
}

function Lr(e = tg) {
    return w((t, n) => {
        let r = !1;
        t.subscribe(y(n, o => {
            r = !0, n.next(o)
        }, () => r ? n.complete() : n.error(e())))
    })
}

function tg() {
    return new xt
}

function ng(...e) {
    return t => ct(t, Si(...e))
}

function rg(e) {
    return w((t, n) => {
        try {
            t.subscribe(n)
        } finally {
            n.add(e)
        }
    })
}

function _c(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? St((o, i) => e(o, i, r)) : K, nn(1), n ? Pn(t) : Lr(() => new xt))
}

function Oi(e) {
    return e <= 0 ? () => Ge : w((t, n) => {
        let r = [];
        t.subscribe(y(n, o => {
            r.push(o), e < r.length && r.shift()
        }, () => {
            for (let o of r) n.next(o);
            n.complete()
        }, void 0, () => {
            r = null
        }))
    })
}

function og(e, t) {
    let n = arguments.length >= 2;
    return r => r.pipe(e ? St((o, i) => e(o, i, r)) : K, Oi(1), n ? Pn(t) : Lr(() => new xt))
}

function ig(e, t) {
    return w(Cc(e, t, arguments.length >= 2, !0))
}

function Ri(e = {}) {
    let {connector: t = () => new De, resetOnError: n = !0, resetOnComplete: r = !0, resetOnRefCountZero: o = !0} = e;
    return i => {
        let s, a, u, c = 0, l = !1, d = !1, p = () => {
            a?.unsubscribe(), a = void 0
        }, f = () => {
            p(), s = u = void 0, l = d = !1
        }, h = () => {
            let g = s;
            f(), g?.unsubscribe()
        };
        return w((g, E) => {
            c++, !d && !l && p();
            let m = u = u ?? t();
            E.add(() => {
                c--, c === 0 && !d && !l && (a = Fi(h, o))
            }), m.subscribe(E), !s && c > 0 && (s = new ze({
                next: S => m.next(S), error: S => {
                    d = !0, p(), a = Fi(f, n, S), m.error(S)
                }, complete: () => {
                    l = !0, p(), a = Fi(f, r), m.complete()
                }
            }), x(g).subscribe(s))
        })(i)
    }
}

function Fi(e, t, ...n) {
    if (t === !0) {
        e();
        return
    }
    if (t === !1) return;
    let r = new ze({
        next: () => {
            r.unsubscribe(), e()
        }
    });
    return x(t(...n)).subscribe(r)
}

function sg(e, t, n) {
    let r, o = !1;
    return e && typeof e == "object" ? {
        bufferSize: r = 1 / 0,
        windowTime: t = 1 / 0,
        refCount: o = !1,
        scheduler: n
    } = e : r = e ?? 1 / 0, Ri({
        connector: () => new Nn(r, t, n),
        resetOnError: !0,
        resetOnComplete: !1,
        resetOnRefCountZero: o
    })
}

function ag(e) {
    return St((t, n) => e <= n)
}

function ug(...e) {
    let t = Fe(e);
    return w((n, r) => {
        (t ? ct(e, n, t) : ct(e, n)).subscribe(r)
    })
}

function Mc(e, t) {
    return w((n, r) => {
        let o = null, i = 0, s = !1, a = () => s && !o && r.complete();
        n.subscribe(y(r, u => {
            o?.unsubscribe();
            let c = 0, l = i++;
            x(e(u, l)).subscribe(o = y(r, d => r.next(t ? t(u, d, l, c++) : d), () => {
                o = null, a()
            }))
        }, () => {
            s = !0, a()
        }))
    })
}

function cg(e) {
    return w((t, n) => {
        x(e).subscribe(y(n, () => n.complete(), Ue)), !n.closed && t.subscribe(n)
    })
}

function lg(e, t = !1) {
    return w((n, r) => {
        let o = 0;
        n.subscribe(y(r, i => {
            let s = e(i, o++);
            (s || t) && r.next(i), !s && r.complete()
        }))
    })
}

function xc(e, t, n) {
    let r = v(e) || t || n ? {next: e, error: t, complete: n} : e;
    return r ? w((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(y(i, u => {
            var c;
            (c = r.next) === null || c === void 0 || c.call(r, u), i.next(u)
        }, () => {
            var u;
            a = !1, (u = r.complete) === null || u === void 0 || u.call(r), i.complete()
        }, u => {
            var c;
            a = !1, (c = r.error) === null || c === void 0 || c.call(r, u), i.error(u)
        }, () => {
            var u, c;
            a && ((u = r.unsubscribe) === null || u === void 0 || u.call(r)), (c = r.finalize) === null || c === void 0 || c.call(r)
        }))
    }) : K
}

function dg(...e) {
    let t = at(e);
    return w((n, r) => {
        let o = e.length, i = new Array(o), s = e.map(() => !1), a = !1;
        for (let u = 0; u < o; u++) x(e[u]).subscribe(y(r, c => {
            i[u] = c, !a && !s[u] && (s[u] = !0, (a = s.every(K)) && (s = null))
        }, Ue));
        n.subscribe(y(r, u => {
            if (a) {
                let c = [u, ...i];
                r.next(t ? t(...c) : c)
            }
        }))
    })
}

var yl = "https://g.co/ng/security#xss", A = class extends Error {
    constructor(t, n) {
        super(vl(t, n)), this.code = t
    }
};

function vl(e, t) {
    return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`
}

function Zn(e) {
    return {toString: e}.toString()
}

var jr = "__parameters__";

function fg(e) {
    return function (...n) {
        if (e) {
            let r = e(...n);
            for (let o in r) this[o] = r[o]
        }
    }
}

function Dl(e, t, n) {
    return Zn(() => {
        let r = fg(t);

        function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            let s = new o(...i);
            return a.annotation = s, a;

            function a(u, c, l) {
                let d = u.hasOwnProperty(jr) ? u[jr] : Object.defineProperty(u, jr, {value: []})[jr];
                for (; d.length <= l;) d.push(null);
                return (d[l] = d[l] || []).push(s), u
            }
        }

        return n && (o.prototype = Object.create(n.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
    })
}

var dt = globalThis;

function L(e) {
    for (let t in e) if (e[t] === L) return t;
    throw Error("Could not find renamed property on target object.")
}

function pg(e, t) {
    for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n])
}

function oe(e) {
    if (typeof e == "string") return e;
    if (Array.isArray(e)) return "[" + e.map(oe).join(", ") + "]";
    if (e == null) return "" + e;
    if (e.overriddenName) return `${e.overriddenName}`;
    if (e.name) return `${e.name}`;
    let t = e.toString();
    if (t == null) return "" + t;
    let n = t.indexOf(`
`);
    return n === -1 ? t : t.substring(0, n)
}

function Qi(e, t) {
    return e == null || e === "" ? t === null ? "" : t : t == null || t === "" ? e : e + " " + t
}

var hg = L({__forward_ref__: L});

function Il(e) {
    return e.__forward_ref__ = Il, e.toString = function () {
        return oe(this())
    }, e
}

function J(e) {
    return wl(e) ? e() : e
}

function wl(e) {
    return typeof e == "function" && e.hasOwnProperty(hg) && e.__forward_ref__ === Il
}

function gg(e, t, n) {
    e != t && mg(n, e, t, "==")
}

function mg(e, t, n, r) {
    throw new Error(`ASSERTION ERROR: ${e}` + (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
}

function B(e) {
    return {token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0}
}

function El(e) {
    return {providers: e.providers || [], imports: e.imports || []}
}

function To(e) {
    return Sc(e, Cl) || Sc(e, bl)
}

function bN(e) {
    return To(e) !== null
}

function Sc(e, t) {
    return e.hasOwnProperty(t) ? e[t] : null
}

function yg(e) {
    let t = e && (e[Cl] || e[bl]);
    return t || null
}

function Tc(e) {
    return e && (e.hasOwnProperty(Nc) || e.hasOwnProperty(vg)) ? e[Nc] : null
}

var Cl = L({\u0275prov: L}), Nc = L({\u0275inj: L}), bl = L({ngInjectableDef: L}), vg = L({ngInjectorDef: L}),
    O = class {
        constructor(t, n) {
            this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, typeof n == "number" ? this.__NG_ELEMENT_ID__ = n : n !== void 0 && (this.\u0275prov = B({
                token: this,
                providedIn: n.providedIn || "root",
                factory: n.factory
            }))
        }

        get multi() {
            return this
        }

        toString() {
            return `InjectionToken ${this._desc}`
        }
    };

function _l(e) {
    return e && !!e.\u0275providers
}

var Dg = L({\u0275cmp: L}), Ig = L({\u0275dir: L}), wg = L({\u0275pipe: L}), Eg = L({\u0275mod: L}),
    Xr = L({\u0275fac: L}), Ln = L({__NG_ELEMENT_ID__: L}), Ac = L({__NG_ENV_ID__: L});

function At(e) {
    return typeof e == "string" ? e : e == null ? "" : String(e)
}

function Cg(e) {
    return typeof e == "function" ? e.name || e.toString() : typeof e == "object" && e != null && typeof e.type == "function" ? e.type.name || e.type.toString() : At(e)
}

function bg(e, t) {
    let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
    throw new A(-200, e)
}

function ga(e, t) {
    throw new A(-201, !1)
}

var N = function (e) {
    return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
}(N || {}), Ki;

function Ml() {
    return Ki
}

function le(e) {
    let t = Ki;
    return Ki = e, t
}

function xl(e, t, n) {
    let r = To(e);
    if (r && r.providedIn == "root") return r.value === void 0 ? r.value = r.factory() : r.value;
    if (n & N.Optional) return null;
    if (t !== void 0) return t;
    ga(e, "Injector")
}

var _g = {}, Vn = _g, Ji = "__NG_DI_FLAG__", eo = "ngTempTokenPath", Mg = "ngTokenPath", xg = /\n/gm, Sg = "\u0275",
    Oc = "__source", un;

function Tg() {
    return un
}

function lt(e) {
    let t = un;
    return un = e, t
}

function Ng(e, t = N.Default) {
    if (un === void 0) throw new A(-203, !1);
    return un === null ? xl(e, void 0, t) : un.get(e, t & N.Optional ? null : void 0, t)
}

function ne(e, t = N.Default) {
    return (Ml() || Ng)(J(e), t)
}

function M(e, t = N.Default) {
    return ne(e, No(t))
}

function No(e) {
    return typeof e > "u" || typeof e == "number" ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
}

function Xi(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
        let r = J(e[n]);
        if (Array.isArray(r)) {
            if (r.length === 0) throw new A(900, !1);
            let o, i = N.Default;
            for (let s = 0; s < r.length; s++) {
                let a = r[s], u = Ag(a);
                typeof u == "number" ? u === -1 ? o = a.token : i |= u : o = a
            }
            t.push(ne(o, i))
        } else t.push(ne(r))
    }
    return t
}

function Sl(e, t) {
    return e[Ji] = t, e.prototype[Ji] = t, e
}

function Ag(e) {
    return e[Ji]
}

function Og(e, t, n, r) {
    let o = e[eo];
    throw t[Oc] && o.unshift(t[Oc]), e.message = Fg(`
` + e.message, o, n, r), e[Mg] = o, e[eo] = null, e
}

function Fg(e, t, n, r = null) {
    e = e && e.charAt(0) === `
` && e.charAt(1) == Sg ? e.slice(2) : e;
    let o = oe(t);
    if (Array.isArray(t)) o = t.map(oe).join(" -> "); else if (typeof t == "object") {
        let i = [];
        for (let s in t) if (t.hasOwnProperty(s)) {
            let a = t[s];
            i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : oe(a)))
        }
        o = `{${i.join(", ")}}`
    }
    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(xg, `
  `)}`
}

var Rg = Sl(Dl("Optional"), 8);
var Pg = Sl(Dl("SkipSelf"), 4);

function Ot(e, t) {
    let n = e.hasOwnProperty(Xr);
    return n ? e[Xr] : null
}

function kg(e, t, n) {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) {
        let o = e[r], i = t[r];
        if (n && (o = n(o), i = n(i)), i !== o) return !1
    }
    return !0
}

function Lg(e) {
    return e.flat(Number.POSITIVE_INFINITY)
}

function ma(e, t) {
    e.forEach(n => Array.isArray(n) ? ma(n, t) : t(n))
}

function Tl(e, t, n) {
    t >= e.length ? e.push(n) : e.splice(t, 0, n)
}

function to(e, t) {
    return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
}

function jg(e, t) {
    let n = [];
    for (let r = 0; r < e; r++) n.push(t);
    return n
}

function Vg(e, t, n, r) {
    let o = e.length;
    if (o == t) e.push(n, r); else if (o === 1) e.push(r, e[0]), e[0] = n; else {
        for (o--, e.push(e[o - 1], e[o]); o > t;) {
            let i = o - 2;
            e[o] = e[i], o--
        }
        e[t] = n, e[t + 1] = r
    }
}

function Ao(e, t, n) {
    let r = Yn(e, t);
    return r >= 0 ? e[r | 1] = n : (r = ~r, Vg(e, r, t, n)), r
}

function Pi(e, t) {
    let n = Yn(e, t);
    if (n >= 0) return e[n | 1]
}

function Yn(e, t) {
    return Bg(e, t, 1)
}

function Bg(e, t, n) {
    let r = 0, o = e.length >> n;
    for (; o !== r;) {
        let i = r + (o - r >> 1), s = e[i << n];
        if (t === s) return i << n;
        s > t ? o = i : r = i + 1
    }
    return ~(o << n)
}

var qe = {}, X = [], no = new O(""), Nl = new O("", -1), Al = new O(""), ro = class {
    get(t, n = Vn) {
        if (n === Vn) {
            let r = new Error(`NullInjectorError: No provider for ${oe(t)}!`);
            throw r.name = "NullInjectorError", r
        }
        return n
    }
}, Ol = function (e) {
    return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
}(Ol || {}), Bn = function (e) {
    return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
}(Bn || {}), ht = function (e) {
    return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e
}(ht || {});

function $g(e, t, n) {
    let r = e.length;
    for (; ;) {
        let o = e.indexOf(t, n);
        if (o === -1) return o;
        if (o === 0 || e.charCodeAt(o - 1) <= 32) {
            let i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o
        }
        n = o + 1
    }
}

function es(e, t, n) {
    let r = 0;
    for (; r < n.length;) {
        let o = n[r];
        if (typeof o == "number") {
            if (o !== 0) break;
            r++;
            let i = n[r++], s = n[r++], a = n[r++];
            e.setAttribute(t, s, a, i)
        } else {
            let i = o, s = n[++r];
            Hg(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
        }
    }
    return r
}

function Fl(e) {
    return e === 3 || e === 4 || e === 6
}

function Hg(e) {
    return e.charCodeAt(0) === 64
}

function $n(e, t) {
    if (!(t === null || t.length === 0)) if (e === null || e.length === 0) e = t.slice(); else {
        let n = -1;
        for (let r = 0; r < t.length; r++) {
            let o = t[r];
            typeof o == "number" ? n = o : n === 0 || (n === -1 || n === 2 ? Fc(e, n, o, null, t[++r]) : Fc(e, n, o, null, null))
        }
    }
    return e
}

function Fc(e, t, n, r, o) {
    let i = 0, s = e.length;
    if (t === -1) s = -1; else for (; i < e.length;) {
        let a = e[i++];
        if (typeof a == "number") {
            if (a === t) {
                s = -1;
                break
            } else if (a > t) {
                s = i - 1;
                break
            }
        }
    }
    for (; i < e.length;) {
        let a = e[i];
        if (typeof a == "number") break;
        if (a === n) {
            if (r === null) {
                o !== null && (e[i + 1] = o);
                return
            } else if (r === e[i + 1]) {
                e[i + 2] = o;
                return
            }
        }
        i++, r !== null && i++, o !== null && i++
    }
    s !== -1 && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), r !== null && e.splice(i++, 0, r), o !== null && e.splice(i++, 0, o)
}

var Rl = "ng-template";

function Ug(e, t, n, r) {
    let o = 0;
    if (r) {
        for (; o < t.length && typeof t[o] == "string"; o += 2) if (t[o] === "class" && $g(t[o + 1].toLowerCase(), n, 0) !== -1) return !0
    } else if (ya(e)) return !1;
    if (o = t.indexOf(1, o), o > -1) {
        let i;
        for (; ++o < t.length && typeof (i = t[o]) == "string";) if (i.toLowerCase() === n) return !0
    }
    return !1
}

function ya(e) {
    return e.type === 4 && e.value !== Rl
}

function zg(e, t, n) {
    let r = e.type === 4 && !n ? Rl : e.value;
    return t === r
}

function Gg(e, t, n) {
    let r = 4, o = e.attrs, i = o !== null ? Zg(o) : 0, s = !1;
    for (let a = 0; a < t.length; a++) {
        let u = t[a];
        if (typeof u == "number") {
            if (!s && !_e(r) && !_e(u)) return !1;
            if (s && _e(u)) continue;
            s = !1, r = u | r & 1;
            continue
        }
        if (!s) if (r & 4) {
            if (r = 2 | r & 1, u !== "" && !zg(e, u, n) || u === "" && t.length === 1) {
                if (_e(r)) return !1;
                s = !0
            }
        } else if (r & 8) {
            if (o === null || !Ug(e, o, u, n)) {
                if (_e(r)) return !1;
                s = !0
            }
        } else {
            let c = t[++a], l = Wg(u, o, ya(e), n);
            if (l === -1) {
                if (_e(r)) return !1;
                s = !0;
                continue
            }
            if (c !== "") {
                let d;
                if (l > i ? d = "" : d = o[l + 1].toLowerCase(), r & 2 && c !== d) {
                    if (_e(r)) return !1;
                    s = !0
                }
            }
        }
    }
    return _e(r) || s
}

function _e(e) {
    return (e & 1) === 0
}

function Wg(e, t, n, r) {
    if (t === null) return -1;
    let o = 0;
    if (r || !n) {
        let i = !1;
        for (; o < t.length;) {
            let s = t[o];
            if (s === e) return o;
            if (s === 3 || s === 6) i = !0; else if (s === 1 || s === 2) {
                let a = t[++o];
                for (; typeof a == "string";) a = t[++o];
                continue
            } else {
                if (s === 4) break;
                if (s === 0) {
                    o += 4;
                    continue
                }
            }
            o += i ? 1 : 2
        }
        return -1
    } else return Yg(t, e)
}

function Pl(e, t, n = !1) {
    for (let r = 0; r < t.length; r++) if (Gg(e, t[r], n)) return !0;
    return !1
}

function qg(e) {
    let t = e.attrs;
    if (t != null) {
        let n = t.indexOf(5);
        if (!(n & 1)) return t[n + 1]
    }
    return null
}

function Zg(e) {
    for (let t = 0; t < e.length; t++) {
        let n = e[t];
        if (Fl(n)) return t
    }
    return e.length
}

function Yg(e, t) {
    let n = e.indexOf(4);
    if (n > -1) for (n++; n < e.length;) {
        let r = e[n];
        if (typeof r == "number") return -1;
        if (r === t) return n;
        n++
    }
    return -1
}

function Qg(e, t) {
    e:for (let n = 0; n < t.length; n++) {
        let r = t[n];
        if (e.length === r.length) {
            for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
            return !0
        }
    }
    return !1
}

function Rc(e, t) {
    return e ? ":not(" + t.trim() + ")" : t
}

function Kg(e) {
    let t = e[0], n = 1, r = 2, o = "", i = !1;
    for (; n < e.length;) {
        let s = e[n];
        if (typeof s == "string") if (r & 2) {
            let a = e[++n];
            o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
        } else r & 8 ? o += "." + s : r & 4 && (o += " " + s); else o !== "" && !_e(s) && (t += Rc(i, o), o = ""), r = s, i = i || !_e(r);
        n++
    }
    return o !== "" && (t += Rc(i, o)), t
}

function Jg(e) {
    return e.map(Kg).join(",")
}

function Xg(e) {
    let t = [], n = [], r = 1, o = 2;
    for (; r < e.length;) {
        let i = e[r];
        if (typeof i == "string") o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i); else {
            if (!_e(o)) break;
            o = i
        }
        r++
    }
    return {attrs: t, classes: n}
}

function _N(e) {
    return Zn(() => {
        let t = Vl(e), n = Oe(Ae({}, t), {
            decls: e.decls,
            vars: e.vars,
            template: e.template,
            consts: e.consts || null,
            ngContentSelectors: e.ngContentSelectors,
            onPush: e.changeDetection === Ol.OnPush,
            directiveDefs: null,
            pipeDefs: null,
            dependencies: t.standalone && e.dependencies || null,
            getStandaloneInjector: null,
            signals: e.signals ?? !1,
            data: e.data || {},
            encapsulation: e.encapsulation || Bn.Emulated,
            styles: e.styles || X,
            _: null,
            schemas: e.schemas || null,
            tView: null,
            id: ""
        });
        Bl(n);
        let r = e.dependencies;
        return n.directiveDefs = kc(r, !1), n.pipeDefs = kc(r, !0), n.id = rm(n), n
    })
}

function em(e) {
    return Ze(e) || Da(e)
}

function tm(e) {
    return e !== null
}

function kl(e) {
    return Zn(() => ({
        type: e.type,
        bootstrap: e.bootstrap || X,
        declarations: e.declarations || X,
        imports: e.imports || X,
        exports: e.exports || X,
        transitiveCompileScopes: null,
        schemas: e.schemas || null,
        id: e.id || null
    }))
}

function Pc(e, t) {
    if (e == null) return qe;
    let n = {};
    for (let r in e) if (e.hasOwnProperty(r)) {
        let o = e[r], i, s, a = ht.None;
        Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ?? i) : (i = o, s = o), t ? (n[i] = a !== ht.None ? [r, a] : r, t[i] = s) : n[i] = r
    }
    return n
}

function Ut(e) {
    return Zn(() => {
        let t = Vl(e);
        return Bl(t), t
    })
}

function va(e) {
    return {
        type: e.type,
        name: e.name,
        factory: null,
        pure: e.pure !== !1,
        standalone: e.standalone === !0,
        onDestroy: e.type.prototype.ngOnDestroy || null
    }
}

function Ze(e) {
    return e[Dg] || null
}

function Da(e) {
    return e[Ig] || null
}

function Ll(e) {
    return e[wg] || null
}

function nm(e) {
    let t = Ze(e) || Da(e) || Ll(e);
    return t !== null ? t.standalone : !1
}

function jl(e, t) {
    let n = e[Eg] || null;
    if (!n && t === !0) throw new Error(`Type ${oe(e)} does not have '\u0275mod' property.`);
    return n
}

function Vl(e) {
    let t = {};
    return {
        type: e.type,
        providersResolver: null,
        factory: null,
        hostBindings: e.hostBindings || null,
        hostVars: e.hostVars || 0,
        hostAttrs: e.hostAttrs || null,
        contentQueries: e.contentQueries || null,
        declaredInputs: t,
        inputTransforms: null,
        inputConfig: e.inputs || qe,
        exportAs: e.exportAs || null,
        standalone: e.standalone === !0,
        signals: e.signals === !0,
        selectors: e.selectors || X,
        viewQuery: e.viewQuery || null,
        features: e.features || null,
        setInput: null,
        findHostDirectiveDefs: null,
        hostDirectives: null,
        inputs: Pc(e.inputs, t),
        outputs: Pc(e.outputs),
        debugInfo: null
    }
}

function Bl(e) {
    e.features?.forEach(t => t(e))
}

function kc(e, t) {
    if (!e) return null;
    let n = t ? Ll : em;
    return () => (typeof e == "function" ? e() : e).map(r => n(r)).filter(tm)
}

function rm(e) {
    let t = 0,
        n = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
    for (let o of n) t = Math.imul(31, t) + o.charCodeAt(0) << 0;
    return t += 2147483648, "c" + t
}

function om(e) {
    return {\u0275providers: e}
}

function im(...e) {
    return {\u0275providers: $l(!0, e), \u0275fromNgModule: !0}
}

function $l(e, ...t) {
    let n = [], r = new Set, o, i = s => {
        n.push(s)
    };
    return ma(t, s => {
        let a = s;
        ts(a, i, [], r) && (o ||= [], o.push(a))
    }), o !== void 0 && Hl(o, i), n
}

function Hl(e, t) {
    for (let n = 0; n < e.length; n++) {
        let {ngModule: r, providers: o} = e[n];
        Ia(o, i => {
            t(i, r)
        })
    }
}

function ts(e, t, n, r) {
    if (e = J(e), !e) return !1;
    let o = null, i = Tc(e), s = !i && Ze(e);
    if (!i && !s) {
        let u = e.ngModule;
        if (i = Tc(u), i) o = u; else return !1
    } else {
        if (s && !s.standalone) return !1;
        o = e
    }
    let a = r.has(o);
    if (s) {
        if (a) return !1;
        if (r.add(o), s.dependencies) {
            let u = typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
            for (let c of u) ts(c, t, n, r)
        }
    } else if (i) {
        if (i.imports != null && !a) {
            r.add(o);
            let c;
            try {
                ma(i.imports, l => {
                    ts(l, t, n, r) && (c ||= [], c.push(l))
                })
            } finally {
            }
            c !== void 0 && Hl(c, t)
        }
        if (!a) {
            let c = Ot(o) || (() => new o);
            t({provide: o, useFactory: c, deps: X}, o), t({provide: Al, useValue: o, multi: !0}, o), t({
                provide: no,
                useValue: () => ne(o),
                multi: !0
            }, o)
        }
        let u = i.providers;
        if (u != null && !a) {
            let c = e;
            Ia(u, l => {
                t(l, c)
            })
        }
    } else return !1;
    return o !== e && e.providers !== void 0
}

function Ia(e, t) {
    for (let n of e) _l(n) && (n = n.\u0275providers), Array.isArray(n) ? Ia(n, t) : t(n)
}

var sm = L({provide: String, useValue: L});

function Ul(e) {
    return e !== null && typeof e == "object" && sm in e
}

function am(e) {
    return !!(e && e.useExisting)
}

function um(e) {
    return !!(e && e.useFactory)
}

function ln(e) {
    return typeof e == "function"
}

function cm(e) {
    return !!e.useClass
}

var zl = new O(""), Gr = {}, lm = {}, ki;

function Oo() {
    return ki === void 0 && (ki = new ro), ki
}

var gt = class {
}, Hn = class extends gt {
    get destroyed() {
        return this._destroyed
    }

    constructor(t, n, r, o) {
        super(), this.parent = n, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, rs(t, s => this.processProvider(s)), this.records.set(Nl, rn(void 0, this)), o.has("environment") && this.records.set(gt, rn(void 0, this));
        let i = this.records.get(zl);
        i != null && typeof i.value == "string" && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(Al, X, N.Self))
    }

    destroy() {
        this.assertNotDestroyed(), this._destroyed = !0;
        let t = T(null);
        try {
            for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
            let n = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (let r of n) r()
        } finally {
            this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), T(t)
        }
    }

    onDestroy(t) {
        return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
    }

    runInContext(t) {
        this.assertNotDestroyed();
        let n = lt(this), r = le(void 0), o;
        try {
            return t()
        } finally {
            lt(n), le(r)
        }
    }

    get(t, n = Vn, r = N.Default) {
        if (this.assertNotDestroyed(), t.hasOwnProperty(Ac)) return t[Ac](this);
        r = No(r);
        let o, i = lt(this), s = le(void 0);
        try {
            if (!(r & N.SkipSelf)) {
                let u = this.records.get(t);
                if (u === void 0) {
                    let c = gm(t) && To(t);
                    c && this.injectableDefInScope(c) ? u = rn(ns(t), Gr) : u = null, this.records.set(t, u)
                }
                if (u != null) return this.hydrate(t, u)
            }
            let a = r & N.Self ? Oo() : this.parent;
            return n = r & N.Optional && n === Vn ? null : n, a.get(t, n)
        } catch (a) {
            if (a.name === "NullInjectorError") {
                if ((a[eo] = a[eo] || []).unshift(oe(t)), i) throw a;
                return Og(a, t, "R3InjectorError", this.source)
            } else throw a
        } finally {
            le(s), lt(i)
        }
    }

    resolveInjectorInitializers() {
        let t = T(null), n = lt(this), r = le(void 0), o;
        try {
            let i = this.get(no, X, N.Self);
            for (let s of i) s()
        } finally {
            lt(n), le(r), T(t)
        }
    }

    toString() {
        let t = [], n = this.records;
        for (let r of n.keys()) t.push(oe(r));
        return `R3Injector[${t.join(", ")}]`
    }

    assertNotDestroyed() {
        if (this._destroyed) throw new A(205, !1)
    }

    processProvider(t) {
        t = J(t);
        let n = ln(t) ? t : J(t && t.provide), r = fm(t);
        if (!ln(t) && t.multi === !0) {
            let o = this.records.get(n);
            o || (o = rn(void 0, Gr, !0), o.factory = () => Xi(o.multi), this.records.set(n, o)), n = t, o.multi.push(t)
        }
        this.records.set(n, r)
    }

    hydrate(t, n) {
        let r = T(null);
        try {
            return n.value === Gr && (n.value = lm, n.value = n.factory()), typeof n.value == "object" && n.value && hm(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
        } finally {
            T(r)
        }
    }

    injectableDefInScope(t) {
        if (!t.providedIn) return !1;
        let n = J(t.providedIn);
        return typeof n == "string" ? n === "any" || this.scopes.has(n) : this.injectorDefTypes.has(n)
    }

    removeOnDestroy(t) {
        let n = this._onDestroyHooks.indexOf(t);
        n !== -1 && this._onDestroyHooks.splice(n, 1)
    }
};

function ns(e) {
    let t = To(e), n = t !== null ? t.factory : Ot(e);
    if (n !== null) return n;
    if (e instanceof O) throw new A(204, !1);
    if (e instanceof Function) return dm(e);
    throw new A(204, !1)
}

function dm(e) {
    if (e.length > 0) throw new A(204, !1);
    let n = yg(e);
    return n !== null ? () => n.factory(e) : () => new e
}

function fm(e) {
    if (Ul(e)) return rn(void 0, e.useValue);
    {
        let t = Gl(e);
        return rn(t, Gr)
    }
}

function Gl(e, t, n) {
    let r;
    if (ln(e)) {
        let o = J(e);
        return Ot(o) || ns(o)
    } else if (Ul(e)) r = () => J(e.useValue); else if (um(e)) r = () => e.useFactory(...Xi(e.deps || [])); else if (am(e)) r = () => ne(J(e.useExisting)); else {
        let o = J(e && (e.useClass || e.provide));
        if (pm(e)) r = () => new o(...Xi(e.deps)); else return Ot(o) || ns(o)
    }
    return r
}

function rn(e, t, n = !1) {
    return {factory: e, value: t, multi: n ? [] : void 0}
}

function pm(e) {
    return !!e.deps
}

function hm(e) {
    return e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
}

function gm(e) {
    return typeof e == "function" || typeof e == "object" && e instanceof O
}

function rs(e, t) {
    for (let n of e) Array.isArray(n) ? rs(n, t) : n && _l(n) ? rs(n.\u0275providers, t) : t(n)
}

function MN(e, t) {
    e instanceof Hn && e.assertNotDestroyed();
    let n, r = lt(e), o = le(void 0);
    try {
        return t()
    } finally {
        lt(r), le(o)
    }
}

function Wl() {
    return Ml() !== void 0 || Tg() != null
}

function wa(e) {
    if (!Wl()) throw new A(-203, !1)
}

function mm(e) {
    return typeof e == "function"
}

var Be = 0, C = 1, I = 2, re = 3, Se = 4, ie = 5, dn = 6, oo = 7, ee = 8, fn = 9, je = 10, P = 11, Un = 12, Lc = 13,
    In = 14, fe = 15, Ft = 16, on = 17, Ye = 18, Fo = 19, ql = 20, ft = 21, Wr = 22, Ie = 23, H = 25, Ea = 1;
var Rt = 7, io = 8, pn = 9, te = 10, so = function (e) {
    return e[e.None = 0] = "None", e[e.HasTransplantedViews = 2] = "HasTransplantedViews", e
}(so || {});

function pt(e) {
    return Array.isArray(e) && typeof e[Ea] == "object"
}

function et(e) {
    return Array.isArray(e) && e[Ea] === !0
}

function Ca(e) {
    return (e.flags & 4) !== 0
}

function Ro(e) {
    return e.componentOffset > -1
}

function Po(e) {
    return (e.flags & 1) === 1
}

function Qe(e) {
    return !!e.template
}

function os(e) {
    return (e[I] & 512) !== 0
}

var is = class {
    constructor(t, n, r) {
        this.previousValue = t, this.currentValue = n, this.firstChange = r
    }

    isFirstChange() {
        return this.firstChange
    }
};

function Zl(e, t, n, r) {
    t !== null ? t.applyValueToInputSignal(t, r) : e[n] = r
}

function ba() {
    return Yl
}

function Yl(e) {
    return e.type.prototype.ngOnChanges && (e.setInput = vm), ym
}

ba.ngInherit = !0;

function ym() {
    let e = Kl(this), t = e?.current;
    if (t) {
        let n = e.previous;
        if (n === qe) e.previous = t; else for (let r in t) n[r] = t[r];
        e.current = null, this.ngOnChanges(t)
    }
}

function vm(e, t, n, r, o) {
    let i = this.declaredInputs[r], s = Kl(e) || Dm(e, {previous: qe, current: null}),
        a = s.current || (s.current = {}), u = s.previous, c = u[i];
    a[i] = new is(c && c.currentValue, n, u === qe), Zl(e, t, o, n)
}

var Ql = "__ngSimpleChanges__";

function Kl(e) {
    return e[Ql] || null
}

function Dm(e, t) {
    return e[Ql] = t
}

var jc = null;
var ke = function (e, t, n) {
    jc?.(e, t, n)
}, Jl = "svg", Im = "math";

function Te(e) {
    for (; Array.isArray(e);) e = e[Be];
    return e
}

function wm(e) {
    for (; Array.isArray(e);) {
        if (typeof e[Ea] == "object") return e;
        e = e[Be]
    }
    return null
}

function Xl(e, t) {
    return Te(t[e])
}

function we(e, t) {
    return Te(t[e.index])
}

function _a(e, t) {
    return e.data[t]
}

function ko(e, t) {
    return e[t]
}

function Dt(e, t) {
    let n = t[e];
    return pt(n) ? n : n[Be]
}

function Em(e) {
    return (e[I] & 4) === 4
}

function Ma(e) {
    return (e[I] & 128) === 128
}

function Cm(e) {
    return et(e[re])
}

function Ke(e, t) {
    return t == null ? null : e[t]
}

function ed(e) {
    e[on] = 0
}

function td(e) {
    e[I] & 1024 || (e[I] |= 1024, Ma(e) && jo(e))
}

function bm(e, t) {
    for (; e > 0;) t = t[In], e--;
    return t
}

function Lo(e) {
    return !!(e[I] & 9216 || e[Ie]?.dirty)
}

function ss(e) {
    e[je].changeDetectionScheduler?.notify(8), e[I] & 64 && (e[I] |= 1024), Lo(e) && jo(e)
}

function jo(e) {
    e[je].changeDetectionScheduler?.notify(0);
    let t = Pt(e);
    for (; t !== null && !(t[I] & 8192 || (t[I] |= 8192, !Ma(t)));) t = Pt(t)
}

function nd(e, t) {
    if ((e[I] & 256) === 256) throw new A(911, !1);
    e[ft] === null && (e[ft] = []), e[ft].push(t)
}

function _m(e, t) {
    if (e[ft] === null) return;
    let n = e[ft].indexOf(t);
    n !== -1 && e[ft].splice(n, 1)
}

function Pt(e) {
    let t = e[re];
    return et(t) ? t[re] : t
}

var b = {lFrame: dd(null), bindingsEnabled: !0, skipHydrationRootTNode: null};
var rd = !1;

function Mm() {
    return b.lFrame.elementDepthCount
}

function xm() {
    b.lFrame.elementDepthCount++
}

function Sm() {
    b.lFrame.elementDepthCount--
}

function od() {
    return b.bindingsEnabled
}

function id() {
    return b.skipHydrationRootTNode !== null
}

function Tm(e) {
    return b.skipHydrationRootTNode === e
}

function Nm() {
    b.skipHydrationRootTNode = null
}

function D() {
    return b.lFrame.lView
}

function k() {
    return b.lFrame.tView
}

function xN(e) {
    return b.lFrame.contextLView = e, e[ee]
}

function SN(e) {
    return b.lFrame.contextLView = null, e
}

function Z() {
    let e = sd();
    for (; e !== null && e.type === 64;) e = e.parent;
    return e
}

function sd() {
    return b.lFrame.currentTNode
}

function zn() {
    let e = b.lFrame, t = e.currentTNode;
    return e.isParent ? t : t.parent
}

function Ve(e, t) {
    let n = b.lFrame;
    n.currentTNode = e, n.isParent = t
}

function xa() {
    return b.lFrame.isParent
}

function Sa() {
    b.lFrame.isParent = !1
}

function Am() {
    return b.lFrame.contextLView
}

function ad() {
    return rd
}

function Vc(e) {
    rd = e
}

function wn() {
    let e = b.lFrame, t = e.bindingRootIndex;
    return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
}

function Om() {
    return b.lFrame.bindingIndex
}

function Fm(e) {
    return b.lFrame.bindingIndex = e
}

function It() {
    return b.lFrame.bindingIndex++
}

function Ta(e) {
    let t = b.lFrame, n = t.bindingIndex;
    return t.bindingIndex = t.bindingIndex + e, n
}

function Rm() {
    return b.lFrame.inI18n
}

function ud(e) {
    b.lFrame.inI18n = e
}

function Pm(e, t) {
    let n = b.lFrame;
    n.bindingIndex = n.bindingRootIndex = e, as(t)
}

function km() {
    return b.lFrame.currentDirectiveIndex
}

function as(e) {
    b.lFrame.currentDirectiveIndex = e
}

function Na(e) {
    let t = b.lFrame.currentDirectiveIndex;
    return t === -1 ? null : e[t]
}

function Aa() {
    return b.lFrame.currentQueryIndex
}

function Vo(e) {
    b.lFrame.currentQueryIndex = e
}

function Lm(e) {
    let t = e[C];
    return t.type === 2 ? t.declTNode : t.type === 1 ? e[ie] : null
}

function cd(e, t, n) {
    if (n & N.SkipSelf) {
        let o = t, i = e;
        for (; o = o.parent, o === null && !(n & N.Host);) if (o = Lm(i), o === null || (i = i[In], o.type & 10)) break;
        if (o === null) return !1;
        t = o, e = i
    }
    let r = b.lFrame = ld();
    return r.currentTNode = t, r.lView = e, !0
}

function Oa(e) {
    let t = ld(), n = e[C];
    b.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1
}

function ld() {
    let e = b.lFrame, t = e === null ? null : e.child;
    return t === null ? dd(e) : t
}

function dd(e) {
    let t = {
        currentTNode: null,
        isParent: !0,
        lView: null,
        tView: null,
        selectedIndex: -1,
        contextLView: null,
        elementDepthCount: 0,
        currentNamespace: null,
        currentDirectiveIndex: -1,
        bindingRootIndex: -1,
        bindingIndex: -1,
        currentQueryIndex: 0,
        parent: e,
        child: null,
        inI18n: !1
    };
    return e !== null && (e.child = t), t
}

function fd() {
    let e = b.lFrame;
    return b.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
}

var pd = fd;

function Fa() {
    let e = fd();
    e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
}

function jm(e) {
    return (b.lFrame.contextLView = bm(e, b.lFrame.contextLView))[ee]
}

function tt() {
    return b.lFrame.selectedIndex
}

function kt(e) {
    b.lFrame.selectedIndex = e
}

function zt() {
    let e = b.lFrame;
    return _a(e.tView, e.selectedIndex)
}

function TN() {
    b.lFrame.currentNamespace = Jl
}

function NN() {
    Vm()
}

function Vm() {
    b.lFrame.currentNamespace = null
}

function Bm() {
    return b.lFrame.currentNamespace
}

var hd = !0;

function Qn() {
    return hd
}

function Kn(e) {
    hd = e
}

function $m(e, t, n) {
    let {ngOnChanges: r, ngOnInit: o, ngDoCheck: i} = t.type.prototype;
    if (r) {
        let s = Yl(t);
        (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s)
    }
    o && (n.preOrderHooks ??= []).push(0 - e, o), i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i))
}

function Bo(e, t) {
    for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
        let i = e.data[n].type.prototype, {
            ngAfterContentInit: s,
            ngAfterContentChecked: a,
            ngAfterViewInit: u,
            ngAfterViewChecked: c,
            ngOnDestroy: l
        } = i;
        s && (e.contentHooks ??= []).push(-n, s), a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)), u && (e.viewHooks ??= []).push(-n, u), c && ((e.viewHooks ??= []).push(n, c), (e.viewCheckHooks ??= []).push(n, c)), l != null && (e.destroyHooks ??= []).push(n, l)
    }
}

function qr(e, t, n) {
    gd(e, t, 3, n)
}

function Zr(e, t, n, r) {
    (e[I] & 3) === n && gd(e, t, n, r)
}

function Li(e, t) {
    let n = e[I];
    (n & 3) === t && (n &= 16383, n += 1, e[I] = n)
}

function gd(e, t, n, r) {
    let o = r !== void 0 ? e[on] & 65535 : 0, i = r ?? -1, s = t.length - 1, a = 0;
    for (let u = o; u < s; u++) if (typeof t[u + 1] == "number") {
        if (a = t[u], r != null && a >= r) break
    } else t[u] < 0 && (e[on] += 65536), (a < i || i == -1) && (Hm(e, n, t, u), e[on] = (e[on] & 4294901760) + u + 2), u++
}

function Bc(e, t) {
    ke(4, e, t);
    let n = T(null);
    try {
        t.call(e)
    } finally {
        T(n), ke(5, e, t)
    }
}

function Hm(e, t, n, r) {
    let o = n[r] < 0, i = n[r + 1], s = o ? -n[r] : n[r], a = e[s];
    o ? e[I] >> 14 < e[on] >> 16 && (e[I] & 3) === t && (e[I] += 16384, Bc(a, i)) : Bc(a, i)
}

var cn = -1, Lt = class {
    constructor(t, n, r) {
        this.factory = t, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r
    }
};

function Um(e) {
    return e instanceof Lt
}

function zm(e) {
    return (e.flags & 8) !== 0
}

function Gm(e) {
    return (e.flags & 16) !== 0
}

var ji = {}, us = class {
    constructor(t, n) {
        this.injector = t, this.parentInjector = n
    }

    get(t, n, r) {
        r = No(r);
        let o = this.injector.get(t, ji, r);
        return o !== ji || n === ji ? o : this.parentInjector.get(t, n, r)
    }
};

function md(e) {
    return e !== cn
}

function ao(e) {
    return e & 32767
}

function Wm(e) {
    return e >> 16
}

function uo(e, t) {
    let n = Wm(e), r = t;
    for (; n > 0;) r = r[In], n--;
    return r
}

var cs = !0;

function co(e) {
    let t = cs;
    return cs = e, t
}

var qm = 256, yd = qm - 1, vd = 5, Zm = 0, Le = {};

function Ym(e, t, n) {
    let r;
    typeof n == "string" ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Ln) && (r = n[Ln]), r == null && (r = n[Ln] = Zm++);
    let o = r & yd, i = 1 << o;
    t.data[e + (o >> vd)] |= i
}

function lo(e, t) {
    let n = Dd(e, t);
    if (n !== -1) return n;
    let r = t[C];
    r.firstCreatePass && (e.injectorIndex = t.length, Vi(r.data, e), Vi(t, null), Vi(r.blueprint, null));
    let o = Ra(e, t), i = e.injectorIndex;
    if (md(o)) {
        let s = ao(o), a = uo(o, t), u = a[C].data;
        for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c]
    }
    return t[i + 8] = o, i
}

function Vi(e, t) {
    e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
}

function Dd(e, t) {
    return e.injectorIndex === -1 || e.parent && e.parent.injectorIndex === e.injectorIndex || t[e.injectorIndex + 8] === null ? -1 : e.injectorIndex
}

function Ra(e, t) {
    if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
    let n = 0, r = null, o = t;
    for (; o !== null;) {
        if (r = bd(o), r === null) return cn;
        if (n++, o = o[In], r.injectorIndex !== -1) return r.injectorIndex | n << 16
    }
    return cn
}

function ls(e, t, n) {
    Ym(e, t, n)
}

function Qm(e, t) {
    if (t === "class") return e.classes;
    if (t === "style") return e.styles;
    let n = e.attrs;
    if (n) {
        let r = n.length, o = 0;
        for (; o < r;) {
            let i = n[o];
            if (Fl(i)) break;
            if (i === 0) o = o + 2; else if (typeof i == "number") for (o++; o < r && typeof n[o] == "string";) o++; else {
                if (i === t) return n[o + 1];
                o = o + 2
            }
        }
    }
    return null
}

function Id(e, t, n) {
    if (n & N.Optional || e !== void 0) return e;
    ga(t, "NodeInjector")
}

function wd(e, t, n, r) {
    if (n & N.Optional && r === void 0 && (r = null), !(n & (N.Self | N.Host))) {
        let o = e[fn], i = le(void 0);
        try {
            return o ? o.get(t, r, n & N.Optional) : xl(t, r, n & N.Optional)
        } finally {
            le(i)
        }
    }
    return Id(r, t, n)
}

function Ed(e, t, n, r = N.Default, o) {
    if (e !== null) {
        if (t[I] & 2048 && !(r & N.Self)) {
            let s = ey(e, t, n, r, Le);
            if (s !== Le) return s
        }
        let i = Cd(e, t, n, r, Le);
        if (i !== Le) return i
    }
    return wd(t, n, r, o)
}

function Cd(e, t, n, r, o) {
    let i = Jm(n);
    if (typeof i == "function") {
        if (!cd(t, e, r)) return r & N.Host ? Id(o, n, r) : wd(t, n, r, o);
        try {
            let s;
            if (s = i(r), s == null && !(r & N.Optional)) ga(n); else return s
        } finally {
            pd()
        }
    } else if (typeof i == "number") {
        let s = null, a = Dd(e, t), u = cn, c = r & N.Host ? t[fe][ie] : null;
        for ((a === -1 || r & N.SkipSelf) && (u = a === -1 ? Ra(e, t) : t[a + 8], u === cn || !Hc(r, !1) ? a = -1 : (s = t[C], a = ao(u), t = uo(u, t))); a !== -1;) {
            let l = t[C];
            if ($c(i, a, l.data)) {
                let d = Km(a, t, n, s, r, c);
                if (d !== Le) return d
            }
            u = t[a + 8], u !== cn && Hc(r, t[C].data[a + 8] === c) && $c(i, a, t) ? (s = l, a = ao(u), t = uo(u, t)) : a = -1
        }
    }
    return o
}

function Km(e, t, n, r, o, i) {
    let s = t[C], a = s.data[e + 8], u = r == null ? Ro(a) && cs : r != s && (a.type & 3) !== 0,
        c = o & N.Host && i === a, l = Yr(a, s, n, u, c);
    return l !== null ? jt(t, s, l, a) : Le
}

function Yr(e, t, n, r, o) {
    let i = e.providerIndexes, s = t.data, a = i & 1048575, u = e.directiveStart, c = e.directiveEnd, l = i >> 20,
        d = r ? a : a + l, p = o ? a + l : c;
    for (let f = d; f < p; f++) {
        let h = s[f];
        if (f < u && n === h || f >= u && h.type === n) return f
    }
    if (o) {
        let f = s[u];
        if (f && Qe(f) && f.type === n) return u
    }
    return null
}

function jt(e, t, n, r) {
    let o = e[n], i = t.data;
    if (Um(o)) {
        let s = o;
        s.resolving && bg(Cg(i[n]));
        let a = co(s.canSeeViewProviders);
        s.resolving = !0;
        let u, c = s.injectImpl ? le(s.injectImpl) : null, l = cd(e, r, N.Default);
        try {
            o = e[n] = s.factory(void 0, i, e, r), t.firstCreatePass && n >= r.directiveStart && $m(n, i[n], t)
        } finally {
            c !== null && le(c), co(a), s.resolving = !1, pd()
        }
    }
    return o
}

function Jm(e) {
    if (typeof e == "string") return e.charCodeAt(0) || 0;
    let t = e.hasOwnProperty(Ln) ? e[Ln] : void 0;
    return typeof t == "number" ? t >= 0 ? t & yd : Xm : t
}

function $c(e, t, n) {
    let r = 1 << e;
    return !!(n[t + (e >> vd)] & r)
}

function Hc(e, t) {
    return !(e & N.Self) && !(e & N.Host && t)
}

var Nt = class {
    constructor(t, n) {
        this._tNode = t, this._lView = n
    }

    get(t, n, r) {
        return Ed(this._tNode, this._lView, t, No(r), n)
    }
};

function Xm() {
    return new Nt(Z(), D())
}

function AN(e) {
    return Zn(() => {
        let t = e.prototype.constructor, n = t[Xr] || ds(t), r = Object.prototype,
            o = Object.getPrototypeOf(e.prototype).constructor;
        for (; o && o !== r;) {
            let i = o[Xr] || ds(o);
            if (i && i !== n) return i;
            o = Object.getPrototypeOf(o)
        }
        return i => new i
    })
}

function ds(e) {
    return wl(e) ? () => {
        let t = ds(J(e));
        return t && t()
    } : Ot(e)
}

function ey(e, t, n, r, o) {
    let i = e, s = t;
    for (; i !== null && s !== null && s[I] & 2048 && !(s[I] & 512);) {
        let a = Cd(i, s, n, r | N.Self, Le);
        if (a !== Le) return a;
        let u = i.parent;
        if (!u) {
            let c = s[ql];
            if (c) {
                let l = c.get(n, Le, r);
                if (l !== Le) return l
            }
            u = bd(s), s = s[In]
        }
        i = u
    }
    return o
}

function bd(e) {
    let t = e[C], n = t.type;
    return n === 2 ? t.declTNode : n === 1 ? e[ie] : null
}

function ty(e) {
    return Qm(Z(), e)
}

function Uc(e, t = null, n = null, r) {
    let o = _d(e, t, n, r);
    return o.resolveInjectorInitializers(), o
}

function _d(e, t = null, n = null, r, o = new Set) {
    let i = [n || X, im(e)];
    return r = r || (typeof e == "object" ? void 0 : oe(e)), new Hn(i, t || Oo(), r || null, o)
}

var Je = class e {
    static {
        this.THROW_IF_NOT_FOUND = Vn
    }
    static {
        this.NULL = new ro
    }

    static create(t, n) {
        if (Array.isArray(t)) return Uc({name: ""}, n, t, "");
        {
            let r = t.name ?? "";
            return Uc({name: r}, t.parent, t.providers, r)
        }
    }

    static {
        this.\u0275prov = B({token: e, providedIn: "any", factory: () => ne(Nl)})
    }
    static {
        this.__NG_ELEMENT_ID__ = -1
    }
};
var ny = new O("");
ny.__NG_ELEMENT_ID__ = e => {
    let t = Z();
    if (t === null) throw new A(204, !1);
    if (t.type & 2) return t.value;
    if (e & N.Optional) return null;
    throw new A(204, !1)
};
var ry = "ngOriginalError";

function Bi(e) {
    return e[ry]
}

var Md = !0, $o = (() => {
    class e {
        static {
            this.__NG_ELEMENT_ID__ = oy
        }
        static {
            this.__NG_ENV_ID__ = n => n
        }
    }

    return e
})(), fs = class extends $o {
    constructor(t) {
        super(), this._lView = t
    }

    onDestroy(t) {
        return nd(this._lView, t), () => _m(this._lView, t)
    }
};

function oy() {
    return new fs(D())
}

var Jn = (() => {
    class e {
        constructor() {
            this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new Sn(!1)
        }

        get _hasPendingTasks() {
            return this.hasPendingTasks.value
        }

        add() {
            this._hasPendingTasks || this.hasPendingTasks.next(!0);
            let n = this.taskId++;
            return this.pendingTasks.add(n), n
        }

        remove(n) {
            this.pendingTasks.delete(n), this.pendingTasks.size === 0 && this._hasPendingTasks && this.hasPendingTasks.next(!1)
        }

        ngOnDestroy() {
            this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1)
        }

        static {
            this.\u0275prov = B({token: e, providedIn: "root", factory: () => new e})
        }
    }

    return e
})();
var ps = class extends De {
    constructor(t = !1) {
        super(), this.destroyRef = void 0, this.pendingTasks = void 0, this.__isAsync = t, Wl() && (this.destroyRef = M($o, {optional: !0}) ?? void 0, this.pendingTasks = M(Jn, {optional: !0}) ?? void 0)
    }

    emit(t) {
        let n = T(null);
        try {
            super.next(t)
        } finally {
            T(n)
        }
    }

    subscribe(t, n, r) {
        let o = t, i = n || (() => null), s = r;
        if (t && typeof t == "object") {
            let u = t;
            o = u.next?.bind(u), i = u.error?.bind(u), s = u.complete?.bind(u)
        }
        this.__isAsync && (i = this.wrapInTimeout(i), o && (o = this.wrapInTimeout(o)), s && (s = this.wrapInTimeout(s)));
        let a = super.subscribe({next: o, error: i, complete: s});
        return t instanceof G && t.add(a), a
    }

    wrapInTimeout(t) {
        return n => {
            let r = this.pendingTasks?.add();
            setTimeout(() => {
                t(n), r !== void 0 && this.pendingTasks?.remove(r)
            })
        }
    }
}, xe = ps;

function fo(...e) {
}

function xd(e) {
    let t, n;

    function r() {
        e = fo;
        try {
            n !== void 0 && typeof cancelAnimationFrame == "function" && cancelAnimationFrame(n), t !== void 0 && clearTimeout(t)
        } catch {
        }
    }

    return t = setTimeout(() => {
        e(), r()
    }), typeof requestAnimationFrame == "function" && (n = requestAnimationFrame(() => {
        e(), r()
    })), () => r()
}

function zc(e) {
    return queueMicrotask(() => e()), () => {
        e = fo
    }
}

var Pa = "isAngularZone", po = Pa + "_ID", iy = 0, de = class e {
    constructor(t) {
        this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new xe(!1), this.onMicrotaskEmpty = new xe(!1), this.onStable = new xe(!1), this.onError = new xe(!1);
        let {
            enableLongStackTrace: n = !1,
            shouldCoalesceEventChangeDetection: r = !1,
            shouldCoalesceRunChangeDetection: o = !1,
            scheduleInRootZone: i = Md
        } = t;
        if (typeof Zone > "u") throw new A(908, !1);
        Zone.assertZonePatched();
        let s = this;
        s._nesting = 0, s._outer = s._inner = Zone.current, Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)), s.shouldCoalesceEventChangeDetection = !o && r, s.shouldCoalesceRunChangeDetection = o, s.callbackScheduled = !1, s.scheduleInRootZone = i, uy(s)
    }

    static isInAngularZone() {
        return typeof Zone < "u" && Zone.current.get(Pa) === !0
    }

    static assertInAngularZone() {
        if (!e.isInAngularZone()) throw new A(909, !1)
    }

    static assertNotInAngularZone() {
        if (e.isInAngularZone()) throw new A(909, !1)
    }

    run(t, n, r) {
        return this._inner.run(t, n, r)
    }

    runTask(t, n, r, o) {
        let i = this._inner, s = i.scheduleEventTask("NgZoneEvent: " + o, t, sy, fo, fo);
        try {
            return i.runTask(s, n, r)
        } finally {
            i.cancelTask(s)
        }
    }

    runGuarded(t, n, r) {
        return this._inner.runGuarded(t, n, r)
    }

    runOutsideAngular(t) {
        return this._outer.run(t)
    }
}, sy = {};

function ka(e) {
    if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable) try {
        e._nesting++, e.onMicrotaskEmpty.emit(null)
    } finally {
        if (e._nesting--, !e.hasPendingMicrotasks) try {
            e.runOutsideAngular(() => e.onStable.emit(null))
        } finally {
            e.isStable = !0
        }
    }
}

function ay(e) {
    if (e.isCheckStableRunning || e.callbackScheduled) return;
    e.callbackScheduled = !0;

    function t() {
        xd(() => {
            e.callbackScheduled = !1, hs(e), e.isCheckStableRunning = !0, ka(e), e.isCheckStableRunning = !1
        })
    }

    e.scheduleInRootZone ? Zone.root.run(() => {
        t()
    }) : e._outer.run(() => {
        t()
    }), hs(e)
}

function uy(e) {
    let t = () => {
        ay(e)
    }, n = iy++;
    e._inner = e._inner.fork({
        name: "angular",
        properties: {[Pa]: !0, [po]: n, [po + n]: !0},
        onInvokeTask: (r, o, i, s, a, u) => {
            if (cy(u)) return r.invokeTask(i, s, a, u);
            try {
                return Gc(e), r.invokeTask(i, s, a, u)
            } finally {
                (e.shouldCoalesceEventChangeDetection && s.type === "eventTask" || e.shouldCoalesceRunChangeDetection) && t(), Wc(e)
            }
        },
        onInvoke: (r, o, i, s, a, u, c) => {
            try {
                return Gc(e), r.invoke(i, s, a, u, c)
            } finally {
                e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !ly(u) && t(), Wc(e)
            }
        },
        onHasTask: (r, o, i, s) => {
            r.hasTask(i, s), o === i && (s.change == "microTask" ? (e._hasPendingMicrotasks = s.microTask, hs(e), ka(e)) : s.change == "macroTask" && (e.hasPendingMacrotasks = s.macroTask))
        },
        onHandleError: (r, o, i, s) => (r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1)
    })
}

function hs(e) {
    e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && e.callbackScheduled === !0 ? e.hasPendingMicrotasks = !0 : e.hasPendingMicrotasks = !1
}

function Gc(e) {
    e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
}

function Wc(e) {
    e._nesting--, ka(e)
}

var gs = class {
    constructor() {
        this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new xe, this.onMicrotaskEmpty = new xe, this.onStable = new xe, this.onError = new xe
    }

    run(t, n, r) {
        return t.apply(n, r)
    }

    runGuarded(t, n, r) {
        return t.apply(n, r)
    }

    runOutsideAngular(t) {
        return t()
    }

    runTask(t, n, r, o) {
        return t.apply(n, r)
    }
};

function cy(e) {
    return Sd(e, "__ignore_ng_zone__")
}

function ly(e) {
    return Sd(e, "__scheduler_tick__")
}

function Sd(e, t) {
    return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0
}

var Vt = class {
    constructor() {
        this._console = console
    }

    handleError(t) {
        let n = this._findOriginalError(t);
        this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n)
    }

    _findOriginalError(t) {
        let n = t && Bi(t);
        for (; n && Bi(n);) n = Bi(n);
        return n || null
    }
}, dy = new O("", {
    providedIn: "root", factory: () => {
        let e = M(de), t = M(Vt);
        return n => e.runOutsideAngular(() => t.handleError(n))
    }
});

function fy() {
    return En(Z(), D())
}

function En(e, t) {
    return new Gt(we(e, t))
}

var Gt = (() => {
    class e {
        constructor(n) {
            this.nativeElement = n
        }

        static {
            this.__NG_ELEMENT_ID__ = fy
        }
    }

    return e
})();

function Td(e) {
    return e instanceof Gt ? e.nativeElement : e
}

function py() {
    return this._results[Symbol.iterator]()
}

var ms = class e {
    get changes() {
        return this._changes ??= new xe
    }

    constructor(t = !1) {
        this._emitDistinctChangesOnly = t, this.dirty = !0, this._onDirty = void 0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
        let n = e.prototype;
        n[Symbol.iterator] || (n[Symbol.iterator] = py)
    }

    get(t) {
        return this._results[t]
    }

    map(t) {
        return this._results.map(t)
    }

    filter(t) {
        return this._results.filter(t)
    }

    find(t) {
        return this._results.find(t)
    }

    reduce(t, n) {
        return this._results.reduce(t, n)
    }

    forEach(t) {
        this._results.forEach(t)
    }

    some(t) {
        return this._results.some(t)
    }

    toArray() {
        return this._results.slice()
    }

    toString() {
        return this._results.toString()
    }

    reset(t, n) {
        this.dirty = !1;
        let r = Lg(t);
        (this._changesDetected = !kg(this._results, r, n)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0])
    }

    notifyOnChanges() {
        this._changes !== void 0 && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
    }

    onDirty(t) {
        this._onDirty = t
    }

    setDirty() {
        this.dirty = !0, this._onDirty?.()
    }

    destroy() {
        this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe())
    }
};

function Nd(e) {
    return (e.flags & 128) === 128
}

var Ad = new Map, hy = 0;

function gy() {
    return hy++
}

function my(e) {
    Ad.set(e[Fo], e)
}

function ys(e) {
    Ad.delete(e[Fo])
}

var qc = "__ngContext__";

function mt(e, t) {
    pt(t) ? (e[qc] = t[Fo], my(t)) : e[qc] = t
}

function Od(e) {
    return Rd(e[Un])
}

function Fd(e) {
    return Rd(e[Se])
}

function Rd(e) {
    for (; e !== null && !et(e);) e = e[Se];
    return e
}

var vs;

function ON(e) {
    vs = e
}

function La() {
    if (vs !== void 0) return vs;
    if (typeof document < "u") return document;
    throw new A(210, !1)
}

var FN = new O("", {providedIn: "root", factory: () => yy}), yy = "ng", vy = new O(""),
    ja = new O("", {providedIn: "platform", factory: () => "unknown"});
var RN = new O(""), PN = new O("", {
    providedIn: "root",
    factory: () => La().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
});
var Dy = "h", Iy = "b";
var wy = () => null;

function Va(e, t, n = !1) {
    return wy(e, t, n)
}

var Pd = !1, Ey = new O("", {providedIn: "root", factory: () => Pd});
var Vr;

function Cy() {
    if (Vr === void 0 && (Vr = null, dt.trustedTypes)) try {
        Vr = dt.trustedTypes.createPolicy("angular", {
            createHTML: e => e,
            createScript: e => e,
            createScriptURL: e => e
        })
    } catch {
    }
    return Vr
}

function Ho(e) {
    return Cy()?.createHTML(e) || e
}

var Br;

function by() {
    if (Br === void 0 && (Br = null, dt.trustedTypes)) try {
        Br = dt.trustedTypes.createPolicy("angular#unsafe-bypass", {
            createHTML: e => e,
            createScript: e => e,
            createScriptURL: e => e
        })
    } catch {
    }
    return Br
}

function Zc(e) {
    return by()?.createHTML(e) || e
}

var Xe = class {
    constructor(t) {
        this.changingThisBreaksApplicationSecurity = t
    }

    toString() {
        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${yl})`
    }
}, Ds = class extends Xe {
    getTypeName() {
        return "HTML"
    }
}, Is = class extends Xe {
    getTypeName() {
        return "Style"
    }
}, ws = class extends Xe {
    getTypeName() {
        return "Script"
    }
}, Es = class extends Xe {
    getTypeName() {
        return "URL"
    }
}, Cs = class extends Xe {
    getTypeName() {
        return "ResourceURL"
    }
};

function Xn(e) {
    return e instanceof Xe ? e.changingThisBreaksApplicationSecurity : e
}

function kd(e, t) {
    let n = _y(e);
    if (n != null && n !== t) {
        if (n === "ResourceURL" && t === "URL") return !0;
        throw new Error(`Required a safe ${t}, got a ${n} (see ${yl})`)
    }
    return n === t
}

function _y(e) {
    return e instanceof Xe && e.getTypeName() || null
}

function kN(e) {
    return new Ds(e)
}

function LN(e) {
    return new Is(e)
}

function jN(e) {
    return new ws(e)
}

function VN(e) {
    return new Es(e)
}

function BN(e) {
    return new Cs(e)
}

function Ld(e) {
    let t = new _s(e);
    return My() ? new bs(t) : t
}

var bs = class {
    constructor(t) {
        this.inertDocumentHelper = t
    }

    getInertBodyElement(t) {
        t = "<body><remove></remove>" + t;
        try {
            let n = new window.DOMParser().parseFromString(Ho(t), "text/html").body;
            return n === null ? this.inertDocumentHelper.getInertBodyElement(t) : (n.firstChild?.remove(), n)
        } catch {
            return null
        }
    }
}, _s = class {
    constructor(t) {
        this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")
    }

    getInertBodyElement(t) {
        let n = this.inertDocument.createElement("template");
        return n.innerHTML = Ho(t), n
    }
};

function My() {
    try {
        return !!new window.DOMParser().parseFromString(Ho(""), "text/html")
    } catch {
        return !1
    }
}

var xy = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

function Ba(e) {
    return e = String(e), e.match(xy) ? e : "unsafe:" + e
}

function nt(e) {
    let t = {};
    for (let n of e.split(",")) t[n] = !0;
    return t
}

function er(...e) {
    let t = {};
    for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
    return t
}

var jd = nt("area,br,col,hr,img,wbr"), Vd = nt("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), Bd = nt("rp,rt"),
    Sy = er(Bd, Vd),
    Ty = er(Vd, nt("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),
    Ny = er(Bd, nt("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),
    Ms = er(jd, Ty, Ny, Sy), $a = nt("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
    Ay = nt("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),
    Oy = nt("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),
    $d = er($a, Ay, Oy), Fy = nt("script,style,template"), xs = class {
        constructor() {
            this.sanitizedSomething = !1, this.buf = []
        }

        sanitizeChildren(t) {
            let n = t.firstChild, r = !0, o = [];
            for (; n;) {
                if (n.nodeType === Node.ELEMENT_NODE ? r = this.startElement(n) : n.nodeType === Node.TEXT_NODE ? this.chars(n.nodeValue) : this.sanitizedSomething = !0, r && n.firstChild) {
                    o.push(n), n = ky(n);
                    continue
                }
                for (; n;) {
                    n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                    let i = Py(n);
                    if (i) {
                        n = i;
                        break
                    }
                    n = o.pop()
                }
            }
            return this.buf.join("")
        }

        startElement(t) {
            let n = Yc(t).toLowerCase();
            if (!Ms.hasOwnProperty(n)) return this.sanitizedSomething = !0, !Fy.hasOwnProperty(n);
            this.buf.push("<"), this.buf.push(n);
            let r = t.attributes;
            for (let o = 0; o < r.length; o++) {
                let i = r.item(o), s = i.name, a = s.toLowerCase();
                if (!$d.hasOwnProperty(a)) {
                    this.sanitizedSomething = !0;
                    continue
                }
                let u = i.value;
                $a[a] && (u = Ba(u)), this.buf.push(" ", s, '="', Qc(u), '"')
            }
            return this.buf.push(">"), !0
        }

        endElement(t) {
            let n = Yc(t).toLowerCase();
            Ms.hasOwnProperty(n) && !jd.hasOwnProperty(n) && (this.buf.push("</"), this.buf.push(n), this.buf.push(">"))
        }

        chars(t) {
            this.buf.push(Qc(t))
        }
    };

function Ry(e, t) {
    return (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY
}

function Py(e) {
    let t = e.nextSibling;
    if (t && e !== t.previousSibling) throw Hd(t);
    return t
}

function ky(e) {
    let t = e.firstChild;
    if (t && Ry(e, t)) throw Hd(t);
    return t
}

function Yc(e) {
    let t = e.nodeName;
    return typeof t == "string" ? t : "FORM"
}

function Hd(e) {
    return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)
}

var Ly = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, jy = /([^\#-~ |!])/g;

function Qc(e) {
    return e.replace(/&/g, "&amp;").replace(Ly, function (t) {
        let n = t.charCodeAt(0), r = t.charCodeAt(1);
        return "&#" + ((n - 55296) * 1024 + (r - 56320) + 65536) + ";"
    }).replace(jy, function (t) {
        return "&#" + t.charCodeAt(0) + ";"
    }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

var $r;

function Vy(e, t) {
    let n = null;
    try {
        $r = $r || Ld(e);
        let r = t ? String(t) : "";
        n = $r.getInertBodyElement(r);
        let o = 5, i = r;
        do {
            if (o === 0) throw new Error("Failed to sanitize html because the input is unstable");
            o--, r = i, i = n.innerHTML, n = $r.getInertBodyElement(r)
        } while (r !== i);
        let a = new xs().sanitizeChildren(Ss(n) || n);
        return Ho(a)
    } finally {
        if (n) {
            let r = Ss(n) || n;
            for (; r.firstChild;) r.firstChild.remove()
        }
    }
}

function Ss(e) {
    return "content" in e && By(e) ? e.content : null
}

function By(e) {
    return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE"
}

var Ha = function (e) {
    return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
}(Ha || {});

function $N(e) {
    let t = Ud();
    return t ? Zc(t.sanitize(Ha.HTML, e) || "") : kd(e, "HTML") ? Zc(Xn(e)) : Vy(La(), At(e))
}

function HN(e) {
    let t = Ud();
    return t ? t.sanitize(Ha.URL, e) || "" : kd(e, "URL") ? Xn(e) : Ba(At(e))
}

function Ud() {
    let e = D();
    return e && e[je].sanitizer
}

var $y = /^>|^->|<!--|-->|--!>|<!-$/g, Hy = /(<|>)/g, Uy = "\u200B$1\u200B";

function zy(e) {
    return e.replace($y, t => t.replace(Hy, Uy))
}

function UN(e) {
    return e.ownerDocument.defaultView
}

function zd(e) {
    return e instanceof Function ? e() : e
}

function Gd(e) {
    return (e ?? M(Je)).get(ja) === "browser"
}

var ho = function (e) {
    return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
}(ho || {}), Ts;

function Ua(e, t) {
    return Ts(e, t)
}

function Gy(e) {
    Ts === void 0 && (Ts = e())
}

function sn(e, t, n, r, o) {
    if (r != null) {
        let i, s = !1;
        et(r) ? i = r : pt(r) && (s = !0, r = r[Be]);
        let a = Te(r);
        e === 0 && n !== null ? o == null ? Jd(t, n, a) : hn(t, n, a, o || null, !0) : e === 1 && n !== null ? hn(t, n, a, o || null, !0) : e === 2 ? ev(t, a, s) : e === 3 && t.destroyNode(a), i != null && nv(t, e, i, n, o)
    }
}

function Wd(e, t) {
    return e.createText(t)
}

function Wy(e, t, n) {
    e.setValue(t, n)
}

function qd(e, t) {
    return e.createComment(zy(t))
}

function za(e, t, n) {
    return e.createElement(t, n)
}

function qy(e, t) {
    Zd(e, t), t[Be] = null, t[ie] = null
}

function Zy(e, t, n, r, o, i) {
    r[Be] = o, r[ie] = t, Go(e, r, n, 1, o, i)
}

function Zd(e, t) {
    t[je].changeDetectionScheduler?.notify(9), Go(e, t, t[P], 2, null, null)
}

function Yy(e) {
    let t = e[Un];
    if (!t) return $i(e[C], e);
    for (; t;) {
        let n = null;
        if (pt(t)) n = t[Un]; else {
            let r = t[te];
            r && (n = r)
        }
        if (!n) {
            for (; t && !t[Se] && t !== e;) pt(t) && $i(t[C], t), t = t[re];
            t === null && (t = e), pt(t) && $i(t[C], t), n = t && t[Se]
        }
        t = n
    }
}

function Qy(e, t, n, r) {
    let o = te + r, i = n.length;
    r > 0 && (n[o - 1][Se] = t), r < i - te ? (t[Se] = n[o], Tl(n, te + r, t)) : (n.push(t), t[Se] = null), t[re] = n;
    let s = t[Ft];
    s !== null && n !== s && Yd(s, t);
    let a = t[Ye];
    a !== null && a.insertView(e), ss(t), t[I] |= 128
}

function Yd(e, t) {
    let n = e[pn], r = t[re];
    if (pt(r)) e[I] |= so.HasTransplantedViews; else {
        let o = r[re][fe];
        t[fe] !== o && (e[I] |= so.HasTransplantedViews)
    }
    n === null ? e[pn] = [t] : n.push(t)
}

function Ga(e, t) {
    let n = e[pn], r = n.indexOf(t);
    n.splice(r, 1)
}

function Gn(e, t) {
    if (e.length <= te) return;
    let n = te + t, r = e[n];
    if (r) {
        let o = r[Ft];
        o !== null && o !== e && Ga(o, r), t > 0 && (e[n - 1][Se] = r[Se]);
        let i = to(e, te + t);
        qy(r[C], r);
        let s = i[Ye];
        s !== null && s.detachView(i[C]), r[re] = null, r[Se] = null, r[I] &= -129
    }
    return r
}

function Uo(e, t) {
    if (!(t[I] & 256)) {
        let n = t[P];
        n.destroyNode && Go(e, t, n, 3, null, null), Yy(t)
    }
}

function $i(e, t) {
    if (t[I] & 256) return;
    let n = T(null);
    try {
        t[I] &= -129, t[I] |= 256, t[Ie] && dr(t[Ie]), Jy(e, t), Ky(e, t), t[C].type === 1 && t[P].destroy();
        let r = t[Ft];
        if (r !== null && et(t[re])) {
            r !== t[re] && Ga(r, t);
            let o = t[Ye];
            o !== null && o.detachView(e)
        }
        ys(t)
    } finally {
        T(n)
    }
}

function Ky(e, t) {
    let n = e.cleanup, r = t[oo];
    if (n !== null) for (let i = 0; i < n.length - 1; i += 2) if (typeof n[i] == "string") {
        let s = n[i + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2
    } else {
        let s = r[n[i + 1]];
        n[i].call(s)
    }
    r !== null && (t[oo] = null);
    let o = t[ft];
    if (o !== null) {
        t[ft] = null;
        for (let i = 0; i < o.length; i++) {
            let s = o[i];
            s()
        }
    }
}

function Jy(e, t) {
    let n;
    if (e != null && (n = e.destroyHooks) != null) for (let r = 0; r < n.length; r += 2) {
        let o = t[n[r]];
        if (!(o instanceof Lt)) {
            let i = n[r + 1];
            if (Array.isArray(i)) for (let s = 0; s < i.length; s += 2) {
                let a = o[i[s]], u = i[s + 1];
                ke(4, a, u);
                try {
                    u.call(a)
                } finally {
                    ke(5, a, u)
                }
            } else {
                ke(4, o, i);
                try {
                    i.call(o)
                } finally {
                    ke(5, o, i)
                }
            }
        }
    }
}

function Qd(e, t, n) {
    return Kd(e, t.parent, n)
}

function Kd(e, t, n) {
    let r = t;
    for (; r !== null && r.type & 168;) t = r, r = t.parent;
    if (r === null) return n[Be];
    {
        let {componentOffset: o} = r;
        if (o > -1) {
            let {encapsulation: i} = e.data[r.directiveStart + o];
            if (i === Bn.None || i === Bn.Emulated) return null
        }
        return we(r, n)
    }
}

function hn(e, t, n, r, o) {
    e.insertBefore(t, n, r, o)
}

function Jd(e, t, n) {
    e.appendChild(t, n)
}

function Kc(e, t, n, r, o) {
    r !== null ? hn(e, t, n, r, o) : Jd(e, t, n)
}

function Xd(e, t) {
    return e.parentNode(t)
}

function Xy(e, t) {
    return e.nextSibling(t)
}

function ef(e, t, n) {
    return nf(e, t, n)
}

function tf(e, t, n) {
    return e.type & 40 ? we(e, n) : null
}

var nf = tf, Ns;

function rf(e, t) {
    nf = e, Ns = t
}

function zo(e, t, n, r) {
    let o = Qd(e, r, t), i = t[P], s = r.parent || t[ie], a = ef(s, r, t);
    if (o != null) if (Array.isArray(n)) for (let u = 0; u < n.length; u++) Kc(i, o, n[u], a, !1); else Kc(i, o, n, a, !1);
    Ns !== void 0 && Ns(i, r, t, n, o)
}

function kn(e, t) {
    if (t !== null) {
        let n = t.type;
        if (n & 3) return we(t, e);
        if (n & 4) return As(-1, e[t.index]);
        if (n & 8) {
            let r = t.child;
            if (r !== null) return kn(e, r);
            {
                let o = e[t.index];
                return et(o) ? As(-1, o) : Te(o)
            }
        } else {
            if (n & 128) return kn(e, t.next);
            if (n & 32) return Ua(t, e)() || Te(e[t.index]);
            {
                let r = of(e, t);
                if (r !== null) {
                    if (Array.isArray(r)) return r[0];
                    let o = Pt(e[fe]);
                    return kn(o, r)
                } else return kn(e, t.next)
            }
        }
    }
    return null
}

function of(e, t) {
    if (t !== null) {
        let r = e[fe][ie], o = t.projection;
        return r.projection[o]
    }
    return null
}

function As(e, t) {
    let n = te + e + 1;
    if (n < t.length) {
        let r = t[n], o = r[C].firstChild;
        if (o !== null) return kn(r, o)
    }
    return t[Rt]
}

function ev(e, t, n) {
    e.removeChild(null, t, n)
}

function Wa(e, t, n, r, o, i, s) {
    for (; n != null;) {
        if (n.type === 128) {
            n = n.next;
            continue
        }
        let a = r[n.index], u = n.type;
        if (s && t === 0 && (a && mt(Te(a), r), n.flags |= 2), (n.flags & 32) !== 32) if (u & 8) Wa(e, t, n.child, r, o, i, !1), sn(t, e, o, a, i); else if (u & 32) {
            let c = Ua(n, r), l;
            for (; l = c();) sn(t, e, o, l, i);
            sn(t, e, o, a, i)
        } else u & 16 ? sf(e, t, r, n, o, i) : sn(t, e, o, a, i);
        n = s ? n.projectionNext : n.next
    }
}

function Go(e, t, n, r, o, i) {
    Wa(n, r, e.firstChild, t, o, i, !1)
}

function tv(e, t, n) {
    let r = t[P], o = Qd(e, n, t), i = n.parent || t[ie], s = ef(i, n, t);
    sf(r, 0, t, n, o, s)
}

function sf(e, t, n, r, o, i) {
    let s = n[fe], u = s[ie].projection[r.projection];
    if (Array.isArray(u)) for (let c = 0; c < u.length; c++) {
        let l = u[c];
        sn(t, e, o, l, i)
    } else {
        let c = u, l = s[re];
        Nd(r) && (c.flags |= 128), Wa(e, t, c, l, o, i, !0)
    }
}

function nv(e, t, n, r, o) {
    let i = n[Rt], s = Te(n);
    i !== s && sn(t, e, r, i, o);
    for (let a = te; a < n.length; a++) {
        let u = n[a];
        Go(u[C], u, e, t, r, i)
    }
}

function rv(e, t, n, r, o) {
    if (t) o ? e.addClass(n, r) : e.removeClass(n, r); else {
        let i = r.indexOf("-") === -1 ? void 0 : ho.DashCase;
        o == null ? e.removeStyle(n, r, i) : (typeof o == "string" && o.endsWith("!important") && (o = o.slice(0, -10), i |= ho.Important), e.setStyle(n, r, o, i))
    }
}

function ov(e, t, n) {
    e.setAttribute(t, "style", n)
}

function af(e, t, n) {
    n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
}

function uf(e, t, n) {
    let {mergedAttrs: r, classes: o, styles: i} = n;
    r !== null && es(e, t, r), o !== null && af(e, t, o), i !== null && ov(e, t, i)
}

var he = {};

function zN(e = 1) {
    cf(k(), D(), tt() + e, !1)
}

function cf(e, t, n, r) {
    if (!r) if ((t[I] & 3) === 3) {
        let i = e.preOrderCheckHooks;
        i !== null && qr(t, i, n)
    } else {
        let i = e.preOrderHooks;
        i !== null && Zr(t, i, 0, n)
    }
    kt(n)
}

function U(e, t = N.Default) {
    let n = D();
    if (n === null) return ne(e, t);
    let r = Z();
    return Ed(r, n, J(e), t)
}

function GN() {
    let e = "invalid";
    throw new Error(e)
}

function lf(e, t, n, r, o, i) {
    let s = T(null);
    try {
        let a = null;
        o & ht.SignalBased && (a = t[r][ve]), a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)), o & ht.HasDecoratorInputTransform && (i = e.inputTransforms[r].call(t, i)), e.setInput !== null ? e.setInput(t, a, i, n, r) : Zl(t, a, r, i)
    } finally {
        T(s)
    }
}

function iv(e, t) {
    let n = e.hostBindingOpCodes;
    if (n !== null) try {
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            if (o < 0) kt(~o); else {
                let i = o, s = n[++r], a = n[++r];
                Pm(s, i);
                let u = t[i];
                a(2, u)
            }
        }
    } finally {
        kt(-1)
    }
}

function Wo(e, t, n, r, o, i, s, a, u, c, l) {
    let d = t.blueprint.slice();
    return d[Be] = o, d[I] = r | 4 | 128 | 8 | 64, (c !== null || e && e[I] & 2048) && (d[I] |= 2048), ed(d), d[re] = d[In] = e, d[ee] = n, d[je] = s || e && e[je], d[P] = a || e && e[P], d[fn] = u || e && e[fn] || null, d[ie] = i, d[Fo] = gy(), d[dn] = l, d[ql] = c, d[fe] = t.type == 2 ? e[fe] : d, d
}

function Cn(e, t, n, r, o) {
    let i = e.data[t];
    if (i === null) i = qa(e, t, n, r, o), Rm() && (i.flags |= 32); else if (i.type & 64) {
        i.type = n, i.value = r, i.attrs = o;
        let s = zn();
        i.injectorIndex = s === null ? -1 : s.injectorIndex
    }
    return Ve(i, !0), i
}

function qa(e, t, n, r, o) {
    let i = sd(), s = xa(), a = s ? i : i && i.parent, u = e.data[t] = dv(e, a, n, t, r, o);
    return e.firstChild === null && (e.firstChild = u), i !== null && (s ? i.child == null && u.parent !== null && (i.child = u) : i.next === null && (i.next = u, u.prev = i)), u
}

function tr(e, t, n, r) {
    if (n === 0) return -1;
    let o = t.length;
    for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
    return o
}

function df(e, t, n, r, o) {
    let i = tt(), s = r & 2;
    try {
        kt(-1), s && t.length > H && cf(e, t, H, !1), ke(s ? 2 : 0, o), n(r, o)
    } finally {
        kt(i), ke(s ? 3 : 1, o)
    }
}

function Za(e, t, n) {
    if (Ca(t)) {
        let r = T(null);
        try {
            let o = t.directiveStart, i = t.directiveEnd;
            for (let s = o; s < i; s++) {
                let a = e.data[s];
                if (a.contentQueries) {
                    let u = n[s];
                    a.contentQueries(1, u, s)
                }
            }
        } finally {
            T(r)
        }
    }
}

function Ya(e, t, n) {
    od() && (yv(e, t, n, we(n, t)), (n.flags & 64) === 64 && hf(e, t, n))
}

function Qa(e, t, n = we) {
    let r = t.localNames;
    if (r !== null) {
        let o = t.index + 1;
        for (let i = 0; i < r.length; i += 2) {
            let s = r[i + 1], a = s === -1 ? n(t, e) : e[s];
            e[o++] = a
        }
    }
}

function ff(e) {
    let t = e.tView;
    return t === null || t.incompleteFirstPass ? e.tView = Ka(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t
}

function Ka(e, t, n, r, o, i, s, a, u, c, l) {
    let d = H + r, p = d + o, f = sv(d, p), h = typeof c == "function" ? c() : c;
    return f[C] = {
        type: e,
        blueprint: f,
        template: n,
        queries: null,
        viewQuery: a,
        declTNode: t,
        data: f.slice().fill(null, d),
        bindingStartIndex: d,
        expandoStartIndex: p,
        hostBindingOpCodes: null,
        firstCreatePass: !0,
        firstUpdatePass: !0,
        staticViewQueries: !1,
        staticContentQueries: !1,
        preOrderHooks: null,
        preOrderCheckHooks: null,
        contentHooks: null,
        contentCheckHooks: null,
        viewHooks: null,
        viewCheckHooks: null,
        destroyHooks: null,
        cleanup: null,
        contentQueries: null,
        components: null,
        directiveRegistry: typeof i == "function" ? i() : i,
        pipeRegistry: typeof s == "function" ? s() : s,
        firstChild: null,
        schemas: u,
        consts: h,
        incompleteFirstPass: !1,
        ssrId: l
    }
}

function sv(e, t) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(r < e ? null : he);
    return n
}

function av(e, t, n, r) {
    let i = r.get(Ey, Pd) || n === Bn.ShadowDom, s = e.selectRootElement(t, i);
    return uv(s), s
}

function uv(e) {
    cv(e)
}

var cv = () => null;

function lv(e, t, n, r) {
    let o = yf(t);
    o.push(n), e.firstCreatePass && vf(e).push(r, o.length - 1)
}

function dv(e, t, n, r, o, i) {
    let s = t ? t.injectorIndex : -1, a = 0;
    return id() && (a |= 128), {
        type: n,
        index: r,
        insertBeforeIndex: null,
        injectorIndex: s,
        directiveStart: -1,
        directiveEnd: -1,
        directiveStylingLast: -1,
        componentOffset: -1,
        propertyBindings: null,
        flags: a,
        providerIndexes: 0,
        value: o,
        attrs: i,
        mergedAttrs: null,
        localNames: null,
        initialInputs: void 0,
        inputs: null,
        outputs: null,
        tView: null,
        next: null,
        prev: null,
        projectionNext: null,
        child: null,
        parent: t,
        projection: null,
        styles: null,
        stylesWithoutHost: null,
        residualStyles: void 0,
        classes: null,
        classesWithoutHost: null,
        residualClasses: void 0,
        classBindings: 0,
        styleBindings: 0
    }
}

function Jc(e, t, n, r, o) {
    for (let i in t) {
        if (!t.hasOwnProperty(i)) continue;
        let s = t[i];
        if (s === void 0) continue;
        r ??= {};
        let a, u = ht.None;
        Array.isArray(s) ? (a = s[0], u = s[1]) : a = s;
        let c = i;
        if (o !== null) {
            if (!o.hasOwnProperty(i)) continue;
            c = o[i]
        }
        e === 0 ? Xc(r, n, c, a, u) : Xc(r, n, c, a)
    }
    return r
}

function Xc(e, t, n, r, o) {
    let i;
    e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : i = e[n] = [t, r], o !== void 0 && i.push(o)
}

function fv(e, t, n) {
    let r = t.directiveStart, o = t.directiveEnd, i = e.data, s = t.attrs, a = [], u = null, c = null;
    for (let l = r; l < o; l++) {
        let d = i[l], p = n ? n.get(d) : null, f = p ? p.inputs : null, h = p ? p.outputs : null;
        u = Jc(0, d.inputs, l, u, f), c = Jc(1, d.outputs, l, c, h);
        let g = u !== null && s !== null && !ya(t) ? Sv(u, l, s) : null;
        a.push(g)
    }
    u !== null && (u.hasOwnProperty("class") && (t.flags |= 8), u.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = a, t.inputs = u, t.outputs = c
}

function pv(e) {
    return e === "class" ? "className" : e === "for" ? "htmlFor" : e === "formaction" ? "formAction" : e === "innerHtml" ? "innerHTML" : e === "readonly" ? "readOnly" : e === "tabindex" ? "tabIndex" : e
}

function bn(e, t, n, r, o, i, s, a) {
    let u = we(t, n), c = t.inputs, l;
    !a && c != null && (l = c[r]) ? (Xa(e, n, l, r, o), Ro(t) && hv(n, t.index)) : t.type & 3 ? (r = pv(r), o = s != null ? s(o, t.value || "", r) : o, i.setProperty(u, r, o)) : t.type & 12
}

function hv(e, t) {
    let n = Dt(t, e);
    n[I] & 16 || (n[I] |= 64)
}

function Ja(e, t, n, r) {
    if (od()) {
        let o = r === null ? null : {"": -1}, i = Dv(e, n), s, a;
        i === null ? s = a = null : [s, a] = i, s !== null && pf(e, t, n, s, o, a), o && Iv(n, r, o)
    }
    n.mergedAttrs = $n(n.mergedAttrs, n.attrs)
}

function pf(e, t, n, r, o, i) {
    for (let c = 0; c < r.length; c++) ls(lo(n, t), e, r[c].type);
    Ev(n, e.data.length, r.length);
    for (let c = 0; c < r.length; c++) {
        let l = r[c];
        l.providersResolver && l.providersResolver(l)
    }
    let s = !1, a = !1, u = tr(e, t, r.length, null);
    for (let c = 0; c < r.length; c++) {
        let l = r[c];
        n.mergedAttrs = $n(n.mergedAttrs, l.hostAttrs), Cv(e, n, t, u, l), wv(u, l, o), l.contentQueries !== null && (n.flags |= 4), (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) && (n.flags |= 64);
        let d = l.type.prototype;
        !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), a = !0), u++
    }
    fv(e, n, i)
}

function gv(e, t, n, r, o) {
    let i = o.hostBindings;
    if (i) {
        let s = e.hostBindingOpCodes;
        s === null && (s = e.hostBindingOpCodes = []);
        let a = ~t.index;
        mv(s) != a && s.push(a), s.push(n, r, i)
    }
}

function mv(e) {
    let t = e.length;
    for (; t > 0;) {
        let n = e[--t];
        if (typeof n == "number" && n < 0) return n
    }
    return 0
}

function yv(e, t, n, r) {
    let o = n.directiveStart, i = n.directiveEnd;
    Ro(n) && bv(t, n, e.data[o + n.componentOffset]), e.firstCreatePass || lo(n, t), mt(r, t);
    let s = n.initialInputs;
    for (let a = o; a < i; a++) {
        let u = e.data[a], c = jt(t, e, a, n);
        if (mt(c, t), s !== null && xv(t, a - o, c, u, n, s), Qe(u)) {
            let l = Dt(n.index, t);
            l[ee] = jt(t, e, a, n)
        }
    }
}

function hf(e, t, n) {
    let r = n.directiveStart, o = n.directiveEnd, i = n.index, s = km();
    try {
        kt(i);
        for (let a = r; a < o; a++) {
            let u = e.data[a], c = t[a];
            as(a), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && vv(u, c)
        }
    } finally {
        kt(-1), as(s)
    }
}

function vv(e, t) {
    e.hostBindings !== null && e.hostBindings(1, t)
}

function Dv(e, t) {
    let n = e.directiveRegistry, r = null, o = null;
    if (n) for (let i = 0; i < n.length; i++) {
        let s = n[i];
        if (Pl(t, s.selectors, !1)) if (r || (r = []), Qe(s)) if (s.findHostDirectiveDefs !== null) {
            let a = [];
            o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s);
            let u = a.length;
            Os(e, t, u)
        } else r.unshift(s), Os(e, t, 0); else o = o || new Map, s.findHostDirectiveDefs?.(s, r, o), r.push(s)
    }
    return r === null ? null : [r, o]
}

function Os(e, t, n) {
    t.componentOffset = n, (e.components ??= []).push(t.index)
}

function Iv(e, t, n) {
    if (t) {
        let r = e.localNames = [];
        for (let o = 0; o < t.length; o += 2) {
            let i = n[t[o + 1]];
            if (i == null) throw new A(-301, !1);
            r.push(t[o], i)
        }
    }
}

function wv(e, t, n) {
    if (n) {
        if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
        Qe(t) && (n[""] = e)
    }
}

function Ev(e, t, n) {
    e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t
}

function Cv(e, t, n, r, o) {
    e.data[r] = o;
    let i = o.factory || (o.factory = Ot(o.type, !0)), s = new Lt(i, Qe(o), U);
    e.blueprint[r] = s, n[r] = s, gv(e, t, r, tr(e, n, o.hostVars, he), o)
}

function bv(e, t, n) {
    let r = we(t, e), o = ff(n), i = e[je].rendererFactory, s = 16;
    n.signals ? s = 4096 : n.onPush && (s = 64);
    let a = qo(e, Wo(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null));
    e[t.index] = a
}

function _v(e, t, n, r, o, i) {
    let s = we(e, t);
    Mv(t[P], s, i, e.value, n, r, o)
}

function Mv(e, t, n, r, o, i, s) {
    if (i == null) e.removeAttribute(t, o, n); else {
        let a = s == null ? At(i) : s(i, r || "", o);
        e.setAttribute(t, o, a, n)
    }
}

function xv(e, t, n, r, o, i) {
    let s = i[t];
    if (s !== null) for (let a = 0; a < s.length;) {
        let u = s[a++], c = s[a++], l = s[a++], d = s[a++];
        lf(r, n, u, c, l, d)
    }
}

function Sv(e, t, n) {
    let r = null, o = 0;
    for (; o < n.length;) {
        let i = n[o];
        if (i === 0) {
            o += 4;
            continue
        } else if (i === 5) {
            o += 2;
            continue
        }
        if (typeof i == "number") break;
        if (e.hasOwnProperty(i)) {
            r === null && (r = []);
            let s = e[i];
            for (let a = 0; a < s.length; a += 3) if (s[a] === t) {
                r.push(i, s[a + 1], s[a + 2], n[o + 1]);
                break
            }
        }
        o += 2
    }
    return r
}

function gf(e, t, n, r) {
    return [e, !0, 0, t, null, r, null, n, null, null]
}

function mf(e, t) {
    let n = e.contentQueries;
    if (n !== null) {
        let r = T(null);
        try {
            for (let o = 0; o < n.length; o += 2) {
                let i = n[o], s = n[o + 1];
                if (s !== -1) {
                    let a = e.data[s];
                    Vo(i), a.contentQueries(2, t[s], s)
                }
            }
        } finally {
            T(r)
        }
    }
}

function qo(e, t) {
    return e[Un] ? e[Lc][Se] = t : e[Un] = t, e[Lc] = t, t
}

function Fs(e, t, n) {
    Vo(0);
    let r = T(null);
    try {
        t(e, n)
    } finally {
        T(r)
    }
}

function yf(e) {
    return e[oo] ??= []
}

function vf(e) {
    return e.cleanup ??= []
}

function Df(e, t, n) {
    return (e === null || Qe(e)) && (n = wm(n[t.index])), n[P]
}

function If(e, t) {
    let n = e[fn], r = n ? n.get(Vt, null) : null;
    r && r.handleError(t)
}

function Xa(e, t, n, r, o) {
    for (let i = 0; i < n.length;) {
        let s = n[i++], a = n[i++], u = n[i++], c = t[s], l = e.data[s];
        lf(l, c, r, a, u, o)
    }
}

function wf(e, t, n) {
    let r = Xl(t, e);
    Wy(e[P], r, n)
}

function Tv(e, t) {
    let n = Dt(t, e), r = n[C];
    Nv(r, n);
    let o = n[Be];
    o !== null && n[dn] === null && (n[dn] = Va(o, n[fn])), eu(r, n, n[ee])
}

function Nv(e, t) {
    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
}

function eu(e, t, n) {
    Oa(t);
    try {
        let r = e.viewQuery;
        r !== null && Fs(1, r, n);
        let o = e.template;
        o !== null && df(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), t[Ye]?.finishViewCreation(e), e.staticContentQueries && mf(e, t), e.staticViewQueries && Fs(2, e.viewQuery, n);
        let i = e.components;
        i !== null && Av(t, i)
    } catch (r) {
        throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
    } finally {
        t[I] &= -5, Fa()
    }
}

function Av(e, t) {
    for (let n = 0; n < t.length; n++) Tv(e, t[n])
}

function nr(e, t, n, r) {
    let o = T(null);
    try {
        let i = t.tView, a = e[I] & 4096 ? 4096 : 16,
            u = Wo(e, i, n, a, null, t, null, null, r?.injector ?? null, r?.embeddedViewInjector ?? null, r?.dehydratedView ?? null),
            c = e[t.index];
        u[Ft] = c;
        let l = e[Ye];
        return l !== null && (u[Ye] = l.createEmbeddedView(i)), eu(i, u, n), u
    } finally {
        T(o)
    }
}

function Ef(e, t) {
    let n = te + t;
    if (n < e.length) return e[n]
}

function gn(e, t) {
    return !t || t.firstChild === null || Nd(e)
}

function rr(e, t, n, r = !0) {
    let o = t[C];
    if (Qy(o, t, e, n), r) {
        let s = As(n, e), a = t[P], u = Xd(a, e[Rt]);
        u !== null && Zy(o, e[ie], a, t, u, s)
    }
    let i = t[dn];
    i !== null && i.firstChild !== null && (i.firstChild = null)
}

function Cf(e, t) {
    let n = Gn(e, t);
    return n !== void 0 && Uo(n[C], n), n
}

function go(e, t, n, r, o = !1) {
    for (; n !== null;) {
        if (n.type === 128) {
            n = o ? n.projectionNext : n.next;
            continue
        }
        let i = t[n.index];
        i !== null && r.push(Te(i)), et(i) && Ov(i, r);
        let s = n.type;
        if (s & 8) go(e, t, n.child, r); else if (s & 32) {
            let a = Ua(n, t), u;
            for (; u = a();) r.push(u)
        } else if (s & 16) {
            let a = of(t, n);
            if (Array.isArray(a)) r.push(...a); else {
                let u = Pt(t[fe]);
                go(u[C], u, a, r, !0)
            }
        }
        n = o ? n.projectionNext : n.next
    }
    return r
}

function Ov(e, t) {
    for (let n = te; n < e.length; n++) {
        let r = e[n], o = r[C].firstChild;
        o !== null && go(r[C], r, o, t)
    }
    e[Rt] !== e[Be] && t.push(e[Rt])
}

var bf = [];

function Fv(e) {
    return e[Ie] ?? Rv(e)
}

function Rv(e) {
    let t = bf.pop() ?? Object.create(kv);
    return t.lView = e, t
}

function Pv(e) {
    e.lView[Ie] !== e && (e.lView = null, bf.push(e))
}

var kv = Oe(Ae({}, qt), {
    consumerIsAlwaysLive: !0, consumerMarkedDirty: e => {
        jo(e.lView)
    }, consumerOnSignalRead() {
        this.lView[Ie] = this
    }
});

function Lv(e) {
    let t = e[Ie] ?? Object.create(jv);
    return t.lView = e, t
}

var jv = Oe(Ae({}, qt), {
    consumerIsAlwaysLive: !0, consumerMarkedDirty: e => {
        let t = Pt(e.lView);
        for (; t && !_f(t[C]);) t = Pt(t);
        t && td(t)
    }, consumerOnSignalRead() {
        this.lView[Ie] = this
    }
});

function _f(e) {
    return e.type !== 2
}

var Vv = 100;

function Mf(e, t = !0, n = 0) {
    let r = e[je], o = r.rendererFactory, i = !1;
    i || o.begin?.();
    try {
        Bv(e, n)
    } catch (s) {
        throw t && If(e, s), s
    } finally {
        i || (o.end?.(), r.inlineEffectRunner?.flush())
    }
}

function Bv(e, t) {
    let n = ad();
    try {
        Vc(!0), Rs(e, t);
        let r = 0;
        for (; Lo(e);) {
            if (r === Vv) throw new A(103, !1);
            r++, Rs(e, 1)
        }
    } finally {
        Vc(n)
    }
}

function $v(e, t, n, r) {
    let o = t[I];
    if ((o & 256) === 256) return;
    let i = !1, s = !1;
    !i && t[je].inlineEffectRunner?.flush(), Oa(t);
    let a = !0, u = null, c = null;
    i || (_f(e) ? (c = Fv(t), u = xn(c)) : Ou() === null ? (a = !1, c = Lv(t), u = xn(c)) : t[Ie] && (dr(t[Ie]), t[Ie] = null));
    try {
        ed(t), Fm(e.bindingStartIndex), n !== null && df(e, t, n, 2, r);
        let l = (o & 3) === 3;
        if (!i) if (l) {
            let f = e.preOrderCheckHooks;
            f !== null && qr(t, f, null)
        } else {
            let f = e.preOrderHooks;
            f !== null && Zr(t, f, 0, null), Li(t, 0)
        }
        if (s || Hv(t), xf(t, 0), e.contentQueries !== null && mf(e, t), !i) if (l) {
            let f = e.contentCheckHooks;
            f !== null && qr(t, f)
        } else {
            let f = e.contentHooks;
            f !== null && Zr(t, f, 1), Li(t, 1)
        }
        iv(e, t);
        let d = e.components;
        d !== null && Tf(t, d, 0);
        let p = e.viewQuery;
        if (p !== null && Fs(2, p, r), !i) if (l) {
            let f = e.viewCheckHooks;
            f !== null && qr(t, f)
        } else {
            let f = e.viewHooks;
            f !== null && Zr(t, f, 2), Li(t, 2)
        }
        if (e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Wr]) {
            for (let f of t[Wr]) f();
            t[Wr] = null
        }
        i || (t[I] &= -73)
    } catch (l) {
        throw i || jo(t), l
    } finally {
        c !== null && (cr(c, u), a && Pv(c)), Fa()
    }
}

function xf(e, t) {
    for (let n = Od(e); n !== null; n = Fd(n)) for (let r = te; r < n.length; r++) {
        let o = n[r];
        Sf(o, t)
    }
}

function Hv(e) {
    for (let t = Od(e); t !== null; t = Fd(t)) {
        if (!(t[I] & so.HasTransplantedViews)) continue;
        let n = t[pn];
        for (let r = 0; r < n.length; r++) {
            let o = n[r];
            td(o)
        }
    }
}

function Uv(e, t, n) {
    let r = Dt(t, e);
    Sf(r, n)
}

function Sf(e, t) {
    Ma(e) && Rs(e, t)
}

function Rs(e, t) {
    let r = e[C], o = e[I], i = e[Ie], s = !!(t === 0 && o & 16);
    if (s ||= !!(o & 64 && t === 0), s ||= !!(o & 1024), s ||= !!(i?.dirty && lr(i)), s ||= !1, i && (i.dirty = !1), e[I] &= -9217, s) $v(r, e, r.template, e[ee]); else if (o & 8192) {
        xf(e, 1);
        let a = r.components;
        a !== null && Tf(e, a, 1)
    }
}

function Tf(e, t, n) {
    for (let r = 0; r < t.length; r++) Uv(e, t[r], n)
}

function tu(e, t) {
    let n = ad() ? 64 : 1088;
    for (e[je].changeDetectionScheduler?.notify(t); e;) {
        e[I] |= n;
        let r = Pt(e);
        if (os(e) && !r) return e;
        e = r
    }
    return null
}

var Bt = class {
    get rootNodes() {
        let t = this._lView, n = t[C];
        return go(n, t, n.firstChild, [])
    }

    constructor(t, n, r = !0) {
        this._lView = t, this._cdRefInjectingView = n, this.notifyErrorHandler = r, this._appRef = null, this._attachedToViewContainer = !1
    }

    get context() {
        return this._lView[ee]
    }

    set context(t) {
        this._lView[ee] = t
    }

    get destroyed() {
        return (this._lView[I] & 256) === 256
    }

    destroy() {
        if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
            let t = this._lView[re];
            if (et(t)) {
                let n = t[io], r = n ? n.indexOf(this) : -1;
                r > -1 && (Gn(t, r), to(n, r))
            }
            this._attachedToViewContainer = !1
        }
        Uo(this._lView[C], this._lView)
    }

    onDestroy(t) {
        nd(this._lView, t)
    }

    markForCheck() {
        tu(this._cdRefInjectingView || this._lView, 4)
    }

    detach() {
        this._lView[I] &= -129
    }

    reattach() {
        ss(this._lView), this._lView[I] |= 128
    }

    detectChanges() {
        this._lView[I] |= 1024, Mf(this._lView, this.notifyErrorHandler)
    }

    checkNoChanges() {
    }

    attachToViewContainerRef() {
        if (this._appRef) throw new A(902, !1);
        this._attachedToViewContainer = !0
    }

    detachFromAppRef() {
        this._appRef = null;
        let t = os(this._lView), n = this._lView[Ft];
        n !== null && !t && Ga(n, this._lView), Zd(this._lView[C], this._lView)
    }

    attachToAppRef(t) {
        if (this._attachedToViewContainer) throw new A(902, !1);
        this._appRef = t;
        let n = os(this._lView), r = this._lView[Ft];
        r !== null && !n && Yd(r, this._lView), ss(this._lView)
    }
}, yt = (() => {
    class e {
        static {
            this.__NG_ELEMENT_ID__ = Wv
        }
    }

    return e
})(), zv = yt, Gv = class extends zv {
    constructor(t, n, r) {
        super(), this._declarationLView = t, this._declarationTContainer = n, this.elementRef = r
    }

    get ssrId() {
        return this._declarationTContainer.tView?.ssrId || null
    }

    createEmbeddedView(t, n) {
        return this.createEmbeddedViewImpl(t, n)
    }

    createEmbeddedViewImpl(t, n, r) {
        let o = nr(this._declarationLView, this._declarationTContainer, t, {
            embeddedViewInjector: n,
            dehydratedView: r
        });
        return new Bt(o)
    }
};

function Wv() {
    return Zo(Z(), D())
}

function Zo(e, t) {
    return e.type & 4 ? new Gv(t, e, En(e, t)) : null
}

function Nf(e, t, n) {
    let r = t.insertBeforeIndex, o = Array.isArray(r) ? r[0] : r;
    return o === null ? tf(e, t, n) : Te(n[o])
}

function Af(e, t, n, r, o) {
    let i = t.insertBeforeIndex;
    if (Array.isArray(i)) {
        let s = r, a = null;
        if (t.type & 3 || (a = s, s = o), s !== null && t.componentOffset === -1) for (let u = 1; u < i.length; u++) {
            let c = n[i[u]];
            hn(e, s, c, a, !1)
        }
    }
}

function Of(e, t) {
    if (e.push(t), e.length > 1) for (let n = e.length - 2; n >= 0; n--) {
        let r = e[n];
        Ff(r) || qv(r, t) && Zv(r) === null && Yv(r, t.index)
    }
}

function Ff(e) {
    return !(e.type & 64)
}

function qv(e, t) {
    return Ff(t) || e.index > t.index
}

function Zv(e) {
    let t = e.insertBeforeIndex;
    return Array.isArray(t) ? t[0] : t
}

function Yv(e, t) {
    let n = e.insertBeforeIndex;
    Array.isArray(n) ? n[0] = t : (rf(Nf, Af), e.insertBeforeIndex = t)
}

function Qv(e, t, n) {
    let r = e.data[t];
    r === null ? e.data[t] = n : r.value = n
}

function Kv(e, t) {
    let n = e.insertBeforeIndex;
    n === null ? (rf(Nf, Af), n = e.insertBeforeIndex = [null, t]) : (gg(Array.isArray(n), !0, "Expecting array here"), n.push(t))
}

function Jv(e, t, n) {
    let r = qa(e, n, 64, null, null);
    return Of(t, r), r
}

function Xv(e, t) {
    let n = t[e.currentCaseLViewIndex];
    return n === null ? n : n < 0 ? ~n : n
}

function eD(e, t, n) {
    return e | t << 17 | n << 1
}

function tD(e) {
    return e === -1
}

function Rf(e, t, n) {
    e.index = 0;
    let r = Xv(t, n);
    r !== null ? e.removes = t.remove[r] : e.removes = X
}

function Ps(e) {
    if (e.index < e.removes.length) {
        let t = e.removes[e.index++];
        if (t > 0) return e.lView[t];
        {
            e.stack.push(e.index, e.removes);
            let n = ~t, r = e.lView[C].data[n];
            return Rf(e, r, e.lView), Ps(e)
        }
    } else return e.stack.length === 0 ? null : (e.removes = e.stack.pop(), e.index = e.stack.pop(), Ps(e))
}

function nD() {
    let e = {stack: [], index: -1};

    function t(n, r) {
        for (e.lView = r; e.stack.length;) e.stack.pop();
        return Rf(e, n.value, r), Ps.bind(null, e)
    }

    return t
}

var qN = new RegExp(`^(\\d+)*(${Iy}|${Dy})*(.*)`);
var rD = () => {
};

function oD(e, t, n, r) {
    rD(e, t, n, r)
}

var iD = () => null;

function mn(e, t) {
    return iD(e, t)
}

var yn = class {
}, nu = new O("", {providedIn: "root", factory: () => !1});
var Pf = new O(""), kf = new O(""), ks = class {
}, mo = class {
};

function sD(e) {
    let t = Error(`No component factory found for ${oe(e)}.`);
    return t[aD] = e, t
}

var aD = "ngComponent";
var Ls = class {
    resolveComponentFactory(t) {
        throw sD(t)
    }
}, vn = class {
    static {
        this.NULL = new Ls
    }
}, yo = class {
}, ru = (() => {
    class e {
        constructor() {
            this.destroyNode = null
        }

        static {
            this.__NG_ELEMENT_ID__ = () => uD()
        }
    }

    return e
})();

function uD() {
    let e = D(), t = Z(), n = Dt(t.index, e);
    return (pt(n) ? n : e)[P]
}

var cD = (() => {
    class e {
        static {
            this.\u0275prov = B({token: e, providedIn: "root", factory: () => null})
        }
    }

    return e
})();

function vo(e, t, n) {
    let r = n ? e.styles : null, o = n ? e.classes : null, i = 0;
    if (t !== null) for (let s = 0; s < t.length; s++) {
        let a = t[s];
        if (typeof a == "number") i = a; else if (i == 1) o = Qi(o, a); else if (i == 2) {
            let u = a, c = t[++s];
            r = Qi(r, u + ": " + c + ";")
        }
    }
    n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o
}

var Do = class extends vn {
    constructor(t) {
        super(), this.ngModule = t
    }

    resolveComponentFactory(t) {
        let n = Ze(t);
        return new $t(n, this.ngModule)
    }
};

function el(e, t) {
    let n = [];
    for (let r in e) {
        if (!e.hasOwnProperty(r)) continue;
        let o = e[r];
        if (o === void 0) continue;
        let i = Array.isArray(o), s = i ? o[0] : o, a = i ? o[1] : ht.None;
        t ? n.push({propName: s, templateName: r, isSignal: (a & ht.SignalBased) !== 0}) : n.push({
            propName: s,
            templateName: r
        })
    }
    return n
}

function lD(e) {
    let t = e.toLowerCase();
    return t === "svg" ? Jl : t === "math" ? Im : null
}

var $t = class extends mo {
    get inputs() {
        let t = this.componentDef, n = t.inputTransforms, r = el(t.inputs, !0);
        if (n !== null) for (let o of r) n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
        return r
    }

    get outputs() {
        return el(this.componentDef.outputs, !1)
    }

    constructor(t, n) {
        super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = Jg(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n
    }

    create(t, n, r, o) {
        let i = T(null);
        try {
            o = o || this.ngModule;
            let s = o instanceof gt ? o : o?.injector;
            s && this.componentDef.getStandaloneInjector !== null && (s = this.componentDef.getStandaloneInjector(s) || s);
            let a = s ? new us(t, s) : t, u = a.get(yo, null);
            if (u === null) throw new A(407, !1);
            let c = a.get(cD, null), l = a.get(yn, null),
                d = {rendererFactory: u, sanitizer: c, inlineEffectRunner: null, changeDetectionScheduler: l},
                p = u.createRenderer(null, this.componentDef), f = this.componentDef.selectors[0][0] || "div",
                h = r ? av(p, r, this.componentDef.encapsulation, a) : za(p, f, lD(f)), g = 512;
            this.componentDef.signals ? g |= 4096 : this.componentDef.onPush || (g |= 16);
            let E = null;
            h !== null && (E = Va(h, a, !0));
            let m = Ka(0, null, null, 1, 0, null, null, null, null, null, null),
                S = Wo(null, m, null, g, null, null, d, p, a, null, E);
            Oa(S);
            let Y, z, ae = null;
            try {
                let Q = this.componentDef, ue, Wt = null;
                Q.findHostDirectiveDefs ? (ue = [], Wt = new Map, Q.findHostDirectiveDefs(Q, ue, Wt), ue.push(Q)) : ue = [Q];
                let xu = dD(S, h);
                ae = fD(xu, h, Q, ue, S, d, p), z = _a(m, H), h && gD(p, Q, h, r), n !== void 0 && mD(z, this.ngContentSelectors, n), Y = hD(ae, Q, ue, Wt, S, [yD]), eu(m, S, null)
            } catch (Q) {
                throw ae !== null && ys(ae), ys(S), Q
            } finally {
                Fa()
            }
            return new js(this.componentType, Y, En(z, S), S, z)
        } finally {
            T(i)
        }
    }
}, js = class extends ks {
    constructor(t, n, r, o, i) {
        super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new Bt(o, void 0, !1), this.componentType = t
    }

    setInput(t, n) {
        let r = this._tNode.inputs, o;
        if (r !== null && (o = r[t])) {
            if (this.previousInputValues ??= new Map, this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n)) return;
            let i = this._rootLView;
            Xa(i[C], i, o, t, n), this.previousInputValues.set(t, n);
            let s = Dt(this._tNode.index, i);
            tu(s, 1)
        }
    }

    get injector() {
        return new Nt(this._tNode, this._rootLView)
    }

    destroy() {
        this.hostView.destroy()
    }

    onDestroy(t) {
        this.hostView.onDestroy(t)
    }
};

function dD(e, t) {
    let n = e[C], r = H;
    return e[r] = t, Cn(n, r, 2, "#host", null)
}

function fD(e, t, n, r, o, i, s) {
    let a = o[C];
    pD(r, e, t, s);
    let u = null;
    t !== null && (u = Va(t, o[fn]));
    let c = i.rendererFactory.createRenderer(t, n), l = 16;
    n.signals ? l = 4096 : n.onPush && (l = 64);
    let d = Wo(o, ff(n), null, l, o[e.index], e, i, c, null, null, u);
    return a.firstCreatePass && Os(a, e, r.length - 1), qo(o, d), o[e.index] = d
}

function pD(e, t, n, r) {
    for (let o of e) t.mergedAttrs = $n(t.mergedAttrs, o.hostAttrs);
    t.mergedAttrs !== null && (vo(t, t.mergedAttrs, !0), n !== null && uf(r, n, t))
}

function hD(e, t, n, r, o, i) {
    let s = Z(), a = o[C], u = we(s, o);
    pf(a, o, s, n, null, r);
    for (let l = 0; l < n.length; l++) {
        let d = s.directiveStart + l, p = jt(o, a, d, s);
        mt(p, o)
    }
    hf(a, o, s), u && mt(u, o);
    let c = jt(o, a, s.directiveStart + s.componentOffset, s);
    if (e[ee] = o[ee] = c, i !== null) for (let l of i) l(c, t);
    return Za(a, s, o), c
}

function gD(e, t, n, r) {
    if (r) es(e, n, ["ng-version", "18.2.10"]); else {
        let {attrs: o, classes: i} = Xg(t.selectors[0]);
        o && es(e, n, o), i && i.length > 0 && af(e, n, i.join(" "))
    }
}

function mD(e, t, n) {
    let r = e.projection = [];
    for (let o = 0; o < t.length; o++) {
        let i = n[o];
        r.push(i != null ? Array.from(i) : null)
    }
}

function yD() {
    let e = Z();
    Bo(D()[C], e)
}

var wt = (() => {
    class e {
        static {
            this.__NG_ELEMENT_ID__ = vD
        }
    }

    return e
})();

function vD() {
    let e = Z();
    return jf(e, D())
}

var DD = wt, Lf = class extends DD {
    constructor(t, n, r) {
        super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r
    }

    get element() {
        return En(this._hostTNode, this._hostLView)
    }

    get injector() {
        return new Nt(this._hostTNode, this._hostLView)
    }

    get parentInjector() {
        let t = Ra(this._hostTNode, this._hostLView);
        if (md(t)) {
            let n = uo(t, this._hostLView), r = ao(t), o = n[C].data[r + 8];
            return new Nt(o, n)
        } else return new Nt(null, this._hostLView)
    }

    clear() {
        for (; this.length > 0;) this.remove(this.length - 1)
    }

    get(t) {
        let n = tl(this._lContainer);
        return n !== null && n[t] || null
    }

    get length() {
        return this._lContainer.length - te
    }

    createEmbeddedView(t, n, r) {
        let o, i;
        typeof r == "number" ? o = r : r != null && (o = r.index, i = r.injector);
        let s = mn(this._lContainer, t.ssrId), a = t.createEmbeddedViewImpl(n || {}, i, s);
        return this.insertImpl(a, o, gn(this._hostTNode, s)), a
    }

    createComponent(t, n, r, o, i) {
        let s = t && !mm(t), a;
        if (s) a = n; else {
            let h = n || {};
            a = h.index, r = h.injector, o = h.projectableNodes, i = h.environmentInjector || h.ngModuleRef
        }
        let u = s ? t : new $t(Ze(t)), c = r || this.parentInjector;
        if (!i && u.ngModule == null) {
            let g = (s ? c : this.parentInjector).get(gt, null);
            g && (i = g)
        }
        let l = Ze(u.componentType ?? {}), d = mn(this._lContainer, l?.id ?? null), p = d?.firstChild ?? null,
            f = u.create(c, o, p, i);
        return this.insertImpl(f.hostView, a, gn(this._hostTNode, d)), f
    }

    insert(t, n) {
        return this.insertImpl(t, n, !0)
    }

    insertImpl(t, n, r) {
        let o = t._lView;
        if (Cm(o)) {
            let a = this.indexOf(t);
            if (a !== -1) this.detach(a); else {
                let u = o[re], c = new Lf(u, u[ie], u[re]);
                c.detach(c.indexOf(t))
            }
        }
        let i = this._adjustIndex(n), s = this._lContainer;
        return rr(s, o, i, r), t.attachToViewContainerRef(), Tl(Hi(s), i, t), t
    }

    move(t, n) {
        return this.insert(t, n)
    }

    indexOf(t) {
        let n = tl(this._lContainer);
        return n !== null ? n.indexOf(t) : -1
    }

    remove(t) {
        let n = this._adjustIndex(t, -1), r = Gn(this._lContainer, n);
        r && (to(Hi(this._lContainer), n), Uo(r[C], r))
    }

    detach(t) {
        let n = this._adjustIndex(t, -1), r = Gn(this._lContainer, n);
        return r && to(Hi(this._lContainer), n) != null ? new Bt(r) : null
    }

    _adjustIndex(t, n = 0) {
        return t ?? this.length + n
    }
};

function tl(e) {
    return e[io]
}

function Hi(e) {
    return e[io] || (e[io] = [])
}

function jf(e, t) {
    let n, r = t[e.index];
    return et(r) ? n = r : (n = gf(r, t, null, e), t[e.index] = n, qo(t, n)), wD(n, t, e, r), new Lf(n, e, t)
}

function ID(e, t) {
    let n = e[P], r = n.createComment(""), o = we(t, e), i = Xd(n, o);
    return hn(n, i, r, Xy(n, o), !1), r
}

var wD = bD, ED = () => !1;

function CD(e, t, n) {
    return ED(e, t, n)
}

function bD(e, t, n, r) {
    if (e[Rt]) return;
    let o;
    n.type & 8 ? o = Te(r) : o = ID(t, n), e[Rt] = o
}

var Vs = class e {
    constructor(t) {
        this.queryList = t, this.matches = null
    }

    clone() {
        return new e(this.queryList)
    }

    setDirty() {
        this.queryList.setDirty()
    }
}, Bs = class e {
    constructor(t = []) {
        this.queries = t
    }

    createEmbeddedView(t) {
        let n = t.queries;
        if (n !== null) {
            let r = t.contentQueries !== null ? t.contentQueries[0] : n.length, o = [];
            for (let i = 0; i < r; i++) {
                let s = n.getByIndex(i), a = this.queries[s.indexInDeclarationView];
                o.push(a.clone())
            }
            return new e(o)
        }
        return null
    }

    insertView(t) {
        this.dirtyQueriesWithMatches(t)
    }

    detachView(t) {
        this.dirtyQueriesWithMatches(t)
    }

    finishViewCreation(t) {
        this.dirtyQueriesWithMatches(t)
    }

    dirtyQueriesWithMatches(t) {
        for (let n = 0; n < this.queries.length; n++) iu(t, n).matches !== null && this.queries[n].setDirty()
    }
}, Io = class {
    constructor(t, n, r = null) {
        this.flags = n, this.read = r, typeof t == "string" ? this.predicate = TD(t) : this.predicate = t
    }
}, $s = class e {
    constructor(t = []) {
        this.queries = t
    }

    elementStart(t, n) {
        for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n)
    }

    elementEnd(t) {
        for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t)
    }

    embeddedTView(t) {
        let n = null;
        for (let r = 0; r < this.length; r++) {
            let o = n !== null ? n.length : 0, i = this.getByIndex(r).embeddedTView(t, o);
            i && (i.indexInDeclarationView = r, n !== null ? n.push(i) : n = [i])
        }
        return n !== null ? new e(n) : null
    }

    template(t, n) {
        for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n)
    }

    getByIndex(t) {
        return this.queries[t]
    }

    get length() {
        return this.queries.length
    }

    track(t) {
        this.queries.push(t)
    }
}, Hs = class e {
    constructor(t, n = -1) {
        this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = n
    }

    elementStart(t, n) {
        this.isApplyingToNode(n) && this.matchTNode(t, n)
    }

    elementEnd(t) {
        this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
    }

    template(t, n) {
        this.elementStart(t, n)
    }

    embeddedTView(t, n) {
        return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, n), new e(this.metadata)) : null
    }

    isApplyingToNode(t) {
        if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
            let n = this._declarationNodeIndex, r = t.parent;
            for (; r !== null && r.type & 8 && r.index !== n;) r = r.parent;
            return n === (r !== null ? r.index : -1)
        }
        return this._appliesToNextNode
    }

    matchTNode(t, n) {
        let r = this.metadata.predicate;
        if (Array.isArray(r)) for (let o = 0; o < r.length; o++) {
            let i = r[o];
            this.matchTNodeWithReadOption(t, n, _D(n, i)), this.matchTNodeWithReadOption(t, n, Yr(n, t, i, !1, !1))
        } else r === yt ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1) : this.matchTNodeWithReadOption(t, n, Yr(n, t, r, !1, !1))
    }

    matchTNodeWithReadOption(t, n, r) {
        if (r !== null) {
            let o = this.metadata.read;
            if (o !== null) if (o === Gt || o === wt || o === yt && n.type & 4) this.addMatch(n.index, -2); else {
                let i = Yr(n, t, o, !1, !1);
                i !== null && this.addMatch(n.index, i)
            } else this.addMatch(n.index, r)
        }
    }

    addMatch(t, n) {
        this.matches === null ? this.matches = [t, n] : this.matches.push(t, n)
    }
};

function _D(e, t) {
    let n = e.localNames;
    if (n !== null) {
        for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1]
    }
    return null
}

function MD(e, t) {
    return e.type & 11 ? En(e, t) : e.type & 4 ? Zo(e, t) : null
}

function xD(e, t, n, r) {
    return n === -1 ? MD(t, e) : n === -2 ? SD(e, t, r) : jt(e, e[C], n, t)
}

function SD(e, t, n) {
    if (n === Gt) return En(t, e);
    if (n === yt) return Zo(t, e);
    if (n === wt) return jf(t, e)
}

function Vf(e, t, n, r) {
    let o = t[Ye].queries[r];
    if (o.matches === null) {
        let i = e.data, s = n.matches, a = [];
        for (let u = 0; s !== null && u < s.length; u += 2) {
            let c = s[u];
            if (c < 0) a.push(null); else {
                let l = i[c];
                a.push(xD(t, l, s[u + 1], n.metadata.read))
            }
        }
        o.matches = a
    }
    return o.matches
}

function Us(e, t, n, r) {
    let o = e.queries.getByIndex(n), i = o.matches;
    if (i !== null) {
        let s = Vf(e, t, o, n);
        for (let a = 0; a < i.length; a += 2) {
            let u = i[a];
            if (u > 0) r.push(s[a / 2]); else {
                let c = i[a + 1], l = t[-u];
                for (let d = te; d < l.length; d++) {
                    let p = l[d];
                    p[Ft] === p[re] && Us(p[C], p, c, r)
                }
                if (l[pn] !== null) {
                    let d = l[pn];
                    for (let p = 0; p < d.length; p++) {
                        let f = d[p];
                        Us(f[C], f, c, r)
                    }
                }
            }
        }
    }
    return r
}

function ou(e, t) {
    return e[Ye].queries[t].queryList
}

function Bf(e, t, n) {
    let r = new ms((n & 4) === 4);
    return lv(e, t, r, r.destroy), (t[Ye] ??= new Bs).queries.push(new Vs(r)) - 1
}

function $f(e, t, n) {
    let r = k();
    return r.firstCreatePass && (Uf(r, new Io(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = !0)), Bf(r, D(), t)
}

function Hf(e, t, n, r) {
    let o = k();
    if (o.firstCreatePass) {
        let i = Z();
        Uf(o, new Io(t, n, r), i.index), ND(o, e), (n & 2) === 2 && (o.staticContentQueries = !0)
    }
    return Bf(o, D(), n)
}

function TD(e) {
    return e.split(",").map(t => t.trim())
}

function Uf(e, t, n) {
    e.queries === null && (e.queries = new $s), e.queries.track(new Hs(t, n))
}

function ND(e, t) {
    let n = e.contentQueries || (e.contentQueries = []), r = n.length ? n[n.length - 1] : -1;
    t !== r && n.push(e.queries.length - 1, t)
}

function iu(e, t) {
    return e.queries.getByIndex(t)
}

function zf(e, t) {
    let n = e[C], r = iu(n, t);
    return r.crossesNgTemplate ? Us(n, e, t, []) : Vf(n, e, r, t)
}

var nl = new Set;

function $e(e) {
    nl.has(e) || (nl.add(e), performance?.mark?.("mark_feature_usage", {detail: {feature: e}}))
}

function AD(e) {
    return typeof e == "function" && e[ve] !== void 0
}

function OD(e, t) {
    $e("NgSignals");
    let n = Uu(e), r = n[ve];
    return t?.equal && (r.equal = t.equal), n.set = o => hi(r, o), n.update = o => zu(r, o), n.asReadonly = FD.bind(n), n
}

function FD() {
    let e = this[ve];
    if (e.readonlyFn === void 0) {
        let t = () => this();
        t[ve] = e, e.readonlyFn = t
    }
    return e.readonlyFn
}

function Gf(e) {
    return AD(e) && typeof e.set == "function"
}

function Wf(e, t) {
    let n, r = pi(() => {
        n._dirtyCounter();
        let o = RD(n, e);
        if (t && o === void 0) throw new A(-951, !1);
        return o
    });
    return n = r[ve], n._dirtyCounter = OD(0), n._flatValue = void 0, r
}

function qf() {
    return Wf(!0, !1)
}

function Zf() {
    return Wf(!0, !0)
}

function Yf(e, t) {
    let n = e[ve];
    n._lView = D(), n._queryIndex = t, n._queryList = ou(n._lView, t), n._queryList.onDirty(() => n._dirtyCounter.update(r => r + 1))
}

function RD(e, t) {
    let n = e._lView, r = e._queryIndex;
    if (n === void 0 || r === void 0 || n[I] & 4) return t ? void 0 : X;
    let o = ou(n, r), i = zf(n, r);
    return o.reset(i, Td), t ? o.first : o._changesDetected || e._flatValue === void 0 ? e._flatValue = o.toArray() : e._flatValue
}

function rl(e, t) {
    return qf()
}

function PD(e, t) {
    return Zf()
}

var YN = (rl.required = PD, rl);

function ol(e, t) {
    return qf()
}

function kD(e, t) {
    return Zf()
}

var QN = (ol.required = kD, ol);

function LD(e) {
    return Object.getPrototypeOf(e.prototype).constructor
}

function jD(e) {
    let t = LD(e.type), n = !0, r = [e];
    for (; t;) {
        let o;
        if (Qe(e)) o = t.\u0275cmp || t.\u0275dir; else {
            if (t.\u0275cmp) throw new A(903, !1);
            o = t.\u0275dir
        }
        if (o) {
            if (n) {
                r.push(o);
                let s = e;
                s.inputs = Hr(e.inputs), s.inputTransforms = Hr(e.inputTransforms), s.declaredInputs = Hr(e.declaredInputs), s.outputs = Hr(e.outputs);
                let a = o.hostBindings;
                a && UD(e, a);
                let u = o.viewQuery, c = o.contentQueries;
                if (u && $D(e, u), c && HD(e, c), VD(e, o), pg(e.outputs, o.outputs), Qe(o) && o.data.animation) {
                    let l = e.data;
                    l.animation = (l.animation || []).concat(o.data.animation)
                }
            }
            let i = o.features;
            if (i) for (let s = 0; s < i.length; s++) {
                let a = i[s];
                a && a.ngInherit && a(e), a === jD && (n = !1)
            }
        }
        t = Object.getPrototypeOf(t)
    }
    BD(r)
}

function VD(e, t) {
    for (let n in t.inputs) {
        if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
        let r = t.inputs[n];
        if (r !== void 0 && (e.inputs[n] = r, e.declaredInputs[n] = t.declaredInputs[n], t.inputTransforms !== null)) {
            let o = Array.isArray(r) ? r[0] : r;
            if (!t.inputTransforms.hasOwnProperty(o)) continue;
            e.inputTransforms ??= {}, e.inputTransforms[o] = t.inputTransforms[o]
        }
    }
}

function BD(e) {
    let t = 0, n = null;
    for (let r = e.length - 1; r >= 0; r--) {
        let o = e[r];
        o.hostVars = t += o.hostVars, o.hostAttrs = $n(o.hostAttrs, n = $n(n, o.hostAttrs))
    }
}

function Hr(e) {
    return e === qe ? {} : e === X ? [] : e
}

function $D(e, t) {
    let n = e.viewQuery;
    n ? e.viewQuery = (r, o) => {
        t(r, o), n(r, o)
    } : e.viewQuery = t
}

function HD(e, t) {
    let n = e.contentQueries;
    n ? e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i)
    } : e.contentQueries = t
}

function UD(e, t) {
    let n = e.hostBindings;
    n ? e.hostBindings = (r, o) => {
        t(r, o), n(r, o)
    } : e.hostBindings = t
}

function KN(e) {
    let t = n => {
        let r = (Array.isArray(e) ? e : e()).map(o => typeof o == "function" ? {
            directive: J(o),
            inputs: qe,
            outputs: qe
        } : {directive: J(o.directive), inputs: il(o.inputs), outputs: il(o.outputs)});
        n.hostDirectives === null ? (n.findHostDirectiveDefs = Qf, n.hostDirectives = r) : n.hostDirectives.unshift(...r)
    };
    return t.ngInherit = !0, t
}

function Qf(e, t, n) {
    if (e.hostDirectives !== null) for (let r of e.hostDirectives) {
        let o = Da(r.directive);
        zD(o.declaredInputs, r.inputs), Qf(o, t, n), n.set(o, r), t.push(o)
    }
}

function il(e) {
    if (e === void 0 || e.length === 0) return qe;
    let t = {};
    for (let n = 0; n < e.length; n += 2) t[e[n]] = e[n + 1];
    return t
}

function zD(e, t) {
    for (let n in t) if (t.hasOwnProperty(n)) {
        let r = t[n], o = e[n];
        e[r] = o
    }
}

function GD(e) {
    let t = e.inputConfig, n = {};
    for (let r in t) if (t.hasOwnProperty(r)) {
        let o = t[r];
        Array.isArray(o) && o[3] && (n[r] = o[3])
    }
    e.inputTransforms = n
}

var vt = class {
}, zs = class {
};
var Gs = class extends vt {
    constructor(t, n, r, o = !0) {
        super(), this.ngModuleType = t, this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new Do(this);
        let i = jl(t);
        this._bootstrapComponents = zd(i.bootstrap), this._r3Injector = _d(t, n, [{
            provide: vt,
            useValue: this
        }, {
            provide: vn,
            useValue: this.componentFactoryResolver
        }, ...r], oe(t), new Set(["environment"])), o && this.resolveInjectorInitializers()
    }

    resolveInjectorInitializers() {
        this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(this.ngModuleType)
    }

    get injector() {
        return this._r3Injector
    }

    destroy() {
        let t = this._r3Injector;
        !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
    }

    onDestroy(t) {
        this.destroyCbs.push(t)
    }
}, Ws = class extends zs {
    constructor(t) {
        super(), this.moduleType = t
    }

    create(t) {
        return new Gs(this.moduleType, t, [])
    }
};
var wo = class extends vt {
    constructor(t) {
        super(), this.componentFactoryResolver = new Do(this), this.instance = null;
        let n = new Hn([...t.providers, {provide: vt, useValue: this}, {
            provide: vn,
            useValue: this.componentFactoryResolver
        }], t.parent || Oo(), t.debugName, new Set(["environment"]));
        this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers()
    }

    destroy() {
        this.injector.destroy()
    }

    onDestroy(t) {
        this.injector.onDestroy(t)
    }
};

function WD(e, t, n = null) {
    return new wo({providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0}).injector
}

function Kf(e) {
    return ZD(e) ? Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e : !1
}

function qD(e, t) {
    if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]); else {
        let n = e[Symbol.iterator](), r;
        for (; !(r = n.next()).done;) t(r.value)
    }
}

function ZD(e) {
    return e !== null && (typeof e == "function" || typeof e == "object")
}

function Yo(e, t, n) {
    return e[t] = n
}

function pe(e, t, n) {
    let r = e[t];
    return Object.is(r, n) ? !1 : (e[t] = n, !0)
}

function Wn(e, t, n, r) {
    let o = pe(e, t, n);
    return pe(e, t + 1, r) || o
}

function YD(e, t, n, r, o) {
    let i = Wn(e, t, n, r);
    return pe(e, t + 2, o) || i
}

function QD(e, t, n, r, o, i) {
    let s = Wn(e, t, n, r);
    return Wn(e, t + 2, o, i) || s
}

function KD(e) {
    return (e.flags & 32) === 32
}

function JD(e, t, n, r, o, i, s, a, u) {
    let c = t.consts, l = Cn(t, e, 4, s || null, a || null);
    Ja(t, n, l, Ke(c, u)), Bo(t, l);
    let d = l.tView = Ka(2, l, r, o, i, t.directiveRegistry, t.pipeRegistry, null, t.schemas, c, null);
    return t.queries !== null && (t.queries.template(t, l), d.queries = t.queries.embeddedTView(l)), l
}

function Eo(e, t, n, r, o, i, s, a, u, c) {
    let l = n + H, d = t.firstCreatePass ? JD(l, t, e, r, o, i, s, a, u) : t.data[l];
    Ve(d, !1);
    let p = eI(t, e, d, n);
    Qn() && zo(t, e, p, d), mt(p, e);
    let f = gf(p, e, p, d);
    return e[l] = f, qo(e, f), CD(f, d, e), Po(d) && Ya(t, e, d), u != null && Qa(e, d, c), d
}

function XD(e, t, n, r, o, i, s, a) {
    let u = D(), c = k(), l = Ke(c.consts, i);
    return Eo(u, c, e, t, n, r, o, l, s, a), XD
}

var eI = tI;

function tI(e, t, n, r) {
    return Kn(!0), t[P].createComment("")
}

var an = function (e) {
    return e[e.EarlyRead = 0] = "EarlyRead", e[e.Write = 1] = "Write", e[e.MixedReadWrite = 2] = "MixedReadWrite", e[e.Read = 3] = "Read", e
}(an || {}), Jf = (() => {
    class e {
        constructor() {
            this.impl = null
        }

        execute() {
            this.impl?.execute()
        }

        static {
            this.\u0275prov = B({token: e, providedIn: "root", factory: () => new e})
        }
    }

    return e
})(), qs = class e {
    constructor() {
        this.ngZone = M(de), this.scheduler = M(yn), this.errorHandler = M(Vt, {optional: !0}), this.sequences = new Set, this.deferredRegistrations = new Set, this.executing = !1
    }

    static {
        this.PHASES = [an.EarlyRead, an.Write, an.MixedReadWrite, an.Read]
    }

    execute() {
        this.executing = !0;
        for (let t of e.PHASES) for (let n of this.sequences) if (!(n.erroredOrDestroyed || !n.hooks[t])) try {
            n.pipelinedValue = this.ngZone.runOutsideAngular(() => n.hooks[t](n.pipelinedValue))
        } catch (r) {
            n.erroredOrDestroyed = !0, this.errorHandler?.handleError(r)
        }
        this.executing = !1;
        for (let t of this.sequences) t.afterRun(), t.once && (this.sequences.delete(t), t.destroy());
        for (let t of this.deferredRegistrations) this.sequences.add(t);
        this.deferredRegistrations.size > 0 && this.scheduler.notify(7), this.deferredRegistrations.clear()
    }

    register(t) {
        this.executing ? this.deferredRegistrations.add(t) : (this.sequences.add(t), this.scheduler.notify(6))
    }

    unregister(t) {
        this.executing && this.sequences.has(t) ? (t.erroredOrDestroyed = !0, t.pipelinedValue = void 0, t.once = !0) : (this.sequences.delete(t), this.deferredRegistrations.delete(t))
    }

    static {
        this.\u0275prov = B({token: e, providedIn: "root", factory: () => new e})
    }
}, Zs = class {
    constructor(t, n, r, o) {
        this.impl = t, this.hooks = n, this.once = r, this.erroredOrDestroyed = !1, this.pipelinedValue = void 0, this.unregisterOnDestroy = o?.onDestroy(() => this.destroy())
    }

    afterRun() {
        this.erroredOrDestroyed = !1, this.pipelinedValue = void 0
    }

    destroy() {
        this.impl.unregister(this), this.unregisterOnDestroy?.()
    }
};

function nI(e, t) {
    !t?.injector && wa(nI);
    let n = t?.injector ?? M(Je);
    return Gd(n) ? ($e("NgAfterRender"), Xf(e, n, t, !1)) : ep
}

function rI(e, t) {
    !t?.injector && wa(rI);
    let n = t?.injector ?? M(Je);
    return Gd(n) ? ($e("NgAfterNextRender"), Xf(e, n, t, !0)) : ep
}

function oI(e, t) {
    if (e instanceof Function) {
        let n = [void 0, void 0, void 0, void 0];
        return n[t] = e, n
    } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read]
}

function Xf(e, t, n, r) {
    let o = t.get(Jf);
    o.impl ??= t.get(qs);
    let i = n?.phase ?? an.MixedReadWrite, s = n?.manualCleanup !== !0 ? t.get($o) : null,
        a = new Zs(o.impl, oI(e, i), r, s);
    return o.impl.register(a), a
}

var ep = {
    destroy() {
    }
};

function iI(e, t, n, r) {
    let o = D(), i = It();
    if (pe(o, i, t)) {
        let s = k(), a = zt();
        _v(a, o, e, t, n, r)
    }
    return iI
}

function su(e, t, n, r) {
    return pe(e, It(), n) ? t + At(n) + r : he
}

function tp(e, t, n, r, o, i) {
    let s = Om(), a = Wn(e, s, n, o);
    return Ta(2), a ? t + At(n) + r + At(o) + i : he
}

function Ur(e, t) {
    return e << 17 | t << 2
}

function Ht(e) {
    return e >> 17 & 32767
}

function sI(e) {
    return (e & 2) == 2
}

function aI(e, t) {
    return e & 131071 | t << 17
}

function Ys(e) {
    return e | 2
}

function Dn(e) {
    return (e & 131068) >> 2
}

function Ui(e, t) {
    return e & -131069 | t << 2
}

function uI(e) {
    return (e & 1) === 1
}

function Qs(e) {
    return e | 1
}

function cI(e, t, n, r, o, i) {
    let s = i ? t.classBindings : t.styleBindings, a = Ht(s), u = Dn(s);
    e[r] = n;
    let c = !1, l;
    if (Array.isArray(n)) {
        let d = n;
        l = d[1], (l === null || Yn(d, l) > 0) && (c = !0)
    } else l = n;
    if (o) if (u !== 0) {
        let p = Ht(e[a + 1]);
        e[r + 1] = Ur(p, a), p !== 0 && (e[p + 1] = Ui(e[p + 1], r)), e[a + 1] = aI(e[a + 1], r)
    } else e[r + 1] = Ur(a, 0), a !== 0 && (e[a + 1] = Ui(e[a + 1], r)), a = r; else e[r + 1] = Ur(u, 0), a === 0 ? a = r : e[u + 1] = Ui(e[u + 1], r), u = r;
    c && (e[r + 1] = Ys(e[r + 1])), sl(e, l, r, !0), sl(e, l, r, !1), lI(t, l, e, r, i), s = Ur(a, u), i ? t.classBindings = s : t.styleBindings = s
}

function lI(e, t, n, r, o) {
    let i = o ? e.residualClasses : e.residualStyles;
    i != null && typeof t == "string" && Yn(i, t) >= 0 && (n[r + 1] = Qs(n[r + 1]))
}

function sl(e, t, n, r) {
    let o = e[n + 1], i = t === null, s = r ? Ht(o) : Dn(o), a = !1;
    for (; s !== 0 && (a === !1 || i);) {
        let u = e[s], c = e[s + 1];
        dI(u, t) && (a = !0, e[s + 1] = r ? Qs(c) : Ys(c)), s = r ? Ht(c) : Dn(c)
    }
    a && (e[n + 1] = r ? Ys(o) : Qs(o))
}

function dI(e, t) {
    return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t ? !0 : Array.isArray(e) && typeof t == "string" ? Yn(e, t) >= 0 : !1
}

var Me = {textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0};

function fI(e) {
    return e.substring(Me.key, Me.keyEnd)
}

function pI(e) {
    return hI(e), np(e, rp(e, 0, Me.textEnd))
}

function np(e, t) {
    let n = Me.textEnd;
    return n === t ? -1 : (t = Me.keyEnd = gI(e, Me.key = t, n), rp(e, t, n))
}

function hI(e) {
    Me.key = 0, Me.keyEnd = 0, Me.value = 0, Me.valueEnd = 0, Me.textEnd = e.length
}

function rp(e, t, n) {
    for (; t < n && e.charCodeAt(t) <= 32;) t++;
    return t
}

function gI(e, t, n) {
    for (; t < n && e.charCodeAt(t) > 32;) t++;
    return t
}

function mI(e, t, n) {
    let r = D(), o = It();
    if (pe(r, o, t)) {
        let i = k(), s = zt();
        bn(i, s, r, e, t, r[P], n, !1)
    }
    return mI
}

function Ks(e, t, n, r, o) {
    let i = t.inputs, s = o ? "class" : "style";
    Xa(e, n, i[s], s, r)
}

function op(e, t, n) {
    return sp(e, t, n, !1), op
}

function yI(e, t) {
    return sp(e, t, null, !0), yI
}

function JN(e) {
    ap(CI, ip, e, !0)
}

function ip(e, t) {
    for (let n = pI(t); n >= 0; n = np(t, n)) Ao(e, fI(t), !0)
}

function sp(e, t, n, r) {
    let o = D(), i = k(), s = Ta(2);
    if (i.firstUpdatePass && cp(i, e, s, r), t !== he && pe(o, s, t)) {
        let a = i.data[tt()];
        lp(i, a, o, o[P], e, o[s + 1] = _I(t, n), r, s)
    }
}

function ap(e, t, n, r) {
    let o = k(), i = Ta(2);
    o.firstUpdatePass && cp(o, null, i, r);
    let s = D();
    if (n !== he && pe(s, i, n)) {
        let a = o.data[tt()];
        if (dp(a, r) && !up(o, i)) {
            let u = r ? a.classesWithoutHost : a.stylesWithoutHost;
            u !== null && (n = Qi(u, n || "")), Ks(o, a, s, n, r)
        } else bI(o, a, s, s[P], s[i + 1], s[i + 1] = EI(e, t, n), r, i)
    }
}

function up(e, t) {
    return t >= e.expandoStartIndex
}

function cp(e, t, n, r) {
    let o = e.data;
    if (o[n + 1] === null) {
        let i = o[tt()], s = up(e, n);
        dp(i, r) && t === null && !s && (t = !1), t = vI(o, i, t, r), cI(o, i, t, n, s, r)
    }
}

function vI(e, t, n, r) {
    let o = Na(e), i = r ? t.residualClasses : t.residualStyles;
    if (o === null) (r ? t.classBindings : t.styleBindings) === 0 && (n = zi(null, e, t, n, r), n = qn(n, t.attrs, r), i = null); else {
        let s = t.directiveStylingLast;
        if (s === -1 || e[s] !== o) if (n = zi(o, e, t, n, r), i === null) {
            let u = DI(e, t, r);
            u !== void 0 && Array.isArray(u) && (u = zi(null, e, t, u[1], r), u = qn(u, t.attrs, r), II(e, t, r, u))
        } else i = wI(e, t, r)
    }
    return i !== void 0 && (r ? t.residualClasses = i : t.residualStyles = i), n
}

function DI(e, t, n) {
    let r = n ? t.classBindings : t.styleBindings;
    if (Dn(r) !== 0) return e[Ht(r)]
}

function II(e, t, n, r) {
    let o = n ? t.classBindings : t.styleBindings;
    e[Ht(o)] = r
}

function wI(e, t, n) {
    let r, o = t.directiveEnd;
    for (let i = 1 + t.directiveStylingLast; i < o; i++) {
        let s = e[i].hostAttrs;
        r = qn(r, s, n)
    }
    return qn(r, t.attrs, n)
}

function zi(e, t, n, r, o) {
    let i = null, s = n.directiveEnd, a = n.directiveStylingLast;
    for (a === -1 ? a = n.directiveStart : a++; a < s && (i = t[a], r = qn(r, i.hostAttrs, o), i !== e);) a++;
    return e !== null && (n.directiveStylingLast = a), r
}

function qn(e, t, n) {
    let r = n ? 1 : 2, o = -1;
    if (t !== null) for (let i = 0; i < t.length; i++) {
        let s = t[i];
        typeof s == "number" ? o = s : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]), Ao(e, s, n ? !0 : t[++i]))
    }
    return e === void 0 ? null : e
}

function EI(e, t, n) {
    if (n == null || n === "") return X;
    let r = [], o = Xn(n);
    if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0); else if (typeof o == "object") for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]); else typeof o == "string" && t(r, o);
    return r
}

function CI(e, t, n) {
    let r = String(t);
    r !== "" && !r.includes(" ") && Ao(e, r, n)
}

function bI(e, t, n, r, o, i, s, a) {
    o === he && (o = X);
    let u = 0, c = 0, l = 0 < o.length ? o[0] : null, d = 0 < i.length ? i[0] : null;
    for (; l !== null || d !== null;) {
        let p = u < o.length ? o[u + 1] : void 0, f = c < i.length ? i[c + 1] : void 0, h = null, g;
        l === d ? (u += 2, c += 2, p !== f && (h = d, g = f)) : d === null || l !== null && l < d ? (u += 2, h = l) : (c += 2, h = d, g = f), h !== null && lp(e, t, n, r, h, g, s, a), l = u < o.length ? o[u] : null, d = c < i.length ? i[c] : null
    }
}

function lp(e, t, n, r, o, i, s, a) {
    if (!(t.type & 3)) return;
    let u = e.data, c = u[a + 1], l = uI(c) ? al(u, t, n, o, Dn(c), s) : void 0;
    if (!Co(l)) {
        Co(i) || sI(c) && (i = al(u, null, n, o, a, s));
        let d = Xl(tt(), n);
        rv(r, s, d, o, i)
    }
}

function al(e, t, n, r, o, i) {
    let s = t === null, a;
    for (; o > 0;) {
        let u = e[o], c = Array.isArray(u), l = c ? u[1] : u, d = l === null, p = n[o + 1];
        p === he && (p = d ? X : void 0);
        let f = d ? Pi(p, r) : l === r ? p : void 0;
        if (c && !Co(f) && (f = Pi(u, r)), Co(f) && (a = f, s)) return a;
        let h = e[o + 1];
        o = s ? Ht(h) : Dn(h)
    }
    if (t !== null) {
        let u = i ? t.residualClasses : t.residualStyles;
        u != null && (a = Pi(u, r))
    }
    return a
}

function Co(e) {
    return e !== void 0
}

function _I(e, t) {
    return e == null || e === "" || (typeof t == "string" ? e = e + t : typeof e == "object" && (e = oe(Xn(e)))), e
}

function dp(e, t) {
    return (e.flags & (t ? 8 : 16)) !== 0
}

function XN(e, t, n) {
    let r = D(), o = su(r, e, t, n);
    ap(Ao, ip, o, !0)
}

var Js = class {
    destroy(t) {
    }

    updateValue(t, n) {
    }

    swap(t, n) {
        let r = Math.min(t, n), o = Math.max(t, n), i = this.detach(o);
        if (o - r > 1) {
            let s = this.detach(r);
            this.attach(r, i), this.attach(o, s)
        } else this.attach(r, i)
    }

    move(t, n) {
        this.attach(n, this.detach(t))
    }
};

function Gi(e, t, n, r, o) {
    return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0
}

function MI(e, t, n) {
    let r, o, i = 0, s = e.length - 1, a = void 0;
    if (Array.isArray(t)) {
        let u = t.length - 1;
        for (; i <= s && i <= u;) {
            let c = e.at(i), l = t[i], d = Gi(i, c, i, l, n);
            if (d !== 0) {
                d < 0 && e.updateValue(i, l), i++;
                continue
            }
            let p = e.at(s), f = t[u], h = Gi(s, p, u, f, n);
            if (h !== 0) {
                h < 0 && e.updateValue(s, f), s--, u--;
                continue
            }
            let g = n(i, c), E = n(s, p), m = n(i, l);
            if (Object.is(m, E)) {
                let S = n(u, f);
                Object.is(S, g) ? (e.swap(i, s), e.updateValue(s, f), u--, s--) : e.move(s, i), e.updateValue(i, l), i++;
                continue
            }
            if (r ??= new bo, o ??= cl(e, i, s, n), Xs(e, r, i, m)) e.updateValue(i, l), i++, s++; else if (o.has(m)) r.set(g, e.detach(i)), s--; else {
                let S = e.create(i, t[i]);
                e.attach(i, S), i++, s++
            }
        }
        for (; i <= u;) ul(e, r, n, i, t[i]), i++
    } else if (t != null) {
        let u = t[Symbol.iterator](), c = u.next();
        for (; !c.done && i <= s;) {
            let l = e.at(i), d = c.value, p = Gi(i, l, i, d, n);
            if (p !== 0) p < 0 && e.updateValue(i, d), i++, c = u.next(); else {
                r ??= new bo, o ??= cl(e, i, s, n);
                let f = n(i, d);
                if (Xs(e, r, i, f)) e.updateValue(i, d), i++, s++, c = u.next(); else if (!o.has(f)) e.attach(i, e.create(i, d)), i++, s++, c = u.next(); else {
                    let h = n(i, l);
                    r.set(h, e.detach(i)), s--
                }
            }
        }
        for (; !c.done;) ul(e, r, n, e.length, c.value), c = u.next()
    }
    for (; i <= s;) e.destroy(e.detach(s--));
    r?.forEach(u => {
        e.destroy(u)
    })
}

function Xs(e, t, n, r) {
    return t !== void 0 && t.has(r) ? (e.attach(n, t.get(r)), t.delete(r), !0) : !1
}

function ul(e, t, n, r, o) {
    if (Xs(e, t, r, n(r, o))) e.updateValue(r, o); else {
        let i = e.create(r, o);
        e.attach(r, i)
    }
}

function cl(e, t, n, r) {
    let o = new Set;
    for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
    return o
}

var bo = class {
    constructor() {
        this.kvMap = new Map, this._vMap = void 0
    }

    has(t) {
        return this.kvMap.has(t)
    }

    delete(t) {
        if (!this.has(t)) return !1;
        let n = this.kvMap.get(t);
        return this._vMap !== void 0 && this._vMap.has(n) ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n)) : this.kvMap.delete(t), !0
    }

    get(t) {
        return this.kvMap.get(t)
    }

    set(t, n) {
        if (this.kvMap.has(t)) {
            let r = this.kvMap.get(t);
            this._vMap === void 0 && (this._vMap = new Map);
            let o = this._vMap;
            for (; o.has(r);) r = o.get(r);
            o.set(r, n)
        } else this.kvMap.set(t, n)
    }

    forEach(t) {
        for (let [n, r] of this.kvMap) if (t(r, n), this._vMap !== void 0) {
            let o = this._vMap;
            for (; o.has(r);) r = o.get(r), t(r, n)
        }
    }
};

function eA(e, t) {
    $e("NgControlFlow");
    let n = D(), r = It(), o = n[r] !== he ? n[r] : -1, i = o !== -1 ? _o(n, H + o) : void 0, s = 0;
    if (pe(n, r, e)) {
        let a = T(null);
        try {
            if (i !== void 0 && Cf(i, s), e !== -1) {
                let u = H + e, c = _o(n, u), l = ra(n[C], u), d = mn(c, l.tView.ssrId),
                    p = nr(n, l, t, {dehydratedView: d});
                rr(c, p, s, gn(l, d))
            }
        } finally {
            T(a)
        }
    } else if (i !== void 0) {
        let a = Ef(i, s);
        a !== void 0 && (a[ee] = t)
    }
}

var ea = class {
    constructor(t, n, r) {
        this.lContainer = t, this.$implicit = n, this.$index = r
    }

    get $count() {
        return this.lContainer.length - te
    }
};

function tA(e) {
    return e
}

function nA(e, t) {
    return t
}

var ta = class {
    constructor(t, n, r) {
        this.hasEmptyBlock = t, this.trackByFn = n, this.liveCollection = r
    }
};

function rA(e, t, n, r, o, i, s, a, u, c, l, d, p) {
    $e("NgControlFlow");
    let f = D(), h = k(), g = u !== void 0, E = D(), m = a ? s.bind(E[fe][ee]) : s, S = new ta(g, m);
    E[H + e] = S, Eo(f, h, e + 1, t, n, r, o, Ke(h.consts, i)), g && Eo(f, h, e + 2, u, c, l, d, Ke(h.consts, p))
}

var na = class extends Js {
    constructor(t, n, r) {
        super(), this.lContainer = t, this.hostLView = n, this.templateTNode = r, this.operationsCounter = void 0, this.needsIndexUpdate = !1
    }

    get length() {
        return this.lContainer.length - te
    }

    at(t) {
        return this.getLView(t)[ee].$implicit
    }

    attach(t, n) {
        let r = n[dn];
        this.needsIndexUpdate ||= t !== this.length, rr(this.lContainer, n, t, gn(this.templateTNode, r))
    }

    detach(t) {
        return this.needsIndexUpdate ||= t !== this.length - 1, xI(this.lContainer, t)
    }

    create(t, n) {
        let r = mn(this.lContainer, this.templateTNode.tView.ssrId),
            o = nr(this.hostLView, this.templateTNode, new ea(this.lContainer, n, t), {dehydratedView: r});
        return this.operationsCounter?.recordCreate(), o
    }

    destroy(t) {
        Uo(t[C], t), this.operationsCounter?.recordDestroy()
    }

    updateValue(t, n) {
        this.getLView(t)[ee].$implicit = n
    }

    reset() {
        this.needsIndexUpdate = !1, this.operationsCounter?.reset()
    }

    updateIndexes() {
        if (this.needsIndexUpdate) for (let t = 0; t < this.length; t++) this.getLView(t)[ee].$index = t
    }

    getLView(t) {
        return SI(this.lContainer, t)
    }
};

function oA(e) {
    let t = T(null), n = tt();
    try {
        let r = D(), o = r[C], i = r[n], s = n + 1, a = _o(r, s);
        if (i.liveCollection === void 0) {
            let c = ra(o, s);
            i.liveCollection = new na(a, r, c)
        } else i.liveCollection.reset();
        let u = i.liveCollection;
        if (MI(u, e, i.trackByFn), u.updateIndexes(), i.hasEmptyBlock) {
            let c = It(), l = u.length === 0;
            if (pe(r, c, l)) {
                let d = n + 2, p = _o(r, d);
                if (l) {
                    let f = ra(o, d), h = mn(p, f.tView.ssrId), g = nr(r, f, void 0, {dehydratedView: h});
                    rr(p, g, 0, gn(f, h))
                } else Cf(p, 0)
            }
        }
    } finally {
        T(t)
    }
}

function _o(e, t) {
    return e[t]
}

function xI(e, t) {
    return Gn(e, t)
}

function SI(e, t) {
    return Ef(e, t)
}

function ra(e, t) {
    return _a(e, t)
}

function TI(e, t, n, r, o, i) {
    let s = t.consts, a = Ke(s, o), u = Cn(t, e, 2, r, a);
    return Ja(t, n, u, Ke(s, i)), u.attrs !== null && vo(u, u.attrs, !1), u.mergedAttrs !== null && vo(u, u.mergedAttrs, !0), t.queries !== null && t.queries.elementStart(t, u), u
}

function fp(e, t, n, r) {
    let o = D(), i = k(), s = H + e, a = o[P], u = i.firstCreatePass ? TI(s, i, o, t, n, r) : i.data[s],
        c = AI(i, o, u, a, t, e);
    o[s] = c;
    let l = Po(u);
    return Ve(u, !0), uf(a, c, u), !KD(u) && Qn() && zo(i, o, c, u), Mm() === 0 && mt(c, o), xm(), l && (Ya(i, o, u), Za(i, u, o)), r !== null && Qa(o, u), fp
}

function pp() {
    let e = Z();
    xa() ? Sa() : (e = e.parent, Ve(e, !1));
    let t = e;
    Tm(t) && Nm(), Sm();
    let n = k();
    return n.firstCreatePass && (Bo(n, e), Ca(e) && n.queries.elementEnd(e)), t.classesWithoutHost != null && zm(t) && Ks(n, t, D(), t.classesWithoutHost, !0), t.stylesWithoutHost != null && Gm(t) && Ks(n, t, D(), t.stylesWithoutHost, !1), pp
}

function NI(e, t, n, r) {
    return fp(e, t, n, r), pp(), NI
}

var AI = (e, t, n, r, o, i) => (Kn(!0), za(r, o, Bm()));

function OI(e, t, n, r, o) {
    let i = t.consts, s = Ke(i, r), a = Cn(t, e, 8, "ng-container", s);
    s !== null && vo(a, s, !0);
    let u = Ke(i, o);
    return Ja(t, n, a, u), t.queries !== null && t.queries.elementStart(t, a), a
}

function hp(e, t, n) {
    let r = D(), o = k(), i = e + H, s = o.firstCreatePass ? OI(i, o, r, t, n) : o.data[i];
    Ve(s, !0);
    let a = RI(o, r, s, e);
    return r[i] = a, Qn() && zo(o, r, a, s), mt(a, r), Po(s) && (Ya(o, r, s), Za(o, s, r)), n != null && Qa(r, s), hp
}

function gp() {
    let e = Z(), t = k();
    return xa() ? Sa() : (e = e.parent, Ve(e, !1)), t.firstCreatePass && (Bo(t, e), Ca(e) && t.queries.elementEnd(e)), gp
}

function FI(e, t, n) {
    return hp(e, t, n), gp(), FI
}

var RI = (e, t, n, r) => (Kn(!0), qd(t[P], ""));

function iA() {
    return D()
}

function PI(e, t, n) {
    let r = D(), o = It();
    if (pe(r, o, t)) {
        let i = k(), s = zt();
        bn(i, s, r, e, t, r[P], n, !0)
    }
    return PI
}

function kI(e, t, n) {
    let r = D(), o = It();
    if (pe(r, o, t)) {
        let i = k(), s = zt(), a = Na(i.data), u = Df(a, s, r);
        bn(i, s, r, e, t, u, n, !0)
    }
    return kI
}

var Tt = void 0;

function LI(e) {
    let t = e, n = Math.floor(Math.abs(e)), r = e.toString().replace(/^[^.]*\.?/, "").length;
    return n === 1 && r === 0 ? 1 : 5
}

var jI = ["en", [["a", "p"], ["AM", "PM"], Tt], [["AM", "PM"], Tt, Tt], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], Tt, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], Tt, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", Tt, "{1} 'at' {0}", Tt], [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", LI],
    Wi = {};

function ge(e) {
    let t = VI(e), n = ll(t);
    if (n) return n;
    let r = t.split("-")[0];
    if (n = ll(r), n) return n;
    if (r === "en") return jI;
    throw new A(701, !1)
}

function ll(e) {
    return e in Wi || (Wi[e] = dt.ng && dt.ng.common && dt.ng.common.locales && dt.ng.common.locales[e]), Wi[e]
}

var $ = function (e) {
    return e[e.LocaleId = 0] = "LocaleId", e[e.DayPeriodsFormat = 1] = "DayPeriodsFormat", e[e.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", e[e.DaysFormat = 3] = "DaysFormat", e[e.DaysStandalone = 4] = "DaysStandalone", e[e.MonthsFormat = 5] = "MonthsFormat", e[e.MonthsStandalone = 6] = "MonthsStandalone", e[e.Eras = 7] = "Eras", e[e.FirstDayOfWeek = 8] = "FirstDayOfWeek", e[e.WeekendRange = 9] = "WeekendRange", e[e.DateFormat = 10] = "DateFormat", e[e.TimeFormat = 11] = "TimeFormat", e[e.DateTimeFormat = 12] = "DateTimeFormat", e[e.NumberSymbols = 13] = "NumberSymbols", e[e.NumberFormats = 14] = "NumberFormats", e[e.CurrencyCode = 15] = "CurrencyCode", e[e.CurrencySymbol = 16] = "CurrencySymbol", e[e.CurrencyName = 17] = "CurrencyName", e[e.Currencies = 18] = "Currencies", e[e.Directionality = 19] = "Directionality", e[e.PluralCase = 20] = "PluralCase", e[e.ExtraData = 21] = "ExtraData", e
}($ || {});

function VI(e) {
    return e.toLowerCase().replace(/_/g, "-")
}

var Mo = "en-US", BI = "USD", $I = {marker: "element"}, HI = {marker: "ICU"}, We = function (e) {
    return e[e.SHIFT = 2] = "SHIFT", e[e.APPEND_EAGERLY = 1] = "APPEND_EAGERLY", e[e.COMMENT = 2] = "COMMENT", e
}(We || {}), UI = Mo;

function zI(e) {
    typeof e == "string" && (UI = e.toLowerCase().replace(/_/g, "-"))
}

function GI(e, t, n) {
    let r = e[P];
    switch (n) {
        case Node.COMMENT_NODE:
            return qd(r, t);
        case Node.TEXT_NODE:
            return Wd(r, t);
        case Node.ELEMENT_NODE:
            return za(r, t, null)
    }
}

var WI = (e, t, n, r) => (Kn(!0), GI(e, n, r));

function qI(e, t, n, r) {
    let o = e[P];
    for (let i = 0; i < t.length; i++) {
        let s = t[i++], a = t[i], u = (s & We.COMMENT) === We.COMMENT,
            c = (s & We.APPEND_EAGERLY) === We.APPEND_EAGERLY, l = s >>> We.SHIFT, d = e[l], p = !1;
        d === null && (d = e[l] = WI(e, l, a, u ? Node.COMMENT_NODE : Node.TEXT_NODE), p = Qn()), c && n !== null && p && hn(o, n, d, r, !1)
    }
}

var xo = /�(\d+):?\d*�/gi;
var ZI = /�(\d+)�/, mp = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/, jn = "\uFFFD", YI = /�\/?\*(\d+:\d+)�/gi,
    QI = /�(\/?[#*]\d+):?\d*�/gi, KI = /\uE500/g;

function JI(e) {
    return e.replace(KI, " ")
}

function XI(e, t, n, r, o, i) {
    let s = zn(), a = [], u = [], c = [[]], l = [[]];
    o = tw(o, i);
    let d = JI(o).split(QI);
    for (let p = 0; p < d.length; p++) {
        let f = d[p];
        if (p & 1) {
            let h = f.charCodeAt(0) === 47, g = f.charCodeAt(h ? 1 : 0),
                E = H + Number.parseInt(f.substring(h ? 2 : 1));
            if (h) c.shift(), l.shift(), Ve(zn(), !1); else {
                let m = Jv(e, c[0], E);
                c.unshift([]), Ve(m, !0);
                let S = {kind: 2, index: E, children: [], type: g === 35 ? 0 : 1};
                l[0].push(S), l.unshift(S.children)
            }
        } else {
            let h = oa(f);
            for (let g = 0; g < h.length; g++) {
                let E = h[g];
                if (g & 1) {
                    let m = E;
                    if (typeof m != "object") throw new Error(`Unable to parse ICU expression in "${o}" message.`);
                    let Y = yp(e, s, c[0], n, a, "", !0).index;
                    Dp(l[0], e, n, u, t, m, Y)
                } else {
                    let m = E;
                    m !== "" && ew(l[0], e, s, c[0], a, u, n, m)
                }
            }
        }
    }
    e.data[r] = {create: a, update: u, ast: l[0], parentTNodeIndex: t}
}

function yp(e, t, n, r, o, i, s) {
    let a = tr(e, r, 1, null), u = a << We.SHIFT, c = zn();
    t === c && (c = null), c === null && (u |= We.APPEND_EAGERLY), s && (u |= We.COMMENT, Gy(nD)), o.push(u, i === null ? "" : i);
    let l = qa(e, a, s ? 32 : 1, i === null ? "" : i, null);
    Of(n, l);
    let d = l.index;
    return Ve(l, !1), c !== null && t !== c && Kv(c, d), l
}

function ew(e, t, n, r, o, i, s, a) {
    let u = a.match(xo), l = yp(t, n, r, s, o, u ? null : a, !1).index;
    u && Qr(i, a, l, null, 0, null), e.push({kind: 0, index: l})
}

function Qr(e, t, n, r, o, i) {
    let s = e.length, a = s + 1;
    e.push(null, null);
    let u = s + 2, c = t.split(xo), l = 0;
    for (let d = 0; d < c.length; d++) {
        let p = c[d];
        if (d & 1) {
            let f = o + parseInt(p, 10);
            e.push(-1 - f), l = l | vp(f)
        } else p !== "" && e.push(p)
    }
    return e.push(n << 2 | (r ? 1 : 0)), r && e.push(r, i), e[s] = l, e[a] = e.length - u, l
}

function vp(e) {
    return 1 << Math.min(e, 31)
}

function dl(e) {
    let t, n = "", r = 0, o = !1, i;
    for (; (t = YI.exec(e)) !== null;) o ? t[0] === `${jn}/*${i}${jn}` && (r = t.index, o = !1) : (n += e.substring(r, t.index + t[0].length), i = t[1], o = !0);
    return n += e.slice(r), n
}

function tw(e, t) {
    if (tD(t)) return dl(e);
    {
        let n = e.indexOf(`:${t}${jn}`) + 2 + t.toString().length,
            r = e.search(new RegExp(`${jn}\\/\\*\\d+:${t}${jn}`));
        return dl(e.substring(n, r))
    }
}

function Dp(e, t, n, r, o, i, s) {
    let a = 0, u = {
        type: i.type,
        currentCaseLViewIndex: tr(t, n, 1, null),
        anchorIdx: s,
        cases: [],
        create: [],
        remove: [],
        update: []
    };
    iw(r, i, s), Qv(t, s, u);
    let c = i.values, l = [];
    for (let d = 0; d < c.length; d++) {
        let p = c[d], f = [];
        for (let g = 0; g < p.length; g++) {
            let E = p[g];
            if (typeof E != "string") {
                let m = f.push(E) - 1;
                p[g] = `<!--\uFFFD${m}\uFFFD-->`
            }
        }
        let h = [];
        l.push(h), a = rw(h, t, u, n, r, o, i.cases[d], p.join(""), f) | a
    }
    a && sw(r, a, s), e.push({kind: 3, index: s, cases: l, currentCaseLViewIndex: u.currentCaseLViewIndex})
}

function nw(e) {
    let t = [], n = [], r = 1, o = 0;
    e = e.replace(mp, function (s, a, u) {
        return u === "select" ? r = 0 : r = 1, o = parseInt(a.slice(1), 10), ""
    });
    let i = oa(e);
    for (let s = 0; s < i.length;) {
        let a = i[s++].trim();
        r === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")), a.length && t.push(a);
        let u = oa(i[s++]);
        t.length > n.length && n.push(u)
    }
    return {type: r, mainBinding: o, cases: t, values: n}
}

function oa(e) {
    if (!e) return [];
    let t = 0, n = [], r = [], o = /[{}]/g;
    o.lastIndex = 0;
    let i;
    for (; i = o.exec(e);) {
        let a = i.index;
        if (i[0] == "}") {
            if (n.pop(), n.length == 0) {
                let u = e.substring(t, a);
                mp.test(u) ? r.push(nw(u)) : r.push(u), t = a + 1
            }
        } else {
            if (n.length == 0) {
                let u = e.substring(t, a);
                r.push(u), t = a + 1
            }
            n.push("{")
        }
    }
    let s = e.substring(t);
    return r.push(s), r
}

function rw(e, t, n, r, o, i, s, a, u) {
    let c = [], l = [], d = [];
    n.cases.push(s), n.create.push(c), n.remove.push(l), n.update.push(d);
    let f = Ld(La()).getInertBodyElement(a), h = Ss(f) || f;
    return h ? Ip(e, t, n, r, o, c, l, d, h, i, u, 0) : 0
}

function Ip(e, t, n, r, o, i, s, a, u, c, l, d) {
    let p = 0, f = u.firstChild;
    for (; f;) {
        let h = tr(t, r, 1, null);
        switch (f.nodeType) {
            case Node.ELEMENT_NODE:
                let g = f, E = g.tagName.toLowerCase();
                if (Ms.hasOwnProperty(E)) {
                    qi(i, $I, E, c, h), t.data[h] = E;
                    let z = g.attributes;
                    for (let Q = 0; Q < z.length; Q++) {
                        let ue = z.item(Q), Wt = ue.name.toLowerCase();
                        !!ue.value.match(xo) ? $d.hasOwnProperty(Wt) && ($a[Wt] ? Qr(a, ue.value, h, ue.name, 0, Ba) : Qr(a, ue.value, h, ue.name, 0, null)) : aw(i, h, ue)
                    }
                    let ae = {kind: 1, index: h, children: []};
                    e.push(ae), p = Ip(ae.children, t, n, r, o, i, s, a, f, h, l, d + 1) | p, fl(s, h, d)
                }
                break;
            case Node.TEXT_NODE:
                let m = f.textContent || "", S = m.match(xo);
                qi(i, null, S ? "" : m, c, h), fl(s, h, d), S && (p = Qr(a, m, h, null, 0, null) | p), e.push({
                    kind: 0,
                    index: h
                });
                break;
            case Node.COMMENT_NODE:
                let Y = ZI.exec(f.textContent || "");
                if (Y) {
                    let z = parseInt(Y[1], 10), ae = l[z];
                    qi(i, HI, "", c, h), Dp(e, t, r, o, c, ae, h), ow(s, h, d)
                }
                break
        }
        f = f.nextSibling
    }
    return p
}

function fl(e, t, n) {
    n === 0 && e.push(t)
}

function ow(e, t, n) {
    n === 0 && (e.push(~t), e.push(t))
}

function iw(e, t, n) {
    e.push(vp(t.mainBinding), 2, -1 - t.mainBinding, n << 2 | 2)
}

function sw(e, t, n) {
    e.push(t, 1, n << 2 | 3)
}

function qi(e, t, n, r, o) {
    t !== null && e.push(t), e.push(n, o, eD(0, r, o))
}

function aw(e, t, n) {
    e.push(t << 1 | 1, n.name, n.value)
}

function uw(e, t, n = -1) {
    let r = k(), o = D(), i = H + e, s = Ke(r.consts, t), a = zn();
    if (r.firstCreatePass && XI(r, a === null ? 0 : a.index, o, i, s, n), r.type === 2) {
        let p = o[fe];
        p[I] |= 32
    } else o[I] |= 32;
    let u = r.data[i], c = a === o[ie] ? null : a, l = Kd(r, c, o), d = a && a.type & 8 ? o[a.index] : null;
    oD(o, i, a, n), qI(o, u.create, l, d), ud(!0)
}

function cw() {
    ud(!1)
}

function sA(e, t, n) {
    uw(e, t, n), cw()
}

var lw = (e, t, n) => {
};

function dw(e, t, n, r) {
    let o = D(), i = k(), s = Z();
    return au(i, o, o[P], s, e, t, r), dw
}

function fw(e, t) {
    let n = Z(), r = D(), o = k(), i = Na(o.data), s = Df(i, n, r);
    return au(o, r, s, n, e, t), fw
}

function pw(e, t, n, r) {
    let o = e.cleanup;
    if (o != null) for (let i = 0; i < o.length - 1; i += 2) {
        let s = o[i];
        if (s === n && o[i + 1] === r) {
            let a = t[oo], u = o[i + 2];
            return a.length > u ? a[u] : null
        }
        typeof s == "string" && (i += 2)
    }
    return null
}

function au(e, t, n, r, o, i, s) {
    let a = Po(r), c = e.firstCreatePass && vf(e), l = t[ee], d = yf(t), p = !0;
    if (r.type & 3 || s) {
        let g = we(r, t), E = s ? s(g) : g, m = d.length, S = s ? z => s(Te(z[r.index])) : r.index, Y = null;
        if (!s && a && (Y = pw(e, t, o, r.index)), Y !== null) {
            let z = Y.__ngLastListenerFn__ || Y;
            z.__ngNextListenerFn__ = i, Y.__ngLastListenerFn__ = i, p = !1
        } else {
            i = hl(r, t, l, i), lw(g, o, i);
            let z = n.listen(E, o, i);
            d.push(i, z), c && c.push(o, S, m, m + 1)
        }
    } else i = hl(r, t, l, i);
    let f = r.outputs, h;
    if (p && f !== null && (h = f[o])) {
        let g = h.length;
        if (g) for (let E = 0; E < g; E += 2) {
            let m = h[E], S = h[E + 1], ae = t[m][S].subscribe(i), Q = d.length;
            d.push(i, ae), c && c.push(o, r.index, Q, -(Q + 1))
        }
    }
}

function pl(e, t, n, r) {
    let o = T(null);
    try {
        return ke(6, t, n), n(r) !== !1
    } catch (i) {
        return If(e, i), !1
    } finally {
        ke(7, t, n), T(o)
    }
}

function hl(e, t, n, r) {
    return function o(i) {
        if (i === Function) return r;
        let s = e.componentOffset > -1 ? Dt(e.index, t) : t;
        tu(s, 5);
        let a = pl(t, n, r, i), u = o.__ngNextListenerFn__;
        for (; u;) a = pl(t, n, u, i) && a, u = u.__ngNextListenerFn__;
        return a
    }
}

function aA(e = 1) {
    return jm(e)
}

function hw(e, t) {
    let n = null, r = qg(e);
    for (let o = 0; o < t.length; o++) {
        let i = t[o];
        if (i === "*") {
            n = o;
            continue
        }
        if (r === null ? Pl(e, i, !0) : Qg(r, i)) return o
    }
    return n
}

function uA(e) {
    let t = D()[fe][ie];
    if (!t.projection) {
        let n = e ? e.length : 1, r = t.projection = jg(n, null), o = r.slice(), i = t.child;
        for (; i !== null;) {
            if (i.type !== 128) {
                let s = e ? hw(i, e) : 0;
                s !== null && (o[s] ? o[s].projectionNext = i : r[s] = i, o[s] = i)
            }
            i = i.next
        }
    }
}

function cA(e, t = 0, n, r, o, i) {
    let s = D(), a = k(), u = r ? e + 1 : null;
    u !== null && Eo(s, a, u, r, o, i, null, n);
    let c = Cn(a, H + e, 16, null, n || null);
    c.projection === null && (c.projection = t), Sa();
    let d = !s[dn] || id();
    s[fe][ie].projection[c.projection] === null && u !== null ? gw(s, a, u) : d && (c.flags & 32) !== 32 && tv(a, s, c)
}

function gw(e, t, n) {
    let r = H + n, o = t.data[r], i = e[r], s = mn(i, o.tView.ssrId), a = nr(e, o, void 0, {dehydratedView: s});
    rr(i, a, 0, gn(o, s))
}

function mw(e, t, n) {
    return wp(e, "", t, "", n), mw
}

function wp(e, t, n, r, o) {
    let i = D(), s = su(i, t, n, r);
    if (s !== he) {
        let a = k(), u = zt();
        bn(a, u, i, e, s, i[P], o, !1)
    }
    return wp
}

function yw(e, t, n, r, o, i, s) {
    let a = D(), u = tp(a, t, n, r, o, i);
    if (u !== he) {
        let c = k(), l = zt();
        bn(c, l, a, e, u, a[P], s, !1)
    }
    return yw
}

function lA(e, t, n, r) {
    Hf(e, t, n, r)
}

function dA(e, t, n) {
    $f(e, t, n)
}

function fA(e) {
    let t = D(), n = k(), r = Aa();
    Vo(r + 1);
    let o = iu(n, r);
    if (e.dirty && Em(t) === ((o.metadata.flags & 2) === 2)) {
        if (o.matches === null) e.reset([]); else {
            let i = zf(t, r);
            e.reset(i, Td), e.notifyOnChanges()
        }
        return !0
    }
    return !1
}

function pA() {
    return ou(D(), Aa())
}

function hA(e, t, n, r, o) {
    Yf(t, Hf(e, n, r, o))
}

function gA(e, t, n, r) {
    Yf(e, $f(t, n, r))
}

function mA(e = 1) {
    Vo(Aa() + e)
}

function vw(e, t, n, r) {
    n >= e.data.length && (e.data[n] = null, e.blueprint[n] = null), t[n] = r
}

function yA(e) {
    let t = Am();
    return ko(t, H + e)
}

function vA(e, t = "") {
    let n = D(), r = k(), o = e + H, i = r.firstCreatePass ? Cn(r, o, 1, t, null) : r.data[o], s = Dw(r, n, i, t, e);
    n[o] = s, Qn() && zo(r, n, s, i), Ve(i, !1)
}

var Dw = (e, t, n, r, o) => (Kn(!0), Wd(t[P], r));

function Iw(e) {
    return Ep("", e, ""), Iw
}

function Ep(e, t, n) {
    let r = D(), o = su(r, e, t, n);
    return o !== he && wf(r, tt(), o), Ep
}

function ww(e, t, n, r, o) {
    let i = D(), s = tp(i, e, t, n, r, o);
    return s !== he && wf(i, tt(), s), ww
}

function Ew(e, t, n) {
    Gf(t) && (t = t());
    let r = D(), o = It();
    if (pe(r, o, t)) {
        let i = k(), s = zt();
        bn(i, s, r, e, t, r[P], n, !1)
    }
    return Ew
}

function DA(e, t) {
    let n = Gf(e);
    return n && e.set(t), n
}

function Cw(e, t) {
    let n = D(), r = k(), o = Z();
    return au(r, n, n[P], o, e, t), Cw
}

function bw(e, t, n) {
    let r = k();
    if (r.firstCreatePass) {
        let o = Qe(e);
        ia(n, r.data, r.blueprint, o, !0), ia(t, r.data, r.blueprint, o, !1)
    }
}

function ia(e, t, n, r, o) {
    if (e = J(e), Array.isArray(e)) for (let i = 0; i < e.length; i++) ia(e[i], t, n, r, o); else {
        let i = k(), s = D(), a = Z(), u = ln(e) ? e : J(e.provide), c = Gl(e), l = a.providerIndexes & 1048575,
            d = a.directiveStart, p = a.providerIndexes >> 20;
        if (ln(e) || !e.multi) {
            let f = new Lt(c, o, U), h = Yi(u, t, o ? l : l + p, d);
            h === -1 ? (ls(lo(a, s), i, u), Zi(i, e, t.length), t.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(f), s.push(f)) : (n[h] = f, s[h] = f)
        } else {
            let f = Yi(u, t, l + p, d), h = Yi(u, t, l, l + p), g = f >= 0 && n[f], E = h >= 0 && n[h];
            if (o && !E || !o && !g) {
                ls(lo(a, s), i, u);
                let m = xw(o ? Mw : _w, n.length, o, r, c);
                !o && E && (n[h].providerFactory = m), Zi(i, e, t.length, 0), t.push(u), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), n.push(m), s.push(m)
            } else {
                let m = Cp(n[o ? h : f], c, !o && r);
                Zi(i, e, f > -1 ? f : h, m)
            }
            !o && r && E && n[h].componentProviders++
        }
    }
}

function Zi(e, t, n, r) {
    let o = ln(t), i = cm(t);
    if (o || i) {
        let u = (i ? J(t.useClass) : t).prototype.ngOnDestroy;
        if (u) {
            let c = e.destroyHooks || (e.destroyHooks = []);
            if (!o && t.multi) {
                let l = c.indexOf(n);
                l === -1 ? c.push(n, [r, u]) : c[l + 1].push(r, u)
            } else c.push(n, u)
        }
    }
}

function Cp(e, t, n) {
    return n && e.componentProviders++, e.multi.push(t) - 1
}

function Yi(e, t, n, r) {
    for (let o = n; o < r; o++) if (t[o] === e) return o;
    return -1
}

function _w(e, t, n, r) {
    return sa(this.multi, [])
}

function Mw(e, t, n, r) {
    let o = this.multi, i;
    if (this.providerFactory) {
        let s = this.providerFactory.componentProviders, a = jt(n, n[C], this.providerFactory.index, r);
        i = a.slice(0, s), sa(o, i);
        for (let u = s; u < a.length; u++) i.push(a[u])
    } else i = [], sa(o, i);
    return i
}

function sa(e, t) {
    for (let n = 0; n < e.length; n++) {
        let r = e[n];
        t.push(r())
    }
    return t
}

function xw(e, t, n, r, o) {
    let i = new Lt(e, n, U);
    return i.multi = [], i.index = t, i.componentProviders = 0, Cp(i, o, r && !n), i
}

function IA(e, t = []) {
    return n => {
        n.providersResolver = (r, o) => bw(r, o ? o(e) : e, t)
    }
}

var Sw = (() => {
    class e {
        constructor(n) {
            this._injector = n, this.cachedInjectors = new Map
        }

        getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
                let r = $l(!1, n.type), o = r.length > 0 ? WD([r], this._injector, `Standalone[${n.type.name}]`) : null;
                this.cachedInjectors.set(n, o)
            }
            return this.cachedInjectors.get(n)
        }

        ngOnDestroy() {
            try {
                for (let n of this.cachedInjectors.values()) n !== null && n.destroy()
            } finally {
                this.cachedInjectors.clear()
            }
        }

        static {
            this.\u0275prov = B({token: e, providedIn: "environment", factory: () => new e(ne(gt))})
        }
    }

    return e
})();

function wA(e) {
    $e("NgStandalone"), e.getStandaloneInjector = t => t.get(Sw).getOrCreateStandaloneInjector(e)
}

function EA(e, t, n, r) {
    return bp(D(), wn(), e, t, n, r)
}

function CA(e, t, n, r, o) {
    return _p(D(), wn(), e, t, n, r, o)
}

function bA(e, t, n, r, o, i) {
    return Tw(D(), wn(), e, t, n, r, o, i)
}

function Qo(e, t) {
    let n = e[t];
    return n === he ? void 0 : n
}

function bp(e, t, n, r, o, i) {
    let s = t + n;
    return pe(e, s, o) ? Yo(e, s + 1, i ? r.call(i, o) : r(o)) : Qo(e, s + 1)
}

function _p(e, t, n, r, o, i, s) {
    let a = t + n;
    return Wn(e, a, o, i) ? Yo(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : Qo(e, a + 2)
}

function Tw(e, t, n, r, o, i, s, a) {
    let u = t + n;
    return YD(e, u, o, i, s) ? Yo(e, u + 3, a ? r.call(a, o, i, s) : r(o, i, s)) : Qo(e, u + 3)
}

function Nw(e, t, n, r, o, i, s, a, u) {
    let c = t + n;
    return QD(e, c, o, i, s, a) ? Yo(e, c + 4, u ? r.call(u, o, i, s, a) : r(o, i, s, a)) : Qo(e, c + 4)
}

function _A(e, t) {
    let n = k(), r, o = e + H;
    n.firstCreatePass ? (r = Aw(t, n.pipeRegistry), n.data[o] = r, r.onDestroy && (n.destroyHooks ??= []).push(o, r.onDestroy)) : r = n.data[o];
    let i = r.factory || (r.factory = Ot(r.type, !0)), s, a = le(U);
    try {
        let u = co(!1), c = i();
        return co(u), vw(n, D(), o, c), c
    } finally {
        le(a)
    }
}

function Aw(e, t) {
    if (t) for (let n = t.length - 1; n >= 0; n--) {
        let r = t[n];
        if (e === r.name) return r
    }
}

function MA(e, t, n) {
    let r = e + H, o = D(), i = ko(o, r);
    return uu(o, r) ? bp(o, wn(), t, i.transform, n, i) : i.transform(n)
}

function xA(e, t, n, r) {
    let o = e + H, i = D(), s = ko(i, o);
    return uu(i, o) ? _p(i, wn(), t, s.transform, n, r, s) : s.transform(n, r)
}

function SA(e, t, n, r, o, i) {
    let s = e + H, a = D(), u = ko(a, s);
    return uu(a, s) ? Nw(a, wn(), t, u.transform, n, r, o, i, u) : u.transform(n, r, o, i)
}

function uu(e, t) {
    return e[C].data[t].pure
}

function TA(e, t) {
    return Zo(e, t)
}

var NA = (() => {
    class e {
        log(n) {
            console.log(n)
        }

        warn(n) {
            console.warn(n)
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "platform"})
        }
    }

    return e
})();
var Ow = new O("");

function cu(e) {
    return !!e && typeof e.then == "function"
}

function Mp(e) {
    return !!e && typeof e.subscribe == "function"
}

var Fw = new O(""), xp = (() => {
    class e {
        constructor() {
            this.initialized = !1, this.done = !1, this.donePromise = new Promise((n, r) => {
                this.resolve = n, this.reject = r
            }), this.appInits = M(Fw, {optional: !0}) ?? []
        }

        runInitializers() {
            if (this.initialized) return;
            let n = [];
            for (let o of this.appInits) {
                let i = o();
                if (cu(i)) n.push(i); else if (Mp(i)) {
                    let s = new Promise((a, u) => {
                        i.subscribe({complete: a, error: u})
                    });
                    n.push(s)
                }
            }
            let r = () => {
                this.done = !0, this.resolve()
            };
            Promise.all(n).then(() => {
                r()
            }).catch(o => {
                this.reject(o)
            }), n.length === 0 && r(), this.initialized = !0
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "root"})
        }
    }

    return e
})(), Rw = new O("");

function Pw() {
    Hu(() => {
        throw new A(600, !1)
    })
}

function kw(e) {
    return e.isBoundToModule
}

var Lw = 10;

function jw(e, t, n) {
    try {
        let r = n();
        return cu(r) ? r.catch(o => {
            throw t.runOutsideAngular(() => e.handleError(o)), o
        }) : r
    } catch (r) {
        throw t.runOutsideAngular(() => e.handleError(r)), r
    }
}

var Ko = (() => {
    class e {
        constructor() {
            this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = M(dy), this.afterRenderManager = M(Jf), this.zonelessEnabled = M(nu), this.dirtyFlags = 0, this.deferredDirtyFlags = 0, this.externalTestViews = new Set, this.beforeRender = new De, this.afterTick = new De, this.componentTypes = [], this.components = [], this.isStable = M(Jn).hasPendingTasks.pipe(Pe(n => !n)), this._injector = M(gt)
        }

        get allViews() {
            return [...this.externalTestViews.keys(), ...this._views]
        }

        get destroyed() {
            return this._destroyed
        }

        whenStable() {
            let n;
            return new Promise(r => {
                n = this.isStable.subscribe({
                    next: o => {
                        o && r()
                    }
                })
            }).finally(() => {
                n.unsubscribe()
            })
        }

        get injector() {
            return this._injector
        }

        bootstrap(n, r) {
            let o = n instanceof mo;
            if (!this._injector.get(xp).done) {
                let p = !o && nm(n), f = !1;
                throw new A(405, f)
            }
            let s;
            o ? s = n : s = this._injector.get(vn).resolveComponentFactory(n), this.componentTypes.push(s.componentType);
            let a = kw(s) ? void 0 : this._injector.get(vt), u = r || s.selector, c = s.create(Je.NULL, [], u, a),
                l = c.location.nativeElement, d = c.injector.get(Ow, null);
            return d?.registerApplication(l), c.onDestroy(() => {
                this.detachView(c.hostView), Kr(this.components, c), d?.unregisterApplication(l)
            }), this._loadComponent(c), c
        }

        tick() {
            this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick()
        }

        _tick() {
            if (this._runningTick) throw new A(101, !1);
            let n = T(null);
            try {
                this._runningTick = !0, this.synchronize()
            } catch (r) {
                this.internalErrorHandler(r)
            } finally {
                this._runningTick = !1, T(n), this.afterTick.next()
            }
        }

        synchronize() {
            let n = null;
            this._injector.destroyed || (n = this._injector.get(yo, null, {optional: !0})), this.dirtyFlags |= this.deferredDirtyFlags, this.deferredDirtyFlags = 0;
            let r = 0;
            for (; this.dirtyFlags !== 0 && r++ < Lw;) this.synchronizeOnce(n)
        }

        synchronizeOnce(n) {
            if (this.dirtyFlags |= this.deferredDirtyFlags, this.deferredDirtyFlags = 0, this.dirtyFlags & 7) {
                let r = !!(this.dirtyFlags & 1);
                this.dirtyFlags &= -8, this.dirtyFlags |= 8, this.beforeRender.next(r);
                for (let {_lView: o, notifyErrorHandler: i} of this._views) Vw(o, i, r, this.zonelessEnabled);
                if (this.dirtyFlags &= -5, this.syncDirtyFlagsWithViews(), this.dirtyFlags & 7) return
            } else n?.begin?.(), n?.end?.();
            this.dirtyFlags & 8 && (this.dirtyFlags &= -9, this.afterRenderManager.execute()), this.syncDirtyFlagsWithViews()
        }

        syncDirtyFlagsWithViews() {
            if (this.allViews.some(({_lView: n}) => Lo(n))) {
                this.dirtyFlags |= 2;
                return
            } else this.dirtyFlags &= -8
        }

        attachView(n) {
            let r = n;
            this._views.push(r), r.attachToAppRef(this)
        }

        detachView(n) {
            let r = n;
            Kr(this._views, r), r.detachFromAppRef()
        }

        _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            let r = this._injector.get(Rw, []);
            [...this._bootstrapListeners, ...r].forEach(o => o(n))
        }

        ngOnDestroy() {
            if (!this._destroyed) try {
                this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy())
            } finally {
                this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
            }
        }

        onDestroy(n) {
            return this._destroyListeners.push(n), () => Kr(this._destroyListeners, n)
        }

        destroy() {
            if (this._destroyed) throw new A(406, !1);
            let n = this._injector;
            n.destroy && !n.destroyed && n.destroy()
        }

        get viewCount() {
            return this._views.length
        }

        warnIfDestroyed() {
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "root"})
        }
    }

    return e
})();

function Kr(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}

function Vw(e, t, n, r) {
    if (!n && !Lo(e)) return;
    Mf(e, t, n && !r ? 0 : 1)
}

var aa = class {
    constructor(t, n) {
        this.ngModuleFactory = t, this.componentFactories = n
    }
}, AA = (() => {
    class e {
        compileModuleSync(n) {
            return new Ws(n)
        }

        compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n))
        }

        compileModuleAndAllComponentsSync(n) {
            let r = this.compileModuleSync(n), o = jl(n), i = zd(o.declarations).reduce((s, a) => {
                let u = Ze(a);
                return u && s.push(new $t(u)), s
            }, []);
            return new aa(r, i)
        }

        compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
        }

        clearCache() {
        }

        clearCacheFor(n) {
        }

        getModuleId(n) {
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "root"})
        }
    }

    return e
})();
var Bw = (() => {
    class e {
        constructor() {
            this.zone = M(de), this.changeDetectionScheduler = M(yn), this.applicationRef = M(Ko)
        }

        initialize() {
            this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    this.changeDetectionScheduler.runningTick || this.zone.run(() => {
                        this.applicationRef.tick()
                    })
                }
            }))
        }

        ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe()
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "root"})
        }
    }

    return e
})(), $w = new O("", {factory: () => !1});

function Sp({ngZoneFactory: e, ignoreChangesOutsideZone: t, scheduleInRootZone: n}) {
    return e ??= () => new de(Oe(Ae({}, Tp()), {scheduleInRootZone: n})), [{provide: de, useFactory: e}, {
        provide: no,
        multi: !0,
        useFactory: () => {
            let r = M(Bw, {optional: !0});
            return () => r.initialize()
        }
    }, {
        provide: no, multi: !0, useFactory: () => {
            let r = M(Hw);
            return () => {
                r.initialize()
            }
        }
    }, t === !0 ? {provide: Pf, useValue: !0} : [], {provide: kf, useValue: n ?? Md}]
}

function OA(e) {
    let t = e?.ignoreChangesOutsideZone, n = e?.scheduleInRootZone, r = Sp({
        ngZoneFactory: () => {
            let o = Tp(e);
            return o.scheduleInRootZone = n, o.shouldCoalesceEventChangeDetection && $e("NgZone_CoalesceEvent"), new de(o)
        }, ignoreChangesOutsideZone: t, scheduleInRootZone: n
    });
    return om([{provide: $w, useValue: !0}, {provide: nu, useValue: !1}, r])
}

function Tp(e) {
    return {
        enableLongStackTrace: !1,
        shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
        shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
    }
}

var Hw = (() => {
    class e {
        constructor() {
            this.subscription = new G, this.initialized = !1, this.zone = M(de), this.pendingTasks = M(Jn)
        }

        initialize() {
            if (this.initialized) return;
            this.initialized = !0;
            let n = null;
            !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (n = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
                this.subscription.add(this.zone.onStable.subscribe(() => {
                    de.assertNotInAngularZone(), queueMicrotask(() => {
                        n !== null && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(n), n = null)
                    })
                }))
            }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
                de.assertInAngularZone(), n ??= this.pendingTasks.add()
            }))
        }

        ngOnDestroy() {
            this.subscription.unsubscribe()
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "root"})
        }
    }

    return e
})();
var Uw = (() => {
    class e {
        constructor() {
            this.appRef = M(Ko), this.taskService = M(Jn), this.ngZone = M(de), this.zonelessEnabled = M(nu), this.disableScheduling = M(Pf, {optional: !0}) ?? !1, this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run, this.schedulerTickApplyArgs = [{data: {__scheduler_tick__: !0}}], this.subscriptions = new G, this.angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(po) : null, this.scheduleInRootZone = !this.zonelessEnabled && this.zoneIsDefined && (M(kf, {optional: !0}) ?? !1), this.cancelScheduledCallback = null, this.useMicrotaskScheduler = !1, this.runningTick = !1, this.pendingRenderTaskId = null, this.subscriptions.add(this.appRef.afterTick.subscribe(() => {
                this.runningTick || this.cleanup()
            })), this.subscriptions.add(this.ngZone.onUnstable.subscribe(() => {
                this.runningTick || this.cleanup()
            })), this.disableScheduling ||= !this.zonelessEnabled && (this.ngZone instanceof gs || !this.zoneIsDefined)
        }

        notify(n) {
            if (!this.zonelessEnabled && n === 5) return;
            switch (n) {
                case 0: {
                    this.appRef.dirtyFlags |= 2;
                    break
                }
                case 3:
                case 2:
                case 4:
                case 5:
                case 1: {
                    this.appRef.dirtyFlags |= 4;
                    break
                }
                case 7: {
                    this.appRef.deferredDirtyFlags |= 8;
                    break
                }
                case 9:
                case 8:
                case 6:
                case 10:
                default:
                    this.appRef.dirtyFlags |= 8
            }
            if (!this.shouldScheduleTick()) return;
            let r = this.useMicrotaskScheduler ? zc : xd;
            this.pendingRenderTaskId = this.taskService.add(), this.scheduleInRootZone ? this.cancelScheduledCallback = Zone.root.run(() => r(() => this.tick())) : this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() => r(() => this.tick()))
        }

        shouldScheduleTick() {
            return !(this.disableScheduling || this.pendingRenderTaskId !== null || this.runningTick || this.appRef._runningTick || !this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(po + this.angularZoneId))
        }

        tick() {
            if (this.runningTick || this.appRef.destroyed) return;
            !this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
            let n = this.taskService.add();
            try {
                this.ngZone.run(() => {
                    this.runningTick = !0, this.appRef._tick()
                }, void 0, this.schedulerTickApplyArgs)
            } catch (r) {
                throw this.taskService.remove(n), r
            } finally {
                this.cleanup()
            }
            this.useMicrotaskScheduler = !0, zc(() => {
                this.useMicrotaskScheduler = !1, this.taskService.remove(n)
            })
        }

        ngOnDestroy() {
            this.subscriptions.unsubscribe(), this.cleanup()
        }

        cleanup() {
            if (this.runningTick = !1, this.cancelScheduledCallback?.(), this.cancelScheduledCallback = null, this.pendingRenderTaskId !== null) {
                let n = this.pendingRenderTaskId;
                this.pendingRenderTaskId = null, this.taskService.remove(n)
            }
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "root"})
        }
    }

    return e
})();

function zw() {
    return typeof $localize < "u" && $localize.locale || Mo
}

var or = new O("", {providedIn: "root", factory: () => M(or, N.Optional | N.SkipSelf) || zw()}),
    Np = new O("", {providedIn: "root", factory: () => BI});
var ua = new O("");

function zr(e) {
    return !e.moduleRef
}

function Gw(e) {
    let t = zr(e) ? e.r3Injector : e.moduleRef.injector, n = t.get(de);
    return n.run(() => {
        zr(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
        let r = t.get(Vt, null), o;
        if (n.runOutsideAngular(() => {
            o = n.onError.subscribe({
                next: i => {
                    r.handleError(i)
                }
            })
        }), zr(e)) {
            let i = () => t.destroy(), s = e.platformInjector.get(ua);
            s.add(i), t.onDestroy(() => {
                o.unsubscribe(), s.delete(i)
            })
        } else {
            let i = () => e.moduleRef.destroy(), s = e.platformInjector.get(ua);
            s.add(i), e.moduleRef.onDestroy(() => {
                Kr(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i)
            })
        }
        return jw(r, n, () => {
            let i = t.get(xp);
            return i.runInitializers(), i.donePromise.then(() => {
                let s = t.get(or, Mo);
                if (zI(s || Mo), zr(e)) {
                    let a = t.get(Ko);
                    return e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
                } else return Ww(e.moduleRef, e.allPlatformModules), e.moduleRef
            })
        })
    })
}

function Ww(e, t) {
    let n = e.injector.get(Ko);
    if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(r => n.bootstrap(r)); else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n); else throw new A(-403, !1);
    t.push(e)
}

var Jr = null;

function qw(e = [], t) {
    return Je.create({
        name: t,
        providers: [{provide: zl, useValue: "platform"}, {provide: ua, useValue: new Set([() => Jr = null])}, ...e]
    })
}

function Zw(e = []) {
    if (Jr) return Jr;
    let t = qw(e);
    return Jr = t, Pw(), Yw(t), t
}

function Yw(e) {
    e.get(vy, null)?.forEach(n => n())
}

var lu = (() => {
    class e {
        static {
            this.__NG_ELEMENT_ID__ = Qw
        }
    }

    return e
})();

function Qw(e) {
    return Kw(Z(), D(), (e & 16) === 16)
}

function Kw(e, t, n) {
    if (Ro(e) && !n) {
        let r = Dt(e.index, t);
        return new Bt(r, r)
    } else if (e.type & 175) {
        let r = t[fe];
        return new Bt(r, t)
    }
    return null
}

var ca = class {
    constructor() {
    }

    supports(t) {
        return Kf(t)
    }

    create(t) {
        return new la(t)
    }
}, Jw = (e, t) => t, la = class {
    constructor(t) {
        this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || Jw
    }

    forEachItem(t) {
        let n;
        for (n = this._itHead; n !== null; n = n._next) t(n)
    }

    forEachOperation(t) {
        let n = this._itHead, r = this._removalsHead, o = 0, i = null;
        for (; n || r;) {
            let s = !r || n && n.currentIndex < gl(r, o, i) ? n : r, a = gl(s, o, i), u = s.currentIndex;
            if (s === r) o--, r = r._nextRemoved; else if (n = n._next, s.previousIndex == null) o++; else {
                i || (i = []);
                let c = a - o, l = u - o;
                if (c != l) {
                    for (let p = 0; p < c; p++) {
                        let f = p < i.length ? i[p] : i[p] = 0, h = f + p;
                        l <= h && h < c && (i[p] = f + 1)
                    }
                    let d = s.previousIndex;
                    i[d] = l - c
                }
            }
            a !== u && t(s, a, u)
        }
    }

    forEachPreviousItem(t) {
        let n;
        for (n = this._previousItHead; n !== null; n = n._nextPrevious) t(n)
    }

    forEachAddedItem(t) {
        let n;
        for (n = this._additionsHead; n !== null; n = n._nextAdded) t(n)
    }

    forEachMovedItem(t) {
        let n;
        for (n = this._movesHead; n !== null; n = n._nextMoved) t(n)
    }

    forEachRemovedItem(t) {
        let n;
        for (n = this._removalsHead; n !== null; n = n._nextRemoved) t(n)
    }

    forEachIdentityChange(t) {
        let n;
        for (n = this._identityChangesHead; n !== null; n = n._nextIdentityChange) t(n)
    }

    diff(t) {
        if (t == null && (t = []), !Kf(t)) throw new A(900, !1);
        return this.check(t) ? this : null
    }

    onDestroy() {
    }

    check(t) {
        this._reset();
        let n = this._itHead, r = !1, o, i, s;
        if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++) i = t[a], s = this._trackByFn(a, i), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, i, s, a), r = !0) : (r && (n = this._verifyReinsertion(n, i, s, a)), Object.is(n.item, i) || this._addIdentityChange(n, i)), n = n._next
        } else o = 0, qD(t, a => {
            s = this._trackByFn(o, a), n === null || !Object.is(n.trackById, s) ? (n = this._mismatch(n, a, s, o), r = !0) : (r && (n = this._verifyReinsertion(n, a, s, o)), Object.is(n.item, a) || this._addIdentityChange(n, a)), n = n._next, o++
        }), this.length = o;
        return this._truncate(n), this.collection = t, this.isDirty
    }

    get isDirty() {
        return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null
    }

    _reset() {
        if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; t !== null; t = t._next) t._nextPrevious = t._next;
            for (t = this._additionsHead; t !== null; t = t._nextAdded) t.previousIndex = t.currentIndex;
            for (this._additionsHead = this._additionsTail = null, t = this._movesHead; t !== null; t = t._nextMoved) t.previousIndex = t.currentIndex;
            this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
        }
    }

    _mismatch(t, n, r, o) {
        let i;
        return t === null ? i = this._itTail : (i = t._prev, this._remove(t)), t = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._reinsertAfter(t, i, o)) : (t = this._linkedRecords === null ? null : this._linkedRecords.get(r, o), t !== null ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, i, o)) : t = this._addAfter(new da(n, r), i, o)), t
    }

    _verifyReinsertion(t, n, r, o) {
        let i = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(r, null);
        return i !== null ? t = this._reinsertAfter(i, t._prev, o) : t.currentIndex != o && (t.currentIndex = o, this._addToMoves(t, o)), t
    }

    _truncate(t) {
        for (; t !== null;) {
            let n = t._next;
            this._addToRemovals(this._unlink(t)), t = n
        }
        this._unlinkedRecords !== null && this._unlinkedRecords.clear(), this._additionsTail !== null && (this._additionsTail._nextAdded = null), this._movesTail !== null && (this._movesTail._nextMoved = null), this._itTail !== null && (this._itTail._next = null), this._removalsTail !== null && (this._removalsTail._nextRemoved = null), this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null)
    }

    _reinsertAfter(t, n, r) {
        this._unlinkedRecords !== null && this._unlinkedRecords.remove(t);
        let o = t._prevRemoved, i = t._nextRemoved;
        return o === null ? this._removalsHead = i : o._nextRemoved = i, i === null ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(t, n, r), this._addToMoves(t, r), t
    }

    _moveAfter(t, n, r) {
        return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t
    }

    _addAfter(t, n, r) {
        return this._insertAfter(t, n, r), this._additionsTail === null ? this._additionsTail = this._additionsHead = t : this._additionsTail = this._additionsTail._nextAdded = t, t
    }

    _insertAfter(t, n, r) {
        let o = n === null ? this._itHead : n._next;
        return t._next = o, t._prev = n, o === null ? this._itTail = t : o._prev = t, n === null ? this._itHead = t : n._next = t, this._linkedRecords === null && (this._linkedRecords = new So), this._linkedRecords.put(t), t.currentIndex = r, t
    }

    _remove(t) {
        return this._addToRemovals(this._unlink(t))
    }

    _unlink(t) {
        this._linkedRecords !== null && this._linkedRecords.remove(t);
        let n = t._prev, r = t._next;
        return n === null ? this._itHead = r : n._next = r, r === null ? this._itTail = n : r._prev = n, t
    }

    _addToMoves(t, n) {
        return t.previousIndex === n || (this._movesTail === null ? this._movesTail = this._movesHead = t : this._movesTail = this._movesTail._nextMoved = t), t
    }

    _addToRemovals(t) {
        return this._unlinkedRecords === null && (this._unlinkedRecords = new So), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, this._removalsTail === null ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
    }

    _addIdentityChange(t, n) {
        return t.item = n, this._identityChangesTail === null ? this._identityChangesTail = this._identityChangesHead = t : this._identityChangesTail = this._identityChangesTail._nextIdentityChange = t, t
    }
}, da = class {
    constructor(t, n) {
        this.item = t, this.trackById = n, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
    }
}, fa = class {
    constructor() {
        this._head = null, this._tail = null
    }

    add(t) {
        this._head === null ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
    }

    get(t, n) {
        let r;
        for (r = this._head; r !== null; r = r._nextDup) if ((n === null || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
        return null
    }

    remove(t) {
        let n = t._prevDup, r = t._nextDup;
        return n === null ? this._head = r : n._nextDup = r, r === null ? this._tail = n : r._prevDup = n, this._head === null
    }
}, So = class {
    constructor() {
        this.map = new Map
    }

    put(t) {
        let n = t.trackById, r = this.map.get(n);
        r || (r = new fa, this.map.set(n, r)), r.add(t)
    }

    get(t, n) {
        let r = t, o = this.map.get(r);
        return o ? o.get(t, n) : null
    }

    remove(t) {
        let n = t.trackById;
        return this.map.get(n).remove(t) && this.map.delete(n), t
    }

    get isEmpty() {
        return this.map.size === 0
    }

    clear() {
        this.map.clear()
    }
};

function gl(e, t, n) {
    let r = e.previousIndex;
    if (r === null) return r;
    let o = 0;
    return n && r < n.length && (o = n[r]), r + t + o
}

function ml() {
    return new du([new ca])
}

var du = (() => {
    class e {
        static {
            this.\u0275prov = B({token: e, providedIn: "root", factory: ml})
        }

        constructor(n) {
            this.factories = n
        }

        static create(n, r) {
            if (r != null) {
                let o = r.factories.slice();
                n = n.concat(o)
            }
            return new e(n)
        }

        static extend(n) {
            return {provide: e, useFactory: r => e.create(n, r || ml()), deps: [[e, new Pg, new Rg]]}
        }

        find(n) {
            let r = this.factories.find(o => o.supports(n));
            if (r != null) return r;
            throw new A(901, !1)
        }
    }

    return e
})();

function FA(e) {
    try {
        let {rootComponent: t, appProviders: n, platformProviders: r} = e, o = Zw(r),
            i = [Sp({}), {provide: yn, useExisting: Uw}, ...n || []],
            s = new wo({providers: i, parent: o, debugName: "", runEnvironmentInitializers: !1});
        return Gw({r3Injector: s.injector, platformInjector: o, rootComponent: t})
    } catch (t) {
        return Promise.reject(t)
    }
}

function Xw(e) {
    return typeof e == "boolean" ? e : e != null && e !== "false"
}

function eE(e, t = NaN) {
    return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t
}

function RA(e, t) {
    $e("NgSignals");
    let n = pi(e);
    return t?.equal && (n[ve].equal = t.equal), n
}

function tE(e) {
    let t = T(null);
    try {
        return e()
    } finally {
        T(t)
    }
}

var nE = new O("", {providedIn: "root", factory: () => M(rE)}), rE = (() => {
    class e {
        static {
            this.\u0275prov = B({token: e, providedIn: "root", factory: () => new pa})
        }
    }

    return e
})(), pa = class {
    constructor() {
        this.queuedEffectCount = 0, this.queues = new Map, this.pendingTasks = M(Jn), this.taskId = null
    }

    scheduleEffect(t) {
        if (this.enqueue(t), this.taskId === null) {
            let n = this.taskId = this.pendingTasks.add();
            queueMicrotask(() => {
                this.flush(), this.pendingTasks.remove(n), this.taskId = null
            })
        }
    }

    enqueue(t) {
        let n = t.creationZone;
        this.queues.has(n) || this.queues.set(n, new Set);
        let r = this.queues.get(n);
        r.has(t) || (this.queuedEffectCount++, r.add(t))
    }

    flush() {
        for (; this.queuedEffectCount > 0;) for (let [t, n] of this.queues) t === null ? this.flushQueue(n) : t.run(() => this.flushQueue(n))
    }

    flushQueue(t) {
        for (let n of t) t.delete(n), this.queuedEffectCount--, n.run()
    }
}, ha = class {
    constructor(t, n, r, o, i, s) {
        this.scheduler = t, this.effectFn = n, this.creationZone = r, this.injector = i, this.watcher = Wu(a => this.runEffect(a), () => this.schedule(), s), this.unregisterOnDestroy = o?.onDestroy(() => this.destroy())
    }

    runEffect(t) {
        try {
            this.effectFn(t)
        } catch (n) {
            this.injector.get(Vt, null, {optional: !0})?.handleError(n)
        }
    }

    run() {
        this.watcher.run()
    }

    schedule() {
        this.scheduler.scheduleEffect(this)
    }

    destroy() {
        this.watcher.destroy(), this.unregisterOnDestroy?.()
    }
};

function oE(e, t) {
    $e("NgSignals"), !t?.injector && wa(oE);
    let n = t?.injector ?? M(Je), r = t?.manualCleanup !== !0 ? n.get($o) : null,
        o = new ha(n.get(nE), e, typeof Zone > "u" ? null : Zone.current, r, n, t?.allowSignalWrites ?? !1),
        i = n.get(lu, null, {optional: !0});
    return !i || !(i._lView[I] & 8) ? o.watcher.notify() : (i._lView[Wr] ??= []).push(o.watcher.notify), o
}

function PA(e, t) {
    let n = Ze(e), r = t.elementInjector || Oo();
    return new $t(n).create(r, t.projectableNodes, t.hostElement, t.environmentInjector)
}

function kA(e) {
    let t = Ze(e);
    if (!t) return null;
    let n = new $t(t);
    return {
        get selector() {
            return n.selector
        }, get type() {
            return n.componentType
        }, get inputs() {
            return n.inputs
        }, get outputs() {
            return n.outputs
        }, get ngContentSelectors() {
            return n.ngContentSelectors
        }, get isStandalone() {
            return t.standalone
        }, get isSignal() {
            return t.signals
        }
    }
}

var $p = null;

function fu() {
    return $p
}

function oO(e) {
    $p ??= e
}

var Ap = class {
};
var bu = new O(""), _u = (() => {
    class e {
        historyGo(n) {
            throw new Error("")
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: () => M(sE), providedIn: "platform"})
        }
    }

    return e
})(), iO = new O(""), sE = (() => {
    class e extends _u {
        constructor() {
            super(), this._doc = M(bu), this._location = window.location, this._history = window.history
        }

        getBaseHrefFromDOM() {
            return fu().getBaseHref(this._doc)
        }

        onPopState(n) {
            let r = fu().getGlobalEventTarget(this._doc, "window");
            return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n)
        }

        onHashChange(n) {
            let r = fu().getGlobalEventTarget(this._doc, "window");
            return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n)
        }

        get href() {
            return this._location.href
        }

        get protocol() {
            return this._location.protocol
        }

        get hostname() {
            return this._location.hostname
        }

        get port() {
            return this._location.port
        }

        get pathname() {
            return this._location.pathname
        }

        get search() {
            return this._location.search
        }

        get hash() {
            return this._location.hash
        }

        set pathname(n) {
            this._location.pathname = n
        }

        pushState(n, r, o) {
            this._history.pushState(n, r, o)
        }

        replaceState(n, r, o) {
            this._history.replaceState(n, r, o)
        }

        forward() {
            this._history.forward()
        }

        back() {
            this._history.back()
        }

        historyGo(n = 0) {
            this._history.go(n)
        }

        getState() {
            return this._history.state
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: () => new e, providedIn: "platform"})
        }
    }

    return e
})();

function Mu(e, t) {
    if (e.length == 0) return t;
    if (t.length == 0) return e;
    let n = 0;
    return e.endsWith("/") && n++, t.startsWith("/") && n++, n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t
}

function Op(e) {
    let t = e.match(/#|\?|$/), n = t && t.index || e.length, r = n - (e[n - 1] === "/" ? 1 : 0);
    return e.slice(0, r) + e.slice(n)
}

function ot(e) {
    return e && e[0] !== "?" ? "?" + e : e
}

var ui = (() => {
    class e {
        historyGo(n) {
            throw new Error("")
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: () => M(aE), providedIn: "root"})
        }
    }

    return e
})(), Hp = new O(""), aE = (() => {
    class e extends ui {
        constructor(n, r) {
            super(), this._platformLocation = n, this._removeListenerFns = [], this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? M(bu).location?.origin ?? ""
        }

        ngOnDestroy() {
            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
        }

        onPopState(n) {
            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
        }

        getBaseHref() {
            return this._baseHref
        }

        prepareExternalUrl(n) {
            return Mu(this._baseHref, n)
        }

        path(n = !1) {
            let r = this._platformLocation.pathname + ot(this._platformLocation.search),
                o = this._platformLocation.hash;
            return o && n ? `${r}${o}` : r
        }

        pushState(n, r, o, i) {
            let s = this.prepareExternalUrl(o + ot(i));
            this._platformLocation.pushState(n, r, s)
        }

        replaceState(n, r, o, i) {
            let s = this.prepareExternalUrl(o + ot(i));
            this._platformLocation.replaceState(n, r, s)
        }

        forward() {
            this._platformLocation.forward()
        }

        back() {
            this._platformLocation.back()
        }

        getState() {
            return this._platformLocation.getState()
        }

        historyGo(n = 0) {
            this._platformLocation.historyGo?.(n)
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(ne(_u), ne(Hp, 8))
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac, providedIn: "root"})
        }
    }

    return e
})(), sO = (() => {
    class e extends ui {
        constructor(n, r) {
            super(), this._platformLocation = n, this._baseHref = "", this._removeListenerFns = [], r != null && (this._baseHref = r)
        }

        ngOnDestroy() {
            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
        }

        onPopState(n) {
            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
        }

        getBaseHref() {
            return this._baseHref
        }

        path(n = !1) {
            let r = this._platformLocation.hash ?? "#";
            return r.length > 0 ? r.substring(1) : r
        }

        prepareExternalUrl(n) {
            let r = Mu(this._baseHref, n);
            return r.length > 0 ? "#" + r : r
        }

        pushState(n, r, o, i) {
            let s = this.prepareExternalUrl(o + ot(i));
            s.length == 0 && (s = this._platformLocation.pathname), this._platformLocation.pushState(n, r, s)
        }

        replaceState(n, r, o, i) {
            let s = this.prepareExternalUrl(o + ot(i));
            s.length == 0 && (s = this._platformLocation.pathname), this._platformLocation.replaceState(n, r, s)
        }

        forward() {
            this._platformLocation.forward()
        }

        back() {
            this._platformLocation.back()
        }

        getState() {
            return this._platformLocation.getState()
        }

        historyGo(n = 0) {
            this._platformLocation.historyGo?.(n)
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(ne(_u), ne(Hp, 8))
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: e.\u0275fac})
        }
    }

    return e
})(), uE = (() => {
    class e {
        constructor(n) {
            this._subject = new xe, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = n;
            let r = this._locationStrategy.getBaseHref();
            this._basePath = dE(Op(Fp(r))), this._locationStrategy.onPopState(o => {
                this._subject.emit({url: this.path(!0), pop: !0, state: o.state, type: o.type})
            })
        }

        ngOnDestroy() {
            this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []
        }

        path(n = !1) {
            return this.normalize(this._locationStrategy.path(n))
        }

        getState() {
            return this._locationStrategy.getState()
        }

        isCurrentPathEqualTo(n, r = "") {
            return this.path() == this.normalize(n + ot(r))
        }

        normalize(n) {
            return e.stripTrailingSlash(lE(this._basePath, Fp(n)))
        }

        prepareExternalUrl(n) {
            return n && n[0] !== "/" && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n)
        }

        go(n, r = "", o = null) {
            this._locationStrategy.pushState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + ot(r)), o)
        }

        replaceState(n, r = "", o = null) {
            this._locationStrategy.replaceState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + ot(r)), o)
        }

        forward() {
            this._locationStrategy.forward()
        }

        back() {
            this._locationStrategy.back()
        }

        historyGo(n = 0) {
            this._locationStrategy.historyGo?.(n)
        }

        onUrlChange(n) {
            return this._urlChangeListeners.push(n), this._urlChangeSubscription ??= this.subscribe(r => {
                this._notifyUrlChangeListeners(r.url, r.state)
            }), () => {
                let r = this._urlChangeListeners.indexOf(n);
                this._urlChangeListeners.splice(r, 1), this._urlChangeListeners.length === 0 && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null)
            }
        }

        _notifyUrlChangeListeners(n = "", r) {
            this._urlChangeListeners.forEach(o => o(n, r))
        }

        subscribe(n, r, o) {
            return this._subject.subscribe({next: n, error: r, complete: o})
        }

        static {
            this.normalizeQueryParams = ot
        }
        static {
            this.joinWithSlash = Mu
        }
        static {
            this.stripTrailingSlash = Op
        }
        static {
            this.\u0275fac = function (r) {
                return new (r || e)(ne(ui))
            }
        }
        static {
            this.\u0275prov = B({token: e, factory: () => cE(), providedIn: "root"})
        }
    }

    return e
})();

function cE() {
    return new uE(ne(ui))
}

function lE(e, t) {
    if (!e || !t.startsWith(e)) return t;
    let n = t.substring(e.length);
    return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t
}

function Fp(e) {
    return e.replace(/\/index.html$/, "")
}

function dE(e) {
    if (new RegExp("^(https?:)?//").test(e)) {
        let [, n] = e.split(/\/\/[^\/]+/);
        return n
    }
    return e
}

var Up = {
    ADP: [void 0, void 0, 0],
    AFN: [void 0, "\u060B", 0],
    ALL: [void 0, void 0, 0],
    AMD: [void 0, "\u058F", 2],
    AOA: [void 0, "Kz"],
    ARS: [void 0, "$"],
    AUD: ["A$", "$"],
    AZN: [void 0, "\u20BC"],
    BAM: [void 0, "KM"],
    BBD: [void 0, "$"],
    BDT: [void 0, "\u09F3"],
    BHD: [void 0, void 0, 3],
    BIF: [void 0, void 0, 0],
    BMD: [void 0, "$"],
    BND: [void 0, "$"],
    BOB: [void 0, "Bs"],
    BRL: ["R$"],
    BSD: [void 0, "$"],
    BWP: [void 0, "P"],
    BYN: [void 0, void 0, 2],
    BYR: [void 0, void 0, 0],
    BZD: [void 0, "$"],
    CAD: ["CA$", "$", 2],
    CHF: [void 0, void 0, 2],
    CLF: [void 0, void 0, 4],
    CLP: [void 0, "$", 0],
    CNY: ["CN\xA5", "\xA5"],
    COP: [void 0, "$", 2],
    CRC: [void 0, "\u20A1", 2],
    CUC: [void 0, "$"],
    CUP: [void 0, "$"],
    CZK: [void 0, "K\u010D", 2],
    DJF: [void 0, void 0, 0],
    DKK: [void 0, "kr", 2],
    DOP: [void 0, "$"],
    EGP: [void 0, "E\xA3"],
    ESP: [void 0, "\u20A7", 0],
    EUR: ["\u20AC"],
    FJD: [void 0, "$"],
    FKP: [void 0, "\xA3"],
    GBP: ["\xA3"],
    GEL: [void 0, "\u20BE"],
    GHS: [void 0, "GH\u20B5"],
    GIP: [void 0, "\xA3"],
    GNF: [void 0, "FG", 0],
    GTQ: [void 0, "Q"],
    GYD: [void 0, "$", 2],
    HKD: ["HK$", "$"],
    HNL: [void 0, "L"],
    HRK: [void 0, "kn"],
    HUF: [void 0, "Ft", 2],
    IDR: [void 0, "Rp", 2],
    ILS: ["\u20AA"],
    INR: ["\u20B9"],
    IQD: [void 0, void 0, 0],
    IRR: [void 0, void 0, 0],
    ISK: [void 0, "kr", 0],
    ITL: [void 0, void 0, 0],
    JMD: [void 0, "$"],
    JOD: [void 0, void 0, 3],
    JPY: ["\xA5", void 0, 0],
    KHR: [void 0, "\u17DB"],
    KMF: [void 0, "CF", 0],
    KPW: [void 0, "\u20A9", 0],
    KRW: ["\u20A9", void 0, 0],
    KWD: [void 0, void 0, 3],
    KYD: [void 0, "$"],
    KZT: [void 0, "\u20B8"],
    LAK: [void 0, "\u20AD", 0],
    LBP: [void 0, "L\xA3", 0],
    LKR: [void 0, "Rs"],
    LRD: [void 0, "$"],
    LTL: [void 0, "Lt"],
    LUF: [void 0, void 0, 0],
    LVL: [void 0, "Ls"],
    LYD: [void 0, void 0, 3],
    MGA: [void 0, "Ar", 0],
    MGF: [void 0, void 0, 0],
    MMK: [void 0, "K", 0],
    MNT: [void 0, "\u20AE", 2],
    MRO: [void 0, void 0, 0],
    MUR: [void 0, "Rs", 2],
    MXN: ["MX$", "$"],
    MYR: [void 0, "RM"],
    NAD: [void 0, "$"],
    NGN: [void 0, "\u20A6"],
    NIO: [void 0, "C$"],
    NOK: [void 0, "kr", 2],
    NPR: [void 0, "Rs"],
    NZD: ["NZ$", "$"],
    OMR: [void 0, void 0, 3],
    PHP: ["\u20B1"],
    PKR: [void 0, "Rs", 2],
    PLN: [void 0, "z\u0142"],
    PYG: [void 0, "\u20B2", 0],
    RON: [void 0, "lei"],
    RSD: [void 0, void 0, 0],
    RUB: [void 0, "\u20BD"],
    RWF: [void 0, "RF", 0],
    SBD: [void 0, "$"],
    SEK: [void 0, "kr", 2],
    SGD: [void 0, "$"],
    SHP: [void 0, "\xA3"],
    SLE: [void 0, void 0, 2],
    SLL: [void 0, void 0, 0],
    SOS: [void 0, void 0, 0],
    SRD: [void 0, "$"],
    SSP: [void 0, "\xA3"],
    STD: [void 0, void 0, 0],
    STN: [void 0, "Db"],
    SYP: [void 0, "\xA3", 0],
    THB: [void 0, "\u0E3F"],
    TMM: [void 0, void 0, 0],
    TND: [void 0, void 0, 3],
    TOP: [void 0, "T$"],
    TRL: [void 0, void 0, 0],
    TRY: [void 0, "\u20BA"],
    TTD: [void 0, "$"],
    TWD: ["NT$", "$", 2],
    TZS: [void 0, void 0, 2],
    UAH: [void 0, "\u20B4"],
    UGX: [void 0, void 0, 0],
    USD: ["$"],
    UYI: [void 0, void 0, 0],
    UYU: [void 0, "$"],
    UYW: [void 0, void 0, 4],
    UZS: [void 0, void 0, 2],
    VEF: [void 0, "Bs", 2],
    VND: ["\u20AB", void 0, 0],
    VUV: [void 0, void 0, 0],
    XAF: ["FCFA", void 0, 0],
    XCD: ["EC$", "$"],
    XOF: ["F\u202FCFA", void 0, 0],
    XPF: ["CFPF", void 0, 0],
    XXX: ["\xA4"],
    YER: [void 0, void 0, 0],
    ZAR: [void 0, "R"],
    ZMK: [void 0, void 0, 0],
    ZMW: [void 0, "ZK"],
    ZWD: [void 0, void 0, 0]
}, zp = function (e) {
    return e[e.Decimal = 0] = "Decimal", e[e.Percent = 1] = "Percent", e[e.Currency = 2] = "Currency", e[e.Scientific = 3] = "Scientific", e
}(zp || {});
var se = function (e) {
    return e[e.Format = 0] = "Format", e[e.Standalone = 1] = "Standalone", e
}(se || {}), j = function (e) {
    return e[e.Narrow = 0] = "Narrow", e[e.Abbreviated = 1] = "Abbreviated", e[e.Wide = 2] = "Wide", e[e.Short = 3] = "Short", e
}(j || {}), me = function (e) {
    return e[e.Short = 0] = "Short", e[e.Medium = 1] = "Medium", e[e.Long = 2] = "Long", e[e.Full = 3] = "Full", e
}(me || {}), ye = {
    Decimal: 0,
    Group: 1,
    List: 2,
    PercentSign: 3,
    PlusSign: 4,
    MinusSign: 5,
    Exponential: 6,
    SuperscriptingExponent: 7,
    PerMille: 8,
    Infinity: 9,
    NaN: 10,
    TimeSeparator: 11,
    CurrencyDecimal: 12,
    CurrencyGroup: 13
};

function fE(e) {
    return ge(e)[$.LocaleId]
}

function pE(e, t, n) {
    let r = ge(e), o = [r[$.DayPeriodsFormat], r[$.DayPeriodsStandalone]], i = Ee(o, t);
    return Ee(i, n)
}

function hE(e, t, n) {
    let r = ge(e), o = [r[$.DaysFormat], r[$.DaysStandalone]], i = Ee(o, t);
    return Ee(i, n)
}

function gE(e, t, n) {
    let r = ge(e), o = [r[$.MonthsFormat], r[$.MonthsStandalone]], i = Ee(o, t);
    return Ee(i, n)
}

function mE(e, t) {
    let r = ge(e)[$.Eras];
    return Ee(r, t)
}

function Jo(e, t) {
    let n = ge(e);
    return Ee(n[$.DateFormat], t)
}

function Xo(e, t) {
    let n = ge(e);
    return Ee(n[$.TimeFormat], t)
}

function ei(e, t) {
    let r = ge(e)[$.DateTimeFormat];
    return Ee(r, t)
}

function it(e, t) {
    let n = ge(e), r = n[$.NumberSymbols][t];
    if (typeof r > "u") {
        if (t === ye.CurrencyDecimal) return n[$.NumberSymbols][ye.Decimal];
        if (t === ye.CurrencyGroup) return n[$.NumberSymbols][ye.Group]
    }
    return r
}

function yE(e, t) {
    return ge(e)[$.NumberFormats][t]
}

function vE(e) {
    return ge(e)[$.Currencies]
}

function Gp(e) {
    if (!e[$.ExtraData]) throw new Error(`Missing extra locale data for the locale "${e[$.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)
}

function DE(e) {
    let t = ge(e);
    return Gp(t), (t[$.ExtraData][2] || []).map(r => typeof r == "string" ? pu(r) : [pu(r[0]), pu(r[1])])
}

function IE(e, t, n) {
    let r = ge(e);
    Gp(r);
    let o = [r[$.ExtraData][0], r[$.ExtraData][1]], i = Ee(o, t) || [];
    return Ee(i, n) || []
}

function Ee(e, t) {
    for (let n = t; n > -1; n--) if (typeof e[n] < "u") return e[n];
    throw new Error("Locale data API: locale data undefined")
}

function pu(e) {
    let [t, n] = e.split(":");
    return {hours: +t, minutes: +n}
}

function wE(e, t, n = "en") {
    let r = vE(n)[e] || Up[e] || [], o = r[1];
    return t === "narrow" && typeof o == "string" ? o : r[0] || e
}

var EE = 2;

function CE(e) {
    let t, n = Up[e];
    return n && (t = n[2]), typeof t == "number" ? t : EE
}

var bE = /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
    ti = {},
    _E = /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
    st = function (e) {
        return e[e.Short = 0] = "Short", e[e.ShortGMT = 1] = "ShortGMT", e[e.Long = 2] = "Long", e[e.Extended = 3] = "Extended", e
    }(st || {}), R = function (e) {
        return e[e.FullYear = 0] = "FullYear", e[e.Month = 1] = "Month", e[e.Date = 2] = "Date", e[e.Hours = 3] = "Hours", e[e.Minutes = 4] = "Minutes", e[e.Seconds = 5] = "Seconds", e[e.FractionalSeconds = 6] = "FractionalSeconds", e[e.Day = 7] = "Day", e
    }(R || {}), F = function (e) {
        return e[e.DayPeriods = 0] = "DayPeriods", e[e.Days = 1] = "Days", e[e.Months = 2] = "Months", e[e.Eras = 3] = "Eras", e
    }(F || {});

function ME(e, t, n, r) {
    let o = PE(e);
    t = rt(n, t) || t;
    let s = [], a;
    for (; t;) if (a = _E.exec(t), a) {
        s = s.concat(a.slice(1));
        let l = s.pop();
        if (!l) break;
        t = l
    } else {
        s.push(t);
        break
    }
    let u = o.getTimezoneOffset();
    r && (u = qp(r, u), o = RE(o, r, !0));
    let c = "";
    return s.forEach(l => {
        let d = OE(l);
        c += d ? d(o, n, u) : l === "''" ? "'" : l.replace(/(^'|'$)/g, "").replace(/''/g, "'")
    }), c
}

function si(e, t, n) {
    let r = new Date(0);
    return r.setFullYear(e, t, n), r.setHours(0, 0, 0), r
}

function rt(e, t) {
    let n = fE(e);
    if (ti[n] ??= {}, ti[n][t]) return ti[n][t];
    let r = "";
    switch (t) {
        case"shortDate":
            r = Jo(e, me.Short);
            break;
        case"mediumDate":
            r = Jo(e, me.Medium);
            break;
        case"longDate":
            r = Jo(e, me.Long);
            break;
        case"fullDate":
            r = Jo(e, me.Full);
            break;
        case"shortTime":
            r = Xo(e, me.Short);
            break;
        case"mediumTime":
            r = Xo(e, me.Medium);
            break;
        case"longTime":
            r = Xo(e, me.Long);
            break;
        case"fullTime":
            r = Xo(e, me.Full);
            break;
        case"short":
            let o = rt(e, "shortTime"), i = rt(e, "shortDate");
            r = ni(ei(e, me.Short), [o, i]);
            break;
        case"medium":
            let s = rt(e, "mediumTime"), a = rt(e, "mediumDate");
            r = ni(ei(e, me.Medium), [s, a]);
            break;
        case"long":
            let u = rt(e, "longTime"), c = rt(e, "longDate");
            r = ni(ei(e, me.Long), [u, c]);
            break;
        case"full":
            let l = rt(e, "fullTime"), d = rt(e, "fullDate");
            r = ni(ei(e, me.Full), [l, d]);
            break
    }
    return r && (ti[n][t] = r), r
}

function ni(e, t) {
    return t && (e = e.replace(/\{([^}]+)}/g, function (n, r) {
        return t != null && r in t ? t[r] : n
    })), e
}

function Ne(e, t, n = "-", r, o) {
    let i = "";
    (e < 0 || o && e <= 0) && (o ? e = -e + 1 : (e = -e, i = n));
    let s = String(e);
    for (; s.length < t;) s = "0" + s;
    return r && (s = s.slice(s.length - t)), i + s
}

function xE(e, t) {
    return Ne(e, 3).substring(0, t)
}

function W(e, t, n = 0, r = !1, o = !1) {
    return function (i, s) {
        let a = SE(e, i);
        if ((n > 0 || a > -n) && (a += n), e === R.Hours) a === 0 && n === -12 && (a = 12); else if (e === R.FractionalSeconds) return xE(a, t);
        let u = it(s, ye.MinusSign);
        return Ne(a, t, u, r, o)
    }
}

function SE(e, t) {
    switch (e) {
        case R.FullYear:
            return t.getFullYear();
        case R.Month:
            return t.getMonth();
        case R.Date:
            return t.getDate();
        case R.Hours:
            return t.getHours();
        case R.Minutes:
            return t.getMinutes();
        case R.Seconds:
            return t.getSeconds();
        case R.FractionalSeconds:
            return t.getMilliseconds();
        case R.Day:
            return t.getDay();
        default:
            throw new Error(`Unknown DateType value "${e}".`)
    }
}

function V(e, t, n = se.Format, r = !1) {
    return function (o, i) {
        return TE(o, i, e, t, n, r)
    }
}

function TE(e, t, n, r, o, i) {
    switch (n) {
        case F.Months:
            return gE(t, o, r)[e.getMonth()];
        case F.Days:
            return hE(t, o, r)[e.getDay()];
        case F.DayPeriods:
            let s = e.getHours(), a = e.getMinutes();
            if (i) {
                let c = DE(t), l = IE(t, o, r), d = c.findIndex(p => {
                    if (Array.isArray(p)) {
                        let [f, h] = p, g = s >= f.hours && a >= f.minutes,
                            E = s < h.hours || s === h.hours && a < h.minutes;
                        if (f.hours < h.hours) {
                            if (g && E) return !0
                        } else if (g || E) return !0
                    } else if (p.hours === s && p.minutes === a) return !0;
                    return !1
                });
                if (d !== -1) return l[d]
            }
            return pE(t, o, r)[s < 12 ? 0 : 1];
        case F.Eras:
            return mE(t, r)[e.getFullYear() <= 0 ? 0 : 1];
        default:
            let u = n;
            throw new Error(`unexpected translation type ${u}`)
    }
}

function ri(e) {
    return function (t, n, r) {
        let o = -1 * r, i = it(n, ye.MinusSign), s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
        switch (e) {
            case st.Short:
                return (o >= 0 ? "+" : "") + Ne(s, 2, i) + Ne(Math.abs(o % 60), 2, i);
            case st.ShortGMT:
                return "GMT" + (o >= 0 ? "+" : "") + Ne(s, 1, i);
            case st.Long:
                return "GMT" + (o >= 0 ? "+" : "") + Ne(s, 2, i) + ":" + Ne(Math.abs(o % 60), 2, i);
            case st.Extended:
                return r === 0 ? "Z" : (o >= 0 ? "+" : "") + Ne(s, 2, i) + ":" + Ne(Math.abs(o % 60), 2, i);
            default:
                throw new Error(`Unknown zone width "${e}"`)
        }
    }
}

var NE = 0, ii = 4;

function AE(e) {
    let t = si(e, NE, 1).getDay();
    return si(e, 0, 1 + (t <= ii ? ii : ii + 7) - t)
}

function Wp(e) {
    let t = e.getDay(), n = t === 0 ? -3 : ii - t;
    return si(e.getFullYear(), e.getMonth(), e.getDate() + n)
}

function hu(e, t = !1) {
    return function (n, r) {
        let o;
        if (t) {
            let i = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1, s = n.getDate();
            o = 1 + Math.floor((s + i) / 7)
        } else {
            let i = Wp(n), s = AE(i.getFullYear()), a = i.getTime() - s.getTime();
            o = 1 + Math.round(a / 6048e5)
        }
        return Ne(o, e, it(r, ye.MinusSign))
    }
}

function oi(e, t = !1) {
    return function (n, r) {
        let i = Wp(n).getFullYear();
        return Ne(i, e, it(r, ye.MinusSign), t)
    }
}

var gu = {};

function OE(e) {
    if (gu[e]) return gu[e];
    let t;
    switch (e) {
        case"G":
        case"GG":
        case"GGG":
            t = V(F.Eras, j.Abbreviated);
            break;
        case"GGGG":
            t = V(F.Eras, j.Wide);
            break;
        case"GGGGG":
            t = V(F.Eras, j.Narrow);
            break;
        case"y":
            t = W(R.FullYear, 1, 0, !1, !0);
            break;
        case"yy":
            t = W(R.FullYear, 2, 0, !0, !0);
            break;
        case"yyy":
            t = W(R.FullYear, 3, 0, !1, !0);
            break;
        case"yyyy":
            t = W(R.FullYear, 4, 0, !1, !0);
            break;
        case"Y":
            t = oi(1);
            break;
        case"YY":
            t = oi(2, !0);
            break;
        case"YYY":
            t = oi(3);
            break;
        case"YYYY":
            t = oi(4);
            break;
        case"M":
        case"L":
            t = W(R.Month, 1, 1);
            break;
        case"MM":
        case"LL":
            t = W(R.Month, 2, 1);
            break;
        case"MMM":
            t = V(F.Months, j.Abbreviated);
            break;
        case"MMMM":
            t = V(F.Months, j.Wide);
            break;
        case"MMMMM":
            t = V(F.Months, j.Narrow);
            break;
        case"LLL":
            t = V(F.Months, j.Abbreviated, se.Standalone);
            break;
        case"LLLL":
            t = V(F.Months, j.Wide, se.Standalone);
            break;
        case"LLLLL":
            t = V(F.Months, j.Narrow, se.Standalone);
            break;
        case"w":
            t = hu(1);
            break;
        case"ww":
            t = hu(2);
            break;
        case"W":
            t = hu(1, !0);
            break;
        case"d":
            t = W(R.Date, 1);
            break;
        case"dd":
            t = W(R.Date, 2);
            break;
        case"c":
        case"cc":
            t = W(R.Day, 1);
            break;
        case"ccc":
            t = V(F.Days, j.Abbreviated, se.Standalone);
            break;
        case"cccc":
            t = V(F.Days, j.Wide, se.Standalone);
            break;
        case"ccccc":
            t = V(F.Days, j.Narrow, se.Standalone);
            break;
        case"cccccc":
            t = V(F.Days, j.Short, se.Standalone);
            break;
        case"E":
        case"EE":
        case"EEE":
            t = V(F.Days, j.Abbreviated);
            break;
        case"EEEE":
            t = V(F.Days, j.Wide);
            break;
        case"EEEEE":
            t = V(F.Days, j.Narrow);
            break;
        case"EEEEEE":
            t = V(F.Days, j.Short);
            break;
        case"a":
        case"aa":
        case"aaa":
            t = V(F.DayPeriods, j.Abbreviated);
            break;
        case"aaaa":
            t = V(F.DayPeriods, j.Wide);
            break;
        case"aaaaa":
            t = V(F.DayPeriods, j.Narrow);
            break;
        case"b":
        case"bb":
        case"bbb":
            t = V(F.DayPeriods, j.Abbreviated, se.Standalone, !0);
            break;
        case"bbbb":
            t = V(F.DayPeriods, j.Wide, se.Standalone, !0);
            break;
        case"bbbbb":
            t = V(F.DayPeriods, j.Narrow, se.Standalone, !0);
            break;
        case"B":
        case"BB":
        case"BBB":
            t = V(F.DayPeriods, j.Abbreviated, se.Format, !0);
            break;
        case"BBBB":
            t = V(F.DayPeriods, j.Wide, se.Format, !0);
            break;
        case"BBBBB":
            t = V(F.DayPeriods, j.Narrow, se.Format, !0);
            break;
        case"h":
            t = W(R.Hours, 1, -12);
            break;
        case"hh":
            t = W(R.Hours, 2, -12);
            break;
        case"H":
            t = W(R.Hours, 1);
            break;
        case"HH":
            t = W(R.Hours, 2);
            break;
        case"m":
            t = W(R.Minutes, 1);
            break;
        case"mm":
            t = W(R.Minutes, 2);
            break;
        case"s":
            t = W(R.Seconds, 1);
            break;
        case"ss":
            t = W(R.Seconds, 2);
            break;
        case"S":
            t = W(R.FractionalSeconds, 1);
            break;
        case"SS":
            t = W(R.FractionalSeconds, 2);
            break;
        case"SSS":
            t = W(R.FractionalSeconds, 3);
            break;
        case"Z":
        case"ZZ":
        case"ZZZ":
            t = ri(st.Short);
            break;
        case"ZZZZZ":
            t = ri(st.Extended);
            break;
        case"O":
        case"OO":
        case"OOO":
        case"z":
        case"zz":
        case"zzz":
            t = ri(st.ShortGMT);
            break;
        case"OOOO":
        case"ZZZZ":
        case"zzzz":
            t = ri(st.Long);
            break;
        default:
            return null
    }
    return gu[e] = t, t
}

function qp(e, t) {
    e = e.replace(/:/g, "");
    let n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
    return isNaN(n) ? t : n
}

function FE(e, t) {
    return e = new Date(e.getTime()), e.setMinutes(e.getMinutes() + t), e
}

function RE(e, t, n) {
    let r = n ? -1 : 1, o = e.getTimezoneOffset(), i = qp(t, o);
    return FE(e, r * (i - o))
}

function PE(e) {
    if (Rp(e)) return e;
    if (typeof e == "number" && !isNaN(e)) return new Date(e);
    if (typeof e == "string") {
        if (e = e.trim(), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)) {
            let [o, i = 1, s = 1] = e.split("-").map(a => +a);
            return si(o, i - 1, s)
        }
        let n = parseFloat(e);
        if (!isNaN(e - n)) return new Date(n);
        let r;
        if (r = e.match(bE)) return kE(r)
    }
    let t = new Date(e);
    if (!Rp(t)) throw new Error(`Unable to convert "${e}" into a date`);
    return t
}

function kE(e) {
    let t = new Date(0), n = 0, r = 0, o = e[8] ? t.setUTCFullYear : t.setFullYear,
        i = e[8] ? t.setUTCHours : t.setHours;
    e[9] && (n = Number(e[9] + e[10]), r = Number(e[9] + e[11])), o.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
    let s = Number(e[4] || 0) - n, a = Number(e[5] || 0) - r, u = Number(e[6] || 0),
        c = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
    return i.call(t, s, a, u, c), t
}

function Rp(e) {
    return e instanceof Date && !isNaN(e.valueOf())
}

var LE = /^(\d+)?\.((\d+)(-(\d+))?)?$/, Pp = 22, ai = ".", ir = "0", jE = ";", VE = ",", mu = "#", kp = "\xA4";

function BE(e, t, n, r, o, i, s = !1) {
    let a = "", u = !1;
    if (!isFinite(e)) a = it(n, ye.Infinity); else {
        let c = zE(e);
        s && (c = UE(c));
        let l = t.minInt, d = t.minFrac, p = t.maxFrac;
        if (i) {
            let S = i.match(LE);
            if (S === null) throw new Error(`${i} is not a valid digit info`);
            let Y = S[1], z = S[3], ae = S[5];
            Y != null && (l = yu(Y)), z != null && (d = yu(z)), ae != null ? p = yu(ae) : z != null && d > p && (p = d)
        }
        GE(c, d, p);
        let f = c.digits, h = c.integerLen, g = c.exponent, E = [];
        for (u = f.every(S => !S); h < l; h++) f.unshift(0);
        for (; h < 0; h++) f.unshift(0);
        h > 0 ? E = f.splice(h, f.length) : (E = f, f = [0]);
        let m = [];
        for (f.length >= t.lgSize && m.unshift(f.splice(-t.lgSize, f.length).join("")); f.length > t.gSize;) m.unshift(f.splice(-t.gSize, f.length).join(""));
        f.length && m.unshift(f.join("")), a = m.join(it(n, r)), E.length && (a += it(n, o) + E.join("")), g && (a += it(n, ye.Exponential) + "+" + g)
    }
    return e < 0 && !u ? a = t.negPre + a + t.negSuf : a = t.posPre + a + t.posSuf, a
}

function $E(e, t, n, r, o) {
    let i = yE(t, zp.Currency), s = HE(i, it(t, ye.MinusSign));
    return s.minFrac = CE(r), s.maxFrac = s.minFrac, BE(e, s, t, ye.CurrencyGroup, ye.CurrencyDecimal, o).replace(kp, n).replace(kp, "").trim()
}

function HE(e, t = "-") {
    let n = {minInt: 1, minFrac: 0, maxFrac: 0, posPre: "", posSuf: "", negPre: "", negSuf: "", gSize: 0, lgSize: 0},
        r = e.split(jE), o = r[0], i = r[1],
        s = o.indexOf(ai) !== -1 ? o.split(ai) : [o.substring(0, o.lastIndexOf(ir) + 1), o.substring(o.lastIndexOf(ir) + 1)],
        a = s[0], u = s[1] || "";
    n.posPre = a.substring(0, a.indexOf(mu));
    for (let l = 0; l < u.length; l++) {
        let d = u.charAt(l);
        d === ir ? n.minFrac = n.maxFrac = l + 1 : d === mu ? n.maxFrac = l + 1 : n.posSuf += d
    }
    let c = a.split(VE);
    if (n.gSize = c[1] ? c[1].length : 0, n.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0, i) {
        let l = o.length - n.posPre.length - n.posSuf.length, d = i.indexOf(mu);
        n.negPre = i.substring(0, d).replace(/'/g, ""), n.negSuf = i.slice(d + l).replace(/'/g, "")
    } else n.negPre = t + n.posPre, n.negSuf = n.posSuf;
    return n
}

function UE(e) {
    if (e.digits[0] === 0) return e;
    let t = e.digits.length - e.integerLen;
    return e.exponent ? e.exponent += 2 : (t === 0 ? e.digits.push(0, 0) : t === 1 && e.digits.push(0), e.integerLen += 2), e
}

function zE(e) {
    let t = Math.abs(e) + "", n = 0, r, o, i, s, a;
    for ((o = t.indexOf(ai)) > -1 && (t = t.replace(ai, "")), (i = t.search(/e/i)) > 0 ? (o < 0 && (o = i), o += +t.slice(i + 1), t = t.substring(0, i)) : o < 0 && (o = t.length), i = 0; t.charAt(i) === ir; i++) ;
    if (i === (a = t.length)) r = [0], o = 1; else {
        for (a--; t.charAt(a) === ir;) a--;
        for (o -= i, r = [], s = 0; i <= a; i++, s++) r[s] = Number(t.charAt(i))
    }
    return o > Pp && (r = r.splice(0, Pp - 1), n = o - 1, o = 1), {digits: r, exponent: n, integerLen: o}
}

function GE(e, t, n) {
    if (t > n) throw new Error(`The minimum number of digits after fraction (${t}) is higher than the maximum (${n}).`);
    let r = e.digits, o = r.length - e.integerLen, i = Math.min(Math.max(t, o), n), s = i + e.integerLen, a = r[s];
    if (s > 0) {
        r.splice(Math.max(e.integerLen, s));
        for (let d = s; d < r.length; d++) r[d] = 0
    } else {
        o = Math.max(0, o), e.integerLen = 1, r.length = Math.max(1, s = i + 1), r[0] = 0;
        for (let d = 1; d < s; d++) r[d] = 0
    }
    if (a >= 5) if (s - 1 < 0) {
        for (let d = 0; d > s; d--) r.unshift(0), e.integerLen++;
        r.unshift(1), e.integerLen++
    } else r[s - 1]++;
    for (; o < Math.max(0, i); o++) r.push(0);
    let u = i !== 0, c = t + e.integerLen, l = r.reduceRight(function (d, p, f, h) {
        return p = p + d, h[f] = p < 10 ? p : p - 10, u && (h[f] === 0 && f >= c ? h.pop() : u = !1), p >= 10 ? 1 : 0
    }, 0);
    l && (r.unshift(l), e.integerLen++)
}

function yu(e) {
    let t = parseInt(e);
    if (isNaN(t)) throw new Error("Invalid integer literal when parsing " + e);
    return t
}

function aO(e, t) {
    t = encodeURIComponent(t);
    for (let n of e.split(";")) {
        let r = n.indexOf("="), [o, i] = r == -1 ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
        if (o.trim() === t) return decodeURIComponent(i)
    }
    return null
}

var vu = /\s+/, Lp = [], uO = (() => {
    class e {
        constructor(n, r) {
            this._ngEl = n, this._renderer = r, this.initialClasses = Lp, this.stateMap = new Map
        }

        set klass(n) {
            this.initialClasses = n != null ? n.trim().split(vu) : Lp
        }

        set ngClass(n) {
            this.rawClass = typeof n == "string" ? n.trim().split(vu) : n
        }

        ngDoCheck() {
            for (let r of this.initialClasses) this._updateState(r, !0);
            let n = this.rawClass;
            if (Array.isArray(n) || n instanceof Set) for (let r of n) this._updateState(r, !0); else if (n != null) for (let r of Object.keys(n)) this._updateState(r, !!n[r]);
            this._applyStateDiff()
        }

        _updateState(n, r) {
            let o = this.stateMap.get(n);
            o !== void 0 ? (o.enabled !== r && (o.changed = !0, o.enabled = r), o.touched = !0) : this.stateMap.set(n, {
                enabled: r,
                changed: !0,
                touched: !0
            })
        }

        _applyStateDiff() {
            for (let n of this.stateMap) {
                let r = n[0], o = n[1];
                o.changed ? (this._toggleClass(r, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)), o.touched = !1
            }
        }

        _toggleClass(n, r) {
            n = n.trim(), n.length > 0 && n.split(vu).forEach(o => {
                r ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o)
            })
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(U(Gt), U(ru))
            }
        }
        static {
            this.\u0275dir = Ut({
                type: e,
                selectors: [["", "ngClass", ""]],
                inputs: {klass: [0, "class", "klass"], ngClass: "ngClass"},
                standalone: !0
            })
        }
    }

    return e
})();
var Du = class {
    constructor(t, n, r, o) {
        this.$implicit = t, this.ngForOf = n, this.index = r, this.count = o
    }

    get first() {
        return this.index === 0
    }

    get last() {
        return this.index === this.count - 1
    }

    get even() {
        return this.index % 2 === 0
    }

    get odd() {
        return !this.even
    }
}, cO = (() => {
    class e {
        set ngForOf(n) {
            this._ngForOf = n, this._ngForOfDirty = !0
        }

        set ngForTrackBy(n) {
            this._trackByFn = n
        }

        get ngForTrackBy() {
            return this._trackByFn
        }

        constructor(n, r, o) {
            this._viewContainer = n, this._template = r, this._differs = o, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
        }

        set ngForTemplate(n) {
            n && (this._template = n)
        }

        ngDoCheck() {
            if (this._ngForOfDirty) {
                this._ngForOfDirty = !1;
                let n = this._ngForOf;
                if (!this._differ && n) if (0) try {
                } catch {
                } else this._differ = this._differs.find(n).create(this.ngForTrackBy)
            }
            if (this._differ) {
                let n = this._differ.diff(this._ngForOf);
                n && this._applyChanges(n)
            }
        }

        _applyChanges(n) {
            let r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
                if (o.previousIndex == null) r.createEmbeddedView(this._template, new Du(o.item, this._ngForOf, -1, -1), s === null ? void 0 : s); else if (s == null) r.remove(i === null ? void 0 : i); else if (i !== null) {
                    let a = r.get(i);
                    r.move(a, s), jp(a, o)
                }
            });
            for (let o = 0, i = r.length; o < i; o++) {
                let a = r.get(o).context;
                a.index = o, a.count = i, a.ngForOf = this._ngForOf
            }
            n.forEachIdentityChange(o => {
                let i = r.get(o.currentIndex);
                jp(i, o)
            })
        }

        static ngTemplateContextGuard(n, r) {
            return !0
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(U(wt), U(yt), U(du))
            }
        }
        static {
            this.\u0275dir = Ut({
                type: e,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate"},
                standalone: !0
            })
        }
    }

    return e
})();

function jp(e, t) {
    e.context.$implicit = t.item
}

var lO = (() => {
    class e {
        constructor(n, r) {
            this._viewContainer = n, this._context = new Iu, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r
        }

        set ngIf(n) {
            this._context.$implicit = this._context.ngIf = n, this._updateView()
        }

        set ngIfThen(n) {
            Vp("ngIfThen", n), this._thenTemplateRef = n, this._thenViewRef = null, this._updateView()
        }

        set ngIfElse(n) {
            Vp("ngIfElse", n), this._elseTemplateRef = n, this._elseViewRef = null, this._updateView()
        }

        _updateView() {
            this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
        }

        static ngTemplateContextGuard(n, r) {
            return !0
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(U(wt), U(yt))
            }
        }
        static {
            this.\u0275dir = Ut({
                type: e,
                selectors: [["", "ngIf", ""]],
                inputs: {ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse"},
                standalone: !0
            })
        }
    }

    return e
})(), Iu = class {
    constructor() {
        this.$implicit = null, this.ngIf = null
    }
};

function Vp(e, t) {
    if (!!!(!t || t.createEmbeddedView)) throw new Error(`${e} must be a TemplateRef, but received '${oe(t)}'.`)
}

var wu = class {
    constructor(t, n) {
        this._viewContainerRef = t, this._templateRef = n, this._created = !1
    }

    create() {
        this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef)
    }

    destroy() {
        this._created = !1, this._viewContainerRef.clear()
    }

    enforceState(t) {
        t && !this._created ? this.create() : !t && this._created && this.destroy()
    }
}, WE = (() => {
    class e {
        constructor() {
            this._defaultViews = [], this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1
        }

        set ngSwitch(n) {
            this._ngSwitch = n, this._caseCount === 0 && this._updateDefaultCases(!0)
        }

        _addCase() {
            return this._caseCount++
        }

        _addDefault(n) {
            this._defaultViews.push(n)
        }

        _matchCase(n) {
            let r = n === this._ngSwitch;
            return this._lastCasesMatched ||= r, this._lastCaseCheckIndex++, this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), r
        }

        _updateDefaultCases(n) {
            if (this._defaultViews.length > 0 && n !== this._defaultUsed) {
                this._defaultUsed = n;
                for (let r of this._defaultViews) r.enforceState(n)
            }
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275dir = Ut({
                type: e,
                selectors: [["", "ngSwitch", ""]],
                inputs: {ngSwitch: "ngSwitch"},
                standalone: !0
            })
        }
    }

    return e
})(), dO = (() => {
    class e {
        constructor(n, r, o) {
            this.ngSwitch = o, o._addCase(), this._view = new wu(n, r)
        }

        ngDoCheck() {
            this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase))
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(U(wt), U(yt), U(WE, 9))
            }
        }
        static {
            this.\u0275dir = Ut({
                type: e,
                selectors: [["", "ngSwitchCase", ""]],
                inputs: {ngSwitchCase: "ngSwitchCase"},
                standalone: !0
            })
        }
    }

    return e
})();
var fO = (() => {
    class e {
        constructor(n) {
            this._viewContainerRef = n, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null
        }

        ngOnChanges(n) {
            if (this._shouldRecreateView(n)) {
                let r = this._viewContainerRef;
                if (this._viewRef && r.remove(r.indexOf(this._viewRef)), !this.ngTemplateOutlet) {
                    this._viewRef = null;
                    return
                }
                let o = this._createContextForwardProxy();
                this._viewRef = r.createEmbeddedView(this.ngTemplateOutlet, o, {injector: this.ngTemplateOutletInjector ?? void 0})
            }
        }

        _shouldRecreateView(n) {
            return !!n.ngTemplateOutlet || !!n.ngTemplateOutletInjector
        }

        _createContextForwardProxy() {
            return new Proxy({}, {
                set: (n, r, o) => this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, r, o) : !1,
                get: (n, r, o) => {
                    if (this.ngTemplateOutletContext) return Reflect.get(this.ngTemplateOutletContext, r, o)
                }
            })
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(U(wt))
            }
        }
        static {
            this.\u0275dir = Ut({
                type: e,
                selectors: [["", "ngTemplateOutlet", ""]],
                inputs: {
                    ngTemplateOutletContext: "ngTemplateOutletContext",
                    ngTemplateOutlet: "ngTemplateOutlet",
                    ngTemplateOutletInjector: "ngTemplateOutletInjector"
                },
                standalone: !0,
                features: [ba]
            })
        }
    }

    return e
})();

function Zp(e, t) {
    return new A(2100, !1)
}

var qE = "mediumDate", ZE = new O(""), YE = new O(""), pO = (() => {
    class e {
        constructor(n, r, o) {
            this.locale = n, this.defaultTimezone = r, this.defaultOptions = o
        }

        transform(n, r, o, i) {
            if (n == null || n === "" || n !== n) return null;
            try {
                let s = r ?? this.defaultOptions?.dateFormat ?? qE,
                    a = o ?? this.defaultOptions?.timezone ?? this.defaultTimezone ?? void 0;
                return ME(n, s, i || this.locale, a)
            } catch (s) {
                throw Zp(e, s.message)
            }
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(U(or, 16), U(ZE, 24), U(YE, 24))
            }
        }
        static {
            this.\u0275pipe = va({name: "date", type: e, pure: !0, standalone: !0})
        }
    }

    return e
})();
var hO = (() => {
    class e {
        constructor(n, r = "USD") {
            this._locale = n, this._defaultCurrencyCode = r
        }

        transform(n, r = this._defaultCurrencyCode, o = "symbol", i, s) {
            if (!QE(n)) return null;
            s ||= this._locale, typeof o == "boolean" && (o = o ? "symbol" : "code");
            let a = r || this._defaultCurrencyCode;
            o !== "code" && (o === "symbol" || o === "symbol-narrow" ? a = wE(a, o === "symbol" ? "wide" : "narrow", s) : a = o);
            try {
                let u = KE(n);
                return $E(u, s, a, r, i)
            } catch (u) {
                throw Zp(e, u.message)
            }
        }

        static {
            this.\u0275fac = function (r) {
                return new (r || e)(U(or, 16), U(Np, 16))
            }
        }
        static {
            this.\u0275pipe = va({name: "currency", type: e, pure: !0, standalone: !0})
        }
    }

    return e
})();

function QE(e) {
    return !(e == null || e === "" || e !== e)
}

function KE(e) {
    if (typeof e == "string" && !isNaN(Number(e) - parseFloat(e))) return Number(e);
    if (typeof e != "number") throw new Error(`${e} is not a number`);
    return e
}

var gO = (() => {
    class e {
        static {
            this.\u0275fac = function (r) {
                return new (r || e)
            }
        }
        static {
            this.\u0275mod = kl({type: e})
        }
        static {
            this.\u0275inj = El({})
        }
    }

    return e
})(), JE = "browser", XE = "server";

function eC(e) {
    return e === JE
}

function mO(e) {
    return e === XE
}

var yO = (() => {
    class e {
        static {
            this.\u0275prov = B({
                token: e,
                providedIn: "root",
                factory: () => eC(M(ja)) ? new Eu(M(bu), window) : new Cu
            })
        }
    }

    return e
})(), Eu = class {
    constructor(t, n) {
        this.document = t, this.window = n, this.offset = () => [0, 0]
    }

    setOffset(t) {
        Array.isArray(t) ? this.offset = () => t : this.offset = t
    }

    getScrollPosition() {
        return [this.window.scrollX, this.window.scrollY]
    }

    scrollToPosition(t) {
        this.window.scrollTo(t[0], t[1])
    }

    scrollToAnchor(t) {
        let n = tC(this.document, t);
        n && (this.scrollToElement(n), n.focus())
    }

    setHistoryScrollRestoration(t) {
        this.window.history.scrollRestoration = t
    }

    scrollToElement(t) {
        let n = t.getBoundingClientRect(), r = n.left + this.window.pageXOffset, o = n.top + this.window.pageYOffset,
            i = this.offset();
        this.window.scrollTo(r - i[0], o - i[1])
    }
};

function tC(e, t) {
    let n = e.getElementById(t) || e.getElementsByName(t)[0];
    if (n) return n;
    if (typeof e.createTreeWalker == "function" && e.body && typeof e.body.attachShadow == "function") {
        let r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT), o = r.currentNode;
        for (; o;) {
            let i = o.shadowRoot;
            if (i) {
                let s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                if (s) return s
            }
            o = r.nextNode()
        }
    }
    return null
}

var Cu = class {
    setOffset(t) {
    }

    getScrollPosition() {
        return [0, 0]
    }

    scrollToPosition(t) {
    }

    scrollToAnchor(t) {
    }

    setHistoryScrollRestoration(t) {
    }
}, Bp = class {
};
var He = function (e) {
    return e[e.State = 0] = "State", e[e.Transition = 1] = "Transition", e[e.Sequence = 2] = "Sequence", e[e.Group = 3] = "Group", e[e.Animate = 4] = "Animate", e[e.Keyframes = 5] = "Keyframes", e[e.Style = 6] = "Style", e[e.Trigger = 7] = "Trigger", e[e.Reference = 8] = "Reference", e[e.AnimateChild = 9] = "AnimateChild", e[e.AnimateRef = 10] = "AnimateRef", e[e.Query = 11] = "Query", e[e.Stagger = 12] = "Stagger", e
}(He || {}), IO = "*";

function wO(e, t) {
    return {type: He.Trigger, name: e, definitions: t, options: {}}
}

function EO(e, t = null) {
    return {type: He.Animate, styles: t, timings: e}
}

function CO(e, t = null) {
    return {type: He.Sequence, steps: e, options: t}
}

function bO(e) {
    return {type: He.Style, styles: e, offset: null}
}

function _O(e, t, n) {
    return {type: He.State, name: e, styles: t, options: n}
}

function MO(e) {
    return {type: He.Keyframes, steps: e}
}

function xO(e, t, n = null) {
    return {type: He.Transition, expr: e, animation: t, options: n}
}

function SO(e = null) {
    return {type: He.AnimateChild, options: e}
}

function TO(e, t, n = null) {
    return {type: He.Query, selector: e, animation: t, options: n}
}

var Yp = class {
    constructor(t = 0, n = 0) {
        this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._originalOnDoneFns = [], this._originalOnStartFns = [], this._started = !1, this._destroyed = !1, this._finished = !1, this._position = 0, this.parentPlayer = null, this.totalTime = t + n
    }

    _onFinish() {
        this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
    }

    onStart(t) {
        this._originalOnStartFns.push(t), this._onStartFns.push(t)
    }

    onDone(t) {
        this._originalOnDoneFns.push(t), this._onDoneFns.push(t)
    }

    onDestroy(t) {
        this._onDestroyFns.push(t)
    }

    hasStarted() {
        return this._started
    }

    init() {
    }

    play() {
        this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0
    }

    triggerMicrotask() {
        queueMicrotask(() => this._onFinish())
    }

    _onStart() {
        this._onStartFns.forEach(t => t()), this._onStartFns = []
    }

    pause() {
    }

    restart() {
    }

    finish() {
        this._onFinish()
    }

    destroy() {
        this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), this.finish(), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
    }

    reset() {
        this._started = !1, this._finished = !1, this._onStartFns = this._originalOnStartFns, this._onDoneFns = this._originalOnDoneFns
    }

    setPosition(t) {
        this._position = this.totalTime ? t * this.totalTime : 1
    }

    getPosition() {
        return this.totalTime ? this._position / this.totalTime : 1
    }

    triggerCallback(t) {
        let n = t == "start" ? this._onStartFns : this._onDoneFns;
        n.forEach(r => r()), n.length = 0
    }
}, Qp = class {
    constructor(t) {
        this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, this.players = t;
        let n = 0, r = 0, o = 0, i = this.players.length;
        i == 0 ? queueMicrotask(() => this._onFinish()) : this.players.forEach(s => {
            s.onDone(() => {
                ++n == i && this._onFinish()
            }), s.onDestroy(() => {
                ++r == i && this._onDestroy()
            }), s.onStart(() => {
                ++o == i && this._onStart()
            })
        }), this.totalTime = this.players.reduce((s, a) => Math.max(s, a.totalTime), 0)
    }

    _onFinish() {
        this._finished || (this._finished = !0, this._onDoneFns.forEach(t => t()), this._onDoneFns = [])
    }

    init() {
        this.players.forEach(t => t.init())
    }

    onStart(t) {
        this._onStartFns.push(t)
    }

    _onStart() {
        this.hasStarted() || (this._started = !0, this._onStartFns.forEach(t => t()), this._onStartFns = [])
    }

    onDone(t) {
        this._onDoneFns.push(t)
    }

    onDestroy(t) {
        this._onDestroyFns.push(t)
    }

    hasStarted() {
        return this._started
    }

    play() {
        this.parentPlayer || this.init(), this._onStart(), this.players.forEach(t => t.play())
    }

    pause() {
        this.players.forEach(t => t.pause())
    }

    restart() {
        this.players.forEach(t => t.restart())
    }

    finish() {
        this._onFinish(), this.players.forEach(t => t.finish())
    }

    destroy() {
        this._onDestroy()
    }

    _onDestroy() {
        this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(t => t.destroy()), this._onDestroyFns.forEach(t => t()), this._onDestroyFns = [])
    }

    reset() {
        this.players.forEach(t => t.reset()), this._destroyed = !1, this._finished = !1, this._started = !1
    }

    setPosition(t) {
        let n = t * this.totalTime;
        this.players.forEach(r => {
            let o = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
            r.setPosition(o)
        })
    }

    getPosition() {
        let t = this.players.reduce((n, r) => n === null || r.totalTime > n.totalTime ? r : n, null);
        return t != null ? t.getPosition() : 0
    }

    beforeDestroy() {
        this.players.forEach(t => {
            t.beforeDestroy && t.beforeDestroy()
        })
    }

    triggerCallback(t) {
        let n = t == "start" ? this._onStartFns : this._onDoneFns;
        n.forEach(r => r()), n.length = 0
    }
}, NO = "!";
export {
    Ae as a,
    Oe as b,
    nC as c,
    eh as d,
    G as e,
    dh as f,
    _ as g,
    Ci as h,
    bi as i,
    De as j,
    Sn as k,
    Nn as l,
    yh as m,
    Ge as n,
    Re as o,
    Si as p,
    _h as q,
    Mh as r,
    xt as s,
    Pe as t,
    Rh as u,
    be as v,
    Fn as w,
    ct as x,
    kh as y,
    Lh as z,
    Ti as A,
    Ic as B,
    Rn as C,
    zh as D,
    St as E,
    Wh as F,
    Zh as G,
    Yh as H,
    Ec as I,
    Qh as J,
    Kh as K,
    Pn as L,
    nn as M,
    Ni as N,
    Jh as O,
    Xh as P,
    ng as Q,
    rg as R,
    _c as S,
    Oi as T,
    og as U,
    ig as V,
    Ri as W,
    sg as X,
    ag as Y,
    ug as Z,
    Mc as _,
    cg as $,
    lg as aa,
    xc as ba,
    dg as ca,
    A as da,
    Il as ea,
    B as fa,
    El as ga,
    bN as ha,
    O as ia,
    N as ja,
    ne as ka,
    M as la,
    Rg as ma,
    Pg as na,
    Bn as oa,
    _N as pa,
    kl as qa,
    Ut as ra,
    om as sa,
    zl as ta,
    gt as ua,
    MN as va,
    ba as wa,
    xN as xa,
    SN as ya,
    TN as za,
    NN as Aa,
    AN as Ba,
    ty as Ca,
    Je as Da,
    Jn as Ea,
    xe as Fa,
    de as Ga,
    Vt as Ha,
    Gt as Ia,
    ms as Ja,
    ON as Ka,
    FN as La,
    vy as Ma,
    ja as Na,
    RN as Oa,
    PN as Pa,
    Xn as Qa,
    kd as Ra,
    kN as Sa,
    LN as Ta,
    jN as Ua,
    VN as Va,
    BN as Wa,
    Ba as Xa,
    Vy as Ya,
    Ha as Za,
    $N as _a,
    HN as $a,
    UN as ab,
    ho as bb,
    zN as cb,
    U as db,
    GN as eb,
    yt as fb,
    yn as gb,
    vn as hb,
    yo as ib,
    ru as jb,
    wt as kb,
    $e as lb,
    AD as mb,
    OD as nb,
    YN as ob,
    QN as pb,
    jD as qb,
    KN as rb,
    GD as sb,
    zs as tb,
    WD as ub,
    XD as vb,
    an as wb,
    nI as xb,
    rI as yb,
    iI as zb,
    mI as Ab,
    op as Bb,
    yI as Cb,
    JN as Db,
    XN as Eb,
    eA as Fb,
    tA as Gb,
    nA as Hb,
    rA as Ib,
    oA as Jb,
    fp as Kb,
    pp as Lb,
    NI as Mb,
    hp as Nb,
    gp as Ob,
    FI as Pb,
    iA as Qb,
    PI as Rb,
    kI as Sb,
    sA as Tb,
    dw as Ub,
    fw as Vb,
    aA as Wb,
    uA as Xb,
    cA as Yb,
    mw as Zb,
    wp as _b,
    yw as $b,
    lA as ac,
    dA as bc,
    fA as cc,
    pA as dc,
    hA as ec,
    gA as fc,
    mA as gc,
    yA as hc,
    vA as ic,
    Iw as jc,
    Ep as kc,
    ww as lc,
    Ew as mc,
    DA as nc,
    Cw as oc,
    IA as pc,
    wA as qc,
    EA as rc,
    CA as sc,
    bA as tc,
    _A as uc,
    MA as vc,
    xA as wc,
    SA as xc,
    TA as yc,
    NA as zc,
    cu as Ac,
    Fw as Bc,
    Rw as Cc,
    Ko as Dc,
    AA as Ec,
    OA as Fc,
    or as Gc,
    lu as Hc,
    FA as Ic,
    Xw as Jc,
    eE as Kc,
    RA as Lc,
    tE as Mc,
    oE as Nc,
    PA as Oc,
    kA as Pc,
    fu as Qc,
    oO as Rc,
    Ap as Sc,
    bu as Tc,
    iO as Uc,
    ui as Vc,
    aE as Wc,
    sO as Xc,
    uE as Yc,
    aO as Zc,
    uO as _c,
    cO as $c,
    lO as ad,
    WE as bd,
    dO as cd,
    fO as dd,
    pO as ed,
    hO as fd,
    gO as gd,
    JE as hd,
    eC as id,
    mO as jd,
    yO as kd,
    Bp as ld,
    He as md,
    IO as nd,
    wO as od,
    EO as pd,
    CO as qd,
    bO as rd,
    _O as sd,
    MO as td,
    xO as ud,
    SO as vd,
    TO as wd,
    Yp as xd,
    Qp as yd,
    NO as zd
};
