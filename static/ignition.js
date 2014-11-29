"object" !== typeof JSON && (JSON = {});
(function() {
    function e(f) {
        return 10 > f ? "0" + f : f
    }

    function f(f) {
        s.lastIndex = 0;
        return s.test(f) ? '"' + f.replace(s, function(f) {
            var e = j[f];
            return "string" === typeof e ? e : "\\u" + ("0000" + f.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + f + '"'
    }

    function p(e, j) {
        var l, B, q, s, Z = t,
            L, x = j[e];
        x && ("object" === typeof x && "function" === typeof x.toJSON) && (x = x.toJSON(e));
        "function" === typeof m && (x = m.call(j, e, x));
        switch (typeof x) {
            case "string":
                return f(x);
            case "number":
                return isFinite(x) ? String(x) : "null";
            case "boolean":
            case "null":
                return String(x);
            case "object":
                if (!x) return "null";
                t += r;
                L = [];
                if ("[object Array]" === Object.prototype.toString.apply(x)) {
                    s = x.length;
                    for (l = 0; l < s; l += 1) L[l] = p(l, x) || "null";
                    q = 0 === L.length ? "[]" : t ? "[\n" + t + L.join(",\n" + t) + "\n" + Z + "]" : "[" + L.join(",") + "]";
                    t = Z;
                    return q
                }
                if (m && "object" === typeof m) {
                    s = m.length;
                    for (l = 0; l < s; l += 1) "string" === typeof m[l] && (B = m[l], (q = p(B, x)) && L.push(f(B) + (t ? ": " : ":") + q))
                } else
                    for (B in x) Object.prototype.hasOwnProperty.call(x, B) && (q = p(B, x)) && L.push(f(B) + (t ? ": " : ":") + q);
                q = 0 === L.length ? "{}" : t ? "{\n" + t + L.join(",\n" +
                    t) + "\n" + Z + "}" : "{" + L.join(",") + "}";
                t = Z;
                return q
        }
    }
    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var l = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        s = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        t, r, j = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        m;
    "function" !== typeof JSON.stringify && (JSON.stringify = function(f, e, j) {
        var l;
        r = t = "";
        if ("number" === typeof j)
            for (l = 0; l < j; l += 1) r += " ";
        else "string" === typeof j && (r = j);
        if ((m = e) && "function" !== typeof e && ("object" !== typeof e || "number" !== typeof e.length)) throw Error("JSON.stringify");
        return p("", {
            "": f
        })
    });
    "function" !== typeof JSON.parse && (JSON.parse = function(f, e) {
        function j(f, l) {
            var m, p, r = f[l];
            if (r && "object" === typeof r)
                for (m in r) Object.prototype.hasOwnProperty.call(r, m) && (p = j(r, m), void 0 !== p ? r[m] = p : delete r[m]);
            return e.call(f, l, r)
        }
        var m;
        f = String(f);
        l.lastIndex = 0;
        l.test(f) && (f = f.replace(l, function(f) {
            return "\\u" + ("0000" + f.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(f.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return m = eval("(" + f + ")"), "function" === typeof e ? j({
            "": m
        }, "") : m;
        throw new SyntaxError("JSON.parse");
    })
})();
(function(e, f) {
    function p(a, b, d) {
        if (d === f && 1 === a.nodeType)
            if (d = "data-" + b.replace(oc, "-$1").toLowerCase(), d = a.getAttribute(d), "string" === typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : pc.test(d) ? c.parseJSON(d) : d
                } catch (g) {}
                c.data(a, b, d)
            } else d = f;
        return d
    }

    function l(a) {
        for (var b in a)
            if (!("data" === b && c.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function s() {
        return !1
    }

    function t() {
        return !0
    }

    function r(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function j(a,
        b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function m(a, b, d) {
        b = b || 0;
        if (c.isFunction(b)) return c.grep(a, function(a, c) {
            return !!b.call(a, c, a) === d
        });
        if (b.nodeType) return c.grep(a, function(a) {
            return a === b === d
        });
        if ("string" === typeof b) {
            var g = c.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (qc.test(b)) return c.filter(b, g, !d);
            b = c.filter(b, g)
        }
        return c.grep(a, function(a) {
            return 0 <= c.inArray(a, b) === d
        })
    }

    function A(a) {
        var b = zb.split("|");
        a = a.createDocumentFragment();
        if (a.createElement)
            for (; b.length;) a.createElement(b.pop());
        return a
    }

    function z(a, b) {
        if (1 === b.nodeType && c.hasData(a)) {
            var d, g, h;
            g = c._data(a);
            var k = c._data(b, g),
                n = g.events;
            if (n)
                for (d in delete k.handle, k.events = {}, n) {
                    g = 0;
                    for (h = n[d].length; g < h; g++) c.event.add(b, d, n[d][g])
                }
            k.data && (k.data = c.extend({}, k.data))
        }
    }

    function K(a, b) {
        var d;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), d = b.nodeName.toLowerCase(), "object" === d ? (b.parentNode && (b.outerHTML = a.outerHTML), c.support.html5Clone && (a.innerHTML && !c.trim(b.innerHTML)) &&
            (b.innerHTML = a.innerHTML)) : "input" === d && Ab.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === d ? b.selected = a.defaultSelected : "input" === d || "textarea" === d ? b.defaultValue = a.defaultValue : "script" === d && b.text !== a.text && (b.text = a.text), b.removeAttribute(c.expando))
    }

    function B(a) {
        return "undefined" !== typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" !== typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }

    function q(a) {
        Ab.test(a.type) && (a.defaultChecked =
            a.checked)
    }

    function v(a, b) {
        if (b in a) return b;
        for (var d = b.charAt(0).toUpperCase() + b.slice(1), c = b, h = Bb.length; h--;)
            if (b = Bb[h] + d, b in a) return b;
        return c
    }

    function Z(a, b) {
        a = b || a;
        return "none" === c.css(a, "display") || !c.contains(a.ownerDocument, a)
    }

    function L(a, b) {
        for (var d, g, h = [], k = 0, n = a.length; k < n; k++) d = a[k], d.style && (h[k] = c._data(d, "olddisplay"), b ? (!h[k] && "none" === d.style.display && (d.style.display = ""), "" === d.style.display && Z(d) && (h[k] = c._data(d, "olddisplay", N(d.nodeName)))) : (g = P(d, "display"), !h[k] && "none" !==
            g && c._data(d, "olddisplay", g)));
        for (k = 0; k < n; k++)
            if (d = a[k], d.style && (!b || "none" === d.style.display || "" === d.style.display)) d.style.display = b ? h[k] || "" : "none";
        return a
    }

    function x(a, b, d) {
        return (a = rc.exec(b)) ? Math.max(0, a[1] - (d || 0)) + (a[2] || "px") : b
    }

    function za(a, b, d, g) {
        b = d === (g ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var h = 0; 4 > b; b += 2) "margin" === d && (h += c.css(a, d + ga[b], !0)), g ? ("content" === d && (h -= parseFloat(P(a, "padding" + ga[b])) || 0), "margin" !== d && (h -= parseFloat(P(a, "border" + ga[b] + "Width")) || 0)) : (h += parseFloat(P(a,
            "padding" + ga[b])) || 0, "padding" !== d && (h += parseFloat(P(a, "border" + ga[b] + "Width")) || 0));
        return h
    }

    function C(a, b, d) {
        var g = "width" === b ? a.offsetWidth : a.offsetHeight,
            h = !0,
            k = c.support.boxSizing && "border-box" === c.css(a, "boxSizing");
        if (0 >= g) {
            g = P(a, b);
            if (0 > g || null == g) g = a.style[b];
            if (Ia.test(g)) return g;
            h = k && (c.support.boxSizingReliable || g === a.style[b]);
            g = parseFloat(g) || 0
        }
        return g + za(a, b, d || (k ? "border" : "content"), h) + "px"
    }

    function N(a) {
        if (cb[a]) return cb[a];
        var b = c("<" + a + ">").appendTo(u.body),
            d = b.css("display");
        b.remove();
        if ("none" === d || "" === d) {
            na = u.body.appendChild(na || c.extend(u.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!oa || !na.createElement) oa = (na.contentWindow || na.contentDocument).document, oa.write("<!doctype html><html><body>"), oa.close();
            b = oa.body.appendChild(oa.createElement(a));
            d = P(b, "display");
            u.body.removeChild(na)
        }
        return cb[a] = d
    }

    function pa(a, b, d, g) {
        var h;
        if (c.isArray(b)) c.each(b, function(b, c) {
            d || sc.test(a) ? g(a, c) : pa(a + "[" + ("object" === typeof c ? b : "") + "]", c, d, g)
        });
        else if (!d &&
            "object" === c.type(b))
            for (h in b) pa(a + "[" + h + "]", b[h], d, g);
        else g(a, b)
    }

    function qa(a) {
        return function(b, d) {
            "string" !== typeof b && (d = b, b = "*");
            var g, h, k = b.toLowerCase().split(H),
                n = 0,
                y = k.length;
            if (c.isFunction(d))
                for (; n < y; n++) g = k[n], (h = /^\+/.test(g)) && (g = g.substr(1) || "*"), g = a[g] = a[g] || [], g[h ? "unshift" : "push"](d)
        }
    }

    function aa(a, b, d, c, h, k) {
        h = h || b.dataTypes[0];
        k = k || {};
        k[h] = !0;
        var n;
        h = a[h];
        for (var y = 0, w = h ? h.length : 0, e = a === db; y < w && (e || !n); y++) n = h[y](b, d, c), "string" === typeof n && (!e || k[n] ? n = f : (b.dataTypes.unshift(n),
            n = aa(a, b, d, c, n, k)));
        if ((e || !n) && !k["*"]) n = aa(a, b, d, c, "*", k);
        return n
    }

    function ra(a, b) {
        var d, g, h = c.ajaxSettings.flatOptions || {};
        for (d in b) b[d] !== f && ((h[d] ? a : g || (g = {}))[d] = b[d]);
        g && c.extend(!0, a, g)
    }

    function ha() {
        try {
            return new e.XMLHttpRequest
        } catch (a) {}
    }

    function Aa() {
        setTimeout(function() {
            Ja = f
        }, 0);
        return Ja = c.now()
    }

    function J(a, b, d) {
        var g, h = 0,
            k = Ka.length,
            n = c.Deferred().always(function() {
                delete y.elem
            }),
            y = function() {
                for (var b = Ja || Aa(), b = Math.max(0, w.startTime + w.duration - b), d = 1 - (b / w.duration || 0), c =
                        0, g = w.tweens.length; c < g; c++) w.tweens[c].run(d);
                n.notifyWith(a, [w, d, b]);
                if (1 > d && g) return b;
                n.resolveWith(a, [w]);
                return !1
            },
            w = n.promise({
                elem: a,
                props: c.extend({}, b),
                opts: c.extend(!0, {
                    specialEasing: {}
                }, d),
                originalProperties: b,
                originalOptions: d,
                startTime: Ja || Aa(),
                duration: d.duration,
                tweens: [],
                createTween: function(b, d) {
                    var g = c.Tween(a, w.opts, b, d, w.opts.specialEasing[b] || w.opts.easing);
                    w.tweens.push(g);
                    return g
                },
                stop: function(b) {
                    for (var d = 0, c = b ? w.tweens.length : 0; d < c; d++) w.tweens[d].run(1);
                    b ? n.resolveWith(a, [w, b]) : n.rejectWith(a, [w, b]);
                    return this
                }
            });
        b = w.props;
        d = w.opts.specialEasing;
        var f, e, j, l;
        for (g in b)
            if (f = c.camelCase(g), e = d[f], j = b[g], c.isArray(j) && (e = j[1], j = b[g] = j[0]), g !== f && (b[f] = j, delete b[g]), (l = c.cssHooks[f]) && "expand" in l)
                for (g in j = l.expand(j), delete b[f], j) g in b || (b[g] = j[g], d[g] = e);
            else d[f] = e;
        for (; h < k; h++)
            if (g = Ka[h].call(w, a, b, w.opts)) return g;
        var m = w;
        c.each(b, function(a, b) {
            for (var d = (Ba[a] || []).concat(Ba["*"]), c = 0, g = d.length; c < g && !d[c].call(m, a, b); c++);
        });
        c.isFunction(w.opts.start) && w.opts.start.call(a,
            w);
        c.fx.timer(c.extend(y, {
            anim: w,
            queue: w.opts.queue,
            elem: a
        }));
        return w.progress(w.opts.progress).done(w.opts.done, w.opts.complete).fail(w.opts.fail).always(w.opts.always)
    }

    function O(a, b, d, c, h) {
        return new O.prototype.init(a, b, d, c, h)
    }

    function ia(a, b) {
        for (var d, c = {
                height: a
            }, h = 0; 4 > h; h += 2 - b) d = ga[h], c["margin" + d] = c["padding" + d] = a;
        b && (c.opacity = c.width = a);
        return c
    }

    function Ca(a) {
        return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var Da, sa, u = e.document,
        Ma = e.location,
        ta = e.navigator,
        Na =
        e.jQuery,
        Oa = e.$,
        ja = Array.prototype.push,
        U = Array.prototype.slice,
        Ea = Array.prototype.indexOf,
        F = Object.prototype.toString,
        I = Object.prototype.hasOwnProperty,
        S = String.prototype.trim,
        c = function(a, b) {
            return new c.fn.init(a, b, Da)
        },
        V = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        Cb = /\S/,
        H = /\s+/,
        uc = Cb.test("\u00a0") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g,
        vc = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Db = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Fa = /^[\],:{}\s]*$/,
        wc = /(?:^|:|,)(?:\s*\[)+/g,
        xc = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        yc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        zc = /^-ms-/,
        Ac = /-([\da-z])/gi,
        Bc = function(a, b) {
            return (b + "").toUpperCase()
        },
        Pa = function() {
            u.addEventListener ? (u.removeEventListener("DOMContentLoaded", Pa, !1), c.ready()) : "complete" === u.readyState && (u.detachEvent("onreadystatechange", Pa), c.ready())
        },
        Eb = {};
    c.fn = c.prototype = {
        constructor: c,
        init: function(a, b, d) {
            var g;
            if (!a) return this;
            if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
            if ("string" === typeof a) {
                if ((g = "<" === a.charAt(0) &&
                        ">" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : vc.exec(a)) && (g[1] || !b)) {
                    if (g[1]) return a = (b = b instanceof c ? b[0] : b) && b.nodeType ? b.ownerDocument || b : u, a = c.parseHTML(g[1], a, !0), Db.test(g[1]) && c.isPlainObject(b) && this.attr.call(a, b, !0), c.merge(this, a);
                    if ((b = u.getElementById(g[2])) && b.parentNode) {
                        if (b.id !== g[2]) return d.find(a);
                        this.length = 1;
                        this[0] = b
                    }
                    this.context = u;
                    this.selector = a;
                    return this
                }
                return !b || b.jquery ? (b || d).find(a) : this.constructor(b).find(a)
            }
            if (c.isFunction(a)) return d.ready(a);
            a.selector !==
                f && (this.selector = a.selector, this.context = a.context);
            return c.makeArray(a, this)
        },
        selector: "",
        jquery: "1.8.0",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return U.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a, b, d) {
            a = c.merge(this.constructor(), a);
            a.prevObject = this;
            a.context = this.context;
            "find" === b ? a.selector = this.selector + (this.selector ? " " : "") + d : b && (a.selector = this.selector + "." + b + "(" + d + ")");
            return a
        },
        each: function(a,
            b) {
            return c.each(this, a, b)
        },
        ready: function(a) {
            c.ready.promise().done(a);
            return this
        },
        eq: function(a) {
            a = +a;
            return -1 === a ? this.slice(a) : this.slice(a, a + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(U.apply(this, arguments), "slice", U.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(c.map(this, function(b, d) {
                return a.call(b, d, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: ja,
        sort: [].sort,
        splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function() {
        var a, b, d, g, h, k = arguments[0] || {},
            n = 1,
            y = arguments.length,
            w = !1;
        "boolean" === typeof k && (w = k, k = arguments[1] || {}, n = 2);
        "object" !== typeof k && !c.isFunction(k) && (k = {});
        y === n && (k = this, --n);
        for (; n < y; n++)
            if (null != (a = arguments[n]))
                for (b in a) d = k[b], g = a[b], k !== g && (w && g && (c.isPlainObject(g) || (h = c.isArray(g))) ? (h ? (h = !1, d = d && c.isArray(d) ? d : []) : d = d && c.isPlainObject(d) ? d : {}, k[b] = c.extend(w, d, g)) : g !== f && (k[b] = g));
        return k
    };
    c.extend({
        noConflict: function(a) {
            e.$ ===
                c && (e.$ = Oa);
            a && e.jQuery === c && (e.jQuery = Na);
            return c
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? c.readyWait++ : c.ready(!0)
        },
        ready: function(a) {
            if (!(!0 === a ? --c.readyWait : c.isReady)) {
                if (!u.body) return setTimeout(c.ready, 1);
                c.isReady = !0;
                !0 !== a && 0 < --c.readyWait || (sa.resolveWith(u, [c]), c.fn.trigger && c(u).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === c.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === c.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? String(a) : Eb[F.call(a)] || "object"
        },
        isPlainObject: function(a) {
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
            try {
                if (a.constructor && !I.call(a, "constructor") && !I.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (b) {
                return !1
            }
            for (var d in a);
            return d === f || I.call(a, d)
        },
        isEmptyObject: function(a) {
            for (var b in a) return !1;
            return !0
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a,
            b, d) {
            var g;
            if (!a || "string" !== typeof a) return null;
            "boolean" === typeof b && (d = b, b = 0);
            b = b || u;
            if (g = Db.exec(a)) return [b.createElement(g[1])];
            g = c.buildFragment([a], b, d ? null : []);
            return c.merge([], (g.cacheable ? c.clone(g.fragment) : g.fragment).childNodes)
        },
        parseJSON: function(a) {
            if (!a || "string" !== typeof a) return null;
            a = c.trim(a);
            if (e.JSON && e.JSON.parse) return e.JSON.parse(a);
            if (Fa.test(a.replace(xc, "@").replace(yc, "]").replace(wc, ""))) return (new Function("return " + a))();
            c.error("Invalid JSON: " + a)
        },
        parseXML: function(a) {
            var b,
                d;
            if (!a || "string" !== typeof a) return null;
            try {
                e.DOMParser ? (d = new DOMParser, b = d.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a))
            } catch (g) {
                b = f
            }(!b || !b.documentElement || b.getElementsByTagName("parsererror").length) && c.error("Invalid XML: " + a);
            return b
        },
        noop: function() {},
        globalEval: function(a) {
            a && Cb.test(a) && (e.execScript || function(a) {
                e.eval.call(e, a)
            })(a)
        },
        camelCase: function(a) {
            return a.replace(zc, "ms-").replace(Ac, Bc)
        },
        nodeName: function(a, b) {
            return a.nodeName &&
                a.nodeName.toUpperCase() === b.toUpperCase()
        },
        each: function(a, b, d) {
            var g, h = 0,
                k = a.length,
                n = k === f || c.isFunction(a);
            if (d)
                if (n)
                    for (g in a) {
                        if (!1 === b.apply(a[g], d)) break
                    } else
                        for (; h < k && !1 !== b.apply(a[h++], d););
                else if (n)
                for (g in a) {
                    if (!1 === b.call(a[g], g, a[g])) break
                } else
                    for (; h < k && !1 !== b.call(a[h], h, a[h++]););
            return a
        },
        trim: S ? function(a) {
            return null == a ? "" : S.call(a)
        } : function(a) {
            return null == a ? "" : a.toString().replace(uc, "")
        },
        makeArray: function(a, b) {
            var d, g = b || [];
            null != a && (d = c.type(a), null == a.length || "string" ===
                d || "function" === d || "regexp" === d || c.isWindow(a) ? ja.call(g, a) : c.merge(g, a));
            return g
        },
        inArray: function(a, b, d) {
            var c;
            if (b) {
                if (Ea) return Ea.call(b, a, d);
                c = b.length;
                for (d = d ? 0 > d ? Math.max(0, c + d) : d : 0; d < c; d++)
                    if (d in b && b[d] === a) return d
            }
            return -1
        },
        merge: function(a, b) {
            var d = b.length,
                c = a.length,
                h = 0;
            if ("number" === typeof d)
                for (; h < d; h++) a[c++] = b[h];
            else
                for (; b[h] !== f;) a[c++] = b[h++];
            a.length = c;
            return a
        },
        grep: function(a, b, d) {
            var c, h = [],
                k = 0,
                n = a.length;
            for (d = !!d; k < n; k++) c = !!b(a[k], k), d !== c && h.push(a[k]);
            return h
        },
        map: function(a,
            b, d) {
            var g, h, k = [],
                n = 0,
                y = a.length;
            if (a instanceof c || y !== f && "number" === typeof y && (0 < y && a[0] && a[y - 1] || 0 === y || c.isArray(a)))
                for (; n < y; n++) g = b(a[n], n, d), null != g && (k[k.length] = g);
            else
                for (h in a) g = b(a[h], h, d), null != g && (k[k.length] = g);
            return k.concat.apply([], k)
        },
        guid: 1,
        proxy: function(a, b) {
            var d, g;
            "string" === typeof b && (d = a[b], b = a, a = d);
            if (!c.isFunction(a)) return f;
            g = U.call(arguments, 2);
            d = function() {
                return a.apply(b, g.concat(U.call(arguments)))
            };
            d.guid = a.guid = a.guid || d.guid || c.guid++;
            return d
        },
        access: function(a,
            b, d, g, h, k, n) {
            var y, w = null == d,
                e = 0,
                j = a.length;
            if (d && "object" === typeof d) {
                for (e in d) c.access(a, b, e, d[e], 1, k, g);
                h = 1
            } else if (g !== f) {
                y = n === f && c.isFunction(g);
                w && (y ? (y = b, b = function(a, b, d) {
                    return y.call(c(a), d)
                }) : (b.call(a, g), b = null));
                if (b)
                    for (; e < j; e++) b(a[e], d, y ? g.call(a[e], e, b(a[e], d)) : g, n);
                h = 1
            }
            return h ? a : w ? b.call(a) : j ? b(a[0], d) : k
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    c.ready.promise = function(a) {
        if (!sa)
            if (sa = c.Deferred(), "complete" === u.readyState || "loading" !== u.readyState && u.addEventListener) setTimeout(c.ready,
                1);
            else if (u.addEventListener) u.addEventListener("DOMContentLoaded", Pa, !1), e.addEventListener("load", c.ready, !1);
        else {
            u.attachEvent("onreadystatechange", Pa);
            e.attachEvent("onload", c.ready);
            var b = !1;
            try {
                b = null == e.frameElement && u.documentElement
            } catch (d) {}
            b && b.doScroll && function h() {
                if (!c.isReady) {
                    try {
                        b.doScroll("left")
                    } catch (a) {
                        return setTimeout(h, 50)
                    }
                    c.ready()
                }
            }()
        }
        return sa.promise(a)
    };
    c.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
        Eb["[object " + b + "]"] = b.toLowerCase()
    });
    Da = c(u);
    var Fb = {};
    c.Callbacks = function(a) {
        var b;
        if ("string" === typeof a) {
            if (!(b = Fb[a])) {
                b = a;
                var d = Fb[b] = {};
                c.each(b.split(H), function(a, b) {
                    d[b] = !0
                });
                b = d
            }
        } else b = c.extend({}, a);
        a = b;
        var g, h, k, n, y, w, e = [],
            j = !a.once && [],
            l = function(b) {
                g = a.memory && b;
                h = !0;
                w = n || 0;
                n = 0;
                y = e.length;
                for (k = !0; e && w < y; w++)
                    if (!1 === e[w].apply(b[0], b[1]) && a.stopOnFalse) {
                        g = !1;
                        break
                    }
                k = !1;
                e && (j ? j.length && l(j.shift()) : g ? e = [] : m.disable())
            },
            m = {
                add: function() {
                    if (e) {
                        var b = e.length;
                        (function tc(b) {
                            c.each(b, function(b, d) {
                                c.isFunction(d) && (!a.unique ||
                                    !m.has(d)) ? e.push(d) : d && d.length && tc(d)
                            })
                        })(arguments);
                        k ? y = e.length : g && (n = b, l(g))
                    }
                    return this
                },
                remove: function() {
                    e && c.each(arguments, function(a, b) {
                        for (var d; - 1 < (d = c.inArray(b, e, d));) e.splice(d, 1), k && (d <= y && y--, d <= w && w--)
                    });
                    return this
                },
                has: function(a) {
                    return -1 < c.inArray(a, e)
                },
                empty: function() {
                    e = [];
                    return this
                },
                disable: function() {
                    e = j = g = f;
                    return this
                },
                disabled: function() {
                    return !e
                },
                lock: function() {
                    j = f;
                    g || m.disable();
                    return this
                },
                locked: function() {
                    return !j
                },
                fireWith: function(a, b) {
                    b = b || [];
                    b = [a, b.slice ?
                        b.slice() : b
                    ];
                    if (e && (!h || j)) k ? j.push(b) : l(b);
                    return this
                },
                fire: function() {
                    m.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!h
                }
            };
        return m
    };
    c.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", c.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", c.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", c.Callbacks("memory")]
                ],
                d = "pending",
                g = {
                    state: function() {
                        return d
                    },
                    always: function() {
                        h.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var a = arguments;
                        return c.Deferred(function(d) {
                            c.each(b,
                                function(b, g) {
                                    var e = g[0],
                                        f = a[b];
                                    h[g[1]](c.isFunction(f) ? function() {
                                        var a = f.apply(this, arguments);
                                        if (a && c.isFunction(a.promise)) a.promise().done(d.resolve).fail(d.reject).progress(d.notify);
                                        else d[e + "With"](this === h ? d : this, [a])
                                    } : d[e])
                                });
                            a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return "object" === typeof a ? c.extend(a, g) : g
                    }
                },
                h = {};
            g.pipe = g.then;
            c.each(b, function(a, c) {
                var y = c[2],
                    e = c[3];
                g[c[1]] = y.add;
                e && y.add(function() {
                    d = e
                }, b[a ^ 1][2].disable, b[2][2].lock);
                h[c[0]] = y.fire;
                h[c[0] + "With"] = y.fireWith
            });
            g.promise(h);
            a && a.call(h, h);
            return h
        },
        when: function(a) {
            var b = 0,
                d = U.call(arguments),
                g = d.length,
                h = 1 !== g || a && c.isFunction(a.promise) ? g : 0,
                k = 1 === h ? a : c.Deferred(),
                n = function(a, b, d) {
                    return function(c) {
                        b[a] = this;
                        d[a] = 1 < arguments.length ? U.call(arguments) : c;
                        d === y ? k.notifyWith(b, d) : --h || k.resolveWith(b, d)
                    }
                },
                y, e, f;
            if (1 < g) {
                y = Array(g);
                e = Array(g);
                for (f = Array(g); b < g; b++) d[b] && c.isFunction(d[b].promise) ? d[b].promise().done(n(b, f, d)).fail(k.reject).progress(n(b, e, y)) : --h
            }
            h || k.resolveWith(f, d);
            return k.promise()
        }
    });
    var Cc = c,
        eb;
    var M, Qa, ba, Ra, Sa, Q, ka, Ta, fb, ua, Gb, G = u.createElement("div");
    G.setAttribute("className", "t");
    G.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    Qa = G.getElementsByTagName("*");
    ba = G.getElementsByTagName("a")[0];
    ba.style.cssText = "top:1px;float:left;opacity:.5";
    if (!Qa || !Qa.length || !ba) eb = {};
    else {
        Ra = u.createElement("select");
        Sa = Ra.appendChild(u.createElement("option"));
        Q = G.getElementsByTagName("input")[0];
        M = {
            leadingWhitespace: 3 === G.firstChild.nodeType,
            tbody: !G.getElementsByTagName("tbody").length,
            htmlSerialize: !!G.getElementsByTagName("link").length,
            style: /top/.test(ba.getAttribute("style")),
            hrefNormalized: "/a" === ba.getAttribute("href"),
            opacity: /^0.5/.test(ba.style.opacity),
            cssFloat: !!ba.style.cssFloat,
            checkOn: "on" === Q.value,
            optSelected: Sa.selected,
            getSetAttribute: "t" !== G.className,
            enctype: !!u.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== u.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === u.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        Q.checked = !0;
        M.noCloneChecked = Q.cloneNode(!0).checked;
        Ra.disabled = !0;
        M.optDisabled = !Sa.disabled;
        try {
            delete G.test
        } catch (Cd) {
            M.deleteExpando = !1
        }!G.addEventListener && (G.attachEvent && G.fireEvent) && (G.attachEvent("onclick", Gb = function() {
            M.noCloneEvent = !1
        }), G.cloneNode(!0).fireEvent("onclick"), G.detachEvent("onclick", Gb));
        Q = u.createElement("input");
        Q.value = "t";
        Q.setAttribute("type",
            "radio");
        M.radioValue = "t" === Q.value;
        Q.setAttribute("checked", "checked");
        Q.setAttribute("name", "t");
        G.appendChild(Q);
        ka = u.createDocumentFragment();
        ka.appendChild(G.lastChild);
        M.checkClone = ka.cloneNode(!0).cloneNode(!0).lastChild.checked;
        M.appendChecked = Q.checked;
        ka.removeChild(Q);
        ka.appendChild(G);
        if (G.attachEvent)
            for (fb in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) Ta = "on" + fb, ua = Ta in G, ua || (G.setAttribute(Ta, "return;"), ua = "function" === typeof G[Ta]), M[fb + "Bubbles"] = ua;
        c(function() {
            var a, b, d, c = u.getElementsByTagName("body")[0];
            c && (a = u.createElement("div"), a.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", c.insertBefore(a, c.firstChild), b = u.createElement("div"), a.appendChild(b), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", d = b.getElementsByTagName("td"), d[0].style.cssText = "padding:0;margin:0;border:0;display:none", ua = 0 === d[0].offsetHeight, d[0].style.display = "", d[1].style.display = "none", M.reliableHiddenOffsets = ua && 0 === d[0].offsetHeight, b.innerHTML = "", b.style.cssText =
                "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", M.boxSizing = 4 === b.offsetWidth, M.doesNotIncludeMarginInBodyOffset = 1 !== c.offsetTop, e.getComputedStyle && (M.pixelPosition = "1%" !== (e.getComputedStyle(b, null) || {}).top, M.boxSizingReliable = "4px" === (e.getComputedStyle(b, null) || {
                        width: "4px"
                    }).width, d = u.createElement("div"), d.style.cssText = b.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                    d.style.marginRight = d.style.width = "0", b.style.width = "1px", b.appendChild(d), M.reliableMarginRight = !parseFloat((e.getComputedStyle(d, null) || {}).marginRight)), "undefined" !== typeof b.style.zoom && (b.innerHTML = "", b.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", M.inlineBlockNeedsLayout = 3 === b.offsetWidth, b.style.display = "block", b.style.overflow = "visible", b.innerHTML = "<div></div>", b.firstChild.style.width = "5px", M.shrinkWrapBlocks = 3 !==
                    b.offsetWidth, a.style.zoom = 1), c.removeChild(a))
        });
        ka.removeChild(G);
        Qa = ba = Ra = Sa = Q = ka = G = null;
        eb = M
    }
    Cc.support = eb;
    var pc = /^(?:\{.*\}|\[.*\])$/,
        oc = /([A-Z])/g;
    c.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (c.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
            return !!a && !l(a)
        },
        data: function(a, b, d, g) {
            if (c.acceptData(a)) {
                var h = c.expando,
                    k = "string" === typeof b,
                    n = a.nodeType,
                    y = n ? c.cache : a,
                    e = n ? a[h] : a[h] && h;
                if (e && y[e] && (g || y[e].data) || !(k && d === f)) {
                    e || (n ? a[h] = e = c.deletedIds.pop() || ++c.uuid : e = h);
                    y[e] || (y[e] = {}, n || (y[e].toJSON = c.noop));
                    if ("object" === typeof b || "function" === typeof b) g ? y[e] = c.extend(y[e], b) : y[e].data = c.extend(y[e].data, b);
                    a = y[e];
                    g || (a.data || (a.data = {}), a = a.data);
                    d !== f && (a[c.camelCase(b)] = d);
                    k ? (d = a[b], null == d && (d = a[c.camelCase(b)])) : d = a;
                    return d
                }
            }
        },
        removeData: function(a, b, d) {
            if (c.acceptData(a)) {
                var g, h, k, n = a.nodeType,
                    e = n ? c.cache : a,
                    f = n ? a[c.expando] :
                    c.expando;
                if (e[f]) {
                    if (b && (g = d ? e[f] : e[f].data)) {
                        c.isArray(b) || (b in g ? b = [b] : (b = c.camelCase(b), b = b in g ? [b] : b.split(" ")));
                        h = 0;
                        for (k = b.length; h < k; h++) delete g[b[h]];
                        if (!(d ? l : c.isEmptyObject)(g)) return
                    }
                    if (!d && (delete e[f].data, !l(e[f]))) return;
                    n ? c.cleanData([a], !0) : c.support.deleteExpando || e != e.window ? delete e[f] : e[f] = null
                }
            }
        },
        _data: function(a, b, d) {
            return c.data(a, b, d, !0)
        },
        acceptData: function(a) {
            var b = a.nodeName && c.noData[a.nodeName.toLowerCase()];
            return !b || !0 !== b && a.getAttribute("classid") === b
        }
    });
    c.fn.extend({
        data: function(a,
            b) {
            var d, g, h, k, n, e = this[0],
                w = 0,
                j = null;
            if (a === f) {
                if (this.length && (j = c.data(e), 1 === e.nodeType && !c._data(e, "parsedAttrs"))) {
                    h = e.attributes;
                    for (n = h.length; w < n; w++) k = h[w].name, 0 === k.indexOf("data-") && (k = c.camelCase(k.substring(5)), p(e, k, j[k]));
                    c._data(e, "parsedAttrs", !0)
                }
                return j
            }
            if ("object" === typeof a) return this.each(function() {
                c.data(this, a)
            });
            d = a.split(".", 2);
            d[1] = d[1] ? "." + d[1] : "";
            g = d[1] + "!";
            return c.access(this, function(b) {
                if (b === f) return j = this.triggerHandler("getData" + g, [d[0]]), j === f && e && (j = c.data(e,
                    a), j = p(e, a, j)), j === f && d[1] ? this.data(d[0]) : j;
                d[1] = b;
                this.each(function() {
                    var h = c(this);
                    h.triggerHandler("setData" + g, d);
                    c.data(this, a, b);
                    h.triggerHandler("changeData" + g, d)
                })
            }, null, b, 1 < arguments.length, null, !1)
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function(a, b, d) {
            var g;
            if (a) return b = (b || "fx") + "queue", g = c._data(a, b), d && (!g || c.isArray(d) ? g = c._data(a, b, c.makeArray(d)) : g.push(d)), g || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var d = c.queue(a, b),
                g = d.shift(),
                h = c._queueHooks(a, b),
                k = function() {
                    c.dequeue(a, b)
                };
            "inprogress" === g && (g = d.shift());
            g && ("fx" === b && d.unshift("inprogress"), delete h.stop, g.call(a, k, h));
            !d.length && h && h.empty.fire()
        },
        _queueHooks: function(a, b) {
            var d = b + "queueHooks";
            return c._data(a, d) || c._data(a, d, {
                empty: c.Callbacks("once memory").add(function() {
                    c.removeData(a, b + "queue", !0);
                    c.removeData(a, d, !0)
                })
            })
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            var d = 2;
            "string" !== typeof a && (b = a, a = "fx", d--);
            return arguments.length < d ? c.queue(this[0], a) : b === f ? this : this.each(function() {
                var d =
                    c.queue(this, a, b);
                c._queueHooks(this, a);
                "fx" === a && "inprogress" !== d[0] && c.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = c.fx ? c.fx.speeds[a] || a : a;
            return this.queue(b || "fx", function(b, c) {
                var h = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(h)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var d, g = 1,
                h = c.Deferred(),
                k = this,
                n = this.length,
                e = function() {
                    --g || h.resolveWith(k, [k])
                };
            "string" !== typeof a && (b = a, a = f);
            for (a = a || "fx"; n--;)
                if ((d = c._data(k[n], a + "queueHooks")) && d.empty) g++, d.empty.add(e);
            e();
            return h.promise(b)
        }
    });
    var ca, Hb, Ib, Jb = /[\t\r\n]/g,
        Dc = /\r/g,
        Ec = /^(?:button|input)$/i,
        Fc = /^(?:button|input|object|select|textarea)$/i,
        Gc = /^a(?:rea|)$/i,
        Kb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Lb = c.support.getSetAttribute;
    c.fn.extend({
        attr: function(a, b) {
            return c.access(this, c.attr, a, b, 1 < arguments.length)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.removeAttr(this,
                    a)
            })
        },
        prop: function(a, b) {
            return c.access(this, c.prop, a, b, 1 < arguments.length)
        },
        removeProp: function(a) {
            a = c.propFix[a] || a;
            return this.each(function() {
                try {
                    this[a] = f, delete this[a]
                } catch (b) {}
            })
        },
        addClass: function(a) {
            var b, d, g, h, k, n, e;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).addClass(a.call(this, b, this.className))
            });
            if (a && "string" === typeof a) {
                b = a.split(H);
                d = 0;
                for (g = this.length; d < g; d++)
                    if (h = this[d], 1 === h.nodeType)
                        if (!h.className && 1 === b.length) h.className = a;
                        else {
                            k = " " + h.className + " ";
                            n = 0;
                            for (e =
                                b.length; n < e; n++) ~k.indexOf(" " + b[n] + " ") || (k += b[n] + " ");
                            h.className = c.trim(k)
                        }
            }
            return this
        },
        removeClass: function(a) {
            var b, d, g, h, k, n, e;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).removeClass(a.call(this, b, this.className))
            });
            if (a && "string" === typeof a || a === f) {
                b = (a || "").split(H);
                n = 0;
                for (e = this.length; n < e; n++)
                    if (g = this[n], 1 === g.nodeType && g.className) {
                        d = (" " + g.className + " ").replace(Jb, " ");
                        h = 0;
                        for (k = b.length; h < k; h++)
                            for (; - 1 < d.indexOf(" " + b[h] + " ");) d = d.replace(" " + b[h] + " ", " ");
                        g.className =
                            a ? c.trim(d) : ""
                    }
            }
            return this
        },
        toggleClass: function(a, b) {
            var d = typeof a,
                g = "boolean" === typeof b;
            return c.isFunction(a) ? this.each(function(d) {
                c(this).toggleClass(a.call(this, d, this.className, b), b)
            }) : this.each(function() {
                if ("string" === d)
                    for (var h, k = 0, n = c(this), e = b, f = a.split(H); h = f[k++];) e = g ? e : !n.hasClass(h), n[e ? "addClass" : "removeClass"](h);
                else if ("undefined" === d || "boolean" === d) this.className && c._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : c._data(this, "__className__") ||
                    ""
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0, d = this.length; b < d; b++)
                if (1 === this[b].nodeType && -1 < (" " + this[b].className + " ").replace(Jb, " ").indexOf(a)) return !0;
            return !1
        },
        val: function(a) {
            var b, d, g, h = this[0];
            if (arguments.length) return g = c.isFunction(a), this.each(function(d) {
                var h = c(this);
                if (1 === this.nodeType && (d = g ? a.call(this, d, h.val()) : a, null == d ? d = "" : "number" === typeof d ? d += "" : c.isArray(d) && (d = c.map(d, function(a) {
                        return null == a ? "" : a + ""
                    })), b = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()], !b || !("set" in b) || b.set(this, d, "value") === f)) this.value = d
            });
            if (h) {
                if ((b = c.valHooks[h.type] || c.valHooks[h.nodeName.toLowerCase()]) && "get" in b && (d = b.get(h, "value")) !== f) return d;
                d = h.value;
                return "string" === typeof d ? d.replace(Dc, "") : null == d ? "" : d
            }
        }
    });
    c.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, d, g = a.selectedIndex,
                        h = [],
                        k = a.options,
                        n = "select-one" === a.type;
                    if (0 > g) return null;
                    a = n ? g : 0;
                    for (d = n ? g + 1 : k.length; a < d; a++)
                        if (b =
                            k[a], b.selected && (c.support.optDisabled ? !b.disabled : null === b.getAttribute("disabled")) && (!b.parentNode.disabled || !c.nodeName(b.parentNode, "optgroup"))) {
                            b = c(b).val();
                            if (n) return b;
                            h.push(b)
                        }
                    return n && !h.length && k.length ? c(k[g]).val() : h
                },
                set: function(a, b) {
                    var d = c.makeArray(b);
                    c(a).find("option").each(function() {
                        this.selected = 0 <= c.inArray(c(this).val(), d)
                    });
                    d.length || (a.selectedIndex = -1);
                    return d
                }
            }
        },
        attrFn: {},
        attr: function(a, b, d, g) {
            var h, k, n = a.nodeType;
            if (a && !(3 === n || 8 === n || 2 === n)) {
                if (g && c.isFunction(c.fn[b])) return c(a)[b](d);
                if ("undefined" === typeof a.getAttribute) return c.prop(a, b, d);
                if (g = 1 !== n || !c.isXMLDoc(a)) b = b.toLowerCase(), k = c.attrHooks[b] || (Kb.test(b) ? Hb : ca);
                if (d !== f)
                    if (null === d) c.removeAttr(a, b);
                    else {
                        if (k && "set" in k && g && (h = k.set(a, d, b)) !== f) return h;
                        a.setAttribute(b, "" + d);
                        return d
                    } else {
                    if (k && "get" in k && g && null !== (h = k.get(a, b))) return h;
                    h = a.getAttribute(b);
                    return null === h ? f : h
                }
            }
        },
        removeAttr: function(a, b) {
            var d, g, h, k, n = 0;
            if (b && 1 === a.nodeType)
                for (g = b.split(H); n < g.length; n++)
                    if (h = g[n]) d = c.propFix[h] || h, (k = Kb.test(h)) ||
                        c.attr(a, h, ""), a.removeAttribute(Lb ? h : d), k && d in a && (a[d] = !1)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (Ec.test(a.nodeName) && a.parentNode) c.error("type property can't be changed");
                    else if (!c.support.radioValue && "radio" === b && c.nodeName(a, "input")) {
                        var d = a.value;
                        a.setAttribute("type", b);
                        d && (a.value = d);
                        return b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return ca && c.nodeName(a, "button") ? ca.get(a, b) : b in a ? a.value : null
                },
                set: function(a, b, d) {
                    if (ca && c.nodeName(a, "button")) return ca.set(a, b, d);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, b, d) {
            var g, h, k;
            k = a.nodeType;
            if (a && !(3 === k || 8 === k || 2 === k)) {
                if (k = 1 !== k || !c.isXMLDoc(a)) b = c.propFix[b] || b, h = c.propHooks[b];
                return d !== f ? h && "set" in h && (g = h.set(a, d, b)) !== f ? g : a[b] = d : h && "get" in h && null !== (g = h.get(a, b)) ? g : a[b]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b =
                        a.getAttributeNode("tabindex");
                    return b && b.specified ? parseInt(b.value, 10) : Fc.test(a.nodeName) || Gc.test(a.nodeName) && a.href ? 0 : f
                }
            }
        }
    });
    Hb = {
        get: function(a, b) {
            var d, g = c.prop(a, b);
            return !0 === g || "boolean" !== typeof g && (d = a.getAttributeNode(b)) && !1 !== d.nodeValue ? b.toLowerCase() : f
        },
        set: function(a, b, d) {
            !1 === b ? c.removeAttr(a, d) : (b = c.propFix[d] || d, b in a && (a[b] = !0), a.setAttribute(d, d.toLowerCase()));
            return d
        }
    };
    Lb || (Ib = {
        name: !0,
        id: !0,
        coords: !0
    }, ca = c.valHooks.button = {
        get: function(a, b) {
            var d;
            return (d = a.getAttributeNode(b)) &&
                (Ib[b] ? "" !== d.value : d.specified) ? d.value : f
        },
        set: function(a, b, d) {
            var c = a.getAttributeNode(d);
            c || (c = u.createAttribute(d), a.setAttributeNode(c));
            return c.value = b + ""
        }
    }, c.each(["width", "height"], function(a, b) {
        c.attrHooks[b] = c.extend(c.attrHooks[b], {
            set: function(a, c) {
                if ("" === c) return a.setAttribute(b, "auto"), c
            }
        })
    }), c.attrHooks.contenteditable = {
        get: ca.get,
        set: function(a, b, d) {
            "" === b && (b = "false");
            ca.set(a, b, d)
        }
    });
    c.support.hrefNormalized || c.each(["href", "src", "width", "height"], function(a, b) {
        c.attrHooks[b] =
            c.extend(c.attrHooks[b], {
                get: function(a) {
                    a = a.getAttribute(b, 2);
                    return null === a ? f : a
                }
            })
    });
    c.support.style || (c.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || f
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    });
    c.support.optSelected || (c.propHooks.selected = c.extend(c.propHooks.selected, {
        get: function(a) {
            if (a = a.parentNode) a.selectedIndex, a.parentNode && a.parentNode.selectedIndex;
            return null
        }
    }));
    c.support.enctype || (c.propFix.enctype = "encoding");
    c.support.checkOn || c.each(["radio", "checkbox"],
        function() {
            c.valHooks[this] = {
                get: function(a) {
                    return null === a.getAttribute("value") ? "on" : a.value
                }
            }
        });
    c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = c.extend(c.valHooks[this], {
            set: function(a, b) {
                if (c.isArray(b)) return a.checked = 0 <= c.inArray(c(a).val(), b)
            }
        })
    });
    var gb = /^(?:textarea|input|select)$/i,
        Mb = /^([^\.]*|)(?:\.(.+)|)$/,
        Hc = /(?:^|\s)hover(\.\S+|)\b/,
        Ic = /^key/,
        Jc = /^(?:mouse|contextmenu)|click/,
        Nb = /^(?:focusinfocus|focusoutblur)$/,
        Ob = function(a) {
            return c.event.special.hover ? a : a.replace(Hc,
                "mouseenter$1 mouseleave$1")
        };
    c.event = {
        add: function(a, b, d, g, h) {
            var k, n, e, j, l, m, La, p, q;
            if (!(3 === a.nodeType || 8 === a.nodeType || !b || !d || !(k = c._data(a)))) {
                d.handler && (La = d, d = La.handler, h = La.selector);
                d.guid || (d.guid = c.guid++);
                e = k.events;
                e || (k.events = e = {});
                n = k.handle;
                n || (k.handle = n = function(a) {
                    return "undefined" !== typeof c && (!a || c.event.triggered !== a.type) ? c.event.dispatch.apply(n.elem, arguments) : f
                }, n.elem = a);
                b = c.trim(Ob(b)).split(" ");
                for (k = 0; k < b.length; k++) {
                    j = Mb.exec(b[k]) || [];
                    l = j[1];
                    m = (j[2] || "").split(".").sort();
                    q = c.event.special[l] || {};
                    l = (h ? q.delegateType : q.bindType) || l;
                    q = c.event.special[l] || {};
                    j = c.extend({
                        type: l,
                        origType: j[1],
                        data: g,
                        handler: d,
                        guid: d.guid,
                        selector: h,
                        namespace: m.join(".")
                    }, La);
                    p = e[l];
                    if (!p && (p = e[l] = [], p.delegateCount = 0, !q.setup || !1 === q.setup.call(a, g, m, n))) a.addEventListener ? a.addEventListener(l, n, !1) : a.attachEvent && a.attachEvent("on" + l, n);
                    q.add && (q.add.call(a, j), j.handler.guid || (j.handler.guid = d.guid));
                    h ? p.splice(p.delegateCount++, 0, j) : p.push(j);
                    c.event.global[l] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function(a,
            b, d, g, h) {
            var k, n, e, f, j, l, m, p, q, r, F = c.hasData(a) && c._data(a);
            if (F && (m = F.events)) {
                b = c.trim(Ob(b || "")).split(" ");
                for (k = 0; k < b.length; k++)
                    if (n = Mb.exec(b[k]) || [], e = f = n[1], n = n[2], e) {
                        p = c.event.special[e] || {};
                        e = (g ? p.delegateType : p.bindType) || e;
                        q = m[e] || [];
                        j = q.length;
                        n = n ? RegExp("(^|\\.)" + n.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (l = 0; l < q.length; l++)
                            if (r = q[l], (h || f === r.origType) && (!d || d.guid === r.guid) && (!n || n.test(r.namespace)) && (!g || g === r.selector || "**" === g && r.selector)) q.splice(l--, 1), r.selector &&
                                q.delegateCount--, p.remove && p.remove.call(a, r);
                        0 === q.length && j !== q.length && ((!p.teardown || !1 === p.teardown.call(a, n, F.handle)) && c.removeEvent(a, e, F.handle), delete m[e])
                    } else
                        for (e in m) c.event.remove(a, e + b[k], d, g, !0);
                c.isEmptyObject(m) && (delete F.handle, c.removeData(a, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(a, b, d, g) {
            if (!d || !(3 === d.nodeType || 8 === d.nodeType)) {
                var h, k, n, j, w, l, m = a.type || a;
                n = [];
                if (!Nb.test(m + c.event.triggered) && (0 <= m.indexOf("!") && (m = m.slice(0, -1), h = !0), 0 <= m.indexOf(".") && (n = m.split("."), m = n.shift(), n.sort()), d && !c.event.customEvent[m] || c.event.global[m]))
                    if (a = "object" === typeof a ? a[c.expando] ? a : new c.Event(m, a) : new c.Event(m), a.type = m, a.isTrigger = !0, a.exclusive = h, a.namespace = n.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" + n.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n = 0 > m.indexOf(":") ? "on" + m : "", d) {
                        if (a.result = f, a.target || (a.target = d), b = null != b ? c.makeArray(b) : [], b.unshift(a), j = c.event.special[m] || {}, !(j.trigger && !1 === j.trigger.apply(d,
                                b))) {
                            l = [
                                [d, j.bindType || m]
                            ];
                            if (!g && !j.noBubble && !c.isWindow(d)) {
                                w = j.delegateType || m;
                                h = Nb.test(w + m) ? d : d.parentNode;
                                for (k = d; h; h = h.parentNode) l.push([h, w]), k = h;
                                if (k === (d.ownerDocument || u)) l.push([k.defaultView || k.parentWindow || e, w])
                            }
                            for (k = 0; k < l.length && !a.isPropagationStopped(); k++) h = l[k][0], a.type = l[k][1], (w = (c._data(h, "events") || {})[a.type] && c._data(h, "handle")) && w.apply(h, b), (w = n && h[n]) && (c.acceptData(h) && !1 === w.apply(h, b)) && a.preventDefault();
                            a.type = m;
                            if (!g && !a.isDefaultPrevented() && (!j._default ||
                                    !1 === j._default.apply(d.ownerDocument, b)) && !("click" === m && c.nodeName(d, "a")) && c.acceptData(d))
                                if (n && d[m] && ("focus" !== m && "blur" !== m || 0 !== a.target.offsetWidth) && !c.isWindow(d))(k = d[n]) && (d[n] = null), c.event.triggered = m, d[m](), c.event.triggered = f, k && (d[n] = k);
                            return a.result
                        }
                    } else
                        for (k in d = c.cache, d) d[k].events && d[k].events[m] && c.event.trigger(a, b, d[k].handle.elem, !0)
            }
        },
        dispatch: function(a) {
            a = c.event.fix(a || e.event);
            var b, d, g, h, k, n, j, m = (c._data(this, "events") || {})[a.type] || [],
                l = m.delegateCount,
                p = [].slice.call(arguments),
                q = !a.exclusive && !a.namespace,
                r = c.event.special[a.type] || {},
                F = [];
            p[0] = a;
            a.delegateTarget = this;
            if (!(r.preDispatch && !1 === r.preDispatch.call(this, a))) {
                if (l && !(a.button && "click" === a.type)) {
                    g = c(this);
                    g.context = this;
                    for (d = a.target; d != this; d = d.parentNode || this)
                        if (!0 !== d.disabled || "click" !== a.type) {
                            k = {};
                            n = [];
                            g[0] = d;
                            for (b = 0; b < l; b++) h = m[b], j = h.selector, k[j] === f && (k[j] = g.is(j)), k[j] && n.push(h);
                            n.length && F.push({
                                elem: d,
                                matches: n
                            })
                        }
                }
                m.length > l && F.push({
                    elem: this,
                    matches: m.slice(l)
                });
                for (b = 0; b < F.length && !a.isPropagationStopped(); b++) {
                    g =
                        F[b];
                    a.currentTarget = g.elem;
                    for (d = 0; d < g.matches.length && !a.isImmediatePropagationStopped(); d++)
                        if (h = g.matches[d], q || !a.namespace && !h.namespace || a.namespace_re && a.namespace_re.test(h.namespace)) a.data = h.data, a.handleObj = h, h = ((c.event.special[h.origType] || {}).handle || h.handler).apply(g.elem, p), h !== f && (a.result = h, !1 === h && (a.preventDefault(), a.stopPropagation()))
                }
                r.postDispatch && r.postDispatch.call(this, a);
                return a.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(a, b) {
                null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var d, c, h = b.button,
                    k = b.fromElement;
                null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || u, c = d.documentElement, d = d.body, a.pageX = b.clientX + (c && c.scrollLeft || d && d.scrollLeft || 0) - (c && c.clientLeft ||
                    d && d.clientLeft || 0), a.pageY = b.clientY + (c && c.scrollTop || d && d.scrollTop || 0) - (c && c.clientTop || d && d.clientTop || 0));
                !a.relatedTarget && k && (a.relatedTarget = k === a.target ? b.toElement : k);
                !a.which && h !== f && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function(a) {
            if (a[c.expando]) return a;
            var b, d, g = a,
                h = c.event.fixHooks[a.type] || {},
                k = h.props ? this.props.concat(h.props) : this.props;
            a = c.Event(g);
            for (b = k.length; b;) d = k[--b], a[d] = g[d];
            a.target || (a.target = g.srcElement || u);
            3 === a.target.nodeType && (a.target = a.target.parentNode);
            a.metaKey = !!a.metaKey;
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {
                setup: c.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, d) {
                    c.isWindow(this) && (this.onbeforeunload = d)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, d, g) {
            a = c.extend(new c.Event, d, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            g ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
            a.isDefaultPrevented() &&
                d.preventDefault()
        }
    };
    c.event.handle = c.event.dispatch;
    c.removeEvent = u.removeEventListener ? function(a, b, d) {
        a.removeEventListener && a.removeEventListener(b, d, !1)
    } : function(a, b, d) {
        b = "on" + b;
        a.detachEvent && ("undefined" === typeof a[b] && (a[b] = null), a.detachEvent(b, d))
    };
    c.Event = function(a, b) {
        if (!(this instanceof c.Event)) return new c.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? t : s) : this.type =
            a;
        b && c.extend(this, b);
        this.timeStamp = a && a.timeStamp || c.now();
        this[c.expando] = !0
    };
    c.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = t;
            var a = this.originalEvent;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = t;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = t;
            this.stopPropagation()
        },
        isDefaultPrevented: s,
        isPropagationStopped: s,
        isImmediatePropagationStopped: s
    };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        c.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var g, h = a.relatedTarget,
                    k = a.handleObj;
                if (!h || h !== this && !c.contains(this, h)) a.type = k.origType, g = k.handler.apply(this, arguments), a.type = b;
                return g
            }
        }
    });
    c.support.submitBubbles || (c.event.special.submit = {
        setup: function() {
            if (c.nodeName(this, "form")) return !1;
            c.event.add(this, "click._submit keypress._submit", function(a) {
                a = a.target;
                if ((a = c.nodeName(a,
                        "input") || c.nodeName(a, "button") ? a.form : f) && !c._data(a, "_submit_attached")) c.event.add(a, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }), c._data(a, "_submit_attached", !0)
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            if (c.nodeName(this, "form")) return !1;
            c.event.remove(this, "._submit")
        }
    });
    c.support.changeBubbles || (c.event.special.change = {
        setup: function() {
            if (gb.test(this.nodeName)) {
                if ("checkbox" ===
                    this.type || "radio" === this.type) c.event.add(this, "propertychange._change", function(a) {
                    "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                }), c.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1);
                    c.event.simulate("change", this, a, !0)
                });
                return !1
            }
            c.event.add(this, "beforeactivate._change", function(a) {
                a = a.target;
                gb.test(a.nodeName) && !c._data(a, "_change_attached") && (c.event.add(a, "change._change", function(a) {
                    this.parentNode && (!a.isSimulated && !a.isTrigger) &&
                        c.event.simulate("change", this.parentNode, a, !0)
                }), c._data(a, "_change_attached", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            c.event.remove(this, "._change");
            return gb.test(this.nodeName)
        }
    });
    c.support.focusinBubbles || c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0,
            g = function(a) {
                c.event.simulate(b, a.target, c.event.fix(a), !0)
            };
        c.event.special[b] = {
            setup: function() {
                0 === d++ && u.addEventListener(a, g, !0)
            },
            teardown: function() {
                0 === --d && u.removeEventListener(a, g, !0)
            }
        }
    });
    c.fn.extend({
        on: function(a, b, d, g, h) {
            var k, n;
            if ("object" === typeof a) {
                "string" !== typeof b && (d = d || b, b = f);
                for (n in a) this.on(n, b, d, a[n], h);
                return this
            }
            null == d && null == g ? (g = b, d = b = f) : null == g && ("string" === typeof b ? (g = d, d = f) : (g = d, d = b, b = f));
            if (!1 === g) g = s;
            else if (!g) return this;
            1 === h && (k = g, g = function(a) {
                c().off(a);
                return k.apply(this, arguments)
            }, g.guid = k.guid || (k.guid = c.guid++));
            return this.each(function() {
                c.event.add(this,
                    a, g, d, b)
            })
        },
        one: function(a, b, d, c) {
            return this.on(a, b, d, c, 1)
        },
        off: function(a, b, d) {
            var g;
            if (a && a.preventDefault && a.handleObj) return g = a.handleObj, c(a.delegateTarget).off(g.namespace ? g.origType + "." + g.namespace : g.origType, g.selector, g.handler), this;
            if ("object" === typeof a) {
                for (g in a) this.off(g, b, a[g]);
                return this
            }
            if (!1 === b || "function" === typeof b) d = b, b = f;
            !1 === d && (d = s);
            return this.each(function() {
                c.event.remove(this, a, d, b)
            })
        },
        bind: function(a, b, d) {
            return this.on(a, null, b, d)
        },
        unbind: function(a, b) {
            return this.off(a,
                null, b)
        },
        live: function(a, b, d) {
            c(this.context).on(a, this.selector, b, d);
            return this
        },
        die: function(a, b) {
            c(this.context).off(a, this.selector || "**", b);
            return this
        },
        delegate: function(a, b, d, c) {
            return this.on(b, a, d, c)
        },
        undelegate: function(a, b, d) {
            return 1 == arguments.length ? this.off(a, "**") : this.off(b, a || "**", d)
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) return c.event.trigger(a, b, this[0], !0)
        },
        toggle: function(a) {
            var b = arguments,
                d =
                a.guid || c.guid++,
                g = 0,
                h = function(d) {
                    var h = (c._data(this, "lastToggle" + a.guid) || 0) % g;
                    c._data(this, "lastToggle" + a.guid, h + 1);
                    d.preventDefault();
                    return b[h].apply(this, arguments) || !1
                };
            for (h.guid = d; g < b.length;) b[g++].guid = d;
            return this.click(h)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function(a, b) {
            c.fn[b] = function(a, c) {
                null == c && (c = a, a = null);
                return 0 < arguments.length ? this.on(b, null, a, c) : this.trigger(b)
            };
            Ic.test(b) && (c.event.fixHooks[b] = c.event.keyHooks);
            Jc.test(b) && (c.event.fixHooks[b] = c.event.mouseHooks)
        });
    var Pb = function(a, b, d, c) {
            for (var h = 0, k = b.length; h < k; h++) D(a, b[h], d, c)
        },
        Kc = function(a, b, d) {
            var c = b.dir,
                h = Qb++;
            a || (a = function(a) {
                return a === d
            });
            return b.first ? function(b, d) {
                for (; b = b[c];)
                    if (1 === b.nodeType) return a(b, d) && b
            } : function(b, d) {
                for (var e, f = h + "." + Rb, j = f + "." + Sb; b = b[c];)
                    if (1 ===
                        b.nodeType) {
                        if ((e = b[W]) === j) return b.sizset;
                        if ("string" === typeof e && 0 === e.indexOf(f)) {
                            if (b.sizset) return b
                        } else {
                            b[W] = j;
                            if (a(b, d)) return b.sizset = !0, b;
                            b.sizset = !1
                        }
                    }
            }
        },
        Lc = function(a, b) {
            return a ? function(d, c) {
                var h = b(d, c);
                return h && a(!0 === h ? d : h, c)
            } : b
        },
        Sb, Rb, Ua, Ga, hb, Y = e.document,
        T = Y.documentElement,
        Va = !1,
        Tb = !0,
        Qb = 0,
        da = [].slice,
        va = [].push,
        W = ("sizcache" + Math.random()).replace(".", ""),
        Ub = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
        "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
        ib = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + Ub + "|" + ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)".replace(2, 7) + "|[^\\\\(),])+",
        jb = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
        Wa = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
        kb = RegExp(ib + "?(?=[\\x20\\t\\r\\n\\f]*,|$)", "g"),
        Vb = RegExp("^(?:(?!,)(?:(?:^|,)[\\x20\\t\\r\\n\\f]*" +
            ib + ")*?|[\\x20\\t\\r\\n\\f]*(.*?))(\\)|$)"),
        Mc = RegExp(ib.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|[\\x20\\t\\r\\n\\f]*([\\x20\\t\\r\\n\\f>+~])[\\x20\\t\\r\\n\\f]*", "g"),
        Nc = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        lb = /[\x20\t\r\n\f]*[+~]/,
        Oc = /:not\($/,
        Pc = /h\d/i,
        Qc = /input|select|textarea|button/i,
        wa = /\\(?!\\)/g,
        ea = {
            ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
            TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("[-",
                "[-\\*") + ")"),
            ATTR: RegExp("^" + Ub),
            PSEUDO: RegExp("^:((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)"),
            CHILD: RegExp("^:(only|nth|last|first)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
            POS: RegExp(":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", "ig"),
            needsContext: /^[\x20\t\r\n\f]*[>+~]|:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\)|)(?=[^-]|$)/i
        },
        mb = {},
        nb = [],
        ob = {},
        pb = [],
        Xa = function(a) {
            a.sizzleFilter = !0;
            return a
        },
        Ha = function(a) {
            return function(b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        },
        Wb = function(a) {
            return function(b) {
                var d = b.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && b.type === a
            }
        },
        fa = function(a) {
            var b = !1,
                d = Y.createElement("div");
            try {
                b = a(d)
            } catch (c) {}
            return b
        },
        Rc = fa(function(a) {
            a.innerHTML = "<select></select>";
            a = typeof a.lastChild.getAttribute("multiple");
            return "boolean" !== a && "string" !== a
        }),
        Sc = fa(function(a) {
            a.id =
                W + 0;
            a.innerHTML = "<a name='" + W + "'></a><div name='" + W + "'></div>";
            T.insertBefore(a, T.firstChild);
            var b = Y.getElementsByName && Y.getElementsByName(W).length === 2 + Y.getElementsByName(W + 0).length;
            hb = !Y.getElementById(W);
            T.removeChild(a);
            return b
        }),
        Tc = fa(function(a) {
            a.appendChild(Y.createComment(""));
            return 0 === a.getElementsByTagName("*").length
        }),
        Uc = fa(function(a) {
            a.innerHTML = "<a href='#'></a>";
            return a.firstChild && "undefined" !== typeof a.firstChild.getAttribute && "#" === a.firstChild.getAttribute("href")
        }),
        Xb =
        fa(function(a) {
            a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
            if (!a.getElementsByClassName || 0 === a.getElementsByClassName("e").length) return !1;
            a.lastChild.className = "e";
            return 1 !== a.getElementsByClassName("e").length
        }),
        D = function(a, b, d, c) {
            d = d || [];
            b = b || Y;
            var h, k, n, e, f = b.nodeType;
            if (1 !== f && 9 !== f) return [];
            if (!a || "string" !== typeof a) return d;
            n = qb(b);
            if (!n && !c && (h = Nc.exec(a)))
                if (e = h[1])
                    if (9 === f)
                        if ((k = b.getElementById(e)) && k.parentNode) {
                            if (k.id === e) return d.push(k), d
                        } else return d;
            else {
                if (b.ownerDocument && (k = b.ownerDocument.getElementById(e)) && Vc(b, k) && k.id === e) return d.push(k), d
            } else {
                if (h[2]) return va.apply(d, da.call(b.getElementsByTagName(a), 0)), d;
                if ((e = h[3]) && Xb && b.getElementsByClassName) return va.apply(d, da.call(b.getElementsByClassName(e), 0)), d
            }
            return rb(a, b, d, c, n)
        },
        E = D.selectors = {
            cacheLength: 50,
            match: ea,
            order: ["ID", "TAG"],
            attrHandle: {},
            createPseudo: Xa,
            find: {
                ID: hb ? function(a, b, d) {
                    if ("undefined" !== typeof b.getElementById && !d) return (a = b.getElementById(a)) && a.parentNode ? [a] : []
                } : function(a, b, d) {
                    if ("undefined" !== typeof b.getElementById && !d) return (b = b.getElementById(a)) ? b.id === a || "undefined" !== typeof b.getAttributeNode && b.getAttributeNode("id").value === a ? [b] : void 0 : []
                },
                TAG: Tc ? function(a, b) {
                    if ("undefined" !== typeof b.getElementsByTagName) return b.getElementsByTagName(a)
                } : function(a, b) {
                    var d = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (var c, h = [], k = 0; c = d[k]; k++) 1 === c.nodeType && h.push(c);
                        return h
                    }
                    return d
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    a[1] = a[1].replace(wa, "");
                    a[3] = (a[4] || a[5] || "").replace(wa, "");
                    "~=" === a[2] && (a[3] = " " + a[3] + " ");
                    return a.slice(0, 4)
                },
                CHILD: function(a) {
                    a[1] = a[1].toLowerCase();
                    "nth" === a[1] ? (a[2] || D.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])), a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && D.error(a[0]);
                    return a
                },
                PSEUDO: function(a) {
                    var b, d = a[4];
                    if (ea.CHILD.test(a[0])) return null;
                    if (d && (b = Vb.exec(d)) && b.pop()) a[0] =
                        a[0].slice(0, b[0].length - d.length - 1), d = b[0].slice(0, -1);
                    a.splice(2, 3, d || a[3]);
                    return a
                }
            },
            filter: {
                ID: hb ? function(a) {
                    a = a.replace(wa, "");
                    return function(b) {
                        return b.getAttribute("id") === a
                    }
                } : function(a) {
                    a = a.replace(wa, "");
                    return function(b) {
                        return (b = "undefined" !== typeof b.getAttributeNode && b.getAttributeNode("id")) && b.value === a
                    }
                },
                TAG: function(a) {
                    if ("*" === a) return function() {
                        return !0
                    };
                    a = a.replace(wa, "").toLowerCase();
                    return function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    }
                },
                CLASS: function(a) {
                    var b =
                        mb[a];
                    b || (b = mb[a] = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)"), nb.push(a), nb.length > E.cacheLength && delete mb[nb.shift()]);
                    return function(a) {
                        return b.test(a.className || "undefined" !== typeof a.getAttribute && a.getAttribute("class") || "")
                    }
                },
                ATTR: function(a, b, d) {
                    return !b ? function(b) {
                        return null != D.attr(b, a)
                    } : function(c) {
                        c = D.attr(c, a);
                        var h = c + "";
                        if (null == c) return "!=" === b;
                        switch (b) {
                            case "=":
                                return h === d;
                            case "!=":
                                return h !== d;
                            case "^=":
                                return d && 0 === h.indexOf(d);
                            case "*=":
                                return d && -1 < h.indexOf(d);
                            case "$=":
                                return d && h.substr(h.length - d.length) === d;
                            case "~=":
                                return -1 < (" " + h + " ").indexOf(d);
                            case "|=":
                                return h === d || h.substr(0, d.length + 1) === d + "-"
                        }
                    }
                },
                CHILD: function(a, b, d, c) {
                    if ("nth" === a) {
                        var h = Qb++;
                        return function(a) {
                            var b, e = 0,
                                f = a;
                            if (1 === d && 0 === c) return !0;
                            if ((b = a.parentNode) && (b[W] !== h || !a.sizset)) {
                                for (f = b.firstChild; f && !(1 === f.nodeType && (f.sizset = ++e, f === a)); f = f.nextSibling);
                                b[W] = h
                            }
                            a = a.sizset - c;
                            return 0 === d ? 0 === a : 0 === a % d && 0 <= a / d
                        }
                    }
                    return function(b) {
                        var d = b;
                        switch (a) {
                            case "only":
                            case "first":
                                for (; d =
                                    d.previousSibling;)
                                    if (1 === d.nodeType) return !1;
                                if ("first" === a) return !0;
                                d = b;
                            case "last":
                                for (; d = d.nextSibling;)
                                    if (1 === d.nodeType) return !1;
                                return !0
                        }
                    }
                },
                PSEUDO: function(a, b, d, c) {
                    var h = E.pseudos[a] || E.pseudos[a.toLowerCase()];
                    h || D.error("unsupported pseudo: " + a);
                    return !h.sizzleFilter ? h : h(b, d, c)
                }
            },
            pseudos: {
                not: Xa(function(a, b, d) {
                    var c = Yb(a.replace(jb, "$1"), b, d);
                    return function(a) {
                        return !c(a)
                    }
                }),
                enabled: function(a) {
                    return !1 === a.disabled
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    var b =
                        a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return !0 === a.selected
                },
                parent: function(a) {
                    return !E.pseudos.empty(a)
                },
                empty: function(a) {
                    var b;
                    for (a = a.firstChild; a;) {
                        if ("@" < a.nodeName || 3 === (b = a.nodeType) || 4 === b) return !1;
                        a = a.nextSibling
                    }
                    return !0
                },
                contains: Xa(function(a) {
                    return function(b) {
                        return -1 < (b.textContent || b.innerText || sb(b)).indexOf(a)
                    }
                }),
                has: Xa(function(a) {
                    return function(b) {
                        return 0 < D(a, b).length
                    }
                }),
                header: function(a) {
                    return Pc.test(a.nodeName)
                },
                text: function(a) {
                    var b, d;
                    return "input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (d = a.getAttribute("type")) || d.toLowerCase() === b)
                },
                radio: Ha("radio"),
                checkbox: Ha("checkbox"),
                file: Ha("file"),
                password: Ha("password"),
                image: Ha("image"),
                submit: Wb("submit"),
                reset: Wb("reset"),
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                input: function(a) {
                    return Qc.test(a.nodeName)
                },
                focus: function(a) {
                    var b =
                        a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && !(!a.type && !a.href)
                },
                active: function(a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(a, b, d) {
                    return d ? a.slice(1) : [a[0]]
                },
                last: function(a, b, d) {
                    b = a.pop();
                    return d ? a : [b]
                },
                even: function(a, b, d) {
                    b = [];
                    d = d ? 1 : 0;
                    for (var c = a.length; d < c; d += 2) b.push(a[d]);
                    return b
                },
                odd: function(a, b, d) {
                    b = [];
                    d = d ? 0 : 1;
                    for (var c = a.length; d < c; d += 2) b.push(a[d]);
                    return b
                },
                lt: function(a, b, d) {
                    return d ? a.slice(+b) : a.slice(0, +b)
                },
                gt: function(a,
                    b, d) {
                    return d ? a.slice(0, +b + 1) : a.slice(+b + 1)
                },
                eq: function(a, b, d) {
                    b = a.splice(+b, 1);
                    return d ? a : b
                }
            }
        };
    E.setFilters.nth = E.setFilters.eq;
    E.filters = E.pseudos;
    Uc || (E.attrHandle = {
        href: function(a) {
            return a.getAttribute("href", 2)
        },
        type: function(a) {
            return a.getAttribute("type")
        }
    });
    Sc && (E.order.push("NAME"), E.find.NAME = function(a, b) {
        if ("undefined" !== typeof b.getElementsByName) return b.getElementsByName(a)
    });
    Xb && (E.order.splice(1, 0, "CLASS"), E.find.CLASS = function(a, b, d) {
        if ("undefined" !== typeof b.getElementsByClassName &&
            !d) return b.getElementsByClassName(a)
    });
    try {
        da.call(T.childNodes, 0)[0].nodeType
    } catch (Dd) {
        da = function(a) {
            for (var b, d = []; b = this[a]; a++) d.push(b);
            return d
        }
    }
    var qb = D.isXML = function(a) {
            return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        },
        Vc = D.contains = T.compareDocumentPosition ? function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : T.contains ? function(a, b) {
            var d = 9 === a.nodeType ? a.documentElement : a,
                c = b.parentNode;
            return a === c || !(!c || !(1 === c.nodeType && d.contains && d.contains(c)))
        } : function(a,
            b) {
            for (; b = b.parentNode;)
                if (b === a) return !0;
            return !1
        },
        sb = D.getText = function(a) {
            var b, d = "",
                c = 0;
            if (b = a.nodeType)
                if (1 === b || 9 === b || 11 === b) {
                    if ("string" === typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) d += sb(a)
                } else {
                    if (3 === b || 4 === b) return a.nodeValue
                } else
                for (; b = a[c]; c++) d += sb(b);
            return d
        };
    D.attr = function(a, b) {
        var d;
        (d = qb(a)) || (b = b.toLowerCase());
        return E.attrHandle[b] ? E.attrHandle[b](a) : Rc || d ? a.getAttribute(b) : (d = a.getAttributeNode(b)) ? "boolean" === typeof a[b] ? a[b] ? b : null :
            d.specified ? d.value : null : null
    };
    D.error = function(a) {
        throw Error("Syntax error, unrecognized expression: " + a);
    };
    [0, 0].sort(function() {
        return Tb = 0
    });
    T.compareDocumentPosition ? Ua = function(a, b) {
        return a === b ? (Va = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
    } : (Ua = function(a, b) {
        if (a === b) return Va = !0, 0;
        if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
        var d, c, h = [],
            k = [];
        d = a.parentNode;
        c = b.parentNode;
        var n = d;
        if (d ===
            c) return Ga(a, b);
        if (d) {
            if (!c) return 1
        } else return -1;
        for (; n;) h.unshift(n), n = n.parentNode;
        for (n = c; n;) k.unshift(n), n = n.parentNode;
        d = h.length;
        c = k.length;
        for (n = 0; n < d && n < c; n++)
            if (h[n] !== k[n]) return Ga(h[n], k[n]);
        return n === d ? Ga(a, k[n], -1) : Ga(h[n], b, 1)
    }, Ga = function(a, b, c) {
        if (a === b) return c;
        for (a = a.nextSibling; a;) {
            if (a === b) return -1;
            a = a.nextSibling
        }
        return 1
    });
    D.uniqueSort = function(a) {
        var b, c = 1;
        if (Ua && (Va = Tb, a.sort(Ua), Va))
            for (; b = a[c]; c++) b === a[c - 1] && a.splice(c--, 1);
        return a
    };
    var Yb = D.compile = function(a, b,
        c) {
        var g, h, k = ob[a];
        if (k && k.context === b) return k;
        var n, e = [];
        g = 0;
        for (var f = Vb.exec(a), j = !f.pop() && !f.pop(), m = j && a.match(kb) || [""], l = E.preFilter, p = E.filter, q = !c && b !== Y; null != (n = m[g]) && j; g++) {
            e.push(k = []);
            for (q && (n = " " + n); n;) {
                j = !1;
                if (f = Wa.exec(n)) n = n.slice(f[0].length), j = k.push({
                    part: f.pop().replace(jb, " "),
                    captures: f
                });
                for (h in p)
                    if ((f = ea[h].exec(n)) && (!l[h] || (f = l[h](f, b, c)))) n = n.slice(f.shift().length), j = k.push({
                        part: h,
                        captures: f
                    });
                if (!j) break
            }
        }
        j || D.error(a);
        for (h = 0; g = e[h]; h++) {
            k = e;
            n = h;
            f = b;
            j = c;
            l = m =
                void 0;
            for (p = 0; m = g[p]; p++) E.relative[m.part] ? l = Kc(l, E.relative[m.part], f) : (m.captures.push(f, j), l = Lc(l, E.filter[m.part].apply(null, m.captures)));
            k[n] = l
        }
        k = ob[a] = function(a, b) {
            for (var c, d = 0; c = e[d]; d++)
                if (c(a, b)) return !0;
            return !1
        };
        k.context = b;
        k.runs = k.dirruns = 0;
        pb.push(a);
        pb.length > E.cacheLength && delete ob[pb.shift()];
        return k
    };
    D.matches = function(a, b) {
        return D(a, null, null, b)
    };
    D.matchesSelector = function(a, b) {
        return 0 < D(b, null, null, [a]).length
    };
    var rb = function(a, b, c, g, h) {
        a = a.replace(jb, "$1");
        var k, n, e,
            f, j, m, l;
        f = a.match(kb);
        e = a.match(Mc);
        j = b.nodeType;
        if (ea.POS.test(a)) {
            k = a;
            var p, q, r, F, A;
            e = 0;
            j = f.length;
            m = ea.POS;
            l = RegExp("^" + m.source + "(?![\\x20\\t\\r\\n\\f])", "i");
            for (var z = function() {
                    for (var a = 1, b = arguments.length - 2; a < b; a++) void 0 === arguments[a] && (p[a] = void 0)
                }; e < j; e++) {
                m.exec("");
                k = f[e];
                h = [];
                a = 0;
                for (r = g; p = m.exec(k);)
                    if (A = m.lastIndex = p.index + p[0].length, A > a) {
                        n = k.slice(a, p.index);
                        a = A;
                        F = [b];
                        Wa.test(n) && (r && (F = r), r = g);
                        if (q = Oc.test(n)) n = n.slice(0, -5).replace(Wa, "$&*");
                        1 < p.length && p[0].replace(l, z);
                        A =
                            n;
                        var s = p[1],
                            I = p[2],
                            B = void 0,
                            K = E.setFilters[s.toLowerCase()];
                        K || D.error(s);
                        if (A || !(B = r)) Pb(A || "*", F, B = [], r);
                        r = 0 < B.length ? K(B, I, q) : []
                    }
                r ? (h = h.concat(r), (n = k.slice(a)) && ")" !== n ? Wa.test(n) ? Pb(n, h, c, g) : D(n, b, c, g ? g.concat(r) : r) : va.apply(c, h)) : D(k, b, c, g)
            }
            return 1 === j ? c : D.uniqueSort(c)
        }
        if (g) k = da.call(g, 0);
        else if (f && 1 === f.length) {
            if (1 < e.length && 9 === j && !h && (f = ea.ID.exec(e[0]))) {
                b = E.find.ID(f[1], b, h)[0];
                if (!b) return c;
                a = a.slice(e.shift().length)
            }
            n = (f = lb.exec(e[0])) && !f.index && b.parentNode || b;
            l = e.pop();
            j = l.split(":not")[0];
            g = 0;
            for (e = E.order.length; g < e; g++)
                if (m = E.order[g], f = ea[m].exec(j))
                    if (k = E.find[m]((f[1] || "").replace(wa, ""), n, h), null != k) {
                        j === l && ((a = a.slice(0, a.length - l.length) + j.replace(ea[m], "")) || va.apply(c, da.call(k, 0)));
                        break
                    }
        }
        if (a) {
            n = Yb(a, b, h);
            Rb = n.dirruns++;
            null == k && (k = E.find.TAG("*", lb.test(a) && b.parentNode || b));
            for (g = 0; f = k[g]; g++) Sb = n.runs++, n(f, b) && c.push(f)
        }
        return c
    };
    if (Y.querySelectorAll) {
        var Zb, Wc = rb,
            Xc = /'|\\/g,
            Yc = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            X = [],
            Ya = [":active"],
            Za = T.matchesSelector ||
            T.mozMatchesSelector || T.webkitMatchesSelector || T.oMatchesSelector || T.msMatchesSelector;
        fa(function(a) {
            a.innerHTML = "<select><option selected></option></select>";
            a.querySelectorAll("[selected]").length || X.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
            a.querySelectorAll(":checked").length || X.push(":checked")
        });
        fa(function(a) {
            a.innerHTML = "<p test=''></p>";
            a.querySelectorAll("[test^='']").length && X.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");
            a.innerHTML = "<input type='hidden'>";
            a.querySelectorAll(":enabled").length || X.push(":enabled", ":disabled")
        });
        X = X.length && RegExp(X.join("|"));
        rb = function(a, b, c, g, h) {
            if (!g && !h && (!X || !X.test(a)))
                if (9 === b.nodeType) try {
                        return va.apply(c, da.call(b.querySelectorAll(a), 0)), c
                    } catch (k) {} else if (1 === b.nodeType && "object" !== b.nodeName.toLowerCase()) {
                        var n = b.getAttribute("id"),
                            e = n || W,
                            f = lb.test(a) && b.parentNode || b;
                        n ? e = e.replace(Xc, "\\$&") : b.setAttribute("id", e);
                        try {
                            return va.apply(c, da.call(f.querySelectorAll(a.replace(kb, "[id='" + e + "'] $&")), 0)), c
                        } catch (j) {} finally {
                            n ||
                                b.removeAttribute("id")
                        }
                    }
            return Wc(a, b, c, g, h)
        };
        Za && (fa(function(a) {
            Zb = Za.call(a, "div");
            try {
                Za.call(a, "[test!='']:sizzle"), Ya.push(E.match.PSEUDO)
            } catch (b) {}
        }), Ya = RegExp(Ya.join("|")), D.matchesSelector = function(a, b) {
            b = b.replace(Yc, "='$1']");
            if (!qb(a) && !Ya.test(b) && (!X || !X.test(b))) try {
                var c = Za.call(a, b);
                if (c || Zb || a.document && 11 !== a.document.nodeType) return c
            } catch (g) {}
            return 0 < D(b, null, null, [a]).length
        })
    }
    D.attr = c.attr;
    c.find = D;
    c.expr = D.selectors;
    c.expr[":"] = c.expr.pseudos;
    c.unique = D.uniqueSort;
    c.text =
        D.getText;
    c.isXMLDoc = D.isXML;
    c.contains = D.contains;
    var Zc = /Until$/,
        $c = /^(?:parents|prev(?:Until|All))/,
        qc = /^.[^:#\[\.,]*$/,
        $b = c.expr.match.needsContext,
        ad = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    c.fn.extend({
        find: function(a) {
            var b, d, g, h, k, n, e = this;
            if ("string" !== typeof a) return c(a).filter(function() {
                b = 0;
                for (d = e.length; b < d; b++)
                    if (c.contains(e[b], this)) return !0
            });
            n = this.pushStack("", "find", a);
            b = 0;
            for (d = this.length; b < d; b++)
                if (g = n.length, c.find(a, this[b], n), 0 < b)
                    for (h = g; h < n.length; h++)
                        for (k = 0; k < g; k++)
                            if (n[k] ===
                                n[h]) {
                                n.splice(h--, 1);
                                break
                            }
            return n
        },
        has: function(a) {
            var b, d = c(a, this),
                g = d.length;
            return this.filter(function() {
                for (b = 0; b < g; b++)
                    if (c.contains(this, d[b])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(m(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(m(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && ("string" === typeof a ? $b.test(a) ? 0 <= c(a, this.context).index(this[0]) : 0 < c.filter(a, this).length : 0 < this.filter(a).length)
        },
        closest: function(a, b) {
            for (var d, g = 0, h = this.length, k = [], n = $b.test(a) ||
                    "string" !== typeof a ? c(a, b || this.context) : 0; g < h; g++)
                for (d = this[g]; d && d.ownerDocument && d !== b && 11 !== d.nodeType;) {
                    if (n ? -1 < n.index(d) : c.find.matchesSelector(d, a)) {
                        k.push(d);
                        break
                    }
                    d = d.parentNode
                }
            k = 1 < k.length ? c.unique(k) : k;
            return this.pushStack(k, "closest", a)
        },
        index: function(a) {
            return !a ? this[0] && this[0].parentNode ? this.prevAll().length : -1 : "string" === typeof a ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            var d = "string" === typeof a ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a),
                g = c.merge(this.get(),
                    d);
            return this.pushStack(r(d[0]) || r(g[0]) ? g : c.unique(g))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    c.fn.andSelf = c.fn.addBack;
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function(a) {
            return j(a, "nextSibling")
        },
        prev: function(a) {
            return j(a, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function(a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function(a) {
            return c.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes)
        }
    }, function(a, b) {
        c.fn[a] = function(d, g) {
            var h = c.map(this, b, d);
            Zc.test(a) || (g = d);
            g &&
                "string" === typeof g && (h = c.filter(g, h));
            h = 1 < this.length && !ad[a] ? c.unique(h) : h;
            1 < this.length && $c.test(a) && (h = h.reverse());
            return this.pushStack(h, a, U.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function(a, b, d) {
            d && (a = ":not(" + a + ")");
            return 1 === b.length ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
        },
        dir: function(a, b, d) {
            var g = [];
            for (a = a[b]; a && 9 !== a.nodeType && (d === f || 1 !== a.nodeType || !c(a).is(d));) 1 === a.nodeType && g.push(a), a = a[b];
            return g
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 ===
                a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var zb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        bd = / jQuery\d+="(?:null|\d+)"/g,
        tb = /^\s+/,
        ac = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        bc = /<([\w:]+)/,
        cd = /<tbody/i,
        dd = /<|&#?\w+;/,
        ed = /<(?:script|style|link)/i,
        fd = /<(?:script|object|embed|option|style)/i,
        ub = RegExp("<(?:" + zb + ")[\\s/>]", "i"),
        Ab = /^(?:checkbox|radio)$/,
        cc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        gd = /\/(java|ecma)script/i,
        hd = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        R = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        dc = A(u),
        vb = dc.appendChild(u.createElement("div"));
    R.optgroup =
        R.option;
    R.tbody = R.tfoot = R.colgroup = R.caption = R.thead;
    R.th = R.td;
    c.support.htmlSerialize || (R._default = [1, "X<div>", "</div>"]);
    c.fn.extend({
        text: function(a) {
            return c.access(this, function(a) {
                return a === f ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || u).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return c.isFunction(a) ? this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = c(this),
                    d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = c.isFunction(a);
            return this.each(function(d) {
                c(this).wrapAll(b ? a.call(this, d) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") ||
                    c(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (!r(this[0])) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = c.clean(arguments);
                return this.pushStack(c.merge(a,
                    this), "before", this.selector)
            }
        },
        after: function() {
            if (!r(this[0])) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = c.clean(arguments);
                return this.pushStack(c.merge(this, a), "after", this.selector)
            }
        },
        remove: function(a, b) {
            for (var d, g = 0; null != (d = this[g]); g++)
                if (!a || c.filter(a, [d]).length) !b && 1 === d.nodeType && (c.cleanData(d.getElementsByTagName("*")), c.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var a,
                    b = 0; null != (a = this[b]); b++)
                for (1 === a.nodeType && c.cleanData(a.getElementsByTagName("*")); a.firstChild;) a.removeChild(a.firstChild);
            return this
        },
        clone: function(a, b) {
            a = null == a ? !1 : a;
            b = null == b ? a : b;
            return this.map(function() {
                return c.clone(this, a, b)
            })
        },
        html: function(a) {
            return c.access(this, function(a) {
                var d = this[0] || {},
                    g = 0,
                    h = this.length;
                if (a === f) return 1 === d.nodeType ? d.innerHTML.replace(bd, "") : f;
                if ("string" === typeof a && !ed.test(a) && (c.support.htmlSerialize || !ub.test(a)) && (c.support.leadingWhitespace || !tb.test(a)) &&
                    !R[(bc.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(ac, "<$1></$2>");
                    try {
                        for (; g < h; g++) d = this[g] || {}, 1 === d.nodeType && (c.cleanData(d.getElementsByTagName("*")), d.innerHTML = a);
                        d = 0
                    } catch (k) {}
                }
                d && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            if (!r(this[0])) {
                if (c.isFunction(a)) return this.each(function(b) {
                    var d = c(this),
                        g = d.html();
                    d.replaceWith(a.call(this, b, g))
                });
                "string" !== typeof a && (a = c(a).detach());
                return this.each(function() {
                    var b = this.nextSibling,
                        d = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(d).append(a)
                })
            }
            return this.length ? this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, d) {
            a = [].concat.apply([], a);
            var g, h, k, n = 0,
                e = a[0],
                j = [],
                m = this.length;
            if (!c.support.checkClone && 1 < m && "string" === typeof e && cc.test(e)) return this.each(function() {
                c(this).domManip(a, b, d)
            });
            if (c.isFunction(e)) return this.each(function(g) {
                var h = c(this);
                a[0] = e.call(this, g, b ? h.html() : f);
                h.domManip(a, b, d)
            });
            if (this[0]) {
                g = c.buildFragment(a,
                    this, j);
                k = g.fragment;
                h = k.firstChild;
                1 === k.childNodes.length && (k = h);
                if (h) {
                    b = b && c.nodeName(h, "tr");
                    for (g = g.cacheable || m - 1; n < m; n++) d.call(b && c.nodeName(this[n], "table") ? this[n].getElementsByTagName("tbody")[0] || this[n].appendChild(this[n].ownerDocument.createElement("tbody")) : this[n], n === g ? k : c.clone(k, !0, !0))
                }
                k = h = null;
                j.length && c.each(j, function(a, b) {
                    b.src ? c.ajax ? c.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : c.error("no ajax") : c.globalEval((b.text || b.textContent || b.innerHTML ||
                        "").replace(hd, ""));
                    b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    });
    c.buildFragment = function(a, b, d) {
        var g, h, k, n = a[0];
        b = b || u;
        b = (b[0] || b).ownerDocument || b[0] || b;
        "undefined" === typeof b.createDocumentFragment && (b = u);
        if (1 === a.length && "string" === typeof n && 512 > n.length && b === u && "<" === n.charAt(0) && !fd.test(n) && (c.support.checkClone || !cc.test(n)) && (c.support.html5Clone || !ub.test(n))) h = !0, g = c.fragments[n], k = g !== f;
        g || (g = b.createDocumentFragment(), c.clean(a, b, g, d), h && (c.fragments[n] = k && g));
        return {
            fragment: g,
            cacheable: h
        }
    };
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(d) {
            var g, h = 0,
                k = [];
            d = c(d);
            var n = d.length;
            g = 1 === this.length && this[0].parentNode;
            if ((null == g || g && 11 === g.nodeType && 1 === g.childNodes.length) && 1 === n) return d[b](this[0]), this;
            for (; h < n; h++) g = (0 < h ? this.clone(!0) : this).get(), c(d[h])[b](g), k = k.concat(g);
            return this.pushStack(k, a, d.selector)
        }
    });
    c.extend({
        clone: function(a, b, d) {
            var g, h, k,
                n;
            c.support.html5Clone || c.isXMLDoc(a) || !ub.test("<" + a.nodeName + ">") ? n = a.cloneNode(!0) : (vb.innerHTML = a.outerHTML, vb.removeChild(n = vb.firstChild));
            if ((!c.support.noCloneEvent || !c.support.noCloneChecked) && (1 === a.nodeType || 11 === a.nodeType) && !c.isXMLDoc(a)) {
                K(a, n);
                g = B(a);
                h = B(n);
                for (k = 0; g[k]; ++k) h[k] && K(g[k], h[k])
            }
            if (b && (z(a, n), d)) {
                g = B(a);
                h = B(n);
                for (k = 0; g[k]; ++k) z(g[k], h[k])
            }
            return n
        },
        clean: function(a, b, d, g) {
            var h, k, n, e, f, j, m = 0,
                l = [];
            if (!b || "undefined" === typeof b.createDocumentFragment) b = u;
            for (k = b === u &&
                dc; null != (n = a[m]); m++)
                if ("number" === typeof n && (n += ""), n) {
                    if ("string" === typeof n)
                        if (dd.test(n)) {
                            k = k || A(b);
                            j = j || k.appendChild(b.createElement("div"));
                            n = n.replace(ac, "<$1></$2>");
                            h = (bc.exec(n) || ["", ""])[1].toLowerCase();
                            e = R[h] || R._default;
                            f = e[0];
                            for (j.innerHTML = e[1] + n + e[2]; f--;) j = j.lastChild;
                            if (!c.support.tbody) {
                                f = cd.test(n);
                                e = "table" === h && !f ? j.firstChild && j.firstChild.childNodes : "<table>" === e[1] && !f ? j.childNodes : [];
                                for (h = e.length - 1; 0 <= h; --h) c.nodeName(e[h], "tbody") && !e[h].childNodes.length && e[h].parentNode.removeChild(e[h])
                            }!c.support.leadingWhitespace &&
                                tb.test(n) && j.insertBefore(b.createTextNode(tb.exec(n)[0]), j.firstChild);
                            n = j.childNodes;
                            j = k.lastChild
                        } else n = b.createTextNode(n);
                    n.nodeType ? l.push(n) : l = c.merge(l, n)
                }
            j && (k.removeChild(j), n = j = k = null);
            if (!c.support.appendChecked)
                for (m = 0; null != (n = l[m]); m++) c.nodeName(n, "input") ? q(n) : "undefined" !== typeof n.getElementsByTagName && c.grep(n.getElementsByTagName("input"), q);
            if (d) {
                a = function(a) {
                    if (!a.type || gd.test(a.type)) return g ? g.push(a.parentNode ? a.parentNode.removeChild(a) : a) : d.appendChild(a)
                };
                for (m = 0; null !=
                    (n = l[m]); m++)
                    if (!c.nodeName(n, "script") || !a(n)) d.appendChild(n), "undefined" !== typeof n.getElementsByTagName && (n = c.grep(c.merge([], n.getElementsByTagName("script")), a), l.splice.apply(l, [m + 1, 0].concat(n)), m += n.length)
            }
            return l
        },
        cleanData: function(a, b) {
            for (var d, g, h, k, n = 0, e = c.expando, f = c.cache, j = c.support.deleteExpando, m = c.event.special; null != (h = a[n]); n++)
                if (b || c.acceptData(h))
                    if (d = (g = h[e]) && f[g]) {
                        if (d.events)
                            for (k in d.events) m[k] ? c.event.remove(h, k) : c.removeEvent(h, k, d.handle);
                        f[g] && (delete f[g], j ?
                            delete h[e] : h.removeAttribute ? h.removeAttribute(e) : h[e] = null, c.deletedIds.push(g))
                    }
        }
    });
    var $a, xa;
    c.uaMatch = function(a) {
        a = a.toLowerCase();
        a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
        return {
            browser: a[1] || "",
            version: a[2] || "0"
        }
    };
    $a = c.uaMatch(ta.userAgent);
    xa = {};
    $a.browser && (xa[$a.browser] = !0, xa.version = $a.version);
    xa.webkit && (xa.safari = !0);
    c.browser = xa;
    c.sub = function() {
        function a(b, c) {
            return new a.fn.init(b, c)
        }
        c.extend(!0, a, this);
        a.superclass = this;
        a.fn = a.prototype = this();
        a.fn.constructor = a;
        a.sub = this.sub;
        a.fn.init = function(d, g) {
            g && (g instanceof c && !(g instanceof a)) && (g = a(g));
            return c.fn.init.call(this, d, g, b)
        };
        a.fn.init.prototype = a.fn;
        var b = a(u);
        return a
    };
    var P, na, oa, wb = /alpha\([^)]*\)/i,
        id = /opacity=([^)]*)/,
        jd = /^(top|right|bottom|left)$/,
        ec = /^margin/,
        rc = RegExp("^(" + V + ")(.*)$", "i"),
        Ia = RegExp("^(" + V + ")(?!px)[a-z%]+$", "i"),
        kd = RegExp("^([-+])=(" +
            V + ")", "i"),
        cb = {},
        ld = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        fc = {
            letterSpacing: 0,
            fontWeight: 400,
            lineHeight: 1
        },
        ga = ["Top", "Right", "Bottom", "Left"],
        Bb = ["Webkit", "O", "Moz", "ms"],
        md = c.fn.toggle;
    c.fn.extend({
        css: function(a, b) {
            return c.access(this, function(a, b, h) {
                return h !== f ? c.style(a, b, h) : c.css(a, b)
            }, a, b, 1 < arguments.length)
        },
        show: function() {
            return L(this, !0)
        },
        hide: function() {
            return L(this)
        },
        toggle: function(a, b) {
            var d = "boolean" === typeof a;
            return c.isFunction(a) && c.isFunction(b) ? md.apply(this,
                arguments) : this.each(function() {
                (d ? a : Z(this)) ? c(this).show(): c(this).hide()
            })
        }
    });
    c.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = P(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": c.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, d, g) {
            if (a && !(3 === a.nodeType || 8 === a.nodeType || !a.style)) {
                var h, k, e, j = c.camelCase(b),
                    m = a.style;
                b = c.cssProps[j] || (c.cssProps[j] = v(m, j));
                e = c.cssHooks[b] ||
                    c.cssHooks[j];
                if (d !== f) {
                    k = typeof d;
                    if ("string" === k && (h = kd.exec(d))) d = (h[1] + 1) * h[2] + parseFloat(c.css(a, b)), k = "number";
                    if (!(null == d || "number" === k && isNaN(d)))
                        if ("number" === k && !c.cssNumber[j] && (d += "px"), !e || !("set" in e) || (d = e.set(a, d, g)) !== f) try {
                            m[b] = d
                        } catch (l) {}
                } else return e && "get" in e && (h = e.get(a, !1, g)) !== f ? h : m[b]
            }
        },
        css: function(a, b, d, g) {
            var h, k;
            k = c.camelCase(b);
            b = c.cssProps[k] || (c.cssProps[k] = v(a.style, k));
            (k = c.cssHooks[b] || c.cssHooks[k]) && "get" in k && (h = k.get(a, !0, g));
            h === f && (h = P(a, b));
            "normal" ===
            h && b in fc && (h = fc[b]);
            return d || g !== f ? (a = parseFloat(h), d || c.isNumeric(a) ? a || 0 : h) : h
        },
        swap: function(a, b, c) {
            var g, h = {};
            for (g in b) h[g] = a.style[g], a.style[g] = b[g];
            c = c.call(a);
            for (g in b) a.style[g] = h[g];
            return c
        }
    });
    e.getComputedStyle ? P = function(a, b) {
        var d, g, h, k, e = getComputedStyle(a, null),
            f = a.style;
        e && (d = e[b], "" === d && !c.contains(a.ownerDocument.documentElement, a) && (d = c.style(a, b)), Ia.test(d) && ec.test(b) && (g = f.width, h = f.minWidth, k = f.maxWidth, f.minWidth = f.maxWidth = f.width = d, d = e.width, f.width = g, f.minWidth =
            h, f.maxWidth = k));
        return d
    } : u.documentElement.currentStyle && (P = function(a, b) {
        var c, g, h = a.currentStyle && a.currentStyle[b],
            k = a.style;
        null == h && (k && k[b]) && (h = k[b]);
        if (Ia.test(h) && !jd.test(b)) {
            c = k.left;
            if (g = a.runtimeStyle && a.runtimeStyle.left) a.runtimeStyle.left = a.currentStyle.left;
            k.left = "fontSize" === b ? "1em" : h;
            h = k.pixelLeft + "px";
            k.left = c;
            g && (a.runtimeStyle.left = g)
        }
        return "" === h ? "auto" : h
    });
    c.each(["height", "width"], function(a, b) {
        c.cssHooks[b] = {
            get: function(a, g, h) {
                if (g) return 0 !== a.offsetWidth || "none" !==
                    P(a, "display") ? C(a, b, h) : c.swap(a, ld, function() {
                        return C(a, b, h)
                    })
            },
            set: function(a, g, h) {
                return x(a, g, h ? za(a, b, h, c.support.boxSizing && "border-box" === c.css(a, "boxSizing")) : 0)
            }
        }
    });
    c.support.opacity || (c.cssHooks.opacity = {
        get: function(a, b) {
            return id.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var d = a.style,
                g = a.currentStyle,
                h = c.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                k = g && g.filter || d.filter || "";
            d.zoom = 1;
            if (1 <= b && ("" === c.trim(k.replace(wb,
                    "")) && d.removeAttribute) && (d.removeAttribute("filter"), g && !g.filter)) return;
            d.filter = wb.test(k) ? k.replace(wb, h) : k + " " + h
        }
    });
    c(function() {
        c.support.reliableMarginRight || (c.cssHooks.marginRight = {
            get: function(a, b) {
                return c.swap(a, {
                    display: "inline-block"
                }, function() {
                    if (b) return P(a, "marginRight")
                })
            }
        });
        !c.support.pixelPosition && c.fn.position && c.each(["top", "left"], function(a, b) {
            c.cssHooks[b] = {
                get: function(a, g) {
                    if (g) {
                        var h = P(a, b);
                        return Ia.test(h) ? c(a).position()[b] + "px" : h
                    }
                }
            }
        })
    });
    c.expr && c.expr.filters &&
        (c.expr.filters.hidden = function(a) {
            return 0 === a.offsetWidth && 0 === a.offsetHeight || !c.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || P(a, "display"))
        }, c.expr.filters.visible = function(a) {
            return !c.expr.filters.hidden(a)
        });
    c.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        c.cssHooks[a + b] = {
            expand: function(c) {
                var g = "string" === typeof c ? c.split(" ") : [c],
                    h = {};
                for (c = 0; 4 > c; c++) h[a + ga[c] + b] = g[c] || g[c - 2] || g[0];
                return h
            }
        };
        ec.test(a) || (c.cssHooks[a + b].set = x)
    });
    var nd = /%20/g,
        sc = /\[\]$/,
        gc = /\r?\n/g,
        od = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        pd = /^(?:select|textarea)/i;
    c.fn.extend({
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || pd.test(this.nodeName) || od.test(this.type))
            }).map(function(a, b) {
                var d = c(this).val();
                return null ==
                    d ? null : c.isArray(d) ? c.map(d, function(a) {
                        return {
                            name: b.name,
                            value: a.replace(gc, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: d.replace(gc, "\r\n")
                    }
            }).get()
        }
    });
    c.param = function(a, b) {
        var d, g = [],
            h = function(a, b) {
                b = c.isFunction(b) ? b() : null == b ? "" : b;
                g[g.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        b === f && (b = c.ajaxSettings && c.ajaxSettings.traditional);
        if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function() {
            h(this.name, this.value)
        });
        else
            for (d in a) pa(d, a[d], b, h);
        return g.join("&").replace(nd, "+")
    };
    var la,
        ma, qd = /#.*$/,
        rd = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        sd = /^(?:GET|HEAD)$/,
        td = /^\/\//,
        hc = /\?/,
        ud = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        vd = /([?&])_=[^&]*/,
        ic = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        jc = c.fn.load,
        db = {},
        kc = {},
        lc = ["*/"] + ["*"];
    try {
        la = Ma.href
    } catch (Ed) {
        la = u.createElement("a"), la.href = "", la = la.href
    }
    ma = ic.exec(la.toLowerCase()) || [];
    c.fn.load = function(a, b, d) {
        if ("string" !== typeof a && jc) return jc.apply(this, arguments);
        if (!this.length) return this;
        var g, h, k, e = this,
            j = a.indexOf(" ");
        0 <= j && (g = a.slice(j, a.length), a = a.slice(0, j));
        c.isFunction(b) ? (d = b, b = f) : "object" === typeof b && (h = "POST");
        c.ajax({
            url: a,
            type: h,
            dataType: "html",
            data: b,
            complete: function(a, b) {
                d && e.each(d, k || [a.responseText, b, a])
            }
        }).done(function(a) {
            k = arguments;
            e.html(g ? c("<div>").append(a.replace(ud, "")).find(g) : a)
        });
        return this
    };
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        c.fn[b] = function(a) {
            return this.on(b, a)
        }
    });
    c.each(["get", "post"], function(a, b) {
        c[b] = function(a,
            g, h, k) {
            c.isFunction(g) && (k = k || h, h = g, g = f);
            return c.ajax({
                type: b,
                url: a,
                data: g,
                success: h,
                dataType: k
            })
        }
    });
    c.extend({
        getScript: function(a, b) {
            return c.get(a, f, b, "script")
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        ajaxSetup: function(a, b) {
            b ? ra(a, c.ajaxSettings) : (b = a, a = c.ajaxSettings);
            ra(a, b);
            return a
        },
        ajaxSettings: {
            url: la,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(ma[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": lc
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": c.parseJSON,
                "text xml": c.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: qa(db),
        ajaxTransport: qa(kc),
        ajax: function(a, b) {
            function d(a, b, d, k) {
                var m, p, w, B, I = b;
                if (2 !== K) {
                    K = 2;
                    j && clearTimeout(j);
                    e = f;
                    h = k || "";
                    v.readyState = 0 < a ? 4 : 0;
                    if (d) {
                        B = q;
                        k = v;
                        var u, t, H, V, Fa = B.contents,
                            S = B.dataTypes,
                            C = B.responseFields;
                        for (t in C) t in d && (k[C[t]] = d[t]);
                        for (;
                            "*" === S[0];) S.shift(), u === f && (u = B.mimeType || k.getResponseHeader("content-type"));
                        if (u)
                            for (t in Fa)
                                if (Fa[t] && Fa[t].test(u)) {
                                    S.unshift(t);
                                    break
                                }
                        if (S[0] in d) H = S[0];
                        else {
                            for (t in d) {
                                if (!S[0] || B.converters[t + " " + S[0]]) {
                                    H = t;
                                    break
                                }
                                V || (V = t)
                            }
                            H = H || V
                        }
                        H ? (H !== S[0] && S.unshift(H), B = d[H]) : B = void 0
                    }
                    if (200 <= a && 300 > a || 304 === a)
                        if (q.ifModified && ((d = v.getResponseHeader("Last-Modified")) &&
                                (c.lastModified[g] = d), (d = v.getResponseHeader("Etag")) && (c.etag[g] = d)), 304 === a) I = "notmodified", m = !0;
                        else {
                            a: {
                                p = q;
                                w = B;
                                var J, x, I = p.dataTypes.slice();
                                u = I[0];
                                t = {};
                                H = 0;
                                p.dataFilter && (w = p.dataFilter(w, p.dataType));
                                if (I[1])
                                    for (J in p.converters) t[J.toLowerCase()] = p.converters[J];
                                for (; d = I[++H];)
                                    if ("*" !== d) {
                                        if ("*" !== u && u !== d) {
                                            J = t[u + " " + d] || t["* " + d];
                                            if (!J)
                                                for (x in t)
                                                    if (m = x.split(" "), m[1] === d && (J = t[u + " " + m[0]] || t["* " + m[0]])) {
                                                        !0 === J ? J = t[x] : !0 !== t[x] && (d = m[0], I.splice(H--, 0, d));
                                                        break
                                                    }
                                            if (!0 !== J)
                                                if (J && p["throws"]) w =
                                                    J(w);
                                                else try {
                                                    w = J(w)
                                                } catch (N) {
                                                    m = {
                                                        state: "parsererror",
                                                        error: J ? N : "No conversion from " + u + " to " + d
                                                    };
                                                    break a
                                                }
                                        }
                                        u = d
                                    }
                                m = {
                                    state: "success",
                                    data: w
                                }
                            }
                            I = m.state;p = m.data;w = m.error;m = !w
                        } else if (w = I, !I || a) I = "error", 0 > a && (a = 0);
                    v.status = a;
                    v.statusText = "" + (b || I);
                    m ? A.resolveWith(r, [p, I, v]) : A.rejectWith(r, [v, I, w]);
                    v.statusCode(s);
                    s = f;
                    l && F.trigger("ajax" + (m ? "Success" : "Error"), [v, q, m ? p : w]);
                    z.fireWith(r, [v, I]);
                    l && (F.trigger("ajaxComplete", [v, q]), --c.active || c.event.trigger("ajaxStop"))
                }
            }
            "object" === typeof a && (b = a, a = f);
            b =
                b || {};
            var g, h, k, e, j, m, l, p, q = c.ajaxSetup({}, b),
                r = q.context || q,
                F = r !== q && (r.nodeType || r instanceof c) ? c(r) : c.event,
                A = c.Deferred(),
                z = c.Callbacks("once memory"),
                s = q.statusCode || {},
                B = {},
                I = {},
                K = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        if (!K) {
                            var c = a.toLowerCase();
                            a = I[c] = I[c] || a;
                            B[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === K ? h : null
                    },
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === K) {
                            if (!k)
                                for (k = {}; b = rd.exec(h);) k[b[1].toLowerCase()] = b[2];
                            b = k[a.toLowerCase()]
                        }
                        return b ===
                            f ? null : b
                    },
                    overrideMimeType: function(a) {
                        K || (q.mimeType = a);
                        return this
                    },
                    abort: function(a) {
                        a = a || u;
                        e && e.abort(a);
                        d(0, a);
                        return this
                    }
                };
            A.promise(v);
            v.success = v.done;
            v.error = v.fail;
            v.complete = z.add;
            v.statusCode = function(a) {
                if (a) {
                    var b;
                    if (2 > K)
                        for (b in a) s[b] = [s[b], a[b]];
                    else b = a[v.status], v.always(b)
                }
                return this
            };
            q.url = ((a || q.url) + "").replace(qd, "").replace(td, ma[1] + "//");
            q.dataTypes = c.trim(q.dataType || "*").toLowerCase().split(H);
            null == q.crossDomain && (m = ic.exec(q.url.toLowerCase()), q.crossDomain = !(!m || !(m[1] !=
                ma[1] || m[2] != ma[2] || (m[3] || ("http:" === m[1] ? 80 : 443)) != (ma[3] || ("http:" === ma[1] ? 80 : 443)))));
            q.data && (q.processData && "string" !== typeof q.data) && (q.data = c.param(q.data, q.traditional));
            aa(db, q, b, v);
            if (2 === K) return v;
            l = q.global;
            q.type = q.type.toUpperCase();
            q.hasContent = !sd.test(q.type);
            l && 0 === c.active++ && c.event.trigger("ajaxStart");
            if (!q.hasContent && (q.data && (q.url += (hc.test(q.url) ? "&" : "?") + q.data, delete q.data), g = q.url, !1 === q.cache)) {
                m = c.now();
                var t = q.url.replace(vd, "$1_=" + m);
                q.url = t + (t === q.url ? (hc.test(q.url) ?
                    "&" : "?") + "_=" + m : "")
            }(q.data && q.hasContent && !1 !== q.contentType || b.contentType) && v.setRequestHeader("Content-Type", q.contentType);
            q.ifModified && (g = g || q.url, c.lastModified[g] && v.setRequestHeader("If-Modified-Since", c.lastModified[g]), c.etag[g] && v.setRequestHeader("If-None-Match", c.etag[g]));
            v.setRequestHeader("Accept", q.dataTypes[0] && q.accepts[q.dataTypes[0]] ? q.accepts[q.dataTypes[0]] + ("*" !== q.dataTypes[0] ? ", " + lc + "; q=0.01" : "") : q.accepts["*"]);
            for (p in q.headers) v.setRequestHeader(p, q.headers[p]);
            if (q.beforeSend &&
                (!1 === q.beforeSend.call(r, v, q) || 2 === K)) return v.abort();
            u = "abort";
            for (p in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[p](q[p]);
            if (e = aa(kc, q, b, v)) {
                v.readyState = 1;
                l && F.trigger("ajaxSend", [v, q]);
                q.async && 0 < q.timeout && (j = setTimeout(function() {
                    v.abort("timeout")
                }, q.timeout));
                try {
                    K = 1, e.send(B, d)
                } catch (V) {
                    if (2 > K) d(-1, V);
                    else throw V;
                }
            } else d(-1, "No Transport");
            return v
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var mc = [],
        wd = /\?/,
        ab = /(=)\?(?=&|$)|\?\?/,
        xd = c.now();
    c.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a =
                mc.pop() || c.expando + "_" + xd++;
            this[a] = !0;
            return a
        }
    });
    c.ajaxPrefilter("json jsonp", function(a, b, d) {
        var g, h, k, n = a.data,
            j = a.url,
            m = !1 !== a.jsonp,
            l = m && ab.test(j),
            q = m && !l && "string" === typeof n && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && ab.test(n);
        if ("jsonp" === a.dataTypes[0] || l || q) return g = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h = e[g], l ? a.url = j.replace(ab, "$1" + g) : q ? a.data = n.replace(ab, "$1" + g) : m && (a.url += (wd.test(j) ? "&" : "?") + a.jsonp + "=" + g), a.converters["script json"] =
            function() {
                k || c.error(g + " was not called");
                return k[0]
            }, a.dataTypes[0] = "json", e[g] = function() {
                k = arguments
            }, d.always(function() {
                e[g] = h;
                a[g] && (a.jsonpCallback = b.jsonpCallback, mc.push(g));
                k && c.isFunction(h) && h(k[0]);
                k = h = f
            }), "script"
    });
    c.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                c.globalEval(a);
                return a
            }
        }
    });
    c.ajaxPrefilter("script", function(a) {
        a.cache ===
            f && (a.cache = !1);
        a.crossDomain && (a.type = "GET", a.global = !1)
    });
    c.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = u.head || u.getElementsByTagName("head")[0] || u.documentElement;
            return {
                send: function(g, h) {
                    b = u.createElement("script");
                    b.async = "async";
                    a.scriptCharset && (b.charset = a.scriptCharset);
                    b.src = a.url;
                    b.onload = b.onreadystatechange = function(a, g) {
                        if (g || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, c && b.parentNode && c.removeChild(b), b = f, g || h(200, "success")
                    };
                    c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    if (b) b.onload(0, 1)
                }
            }
        }
    });
    var ya, xb = e.ActiveXObject ? function() {
            for (var a in ya) ya[a](0, 1)
        } : !1,
        yd = 0;
    c.ajaxSettings.xhr = e.ActiveXObject ? function() {
        var a;
        if (!(a = !this.isLocal && ha())) a: {
            try {
                a = new e.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (b) {}
            a = void 0
        }
        return a
    } : ha;
    var yb = c.ajaxSettings.xhr();
    c.extend(c.support, {
        ajax: !!yb,
        cors: !!yb && "withCredentials" in yb
    });
    c.support.ajax && c.ajaxTransport(function(a) {
        if (!a.crossDomain || c.support.cors) {
            var b;
            return {
                send: function(d,
                    g) {
                    var h, k, n = a.xhr();
                    a.username ? n.open(a.type, a.url, a.async, a.username, a.password) : n.open(a.type, a.url, a.async);
                    if (a.xhrFields)
                        for (k in a.xhrFields) n[k] = a.xhrFields[k];
                    a.mimeType && n.overrideMimeType && n.overrideMimeType(a.mimeType);
                    !a.crossDomain && !d["X-Requested-With"] && (d["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (k in d) n.setRequestHeader(k, d[k])
                    } catch (j) {}
                    n.send(a.hasContent && a.data || null);
                    b = function(d, k) {
                        var e, j, m, l, q;
                        try {
                            if (b && (k || 4 === n.readyState))
                                if (b = f, h && (n.onreadystatechange = c.noop, xb &&
                                        delete ya[h]), k) 4 !== n.readyState && n.abort();
                                else {
                                    e = n.status;
                                    m = n.getAllResponseHeaders();
                                    l = {};
                                    if ((q = n.responseXML) && q.documentElement) l.xml = q;
                                    try {
                                        l.text = n.responseText
                                    } catch (p) {}
                                    try {
                                        j = n.statusText
                                    } catch (r) {
                                        j = ""
                                    }!e && a.isLocal && !a.crossDomain ? e = l.text ? 200 : 404 : 1223 === e && (e = 204)
                                }
                        } catch (F) {
                            k || g(-1, F)
                        }
                        l && g(e, j, l, m)
                    };
                    a.async ? 4 === n.readyState ? setTimeout(b, 0) : (h = ++yd, xb && (ya || (ya = {}, c(e).unload(xb)), ya[h] = b), n.onreadystatechange = b) : b()
                },
                abort: function() {
                    b && b(0, 1)
                }
            }
        }
    });
    var Ja, bb, zd = /^(?:toggle|show|hide)$/,
        Ad = RegExp("^(?:([-+])=|)(" + V + ")([a-z%]*)$", "i"),
        Bd = /queueHooks$/,
        Ka = [function(a, b, d) {
            var g, h, k, e, f, j, m = this,
                l = a.style,
                q = {},
                p = [],
                r = a.nodeType && Z(a);
            d.queue || (f = c._queueHooks(a, "fx"), null == f.unqueued && (f.unqueued = 0, j = f.empty.fire, f.empty.fire = function() {
                f.unqueued || j()
            }), f.unqueued++, m.always(function() {
                m.always(function() {
                    f.unqueued--;
                    c.queue(a, "fx").length || f.empty.fire()
                })
            }));
            if (1 === a.nodeType && ("height" in b || "width" in b)) d.overflow = [l.overflow, l.overflowX, l.overflowY], "inline" === c.css(a, "display") &&
                "none" === c.css(a, "float") && (!c.support.inlineBlockNeedsLayout || "inline" === N(a.nodeName) ? l.display = "inline-block" : l.zoom = 1);
            d.overflow && (l.overflow = "hidden", c.support.shrinkWrapBlocks || m.done(function() {
                l.overflow = d.overflow[0];
                l.overflowX = d.overflow[1];
                l.overflowY = d.overflow[2]
            }));
            for (g in b) h = b[g], zd.exec(h) && (delete b[g], h !== (r ? "hide" : "show") && p.push(g));
            if (h = p.length) {
                k = c._data(a, "fxshow") || c._data(a, "fxshow", {});
                r ? c(a).show() : m.done(function() {
                    c(a).hide()
                });
                m.done(function() {
                    var b;
                    c.removeData(a,
                        "fxshow", !0);
                    for (b in q) c.style(a, b, q[b])
                });
                for (g = 0; g < h; g++) b = p[g], e = m.createTween(b, r ? k[b] : 0), q[b] = k[b] || c.style(a, b), b in k || (k[b] = e.start, r && (e.end = e.start, e.start = "width" === b || "height" === b ? 1 : 0))
            }
        }],
        Ba = {
            "*": [function(a, b) {
                var d, g, h, k = this.createTween(a, b),
                    e = Ad.exec(b),
                    f = k.cur(),
                    j = +f || 0,
                    m = 1;
                if (e) {
                    d = +e[2];
                    g = e[3] || (c.cssNumber[a] ? "" : "px");
                    if ("px" !== g && j) {
                        j = c.css(k.elem, a, !0) || d || 1;
                        do h = m = m || ".5", j /= m, c.style(k.elem, a, j + g), m = k.cur() / f; while (1 !== m && m !== h)
                    }
                    k.unit = g;
                    k.start = j;
                    k.end = e[1] ? j + (e[1] + 1) * d :
                        d
                }
                return k
            }]
        };
    c.Animation = c.extend(J, {
        tweener: function(a, b) {
            c.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var d, g = 0, h = a.length; g < h; g++) d = a[g], Ba[d] = Ba[d] || [], Ba[d].unshift(b)
        },
        prefilter: function(a, b) {
            b ? Ka.unshift(a) : Ka.push(a)
        }
    });
    c.Tween = O;
    O.prototype = {
        constructor: O,
        init: function(a, b, d, g, h, e) {
            this.elem = a;
            this.prop = d;
            this.easing = h || "swing";
            this.options = b;
            this.start = this.now = this.cur();
            this.end = g;
            this.unit = e || (c.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var a = O.propHooks[this.prop];
            return a && a.get ? a.get(this) :
                O.propHooks._default.get(this)
        },
        run: function(a) {
            var b = O.propHooks[this.prop];
            this.pos = a = c.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration);
            this.now = (this.end - this.start) * a + this.start;
            this.options.step && this.options.step.call(this.elem, this.now, this);
            b && b.set ? b.set(this) : O.propHooks._default.set(this);
            return this
        }
    };
    O.prototype.init.prototype = O.prototype;
    O.propHooks = {
        _default: {
            get: function(a) {
                if (null != a.elem[a.prop] && (!a.elem.style || null == a.elem.style[a.prop])) return a.elem[a.prop];
                a = c.css(a.elem, a.prop, !1, "");
                return !a || "auto" === a ? 0 : a
            },
            set: function(a) {
                if (c.fx.step[a.prop]) c.fx.step[a.prop](a);
                else a.elem.style && (null != a.elem.style[c.cssProps[a.prop]] || c.cssHooks[a.prop]) ? c.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    };
    c.each(["toggle", "show", "hide"], function(a, b) {
        var d = c.fn[b];
        c.fn[b] = function(g, h, e) {
            return null == g || "boolean" === typeof g || !a &&
                c.isFunction(g) && c.isFunction(h) ? d.apply(this, arguments) : this.animate(ia(b, !0), g, h, e)
        }
    });
    c.fn.extend({
        fadeTo: function(a, b, c, g) {
            return this.filter(Z).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, g)
        },
        animate: function(a, b, d, g) {
            var h = c.isEmptyObject(a),
                e = c.speed(b, d, g);
            b = function() {
                var b = J(this, c.extend({}, a), e);
                h && b.stop(!0)
            };
            return h || !1 === e.queue ? this.each(b) : this.queue(e.queue, b)
        },
        stop: function(a, b, d) {
            var g = function(a) {
                var b = a.stop;
                delete a.stop;
                b(d)
            };
            "string" !== typeof a && (d = b, b = a, a = f);
            b &&
                !1 !== a && this.queue(a || "fx", []);
            return this.each(function() {
                var b = !0,
                    e = null != a && a + "queueHooks",
                    f = c.timers,
                    j = c._data(this);
                if (e) j[e] && j[e].stop && g(j[e]);
                else
                    for (e in j) j[e] && (j[e].stop && Bd.test(e)) && g(j[e]);
                for (e = f.length; e--;)
                    if (f[e].elem === this && (null == a || f[e].queue === a)) f[e].anim.stop(d), b = !1, f.splice(e, 1);
                    (b || !d) && c.dequeue(this, a)
            })
        }
    });
    c.each({
        slideDown: ia("show"),
        slideUp: ia("hide"),
        slideToggle: ia("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a,
        b) {
        c.fn[a] = function(a, c, h) {
            return this.animate(b, a, c, h)
        }
    });
    c.speed = function(a, b, d) {
        var g = a && "object" === typeof a ? c.extend({}, a) : {
            complete: d || !d && b || c.isFunction(a) && a,
            duration: a,
            easing: d && b || b && !c.isFunction(b) && b
        };
        g.duration = c.fx.off ? 0 : "number" === typeof g.duration ? g.duration : g.duration in c.fx.speeds ? c.fx.speeds[g.duration] : c.fx.speeds._default;
        if (null == g.queue || !0 === g.queue) g.queue = "fx";
        g.old = g.complete;
        g.complete = function() {
            c.isFunction(g.old) && g.old.call(this);
            g.queue && c.dequeue(this, g.queue)
        };
        return g
    };
    c.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    c.timers = [];
    c.fx = O.prototype.init;
    c.fx.tick = function() {
        for (var a, b = c.timers, d = 0; d < b.length; d++) a = b[d], !a() && b[d] === a && b.splice(d--, 1);
        b.length || c.fx.stop()
    };
    c.fx.timer = function(a) {
        a() && (c.timers.push(a) && !bb) && (bb = setInterval(c.fx.tick, c.fx.interval))
    };
    c.fx.interval = 13;
    c.fx.stop = function() {
        clearInterval(bb);
        bb = null
    };
    c.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    c.fx.step = {};
    c.expr && c.expr.filters &&
        (c.expr.filters.animated = function(a) {
            return c.grep(c.timers, function(b) {
                return a === b.elem
            }).length
        });
    var nc = /^(?:body|html)$/i;
    c.fn.offset = function(a) {
        if (arguments.length) return a === f ? this : this.each(function(b) {
            c.offset.setOffset(this, a, b)
        });
        var b, d, g, h, e, j;
        if (e = (b = this[0]) && b.ownerDocument) {
            if ((g = e.body) === b) return c.offset.bodyOffset(b);
            d = e.documentElement;
            if (!c.contains(d, b)) return {
                top: 0,
                left: 0
            };
            b = b.getBoundingClientRect();
            h = Ca(e);
            e = d.clientTop || g.clientTop || 0;
            g = d.clientLeft || g.clientLeft || 0;
            j =
                h.pageYOffset || d.scrollTop;
            d = h.pageXOffset || d.scrollLeft;
            e = b.top + j - e;
            b = b.left + d - g;
            return {
                top: e,
                left: b
            }
        }
    };
    c.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
                d = a.offsetLeft;
            c.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(c.css(a, "marginTop")) || 0, d += parseFloat(c.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: d
            }
        },
        setOffset: function(a, b, d) {
            var g = c.css(a, "position");
            "static" === g && (a.style.position = "relative");
            var h = c(a),
                e = h.offset(),
                f = c.css(a, "top"),
                j = c.css(a, "left"),
                m = {},
                l = {};
            ("absolute" === g || "fixed" ===
                g) && -1 < c.inArray("auto", [f, j]) ? (l = h.position(), g = l.top, j = l.left) : (g = parseFloat(f) || 0, j = parseFloat(j) || 0);
            c.isFunction(b) && (b = b.call(a, d, e));
            null != b.top && (m.top = b.top - e.top + g);
            null != b.left && (m.left = b.left - e.left + j);
            "using" in b ? b.using.call(a, m) : h.css(m)
        }
    };
    c.fn.extend({
        position: function() {
            if (this[0]) {
                var a = this[0],
                    b = this.offsetParent(),
                    d = this.offset(),
                    g = nc.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                d.top -= parseFloat(c.css(a, "marginTop")) || 0;
                d.left -= parseFloat(c.css(a, "marginLeft")) || 0;
                g.top += parseFloat(c.css(b[0],
                    "borderTopWidth")) || 0;
                g.left += parseFloat(c.css(b[0], "borderLeftWidth")) || 0;
                return {
                    top: d.top - g.top,
                    left: d.left - g.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || u.body; a && !nc.test(a.nodeName) && "static" === c.css(a, "position");) a = a.offsetParent;
                return a || u.body
            })
        }
    });
    c.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var d = /Y/.test(b);
        c.fn[a] = function(g) {
            return c.access(this, function(a, g, e) {
                var j = Ca(a);
                if (e === f) return j ? b in j ? j[b] : j.document.documentElement[g] :
                    a[g];
                j ? j.scrollTo(!d ? e : c(j).scrollLeft(), d ? e : c(j).scrollTop()) : a[g] = e
            }, a, g, arguments.length, null)
        }
    });
    c.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        c.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(d, g) {
            c.fn[g] = function(g, e) {
                var j = arguments.length && (d || "boolean" !== typeof g),
                    m = d || (!0 === g || !0 === e ? "margin" : "border");
                return c.access(this, function(b, d, g) {
                    return c.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (d = b.documentElement, Math.max(b.body["scroll" + a], d["scroll" +
                        a], b.body["offset" + a], d["offset" + a], d["client" + a])) : g === f ? c.css(b, d, g, m) : c.style(b, d, g, m)
                }, b, j ? g : f, j)
            }
        })
    });
    e.jQuery = e.$ = c;
    "function" === typeof define && (define.amd && define.amd.jQuery) && define("jquery", [], function() {
        return c
    })
})(window);
(function(e) {
    window.XDomainRequest && (e.extend(e.support, {
        xdr: !0
    }), e.ajaxTransport(function(f) {
        if (f.crossDomain && f.async) {
            f.timeout && (f.xdrTimeout = f.timeout, delete f.timeout);
            var p;
            return {
                send: function(l, s) {
                    function t(f, j, m, l) {
                        p.onload = p.onerror = p.ontimeout = e.noop;
                        p = void 0;
                        s(f, j, m, l)
                    }
                    p = new XDomainRequest;
                    p.open(f.type, f.url);
                    p.onload = function() {
                        t(200, "OK", {
                            text: p.responseText
                        }, "Content-Type: " + p.contentType)
                    };
                    p.onerror = function() {
                        t(404, "Not Found")
                    };
                    p.ontimeout = function() {};
                    p.onprogress = function() {};
                    f.xdrTimeout && (p.ontimeout = function() {
                        t(0, "timeout")
                    }, p.timeout = f.xdrTimeout);
                    p.send(f.hasContent && f.data || null)
                },
                abort: function() {
                    p && (p.onerror = e.noop(), p.abort())
                }
            }
        }
    }))
})(jQuery);
(function(e, f, p) {
    function l(e) {
        return e
    }

    function s(e) {
        return decodeURIComponent(e.replace(t, " "))
    }
    var t = /\+/g;
    e.cookie = function(r, j, m) {
        if (j !== p && !/Object/.test(Object.prototype.toString.call(j))) {
            m = e.extend({}, e.cookie.defaults, m);
            null === j && (m.expires = -1);
            if ("number" === typeof m.expires) {
                var A = m.expires,
                    z = m.expires = new Date;
                z.setDate(z.getDate() + A)
            }
            j = String(j);
            return f.cookie = [encodeURIComponent(r), "=", m.raw ? j : encodeURIComponent(j), m.expires ? "; expires=" + m.expires.toUTCString() : "", m.path ? "; path=" +
                m.path : "", m.domain ? "; domain=" + m.domain : "", m.secure ? "; secure" : ""
            ].join("")
        }
        m = j || e.cookie.defaults || {};
        j = m.raw ? l : s;
        m = f.cookie.split("; ");
        for (A = 0; z = m[A] && m[A].split("="); A++)
            if (j(z.shift()) === r) return j(z.join("="));
        return null
    };
    e.cookie.defaults = {};
    e.removeCookie = function(f, j) {
        return null !== e.cookie(f, j) ? (e.cookie(f, null, j), !0) : !1
    }
})(jQuery, document);
(function(e) {
    function f(f) {
        this.input = f;
        "password" == f.attr("type") && this.handlePassword();
        e(f[0].form).submit(function() {
            f.hasClass("placeholder") && f[0].value == f.attr("placeholder") && (f[0].value = "")
        })
    }
    f.prototype = {
        show: function(e) {
            if ("" === this.input[0].value || e && this.valueIsPlaceholder()) {
                if (this.isPassword) try {
                    this.input[0].setAttribute("type", "text")
                } catch (f) {
                    this.input.before(this.fakePassword.show()).hide()
                }
                this.input.addClass("placeholder");
                this.input[0].value = this.input.attr("placeholder")
            }
        },
        hide: function() {
            if (this.valueIsPlaceholder() && this.input.hasClass("placeholder") && (this.input.removeClass("placeholder"), this.input[0].value = "", this.isPassword)) {
                try {
                    this.input[0].setAttribute("type", "password")
                } catch (e) {}
                this.input.show();
                this.input[0].focus()
            }
        },
        valueIsPlaceholder: function() {
            return this.input[0].value == this.input.attr("placeholder")
        },
        handlePassword: function() {
            var f = this.input;
            f.attr("realType", "password");
            this.isPassword = !0;
            if (e.browser.msie && f[0].outerHTML) {
                var p = e(f[0].outerHTML.replace(/type=(['"])?password\1/gi,
                    "type=$1text$1"));
                this.fakePassword = p.val(f.attr("placeholder")).addClass("placeholder").focus(function() {
                    f.trigger("focus");
                    e(this).hide()
                });
                e(f[0].form).submit(function() {
                    p.remove();
                    f.show()
                })
            }
        }
    };
    var p = !!("placeholder" in document.createElement("input"));
    e.fn.placeholder = function() {
        return p ? this : this.each(function() {
            var l = e(this),
                p = new f(l);
            p.show(!0);
            l.focus(function() {
                p.hide()
            });
            l.blur(function() {
                p.show(!1)
            });
            e.browser.msie && (e(window).load(function() {
                    l.val() && l.removeClass("placeholder");
                    p.show(!0)
                }),
                l.focus(function() {
                    if ("" == this.value) {
                        var e = this.createTextRange();
                        e.collapse(!0);
                        e.moveStart("character", 0);
                        e.select()
                    }
                }))
        })
    }
})(jQuery);
! function(e) {
    e.lr || (e.lr = {});
    e.lr.apispecs || (e.lr.apispecs = {});
    e.extend(e.lr.apispecs, {
        siteUserLogin: {
            params: ["email", "password", "site_id"],
            group: ["user", "login"],
            ret: "site_user"
        },
        createSiteUser: {
            params: "email password parent_id site_id extra_fields source ref_code ip".split(" "),
            group: ["user", "login"],
            ret: "site_user"
        },
        createSiteUserByConnect: {
            params: ["email", "password", "parent_id", "site_id", "network", "network_id", {
                    name: "network_data",
                    encoding: "json"
                }, {
                    name: "extra_fields",
                    encoding: "json"
                }, "source",
                "ip"
            ],
            group: ["user", "login"],
            ret: "site_user"
        },
        createSiteUserByConnect2: {
            method: "createSiteUserByConnect",
            params: ["email", "password", "parent_id", "site_id", "platform", "platform_id", {
                name: "platform_data",
                encoding: "json"
            }, {
                name: "extra_fields",
                encoding: "json"
            }, "source", "ip"],
            group: ["user", "login"],
            ret: "site_user"
        },
        createSiteUserExtraData: {
            params: ["site_id", "user_id", "data_type", {
                name: "data",
                encoding: "json"
            }, {
                name: "extra_fields",
                encoding: "json"
            }, "source", "ip"],
            groups: ["user", "sitesession"],
            ret: ""
        },
        createSiteUserChannelLink: {
            params: ["site_id",
                "user_id", "channel", "url", "shortened_id"
            ],
            group: ["user", "sitesession"],
            ret: "channel_link"
        },
        createSiteUserPulse: {
            params: ["site_id", "user_id", "session_id", "pulse_type", "page", {
                name: "data",
                encoding: "json"
            }],
            group: ["user", "sitesession"],
            ret: "pulse"
        },
        deleteSiteUser: {
            params: ["user_id", "session_id"],
            group: ["user", "sitesession"],
            ret: "site_user"
        },
        getSiteUserChannelLink: {
            params: ["site_id", "referral_code"],
            group: ["user"],
            ret: "channel_link"
        },
        getSiteUserChannelLinks: {
            params: ["site_id", "user_id"],
            group: ["user",
                "sitesession"
            ],
            ret: "channel_links"
        },
        getSiteUserChannelLinksByChannel: {
            params: ["site_id", "user_id", "channel"],
            group: ["user", "sitesession"],
            ret: "channel_links"
        },
        updateSiteUser: {
            params: ["user_id", "session_id", "email", "account_name"],
            group: ["user", "sitesession"],
            ret: "site_user"
        },
        updateSiteUserPassword: {
            params: ["user_id", "session_id", "password"],
            group: ["user", "sitesession"],
            ret: "site_user"
        },
        getSitePerformanceInsights: {
            params: ["access_token", "site_id"],
            group: ["sites"],
            ret: "site_performance"
        },
        getSiteUserPerformanceInsights: {
            params: "access_token site_id page limit sort_by sort_by_dir".split(" "),
            group: ["sites"],
            aliases: ["getSiteUserPerformanceAnalytics"],
            empty: [],
            ret: "site_user_performance"
        },
        getSiteUserActivity: {
            params: ["access_token", "user_id", "site_id"],
            group: ["sites"],
            ret: "site_user"
        },
        getAllSiteUserActivity: {
            params: ["access_token", "site_id"],
            group: ["sites"],
            ret: "site_user_activity"
        },
        getSiteSignupPerformanceInsights: {
            params: ["access_token", "site_id"],
            group: ["sites"],
            aliases: ["getSiteSignupPerformanceAnalytics"],
            ret: "site_signup_performance"
        },
        getSiteChannelInsights: {
            params: ["user_id", "session_id",
                "site_id"
            ],
            group: ["sites", "platformsession"],
            ret: "channel_insights"
        },
        addFacebookPageID: {
            params: ["site_id", "access_token", "page_name", "page_id"],
            group: ["facebook"],
            ret: "facebook_page"
        },
        deleteFacebookPageID: {
            params: ["site_id", "access_token", "page_pid"],
            group: ["facebook"],
            ret: "facebook_page"
        },
        getFacebookFriendRecommendations: {
            params: ["site_id", "facebook_access_token"],
            group: ["facebook"],
            ret: "facebook_recommendations"
        }
    })
}(jQuery);
! function(e) {
    e.lr || (e.lr = {});
    e.lr.apispecs || (e.lr.apispecs = {});
    e.extend(e.lr.apispecs, {
        platformUserLogin: {
            params: ["email", "password"],
            group: ["user", "login"],
            ret: "platform_user"
        },
        platformUserLoginByToken: {
            params: ["token"],
            group: ["user", "login"],
            ret: "platform_user"
        },
        platformUserLoginByConfirmCode: {
            params: ["code"],
            group: ["user", "login"],
            ret: "platform_user"
        },
        platformUserLoginByAdminHash: {
            params: ["hash"],
            group: ["user", "login"],
            ret: "platform_user"
        },
        siteUserLoginByOptInCode: {
            params: ["code"],
            group: ["user",
                "login"
            ],
            ret: "site_user"
        },
        createPlatformUser: {
            params: ["email", "password", "invite_code"],
            group: ["user", "login"],
            ret: "platform_user"
        },
        getPlatformUser: {
            params: ["user_id"],
            group: ["user"],
            ret: "platform_user"
        },
        getPlatformUserByEmail: {
            params: ["email"],
            group: ["user"],
            ret: "platform_user"
        },
        getSiteUser: {
            params: ["site_id", "user_id"],
            group: ["user"],
            ret: "site_user"
        },
        updatePlatformUser: {
            params: ["user_id", "session_id", "email", "account_name"],
            group: ["user", "platformsession"],
            ret: "platform_user"
        },
        updatePlatformUserPassword: {
            params: ["user_id",
                "session_id", "password"
            ],
            group: ["user", "platformsession"],
            ret: "platform_user"
        },
        platformUserResetPasswordRequest: {
            params: ["email"],
            group: ["user"],
            ret: "platform_user"
        },
        createSite: {
            params: ["user_id", "session_id", "domain"],
            group: ["sites", "platformsession"],
            ret: "site_user"
        },
        createSiteDrip: {
            params: ["user_id", "session_id", "site_id", "drip_action", "channel", "threshold", "description", {
                name: "assets",
                encoding: "json"
            }],
            group: ["sites", "platformsession"],
            ret: "site_drips"
        },
        updateSiteDrip: {
            params: ["user_id", "session_id",
                "drip_id", "drip_action", "channel", "threshold", "description", {
                    name: "assets",
                    encoding: "json"
                }
            ],
            group: ["sites", "platformsession"],
            ret: "site_drips"
        },
        getAllSiteDrips: {
            params: ["user_id", "session_id", "site_id"],
            group: ["sites", "platformsession"],
            empty: [],
            ret: "site_drips"
        },
        getSiteDripsByAction: {
            params: ["site_id", "action", "threshold"],
            group: ["sites"],
            empty: [],
            ret: "site_drips"
        },
        deleteSiteDrip: {
            params: ["user_id", "session_id", "drip_id"],
            group: ["sites", "platformsession"],
            ret: "site_drip"
        },
        getAllSites: {
            params: ["filter_by",
                "filter_text"
            ],
            group: ["sites"],
            empty: [],
            ret: "all_sites"
        },
        getPlatformUserSites: {
            params: ["user_id"],
            group: ["sites", "platformsession"],
            empty: [],
            ret: "platform_user_sites"
        },
        getSiteInfo: {
            params: ["site_id"],
            group: ["sites", "sitesession"],
            ret: "site"
        },
        getSiteInfoByDomain: {
            params: ["domain"],
            group: ["sites"],
            ret: "site"
        },
        getSiteBaseRedirect: {
            params: ["domain"],
            group: ["sites"],
            ret: "site"
        },
        updateSiteSetting: {
            params: ["site_id", "session_id", "setting_name", "setting_value"],
            group: ["sites", "platformsession"],
            ret: "setting"
        },
        getAllSiteCategories: {
            params: [],
            group: ["sites"],
            empty: [],
            ret: "site_categories"
        },
        launchSite: {
            params: ["site_id"],
            group: ["sites", "platformsession"],
            ret: "launch_site"
        },
        getLaunchedSiteInfo: {
            params: ["site_id"],
            group: ["sites", "platformsession"],
            ret: "site"
        },
        getSiteUserInsights: {
            params: "user_id session_id site_id page limit sort_by sort_by_dir".split(" "),
            group: ["sites", "platformsession"],
            aliases: ["getSiteUserAnalytics"],
            empty: [],
            ret: "site_user_analytics"
        },
        getSiteSignupAnalytics: {
            params: ["user_id", "session_id",
                "site_id"
            ],
            group: ["sites", "platformsession"],
            aliases: ["getSiteSignupInsights"],
            empty: [],
            ret: "site_signup_analytics"
        },
        getSiteInsights: {
            params: ["user_id", "session_id", "site_id"],
            group: ["sites", "platformsession"],
            aliases: ["getSiteAnalytics"],
            ret: "site_analytics"
        },
        getSiteRegisteredDomains: {
            params: ["site_id"],
            group: ["sites"],
            ret: "registered_domains"
        },
        sendEmail: {
            params: "send_to send_to_name subject body send_from send_from_name reply_to".split(" "),
            group: ["misc"],
            ret: "send_email"
        },
        inviteUsersByEmail: {
            params: ["site_id", {
                name: "emails",
                encoding: "csv"
            }, "ref_url", "name", "message"],
            group: ["misc"],
            ret: "invite_users"
        },
        clickTrack: {
            params: "site_id parent_id referral_code browser ip referrer comments".split(" "),
            group: ["misc"],
            ret: "click_track"
        },
        createUploadToken: {
            params: [],
            group: ["misc"],
            ret: "upload_token"
        },
        verifyUploadToken: {
            params: ["token"],
            group: ["misc"],
            ret: "upload_token"
        },
        getSiteApiToken: {
            params: ["user_id", "session_id", "site_id"],
            group: ["platformsession"],
            ret: "api_info"
        },
        getClientIP: {
            params: [],
            group: ["misc"],
            ret: "client_ip"
        },
        checkDomainDNS: {
            params: ["domain", "check"],
            group: ["misc"],
            ret: ""
        },
        getDomainNameServers: {
            params: ["domain"],
            group: ["misc"],
            ret: "domain_name_servers"
        },
        checkDomainAvailability: {
            params: ["domain"],
            group: ["misc"],
            ret: "domain"
        },
        registerDomain: {
            params: "user_id site_id stripe_token domain period auto_renew uk_reg_type us_app_purpose us_category name street_1 street_2 street_3 city state post_code country_code phone ext email fax".split(" "),
            group: ["misc"],
            ret: "register_domain"
        },
        updateCs: {
            params: ["lrDomain"],
            group: ["misc"],
            relaxResponseChecks: !0,
            ret: "csAPIKey"
        },
        setSiteAsset: {
            params: "site_id session_id name data mime_type metadata".split(" "),
            group: ["assets", "platformsession"],
            ret: "asset_success"
        },
        getSiteAsset: {
            params: ["site_id", "name"],
            group: ["assets", "platformsession"],
            ret: "site_asset"
        },
        downloadSiteAsset: {
            params: ["site_id", "name"],
            group: ["assets", "platformsession"],
            ret: "site_asset_data"
        },
        removeSiteAsset: {
            params: ["site_id", "session_id", "name"],
            group: ["assets", "platformsession"],
            ret: "asset_success"
        },
        listSiteAssets: {
            params: ["site_id"],
            group: ["assets", "platformsession"],
            ret: "site_assets"
        },
        getDisplayExchangedLinks: {
            params: ["site_id", "limit"],
            group: ["sites"],
            ret: "site_exchanged_links",
            empty: []
        },
        createSiteLinkExChannelLink: {
            params: ["site_id", "linkex_site_id", "channel", "url", "shortened_id"],
            group: ["sites"],
            ret: "channel_link"
        },
        getIgnitionAsset: {
            params: ["url"],
            group: ["misc"],
            ret: "ignition_asset"
        }
    })
}(jQuery);
! function(e) {
    e.lr || (e.lr = {});
    e.ajaxPrefilter("json", function(f) {
        if (f.crossDomain && !e.support.cors && !e.support.xdr || !e.support.ajax) return "jsonp"
    });
    var f = "/json/platform.launchrock.com/v1/",
        p = {};
    e.extend(e.lr, {
        api: {
            init: function(e) {
                e && (f = e)
            },
            call: function(l, j, m) {
                var p = (m || [])[0] || !1,
                    z = (m || [])[1] || !1;
                e.ajax({
                    accepts: "application/json",
                    async: !0,
                    cache: !1,
                    data: j,
                    dataType: "json",
                    error: function(e, f) {
                        z && z("http" + f)
                    },
                    success: function(e) {
                        p &&
                            p(e)
                    },
                    type: "POST",
                    url: f + l
                })
            },
            registerErrorHandler: function(e, f) {
                p[e] = f
            }
        }
    });
    var l = function(f, j, m) {
        var l = {},
            z = function(f) {
                return e.isPlainObject(f) ? f.name : f
            },
            t = function(f, j) {
                if (e.isPlainObject(f) && f.encoding) {
                    if ("json" == f.encoding) return JSON.stringify(j);
                    if ("csv" == f.encoding) {
                        var m = "";
                        e.isArray(j) && e.each(j, function(e, f) {
                            "" != m && (m += ",");
                            m += f
                        });
                        return m
                    }
                }
                return j
            },
            B = {};
        e.isArray(f) ? e.each(f, function(e, f) {
            B[f] = !0
        }) : f && (B[f] = !0);
        e.each(e.lr.apispecs, function(q, v) {
            var s = !1;
            f ? v.group ? e.isArray(v.group) ?
                e.each(v.group, function(e, f) {
                    B[f] && (s = !0)
                }) : B[v.group] && (s = !0) : s = !1 : s = !0;
            if (s) {
                var L = v.method || q,
                    x = v.overrideFunction || function() {
                        var f = [],
                            l = [];
                        e.each(arguments, function(j, m) {
                            e.isFunction(m) ? l.push(m) : f.push(m)
                        });
                        var q = null;
                        if (1 == f.length && e.isPlainObject(f[0])) {
                            var r = !1;
                            e.each(v.params, function(f, m) {
                                if (!j || !j[z(m)]) return e.isPlainObject(m) && (m.encoding && "raw" != m.encoding) && (r = !0), !1
                            });
                            r || (q = f[0])
                        }
                        var A = {};
                        if (null === q) {
                            j && e.each(v.params, function(f, m) {
                                var l = z(m);
                                if (j[l]) {
                                    var q;
                                    q = e.isFunction(j[l]) ?
                                        j[l]() : j[l];
                                    A[l] = t(m, q)
                                }
                            });
                            for (var B = q = 0; B < f.length; B++) {
                                for (; q < v.params.length && void 0 !== A[z(v.params[q])];) q++;
                                if (q >= v.params.length) break;
                                A[z(v.params[q])] = t(v.params[q], f[B]);
                                q++
                            }
                        } else {
                            j && e.extend(A, j);
                            e.extend(A, q);
                            var s = {};
                            e.each(A, function(f, j) {
                                var m = null;
                                e.each(v.params, function(e, j) {
                                    if (z(j) == f) return m = j, !1
                                });
                                s[f] = t(m, j)
                            });
                            A = s
                        }
                        v.postProcessParamMap && e.each(v.postProcessParamMap, function(e, f) {
                            void 0 !== A[e] && (A[f] = A[e], delete A[e])
                        });
                        if (0 < l.length && l[0]) {
                            var x = l[0];
                            l[0] = function(f) {
                                e.isArray(f) &&
                                    (f = f[0]);
                                e.isPlainObject(f) && f.response && (f = f.response);
                                if ("OK" != f.status && (!v.relaxResponseChecks || f.status))
                                    if (f.error)
                                        if (119 == f.error.error_code) x(v.empty || null);
                                        else {
                                            if (1 < l.length && l[1]) l[1](f.error.error_code, f.error.error_message);
                                            if (p[f.error.error_code]) p[f.error.error_code](f.error.error_code, f.error.error_message)
                                        } else {
                                    if (1 < l.length && l[1]) l[1]("malformedresponse", "Unexpected format of server response")
                                } else v.ret && f[v.ret] && (f = f[v.ret]), x(f)
                            };
                            m && (x = l[0], l[0] = function(e) {
                                m(e, x, l[1] || null)
                            })
                        }
                        e.lr.api.call(L,
                            A, l)
                    },
                    za = v.aliases || [];
                za.push(q);
                e.each(za, function(e, f) {
                    l[f] = x
                })
            }
        });
        return l
    };
    e.extend(e.lr.api, l(null, null));
    var s = function(f, j, m) {
            var p = l("platformsession", {
                user_id: f,
                session_id: j
            });
            e.extend(p, {
                getUserID: function() {
                    return f
                },
                getSessionID: function() {
                    return j
                },
                getExpires: function() {
                    return m
                },
                getSessionData: function() {
                    return {
                        user_id: f,
                        session_id: j,
                        expires: m
                    }
                }
            });
            return p
        },
        t = function(f, j, m, p) {
            var z = l("sitesession", {
                site_id: f,
                user_id: j,
                session_id: m
            });
            e.extend(z, {
                getSiteID: function() {
                    return f
                },
                getUserID: function() {
                    return j
                },
                getSessionID: function() {
                    return m
                },
                getExpires: function() {
                    return p
                },
                getSessionData: function() {
                    return {
                        site_id: f,
                        user_id: j,
                        session_id: m,
                        expires: p
                    }
                }
            });
            return z
        };
    e.extend(e.lr.api, {
        newPlatformSession: function(f, j, m, l) {
            e.lr.api.platformUserLogin(f, j, function(e) {
                m(s(e.UID, e.session_id, e.ttl))
            }, l)
        },
        newPlatformSessionByToken: function(f, j, m) {
            e.lr.api.platformUserLoginByToken(f, function(e) {
                j(s(e.UID, e.session_id, e.session_expires))
            }, m)
        },
        newPlatformSessionByConfirmCode: function(f, j, m) {
            e.lr.api.platformUserLoginByConfirmCode(f,
                function(e) {
                    j(s(e.UID, e.session_id, e.session_expires))
                }, m)
        },
        newPlatformSessionByAdminHash: function(f, j, m) {
            e.lr.api.platformUserLoginByAdminHash(f, function(e) {
                j(s(e.UID, e.session_id, e.session_expires))
            }, m)
        },
        newPlatformSessionFromData: function(e, f, m) {
            if (f || m) f(s(e.user_id, e.session_id, e.expires));
            else return s(e.user_id, e.session_id, e.expires)
        },
        newSiteSession: function(f, j, m, l, p) {
            e.lr.api.siteUserLogin(f, j, m, function(e) {
                l(t(m, e.UID, e.session_id, e.session_expires))
            }, p)
        },
        newSiteSessionByOptInCode: function(f,
            j, m, l) {
            e.lr.api.siteUserLoginByOptInCode(f, j, function(e) {
                m(t(j, e.UID, e.SID, e.session_expires))
            }, l)
        },
        newSiteSessionFromData: function(e, f, m) {
            if (f || m) f(t(e.site_id, e.user_id, e.session_id, e.expires));
            else return t(e.site_id, e.user_id, e.session_id, e.expires)
        }
    })
}(jQuery);
window.lrignition || (window.lrignition = {});
window.lrignition.ThemeBase = function() {
    String.prototype.goodSplit = function(e, p) {
        var l;
        l = this.split(e);
        if (void 0 !== p) {
            for (var s = [], t = 0; t < l.length; t++) t < p ? s.push(l[t]) : (1 > s.length && s.push(""), s[s.length - 1] += e + l[t]);
            l = s
        }
        return l
    };
    var e = function(f, p, l, s) {
        if (!("null" === s || "undefined" === s || null === s || void 0 === s))
            if ($.isArray(l)) $.each(l, function(j, m) {
                e(f, p, m, s)
            });
            else {
                var t = f.getContainer(),
                    r = function(e) {
                        if ($.isArray(e)) {
                            var f = [];
                            $.each(e, function(e, j) {
                                f.push(r(j))
                            });
                            return f
                        }
                        return e.replace("SETTINGNAME",
                            p).replace("SETTINGVALUE", s)
                    };
                if (!$.isPlainObject(l))
                    if ($.isFunction(l)) l = {
                        type: "function",
                        f: l
                    };
                    else if (l = l.goodSplit(" ", 2), 2 == l.length) {
                    var j = l[0],
                        m = l[1].goodSplit(" ", 2),
                        A = l[1].goodSplit(" ", 3);
                    l = "show" == j ? {
                        type: "show",
                        selector: l[1]
                    } : "hide" == j ? {
                        type: "hide",
                        selector: l[1]
                    } : "val" == j ? {
                        type: "val",
                        selector: m[0],
                        value: m[1]
                    } : "text" == j ? {
                        type: "text",
                        selector: m[0],
                        value: m[1]
                    } : "html" == j ? {
                        type: "html",
                        selector: m[0],
                        value: m[1]
                    } : "attr" == j ? {
                        type: "attr",
                        selector: A[0],
                        name: A[1],
                        value: A[2]
                    } : "removeAttr" == j ? {
                        type: "removeAttr",
                        selector: m[0],
                        name: m[1]
                    } : "addClass" == j ? {
                        type: "addClass",
                        selector: m[0],
                        value: m[1]
                    } : "removeClass" == j ? {
                        type: "removeClass",
                        selector: m[0],
                        value: m[1]
                    } : "condClass" == j ? {
                        type: "condClass",
                        selector: m[0],
                        value: m[1]
                    } : "invCondClass" == j ? {
                        type: "invCondClass",
                        selector: m[0],
                        value: m[1]
                    } : "css" == j ? {
                        type: "css",
                        selector: A[0],
                        name: A[1],
                        value: A[2]
                    } : "clickLink" == j ? {
                        type: "clickLink",
                        selector: m[0],
                        value: m[1]
                    } : null
                } else l = null;
                var j = null,
                    z = "";
                l.selector && (j = t.find(l.selector));
                l.value && (z = r(l.value));
                "show" == l.type ? lrSiteSettingAsBoolean(s) ?
                    j.show() : j.hide() : "hide" == l.type ? lrSiteSettingAsBoolean(s) ? j.hide() : j.show() : "val" == l.type ? j.val(z) : "text" == l.type ? j.text(z) : "html" == l.type ? j.html(z) : "attr" == l.type ? j.attr(l.name, z) : "removeAttr" == l.type ? j.removeAttr(l.name) : "addClass" == l.type ? j.addClass(z) : "removeClass" == l.type ? j.removeClass(z) : "condClass" == l.type ? lrSiteSettingAsBoolean(s) ? j.addClass(z) : j.removeClass(z) : "invCondClass" == l.type ? lrSiteSettingAsBoolean(s) ? j.removeClass(z) : j.addClass(z) : "css" == l.type ? j.css(l.name, z) : "clickLink" == l.type ?
                    f.isLive() && j.unbind("click").click(function() {
                        document.location.href = z
                    }) : "function" == l.type && l.f(f, p, s)
            }
    };
    return {
        themeSpec: {},
        themeName: "default",
        updateSetting: function(f, p, l) {
            this.themeSpec[p] && e(f, p, this.themeSpec[p], l)
        },
        hexColorToRGB: function(e) {
            if (!e) return {
                r: 0,
                b: 0,
                g: 0
            };
            var p, l;
            "#" == e.charAt(0) && (e = e.substr(1));
            p = e.charAt(0) + "" + e.charAt(1);
            l = e.charAt(2) + "" + e.charAt(3);
            e = e.charAt(4) + "" + e.charAt(5);
            p = parseInt(p, 16);
            l = parseInt(l, 16);
            e = parseInt(e, 16);
            return {
                r: p,
                g: l,
                b: e
            }
        }
    }
}();
window.lrignition.themesJS || (window.lrignition.themesJS = {});
window.lrignition.themesJS.common = function(e) {
    this.themeName = e;
    var f = this;
    this.funcs = {};
    var p = this.getBooleanSetting = function(e, f) {
        return lrSiteSettingAsBoolean(e.getSetting(f))
    };
    this.updateBoxBG = function(e, f, l) {
        var p = window.lrignition.ThemeBase.hexColorToRGB(f);
        $.each([".LR-box", ".LR-announcement-bar"], function(f, m) {
            e.getContainer().find(m).css("background", "rgb(" + p.r + "," + p.g + "," + p.b + ")");
            e.getContainer().find(m).css("background", "rgba(" + p.r + "," + p.g + "," + p.b + "," + l / 100 + ")")
        })
    };
    e = function(e) {
        var f = !1;
        $.each(["full-name", "phone", "company", "zip", "dob"], function(l, r) {
            p(e, "extraFields.extra-field-" + r) && (f = !0)
        });
        f ? e.getContainer().find(".LR-sign-up-container").addClass("LR-extra-fields") : e.getContainer().find(".LR-sign-up-container").removeClass("LR-extra-fields")
    };
    var l = function(e) {
            var f = null,
                l = null,
                p = null,
                r = null;
            switch (e) {
                case "site":
                    f = "themesettings.bgColorHex";
                    p = "bgImage";
                    r = "bgToggle";
                    break;
                case "header":
                    f = "themesettings.headerBgColorHex";
                    l = "themesettings.headerAlpha";
                    p = "themesettings.headerBgImage";
                    r = "themesettings.headerBgImageToggle";
                    break;
                case "announcement":
                    f = "themesettings.announcementBgColorHex";
                    l = "themesettings.announcementAlpha";
                    break;
                default:
                    f = "themesettings." + e + "BgColorHex", l = "themesettings." + e + "Alpha", p = "themesettings." + e + "BgImage", r = "themesettings." + e + "BgImageToggle"
            }
            return {
                hexColorSetting: f,
                alphaSetting: l,
                imageSetting: p,
                imageToggleSetting: r
            }
        },
        s = this.registerStandardBG = function(e) {
            var m = function(f) {
                    var m, r, q, v;
                    v = l(e);
                    m = v.hexColorSetting ? f.getSetting(v.hexColorSetting) : null;
                    r = v.alphaSetting ?
                        f.getSetting(v.alphaSetting) : null;
                    q = v.imageSetting ? f.getSetting(v.imageSetting) : null;
                    v = v.imageToggleSetting ? p(f, v.imageToggleSetting) : !0;
                    f = f.getContainer();
                    q && v ? (f.find(".LR-" + e + "-bg-image-container").css("background-image", "url('" + q + "')"), f.find(".LR-" + e + "-show-on-bg-image").show()) : f.find(".LR-" + e + "-show-on-bg-image").hide();
                    m ? (m = window.lrignition.ThemeBase.hexColorToRGB(m), $colorEl = f.find(".LR-" + e + "-bg-color-container"), $colorEl.css("background", "rgb(" + m.r + "," + m.g + "," + m.b + ")"), null !== r && $colorEl.css("background",
                        "rgba(" + m.r + "," + m.g + "," + m.b + "," + r / 100 + ")"), f.find(".LR-" + e + "-show-on-bg-color").show()) : f.find(".LR-" + e + "-show-on-bg-color").hide()
                },
                r = l(e);
            $.each(r, function(e, j) {
                j && (f.themeSpec[j] = m)
            })
        },
        t = function(e) {
            p(e, "logoToggle") && e.getSetting("logo") ? (p(e, "logoToggle") && e.getContainer().find(".LR-site-logo").show(), e.getContainer().find(".LR-site-title").hide()) : (e.getContainer().find(".LR-site-logo").hide(), e.getContainer().find(".LR-site-title").show())
        },
        r = function(e) {
            var f = !1;
            $.each("socialLinks.twitter-social-link.toggled socialLinks.facebook-social-link.toggled socialLinks.rss-social-link.toggled socialLinks.tumblr-social-link.toggled socialLinks.pinterest-social-link.toggled socialLinks.instagram-social-link.toggled socialLinks.github-social-link.toggled socialLinks.youtube-social-link.toggled socialLinks.vimeo-social-link.toggled socialLinks.blog-social-link.toggled".split(" "),
                function(l, r) {
                    p(e, r) && (f = !0)
                });
            var l = e.getContainer().find(".LR-site-connect .LR-share-label");
            f ? l.css("visibility", "") : l.css("visibility", "hidden")
        };
    this.themeSpec = $.extend({}, window.lrignition.ThemeBase.themeSpec, {
        siteName: "text .LR-site-title SETTINGVALUE",
        announcementBanner: "html .LR-announcement SETTINGVALUE",
        announcementBannerToggle: "show .LR-announcement-bar",
        logo: ['html .LR-site-logo <img src="SETTINGVALUE" />', t],
        logoToggle: t,
        siteNameToggle: t,
        incentive: "html .LR-site-incentive SETTINGVALUE",
        incentiveToggle: "show .LR-site-incentive",
        tagline: "html .LR-site-tagline SETTINGVALUE",
        taglineToggle: "show .LR-site-tagline",
        description: "html .LR-site-description SETTINGVALUE",
        descriptionToggle: "show .LR-site-description",
        inviteList: "html .LR-sign-up-label SETTINGVALUE",
        instructionsToggle: "show .LR-sign-up-label",
        emailShareToggle: "show .LR-site-share-email",
        fbRecommendToggle: "show .LR-share-facebook-like",
        fbShareToggle: "show .LR-share-facebook-send",
        tweetToggle: "show .LR-share-tweet",
        linkedInShareToggle: "show .LR-share-linkedin",
        shareOnTumblrToggle: "show .LR-share-tumblr",
        "themesettings.linkExBgColorHex": function(e) {
            if (e.getSetting("themesettings.linkExBgColorHex")) {
                var f = window.lrignition.ThemeBase.hexColorToRGB(e.getSetting("themesettings.bgColorHex"));
                e.getContainer().find("#LR-exchangeContainer").css("background", "rgb(" + f.r + "," + f.g + "," + f.b + ")")
            } else e.getContainer().find("#LR-exchangeContainer").css("background", "")
        },
        linkExLinks: function(e, f, l) {
            e = e.getContainer();
            0 == l.length ? e.find(".LR-content").removeClass("LR-lx") :
                (f = function(e, f, j) {
                    f.linkExLogo ? e.find(".LR-lxImg img").attr("src", f.linkExLogo) : e.find(".LR-lxImg img").hide();
                    f.linkExSiteTagline ? e.find(".LR-lxTxt").text(f.linkExSiteTagline) : e.find(".LR-lxTxt").text("");
                    e.unbind("click").click(function() {
                        document.location.href = j
                    })
                }, f(e.find(".LR-lxCompanyOne"), l[0].settings, l[0].url), e.find(".LR-lxCompanyOne").show(), 1 < l.length ? (f(e.find(".LR-lxCompanyTwo"), l[1].settings, l[1].url), e.find(".LR-lxCompanyTwo").show()) : e.find(".LR-lxCompanyTwo").hide(), e.find(".LR-content").addClass("LR-lx"))
        },
        "extraFields.extra-field-full-name": ["show .first-name", "show .last-name", e],
        "extraFields.extra-field-phone": ["show .phone-number", e],
        "extraFields.extra-field-company": ["show .company", e],
        "extraFields.extra-field-zip": ["show .zipcode", e],
        "extraFields.extra-field-dob": ["show .birthdate", e],
        "socialLinks.twitter-social-link.toggled": ["show .connect-twitter", r],
        "socialLinks.twitter-social-link.value": "clickLink .connect-twitter SETTINGVALUE",
        "socialLinks.facebook-social-link.toggled": ["show .connect-facebook",
            r
        ],
        "socialLinks.facebook-social-link.value": "clickLink .connect-facebook SETTINGVALUE",
        "socialLinks.rss-social-link.toggled": ["show .connect-rss", r],
        "socialLinks.rss-social-link.value": "clickLink .connect-rss SETTINGVALUE",
        "socialLinks.tumblr-social-link.toggled": ["show .connect-tumblr", r],
        "socialLinks.tumblr-social-link.value": "clickLink .connect-tumblr SETTINGVALUE",
        "socialLinks.pinterest-social-link.toggled": ["show .connect-pinterest", r],
        "socialLinks.pinterest-social-link.value": "clickLink .connect-pinterest SETTINGVALUE",
        "socialLinks.instagram-social-link.toggled": ["show .connect-instagram", r],
        "socialLinks.instagram-social-link.value": "clickLink .connect-instagram SETTINGVALUE",
        "socialLinks.github-social-link.toggled": ["show .connect-github", r],
        "socialLinks.github-social-link.value": "clickLink .connect-github SETTINGVALUE",
        "socialLinks.youtube-social-link.toggled": ["show .connect-youtube", r],
        "socialLinks.youtube-social-link.value": "clickLink .connect-youtube SETTINGVALUE",
        "socialLinks.vimeo-social-link.toggled": ["show .connect-vimeo",
            r
        ],
        "socialLinks.vimeo-social-link.value": "clickLink .connect-vimeo SETTINGVALUE",
        "socialLinks.blog-social-link.toggled": ["show .connect-blog", r],
        "socialLinks.blog-social-link.value": "clickLink .connect-blog SETTINGVALUE",
        favicon: function(e, f, l) {
            !e.isWidget() && e.isLive() && $("head").append($("<link />").attr("rel", "shortcut icon").attr("href", l))
        }
    });
    s("site");
    s("header");
    s("announcement");
    this.setMode = function(e, f) {
        var l = e.getContainer();
        "main" == f ? (l.find(".LR-content").removeClass("LR-sharing-page"),
            l.find(".LR-site-share").hide(), l.find(".LR-sign-up-container").show()) : "postsignup" == f && (l.find(".LR-content").addClass("LR-sharing-page"), l.find(".LR-sign-up-container").hide(), l.find(".LR-site-share").show())
    };
    this.init = [];
    this.init.push(function(e) {
        e = e.getContainer();
        var f = e.find(".LR-share-email-emails"),
            l = e.find(".LR-share-email-hide");
        l.hide();
        f.unbind("input").bind("input", function() {
            f.val() ? l.show() : l.hide()
        })
    })
};
window.lrignition.themesJS.common.prototype = window.lrignition.ThemeBase;
window.lrignition.themesJS.classic = function() {
    var e = this;
    $.extend(this.themeSpec, {
        boxBackgroundColorHex: function(f, p, l) {
            e.updateBoxBG(f, l, f.getSetting("boxAlpha"))
        },
        boxAlpha: function(f, p, l) {
            e.updateBoxBG(f, f.getSetting("boxBackgroundColorHex"), l)
        },
        boxPosition: function(e, p, l) {
            e = e.getContainer().find(".LR-box-wrapper");
            var s = p = "auto";
            "left" == l ? p = "20px" : "right" == l && (s = "20px");
            e.css({
                "margin-left": p,
                "margin-right": s
            })
        }
    });
    this.init.push(function() {})
};
window.lrignition.themesJS.classic.prototype = new window.lrignition.themesJS.common("classic");
window.lrignition.themesJS.clean = function() {
    $.extend(this.themeSpec, {
        "themesettings.imageGradient": "show .LR-bg-img-overlay"
    });
    this.init.push(function() {})
};
window.lrignition.themesJS.clean.prototype = new window.lrignition.themesJS.common("clean");
window.lrignition.themesJS.focus = function() {
    $.extend(this.themeSpec, {
        "themesettings.imageGradient": "show .LR-bg-img-overlay",
        taglineToggle: ["show .LR-site-tagline", "invCondClass .LR-box .LR-noTagline"]
    });
    this.init.push(function() {})
};
window.lrignition.themesJS.focus.prototype = new window.lrignition.themesJS.common("focus");
window.lrignition.themesJS.mobile_app = function() {
    $.extend(this.themeSpec, {
        "themesettings.deviceLayout": function(e, f, p) {
            f = function(f) {
                return e.getContainer().find(f)
            };
            switch (p) {
                case "iphone":
                    f(".LR-deviceOne-wrapper").show();
                    f(".LR-deviceTwo-wrapper").hide();
                    f(".LR-box-devices").removeClass("LR-android LR-iphoneFront LR-androidFront").addClass("LR-iphone");
                    break;
                case "iphoneandroid":
                    f(".LR-deviceOne-wrapper").show();
                    f(".LR-deviceTwo-wrapper").show();
                    f(".LR-box-devices").removeClass("LR-android LR-iphone LR-androidFront").addClass("LR-iphoneFront");
                    break;
                case "androidiphone":
                    f(".LR-deviceOne-wrapper").show();
                    f(".LR-deviceTwo-wrapper").show();
                    f(".LR-box-devices").removeClass("LR-android LR-iphone LR-iphoneFront").addClass("LR-androidFront");
                    break;
                case "android":
                    f(".LR-deviceOne-wrapper").hide(), f(".LR-deviceTwo-wrapper").show(), f(".LR-box-devices").removeClass("LR-iphone LR-iphoneFront LR-androidFront").addClass("LR-android")
            }
        },
        "themesettings.iphoneScreenshot": function(e, f, p) {
            e.getContainer().find(".LR-deviceOneImg img").attr("src", p)
        },
        "themesettings.androidScreenshot": function(e,
            f, p) {
            e.getContainer().find(".LR-deviceTwoImg img").attr("src", p)
        }
    });
    this.init.push(function() {})
};
window.lrignition.themesJS.mobile_app.prototype = new window.lrignition.themesJS.common("mobile_app");
window.lrignition.themesJS.neostylus = function() {
    var e = function(e, p, l) {
        p = window.lrignition.ThemeBase.hexColorToRGB(p);
        e.getContainer().find(".LR-site-tagline p").css("background", "rgb(" + p.r + "," + p.g + "," + p.b + ")");
        e.getContainer().find(".LR-site-tagline p").css("background", "rgba(" + p.r + "," + p.g + "," + p.b + "," + l / 100 + ")")
    };
    $.extend(this.themeSpec, {
        tagline: function(f, p, l) {
            p = l.split(" ");
            var s = [],
                t = "";
            $.each(p, function(e, f) {
                13 < t.length && (s.push($.trim(t)), t = "");
                t = t + f + " "
            });
            t && s.push($.trim(t));
            var r = f.getContainer().find(".LR-site-tagline");
            r.empty();
            $.each(s, function(e, f) {
                r.append($("<p />").text(f))
            });
            r.append($("<div />").addClass("LR-clearfix"));
            e(f, f.getSetting("themesettings.taglineHighlightColor"), f.getSetting("themesettings.taglineHighlightOpacity"))
        },
        "themesettings.overlayColor": "css .LR-bg-img-overlay background SETTINGVALUE",
        "themesettings.overlayOpacity": function(e, p, l) {
            e.getContainer().find(".LR-bg-img-overlay").css({
                opacity: l / 100,
                filter: "alpha(opacity=" + l + ")"
            })
        },
        "themesettings.taglineHighlightColor": function(f, p, l) {
            e(f,
                l, f.getSetting("themesettings.taglineHighlightOpacity"))
        },
        "themesettings.taglineHighlightOpacity": function(f, p, l) {
            e(f, f.getSetting("themesettings.taglineHighlightColor"), l)
        }
    });
    this.init.push(function() {})
};
window.lrignition.themesJS.neostylus.prototype = new window.lrignition.themesJS.common("neostylus");
window.lrignition.themesJS.video = function() {
    $.extend(this.themeSpec, {
        "themesettings.videoEmbedCode": function(e, f, p) {
            e = e.getContainer().find(".LR-video-container");
            p && "none" != p && "null" != p ? e.html(p) : e.html('<img src="js/ignition/themes/video/img/videoplayer.png" alt="img"/>')
        },
        taglineToggle: ["show .LR-site-tagline", "invCondClass .LR-box LR-noTagline"]
    });
    this.init.push(function() {})
};
window.lrignition.themesJS.video.prototype = new window.lrignition.themesJS.common("video");
! function(e) {
    window.lrignition || (window.lrignition = {});
    window.lrignition.themeSpecs || (window.lrignition.themeSpecs = {});
    var f = function(e, f, s, t) {
        f = {
            name: e,
            baseTheme: s || "common",
            html: {
                main: {
                    name: "theme_" + e + "_main",
                    url: "themes/" + e + "/" + e + ".html"
                }
            },
            css: {
                main: {
                    name: "theme_" + e,
                    url: "themes/" + e + "/" + e + ".css"
                },
                mainMobile: {
                    name: "theme_" + e + "-mobile",
                    url: "themes/" + e + "/" + e + "-mobile.css",
                    mediaName: "mobile",
                    mediaQuery: "only screen and (min-device-width : 320px) and (max-device-width : 480px)"
                }
            },
            js: f ? [{
                name: "theme_" +
                    e,
                url: "themes/" + e + "/" + e + ".js"
            }] : []
        };
        t && (f.css.mainTablet = {
            name: "theme_" + e + "-tablet",
            url: "themes/" + e + "/" + e + "-tablet.css",
            mediaName: "tablet",
            mediaQuery: "(min-height: 600px) and (max-height: 799px)"
        });
        return f
    };
    e.extend(window.lrignition.themeSpecs, {
        common: {
            name: "common",
            js: [{
                name: "theme_common",
                url: "themes/common/common.js"
            }]
        },
        classic: {
            name: "classic",
            baseTheme: "common",
            html: {
                main: {
                    name: "theme_classic_main",
                    url: "themes/classic/classic.html"
                }
            },
            js: [{
                name: "theme_classic",
                url: "themes/classic/classic.js"
            }],
            css: {
                main: {
                    name: "theme_classic",
                    url: "themes/classic/classic.css"
                },
                mainMobile: {
                    name: "theme_classic-mobile",
                    url: "themes/classic/classic-mobile.css",
                    mediaName: "mobile",
                    mediaQuery: "only screen and (min-device-width : 320px) and (max-device-width : 480px)"
                },
                fonts1: {
                    name: "theme_font_montserrat",
                    url: "http://fonts.googleapis.com/css?family=Montserrat"
                }
            }
        },
        video: {
            name: "video",
            baseTheme: "common",
            html: {
                main: {
                    name: "theme_video_main",
                    url: "themes/video/video.html"
                }
            },
            css: {
                main: {
                    name: "theme_video",
                    url: "themes/video/video.css"
                },
                mainMobile: {
                    name: "theme_video-mobile",
                    url: "themes/video/video-mobile.css",
                    mediaName: "mobile",
                    mediaQuery: "only screen and (min-device-width : 320px) and (max-device-width : 480px)"
                }
            },
            js: [{
                name: "theme_video",
                url: "themes/video/video.js"
            }]
        },
        mobile_app: f("mobile_app", !0),
        clean: f("clean", !0),
        focus: f("focus", !0, null, !0),
        neostylus: f("neostylus", !0)
    })
}(jQuery);
! function(e) {
    window.lrLoadedJs = e.extend({}, window.lrLoadedJs || {}, {
        json: !0,
        jquery: !0,
        jquerycookie: !0,
        jqueryplaceholder: !0,
        lrapi_internal: !0,
        lrapi_public: !0,
        lrapi: !0,
        theme_base: !0,
        theme_common: !0,
        theme_classic: !0,
        theme_clean: !0,
        theme_focus: !0,
        theme_mobile_app: !0,
        theme_neostylus: !0,
        theme_video: !0,
        presetThemes: !0
    })
}(jQuery);
var lrSiteSettingAsBoolean = function(e) {
        return "1" == e || "true" == e || "TRUE" == e || "yes" == e ? !0 : !1
    },
    _gaq = _gaq || [];
! function() {
    void 0 === window.console && (window.console = {
        log: function() {}
    });
    var e = document.getElementsByTagName("script"),
        f = e[e.length - 1].src.split("/");
    0 < f.length && (f.length -= 1);
    for (var e = "", p = 0; p < f.length; p++) e += f[p] + "/";
    var e = window.lrIgnBase || e,
        f = e + "libs/LRAPI/",
        p = e + "libs/jQuery/jquery-1.8.0.js",
        l = e + "libs/jQuery/jquery.cookie.js",
        s = e,
        t = e,
        r = e,
        j = e,
        m = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
        A = function(e, f, j) {
            var l = function(e, f) {
                if ("data:" == e.substr(0, 5)) {
                    var j =
                        e.substr(5);
                    eval(j);
                    f && f()
                } else {
                    var l = document.createElement("script");
                    l.src = e;
                    l.onload = l.onreadystatechange = function() {
                        if (!this.readyState || "loaded" === this.readyState || "complete" === this.readyState) l.onload = l.onreadystatechange = null, f && f()
                    };
                    m.appendChild(l)
                }
            };
            window.lrLoadedJs && window.lrLoadedJs[e] ? j && j() : window.lrLoadingJs && void 0 !== window.lrLoadingJs[e] ? j && window.lrLoadingJs[e].push(j) : (window.lrLoadingJs || (window.lrLoadingJs = {}), window.lrLoadingJs[e] = [], j && window.lrLoadingJs[e].push(j), l(f, function() {
                window.lrLoadedJs ||
                    (window.lrLoadedJs = {});
                window.lrLoadedJs[e] = !0;
                var f;
                for (f = 0; f < window.lrLoadingJs[e].length; f++) window.lrLoadingJs[e][f]();
                window.lrLoadingJs[e] = []
            }))
        },
        z = function(e, f) {
            var j = function(l) {
                l >= e.length ? f && f() : A(e[l].name, e[l].url, function() {
                    j(l + 1)
                })
            };
            j(0)
        };
    z([{
        name: "json",
        url: e + "libs/JSON/json2.js"
    }, {
        name: "jquery",
        url: p
    }, {
        name: "jquerycookie",
        url: l
    }, {
        name: "jqueryplaceholder",
        url: e + "libs/jQuery/jquery.placeholder.js"
    }, {
        name: "lrapi_internal",
        url: f + "lrapi_internal.js"
    }, {
        name: "lrapi_public",
        url: f + "lrapi_public.js"
    }, {
        name: "lrapi",
        url: f + "lrapi.js"
    }, {
        name: "theme_base",
        url: s + "/theme_base.js"
    }, {
        name: "presetThemes",
        url: s + "/presetThemes.js"
    }], function() {
        var e = function(e, f) {
            var l = this,
                p = function(e) {
                    window.lrLoadedCss && window.lrLoadedCss[e] && (window.lrLoadedCss[e].remove(), delete window.lrLoadedCss[e])
                },
                L = function(e, f, j, c) {
                    window.lrLoadedHtml && window.lrLoadedHtml[f] ? (e.html(window.lrLoadedHtml[f]), c && c()) : "asset:" == j.substring(0, 6) ? $.lr.api.downloadSiteAsset(j.split(":")[1].split("/")[0], j.split(":")[1].split("/")[1],
                        function(j) {
                            j = j.data;
                            window.lrLoadedHtml || (window.lrLoadedHtml = {});
                            window.lrLoadedHtml[f] = j;
                            e.html(j);
                            c && c()
                        }) : e.load(j, null, function(e) {
                        window.lrLoadedHtml || (window.lrLoadedHtml = {});
                        window.lrLoadedHtml[f] = e;
                        c && c()
                    })
                },
                x = {},
                K = function(e, f) {
                    if (void 0 !== e) {
                        var j = e.split("."),
                            c = [];
                        c.push(j.shift());
                        j.length && c.push(j.join("."));
                        if (f[c[0]]) f = f[c[0]];
                        else if (2 == c.length && !$.isPlainObject(f)) f = JSON.parse(f)[c[0]];
                        else return;
                        return 2 == c.length ? K(c[1], f) : f
                    }
                },
                C = function(e) {
                    return x[e] ? x[e] : K(e, x)
                },
                N = null,
                pa = "main",
                qa = [],
                aa = function(e) {
                    pa = e;
                    N && N.setMode(l, e)
                },
                ra = function(e, f) {
                    return "http://" == e.substr(0, 7) || "https://" == e.substr(0, 8) || "asset:" == e.substr(0, 6) || "/" == e.substr(0, 1) ? e : 1 < f.length && "/" == f.substr(f.length - 1, 1) ? f + e : f + "/" + e
                },
                ha = function(e, f) {
                    "string" == typeof e && "{" == e.substr(0, 1) && (e = JSON.parse(e));
                    if ($.isPlainObject(e)) {
                        var j = function(c) {
                            var j = function() {
                                var j = {};
                                j.name = e.name || (c ? c.name : void 0);
                                j.baseTheme = e.baseTheme;
                                j.html = $.extend({}, (c ? c.html : {}) || {}, e.html || {});
                                j.css = $.extend({}, (c ? c.css : {}) || {}, e.css || {});
                                j.options = $.extend({}, (c ? c.options : {}) || {}, e.options || {});
                                j.names = [];
                                e.name && j.names.push(e.name);
                                c && c.names && $.each(c.names, function(c, e) {
                                    j.names.push(e)
                                });
                                f && f(j)
                            };
                            if (e.js) {
                                var l = [];
                                $.each(e.js, function(c, e) {
                                    var f;
                                    if (e.url) f = ra(e.url, s);
                                    else if (e.data) f = "data:" + e.data;
                                    else return;
                                    l.push({
                                        name: e.name,
                                        url: f
                                    })
                                });
                                l.length ? z(l, j) : j()
                            } else j()
                        };
                        e.baseTheme ? ha(e.baseTheme, j) : j()
                    } else window.lrignition.themeSpecs[e] ? ha(window.lrignition.themeSpecs[e], f) : f && f()
                },
                Aa = function(f, j, q) {
                    var c =
                        function(c) {
                            $.each(qa, function(c, e) {
                                p(e)
                            });
                            qa = [];
                            c.css && $.each(c.css, function(c, e) {
                                var f = !0,
                                    j = !0;
                                if (e.mediaName && q) {
                                    var l, p = !1,
                                        j = !1;
                                    l = $.isArray(e.mediaName) ? e.mediaName : [e.mediaName];
                                    $.each(l, function(c, e) {
                                        "common" == e && (p = !0)
                                    });
                                    p || (f = !1, $.each(l, function(c, e) {
                                        e == q && (f = !0)
                                    }))
                                }!1 !== f && e.data && (window.lrEmbeddedCss || (window.lrEmbeddedCss = {}), window.lrEmbeddedCss[e.name] = e.data);
                                if (f) {
                                    l = {};
                                    j && e.mediaQuery && (l.media = e.mediaQuery);
                                    var s = e.url ? ra(e.url, r) : null;
                                    j = e.name;
                                    if (!window.lrLoadedCss || !window.lrLoadedCss[j]) s =
                                        window.lrEmbeddedCss && window.lrEmbeddedCss[j] ? $('<style type="text/css"></style>').text(window.lrEmbeddedCss[j]) : $('<link rel="stylesheet" type="text/css" />').attr("href", s), l && s.attr(l), $(m).append(s), window.lrLoadedCss || (window.lrLoadedCss = {}), window.lrLoadedCss[j] = s;
                                    qa.push(e.name)
                                }
                            });
                            var f = function() {
                                    $("input[placeholder], textarea[placeholder]").placeholder();
                                    c.options && J("themeOptions", c.options, !0);
                                    var e = null;
                                    c.name && window.lrignition.themesJS[c.name] ? e = window.lrignition.themesJS[c.name] :
                                        c.names && $.each(c.names, function(c, f) {
                                            if (window.lrignition.themesJS[f]) return e = window.lrignition.themesJS[f], !1
                                        });
                                    e ? (N = new e(c.name || "custom", c.options), N.init && ($.isArray(N.init) ? $.each(N.init, function(c, e) {
                                        e.call(N, l)
                                    }) : N.init(l))) : console.log("No theme constructor found.");
                                    j && j()
                                },
                                s = 0,
                                u = 0,
                                F = !1;
                            c.html && $.each(c.html, function(c, j) {
                                j.data && (window.lrLoadedHtml || (window.lrLoadedHtml = {}), window.lrLoadedHtml[j.name] = j.data);
                                var l = e;
                                j.selector && (l = $(j.selector));
                                var m = j.url ? ra(j.url, t) : null;
                                s++;
                                L(l,
                                    j.name, m,
                                    function() {
                                        u++;
                                        F && u == s && f()
                                    })
                            });
                            (F = !0) && u == s && f()
                        };
                    ha(f, function(e) {
                        e ? c(e) : (console.log("Error loading theme.  Falling back to classic."), ha("classic", function(e) {
                            e && c(e)
                        }))
                    })
                },
                J = function(e, f, j) {
                    j ? x[e] = f : (j = f, x[e] = j, N && N.updateSetting(l, e, j));
                    j = function(c) {
                        c && $.each(c, function(c, f) {
                            J(e + "." + c, f)
                        })
                    };
                    $.isPlainObject(f) ? j(f) : (f = "" + f) && "{" == f.substr(0, 1) && j(JSON.parse(f))
                },
                O = function() {
                    $.each(x, function(e, f) {
                        N && N.updateSetting(l, e, f)
                    })
                },
                ia = {
                    announcementBanner: "Announcement goes here!"
                },
                Ca = function(l,
                    m) {
                    var p = function() {
                            if (f.siteInfo) {
                                x = ia;
                                $.each(f.siteInfo, function(c, e) {
                                    J(c, e, !0)
                                });
                                var c = function() {
                                    O();
                                    l && l()
                                };
                                x.theme ? Aa(x.theme, c) : c()
                            } else m && m("badparam", "Requires a site_id or domain")
                        },
                        c = 0,
                        r = function() {
                            c++;
                            2 == c && p && p()
                        },
                        s = function(c) {
                            if (c) {
                                f.siteInfo = c;
                                f.domain || (f.domain = c.siteDomain);
                                f.site_id || (f.site_id = c.SID);
                                var l = null;
                                2 <= window.location.search.length && $.each(window.location.search.substring(1).split("&"), function(c, e) {
                                    var f = e.split("=", 2);
                                    f[0] && "lrRef" == f[0] && 1 < f.length && (l = decodeURIComponent(f[1]))
                                });
                                c = l;
                                f.refcode = c || "0";
                                c ? $.lr.api.getSiteUserChannelLink(f.site_id, c, function(c) {
                                    f.siteUserChannelLink = c;
                                    f.parent_id = c.UID;
                                    r && r()
                                }, m) : r && r()
                            } else L(e, "badSiteModal", j + "/badSiteModal.html")
                        };
                    f.site_id ? f.useUnlaunchedInfo ? $.lr.api.getSiteInfo(f.site_id, s, m) : $.lr.api.getLaunchedSiteInfo(f.site_id, s, m) : f.domain ? $.lr.api.getSiteInfoByDomain(f.domain, s, m) : r && r();
                    $.lr.api.getClientIP(function(c) {
                        f.client_ip = c.ip;
                        r && r(c.ip)
                    }, m)
                },
                Da = function(e, j) {
                    f.site_id && null !== f.refcode && void 0 !== f.refcode ? $.lr.api.clickTrack(f.site_id,
                        f.parent_id || "0", f.refcode || "0", navigator.userAgent, f.client_ip, document.referrer,
                        function(j) {
                            f.clicktrack_source = j.source;
                            e && e()
                        }, j) : j && j("unavailabledata", "Not all data available")
                },
                sa = {
                    "first-name": ".first-name",
                    "last-name": ".last-name",
                    "phone-number": ".phone-number",
                    company: ".company",
                    dob: ".birthdate",
                    "zip-code": ".zipcode"
                },
                u = function() {
                    var e = [];
                    lrSiteSettingAsBoolean(C("fbRecommendToggle")) && e.push("facebook_like");
                    lrSiteSettingAsBoolean(C("fbShareToggle")) && e.push("facebook_share");
                    (lrSiteSettingAsBoolean(C("linkedInShareToggle")) ||
                        lrSiteSettingAsBoolean(C("linkedInToggle"))) && e.push("linkedin");
                    (lrSiteSettingAsBoolean(C("shareOnTumblrToggle")) || lrSiteSettingAsBoolean(C("tumblrToggle"))) && e.push("tumblr");
                    lrSiteSettingAsBoolean(C("tweetToggle")) && e.push("twitter");
                    lrSiteSettingAsBoolean(C("emailShareToggle")) && e.push("email");
                    lrSiteSettingAsBoolean(C("shareLinkToggle")) && e.push("link");
                    return e
                },
                Ma = function() {
                    return "wg" == C("launchFormFactor")
                },
                ta = function() {
                    if (Ma() && C("widgetUrl")) {
                        var e = C("widgetUrl");
                        "http" != e.substr(0, 4).toLowerCase() &&
                            (e = "http://" + e);
                        return e
                    }
                    return document.location.protocol + "//" + document.location.host + document.location.pathname
                },
                Na = function() {
                    var f = e.find(".LR-share-email-emails").val().split(",");
                    $.each(f, function(e, j) {
                        f[e] = $.trim(j)
                    });
                    return f
                },
                Oa = function(e) {
                    document.createElement("img").src = "http://hbtrk.launchrock.com:8000/tracking_pixel.gif?event=" + encodeURIComponent(e)
                },
                ja = !1,
                U = function(j, l) {
                    if (!ja && !f.site_user_id) {
                        var m;
                        var c = e.find(".signup-email"),
                            p = c.val();
                        "" == p ? (c.addClass("error"), m = null) : (c.removeClass("error"),
                            m = p);
                        var r;
                        var s = [];
                        lrSiteSettingAsBoolean(C("extraFields.extra-field-full-name")) && (s.push("first-name"), s.push("last-name"));
                        lrSiteSettingAsBoolean(C("extraFields.extra-field-phone")) && s.push("phone-number");
                        lrSiteSettingAsBoolean(C("extraFields.extra-field-company")) && s.push("company");
                        lrSiteSettingAsBoolean(C("extraFields.extra-field-zip")) && s.push("zip-code");
                        lrSiteSettingAsBoolean(C("extraFields.extra-field-dob")) && s.push("dob");
                        var t = {},
                            v = !0;
                        $.each(sa, function(c, f) {
                            var j = !1;
                            $.each(s, function(e,
                                f) {
                                f == c && (j = !0)
                            });
                            if (j) {
                                var l = e.find(f),
                                    m = l.val(),
                                    p;
                                if ("phone-number" == c) {
                                    p = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;
                                    var q = m.split("").length;
                                    p = 10 <= q && 20 >= q && p.test(m)
                                } else p = "dob" == c ? /^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9]?[0-9]?$/.test(m) : "" != m;
                                p ? (t[c] = m, l.removeClass("error")) : (v = !1, l.addClass("error"))
                            }
                        });
                        r = v ? t : null;
                        var x = 0;
                        r && $.each(r, function() {
                            x++
                        });
                        null === m || null === r ? l && l("invalidfields", "Some fields are invalid.") : (ja = !0, $.lr.api.createSiteUser(m,
                            "", f.parent_id || "", f.site_id, 0 == x ? null : JSON.stringify(r), f.clicktrack_source, f.refcode, f.client_ip,
                            function(c) {
                                ja = !1;
                                f.site_user_id = c.UID;
                                f.site_user_email = m;
                                f.site_user_extra_fields = r;
                                c = JSON.stringify({
                                    s: f.site_id,
                                    u: f.site_user_id,
                                    e: f.site_user_email,
                                    x: f.site_user_extra_fields
                                });
                                $.cookie("lrSiteUser" + f.site_id, c, {
                                    expires: 365
                                });
                                aa("postsignup");
                                C("linkExchGroup") && $.lr.api.getDisplayExchangedLinks(f.site_id, 2, function(c) {
                                    var e = [],
                                        j = c.length,
                                        l = function() {
                                            0 == j && 0 < e.length && J("linkExLinks", e)
                                        };
                                    l();
                                    $.each(c,
                                        function(c, m) {
                                            $.lr.api.getSiteInfo(m, function(c) {
                                                var p = "wg" == c.launchFormFactor && c.widgetUrl ? c.widgetUrl : document.location.protocol + "//" + c.siteDomain;
                                                p ? $.lr.api.createSiteLinkExChannelLink(m, f.site_id, "linkexch", p, function(f) {
                                                    f = f.ref_url || (p || ta()) + "?lrRef=" + f.ref_code;
                                                    e.push({
                                                        site_id: m,
                                                        settings: c,
                                                        url: f
                                                    });
                                                    j--;
                                                    l()
                                                }, function() {
                                                    j--;
                                                    l()
                                                }) : (j--, l())
                                            }, function() {
                                                j--;
                                                l()
                                            })
                                        })
                                });
                                var l = function(c) {
                                    var f = function() {
                                            window.lrFacebookInit || ($("html").attr("xmlns:fb", "http://ogp.me/ns/fb#"), $("#fb-root").length ?
                                                $("#fb-root").after("<script>(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)) return;js=d.createElement(s);js.id=id;js.src=\"https://connect.facebook.net/en_US/all.js#xfbml=1&appId=255930487765390\";fjs.parentNode.insertBefore(js,fjs);}(document,'script','facebook-jssdk'));\x3c/script>") : $("body").prepend("<div id=\"fb-root\"></div><script>(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)) return;js=d.createElement(s);js.id=id;js.src=\"https://connect.facebook.net/en_US/all.js#xfbml=1&appId=255930487765390\";fjs.parentNode.insertBefore(js,fjs);}(document,'script','facebook-jssdk'));\x3c/script>"),
                                                window.lrFacebookInit = !0)
                                        },
                                        j = u();
                                    $.each(j, function(j, l) {
                                        var m;
                                        if (m = c[l]) switch (l) {
                                            case "facebook_like":
                                                var p = e.find(".LR-share-facebook-like").empty();
                                                m = $("<div />").addClass("fb-like").attr({
                                                    "data-href": m,
                                                    "data-layout": "button_count"
                                                });
                                                f();
                                                p.append(m);
                                                break;
                                            case "facebook_share":
                                                p = e.find(".LR-share-facebook-send").empty();
                                                m = $("<div />").addClass("fb-send").attr({
                                                    "data-href": m,
                                                    "data-layout": "button_count"
                                                });
                                                f();
                                                p.append(m);
                                                break;
                                            case "linkedin":
                                                p = e.find(".LR-share-linkedin").empty();
                                                m = $(document.createElement("script")).attr({
                                                    type: "IN/Share",
                                                    "data-url": m
                                                });
                                                p.append('<script src="https://platform.linkedin.com/in.js" type="text/javascript">\x3c/script>', m);
                                                break;
                                            case "tumblr":
                                                var p = e.find(".LR-share-tumblr").empty(),
                                                    q = document.createElement("script");
                                                q.type = "text/javascript";
                                                q.src = "http://platform.tumblr.com/v1/share.js";
                                                document.body.appendChild(q);
                                                encodeURIComponent(m);
                                                C("tumblrName") && encodeURIComponent(C("tumblrName"));
                                                C("tumblrDesc") && encodeURIComponent(C("tumblrDesc"));
                                                C("tumblrImage") && encodeURIComponent(C("tumblrImage"));
                                                m = $("<a />").attr({
                                                    href: "http://www.tumblr.com/share/link?url=" +
                                                        encodeURIComponent(m) + "&name=" + encodeURIComponent(C("tumblrName")) + "&description=" + encodeURIComponent(C("tumblrDesc")),
                                                    style: "display:inline-block; text-indent:-9999px; overflow:hidden; width:81px; height:20px; background:url('http://platform.tumblr.com/v1/share_1.png') top left no-repeat transparent;",
                                                    title: "Share on Tumblr"
                                                });
                                                p.append(m);
                                                break;
                                            case "twitter":
                                                p = e.find(".LR-share-tweet").empty();
                                                m = $("<a />").addClass("twitter-share-button").attr({
                                                    href: "",
                                                    "class": "twitter-share-button",
                                                    "data-url": m,
                                                    "data-text": C("twitterMessage"),
                                                    "data-count": "none"
                                                });
                                                p.append(m, '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");\x3c/script>');
                                                break;
                                            case "link":
                                                p = e.find(".LR-share-link"), p.is("input") ? p.val(m) : p.text(m)
                                        }
                                    })
                                };
                                if (void 0 !== f.siteShareUrls) l(f.siteShareUrls);
                                else {
                                    var p = u(),
                                        s = {},
                                        t = ta(),
                                        v = 0,
                                        x = function() {
                                            v++;
                                            v == p.length && (f.siteShareUrls = s, l(s))
                                        },
                                        z = ["facebook_like", "facebook_share"];
                                    $.each(p, function(c, e) {
                                        $.lr.api.createSiteUserChannelLink(f.site_id, f.site_user_id, e, t, function(c) {
                                            c = -1 != $.inArray(e, z) ? ta() + "?lrRef=" + c.ref_code : c.ref_url || ta() + "?lrRef=" + c.ref_code;
                                            s[e] = c;
                                            x()
                                        }, function() {
                                            x()
                                        })
                                    })
                                }
                                $.lr.api.getSiteUser(f.site_id, f.site_user_id, function(c) {
                                    f.site_user_info = c;
                                    e.find(".LR-stats-clicks").text(c.user_clicks);
                                    e.find(".LR-stats-signups").text(c.user_signups);
                                    (0 < c.user_clicks || 0 < c.user_signups) && e.find(".LR-sharing-page").addClass("LR-stats")
                                });
                                if (f.isLive) {
                                    var H = $(".LR-share-email-import");
                                    H.hide();
                                    $.lr.api.updateCs(document.location.hostname, function(c) {
                                        if (c && !("null" == c || "NULL" == c)) window.csPageOptions = {
                                            domain_key: c,
                                            afterInit: function() {
                                                H.show();
                                                H.unbind("click").click(function() {
                                                    cloudsponge.launch()
                                                })
                                            },
                                            afterSubmitContacts: function(c) {
                                                var f = [];
                                                $.each(c, function(c, e) {
                                                    if (e.email && 0 < e.email.length) {
                                                        var j = null,
                                                            l = null;
                                                        $.each(e.email, function(c, e) {
                                                            e.primary && (e.selected && !j) && (j = e.address);
                                                            e.selected && !l && (l = e.address)
                                                        });
                                                        j ? f.push(j) : l && f.push(l)
                                                    }
                                                });
                                                if (0 < f.length) {
                                                    var j = Na();
                                                    $.each(f, function(c, e) {
                                                        var f = !1;
                                                        $.each(j, function(c, j) {
                                                            e.toLowerCase() == j.toLowerCase() && (f = !0)
                                                        });
                                                        f || j.push(e)
                                                    });
                                                    var l = "";
                                                    $.each(j, function(c, e) {
                                                        "" != l && (l += ", ");
                                                        l += e
                                                    });
                                                    e.find(".LR-share-email-emails").val(l)
                                                }
                                            }
                                        }, A("cloudsponge", "https://api.cloudsponge.com/address_books.js", function() {
                                            cloudsponge.init()
                                        })
                                    })
                                }
                                Oa("ignition_signup");
                                j && j()
                            },
                            function(c, e) {
                                ja = !1;
                                l && l(c, e)
                            }))
                    }
                },
                Ea = function(e) {
                    _gaq.push(["_setAccount", e]);
                    _gaq.push(["_setDomainName", document.location.hostname]);
                    f.site_id && C("siteDomain") && _gaq.push(["_setCustomVar", 1, "Site ID", f.site_id + "-" + C("siteDomain")]);
                    _gaq.push(["_trackPageview"])
                };
            $.extend(this, {
                getContainer: function() {
                    return e
                },
                isLive: function() {
                    return f.isLive
                },
                setTheme: function(e, f, j) {
                    Aa(e, function() {
                        aa(pa);
                        O();
                        j && j()
                    }, f)
                },
                setSetting: J,
                getSetting: C,
                isWidget: Ma,
                setMode: aa,
                initFromSite: Ca,
                clickTrack: Da,
                initLive: function(j, l) {
                    f.isLive = !0;
                    var m = {};
                    2 <= window.location.search.length && $.each(window.location.search.substring(1).split("&"), function(c, e) {
                        var f =
                            e.split("=", 2);
                        f[0] && (m[f[0]] = decodeURIComponent(f[1]))
                    });
                    $.each(m, function(c, e) {
                        "lrOpt" == c.substr(0, 5) && (f[c.substr(5)] = e)
                    });
                    var c = function(c, m) {
                        if (f.site_id && x) {
                            Da();
                            if (C("analyticsId")) {
                                var p = C("analyticsId");
                                Ea(p);
                                Ea("UA-21058689-4");
                                p = document.createElement("script");
                                p.type = "text/javascript";
                                p.async = !0;
                                p.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
                                var r = document.getElementsByTagName("script")[0];
                                r.parentNode.insertBefore(p, r)
                            }
                            Oa("ignition_visit");
                            e.find(".LR-sign-up-input").bind("keypress", function(c) {
                                13 == c.keyCode && U()
                            });
                            e.find(".LR-sign-up-submit").click(function() {
                                U()
                            });
                            var s = e.find(".LR-share-email-send"),
                                p = e.find(".LR-share-email-emails");
                            s.val("Send Invitations");
                            var t = !0;
                            s.unbind("click").click(function() {
                                if (t) {
                                    t = !1;
                                    s.val("Sending ...");
                                    var c = function() {
                                            s.addClass("LR-invitation-send-success");
                                            s.val("Invitations Sent")
                                        },
                                        j = function() {
                                            t = !0;
                                            s.val("Send Invitations")
                                        },
                                        l = e.find(".LR-share-email-message").val(),
                                        m = Na();
                                    0 < m.length && $.lr.api.inviteUsersByEmail(f.site_id,
                                        m, f.siteShareUrls.email, f.site_user_email, l,
                                        function() {
                                            c && c()
                                        }, j)
                                }
                            });
                            p.bind("input", function() {
                                s.removeClass("LR-invitation-send-success");
                                s.val("Send Invitations");
                                t = !0
                            });
                            aa("main");
                            j && j()
                        } else l && (c ? l(c, m) : l("unknown", "Unknown error initializing widget"))
                    };
                    Ca(c, c)
                },
                initPreview: function() {
                    x = ia;
                    f.isLive = !1;
                    e.find(".LR-sharing-page").addClass("LR-stats");
                    e.find(".LR-stats-clicks").text(123);
                    e.find(".LR-stats-signups").text(40)
                },
                destroy: function() {
                    var f = [];
                    $.each(window.lrLoadedCss, function(e) {
                        f.push(e)
                    });
                    $.each(f, function(e, f) {
                        p(f)
                    });
                    e.empty()
                }
            })
        };
        window.IgnitionInstance = e;
        $("#lr-widget").each(function() {
            var f = {};
            $(this).attr("rel") ? f.site_id = $(this).attr("rel") : f.domain = window.location.hostname;
            $(this).attr("data-unlaunched") && (f.useUnlaunchedInfo = !0);
            var j = new e($(this), f);
            j.initLive(function() {
                window.lrInitCallback && window.lrInitCallback(j, this)
            });
            window.lrIgnition = j
        })
    })
}();