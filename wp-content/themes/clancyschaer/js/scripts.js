if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"), b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b) if (void 0 !== a.style[c]) return {
            end: b[c]
        };
        return !1;
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1, d = this;
        a(this).one(a.support.transition.end, function() {
            c = !0;
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end);
        };
        return setTimeout(e, b), this;
    }, a(function() {
        a.support.transition = b();
    });
}(jQuery), +function(a) {
    "use strict";
    var b = '[data-dismiss="alert"]', c = function(c) {
        a(c).on("click", b, this.close);
    };
    c.prototype.close = function(b) {
        function c() {
            f.trigger("closed.bs.alert").remove();
        }
        var d = a(this), e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), 
        f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), 
        a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c());
    };
    var d = a.fn.alert;
    a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d);
        });
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function() {
        return a.fn.alert = d, this;
    }, a(document).on("click.bs.alert.data-api", b, c.prototype.close);
}(jQuery), +function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.isLoading = !1;
    };
    b.DEFAULTS = {
        loadingText: "loading..."
    }, b.prototype.setState = function(b) {
        var c = "disabled", d = this.$element, e = d.is("input") ? "val" : "html", f = d.data();
        b += "Text", f.resetText || d.data("resetText", d[e]()), d[e](f[b] || this.options[b]), 
        setTimeout(a.proxy(function() {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, 
            d.removeClass(c).removeAttr(c));
        }, this), 0);
    }, b.prototype.toggle = function() {
        var a = !0, b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), 
            a && c.prop("checked", !this.$element.hasClass("active")).trigger("change");
        }
        a && this.$element.toggleClass("active");
    };
    var c = a.fn.button;
    a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c;
            e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c);
        });
    }, a.fn.button.Constructor = b, a.fn.button.noConflict = function() {
        return a.fn.button = c, this;
    }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault();
    });
}(jQuery), +function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.$indicators = this.$element.find("> .carousel-indicators"), 
        this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, 
        "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this));
    };
    b.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, b.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), 
        this;
    }, b.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find("> .carousel-inner > .item.active"), this.$items = this.$active.parent().children(), 
        this.$items.index(this.$active);
    }, b.prototype.to = function(b) {
        var c = this, d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            c.to(b);
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]));
    }, b.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find("> .carousel-inner > .next,> .carousel-inner > .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, b.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, b.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, b.prototype.slide = function(b, c) {
        var d = this.$element.find("> .carousel-inner > .item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]();
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = a.Event("slide.bs.carousel", {
            relatedTarget: e[0],
            direction: g
        });
        return this.$element.trigger(j), j.isDefaultPrevented() ? void 0 : (this.sliding = !0, 
        f && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), 
        this.$element.one("slid.bs.carousel", function() {
            var b = a(i.$indicators.children()[i.getActiveIndex()]);
            b && b.addClass("active");
        })), a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, 
        d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function() {
            e.removeClass([ b, g ].join(" ")).addClass("active"), d.removeClass([ "active", g ].join(" ")), 
            i.sliding = !1, setTimeout(function() {
                i.$element.trigger("slid.bs.carousel");
            }, 0);
        }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), 
        e.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), 
        f && this.cycle(), this);
    };
    var c = a.fn.carousel;
    a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c), g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle();
        });
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = c, this;
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(b) {
        var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), 
        b.preventDefault();
    }), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var b = a(this);
            b.carousel(b.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, 
        this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle();
    };
    b.DEFAULTS = {
        toggle: !0
    }, b.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    }, b.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b = a.Event("show.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.$parent && this.$parent.find("> .panel > .in");
                if (c && c.length) {
                    var d = c.data("bs.collapse");
                    if (d && d.transitioning) return;
                    c.collapse("hide"), d || c.data("bs.collapse", null);
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1;
                var f = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"), this.transitioning = 0, 
                    this.$element.trigger("shown.bs.collapse");
                };
                if (!a.support.transition) return f.call(this);
                var g = a.camelCase([ "scroll", e ].join("-"));
                this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g]);
            }
        }
    }, b.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), 
                this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
                };
                return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this);
            }
        }
    }, b.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    var c = a.fn.collapse;
    a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
            !e && f.toggle && "show" == c && (c = !c), e || d.data("bs.collapse", e = new b(this, f)), 
            "string" == typeof c && e[c]();
        });
    }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = c, this;
    }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(b) {
        var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i);
        g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), 
        d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h);
    });
}(jQuery), +function(a) {
    "use strict";
    function b(b) {
        a(d).remove(), a(e).each(function() {
            var d = c(a(this)), e = {
                relatedTarget: this
            };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e));
        });
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent();
    }
    var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };
    f.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e), g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                f.toggleClass("open").trigger("shown.bs.dropdown", h), e.focus();
            }
            return !1;
        }
    }, f.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var f = c(d), g = f.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click();
                var h = " li:not(.divider):visible a", i = f.find("[role=menu]" + h + ", [role=listbox]" + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), 
                    i.eq(j).focus();
                }
            }
        }
    };
    var g = a.fn.dropdown;
    a.fn.dropdown = function(b) {
        return this.each(function() {
            var c = a(this), d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new f(this)), "string" == typeof b && d[b].call(c);
        });
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = g, this;
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu], [role=listbox]", f.prototype.keydown);
}(jQuery), +function(a) {
    "use strict";
    var b = function(b, c) {
        this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    b.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, b.prototype.toggle = function(a) {
        return this[this.isShown ? "hide" : "show"](a);
    }, b.prototype.show = function(b) {
        var c = this, d = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, 
        this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), 
        this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show().scrollTop(0), 
            d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), 
            c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function() {
                c.$element.focus().trigger(e);
            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e);
        }));
    }, b.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), 
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), 
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), 
        a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal());
    }, b.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus();
        }, this));
    }, b.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
    }, b.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal");
        });
    }, b.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, b.prototype.backdrop = function(b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), 
            this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this));
            }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b();
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b();
    };
    var c = a.fn.modal;
    a.fn.modal = function(c, d) {
        return this.each(function() {
            var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
            f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d);
        });
    }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function() {
        return a.fn.modal = c, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(d) && d
        }, e.data(), c.data());
        c.is("a") && b.preventDefault(), e.modal(f, this).one("hide", function() {
            c.is(":visible") && c.focus();
        });
    }), a(document).on("show.bs.modal", ".modal", function() {
        a(document.body).addClass("modal-open");
    }).on("hidden.bs.modal", ".modal", function() {
        a(document.body).removeClass("modal-open");
    });
}(jQuery), +function(a) {
    "use strict";
    var b = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
        this.init("tooltip", a, b);
    };
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, b.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin", i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), 
                this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, b.prototype.getDefaults = function() {
        return b.DEFAULTS;
    }, b.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b;
    }, b.prototype.getDelegateOptions = function() {
        var b = {}, c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d);
        }), b;
    }, b.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show();
        }, c.options.delay.show)) : c.show();
    }, b.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide)) : c.hide();
    }, b.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(b), b.isDefaultPrevented()) return;
            var c = this, d = this.tip();
            this.setContent(), this.options.animation && d.addClass("fade");
            var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement, f = /\s?auto?\s?/i, g = f.test(e);
            g && (e = e.replace(f, "") || "top"), d.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(e), this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
            var h = this.getPosition(), i = d[0].offsetWidth, j = d[0].offsetHeight;
            if (g) {
                var k = this.$element.parent(), l = e, m = document.documentElement.scrollTop || document.body.scrollTop, n = "body" == this.options.container ? window.innerWidth : k.outerWidth(), o = "body" == this.options.container ? window.innerHeight : k.outerHeight(), p = "body" == this.options.container ? 0 : k.offset().left;
                e = "bottom" == e && h.top + h.height + j - m > o ? "top" : "top" == e && h.top - m - j < 0 ? "bottom" : "right" == e && h.right + i > n ? "left" : "left" == e && h.left - i < p ? "right" : e, 
                d.removeClass(l).addClass(e);
            }
            var q = this.getCalculatedOffset(e, h, i, j);
            this.applyPlacement(q, e), this.hoverState = null;
            var r = function() {
                c.$element.trigger("shown.bs." + c.type);
            };
            a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r();
        }
    }, b.prototype.applyPlacement = function(b, c) {
        var d, e = this.tip(), f = e[0].offsetWidth, g = e[0].offsetHeight, h = parseInt(e.css("margin-top"), 10), i = parseInt(e.css("margin-left"), 10);
        isNaN(h) && (h = 0), isNaN(i) && (i = 0), b.top = b.top + h, b.left = b.left + i, 
        a.offset.setOffset(e[0], a.extend({
            using: function(a) {
                e.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                });
            }
        }, b), 0), e.addClass("in");
        var j = e[0].offsetWidth, k = e[0].offsetHeight;
        if ("top" == c && k != g && (d = !0, b.top = b.top + g - k), /bottom|top/.test(c)) {
            var l = 0;
            b.left < 0 && (l = -2 * b.left, b.left = 0, e.offset(b), j = e[0].offsetWidth, k = e[0].offsetHeight), 
            this.replaceArrow(l - f + j, j, "left");
        } else this.replaceArrow(k - g, k, "top");
        d && e.offset(b);
    }, b.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
    }, b.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, b.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type);
        }
        var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), 
        a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), 
        this.hoverState = null, this);
    }, b.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, b.prototype.hasContent = function() {
        return this.getTitle();
    }, b.prototype.getPosition = function() {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
            width: b.offsetWidth,
            height: b.offsetHeight
        }, this.$element.offset());
    }, b.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        };
    }, b.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, b.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template);
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, b.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
    }, b.prototype.enable = function() {
        this.enabled = !0;
    }, b.prototype.disable = function() {
        this.enabled = !1;
    }, b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, b.prototype.toggle = function(b) {
        var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, b.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type);
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]());
        });
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = c, this;
    };
}(jQuery), +function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, 
    b.prototype.getDefaults = function() {
        return b.DEFAULTS;
    }, b.prototype.setContent = function() {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), 
        a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, b.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, b.prototype.getContent = function() {
        var a = this.$element, b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    }, b.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
    };
    var c = a.fn.popover;
    a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c;
            (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]());
        });
    }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function() {
        return a.fn.popover = c, this;
    };
}(jQuery), +function(a) {
    "use strict";
    function b(c, d) {
        var e, f = a.proxy(this.process, this);
        this.$element = a(a(c).is("body") ? window : c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), 
        this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", 
        this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), 
        this.process();
    }
    b.DEFAULTS = {
        offset: 10
    }, b.prototype.refresh = function() {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]), this.targets = a([]);
        {
            var c = this;
            this.$body.find(this.selector).map(function() {
                var d = a(this), e = d.data("target") || d.attr("href"), f = /^#./.test(e) && a(e);
                return f && f.length && f.is(":visible") && [ [ f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e ] ] || null;
            }).sort(function(a, b) {
                return a[0] - b[0];
            }).each(function() {
                c.offsets.push(this[0]), c.targets.push(this[1]);
            });
        }
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--; ) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]);
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), 
        d.trigger("activate.bs.scrollspy");
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = c, this;
    }, a(window).on("load", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data());
        });
    });
}(jQuery), +function(a) {
    "use strict";
    var b = function(b) {
        this.element = a(b);
    };
    b.prototype.show = function() {
        var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", {
                relatedTarget: e
            });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.parent("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    });
                });
            }
        }
    }, b.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
            b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), 
            b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d();
        }
        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in");
    };
    var c = a.fn.tab;
    a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.tab");
            e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]();
        });
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function() {
        return a.fn.tab = c, this;
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
        b.preventDefault(), a(this).tab("show");
    });
}(jQuery), +function(a) {
    "use strict";
    var b = function(c, d) {
        this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = a(c), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition();
    };
    b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {
        offset: 0
    }, b.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(b.RESET).addClass("affix");
        var a = this.$window.scrollTop(), c = this.$element.offset();
        return this.pinnedOffset = c.top - a;
    }, b.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1);
    }, b.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom;
            "top" == this.affixed && (e.top += d), "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), 
            "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""), k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, 
                this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), 
                "bottom" == i && this.$element.offset({
                    top: c - h - this.$element.height()
                }));
            }
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c;
            e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function() {
        return a.fn.affix = c, this;
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var b = a(this), c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), 
            c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c);
        });
    });
}(jQuery);

(function(a) {
    function b(b) {
        var c;
        var d = a("<div></div>").css({
            width: "100%"
        });
        b.append(d);
        c = b.width() - d.width();
        d.remove();
        return c;
    }
    function c(d, e) {
        var f = d.getBoundingClientRect();
        var g = f.top;
        var h = f.bottom;
        var i = f.left;
        var j = f.right;
        var k = a.extend({
            tolerance: 0,
            viewport: window
        }, e);
        var l = false;
        var m = k.viewport.get ? k.viewport : a(k.viewport);
        var n = m.height();
        var o = m.width();
        var p = m.get(0).toString();
        if (!m.length) console.warn("isInViewport: The viewport selector you have provided matches no element on page.");
        if (p !== "[object Window]" && p !== "[object DOMWindow]") {
            var q = m.offset();
            g = g - q.top;
            h = h - q.top;
            i = i - q.left;
            j = i + o;
            c.scrollBarWidth = c.scrollBarWidth || b(m);
            o -= c.scrollBarWidth;
        }
        k.tolerance = Math.round(parseFloat(k.tolerance));
        if (isNaN(k.tolerance)) k.tolerance = 0; else if (k.tolerance < 0) k.tolerance = n + k.tolerance;
        if (Math.abs(i) >= o) return l;
        if (k.tolerance) {
            if (g <= k.tolerance && h >= k.tolerance) l = true; else l = false;
        } else {
            if (h > 0 && g <= n) l = true; else l = false;
        }
        return l;
    }
    a.extend(a.expr[":"], {
        "in-viewport": function(a, b, d) {
            if (!!d[3]) {
                var e = d[3].split(",");
                if (e.length === 1 && isNaN(e[0])) {
                    e[1] = e[0];
                    e[0] = undefined;
                }
                return c(a, {
                    tolerance: e[0] ? e[0].trim() : undefined,
                    viewport: e[1] ? e[1].trim() : undefined
                });
            } else return c(a);
        }
    });
})(jQuery);

(function(a) {
    a.flexslider = function(b, c) {
        var d = a(b);
        d.vars = a.extend({}, a.flexslider.defaults, c);
        var e = d.vars.namespace, f = window.navigator && window.navigator.msPointerEnabled && window.MSGesture, g = ("ontouchstart" in window || f || window.DocumentTouch && document instanceof DocumentTouch) && d.vars.touch, h = "click touchend MSPointerUp", i = "", j, k = d.vars.direction === "vertical", l = d.vars.reverse, m = d.vars.itemWidth > 0, n = d.vars.animation === "fade", o = d.vars.asNavFor !== "", p = {}, q = true;
        a.data(b, "flexslider", d);
        p = {
            init: function() {
                d.animating = false;
                d.currentSlide = parseInt(d.vars.startAt ? d.vars.startAt : 0, 10);
                if (isNaN(d.currentSlide)) d.currentSlide = 0;
                d.animatingTo = d.currentSlide;
                d.atEnd = d.currentSlide === 0 || d.currentSlide === d.last;
                d.containerSelector = d.vars.selector.substr(0, d.vars.selector.search(" "));
                d.slides = a(d.vars.selector, d);
                d.container = a(d.containerSelector, d);
                d.count = d.slides.length;
                d.syncExists = a(d.vars.sync).length > 0;
                if (d.vars.animation === "slide") d.vars.animation = "swing";
                d.prop = k ? "top" : "marginLeft";
                d.args = {};
                d.manualPause = false;
                d.stopped = false;
                d.started = false;
                d.startTimeout = null;
                d.transitions = !d.vars.video && !n && d.vars.useCSS && function() {
                    var a = document.createElement("div"), b = [ "perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective" ];
                    for (var c in b) {
                        if (a.style[b[c]] !== undefined) {
                            d.pfx = b[c].replace("Perspective", "").toLowerCase();
                            d.prop = "-" + d.pfx + "-transform";
                            return true;
                        }
                    }
                    return false;
                }();
                if (d.vars.controlsContainer !== "") d.controlsContainer = a(d.vars.controlsContainer).length > 0 && a(d.vars.controlsContainer);
                if (d.vars.manualControls !== "") d.manualControls = a(d.vars.manualControls).length > 0 && a(d.vars.manualControls);
                if (d.vars.randomize) {
                    d.slides.sort(function() {
                        return Math.round(Math.random()) - .5;
                    });
                    d.container.empty().append(d.slides);
                }
                d.doMath();
                d.setup("init");
                if (d.vars.controlNav) p.controlNav.setup();
                if (d.vars.directionNav) p.directionNav.setup();
                if (d.vars.keyboard && (a(d.containerSelector).length === 1 || d.vars.multipleKeyboard)) {
                    a(document).bind("keyup", function(a) {
                        var b = a.keyCode;
                        if (!d.animating && (b === 39 || b === 37)) {
                            var c = b === 39 ? d.getTarget("next") : b === 37 ? d.getTarget("prev") : false;
                            d.flexAnimate(c, d.vars.pauseOnAction);
                        }
                    });
                }
                if (d.vars.mousewheel) {
                    d.bind("mousewheel", function(a, b, c, e) {
                        a.preventDefault();
                        var f = b < 0 ? d.getTarget("next") : d.getTarget("prev");
                        d.flexAnimate(f, d.vars.pauseOnAction);
                    });
                }
                if (d.vars.pausePlay) p.pausePlay.setup();
                if (d.vars.slideshow && d.vars.pauseInvisible) p.pauseInvisible.init();
                if (d.vars.slideshow) {
                    if (d.vars.pauseOnHover) {
                        d.hover(function() {
                            if (!d.manualPlay && !d.manualPause) d.pause();
                        }, function() {
                            if (!d.manualPause && !d.manualPlay && !d.stopped) d.play();
                        });
                    }
                    if (!d.vars.pauseInvisible || !p.pauseInvisible.isHidden()) {
                        d.vars.initDelay > 0 ? d.startTimeout = setTimeout(d.play, d.vars.initDelay) : d.play();
                    }
                }
                if (o) p.asNav.setup();
                if (g && d.vars.touch) p.touch();
                if (!n || n && d.vars.smoothHeight) a(window).bind("resize orientationchange focus", p.resize);
                d.find("img").attr("draggable", "false");
                setTimeout(function() {
                    d.vars.start(d);
                }, 200);
            },
            asNav: {
                setup: function() {
                    d.asNav = true;
                    d.animatingTo = Math.floor(d.currentSlide / d.move);
                    d.currentItem = d.currentSlide;
                    d.slides.removeClass(e + "active-slide").eq(d.currentItem).addClass(e + "active-slide");
                    if (!f) {
                        d.slides.on(h, function(b) {
                            b.preventDefault();
                            var c = a(this), f = c.index();
                            var g = c.offset().left - a(d).scrollLeft();
                            if (g <= 0 && c.hasClass(e + "active-slide")) {
                                d.flexAnimate(d.getTarget("prev"), true);
                            } else if (!a(d.vars.asNavFor).data("flexslider").animating && !c.hasClass(e + "active-slide")) {
                                d.direction = d.currentItem < f ? "next" : "prev";
                                d.flexAnimate(f, d.vars.pauseOnAction, false, true, true);
                            }
                        });
                    } else {
                        b._slider = d;
                        d.slides.each(function() {
                            var b = this;
                            b._gesture = new MSGesture();
                            b._gesture.target = b;
                            b.addEventListener("MSPointerDown", function(a) {
                                a.preventDefault();
                                if (a.currentTarget._gesture) a.currentTarget._gesture.addPointer(a.pointerId);
                            }, false);
                            b.addEventListener("MSGestureTap", function(b) {
                                b.preventDefault();
                                var c = a(this), e = c.index();
                                if (!a(d.vars.asNavFor).data("flexslider").animating && !c.hasClass("active")) {
                                    d.direction = d.currentItem < e ? "next" : "prev";
                                    d.flexAnimate(e, d.vars.pauseOnAction, false, true, true);
                                }
                            });
                        });
                    }
                }
            },
            controlNav: {
                setup: function() {
                    if (!d.manualControls) {
                        p.controlNav.setupPaging();
                    } else {
                        p.controlNav.setupManual();
                    }
                },
                setupPaging: function() {
                    var b = d.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging", c = 1, f, g;
                    d.controlNavScaffold = a('<ol class="' + e + "control-nav " + e + b + '"></ol>');
                    if (d.pagingCount > 1) {
                        for (var j = 0; j < d.pagingCount; j++) {
                            g = d.slides.eq(j);
                            f = d.vars.controlNav === "thumbnails" ? '<img src="' + g.attr("data-thumb") + '"/>' : "<a>" + c + "</a>";
                            if ("thumbnails" === d.vars.controlNav && true === d.vars.thumbCaptions) {
                                var k = g.attr("data-thumbcaption");
                                if ("" != k && undefined != k) f += '<span class="' + e + 'caption">' + k + "</span>";
                            }
                            d.controlNavScaffold.append("<li>" + f + "</li>");
                            c++;
                        }
                    }
                    d.controlsContainer ? a(d.controlsContainer).append(d.controlNavScaffold) : d.append(d.controlNavScaffold);
                    p.controlNav.set();
                    p.controlNav.active();
                    d.controlNavScaffold.delegate("a, img", h, function(b) {
                        b.preventDefault();
                        if (i === "" || i === b.type) {
                            var c = a(this), f = d.controlNav.index(c);
                            if (!c.hasClass(e + "active")) {
                                d.direction = f > d.currentSlide ? "next" : "prev";
                                d.flexAnimate(f, d.vars.pauseOnAction);
                            }
                        }
                        if (i === "") {
                            i = b.type;
                        }
                        p.setToClearWatchedEvent();
                    });
                },
                setupManual: function() {
                    d.controlNav = d.manualControls;
                    p.controlNav.active();
                    d.controlNav.bind(h, function(b) {
                        b.preventDefault();
                        if (i === "" || i === b.type) {
                            var c = a(this), f = d.controlNav.index(c);
                            if (!c.hasClass(e + "active")) {
                                f > d.currentSlide ? d.direction = "next" : d.direction = "prev";
                                d.flexAnimate(f, d.vars.pauseOnAction);
                            }
                        }
                        if (i === "") {
                            i = b.type;
                        }
                        p.setToClearWatchedEvent();
                    });
                },
                set: function() {
                    var b = d.vars.controlNav === "thumbnails" ? "img" : "a";
                    d.controlNav = a("." + e + "control-nav li " + b, d.controlsContainer ? d.controlsContainer : d);
                },
                active: function() {
                    d.controlNav.removeClass(e + "active").eq(d.animatingTo).addClass(e + "active");
                },
                update: function(b, c) {
                    if (d.pagingCount > 1 && b === "add") {
                        d.controlNavScaffold.append(a("<li><a>" + d.count + "</a></li>"));
                    } else if (d.pagingCount === 1) {
                        d.controlNavScaffold.find("li").remove();
                    } else {
                        d.controlNav.eq(c).closest("li").remove();
                    }
                    p.controlNav.set();
                    d.pagingCount > 1 && d.pagingCount !== d.controlNav.length ? d.update(c, b) : p.controlNav.active();
                }
            },
            directionNav: {
                setup: function() {
                    var b = a('<ul class="' + e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + d.vars.prevText + '</a></li><li><a class="' + e + 'next" href="#">' + d.vars.nextText + "</a></li></ul>");
                    if (d.controlsContainer) {
                        a(d.controlsContainer).append(b);
                        d.directionNav = a("." + e + "direction-nav li a", d.controlsContainer);
                    } else {
                        d.append(b);
                        d.directionNav = a("." + e + "direction-nav li a", d);
                    }
                    p.directionNav.update();
                    d.directionNav.bind(h, function(b) {
                        b.preventDefault();
                        var c;
                        if (i === "" || i === b.type) {
                            c = a(this).hasClass(e + "next") ? d.getTarget("next") : d.getTarget("prev");
                            d.flexAnimate(c, d.vars.pauseOnAction);
                        }
                        if (i === "") {
                            i = b.type;
                        }
                        p.setToClearWatchedEvent();
                    });
                },
                update: function() {
                    var a = e + "disabled";
                    if (d.pagingCount === 1) {
                        d.directionNav.addClass(a).attr("tabindex", "-1");
                    } else if (!d.vars.animationLoop) {
                        if (d.animatingTo === 0) {
                            d.directionNav.removeClass(a).filter("." + e + "prev").addClass(a).attr("tabindex", "-1");
                        } else if (d.animatingTo === d.last) {
                            d.directionNav.removeClass(a).filter("." + e + "next").addClass(a).attr("tabindex", "-1");
                        } else {
                            d.directionNav.removeClass(a).removeAttr("tabindex");
                        }
                    } else {
                        d.directionNav.removeClass(a).removeAttr("tabindex");
                    }
                }
            },
            pausePlay: {
                setup: function() {
                    var b = a('<div class="' + e + 'pauseplay"><a></a></div>');
                    if (d.controlsContainer) {
                        d.controlsContainer.append(b);
                        d.pausePlay = a("." + e + "pauseplay a", d.controlsContainer);
                    } else {
                        d.append(b);
                        d.pausePlay = a("." + e + "pauseplay a", d);
                    }
                    p.pausePlay.update(d.vars.slideshow ? e + "pause" : e + "play");
                    d.pausePlay.bind(h, function(b) {
                        b.preventDefault();
                        if (i === "" || i === b.type) {
                            if (a(this).hasClass(e + "pause")) {
                                d.manualPause = true;
                                d.manualPlay = false;
                                d.pause();
                            } else {
                                d.manualPause = false;
                                d.manualPlay = true;
                                d.play();
                            }
                        }
                        if (i === "") {
                            i = b.type;
                        }
                        p.setToClearWatchedEvent();
                    });
                },
                update: function(a) {
                    a === "play" ? d.pausePlay.removeClass(e + "pause").addClass(e + "play").html(d.vars.playText) : d.pausePlay.removeClass(e + "play").addClass(e + "pause").html(d.vars.pauseText);
                }
            },
            touch: function() {
                var a, c, e, g, h, i, j = false, o = 0, p = 0, q = 0;
                if (!f) {
                    b.addEventListener("touchstart", r, false);
                    function r(f) {
                        if (d.animating) {
                            f.preventDefault();
                        } else if (window.navigator.msPointerEnabled || f.touches.length === 1) {
                            d.pause();
                            g = k ? d.h : d.w;
                            i = Number(new Date());
                            o = f.touches[0].pageX;
                            p = f.touches[0].pageY;
                            e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g;
                            a = k ? p : o;
                            c = k ? o : p;
                            b.addEventListener("touchmove", s, false);
                            b.addEventListener("touchend", t, false);
                        }
                    }
                    function s(b) {
                        o = b.touches[0].pageX;
                        p = b.touches[0].pageY;
                        h = k ? a - p : a - o;
                        j = k ? Math.abs(h) < Math.abs(o - c) : Math.abs(h) < Math.abs(p - c);
                        var f = 500;
                        if (!j || Number(new Date()) - i > f) {
                            b.preventDefault();
                            if (!n && d.transitions) {
                                if (!d.vars.animationLoop) {
                                    h = h / (d.currentSlide === 0 && h < 0 || d.currentSlide === d.last && h > 0 ? Math.abs(h) / g + 2 : 1);
                                }
                                d.setProps(e + h, "setTouch");
                            }
                        }
                    }
                    function t(f) {
                        b.removeEventListener("touchmove", s, false);
                        if (d.animatingTo === d.currentSlide && !j && !(h === null)) {
                            var k = l ? -h : h, m = k > 0 ? d.getTarget("next") : d.getTarget("prev");
                            if (d.canAdvance(m) && (Number(new Date()) - i < 550 && Math.abs(k) > 50 || Math.abs(k) > g / 2)) {
                                d.flexAnimate(m, d.vars.pauseOnAction);
                            } else {
                                if (!n) d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, true);
                            }
                        }
                        b.removeEventListener("touchend", t, false);
                        a = null;
                        c = null;
                        h = null;
                        e = null;
                    }
                } else {
                    b.style.msTouchAction = "none";
                    b._gesture = new MSGesture();
                    b._gesture.target = b;
                    b.addEventListener("MSPointerDown", u, false);
                    b._slider = d;
                    b.addEventListener("MSGestureChange", v, false);
                    b.addEventListener("MSGestureEnd", w, false);
                    function u(a) {
                        a.stopPropagation();
                        if (d.animating) {
                            a.preventDefault();
                        } else {
                            d.pause();
                            b._gesture.addPointer(a.pointerId);
                            q = 0;
                            g = k ? d.h : d.w;
                            i = Number(new Date());
                            e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g;
                        }
                    }
                    function v(a) {
                        a.stopPropagation();
                        var c = a.target._slider;
                        if (!c) {
                            return;
                        }
                        var d = -a.translationX, f = -a.translationY;
                        q = q + (k ? f : d);
                        h = q;
                        j = k ? Math.abs(q) < Math.abs(-d) : Math.abs(q) < Math.abs(-f);
                        if (a.detail === a.MSGESTURE_FLAG_INERTIA) {
                            setImmediate(function() {
                                b._gesture.stop();
                            });
                            return;
                        }
                        if (!j || Number(new Date()) - i > 500) {
                            a.preventDefault();
                            if (!n && c.transitions) {
                                if (!c.vars.animationLoop) {
                                    h = q / (c.currentSlide === 0 && q < 0 || c.currentSlide === c.last && q > 0 ? Math.abs(q) / g + 2 : 1);
                                }
                                c.setProps(e + h, "setTouch");
                            }
                        }
                    }
                    function w(b) {
                        b.stopPropagation();
                        var d = b.target._slider;
                        if (!d) {
                            return;
                        }
                        if (d.animatingTo === d.currentSlide && !j && !(h === null)) {
                            var f = l ? -h : h, k = f > 0 ? d.getTarget("next") : d.getTarget("prev");
                            if (d.canAdvance(k) && (Number(new Date()) - i < 550 && Math.abs(f) > 50 || Math.abs(f) > g / 2)) {
                                d.flexAnimate(k, d.vars.pauseOnAction);
                            } else {
                                if (!n) d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, true);
                            }
                        }
                        a = null;
                        c = null;
                        h = null;
                        e = null;
                        q = 0;
                    }
                }
            },
            resize: function() {
                if (!d.animating && d.is(":visible")) {
                    if (!m) d.doMath();
                    if (n) {
                        p.smoothHeight();
                    } else if (m) {
                        d.slides.width(d.computedW);
                        d.update(d.pagingCount);
                        d.setProps();
                    } else if (k) {
                        d.viewport.height(d.h);
                        d.setProps(d.h, "setTotal");
                    } else {
                        if (d.vars.smoothHeight) p.smoothHeight();
                        d.newSlides.width(d.computedW);
                        d.setProps(d.computedW, "setTotal");
                    }
                }
            },
            smoothHeight: function(a) {
                if (!k || n) {
                    var b = n ? d : d.viewport;
                    a ? b.animate({
                        height: d.slides.eq(d.animatingTo).height()
                    }, a) : b.height(d.slides.eq(d.animatingTo).height());
                }
            },
            sync: function(b) {
                var c = a(d.vars.sync).data("flexslider"), e = d.animatingTo;
                switch (b) {
                  case "animate":
                    c.flexAnimate(e, d.vars.pauseOnAction, false, true);
                    break;

                  case "play":
                    if (!c.playing && !c.asNav) {
                        c.play();
                    }
                    break;

                  case "pause":
                    c.pause();
                    break;
                }
            },
            uniqueID: function(b) {
                b.find("[id]").each(function() {
                    var b = a(this);
                    b.attr("id", b.attr("id") + "_clone");
                });
                return b;
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var a = [ "webkit", "moz", "ms", "o" ];
                    if ("hidden" in document) return "hidden";
                    for (var b = 0; b < a.length; b++) {
                        if (a[b] + "Hidden" in document) p.pauseInvisible.visProp = a[b] + "Hidden";
                    }
                    if (p.pauseInvisible.visProp) {
                        var c = p.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(c, function() {
                            if (p.pauseInvisible.isHidden()) {
                                if (d.startTimeout) clearTimeout(d.startTimeout); else d.pause();
                            } else {
                                if (d.started) d.play(); else d.vars.initDelay > 0 ? setTimeout(d.play, d.vars.initDelay) : d.play();
                            }
                        });
                    }
                },
                isHidden: function() {
                    return document[p.pauseInvisible.visProp] || false;
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(j);
                j = setTimeout(function() {
                    i = "";
                }, 3e3);
            }
        };
        d.flexAnimate = function(b, c, f, h, i) {
            if (!d.vars.animationLoop && b !== d.currentSlide) {
                d.direction = b > d.currentSlide ? "next" : "prev";
            }
            if (o && d.pagingCount === 1) d.direction = d.currentItem < b ? "next" : "prev";
            if (!d.animating && (d.canAdvance(b, i) || f) && d.is(":visible")) {
                if (o && h) {
                    var j = a(d.vars.asNavFor).data("flexslider");
                    d.atEnd = b === 0 || b === d.count - 1;
                    j.flexAnimate(b, true, false, true, i);
                    d.direction = d.currentItem < b ? "next" : "prev";
                    j.direction = d.direction;
                    if (Math.ceil((b + 1) / d.visible) - 1 !== d.currentSlide && b !== 0) {
                        d.currentItem = b;
                        d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide");
                        b = Math.floor(b / d.visible);
                    } else {
                        d.currentItem = b;
                        d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide");
                        return false;
                    }
                }
                d.animating = true;
                d.animatingTo = b;
                if (c) d.pause();
                d.vars.before(d);
                if (d.syncExists && !i) p.sync("animate");
                if (d.vars.controlNav) p.controlNav.active();
                if (!m) d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide");
                d.atEnd = b === 0 || b === d.last;
                if (d.vars.directionNav) p.directionNav.update();
                if (b === d.last) {
                    d.vars.end(d);
                    if (!d.vars.animationLoop) d.pause();
                }
                if (!n) {
                    var q = k ? d.slides.filter(":first").height() : d.computedW, r, s, t;
                    if (m) {
                        r = d.vars.itemMargin;
                        t = (d.itemW + r) * d.move * d.animatingTo;
                        s = t > d.limit && d.visible !== 1 ? d.limit : t;
                    } else if (d.currentSlide === 0 && b === d.count - 1 && d.vars.animationLoop && d.direction !== "next") {
                        s = l ? (d.count + d.cloneOffset) * q : 0;
                    } else if (d.currentSlide === d.last && b === 0 && d.vars.animationLoop && d.direction !== "prev") {
                        s = l ? 0 : (d.count + 1) * q;
                    } else {
                        s = l ? (d.count - 1 - b + d.cloneOffset) * q : (b + d.cloneOffset) * q;
                    }
                    d.setProps(s, "", d.vars.animationSpeed);
                    if (d.transitions) {
                        if (!d.vars.animationLoop || !d.atEnd) {
                            d.animating = false;
                            d.currentSlide = d.animatingTo;
                        }
                        d.container.unbind("webkitTransitionEnd transitionend");
                        d.container.bind("webkitTransitionEnd transitionend", function() {
                            d.wrapup(q);
                        });
                    } else {
                        d.container.animate(d.args, d.vars.animationSpeed, d.vars.easing, function() {
                            d.wrapup(q);
                        });
                    }
                } else {
                    if (!g) {
                        d.slides.eq(d.currentSlide).css({
                            zIndex: 1
                        }).animate({
                            opacity: 0
                        }, d.vars.animationSpeed, d.vars.easing);
                        d.slides.eq(b).css({
                            zIndex: 2
                        }).animate({
                            opacity: 1
                        }, d.vars.animationSpeed, d.vars.easing, d.wrapup);
                    } else {
                        d.slides.eq(d.currentSlide).css({
                            opacity: 0,
                            zIndex: 1
                        });
                        d.slides.eq(b).css({
                            opacity: 1,
                            zIndex: 2
                        });
                        d.wrapup(q);
                    }
                }
                if (d.vars.smoothHeight) p.smoothHeight(d.vars.animationSpeed);
            }
        };
        d.wrapup = function(a) {
            if (!n && !m) {
                if (d.currentSlide === 0 && d.animatingTo === d.last && d.vars.animationLoop) {
                    d.setProps(a, "jumpEnd");
                } else if (d.currentSlide === d.last && d.animatingTo === 0 && d.vars.animationLoop) {
                    d.setProps(a, "jumpStart");
                }
            }
            d.animating = false;
            d.currentSlide = d.animatingTo;
            d.vars.after(d);
        };
        d.animateSlides = function() {
            if (!d.animating && q) d.flexAnimate(d.getTarget("next"));
        };
        d.pause = function() {
            clearInterval(d.animatedSlides);
            d.animatedSlides = null;
            d.playing = false;
            if (d.vars.pausePlay) p.pausePlay.update("play");
            if (d.syncExists) p.sync("pause");
        };
        d.play = function() {
            if (d.playing) clearInterval(d.animatedSlides);
            d.animatedSlides = d.animatedSlides || setInterval(d.animateSlides, d.vars.slideshowSpeed);
            d.started = d.playing = true;
            if (d.vars.pausePlay) p.pausePlay.update("pause");
            if (d.syncExists) p.sync("play");
        };
        d.stop = function() {
            d.pause();
            d.stopped = true;
        };
        d.canAdvance = function(a, b) {
            var c = o ? d.pagingCount - 1 : d.last;
            return b ? true : o && d.currentItem === d.count - 1 && a === 0 && d.direction === "prev" ? true : o && d.currentItem === 0 && a === d.pagingCount - 1 && d.direction !== "next" ? false : a === d.currentSlide && !o ? false : d.vars.animationLoop ? true : d.atEnd && d.currentSlide === 0 && a === c && d.direction !== "next" ? false : d.atEnd && d.currentSlide === c && a === 0 && d.direction === "next" ? false : true;
        };
        d.getTarget = function(a) {
            d.direction = a;
            if (a === "next") {
                return d.currentSlide === d.last ? 0 : d.currentSlide + 1;
            } else {
                return d.currentSlide === 0 ? d.last : d.currentSlide - 1;
            }
        };
        d.setProps = function(a, b, c) {
            var e = function() {
                var c = a ? a : (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo, e = function() {
                    if (m) {
                        return b === "setTouch" ? a : l && d.animatingTo === d.last ? 0 : l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : d.animatingTo === d.last ? d.limit : c;
                    } else {
                        switch (b) {
                          case "setTotal":
                            return l ? (d.count - 1 - d.currentSlide + d.cloneOffset) * a : (d.currentSlide + d.cloneOffset) * a;

                          case "setTouch":
                            return l ? a : a;

                          case "jumpEnd":
                            return l ? a : d.count * a;

                          case "jumpStart":
                            return l ? d.count * a : a;

                          default:
                            return a;
                        }
                    }
                }();
                return e * -1 + "px";
            }();
            if (d.transitions) {
                e = k ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)";
                c = c !== undefined ? c / 1e3 + "s" : "0s";
                d.container.css("-" + d.pfx + "-transition-duration", c);
                d.container.css("transition-duration", c);
            }
            d.args[d.prop] = e;
            if (d.transitions || c === undefined) d.container.css(d.args);
            d.container.css("transform", e);
        };
        d.setup = function(b) {
            if (!n) {
                var c, f;
                if (b === "init") {
                    d.viewport = a('<div class="' + e + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(d).append(d.container);
                    d.cloneCount = 0;
                    d.cloneOffset = 0;
                    if (l) {
                        f = a.makeArray(d.slides).reverse();
                        d.slides = a(f);
                        d.container.empty().append(d.slides);
                    }
                }
                if (d.vars.animationLoop && !m) {
                    d.cloneCount = 2;
                    d.cloneOffset = 1;
                    if (b !== "init") d.container.find(".clone").remove();
                    p.uniqueID(d.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(d.container);
                    p.uniqueID(d.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(d.container);
                }
                d.newSlides = a(d.vars.selector, d);
                c = l ? d.count - 1 - d.currentSlide + d.cloneOffset : d.currentSlide + d.cloneOffset;
                if (k && !m) {
                    d.container.height((d.count + d.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function() {
                        d.newSlides.css({
                            display: "block"
                        });
                        d.doMath();
                        d.viewport.height(d.h);
                        d.setProps(c * d.h, "init");
                    }, b === "init" ? 100 : 0);
                } else {
                    d.container.width((d.count + d.cloneCount) * 200 + "%");
                    d.setProps(c * d.computedW, "init");
                    setTimeout(function() {
                        d.doMath();
                        d.newSlides.css({
                            width: d.computedW,
                            "float": "left",
                            display: "block"
                        });
                        if (d.vars.smoothHeight) p.smoothHeight();
                    }, b === "init" ? 100 : 0);
                }
            } else {
                d.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                });
                if (b === "init") {
                    if (!g) {
                        d.slides.css({
                            opacity: 0,
                            display: "block",
                            zIndex: 1
                        }).eq(d.currentSlide).css({
                            zIndex: 2
                        }).animate({
                            opacity: 1
                        }, d.vars.animationSpeed, d.vars.easing);
                    } else {
                        d.slides.css({
                            opacity: 0,
                            display: "block",
                            webkitTransition: "opacity " + d.vars.animationSpeed / 1e3 + "s ease",
                            zIndex: 1
                        }).eq(d.currentSlide).css({
                            opacity: 1,
                            zIndex: 2
                        });
                    }
                }
                if (d.vars.smoothHeight) p.smoothHeight();
            }
            if (!m) d.slides.removeClass(e + "active-slide").eq(d.currentSlide).addClass(e + "active-slide");
            d.vars.init(d);
        };
        d.doMath = function() {
            var a = d.slides.first(), b = d.vars.itemMargin, c = d.vars.minItems, e = d.vars.maxItems;
            d.w = d.viewport === undefined ? d.width() : d.viewport.width();
            d.h = a.height();
            d.boxPadding = a.outerWidth() - a.width();
            if (m) {
                d.itemT = d.vars.itemWidth + b;
                d.minW = c ? c * d.itemT : d.w;
                d.maxW = e ? e * d.itemT - b : d.w;
                d.itemW = d.minW > d.w ? (d.w - b * (c - 1)) / c : d.maxW < d.w ? (d.w - b * (e - 1)) / e : d.vars.itemWidth > d.w ? d.w : d.vars.itemWidth;
                d.visible = Math.floor(d.w / d.itemW);
                d.move = d.vars.move > 0 && d.vars.move < d.visible ? d.vars.move : d.visible;
                d.pagingCount = Math.ceil((d.count - d.visible) / d.move + 1);
                d.last = d.pagingCount - 1;
                d.limit = d.pagingCount === 1 ? 0 : d.vars.itemWidth > d.w ? d.itemW * (d.count - 1) + b * (d.count - 1) : (d.itemW + b) * d.count - d.w - b;
            } else {
                d.itemW = d.w;
                d.pagingCount = d.count;
                d.last = d.count - 1;
            }
            d.computedW = d.itemW - d.boxPadding;
        };
        d.update = function(a, b) {
            d.doMath();
            if (!m) {
                if (a < d.currentSlide) {
                    d.currentSlide += 1;
                } else if (a <= d.currentSlide && a !== 0) {
                    d.currentSlide -= 1;
                }
                d.animatingTo = d.currentSlide;
            }
            if (d.vars.controlNav && !d.manualControls) {
                if (b === "add" && !m || d.pagingCount > d.controlNav.length) {
                    p.controlNav.update("add");
                } else if (b === "remove" && !m || d.pagingCount < d.controlNav.length) {
                    if (m && d.currentSlide > d.last) {
                        d.currentSlide -= 1;
                        d.animatingTo -= 1;
                    }
                    p.controlNav.update("remove", d.last);
                }
            }
            if (d.vars.directionNav) p.directionNav.update();
        };
        d.addSlide = function(b, c) {
            var e = a(b);
            d.count += 1;
            d.last = d.count - 1;
            if (k && l) {
                c !== undefined ? d.slides.eq(d.count - c).after(e) : d.container.prepend(e);
            } else {
                c !== undefined ? d.slides.eq(c).before(e) : d.container.append(e);
            }
            d.update(c, "add");
            d.slides = a(d.vars.selector + ":not(.clone)", d);
            d.setup();
            d.vars.added(d);
        };
        d.removeSlide = function(b) {
            var c = isNaN(b) ? d.slides.index(a(b)) : b;
            d.count -= 1;
            d.last = d.count - 1;
            if (isNaN(b)) {
                a(b, d.slides).remove();
            } else {
                k && l ? d.slides.eq(d.last).remove() : d.slides.eq(b).remove();
            }
            d.doMath();
            d.update(c, "remove");
            d.slides = a(d.vars.selector + ":not(.clone)", d);
            d.setup();
            d.vars.removed(d);
        };
        p.init();
    };
    a(window).blur(function(a) {
        focused = false;
    }).focus(function(a) {
        focused = true;
    });
    a.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: false,
        animationLoop: true,
        smoothHeight: false,
        startAt: 0,
        slideshow: true,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: false,
        thumbCaptions: false,
        pauseOnAction: true,
        pauseOnHover: false,
        pauseInvisible: true,
        useCSS: true,
        touch: true,
        video: false,
        controlNav: true,
        directionNav: true,
        prevText: "Previous",
        nextText: "Next",
        keyboard: true,
        multipleKeyboard: false,
        mousewheel: false,
        pausePlay: false,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: true,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    };
    a.fn.flexslider = function(b) {
        if (b === undefined) b = {};
        if (typeof b === "object") {
            return this.each(function() {
                var c = a(this), d = b.selector ? b.selector : ".slides > li", e = c.find(d);
                if (e.length === 1 && b.allowOneSlide === true || e.length === 0) {
                    e.fadeIn(400);
                    if (b.start) b.start(c);
                } else if (c.data("flexslider") === undefined) {
                    new a.flexslider(this, b);
                }
            });
        } else {
            var c = a(this).data("flexslider");
            switch (b) {
              case "play":
                c.play();
                break;

              case "pause":
                c.pause();
                break;

              case "stop":
                c.stop();
                break;

              case "next":
                c.flexAnimate(c.getTarget("next"), true);
                break;

              case "prev":
              case "previous":
                c.flexAnimate(c.getTarget("prev"), true);
                break;

              default:
                if (typeof b === "number") c.flexAnimate(b, true);
            }
        }
    };
})(jQuery);

(function(a) {
    var b = {}, c, d, e = document, f = window, g = e.documentElement, h = a.expando;
    a.event.special.inview = {
        add: function(c) {
            b[c.guid + "-" + this[h]] = {
                data: c,
                $element: a(this)
            };
        },
        remove: function(a) {
            try {
                delete b[a.guid + "-" + this[h]];
            } catch (c) {}
        }
    };
    a(f).bind("scroll resize", function() {
        c = d = null;
    });
    !g.addEventListener && g.attachEvent && g.attachEvent("onfocusin", function() {
        d = null;
    });
    setInterval(function() {
        var h = a(), i, j = 0;
        a.each(b, function(a, b) {
            var c = b.data.selector, d = b.$element;
            h = h.add(c ? d.find(c) : d);
        });
        if (i = h.length) {
            var k;
            if (!(k = c)) {
                var l = {
                    height: f.innerHeight,
                    width: f.innerWidth
                };
                if (!l.height && ((k = e.compatMode) || !a.support.boxModel)) k = "CSS1Compat" === k ? g : e.body, 
                l = {
                    height: k.clientHeight,
                    width: k.clientWidth
                };
                k = l;
            }
            c = k;
            for (d = d || {
                top: f.pageYOffset || g.scrollTop || e.body.scrollTop,
                left: f.pageXOffset || g.scrollLeft || e.body.scrollLeft
            }; j < i; j++) if (a.contains(g, h[j])) {
                k = a(h[j]);
                var m = k.height(), n = k.width(), o = k.offset(), l = k.data("inview");
                if (!d || !c) break;
                o.top + m > d.top && o.top < d.top + c.height && o.left + n > d.left && o.left < d.left + c.width ? (n = d.left > o.left ? "right" : d.left + c.width < o.left + n ? "left" : "both", 
                m = d.top > o.top ? "bottom" : d.top + c.height < o.top + m ? "top" : "both", o = n + "-" + m, 
                (!l || l !== o) && k.data("inview", o).trigger("inview", [ !0, n, m ])) : l && k.data("inview", !1).trigger("inview", [ !1 ]);
            }
        }
    }, 250);
})(jQuery);

(function(a) {
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 10;
    var f = 0;
    var g = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
    var h = "onorientationchange" in window;
    var i = false;
    var j = false;
    var k = false;
    var l = false;
    var m = false;
    var n = false;
    var o = false;
    var p = "pointer";
    var q = "pointer";
    var r = new Array();
    var s = new Array();
    var t = new Array();
    var u = new Array();
    var v = new Array();
    var w = new Array();
    var x = new Array();
    var y = new Array();
    var z = new Array();
    var A = new Array();
    var B = new Array();
    var C = new Array();
    var D = new Array();
    var E = {
        showScrollbar: function(b, c) {
            if (b.scrollbarHide) {
                a("." + c).css({
                    opacity: b.scrollbarOpacity,
                    filter: "alpha(opacity:" + b.scrollbarOpacity * 100 + ")"
                });
            }
        },
        hideScrollbar: function(a, b, c, d, f, g, h, i, j, k) {
            if (a.scrollbar && a.scrollbarHide) {
                for (var l = c; l < c + 25; l++) {
                    b[b.length] = E.hideScrollbarIntervalTimer(e * l, d[c], (c + 24 - l) / 24, f, g, h, i, j, k, a);
                }
            }
        },
        hideScrollbarInterval: function(b, c, d, e, g, h, i, j, k) {
            f = b * -1 / B[j] * (g - h - i - e);
            E.setSliderOffset("." + d, f);
            a("." + d).css({
                opacity: k.scrollbarOpacity * c,
                filter: "alpha(opacity:" + k.scrollbarOpacity * c * 100 + ")"
            });
        },
        slowScrollHorizontalInterval: function(b, c, d, e, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
            if (u.infiniteSlider) {
                if (d <= B[r] * -1 || d <= C[r] * -1) {
                    var v = a(b).width();
                    if (d <= C[r] * -1) {
                        var w = m[0] * -1;
                        a(c).each(function(b) {
                            E.setSliderOffset(a(c)[b], w + s);
                            if (b < n.length) {
                                n[b] = w * -1;
                            }
                            w = w + q[b];
                        });
                        d = d + n[0] * -1;
                        A[r] = n[0] * -1 + s;
                        B[r] = A[r] + v - h;
                        z[r] = 0;
                    }
                    while (d <= B[r] * -1) {
                        var D = 0;
                        var F = E.getSliderOffset(a(c[0]), "x");
                        a(c).each(function(a) {
                            if (E.getSliderOffset(this, "x") < F) {
                                F = E.getSliderOffset(this, "x");
                                D = a;
                            }
                        });
                        var G = A[r] + v;
                        E.setSliderOffset(a(c)[D], G);
                        A[r] = n[1] * -1 + s;
                        B[r] = A[r] + v - h;
                        n.splice(0, 1);
                        n.splice(n.length, 0, G * -1 + s);
                        z[r]++;
                    }
                }
                if (d >= A[r] * -1 || d >= 0) {
                    var v = a(b).width();
                    if (d > 0) {
                        var w = m[0] * -1;
                        a(c).each(function(b) {
                            E.setSliderOffset(a(c)[b], w + s);
                            if (b < n.length) {
                                n[b] = w * -1;
                            }
                            w = w + q[b];
                        });
                        d = d - n[0] * -1;
                        A[r] = n[0] * -1 + s;
                        B[r] = A[r] + v - h;
                        z[r] = p;
                        while (n[0] * -1 - v + s > 0) {
                            var H = 0;
                            var I = E.getSliderOffset(a(c[0]), "x");
                            a(c).each(function(a) {
                                if (E.getSliderOffset(this, "x") > I) {
                                    I = E.getSliderOffset(this, "x");
                                    H = a;
                                }
                            });
                            var G = A[r] - q[H];
                            E.setSliderOffset(a(c)[H], G);
                            n.splice(0, 0, G * -1 + s);
                            n.splice(n.length - 1, 1);
                            A[r] = n[0] * -1 + s;
                            B[r] = A[r] + v - h;
                            z[r]--;
                            x[r]++;
                        }
                    }
                    while (d > A[r] * -1) {
                        var H = 0;
                        var I = E.getSliderOffset(a(c[0]), "x");
                        a(c).each(function(a) {
                            if (E.getSliderOffset(this, "x") > I) {
                                I = E.getSliderOffset(this, "x");
                                H = a;
                            }
                        });
                        var G = A[r] - q[H];
                        E.setSliderOffset(a(c)[H], G);
                        n.splice(0, 0, G * -1 + s);
                        n.splice(n.length - 1, 1);
                        A[r] = n[0] * -1 + s;
                        B[r] = A[r] + v - h;
                        z[r]--;
                    }
                }
            }
            var J = false;
            var K = E.calcActiveOffset(u, d, n, h, z[r], p, l, r);
            var G = (K + z[r] + p) % p;
            if (u.infiniteSlider) {
                if (G != y[r]) J = true;
            } else {
                if (K != x[r]) J = true;
            }
            if (J) {
                var L = new E.args("change", u, b, a(b).children(":eq(" + G + ")"), G, t);
                a(b).parent().data("args", L);
                if (u.onSlideChange != "") {
                    u.onSlideChange(L);
                }
            }
            x[r] = K;
            y[r] = G;
            d = Math.floor(d);
            if (r != a(b).parent().data("args").data.sliderNumber) return true;
            E.setSliderOffset(b, d);
            if (u.scrollbar) {
                f = Math.floor((d * -1 - A[r] + s) / (B[r] - A[r] + s) * (i - j - g));
                var M = g - k;
                if (d >= A[r] * -1 + s) {
                    M = g - k - f * -1;
                    E.setSliderOffset(a("." + e), 0);
                    a("." + e).css({
                        width: M + "px"
                    });
                } else if (d <= B[r] * -1 + 1) {
                    M = i - j - k - f;
                    E.setSliderOffset(a("." + e), f);
                    a("." + e).css({
                        width: M + "px"
                    });
                } else {
                    E.setSliderOffset(a("." + e), f);
                    a("." + e).css({
                        width: M + "px"
                    });
                }
            }
        },
        slowScrollHorizontal: function(b, c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, C) {
            var D = E.getSliderOffset(b, "x");
            var F = new Array();
            var G = new Array();
            var H = 0;
            var I = 25 / 1024 * j;
            var J = false;
            frictionCoefficient = C.frictionCoefficient;
            elasticFrictionCoefficient = C.elasticFrictionCoefficient;
            snapFrictionCoefficient = C.snapFrictionCoefficient;
            if (g > C.snapVelocityThreshold && C.snapToChildren && !u) {
                H = 1;
            } else if (g < C.snapVelocityThreshold * -1 && C.snapToChildren && !u) {
                H = -1;
            }
            if (g < I * -1) {
                g = I * -1;
            } else if (g > I) {
                g = I;
            }
            if (!(a(b)[0] === a(t)[0])) {
                H = H * -1;
                g = g * -2;
            }
            var K = z[q];
            if (C.infiniteSlider) {
                var L = A[q];
                var M = B[q];
            }
            var N = new Array();
            var O = new Array();
            for (var P = 0; P < o.length; P++) {
                N[P] = o[P];
                if (P < c.length) {
                    O[P] = E.getSliderOffset(a(c[P]), "x");
                }
            }
            while (g > 1 || g < -1) {
                g = g * frictionCoefficient;
                D = D + g;
                if ((D > A[q] * -1 || D < B[q] * -1) && !C.infiniteSlider) {
                    g = g * elasticFrictionCoefficient;
                    D = D + g;
                }
                if (C.infiniteSlider) {
                    if (D <= M * -1) {
                        var Q = a(b).width();
                        var R = 0;
                        var S = O[0];
                        for (var P = 0; P < O.length; P++) {
                            if (O[P] < S) {
                                S = O[P];
                                R = P;
                            }
                        }
                        var T = L + Q;
                        O[R] = T;
                        L = N[1] * -1 + v;
                        M = L + Q - j;
                        N.splice(0, 1);
                        N.splice(N.length, 0, T * -1 + v);
                        K++;
                    }
                    if (D >= L * -1) {
                        var Q = a(b).width();
                        var U = 0;
                        var V = O[0];
                        for (var P = 0; P < O.length; P++) {
                            if (O[P] > V) {
                                V = O[P];
                                U = P;
                            }
                        }
                        var T = L - p[U];
                        O[U] = T;
                        N.splice(0, 0, T * -1 + v);
                        N.splice(N.length - 1, 1);
                        L = N[0] * -1 + v;
                        M = L + Q - j;
                        K--;
                    }
                }
                F[F.length] = D;
                G[G.length] = g;
            }
            var W = false;
            var X = E.calcActiveOffset(C, D, N, j, K, s, x[q], q);
            var Y = (X + K + s) % s;
            if (C.snapToChildren) {
                if (C.infiniteSlider) {
                    if (Y != y[q]) {
                        W = true;
                    }
                } else {
                    if (X != x[q]) {
                        W = true;
                    }
                }
                if (H < 0 && !W) {
                    X++;
                    if (X >= o.length && !C.infiniteSlider) X = o.length - 1;
                } else if (H > 0 && !W) {
                    X--;
                    if (X < 0 && !C.infiniteSlider) X = 0;
                }
            }
            if (C.snapToChildren || (D > A[q] * -1 || D < B[q] * -1) && !C.infiniteSlider) {
                if ((D > A[q] * -1 || D < B[q] * -1) && !C.infiniteSlider) {
                    F.splice(0, F.length);
                } else {
                    F.splice(F.length * .1, F.length);
                    D = F.length > 0 ? F[F.length - 1] : D;
                }
                while (D < N[X] - .5 || D > N[X] + .5) {
                    D = (D - N[X]) * snapFrictionCoefficient + N[X];
                    F[F.length] = D;
                }
                F[F.length] = N[X];
            }
            var Z = 1;
            if (F.length % 2 != 0) {
                Z = 0;
            }
            var $ = 0;
            var _ = 0;
            for (var ab = 0; ab < d.length; ab++) {
                clearTimeout(d[ab]);
            }
            var bb = (X + K + s) % s;
            var cb = 0;
            for (var ab = Z; ab < F.length; ab = ab + 2) {
                if (ab == Z || Math.abs(F[ab] - cb) > 1 || ab >= F.length - 2) {
                    cb = F[ab];
                    d[d.length] = E.slowScrollHorizontalIntervalTimer(e * ab, b, c, F[ab], f, i, j, k, l, m, X, n, o, r, s, p, q, v, bb, C);
                }
            }
            var W = false;
            var Y = (X + z[q] + s) % s;
            if (C.infiniteSlider) {
                if (Y != y[q]) {
                    W = true;
                }
            } else {
                if (X != x[q]) {
                    W = true;
                }
            }
            if (C.onSlideComplete != "" && F.length > 1) {
                d[d.length] = E.onSlideCompleteTimer(e * (ab + 1), C, b, a(b).children(":eq(" + Y + ")"), bb, q);
            }
            d[d.length] = E.updateBackfaceVisibilityTimer(e * (ab + 1), c, q, s, C);
            w[q] = d;
            E.hideScrollbar(C, d, ab, F, f, i, j, l, m, q);
        },
        onSlideComplete: function(b, c, d, e, f) {
            var g = r[f] != e ? true : false;
            var h = new E.args("complete", b, a(c), d, e, e);
            a(c).parent().data("args", h);
            if (b.onSlideComplete != "") {
                b.onSlideComplete(h);
            }
            r[f] = e;
        },
        getSliderOffset: function(b, c) {
            var d = 0;
            c = c == "x" ? 4 : 5;
            if (j && !k && !l) {
                var e = new Array("-webkit-transform", "-moz-transform", "transform");
                var f;
                for (var g = 0; g < e.length; g++) {
                    if (a(b).css(e[g]) != undefined) {
                        if (a(b).css(e[g]).length > 0) {
                            f = a(b).css(e[g]).split(",");
                            break;
                        }
                    }
                }
                d = f[c] == undefined ? 0 : parseInt(f[c], 10);
            } else {
                d = parseInt(a(b).css("left"), 10);
            }
            return d;
        },
        setSliderOffset: function(b, c) {
            c = parseInt(c, 10);
            if (j && !k && !l) {
                a(b).css({
                    msTransform: "matrix(1,0,0,1," + c + ",0)",
                    webkitTransform: "matrix(1,0,0,1," + c + ",0)",
                    MozTransform: "matrix(1,0,0,1," + c + ",0)",
                    transform: "matrix(1,0,0,1," + c + ",0)"
                });
            } else {
                a(b).css({
                    left: c + "px"
                });
            }
        },
        setBrowserInfo: function() {
            if (navigator.userAgent.match("WebKit") != null) {
                i = true;
                p = "";
                q = "";
            } else if (navigator.userAgent.match("Gecko") != null) {
                o = true;
                p = "";
                q = "";
            } else if (navigator.userAgent.match("MSIE 7") != null) {
                k = true;
                n = true;
            } else if (navigator.userAgent.match("MSIE 8") != null) {
                l = true;
                n = true;
            } else if (navigator.userAgent.match("MSIE 9") != null) {
                m = true;
                n = true;
            }
        },
        has3DTransform: function() {
            var b = false;
            var c = a("<div />").css({
                msTransform: "matrix(1,1,1,1,1,1)",
                webkitTransform: "matrix(1,1,1,1,1,1)",
                MozTransform: "matrix(1,1,1,1,1,1)",
                transform: "matrix(1,1,1,1,1,1)"
            });
            if (c.attr("style") == "") {
                b = false;
            } else if (o && parseInt(navigator.userAgent.split("/")[3], 10) >= 21) {
                b = false;
            } else if (c.attr("style") != undefined) {
                b = true;
            }
            return b;
        },
        getSlideNumber: function(a, b, c) {
            return (a - z[b] + c) % c;
        },
        calcActiveOffset: function(a, b, c, d, e, f, g, h) {
            var i = false;
            var j = new Array();
            var k;
            if (b > c[0]) k = 0;
            if (b < c[c.length - 1]) k = f - 1;
            for (var l = 0; l < c.length; l++) {
                if (c[l] <= b && c[l] > b - d) {
                    if (!i && c[l] != b) {
                        j[j.length] = c[l - 1];
                    }
                    j[j.length] = c[l];
                    i = true;
                }
            }
            if (j.length == 0) {
                j[0] = c[c.length - 1];
            }
            var m = d;
            var n = 0;
            for (var l = 0; l < j.length; l++) {
                var o = Math.abs(b - j[l]);
                if (o < m) {
                    n = j[l];
                    m = o;
                }
            }
            for (var l = 0; l < c.length; l++) {
                if (n == c[l]) {
                    k = l;
                }
            }
            return k;
        },
        changeSlide: function(b, c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
            E.autoSlidePause(p);
            for (var u = 0; u < f.length; u++) {
                clearTimeout(f[u]);
            }
            var v = Math.ceil(t.autoSlideTransTimer / 10) + 1;
            var A = E.getSliderOffset(c, "x");
            var B = n[b];
            var C = B - A;
            var D = b - (x[p] + z[p] + r) % r;
            if (t.infiniteSlider) {
                b = (b - z[p] + r * 2) % r;
                var F = false;
                if (b == 0 && r == 2) {
                    b = r;
                    n[b] = n[b - 1] - a(d).eq(0).outerWidth(true);
                    F = true;
                }
                B = n[b];
                C = B - A;
                var G = new Array(n[b] - a(c).width(), n[b] + a(c).width());
                if (F) {
                    n.splice(n.length - 1, 1);
                }
                for (var H = 0; H < G.length; H++) {
                    if (Math.abs(G[H] - A) < Math.abs(C)) {
                        C = G[H] - A;
                    }
                }
            }
            if (C < 0 && D == -1) {
                C += a(c).width();
            } else if (C > 0 && D == 1) {
                C -= a(c).width();
            }
            var I = new Array();
            var J;
            var K;
            E.showScrollbar(t, g);
            for (var H = 0; H <= v; H++) {
                J = H;
                J /= v;
                J--;
                K = A + C * (Math.pow(J, 5) + 1);
                I[I.length] = K;
            }
            var L = (b + z[p] + r) % r;
            var M = 0;
            for (var H = 0; H < I.length; H++) {
                if (H == 0 || Math.abs(I[H] - M) > 1 || H >= I.length - 2) {
                    M = I[H];
                    f[H] = E.slowScrollHorizontalIntervalTimer(e * (H + 1), c, d, I[H], g, h, i, j, k, l, b, m, n, q, r, o, p, s, L, t);
                }
                if (H == 0 && t.onSlideStart != "") {
                    var N = (x[p] + z[p] + r) % r;
                    t.onSlideStart(new E.args("start", t, c, a(c).children(":eq(" + N + ")"), N, b));
                }
            }
            var O = false;
            if (t.infiniteSlider) {
                if (L != y[p]) {
                    O = true;
                }
            } else {
                if (b != x[p]) {
                    O = true;
                }
            }
            if (O && t.onSlideComplete != "") {
                f[f.length] = E.onSlideCompleteTimer(e * (H + 1), t, c, a(c).children(":eq(" + L + ")"), L, p);
            }
            w[p] = f;
            E.hideScrollbar(t, f, H, I, g, h, i, k, l, p);
            E.autoSlide(c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t);
        },
        changeOffset: function(b, c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
            E.autoSlidePause(p);
            for (var u = 0; u < f.length; u++) {
                clearTimeout(f[u]);
            }
            if (!t.infiniteSlider) {
                b = b > A[p] * -1 + s ? A[p] * -1 + s : b;
                b = b < B[p] * -1 ? B[p] * -1 : b;
            }
            var v = Math.ceil(t.autoSlideTransTimer / 10) + 1;
            var C = E.getSliderOffset(c, "x");
            var D = (E.calcActiveOffset(t, b, n, i, z, r, x[p], p) + z[p] + r) % r;
            var F = n.slice();
            if (t.snapToChildren && !t.infiniteSlider) {
                b = n[D];
            } else if (t.infiniteSlider && t.snapToChildren) {
                while (b >= F[0]) {
                    F.splice(0, 0, F[r - 1] + a(c).width());
                    F.splice(r, 1);
                }
                while (b <= F[r - 1]) {
                    F.splice(r, 0, F[0] - a(c).width());
                    F.splice(0, 1);
                }
                D = E.calcActiveOffset(t, b, F, i, z, r, x[p], p);
                b = F[D];
            }
            var G = b - C;
            var H = new Array();
            var I;
            var J;
            E.showScrollbar(t, g);
            for (var K = 0; K <= v; K++) {
                I = K;
                I /= v;
                I--;
                J = C + G * (Math.pow(I, 5) + 1);
                H[H.length] = J;
            }
            var L = (D + z[p] + r) % r;
            var M = 0;
            for (var K = 0; K < H.length; K++) {
                if (K == 0 || Math.abs(H[K] - M) > 1 || K >= H.length - 2) {
                    M = H[K];
                    f[K] = E.slowScrollHorizontalIntervalTimer(e * (K + 1), c, d, H[K], g, h, i, j, k, l, D, m, n, q, r, o, p, s, L, t);
                }
                if (K == 0 && t.onSlideStart != "") {
                    var L = (x[p] + z[p] + r) % r;
                    t.onSlideStart(new E.args("start", t, c, a(c).children(":eq(" + L + ")"), L, D));
                }
            }
            var N = false;
            if (t.infiniteSlider) {
                if (L != y[p]) {
                    N = true;
                }
            } else {
                if (D != x[p]) {
                    N = true;
                }
            }
            if (N && t.onSlideComplete != "") {
                f[f.length] = E.onSlideCompleteTimer(e * (K + 1), t, c, a(c).children(":eq(" + L + ")"), L, p);
            }
            w[p] = f;
            E.hideScrollbar(t, f, K, H, g, h, i, k, l, p);
            E.autoSlide(c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t);
        },
        autoSlide: function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
            if (!u[m].autoSlide) return false;
            E.autoSlidePause(m);
            s[m] = setTimeout(function() {
                if (!q.infiniteSlider && x[m] > k.length - 1) {
                    x[m] = x[m] - o;
                }
                var r = x[m] + z[m] + 1;
                E.changeSlide(r, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q);
                E.autoSlide(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q);
            }, q.autoSlideTimer + q.autoSlideTransTimer);
        },
        autoSlidePause: function(a) {
            clearTimeout(s[a]);
        },
        isUnselectable: function(b, c) {
            if (c.unselectableSelector != "") {
                if (a(b).closest(c.unselectableSelector).length == 1) return true;
            }
            return false;
        },
        slowScrollHorizontalIntervalTimer: function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
            var u = setTimeout(function() {
                E.slowScrollHorizontalInterval(b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t);
            }, a);
            return u;
        },
        onSlideCompleteTimer: function(a, b, c, d, e, f) {
            var g = setTimeout(function() {
                E.onSlideComplete(b, c, d, e, f);
            }, a);
            return g;
        },
        hideScrollbarIntervalTimer: function(a, b, c, d, e, f, g, h, i, j) {
            var k = setTimeout(function() {
                E.hideScrollbarInterval(b, c, d, e, f, g, h, i, j);
            }, a);
            return k;
        },
        updateBackfaceVisibilityTimer: function(a, b, c, d, e) {
            var f = setTimeout(function() {
                E.updateBackfaceVisibility(b, c, d, e);
            }, a);
            return f;
        },
        updateBackfaceVisibility: function(b, c, d, e) {
            var f = (x[c] + z[c] + d) % d;
            var g = Array();
            for (var h = 0; h < e.hardwareAccelBuffer * 2; h++) {
                var i = E.mod(f + h - e.hardwareAccelBuffer, d);
                if (a(b).eq(i).css("-webkit-backface-visibility") == "visible") {
                    g[g.length] = i;
                    var j = E.mod(i + e.hardwareAccelBuffer * 2, d);
                    var k = E.mod(i - e.hardwareAccelBuffer * 2, d);
                    a(b).eq(i).css("-webkit-backface-visibility", "hidden");
                    if (g.indexOf(k) == -1) a(b).eq(k).css("-webkit-backface-visibility", "");
                    if (g.indexOf(j) == -1) a(b).eq(j).css("-webkit-backface-visibility", "");
                }
            }
        },
        mod: function(a, b) {
            var c = a % b;
            return c < 0 ? c + b : c;
        },
        args: function(b, c, d, e, f, g) {
            this.prevSlideNumber = a(d).parent().data("args") == undefined ? undefined : a(d).parent().data("args").prevSlideNumber;
            this.prevSlideObject = a(d).parent().data("args") == undefined ? undefined : a(d).parent().data("args").prevSlideObject;
            this.targetSlideNumber = g + 1;
            this.targetSlideObject = a(d).children(":eq(" + g + ")");
            this.slideChanged = false;
            if (b == "load") {
                this.targetSlideNumber = undefined;
                this.targetSlideObject = undefined;
            } else if (b == "start") {
                this.targetSlideNumber = undefined;
                this.targetSlideObject = undefined;
            } else if (b == "change") {
                this.slideChanged = true;
                this.prevSlideNumber = a(d).parent().data("args") == undefined ? c.startAtSlide : a(d).parent().data("args").currentSlideNumber;
                this.prevSlideObject = a(d).children(":eq(" + this.prevSlideNumber + ")");
            } else if (b == "complete") {
                this.slideChanged = a(d).parent().data("args").slideChanged;
            }
            this.settings = c;
            this.data = a(d).parent().data("iosslider");
            this.sliderObject = d;
            this.sliderContainerObject = a(d).parent();
            this.currentSlideObject = e;
            this.currentSlideNumber = f + 1;
            this.currentSliderOffset = E.getSliderOffset(d, "x") * -1;
        },
        preventDrag: function(a) {
            a.preventDefault();
        },
        preventClick: function(a) {
            a.stopImmediatePropagation();
            return false;
        },
        enableClick: function() {
            return true;
        }
    };
    E.setBrowserInfo();
    var F = {
        init: function(e, i) {
            j = E.has3DTransform();
            var m = a.extend(true, {
                elasticPullResistance: .6,
                frictionCoefficient: .92,
                elasticFrictionCoefficient: .6,
                snapFrictionCoefficient: .92,
                snapToChildren: false,
                snapSlideCenter: false,
                startAtSlide: 1,
                scrollbar: false,
                scrollbarDrag: false,
                scrollbarHide: true,
                scrollbarPaging: false,
                scrollbarLocation: "top",
                scrollbarContainer: "",
                scrollbarOpacity: .4,
                scrollbarHeight: "4px",
                scrollbarBorder: "0",
                scrollbarMargin: "5px",
                scrollbarBackground: "#000",
                scrollbarBorderRadius: "100px",
                scrollbarShadow: "0 0 0 #000",
                scrollbarElasticPullResistance: .9,
                desktopClickDrag: false,
                keyboardControls: false,
                tabToAdvance: false,
                responsiveSlideContainer: true,
                responsiveSlides: true,
                navSlideSelector: "",
                navPrevSelector: "",
                navNextSelector: "",
                autoSlideToggleSelector: "",
                autoSlide: false,
                autoSlideTimer: 5e3,
                autoSlideTransTimer: 750,
                autoSlideHoverPause: true,
                infiniteSlider: false,
                snapVelocityThreshold: 5,
                slideStartVelocityThreshold: 0,
                horizontalSlideLockThreshold: 5,
                verticalSlideLockThreshold: 3,
                hardwareAccelBuffer: 5,
                stageCSS: {
                    position: "relative",
                    top: "0",
                    left: "0",
                    overflow: "hidden",
                    zIndex: 1
                },
                unselectableSelector: "",
                onSliderLoaded: "",
                onSliderUpdate: "",
                onSliderResize: "",
                onSlideStart: "",
                onSlideChange: "",
                onSlideComplete: ""
            }, e);
            if (i == undefined) {
                i = this;
            }
            return a(i).each(function(e) {
                b++;
                var i = b;
                var j = new Array();
                u[i] = a.extend({}, m);
                A[i] = 0;
                B[i] = 0;
                var o = 0;
                var s = new Array(0, 0);
                var G = new Array(0, 0);
                var H = "scrollbarBlock" + b;
                var I = "scrollbar" + b;
                var J;
                var K;
                var L;
                var M;
                var N;
                var O;
                var P = 0;
                var Q = a(this);
                var R;
                var S;
                var T;
                var U;
                var V;
                var W;
                var X = true;
                var Y = -1;
                var Z = new Array();
                var $;
                var _ = new Array();
                var ab = 0;
                var bb = 0;
                var cb = 0;
                var db = 0;
                var eb = a(this).children(":first-child");
                var fb;
                var gb;
                var hb;
                var ib = a(eb).children().not("script").length;
                var jb = false;
                var kb = 0;
                var lb = false;
                var mb = undefined;
                var nb = 0;
                var ob;
                z[i] = 0;
                var pb = false;
                r[i] = -1;
                var qb = false;
                t[i] = Q;
                v[i] = false;
                var rb;
                var sb = 0;
                var tb = 0;
                var ub = false;
                var vb = false;
                var wb = "touchstart.iosSliderEvent click.iosSliderEvent";
                var xb;
                var yb;
                var zb;
                var Ab;
                D[i] = false;
                w[i] = new Array();
                if (m.scrollbarDrag) {
                    m.scrollbar = true;
                    m.scrollbarHide = false;
                }
                var Bb = a(this);
                var Cb = Bb.data("iosslider");
                if (Cb != undefined) return true;
                if (parseInt(a().jquery.split(".").join(""), 10) >= 14.2) {
                    a(this).delegate("img", "dragstart.iosSliderEvent", function(a) {
                        a.preventDefault();
                    });
                } else {
                    a(this).find("img").bind("dragstart.iosSliderEvent", function(a) {
                        a.preventDefault();
                    });
                }
                if (m.infiniteSlider) {
                    m.scrollbar = false;
                }
                if (m.infiniteSlider && ib == 1) {
                    m.infiniteSlider = false;
                }
                if (m.scrollbar) {
                    if (m.scrollbarContainer != "") {
                        a(m.scrollbarContainer).append("<div class = '" + H + "'><div class = '" + I + "'></div></div>");
                    } else {
                        a(eb).parent().append("<div class = '" + H + "'><div class = '" + I + "'></div></div>");
                    }
                }
                if (!Fb()) return true;
                a(this).find("a").bind("mousedown", E.preventDrag);
                a(this).find("[onclick]").bind("click", E.preventDrag).each(function() {
                    a(this).data("onclick", this.onclick);
                });
                var Y = E.calcActiveOffset(m, E.getSliderOffset(a(eb), "x"), $, R, z[i], ib, undefined, i);
                var Db = (Y + z[i] + ib) % ib;
                var Eb = new E.args("load", m, eb, a(eb).children(":eq(" + Db + ")"), Db, Db);
                a(Q).data("args", Eb);
                if (m.onSliderLoaded != "") {
                    m.onSliderLoaded(Eb);
                }
                r[i] = Db;
                function Fb() {
                    E.autoSlidePause(i);
                    yb = a(eb).find("a");
                    zb = a(eb).find("[onclick]");
                    Ab = a(eb).find("*");
                    a(Q).css("width", "");
                    a(Q).css("height", "");
                    a(eb).css("width", "");
                    fb = a(eb).children().not("script").get();
                    gb = new Array();
                    hb = new Array();
                    if (m.responsiveSlides) {
                        a(fb).css("width", "");
                    }
                    B[i] = 0;
                    $ = new Array();
                    N = a(Q).parent().width();
                    R = a(Q).outerWidth(true);
                    if (m.responsiveSlideContainer) {
                        R = a(Q).outerWidth(true) > N ? N : a(Q).width();
                    }
                    a(Q).css({
                        position: m.stageCSS.position,
                        top: m.stageCSS.top,
                        left: m.stageCSS.left,
                        overflow: m.stageCSS.overflow,
                        zIndex: m.stageCSS.zIndex,
                        webkitPerspective: 1e3,
                        webkitBackfaceVisibility: "hidden",
                        msTouchAction: "pan-y",
                        width: R
                    });
                    a("body").removeClass("grabbing");
                    a(m.unselectableSelector).css({
                        cursor: "default"
                    });
                    for (var b = 0; b < fb.length; b++) {
                        gb[b] = a(fb[b]).width();
                        hb[b] = a(fb[b]).outerWidth(true);
                        var c = hb[b];
                        if (m.responsiveSlides) {
                            if (hb[b] > R) {
                                c = R + (hb[b] - gb[b]) * -1;
                                gb[b] = c;
                                hb[b] = R;
                            } else {
                                c = gb[b];
                            }
                            a(fb[b]).css({
                                width: c
                            });
                        }
                        a(fb[b]).css({
                            webkitBackfaceVisibility: "hidden",
                            overflow: "hidden",
                            position: "absolute"
                        });
                        $[b] = B[i] * -1;
                        B[i] = B[i] + c + (hb[b] - gb[b]);
                    }
                    if (m.snapSlideCenter) {
                        P = (R - hb[0]) * .5;
                        if (m.responsiveSlides && hb[0] > R) {
                            P = 0;
                        }
                    }
                    C[i] = B[i] * 2;
                    for (var b = 0; b < fb.length; b++) {
                        E.setSliderOffset(a(fb[b]), $[b] * -1 + B[i] + P);
                        $[b] = $[b] - B[i];
                    }
                    if (!m.infiniteSlider && !m.snapSlideCenter) {
                        for (var d = 0; d < $.length; d++) {
                            if ($[d] <= (B[i] * 2 - R) * -1) {
                                break;
                            }
                            kb = d;
                        }
                        $.splice(kb + 1, $.length);
                        $[$.length] = (B[i] * 2 - R) * -1;
                    }
                    for (var d = 0; d < $.length; d++) {
                        _[d] = $[d];
                    }
                    if (X) {
                        u[i].startAtSlide = u[i].startAtSlide > $.length ? $.length : u[i].startAtSlide;
                        if (m.infiniteSlider) {
                            u[i].startAtSlide = (u[i].startAtSlide - 1 + ib) % ib;
                            x[i] = u[i].startAtSlide;
                        } else {
                            u[i].startAtSlide = u[i].startAtSlide - 1 < 0 ? $.length - 1 : u[i].startAtSlide;
                            x[i] = u[i].startAtSlide - 1;
                        }
                        y[i] = x[i];
                    }
                    A[i] = B[i] + P;
                    a("body").removeClass("grabbing");
                    a(eb).css({
                        position: "relative",
                        cursor: p,
                        webkitPerspective: "0",
                        webkitBackfaceVisibility: "hidden",
                        width: B[i] + "px"
                    });
                    xb = B[i];
                    B[i] = B[i] * 2 - R + P * 2;
                    pb = xb + P < R || R == 0 ? true : false;
                    if (pb) {
                        a("body").removeClass("grabbing");
                        a(eb).css({
                            cursor: "default"
                        });
                    }
                    O = a(Q).parent().outerHeight(true);
                    S = a(Q).height();
                    if (m.responsiveSlideContainer) {
                        S = S > O ? O : S;
                    }
                    a(Q).css({
                        height: S
                    });
                    E.setSliderOffset(eb, $[x[i]]);
                    if (m.infiniteSlider && !pb) {
                        var e = E.getSliderOffset(a(eb), "x");
                        var f = (z[i] + ib) % ib * -1;
                        while (f < 0) {
                            var g = 0;
                            var h = E.getSliderOffset(a(fb[0]), "x");
                            a(fb).each(function(a) {
                                if (E.getSliderOffset(this, "x") < h) {
                                    h = E.getSliderOffset(this, "x");
                                    g = a;
                                }
                            });
                            var k = A[i] + xb;
                            E.setSliderOffset(a(fb)[g], k);
                            A[i] = $[1] * -1 + P;
                            B[i] = A[i] + xb - R;
                            $.splice(0, 1);
                            $.splice($.length, 0, k * -1 + P);
                            f++;
                        }
                        while ($[0] * -1 - xb + P > 0 && m.snapSlideCenter && X) {
                            var l = 0;
                            var n = E.getSliderOffset(a(fb[0]), "x");
                            a(fb).each(function(a) {
                                if (E.getSliderOffset(this, "x") > n) {
                                    n = E.getSliderOffset(this, "x");
                                    l = a;
                                }
                            });
                            var k = A[i] - hb[l];
                            E.setSliderOffset(a(fb)[l], k);
                            $.splice(0, 0, k * -1 + P);
                            $.splice($.length - 1, 1);
                            A[i] = $[0] * -1 + P;
                            B[i] = A[i] + xb - R;
                            z[i]--;
                            x[i]++;
                        }
                        while (e <= B[i] * -1) {
                            var g = 0;
                            var h = E.getSliderOffset(a(fb[0]), "x");
                            a(fb).each(function(a) {
                                if (E.getSliderOffset(this, "x") < h) {
                                    h = E.getSliderOffset(this, "x");
                                    g = a;
                                }
                            });
                            var k = A[i] + xb;
                            E.setSliderOffset(a(fb)[g], k);
                            A[i] = $[1] * -1 + P;
                            B[i] = A[i] + xb - R;
                            $.splice(0, 1);
                            $.splice($.length, 0, k * -1 + P);
                            z[i]++;
                            x[i]--;
                        }
                    }
                    E.setSliderOffset(eb, $[x[i]]);
                    E.updateBackfaceVisibility(fb, i, ib, m);
                    if (!m.desktopClickDrag) {
                        a("body").removeClass("grabbing");
                        a(eb).css({
                            cursor: "default"
                        });
                    }
                    if (m.scrollbar) {
                        a("." + H).css({
                            margin: m.scrollbarMargin,
                            overflow: "hidden",
                            display: "none"
                        });
                        a("." + H + " ." + I).css({
                            border: m.scrollbarBorder
                        });
                        U = parseInt(a("." + H).css("marginLeft")) + parseInt(a("." + H).css("marginRight"));
                        V = parseInt(a("." + H + " ." + I).css("borderLeftWidth"), 10) + parseInt(a("." + H + " ." + I).css("borderRightWidth"), 10);
                        L = m.scrollbarContainer != "" ? a(m.scrollbarContainer).width() : R;
                        M = R / xb * (L - U);
                        if (!m.scrollbarHide) {
                            ab = m.scrollbarOpacity;
                        }
                        a("." + H).css({
                            position: "absolute",
                            left: 0,
                            width: L - U + "px",
                            margin: m.scrollbarMargin
                        });
                        if (m.scrollbarLocation == "top") {
                            a("." + H).css("top", "0");
                        } else {
                            a("." + H).css("bottom", "0");
                        }
                        a("." + H + " ." + I).css({
                            borderRadius: m.scrollbarBorderRadius,
                            background: m.scrollbarBackground,
                            height: m.scrollbarHeight,
                            width: M - V + "px",
                            minWidth: m.scrollbarHeight,
                            border: m.scrollbarBorder,
                            webkitPerspective: 1e3,
                            webkitBackfaceVisibility: "hidden",
                            position: "relative",
                            opacity: ab,
                            filter: "alpha(opacity:" + ab * 100 + ")",
                            boxShadow: m.scrollbarShadow
                        });
                        E.setSliderOffset(a("." + H + " ." + I), Math.floor(($[x[i]] * -1 - A[i] + P) / (B[i] - A[i] + P) * (L - U - M)));
                        a("." + H).css({
                            display: "block"
                        });
                        J = a("." + H + " ." + I);
                        K = a("." + H);
                    }
                    if (m.scrollbarDrag && !pb) {
                        a("body").removeClass("grabbing");
                        a("." + H + " ." + I).css({
                            cursor: p
                        });
                    }
                    if (m.infiniteSlider) {
                        ob = (B[i] + R) / 3;
                    }
                    if (m.navSlideSelector != "") {
                        a(m.navSlideSelector).each(function(b) {
                            a("body").removeClass("grabbing");
                            a(this).css({
                                cursor: "pointer"
                            });
                            a(this).unbind(wb).bind(wb, function(c) {
                                if (c.type == "touchstart") {
                                    a(this).unbind("click.iosSliderEvent");
                                } else {
                                    a(this).unbind("touchstart.iosSliderEvent");
                                }
                                wb = c.type + ".iosSliderEvent";
                                E.changeSlide(b, eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                            });
                        });
                    }
                    if (m.navPrevSelector != "") {
                        a("body").removeClass("grabbing");
                        a(m.navPrevSelector).css({
                            cursor: "pointer"
                        });
                        a(m.navPrevSelector).unbind(wb).bind(wb, function(b) {
                            if (b.type == "touchstart") {
                                a(this).unbind("click.iosSliderEvent");
                            } else {
                                a(this).unbind("touchstart.iosSliderEvent");
                            }
                            wb = b.type + ".iosSliderEvent";
                            var c = (x[i] + z[i] + ib) % ib;
                            if (c > 0 || m.infiniteSlider) {
                                E.changeSlide(c - 1, eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                            }
                        });
                    }
                    if (m.navNextSelector != "") {
                        a("body").removeClass("grabbing");
                        a(m.navNextSelector).css({
                            cursor: "pointer"
                        });
                        a(m.navNextSelector).unbind(wb).bind(wb, function(b) {
                            if (b.type == "touchstart") {
                                a(this).unbind("click.iosSliderEvent");
                            } else {
                                a(this).unbind("touchstart.iosSliderEvent");
                            }
                            wb = b.type + ".iosSliderEvent";
                            var c = (x[i] + z[i] + ib) % ib;
                            if (c < $.length - 1 || m.infiniteSlider) {
                                E.changeSlide(c + 1, eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                            }
                        });
                    }
                    if (m.autoSlide && !pb) {
                        if (m.autoSlideToggleSelector != "") {
                            a("body").removeClass("grabbing");
                            a(m.autoSlideToggleSelector).css({
                                cursor: "pointer"
                            });
                            a(m.autoSlideToggleSelector).unbind(wb).bind(wb, function(b) {
                                if (b.type == "touchstart") {
                                    a(this).unbind("click.iosSliderEvent");
                                } else {
                                    a(this).unbind("touchstart.iosSliderEvent");
                                }
                                wb = b.type + ".iosSliderEvent";
                                if (!qb) {
                                    E.autoSlidePause(i);
                                    qb = true;
                                    a(m.autoSlideToggleSelector).addClass("on");
                                } else {
                                    E.autoSlide(eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                                    qb = false;
                                    a(m.autoSlideToggleSelector).removeClass("on");
                                }
                            });
                        }
                    }
                    E.autoSlide(eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                    a(Q).bind("mouseleave.iosSliderEvent", function() {
                        if (qb) return true;
                        E.autoSlide(eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                    });
                    a(Q).bind("touchend.iosSliderEvent", function() {
                        if (qb) return true;
                        E.autoSlide(eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                    });
                    if (m.autoSlideHoverPause) {
                        a(Q).bind("mouseenter.iosSliderEvent", function() {
                            E.autoSlidePause(i);
                        });
                    }
                    a(Q).data("iosslider", {
                        obj: Bb,
                        settings: m,
                        scrollerNode: eb,
                        slideNodes: fb,
                        numberOfSlides: ib,
                        centeredSlideOffset: P,
                        sliderNumber: i,
                        originalOffsets: _,
                        childrenOffsets: $,
                        sliderMax: B[i],
                        scrollbarClass: I,
                        scrollbarWidth: M,
                        scrollbarStageWidth: L,
                        stageWidth: R,
                        scrollMargin: U,
                        scrollBorder: V,
                        infiniteSliderOffset: z[i],
                        infiniteSliderWidth: ob,
                        slideNodeOuterWidths: hb,
                        shortContent: pb
                    });
                    X = false;
                    return true;
                }
                if (m.scrollbarPaging && m.scrollbar && !pb) {
                    a(K).css("cursor", "pointer");
                    a(K).bind("click.iosSliderEvent", function(b) {
                        if (this == b.target) {
                            if (b.pageX > a(J).offset().left) {
                                F.nextPage(Q);
                            } else {
                                F.prevPage(Q);
                            }
                        }
                    });
                }
                if (u[i].responsiveSlides || u[i].responsiveSlideContainer) {
                    var Gb = h ? "orientationchange" : "resize";
                    a(window).bind(Gb + ".iosSliderEvent-" + i, function() {
                        if (!Fb()) return true;
                        var b = a(Q).data("args");
                        if (m.onSliderResize != "") {
                            m.onSliderResize(b);
                        }
                    });
                }
                if ((m.keyboardControls || m.tabToAdvance) && !pb) {
                    a(document).bind("keydown.iosSliderEvent", function(a) {
                        if (!k && !l) {
                            var a = a.originalEvent;
                        }
                        if (a.target.nodeName == "INPUT") return true;
                        if (D[i]) return true;
                        if (a.keyCode == 37 && m.keyboardControls) {
                            a.preventDefault();
                            var b = (x[i] + z[i] + ib) % ib;
                            if (b > 0 || m.infiniteSlider) {
                                E.changeSlide(b - 1, eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                            }
                        } else if (a.keyCode == 39 && m.keyboardControls || a.keyCode == 9 && m.tabToAdvance) {
                            a.preventDefault();
                            var b = (x[i] + z[i] + ib) % ib;
                            if (b < $.length - 1 || m.infiniteSlider) {
                                E.changeSlide(b + 1, eb, fb, j, I, M, R, L, U, V, _, $, hb, i, ob, ib, P, m);
                            }
                        }
                    });
                }
                if (g || m.desktopClickDrag) {
                    var Hb = false;
                    var Ib = false;
                    var Jb = a(eb);
                    var Kb = a(eb);
                    var Lb = null;
                    var Mb = false;
                    if (m.scrollbarDrag) {
                        Jb = Jb.add(J);
                        Kb = Kb.add(K);
                    }
                    a(Jb).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent", function(b) {
                        a(window).one("scroll.iosSliderEvent", function(a) {
                            Hb = false;
                        });
                        if (Hb) return true;
                        Hb = true;
                        Ib = false;
                        if (b.type == "touchstart") {
                            a(Kb).unbind("mousedown.iosSliderEvent");
                        } else {
                            a(Kb).unbind("touchstart.iosSliderEvent");
                        }
                        if (D[i] || pb) {
                            Hb = false;
                            jb = false;
                            return true;
                        }
                        Mb = E.isUnselectable(b.target, m);
                        if (Mb) {
                            Hb = false;
                            jb = false;
                            return true;
                        }
                        rb = a(this)[0] === a(J)[0] ? J : eb;
                        if (!k && !l) {
                            var b = b.originalEvent;
                        }
                        E.autoSlidePause(i);
                        Ab.unbind(".disableClick");
                        if (b.type == "touchstart") {
                            eventX = b.touches[0].pageX;
                            eventY = b.touches[0].pageY;
                        } else {
                            if (window.getSelection) {
                                if (window.getSelection().empty) {
                                    window.getSelection().empty();
                                } else if (window.getSelection().removeAllRanges) {
                                    window.getSelection().removeAllRanges();
                                }
                            } else if (document.selection) {
                                if (l) {
                                    try {
                                        document.selection.empty();
                                    } catch (b) {}
                                } else {
                                    document.selection.empty();
                                }
                            }
                            eventX = b.pageX;
                            eventY = b.pageY;
                            lb = true;
                            mb = eb;
                            if (!Modernizr.touch) {
                                setTimeout(function() {
                                    a("body").addClass("grabbing");
                                }, 80);
                            }
                            a(this).css({
                                cursor: q
                            });
                        }
                        s = new Array(0, 0);
                        G = new Array(0, 0);
                        c = 0;
                        jb = false;
                        for (var d = 0; d < j.length; d++) {
                            clearTimeout(j[d]);
                        }
                        var e = E.getSliderOffset(eb, "x");
                        if (e > A[i] * -1 + P + xb) {
                            e = A[i] * -1 + P + xb;
                            E.setSliderOffset(a("." + I), e);
                            a("." + I).css({
                                width: M - V + "px"
                            });
                        } else if (e < B[i] * -1) {
                            e = B[i] * -1;
                            E.setSliderOffset(a("." + I), L - U - M);
                            a("." + I).css({
                                width: M - V + "px"
                            });
                        }
                        var f = a(this)[0] === a(J)[0] ? A[i] : 0;
                        bb = (E.getSliderOffset(this, "x") - eventX - f) * -1;
                        cb = (E.getSliderOffset(this, "y") - eventY) * -1;
                        s[1] = eventX;
                        G[1] = eventY;
                        vb = false;
                    });
                    a(document).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent", function(b) {
                        if (!k && !l) {
                            var b = b.originalEvent;
                        }
                        if (D[i] || pb || Mb || !Hb) return true;
                        var e = 0;
                        if (b.type == "touchmove") {
                            eventX = b.touches[0].pageX;
                            eventY = b.touches[0].pageY;
                        } else {
                            if (window.getSelection) {
                                if (window.getSelection().empty) {} else if (window.getSelection().removeAllRanges) {
                                    window.getSelection().removeAllRanges();
                                }
                            } else if (document.selection) {
                                if (l) {
                                    try {
                                        document.selection.empty();
                                    } catch (b) {}
                                } else {
                                    document.selection.empty();
                                }
                            }
                            eventX = b.pageX;
                            eventY = b.pageY;
                            if (!lb) {
                                return true;
                            }
                            if (!n) {
                                if ((typeof b.webkitMovementX != "undefined" || typeof b.webkitMovementY != "undefined") && b.webkitMovementY === 0 && b.webkitMovementX === 0) {
                                    return true;
                                }
                            }
                        }
                        s[0] = s[1];
                        s[1] = eventX;
                        c = (s[1] - s[0]) / 2;
                        G[0] = G[1];
                        G[1] = eventY;
                        d = (G[1] - G[0]) / 2;
                        if (!jb) {
                            var g = (x[i] + z[i] + ib) % ib;
                            var h = new E.args("start", m, eb, a(eb).children(":eq(" + g + ")"), g, undefined);
                            a(Q).data("args", h);
                            if (m.onSlideStart != "") {
                                m.onSlideStart(h);
                            }
                        }
                        if ((d > m.verticalSlideLockThreshold || d < m.verticalSlideLockThreshold * -1) && b.type == "touchmove" && !jb) {
                            ub = true;
                        }
                        if ((c > m.horizontalSlideLockThreshold || c < m.horizontalSlideLockThreshold * -1) && b.type == "touchmove") {
                            b.preventDefault();
                        }
                        if (c > m.slideStartVelocityThreshold || c < m.slideStartVelocityThreshold * -1) {
                            jb = true;
                        }
                        if (jb && !ub) {
                            var j = E.getSliderOffset(eb, "x");
                            var o = a(rb)[0] === a(J)[0] ? A[i] : P;
                            var p = a(rb)[0] === a(J)[0] ? (A[i] - B[i] - P) / (L - U - M) : 1;
                            var q = a(rb)[0] === a(J)[0] ? m.scrollbarElasticPullResistance : m.elasticPullResistance;
                            var r = m.snapSlideCenter && a(rb)[0] === a(J)[0] ? 0 : P;
                            var t = m.snapSlideCenter && a(rb)[0] === a(J)[0] ? P : 0;
                            if (b.type == "touchmove") {
                                if (db != b.touches.length) {
                                    bb = j * -1 + eventX;
                                }
                                db = b.touches.length;
                            }
                            if (m.infiniteSlider) {
                                if (j <= B[i] * -1) {
                                    var u = a(eb).width();
                                    if (j <= C[i] * -1) {
                                        var v = _[0] * -1;
                                        a(fb).each(function(b) {
                                            E.setSliderOffset(a(fb)[b], v + P);
                                            if (b < $.length) {
                                                $[b] = v * -1;
                                            }
                                            v = v + hb[b];
                                        });
                                        bb = bb - $[0] * -1;
                                        A[i] = $[0] * -1 + P;
                                        B[i] = A[i] + u - R;
                                        z[i] = 0;
                                    } else {
                                        var w = 0;
                                        var F = E.getSliderOffset(a(fb[0]), "x");
                                        a(fb).each(function(a) {
                                            if (E.getSliderOffset(this, "x") < F) {
                                                F = E.getSliderOffset(this, "x");
                                                w = a;
                                            }
                                        });
                                        var H = A[i] + u;
                                        E.setSliderOffset(a(fb)[w], H);
                                        A[i] = $[1] * -1 + P;
                                        B[i] = A[i] + u - R;
                                        $.splice(0, 1);
                                        $.splice($.length, 0, H * -1 + P);
                                        z[i]++;
                                    }
                                }
                                if (j >= A[i] * -1 || j >= 0) {
                                    var u = a(eb).width();
                                    if (j >= 0) {
                                        var v = _[0] * -1;
                                        a(fb).each(function(b) {
                                            E.setSliderOffset(a(fb)[b], v + P);
                                            if (b < $.length) {
                                                $[b] = v * -1;
                                            }
                                            v = v + hb[b];
                                        });
                                        bb = bb + $[0] * -1;
                                        A[i] = $[0] * -1 + P;
                                        B[i] = A[i] + u - R;
                                        z[i] = ib;
                                        while ($[0] * -1 - u + P > 0) {
                                            var K = 0;
                                            var N = E.getSliderOffset(a(fb[0]), "x");
                                            a(fb).each(function(a) {
                                                if (E.getSliderOffset(this, "x") > N) {
                                                    N = E.getSliderOffset(this, "x");
                                                    K = a;
                                                }
                                            });
                                            var H = A[i] - hb[K];
                                            E.setSliderOffset(a(fb)[K], H);
                                            $.splice(0, 0, H * -1 + P);
                                            $.splice($.length - 1, 1);
                                            A[i] = $[0] * -1 + P;
                                            B[i] = A[i] + u - R;
                                            z[i]--;
                                            x[i]++;
                                        }
                                    } else {
                                        var K = 0;
                                        var N = E.getSliderOffset(a(fb[0]), "x");
                                        a(fb).each(function(a) {
                                            if (E.getSliderOffset(this, "x") > N) {
                                                N = E.getSliderOffset(this, "x");
                                                K = a;
                                            }
                                        });
                                        var H = A[i] - hb[K];
                                        E.setSliderOffset(a(fb)[K], H);
                                        $.splice(0, 0, H * -1 + P);
                                        $.splice($.length - 1, 1);
                                        A[i] = $[0] * -1 + P;
                                        B[i] = A[i] + u - R;
                                        z[i]--;
                                    }
                                }
                            } else {
                                var u = a(eb).width();
                                if (j > A[i] * -1 + P) {
                                    e = (A[i] + (bb - o - eventX + r) * -1 * p - o) * q * -1 / p;
                                }
                                if (j < B[i] * -1) {
                                    e = (B[i] + t + (bb - o - eventX) * -1 * p - o) * q * -1 / p;
                                }
                            }
                            E.setSliderOffset(eb, (bb - o - eventX - e) * -1 * p - o + t);
                            if (m.scrollbar) {
                                E.showScrollbar(m, I);
                                f = Math.floor((bb - eventX - e - A[i] + r) / (B[i] - A[i] + P) * (L - U - M) * p);
                                var O = M;
                                if (f <= 0) {
                                    O = M - V - f * -1;
                                    E.setSliderOffset(a("." + I), 0);
                                    a("." + I).css({
                                        width: O + "px"
                                    });
                                } else if (f >= L - U - V - M) {
                                    O = L - U - V - f;
                                    E.setSliderOffset(a("." + I), f);
                                    a("." + I).css({
                                        width: O + "px"
                                    });
                                } else {
                                    E.setSliderOffset(a("." + I), f);
                                }
                            }
                            if (b.type == "touchmove") {
                                W = b.touches[0].pageX;
                            }
                            var S = false;
                            var T = E.calcActiveOffset(m, (bb - eventX - e) * -1, $, R, z[i], ib, undefined, i);
                            var X = (T + z[i] + ib) % ib;
                            if (m.infiniteSlider) {
                                if (X != y[i]) {
                                    S = true;
                                }
                            } else {
                                if (T != x[i]) {
                                    S = true;
                                }
                            }
                            if (S) {
                                x[i] = T;
                                y[i] = X;
                                vb = true;
                                var h = new E.args("change", m, eb, a(eb).children(":eq(" + X + ")"), X, X);
                                a(Q).data("args", h);
                                if (m.onSlideChange != "") {
                                    m.onSlideChange(h);
                                }
                                E.updateBackfaceVisibility(fb, i, ib, m);
                            }
                        }
                    });
                    var Nb = a(window);
                    if (l || k) {
                        var Nb = a(document);
                    }
                    a(Jb).bind("touchcancel.iosSliderEvent touchend.iosSliderEvent", function(a) {
                        var a = a.originalEvent;
                        if (Ib) return false;
                        Ib = true;
                        if (D[i] || pb) return true;
                        if (Mb) return true;
                        if (a.touches.length != 0) {
                            for (var b = 0; b < a.touches.length; b++) {
                                if (a.touches[b].pageX == W) {
                                    E.slowScrollHorizontal(eb, fb, j, I, c, d, M, R, L, U, V, _, $, hb, i, ob, ib, rb, vb, P, m);
                                }
                            }
                        } else {
                            E.slowScrollHorizontal(eb, fb, j, I, c, d, M, R, L, U, V, _, $, hb, i, ob, ib, rb, vb, P, m);
                        }
                        ub = false;
                        Hb = false;
                        return true;
                    });
                    a(Nb).bind("mouseup.iosSliderEvent-" + i, function(b) {
                        if (jb) {
                            yb.unbind("click.disableClick").bind("click.disableClick", E.preventClick);
                        } else {
                            yb.unbind("click.disableClick").bind("click.disableClick", E.enableClick);
                        }
                        zb.each(function() {
                            this.onclick = function(b) {
                                if (jb) {
                                    return false;
                                }
                                if (a(this).data("onclick")) a(this).data("onclick").call(this, b || window.event);
                            };
                            this.onclick = a(this).data("onclick");
                        });
                        if (parseFloat(a().jquery) >= 1.8) {
                            Ab.each(function() {
                                var b = a._data(this, "events");
                                if (b != undefined) {
                                    if (b.click != undefined) {
                                        if (b.click[0].namespace != "iosSliderEvent") {
                                            if (!jb) {
                                                return false;
                                            }
                                            a(this).one("click.disableClick", E.preventClick);
                                            var c = a._data(this, "events").click;
                                            var d = c.pop();
                                            c.splice(0, 0, d);
                                        }
                                    }
                                }
                            });
                        } else if (parseFloat(a().jquery) >= 1.6) {
                            Ab.each(function() {
                                var b = a(this).data("events");
                                if (b != undefined) {
                                    if (b.click != undefined) {
                                        if (b.click[0].namespace != "iosSliderEvent") {
                                            if (!jb) {
                                                return false;
                                            }
                                            a(this).one("click.disableClick", E.preventClick);
                                            var c = a(this).data("events").click;
                                            var d = c.pop();
                                            c.splice(0, 0, d);
                                        }
                                    }
                                }
                            });
                        }
                        if (!v[i]) {
                            if (pb) return true;
                            if (m.desktopClickDrag) {
                                a("body").removeClass("grabbing");
                                a(eb).css({
                                    cursor: p
                                });
                            }
                            if (m.scrollbarDrag) {
                                a("body").removeClass("grabbing");
                                a(J).css({
                                    cursor: p
                                });
                            }
                            lb = false;
                            if (mb == undefined) {
                                return true;
                            }
                            E.slowScrollHorizontal(mb, fb, j, I, c, d, M, R, L, U, V, _, $, hb, i, ob, ib, rb, vb, P, m);
                            mb = undefined;
                        }
                        ub = false;
                        Hb = false;
                    });
                }
            });
        },
        destroy: function(b, c) {
            if (c == undefined) {
                c = this;
            }
            return a(c).each(function() {
                var c = a(this);
                var d = c.data("iosslider");
                if (d == undefined) return false;
                if (b == undefined) {
                    b = true;
                }
                E.autoSlidePause(d.sliderNumber);
                v[d.sliderNumber] = true;
                a(window).unbind(".iosSliderEvent-" + d.sliderNumber);
                a(document).unbind(".iosSliderEvent-" + d.sliderNumber);
                a(document).unbind("keydown.iosSliderEvent");
                a(this).unbind(".iosSliderEvent");
                a(this).children(":first-child").unbind(".iosSliderEvent");
                a(this).children(":first-child").children().unbind(".iosSliderEvent");
                a(d.settings.scrollbarBlockNode).unbind(".iosSliderEvent");
                if (b) {
                    a(this).attr("style", "");
                    a(this).children(":first-child").attr("style", "");
                    a(this).children(":first-child").children().attr("style", "");
                    a(d.settings.navSlideSelector).attr("style", "");
                    a(d.settings.navPrevSelector).attr("style", "");
                    a(d.settings.navNextSelector).attr("style", "");
                    a(d.settings.autoSlideToggleSelector).attr("style", "");
                    a(d.settings.unselectableSelector).attr("style", "");
                }
                if (d.settings.scrollbar) {
                    a(".scrollbarBlock" + d.sliderNumber).remove();
                }
                var e = w[d.sliderNumber];
                for (var f = 0; f < e.length; f++) {
                    clearTimeout(e[f]);
                }
                c.removeData("iosslider");
                c.removeData("args");
            });
        },
        update: function(b) {
            if (b == undefined) {
                b = this;
            }
            return a(b).each(function() {
                var b = a(this);
                var c = b.data("iosslider");
                if (c == undefined) return false;
                c.settings.startAtSlide = b.data("args").currentSlideNumber;
                F.destroy(false, this);
                if (c.numberOfSlides != 1 && c.settings.infiniteSlider) {
                    c.settings.startAtSlide = (x[c.sliderNumber] + 1 + z[c.sliderNumber] + c.numberOfSlides) % c.numberOfSlides;
                }
                F.init(c.settings, this);
                var d = new E.args("update", c.settings, c.scrollerNode, a(c.scrollerNode).children(":eq(" + (c.settings.startAtSlide - 1) + ")"), c.settings.startAtSlide - 1, c.settings.startAtSlide - 1);
                a(c.stageNode).data("args", d);
                if (c.settings.onSliderUpdate != "") {
                    c.settings.onSliderUpdate(d);
                }
            });
        },
        addSlide: function(b, c) {
            return this.each(function() {
                var d = a(this);
                var e = d.data("iosslider");
                if (e == undefined) return false;
                if (a(e.scrollerNode).children().length == 0) {
                    a(e.scrollerNode).append(b);
                    d.data("args").currentSlideNumber = 1;
                } else if (!e.settings.infiniteSlider) {
                    if (c <= e.numberOfSlides) {
                        a(e.scrollerNode).children(":eq(" + (c - 1) + ")").before(b);
                    } else {
                        a(e.scrollerNode).children(":eq(" + (c - 2) + ")").after(b);
                    }
                    if (d.data("args").currentSlideNumber >= c) {
                        d.data("args").currentSlideNumber++;
                    }
                } else {
                    if (c == 1) {
                        a(e.scrollerNode).children(":eq(0)").before(b);
                    } else {
                        a(e.scrollerNode).children(":eq(" + (c - 2) + ")").after(b);
                    }
                    if (z[e.sliderNumber] < -1 && true) {
                        x[e.sliderNumber]--;
                    }
                    if (d.data("args").currentSlideNumber >= c) {
                        x[e.sliderNumber]++;
                    }
                }
                d.data("iosslider").numberOfSlides++;
                F.update(this);
            });
        },
        removeSlide: function(b) {
            return this.each(function() {
                var c = a(this);
                var d = c.data("iosslider");
                if (d == undefined) return false;
                a(d.scrollerNode).children(":eq(" + (b - 1) + ")").remove();
                if (x[d.sliderNumber] > b - 1) {
                    x[d.sliderNumber]--;
                }
                c.data("iosslider").numberOfSlides--;
                F.update(this);
            });
        },
        goToSlide: function(b, c, d) {
            if (d == undefined) {
                d = this;
            }
            return a(d).each(function() {
                var d = a(this);
                var e = d.data("iosslider");
                if (e == undefined || e.shortContent) return false;
                b = b > e.childrenOffsets.length ? e.childrenOffsets.length - 1 : b - 1;
                if (c != undefined) e.settings.autoSlideTransTimer = c;
                E.changeSlide(b, a(e.scrollerNode), a(e.slideNodes), w[e.sliderNumber], e.scrollbarClass, e.scrollbarWidth, e.stageWidth, e.scrollbarStageWidth, e.scrollMargin, e.scrollBorder, e.originalOffsets, e.childrenOffsets, e.slideNodeOuterWidths, e.sliderNumber, e.infiniteSliderWidth, e.numberOfSlides, e.centeredSlideOffset, e.settings);
            });
        },
        prevSlide: function(b) {
            return this.each(function() {
                var c = a(this);
                var d = c.data("iosslider");
                if (d == undefined || d.shortContent) return false;
                var e = (x[d.sliderNumber] + z[d.sliderNumber] + d.numberOfSlides) % d.numberOfSlides;
                if (b != undefined) d.settings.autoSlideTransTimer = b;
                if (e > 0 || d.settings.infiniteSlider) {
                    E.changeSlide(e - 1, a(d.scrollerNode), a(d.slideNodes), w[d.sliderNumber], d.scrollbarClass, d.scrollbarWidth, d.stageWidth, d.scrollbarStageWidth, d.scrollMargin, d.scrollBorder, d.originalOffsets, d.childrenOffsets, d.slideNodeOuterWidths, d.sliderNumber, d.infiniteSliderWidth, d.numberOfSlides, d.centeredSlideOffset, d.settings);
                }
                x[d.sliderNumber] = e;
            });
        },
        nextSlide: function(b) {
            return this.each(function() {
                var c = a(this);
                var d = c.data("iosslider");
                if (d == undefined || d.shortContent) return false;
                var e = (x[d.sliderNumber] + z[d.sliderNumber] + d.numberOfSlides) % d.numberOfSlides;
                if (b != undefined) d.settings.autoSlideTransTimer = b;
                if (e < d.childrenOffsets.length - 1 || d.settings.infiniteSlider) {
                    E.changeSlide(e + 1, a(d.scrollerNode), a(d.slideNodes), w[d.sliderNumber], d.scrollbarClass, d.scrollbarWidth, d.stageWidth, d.scrollbarStageWidth, d.scrollMargin, d.scrollBorder, d.originalOffsets, d.childrenOffsets, d.slideNodeOuterWidths, d.sliderNumber, d.infiniteSliderWidth, d.numberOfSlides, d.centeredSlideOffset, d.settings);
                }
                x[d.sliderNumber] = e;
            });
        },
        prevPage: function(b, c) {
            if (c == undefined) {
                c = this;
            }
            return a(c).each(function() {
                var c = a(this);
                var d = c.data("iosslider");
                if (d == undefined) return false;
                var e = E.getSliderOffset(d.scrollerNode, "x") + d.stageWidth;
                if (b != undefined) d.settings.autoSlideTransTimer = b;
                E.changeOffset(e, a(d.scrollerNode), a(d.slideNodes), w[d.sliderNumber], d.scrollbarClass, d.scrollbarWidth, d.stageWidth, d.scrollbarStageWidth, d.scrollMargin, d.scrollBorder, d.originalOffsets, d.childrenOffsets, d.slideNodeOuterWidths, d.sliderNumber, d.infiniteSliderWidth, d.numberOfSlides, d.centeredSlideOffset, d.settings);
            });
        },
        nextPage: function(b, c) {
            if (c == undefined) {
                c = this;
            }
            return a(c).each(function() {
                var c = a(this);
                var d = c.data("iosslider");
                if (d == undefined) return false;
                var e = E.getSliderOffset(d.scrollerNode, "x") - d.stageWidth;
                if (b != undefined) d.settings.autoSlideTransTimer = b;
                E.changeOffset(e, a(d.scrollerNode), a(d.slideNodes), w[d.sliderNumber], d.scrollbarClass, d.scrollbarWidth, d.stageWidth, d.scrollbarStageWidth, d.scrollMargin, d.scrollBorder, d.originalOffsets, d.childrenOffsets, d.slideNodeOuterWidths, d.sliderNumber, d.infiniteSliderWidth, d.numberOfSlides, d.centeredSlideOffset, d.settings);
            });
        },
        lock: function() {
            return this.each(function() {
                var b = a(this);
                var c = b.data("iosslider");
                if (c == undefined || c.shortContent) return false;
                a("body").removeClass("grabbing");
                a(c.scrollerNode).css({
                    cursor: "default"
                });
                D[c.sliderNumber] = true;
            });
        },
        unlock: function() {
            return this.each(function() {
                var b = a(this);
                var c = b.data("iosslider");
                if (c == undefined || c.shortContent) return false;
                a("body").removeClass("grabbing");
                a(c.scrollerNode).css({
                    cursor: p
                });
                D[c.sliderNumber] = false;
            });
        },
        getData: function() {
            return this.each(function() {
                var b = a(this);
                var c = b.data("iosslider");
                if (c == undefined || c.shortContent) return false;
                return c;
            });
        },
        autoSlidePause: function() {
            return this.each(function() {
                var b = a(this);
                var c = b.data("iosslider");
                if (c == undefined || c.shortContent) return false;
                u[c.sliderNumber].autoSlide = false;
                E.autoSlidePause(c.sliderNumber);
                return c;
            });
        },
        autoSlidePlay: function() {
            return this.each(function() {
                var b = a(this);
                var c = b.data("iosslider");
                if (c == undefined || c.shortContent) return false;
                u[c.sliderNumber].autoSlide = true;
                E.autoSlide(a(c.scrollerNode), a(c.slideNodes), w[c.sliderNumber], c.scrollbarClass, c.scrollbarWidth, c.stageWidth, c.scrollbarStageWidth, c.scrollMargin, c.scrollBorder, c.originalOffsets, c.childrenOffsets, c.slideNodeOuterWidths, c.sliderNumber, c.infiniteSliderWidth, c.numberOfSlides, c.centeredSlideOffset, c.settings);
                return c;
            });
        }
    };
    a.fn.iosSlider = function(b) {
        if (F[b]) {
            return F[b].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof b === "object" || !b) {
            return F.init.apply(this, arguments);
        } else {
            a.error("invalid method call!");
        }
    };
})(jQuery);

(function(a) {
    a.fn.scrollingCarousel = function(b, c) {
        if (this.length > 1) {
            var d = new Array();
            this.each(function(c) {
                d.push(a(this).scrollingCarousel(b, c));
            });
            return d;
        }
        var e = a.extend({}, a().scrollingCarousel.defaults, b);
        var f;
        var g;
        this.Destroy = function(b) {
            var c = this;
            var b = b != undefined ? b : false;
            a(c).removeData("scrollingCarousel");
            c.children(":eq(1)").remove();
            if (a(this).find("> div").length > 0) {
                c[0].innerHTML = a(this).find("> div")[0].innerHTML;
                c.children().each(function() {
                    a(this, c)[0].style.cssText = "";
                });
            } else {
                c.find("li").each(function() {
                    a(this, c)[0].style.cssText = "";
                });
            }
            c.children()[0].style.cssText = "";
            c[0].style.cssText = "";
            c.unbind();
        };
        this.Update = function(b) {
            e = null;
            e = a.extend({}, a().scrollingCarousel.defaults, b);
            this.Destroy(true);
            return this.Create();
        };
        this.Create = function(b, c) {
            if (!a(this).html()) {
                return false;
            }
            var d = this;
            var h = d.html();
            if (a(d).data("scrollingCarousel") == true && c != "pause") {
                return this;
            }
            if (e.beforeCreateFunction != null && a.isFunction(e.beforeCreateFunction)) {
                e.beforeCreateFunction(d, e);
            }
            var i;
            var j = 0;
            var k;
            var l;
            var m;
            var n;
            var o;
            var p;
            var q = new Object();
            var r = d[0];
            r.style.paddingLeft = "0";
            r.style.paddingRight = "0";
            var s = r.offsetWidth;
            var t = d.children()[0].nodeName.toLowerCase();
            switch (t) {
              case "div":
                if (!c) {
                    r.innerHTML = "<div>" + d[0].innerHTML + "</div>";
                    r.innerHTML += r.innerHTML;
                }
                i = d.children("div");
                m = d.children("div:first").children("div");
                break;

              case "ul":
                if (!c) {
                    r.innerHTML += r.innerHTML;
                }
                i = d.find("ul");
                m = d.find("ul:first > li");
                break;

              case "ol":
                if (!c) {
                    r.innerHTML += r.innerHTML;
                }
                i = d.find("ol");
                m = d.find("ol:first > li");
                break;

              default:
                console.log("unable to initialise scroller - please ensure contents are either in a UL, an OL or in DIVs");
                return false;
            }
            switch (e.scrollSpeed.toLowerCase()) {
              case "slow":
                l = 1;
                break;

              case "fast":
                l = 4;
                break;

              case "medium":
              default:
                l = 2;
            }
            var u = 0;
            var v = 0;
            var w = 0;
            var x;
            var y;
            switch (e.scrollerAlignment.toLowerCase()) {
              case "vertical":
                a(m).each(function(b) {
                    u += a(this, d).outerHeight(true);
                    if (a(this, d)[0].offsetWidth > w) {
                        w = a(this, d)[0].offsetWidth;
                    }
                });
                break;

              case "horizontal":
              default:
                a(m).each(function(b) {
                    u += a(this, d).outerWidth(true);
                    if (a(this, d)[0].offsetHeight > v) {
                        v = a(this, d)[0].offsetHeight;
                    }
                });
                break;
            }
            if (!c) {
                if (e.scrollerAlignment.toLowerCase() != "vertical") {
                    r.style.height = v + "px";
                } else {
                    r.style.width = w + "px";
                    r.style.height = a(r).height() > 0 ? a(r).height() + "px" : a(r).parent().height() + "px";
                    s = r.offsetHeight;
                }
                if (u > s) {
                    var z = Math.round(u / 100 * e.scrollerOffset);
                    n = z - Math.round(s / 2);
                    if (n > u - s) {
                        n = u - s;
                    }
                } else {
                    a(i[1]).remove();
                    return false;
                }
                r.style.overflow = "hidden";
                r.style.position = "relative";
                var x;
                i.each(function() {
                    a(this, d)[0].style.position = "absolute";
                    if (e.scrollerAlignment.toLowerCase() != "vertical") {
                        a(this, d)[0].style.top = "0";
                        a(this, d)[0].style.width = u + "px";
                    } else {
                        a(this, d)[0].style.left = "0";
                        a(this, d)[0].style.height = u + "px";
                        a(this, d)[0].style.width = w + "px";
                    }
                    a(this).children().each(function(b) {
                        if (e.scrollerAlignment.toLowerCase() != "vertical") {
                            a(this, d)[0].style.cssFloat = "left";
                        }
                        a(this, d)[0].style.position = "static";
                    });
                });
                if (e.scrollerAlignment.toLowerCase() != "vertical") {
                    i[0].style.left = n > 0 ? "-" + n + "px" : "0";
                    if (e.looped == true) {
                        i[1].style.left = i[0].offsetLeft - u + "px";
                    } else {
                        i[1].style.display = "none";
                        i[1].style.top = "-1000px";
                    }
                } else {
                    i[0].style.top = n > 0 ? "-" + n + "px" : "0";
                    if (e.looped == true) {
                        i[1].style.top = i[0].offsetTop - u + "px";
                    } else {
                        i[1].style.display = "none";
                        i[1].style.left = "-1000px";
                    }
                }
                d.mouseenter(function() {
                    q.startCarousel();
                });
                d.mouseleave(function() {
                    q.stopCarousel(true);
                    if (e.autoScroll == true) {
                        q.autoScroll();
                    }
                });
                d.mousemove(function(a) {
                    var b = {
                        x: 0,
                        y: 0
                    };
                    if (a.pageX || a.pageY) {
                        b.x = a.pageX;
                        b.y = a.pageY;
                    } else {
                        var c = document.documentElement;
                        var d = document.body;
                        b.x = a.clientX + ((c.scrollLeft || d.scrollLeft) - (c.clientLeft || 0));
                        b.y = a.clientY + ((c.scrollTop || d.scrollTop) - (c.clientTop || 0));
                    }
                    cursorPosition = b;
                });
            }
            q.autoScroll = function() {
                var a = 40;
                if (e.looped == false) {
                    return;
                }
                if (g) {
                    clearInterval(g);
                    g = 0;
                }
                k = k ? k : e.scrollerAlignment.toLowerCase() != "vertical" ? parseInt(i[0].style.left) : parseInt(i[0].style.top);
                e.autoScrollSpeed = e.autoScrollSpeed < 1e3 ? 1e3 : e.autoScrollSpeed;
                if (e.autoScrollSpeed / a < s) {
                    o = Math.round(s / (e.autoScrollSpeed / a));
                } else {
                    o = 1;
                    a = Math.round(e.autoScrollSpeed / s);
                }
                g = setInterval(function() {
                    switch (e.autoScrollDirection.toLowerCase()) {
                      case "right":
                      case "down":
                        if (k + o > u) {
                            k = 0;
                            j = j == 0 ? 1 : 0;
                        } else {
                            k = k + o;
                        }
                        break;

                      case "left":
                      case "up":
                      default:
                        if (k - o < 0 - (u - s)) {
                            k = s;
                            j = j == 0 ? 1 : 0;
                        } else {
                            k = k - o;
                        }
                    }
                    if (e.scrollerAlignment.toLowerCase() != "vertical") {
                        i[j].style.left = k + "px";
                        i[j == 0 ? 1 : 0].style.left = k - u + "px";
                    } else {
                        i[j].style.top = k + "px";
                        i[j == 0 ? 1 : 0].style.top = k - u + "px";
                    }
                }, a);
            };
            q.startCarousel = function() {
                if (g) {
                    clearInterval(g);
                    g = 0;
                }
                p = e.scrollerAlignment.toLowerCase() != "vertical" ? Math.round(a(r).offset().left + r.offsetWidth / 2) : Math.round(a(r).offset().top + r.offsetHeight / 2);
                k = k ? k : e.scrollerAlignment.toLowerCase() != "vertical" ? parseInt(i[0].style.left) : parseInt(i[0].style.top);
                f = setInterval(function() {
                    var a;
                    var b = e.scrollerAlignment.toLowerCase() != "vertical" ? cursorPosition.x : cursorPosition.y;
                    var c = s / 2;
                    a = b < p ? p - b : b - p;
                    o = a < Math.ceil(c / 100 * 30) ? 1 : a < Math.ceil(c / 100 * 50) ? 2 * l : a < Math.ceil(c / 100 * 70) ? 3 * l : a < Math.ceil(c / 100 * 90) ? 4 * l : 6 * l;
                    if (b < p) {
                        if (k + o > 0 && e.looped == false) {
                            k = 0;
                        } else if (k + o > u) {
                            k = 0;
                            j = j == 0 ? 1 : 0;
                        } else {
                            k = k + o;
                        }
                    } else if (b > p) {
                        if (k - o < 0 - (u - s)) {
                            if (e.looped == false) {
                                k = 0 - (u - s);
                            } else {
                                k = s;
                                j = j == 0 ? 1 : 0;
                            }
                        } else {
                            k = k - o;
                        }
                    }
                    if (e.scrollerAlignment.toLowerCase() != "vertical") {
                        i[j].style.left = k + "px";
                        i[j == 0 ? 1 : 0].style.left = k - u + "px";
                    } else {
                        i[j].style.top = k + "px";
                        i[j == 0 ? 1 : 0].style.top = k - u + "px";
                    }
                }, 40);
            };
            q.stopCarousel = function(a) {
                if (!f) {
                    return;
                }
                clearInterval(f);
                f = 0;
                if (!a || e.looped == false || e.autoScroll == true) {
                    return;
                }
                if (o > 1) {
                    var b;
                    var c = 0;
                    for (b = o; b > 1; b--) {
                        c += b;
                    }
                    var d = e.scrollerAlignment.toLowerCase() != "vertical" ? cursorPosition.x : cursorPosition.y;
                    if (d < p) {
                        if (k + c > u) {
                            k = k - u;
                            j = j == 0 ? 1 : 0;
                        }
                    } else {
                        if (k - c < 0 - (u - s)) {
                            k = k + u;
                            j = j == 0 ? 1 : 0;
                        }
                    }
                    var g = setInterval(function() {
                        if (o > 1) {
                            if (d < p) {
                                k += o;
                            } else {
                                k -= o;
                            }
                            if (e.scrollerAlignment.toLowerCase() != "vertical") {
                                i[j].style.left = k + "px";
                                i[j == 0 ? 1 : 0].style.left = k - u + "px";
                            } else {
                                i[j].style.top = k + "px";
                                i[j == 0 ? 1 : 0].style.top = k - u + "px";
                            }
                            o--;
                        } else {
                            clearInterval(g);
                        }
                    }, 50);
                }
            };
            if (c != "pause") {
                if (e.autoScroll == true) {
                    q.autoScroll();
                }
            }
            switch (c) {
              case "pause":
                q.stopCarousel();
                if (g) {
                    clearInterval(g);
                    g = 0;
                }
                d.unbind("mouseenter");
                d.unbind("mouseleave");
                a(d).data("scrollingCarousel", false);
                return;
                break;

              case "play":
                a("html").mousemove(function(b) {
                    var c = {
                        x: 0,
                        y: 0
                    };
                    if (b.pageX || b.pageY) {
                        c.x = b.pageX;
                        c.y = b.pageY;
                    } else {
                        var f = document.documentElement;
                        var g = document.body;
                        c.x = b.clientX + (f.scrollLeft || g.scrollLeft) - (f.clientLeft || 0);
                        c.y = b.clientY + (f.scrollTop || g.scrollTop) - (f.clientTop || 0);
                    }
                    cursorPosition = c;
                    if (cursorPosition.x >= d.offset().left && cursorPosition.x <= d.offset().left + d[0].offsetWidth && cursorPosition.y >= d.offset().top && cursorPosition.y <= d.offset().top + d[0].offsetHeight) {
                        q.startCarousel();
                    }
                    d.mouseenter(function() {
                        q.startCarousel();
                    });
                    d.mouseleave(function() {
                        q.stopCarousel(true);
                        if (e.autoScroll == true) {
                            q.autoScroll();
                        }
                    });
                    a(this).unbind("mousemove");
                    if (e.autoScroll == true) {
                        q.autoScroll();
                    }
                });
                break;
            }
            a(d).data("scrollingCarousel", true);
            if (e.afterCreateFunction != null && a.isFunction(e.afterCreateFunction)) {
                e.afterCreateFunction(d, e);
            }
            return this;
        };
        this.Pause = function() {
            this.Create(c, "pause");
        };
        this.Play = function() {
            this.Create(c, "play");
        };
        return this.Create(c);
    };
    jQuery.fn.scrollingCarousel.defaults = {
        autoScroll: false,
        autoScrollDirection: "left",
        autoScrollSpeed: 1e4,
        looped: true,
        scrollerAlignment: "horizontal",
        scrollerOffset: 0,
        scrollSpeed: "medium",
        beforeCreateFunction: null,
        afterCreateFunction: null
    };
})(jQuery);

(function(a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define([ "jquery" ], a);
    } else {
        a(jQuery);
    }
})(function(a) {
    "use strict";
    var b = "left", c = "right", d = "up", e = "down", f = "in", g = "out", h = "none", i = "auto", j = "swipe", k = "pinch", l = "tap", m = "doubletap", n = "longtap", o = "hold", p = "horizontal", q = "vertical", r = "all", s = 10, t = "start", u = "move", v = "end", w = "cancel", x = "ontouchstart" in window, y = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled, z = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, A = "TouchSwipe";
    var B = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe"
    };
    a.fn.swipe = function(b) {
        var c = a(this), d = c.data(A);
        if (d && typeof b === "string") {
            if (d[b]) {
                return d[b].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                a.error("Method " + b + " does not exist on jQuery.swipe");
            }
        } else if (!d && (typeof b === "object" || !b)) {
            return C.apply(this, arguments);
        }
        return c;
    };
    a.fn.swipe.defaults = B;
    a.fn.swipe.phases = {
        PHASE_START: t,
        PHASE_MOVE: u,
        PHASE_END: v,
        PHASE_CANCEL: w
    };
    a.fn.swipe.directions = {
        LEFT: b,
        RIGHT: c,
        UP: d,
        DOWN: e,
        IN: f,
        OUT: g
    };
    a.fn.swipe.pageScroll = {
        NONE: h,
        HORIZONTAL: p,
        VERTICAL: q,
        AUTO: i
    };
    a.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: r
    };
    function C(b) {
        if (b && (b.allowPageScroll === undefined && (b.swipe !== undefined || b.swipeStatus !== undefined))) {
            b.allowPageScroll = h;
        }
        if (b.click !== undefined && b.tap === undefined) {
            b.tap = b.click;
        }
        if (!b) {
            b = {};
        }
        b = a.extend({}, a.fn.swipe.defaults, b);
        return this.each(function() {
            var c = a(this);
            var d = c.data(A);
            if (!d) {
                d = new D(this, b);
                c.data(A, d);
            }
        });
    }
    function D(o, B) {
        var C = x || z || !B.fallbackToMouseEvents, D = C ? z ? y ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown", E = C ? z ? y ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove", F = C ? z ? y ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup", G = C ? null : "mouseleave", H = z ? y ? "MSPointerCancel" : "pointercancel" : "touchcancel";
        var I = 0, J = null, K = 0, L = 0, M = 0, N = 1, O = 0, P = 0, Q = null;
        var R = a(o);
        var S = "start";
        var T = 0;
        var U = null;
        var V = 0, W = 0, X = 0, Y = 0, Z = 0;
        var $ = null, _ = null;
        try {
            R.bind(D, bb);
            R.bind(H, eb);
        } catch (ab) {
            a.error("events not supported " + D + "," + H + " on jQuery.swipe");
        }
        this.enable = function() {
            R.bind(D, bb);
            R.bind(H, eb);
            return R;
        };
        this.disable = function() {
            gb();
            return R;
        };
        this.destroy = function() {
            gb();
            R.data(A, null);
            return R;
        };
        this.option = function(b, c) {
            if (B[b] !== undefined) {
                if (c === undefined) {
                    return B[b];
                } else {
                    B[b] = c;
                }
            } else {
                a.error("Option " + b + " does not exist on jQuery.swipe.options");
            }
            return null;
        };
        function bb(b) {
            if (Kb()) return;
            if (a(b.target).closest(B.excludedElements, R).length > 0) return;
            var c = b.originalEvent ? b.originalEvent : b;
            var d, e = x ? c.touches[0] : c;
            S = t;
            if (x) {
                T = c.touches.length;
            } else {
                b.preventDefault();
            }
            I = 0;
            J = null;
            P = null;
            K = 0;
            L = 0;
            M = 0;
            N = 1;
            O = 0;
            U = Pb();
            Q = Sb();
            Ib();
            if (!x || (T === B.fingers || B.fingers === r) || qb()) {
                Mb(0, e);
                V = _b();
                if (T == 2) {
                    Mb(1, c.touches[1]);
                    L = M = Vb(U[0].start, U[1].start);
                }
                if (B.swipeStatus || B.pinchStatus) {
                    d = ib(c, S);
                }
            } else {
                d = false;
            }
            if (d === false) {
                S = w;
                ib(c, S);
                return d;
            } else {
                if (B.hold) {
                    _ = setTimeout(a.proxy(function() {
                        R.trigger("hold", [ c.target ]);
                        if (B.hold) {
                            d = B.hold.call(R, c, c.target);
                        }
                    }, this), B.longTapThreshold);
                }
                Lb(true);
            }
            return null;
        }
        function cb(a) {
            var b = a.originalEvent ? a.originalEvent : a;
            if (S === v || S === w || Jb()) return;
            var c, d = x ? b.touches[0] : b;
            var e = Nb(d);
            W = _b();
            if (x) {
                T = b.touches.length;
            }
            if (B.hold) clearTimeout(_);
            S = u;
            if (T == 2) {
                if (L == 0) {
                    Mb(1, b.touches[1]);
                    L = M = Vb(U[0].start, U[1].start);
                } else {
                    Nb(b.touches[1]);
                    M = Vb(U[0].end, U[1].end);
                    P = Xb(U[0].end, U[1].end);
                }
                N = Wb(L, M);
                O = Math.abs(L - M);
            }
            if (T === B.fingers || B.fingers === r || !x || qb()) {
                J = $b(e.start, e.end);
                ob(a, J);
                I = Yb(e.start, e.end);
                K = Ub();
                Qb(J, I);
                if (B.swipeStatus || B.pinchStatus) {
                    c = ib(b, S);
                }
                if (!B.triggerOnTouchEnd || B.triggerOnTouchLeave) {
                    var f = true;
                    if (B.triggerOnTouchLeave) {
                        var g = ac(this);
                        f = bc(e.end, g);
                    }
                    if (!B.triggerOnTouchEnd && f) {
                        S = hb(u);
                    } else if (B.triggerOnTouchLeave && !f) {
                        S = hb(v);
                    }
                    if (S == w || S == v) {
                        ib(b, S);
                    }
                }
            } else {
                S = w;
                ib(b, S);
            }
            if (c === false) {
                S = w;
                ib(b, S);
            }
        }
        function db(a) {
            var b = a.originalEvent;
            if (x) {
                if (b.touches.length > 0) {
                    Hb();
                    return true;
                }
            }
            if (Jb()) {
                T = Y;
            }
            W = _b();
            K = Ub();
            if (lb() || !kb()) {
                S = w;
                ib(b, S);
            } else if (B.triggerOnTouchEnd || B.triggerOnTouchEnd == false && S === u) {
                a.preventDefault();
                S = v;
                ib(b, S);
            } else if (!B.triggerOnTouchEnd && xb()) {
                S = v;
                jb(b, S, l);
            } else if (S === u) {
                S = w;
                ib(b, S);
            }
            Lb(false);
            return null;
        }
        function eb() {
            T = 0;
            W = 0;
            V = 0;
            L = 0;
            M = 0;
            N = 1;
            Ib();
            Lb(false);
        }
        function fb(a) {
            var b = a.originalEvent;
            if (B.triggerOnTouchLeave) {
                S = hb(v);
                ib(b, S);
            }
        }
        function gb() {
            R.unbind(D, bb);
            R.unbind(H, eb);
            R.unbind(E, cb);
            R.unbind(F, db);
            if (G) {
                R.unbind(G, fb);
            }
            Lb(false);
        }
        function hb(a) {
            var b = a;
            var c = nb();
            var d = kb();
            var e = lb();
            if (!c || e) {
                b = w;
            } else if (d && a == u && (!B.triggerOnTouchEnd || B.triggerOnTouchLeave)) {
                b = v;
            } else if (!d && a == v && B.triggerOnTouchLeave) {
                b = w;
            }
            return b;
        }
        function ib(a, b) {
            var c = undefined;
            if (ub() || tb()) {
                c = jb(a, b, j);
            } else if ((rb() || qb()) && c !== false) {
                c = jb(a, b, k);
            }
            if (Fb() && c !== false) {
                c = jb(a, b, m);
            } else if (Gb() && c !== false) {
                c = jb(a, b, n);
            } else if (Eb() && c !== false) {
                c = jb(a, b, l);
            }
            if (b === w) {
                eb(a);
            }
            if (b === v) {
                if (x) {
                    if (a.touches.length == 0) {
                        eb(a);
                    }
                } else {
                    eb(a);
                }
            }
            return c;
        }
        function jb(h, i, o) {
            var p = undefined;
            if (o == j) {
                R.trigger("swipeStatus", [ i, J || null, I || 0, K || 0, T, U ]);
                if (B.swipeStatus) {
                    p = B.swipeStatus.call(R, h, i, J || null, I || 0, K || 0, T, U);
                    if (p === false) return false;
                }
                if (i == v && sb()) {
                    R.trigger("swipe", [ J, I, K, T, U ]);
                    if (B.swipe) {
                        p = B.swipe.call(R, h, J, I, K, T, U);
                        if (p === false) return false;
                    }
                    switch (J) {
                      case b:
                        R.trigger("swipeLeft", [ J, I, K, T, U ]);
                        if (B.swipeLeft) {
                            p = B.swipeLeft.call(R, h, J, I, K, T, U);
                        }
                        break;

                      case c:
                        R.trigger("swipeRight", [ J, I, K, T, U ]);
                        if (B.swipeRight) {
                            p = B.swipeRight.call(R, h, J, I, K, T, U);
                        }
                        break;

                      case d:
                        R.trigger("swipeUp", [ J, I, K, T, U ]);
                        if (B.swipeUp) {
                            p = B.swipeUp.call(R, h, J, I, K, T, U);
                        }
                        break;

                      case e:
                        R.trigger("swipeDown", [ J, I, K, T, U ]);
                        if (B.swipeDown) {
                            p = B.swipeDown.call(R, h, J, I, K, T, U);
                        }
                        break;
                    }
                }
            }
            if (o == k) {
                R.trigger("pinchStatus", [ i, P || null, O || 0, K || 0, T, N, U ]);
                if (B.pinchStatus) {
                    p = B.pinchStatus.call(R, h, i, P || null, O || 0, K || 0, T, N, U);
                    if (p === false) return false;
                }
                if (i == v && pb()) {
                    switch (P) {
                      case f:
                        R.trigger("pinchIn", [ P || null, O || 0, K || 0, T, N, U ]);
                        if (B.pinchIn) {
                            p = B.pinchIn.call(R, h, P || null, O || 0, K || 0, T, N, U);
                        }
                        break;

                      case g:
                        R.trigger("pinchOut", [ P || null, O || 0, K || 0, T, N, U ]);
                        if (B.pinchOut) {
                            p = B.pinchOut.call(R, h, P || null, O || 0, K || 0, T, N, U);
                        }
                        break;
                    }
                }
            }
            if (o == l) {
                if (i === w || i === v) {
                    clearTimeout($);
                    clearTimeout(_);
                    if (yb() && !Bb()) {
                        Z = _b();
                        $ = setTimeout(a.proxy(function() {
                            Z = null;
                            R.trigger("tap", [ h.target ]);
                            if (B.tap) {
                                p = B.tap.call(R, h, h.target);
                            }
                        }, this), B.doubleTapThreshold);
                    } else {
                        Z = null;
                        R.trigger("tap", [ h.target ]);
                        if (B.tap) {
                            p = B.tap.call(R, h, h.target);
                        }
                    }
                }
            } else if (o == m) {
                if (i === w || i === v) {
                    clearTimeout($);
                    Z = null;
                    R.trigger("doubletap", [ h.target ]);
                    if (B.doubleTap) {
                        p = B.doubleTap.call(R, h, h.target);
                    }
                }
            } else if (o == n) {
                if (i === w || i === v) {
                    clearTimeout($);
                    Z = null;
                    R.trigger("longtap", [ h.target ]);
                    if (B.longTap) {
                        p = B.longTap.call(R, h, h.target);
                    }
                }
            }
            return p;
        }
        function kb() {
            var a = true;
            if (B.threshold !== null) {
                a = I >= B.threshold;
            }
            return a;
        }
        function lb() {
            var a = false;
            if (B.cancelThreshold !== null && J !== null) {
                a = Rb(J) - I >= B.cancelThreshold;
            }
            return a;
        }
        function mb() {
            if (B.pinchThreshold !== null) {
                return O >= B.pinchThreshold;
            }
            return true;
        }
        function nb() {
            var a;
            if (B.maxTimeThreshold) {
                if (K >= B.maxTimeThreshold) {
                    a = false;
                } else {
                    a = true;
                }
            } else {
                a = true;
            }
            return a;
        }
        function ob(a, f) {
            if (B.allowPageScroll === h || qb()) {
                a.preventDefault();
            } else {
                var g = B.allowPageScroll === i;
                switch (f) {
                  case b:
                    if (B.swipeLeft && g || !g && B.allowPageScroll != p) {
                        a.preventDefault();
                    }
                    break;

                  case c:
                    if (B.swipeRight && g || !g && B.allowPageScroll != p) {
                        a.preventDefault();
                    }
                    break;

                  case d:
                    if (B.swipeUp && g || !g && B.allowPageScroll != q) {
                        a.preventDefault();
                    }
                    break;

                  case e:
                    if (B.swipeDown && g || !g && B.allowPageScroll != q) {
                        a.preventDefault();
                    }
                    break;
                }
            }
        }
        function pb() {
            var a = vb();
            var b = wb();
            var c = mb();
            return a && b && c;
        }
        function qb() {
            return !!(B.pinchStatus || B.pinchIn || B.pinchOut);
        }
        function rb() {
            return !!(pb() && qb());
        }
        function sb() {
            var a = nb();
            var b = kb();
            var c = vb();
            var d = wb();
            var e = lb();
            var f = !e && d && c && b && a;
            return f;
        }
        function tb() {
            return !!(B.swipe || B.swipeStatus || B.swipeLeft || B.swipeRight || B.swipeUp || B.swipeDown);
        }
        function ub() {
            return !!(sb() && tb());
        }
        function vb() {
            return T === B.fingers || B.fingers === r || !x;
        }
        function wb() {
            return U[0].end.x !== 0;
        }
        function xb() {
            return !!B.tap;
        }
        function yb() {
            return !!B.doubleTap;
        }
        function zb() {
            return !!B.longTap;
        }
        function Ab() {
            if (Z == null) {
                return false;
            }
            var a = _b();
            return yb() && a - Z <= B.doubleTapThreshold;
        }
        function Bb() {
            return Ab();
        }
        function Cb() {
            return (T === 1 || !x) && (isNaN(I) || I < B.threshold);
        }
        function Db() {
            return K > B.longTapThreshold && I < s;
        }
        function Eb() {
            return !!(Cb() && xb());
        }
        function Fb() {
            return !!(Ab() && yb());
        }
        function Gb() {
            return !!(Db() && zb());
        }
        function Hb() {
            X = _b();
            Y = event.touches.length + 1;
        }
        function Ib() {
            X = 0;
            Y = 0;
        }
        function Jb() {
            var a = false;
            if (X) {
                var b = _b() - X;
                if (b <= B.fingerReleaseThreshold) {
                    a = true;
                }
            }
            return a;
        }
        function Kb() {
            return !!(R.data(A + "_intouch") === true);
        }
        function Lb(a) {
            if (a === true) {
                R.bind(E, cb);
                R.bind(F, db);
                if (G) {
                    R.bind(G, fb);
                }
            } else {
                R.unbind(E, cb, false);
                R.unbind(F, db, false);
                if (G) {
                    R.unbind(G, fb, false);
                }
            }
            R.data(A + "_intouch", a === true);
        }
        function Mb(a, b) {
            var c = b.identifier !== undefined ? b.identifier : 0;
            U[a].identifier = c;
            U[a].start.x = U[a].end.x = b.pageX || b.clientX;
            U[a].start.y = U[a].end.y = b.pageY || b.clientY;
            return U[a];
        }
        function Nb(a) {
            var b = a.identifier !== undefined ? a.identifier : 0;
            var c = Ob(b);
            c.end.x = a.pageX || a.clientX;
            c.end.y = a.pageY || a.clientY;
            return c;
        }
        function Ob(a) {
            for (var b = 0; b < U.length; b++) {
                if (U[b].identifier == a) {
                    return U[b];
                }
            }
        }
        function Pb() {
            var a = [];
            for (var b = 0; b <= 5; b++) {
                a.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
            }
            return a;
        }
        function Qb(a, b) {
            b = Math.max(b, Rb(a));
            Q[a].distance = b;
        }
        function Rb(a) {
            if (Q[a]) return Q[a].distance;
            return undefined;
        }
        function Sb() {
            var a = {};
            a[b] = Tb(b);
            a[c] = Tb(c);
            a[d] = Tb(d);
            a[e] = Tb(e);
            return a;
        }
        function Tb(a) {
            return {
                direction: a,
                distance: 0
            };
        }
        function Ub() {
            return W - V;
        }
        function Vb(a, b) {
            var c = Math.abs(a.x - b.x);
            var d = Math.abs(a.y - b.y);
            return Math.round(Math.sqrt(c * c + d * d));
        }
        function Wb(a, b) {
            var c = b / a * 1;
            return c.toFixed(2);
        }
        function Xb() {
            if (N < 1) {
                return g;
            } else {
                return f;
            }
        }
        function Yb(a, b) {
            return Math.round(Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)));
        }
        function Zb(a, b) {
            var c = a.x - b.x;
            var d = b.y - a.y;
            var e = Math.atan2(d, c);
            var f = Math.round(e * 180 / Math.PI);
            if (f < 0) {
                f = 360 - Math.abs(f);
            }
            return f;
        }
        function $b(a, f) {
            var g = Zb(a, f);
            if (g <= 45 && g >= 0) {
                return b;
            } else if (g <= 360 && g >= 315) {
                return b;
            } else if (g >= 135 && g <= 225) {
                return c;
            } else if (g > 45 && g < 135) {
                return e;
            } else {
                return d;
            }
        }
        function _b() {
            var a = new Date();
            return a.getTime();
        }
        function ac(b) {
            b = a(b);
            var c = b.offset();
            var d = {
                left: c.left,
                right: c.left + b.outerWidth(),
                top: c.top,
                bottom: c.top + b.outerHeight()
            };
            return d;
        }
        function bc(a, b) {
            return a.x > b.left && a.x < b.right && a.y > b.top && a.y < b.bottom;
        }
    }
});

(function(a) {
    a.fn.uniformed = function(b) {
        var c = this, d = a(c), e = "height", f = "data-uniformed", g = "uniformed", h = 1, i = false;
        if (a.isPlainObject(b)) {
            e = b.mode || "height";
            i = b.selector || false;
        } else {
            e = b || "height";
        }
        h = e === "height" ? 1 : e === "width" ? 0 : e;
        return this.each(function() {
            var b = a(this), c = i ? a(i, this) : b.children(), d = typeof h === "number" ? c.map(function() {
                return a(this)[e]();
            }).get() : null, j = b.attr(f);
            if (h === "reset") {
                c.css(j, "").removeClass(g);
                b.removeAttr(f);
            } else if (typeof h === "number") {
                c[e](Math.max.apply(null, d)).addClass(g);
                b.attr(f, e);
            } else {
                return;
            }
        });
    };
})(jQuery);

window.console = window.console || function() {
    var a = {};
    a.log = a.warn = a.debug = a.info = a.error = a.time = a.dir = a.profile = a.clear = a.exception = a.trace = a.assert = function() {};
    return a;
}();

(function(a) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], a);
    } else {
        a(jQuery);
    }
})(function(a) {
    var b = a.scrollTo = function(b, c, d) {
        return a(window).scrollTo(b, c, d);
    };
    b.defaults = {
        axis: "xy",
        duration: parseFloat(a.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    b.window = function(b) {
        return a(window)._scrollable();
    };
    a.fn._scrollable = function() {
        return this.map(function() {
            var b = this, c = !b.nodeName || a.inArray(b.nodeName.toLowerCase(), [ "iframe", "#document", "html", "body" ]) != -1;
            if (!c) return b;
            var d = (b.contentWindow || b).document || b.ownerDocument || b;
            return /webkit/i.test(navigator.userAgent) || d.compatMode == "BackCompat" ? d.body : d.documentElement;
        });
    };
    a.fn.scrollTo = function(d, e, f) {
        if (typeof e == "object") {
            f = e;
            e = 0;
        }
        if (typeof f == "function") f = {
            onAfter: f
        };
        if (d == "max") d = 9e9;
        f = a.extend({}, b.defaults, f);
        e = e || f.duration;
        f.queue = f.queue && f.axis.length > 1;
        if (f.queue) e /= 2;
        f.offset = c(f.offset);
        f.over = c(f.over);
        return this._scrollable().each(function() {
            if (d == null) return;
            var g = this, h = a(g), i = d, j, k = {}, l = h.is("html,body");
            switch (typeof i) {
              case "number":
              case "string":
                if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(i)) {
                    i = c(i);
                    break;
                }
                i = a(i, this);
                if (!i.length) return;

              case "object":
                if (i.is || i.style) j = (i = a(i)).offset();
            }
            var m = a.isFunction(f.offset) && f.offset(g, i) || f.offset;
            a.each(f.axis.split(""), function(a, c) {
                var d = c == "x" ? "Left" : "Top", e = d.toLowerCase(), o = "scroll" + d, p = g[o], q = b.max(g, c);
                if (j) {
                    k[o] = j[e] + (l ? 0 : p - h.offset()[e]);
                    if (f.margin) {
                        k[o] -= parseInt(i.css("margin" + d)) || 0;
                        k[o] -= parseInt(i.css("border" + d + "Width")) || 0;
                    }
                    k[o] += m[e] || 0;
                    if (f.over[e]) k[o] += i[c == "x" ? "width" : "height"]() * f.over[e];
                } else {
                    var r = i[e];
                    k[o] = r.slice && r.slice(-1) == "%" ? parseFloat(r) / 100 * q : r;
                }
                if (f.limit && /^\d+$/.test(k[o])) k[o] = k[o] <= 0 ? 0 : Math.min(k[o], q);
                if (!a && f.queue) {
                    if (p != k[o]) n(f.onAfterFirst);
                    delete k[o];
                }
            });
            n(f.onAfter);
            function n(a) {
                h.animate(k, e, f.easing, a && function() {
                    a.call(this, i, f);
                });
            }
        }).end();
    };
    b.max = function(b, c) {
        var d = c == "x" ? "Width" : "Height", e = "scroll" + d;
        if (!a(b).is("html,body")) return b[e] - a(b)[d.toLowerCase()]();
        var f = "client" + d, g = b.ownerDocument.documentElement, h = b.ownerDocument.body;
        return Math.max(g[e], h[e]) - Math.min(g[f], h[f]);
    };
    function c(b) {
        return a.isFunction(b) || typeof b == "object" ? b : {
            top: b,
            left: b
        };
    }
    return b;
});

(function(a) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], a);
    } else {
        a(jQuery);
    }
})(function(a) {
    var b = location.href.replace(/#.*/, "");
    var c = a.localScroll = function(b) {
        a("body").localScroll(b);
    };
    c.defaults = {
        duration: 1e3,
        axis: "y",
        event: "click",
        stop: true,
        target: window
    };
    a.fn.localScroll = function(e) {
        e = a.extend({}, c.defaults, e);
        if (e.hash && location.hash) {
            if (e.target) window.scrollTo(0, 0);
            d(0, location, e);
        }
        return e.lazy ? this.on(e.event, "a,area", function(a) {
            if (f.call(this)) {
                d(a, this, e);
            }
        }) : this.find("a,area").filter(f).bind(e.event, function(a) {
            d(a, this, e);
        }).end().end();
        function f() {
            return !!this.href && !!this.hash && this.href.replace(this.hash, "") == b && (!e.filter || a(this).is(e.filter));
        }
    };
    c.hash = function() {};
    function d(b, c, d) {
        var e = c.hash.slice(1), f = document.getElementById(e) || document.getElementsByName(e)[0];
        if (!f) return;
        if (b) b.preventDefault();
        var g = a(d.target);
        if (d.lock && g.is(":animated") || d.onBefore && d.onBefore(b, f, g) === false) return;
        if (d.stop) g._scrollable().stop(true);
        if (d.hash) {
            var h = f.id === e ? "id" : "name", i = a("<a> </a>").attr(h, e).css({
                position: "absolute",
                top: a(window).scrollTop(),
                left: a(window).scrollLeft()
            });
            f[h] = "";
            a("body").prepend(i);
            location.hash = c.hash;
            i.remove();
            f[h] = e;
        }
        g.scrollTo(f, d).trigger("notify.serialScroll", [ f ]);
    }
    return c;
});

function countCol(a) {
    var b = 0;
    a.each(function() {
        if ($(this).prev().length > 0) {
            if ($(this).position().top != $(this).prev().position().top) return false;
            b++;
        } else {
            b++;
        }
    });
    return b;
}

var UserScrollDisabler = function() {
    this.scrollEventKeys = [ 32, 33, 34, 35, 36, 37, 38, 39, 40 ];
    this.$window = $(window);
    this.$document = $(document);
};

UserScrollDisabler.prototype = {
    disable: function() {
        var a = this;
        a.$window.on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler", this._handleWheel);
        a.$document.on("mousewheel.UserScrollDisabler touchmove.UserScrollDisabler", this._handleWheel);
        a.$document.on("keydown.UserScrollDisabler", function(b) {
            a._handleKeydown.call(a, b);
        });
    },
    enable: function() {
        var a = this;
        a.$window.off(".UserScrollDisabler");
        a.$document.off(".UserScrollDisabler");
    },
    _handleKeydown: function(a) {
        for (var b = 0; b < this.scrollEventKeys.length; b++) {
            if (a.keyCode === this.scrollEventKeys[b]) {
                a.preventDefault();
                return;
            }
        }
    },
    _handleWheel: function(a) {
        a.preventDefault();
    }
};

(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego|ipad|playbook|silk).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
})(navigator.userAgent || navigator.vendor || window.opera);

navigator.v = function() {
    var a = navigator.userAgent, b, c = a.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
    if (/trident/i.test(c[1])) {
        b = /\brv[ :]+(\d+(\.\d+)?)/g.exec(a) || [];
        c[0] = "IE";
        c[1] = b[1] || "";
        return c;
    }
    c = c[2] ? [ c[1], c[2] ] : [ navigator.appName, navigator.appVersion, "-?" ];
    if ((b = a.match(/version\/([\.\d]+)/i)) != null) c[2] = b[1];
    return c;
}();

function debounce(a, b) {
    var c;
    return function() {
        clearTimeout(c);
        c = setTimeout(function() {
            a();
        }, b);
    };
}

function getDimensions(a) {
    a.width(a.width()).height(a.height());
}

$(document).ready(function() {
    var a = "#!/";
    var b = 0, c = 0, d, e, f;
    var g = $("#AboutSlider").scrollingCarousel({
        autoScroll: true,
        autoScrollDirection: "left",
        scrollSpeed: "fast"
    });
    var h = {
        save: function(a, b, c) {
            if (!Modernizr.localstorage) {
                return false;
            }
            var d = c * 60 * 1e3;
            var e = {
                value: JSON.stringify(b),
                timestamp: new Date().getTime() + d
            };
            localStorage.setItem(a, JSON.stringify(e));
            return b;
        },
        load: function(a) {
            if (!Modernizr.localstorage) {
                return false;
            }
            var b = JSON.parse(localStorage.getItem(a));
            if (!b) {
                return false;
            }
            return new Date().getTime() < b.timestamp && JSON.parse(b.value);
        }
    };
    var i = function() {
        var a = $(".flyout"), b = a.find(".nav-content"), c = $("body"), d = ".peel", e = "nav-collapsed";
        a.on("click", d, function() {
            i.toggle();
        });
        $(document).click(function(b) {
            if (!c.hasClass(e) && !a.is(b.target) && a.has(b.target).length === 0) {
                i.close();
            }
        });
        return {
            cb: function(a) {
                a = a || 0;
                b.one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(b) {
                    if (b.originalEvent.propertyName === "right") {
                        if (!a) {
                            if (c.hasClass(e)) {
                                a = "closed";
                            } else {
                                a = "opened";
                            }
                        }
                    }
                });
            },
            togglePeel: function() {
                if (c.hasClass(e)) {
                    $("#peel-open-label").addClass("peel-closed");
                    $("#peel-close-label").addClass("peel-open");
                } else {
                    $("#peel-open-label").removeClass("peel-closed");
                    $("#peel-close-label").removeClass("peel-open");
                }
            },
            toggle: function() {
                i.togglePeel();
                if (!Modernizr.csstransitions) {
                    if (c.hasClass(e)) {
                        i.open();
                    } else {
                        i.close();
                    }
                } else {
                    i.cb();
                    c.toggleClass(e);
                }
            },
            open: function() {
                if (!Modernizr.csstransitions) {
                    b.animate({
                        width: "595px"
                    });
                }
                i.cb("opened");
                c.removeClass(e);
            },
            close: function() {
                if (c.hasClass(e)) {
                    return false;
                }
                i.togglePeel();
                if (!Modernizr.csstransitions) {
                    b.animate({
                        width: 0
                    });
                }
                i.cb("closed");
                c.addClass(e);
            }
        };
    }();
    function j() {
        $(".bg-full").each(function() {
            var a = $(this), b = $(window).width(), c = $(window).height(), d = parseInt(a.find("source").eq(0).attr("data-width")) || parseInt(a.attr("data-width")), e = parseInt(a.find("source").eq(0).attr("data-height")) || parseInt(a.attr("data-height")), f = b / d, g = c / e, h = g * d, i = f * e;
            if (i > c) {
                a.width(b).height(i);
            } else {
                a.width(h).height(c);
            }
            var j = Math.round((b - a.width()) / 2);
            var k = Math.round((c - a.height()) / 2);
            a.css({
                left: j,
                top: k
            });
        });
    }
    function k(a, b) {
        var c = function(c) {
            if (c) {
                $("<img/>").attr("src", c).load(function() {
                    $(this).remove();
                    b && b();
                });
                a.css("background-image", "url(" + c + ")");
            } else {
                b && b();
            }
        };
        if (window.innerHeight > window.innerWidth && (a.attr("data-bg-tabp") || a.attr("data-bg-mobp"))) {
            if (window.innerWidth <= 767 && a.attr("data-bg-mobp")) {
                c(a.attr("data-bg-mobp"));
            } else {
                c(a.attr("data-bg-tabp"));
            }
        } else {
            c(a.attr("data-deferred-img"));
        }
        window.scrollTo(0, 0);
    }
    var l = function() {
        var b = $(".slides-container"), c = $(".slide-item"), d = $("body"), e = {
            slide: "sliding"
        };
        function f() {
            var a = {
                prev: b.data("iosslider").settings.navPrevSelector.selector,
                next: b.data("iosslider").settings.navNextSelector.selector
            };
            if (b.data("args").currentSlideNumber === 1) {
                $(a.prev).addClass("hidden");
                $(a.next).addClass("active");
            } else {
                $(a.prev).removeClass("hidden");
                $(a.next).removeClass("active");
            }
            if (b.data("args").currentSlideNumber === b.data("iosslider").numberOfSlides) {
                $(a.next).addClass("hidden");
            } else {
                $(a.next).removeClass("hidden");
            }
        }
        function j() {
            var a = b.data("args").currentSlideNumber, e = a - 1, f = a + 1, g = a - 1, h = e - 1, i = f - 1;
            d.attr("data-slide", a);
            c.addClass("invisible");
            c.eq(g).removeClass("invisible");
            c.eq(h).removeClass("invisible");
            c.eq(i).removeClass("invisible");
        }
        var m, n;
        function o(a, b) {
            var d = c.eq(a - 1);
            var e = $(".deferred", d);
            if (e.length) {
                var f = 0;
                e.each(function() {
                    $(this).removeClass("deferred");
                    $(this).attr("src", this.getAttribute("data-deferred-img")).load(function() {
                        if (++f == e.length) {
                            b();
                        }
                    });
                });
            } else if (d.hasClass("adpage") || d.hasClass("video")) {
                var g = d.find(">.billboard");
                if (!g.hasClass("loaded")) {
                    k(g, function() {
                        b();
                    });
                    g.addClass("loaded");
                    window.addEventListener("resize", function() {
                        k(g);
                    }, false);
                } else {
                    b();
                }
            } else {
                b();
            }
        }
        function p() {
            if (m != null && m < c.length) {
                o(++m, p);
            }
        }
        function q() {
            if (n != null && n >= 0) {
                o(--n, q);
            }
        }
        function r() {
            var a = b.data("args").currentSlideNumber;
            m = n = null;
            u = v = null;
            o(a, function() {
                m = a + 1;
                n = a - 1;
                o(m, p);
                o(n, q);
            });
        }
        function s() {
            var a = b.data("args").currentSlideNumber, d = c.eq(a - 1);
            c.not(d).find(".section-wrap").scrollTop(0);
        }
        function t() {
            var a = b.data("args").currentSlideObject;
            if ($(".slide-item.about-clancy-schaer").length) {
                if (a.hasClass("about-clancy-schaer")) {
                    g.Play();
                } else {
                    g.Pause();
                }
            }
        }
        return {
            gotoSlide: function(c) {
                var d = window.location.hash.replace(a, ""), e;
                if (c !== undefined) {
                    e = $(c).index() + 1;
                } else if (d !== "") {
                    e = $("#" + d).index() + 1;
                } else {
                    return;
                }
                if (e) {
                    b.iosSlider("goToSlide", parseInt(e));
                } else {
                    return;
                }
            },
            setHash: function() {
                var c = b.data("args").currentSlideNumber, d = $(".slide-item").eq(c - 1)[0].id, e = $("#" + d).index() + 1;
                h.save("currentSlide", c, .1);
                window.location.hash = a + d;
            },
            slideInit: function() {
                f();
                j();
                t();
                r();
                l.gotoSlide();
            },
            slideChange: function() {
                f();
                j();
            },
            slideStart: function() {
                i.close();
                $("body").addClass("sliding");
                $(".projects .item, .work .item").removeClass("active");
            },
            slideComplete: function() {
                setTimeout(t(), 150);
                $("body").removeClass("sliding grabbing");
                setTimeout(function() {
                    $("body").removeClass("sliding");
                }, 100);
                r();
                s();
                l.setHash();
            }
        };
    }();
    $(".js-controlled").on("click", "a", function(a) {
        var b = $(this), c = this.getAttribute("href");
        a.preventDefault();
        l.gotoSlide(c);
    });
    $(window).bind("hashchange", function(b) {
        var c = window.location.hash.replace(a, "#");
        l.gotoSlide(c);
    });
    $(".compute-size").each(function() {
        var a = $(this);
        a.width(a.width()).height(a.height());
    });
    if (!Modernizr.touch) {}
    if (Modernizr.touch) {
        $(".slides-container").iosSlider({
            desktopClickDrag: false,
            keyboardControls: false,
            snapToChildren: true,
            startAtSlide: h.load("currentSlide") || 1,
            unselectableSelector: $(".ns"),
            snapVelocityThreshold: 15,
            slideStartVelocityThreshold: 100,
            horizontalSlideLockThreshold: 1,
            verticalSlideLockThreshold: 1,
            hardwareAccelBuffer: 1,
            onSliderLoaded: l.slideInit,
            onSlideChange: l.slideChange,
            onSlideStart: l.slideStart,
            onSlideComplete: l.slideComplete
        });
        $(".slides-container").iosSlider("lock");
        $(".slide-item").swipe({
            swipe: function(a, b, c, d, e, f) {
                if (b == "left") {
                    $(".slides-container").iosSlider("nextSlide");
                } else if (b == "right") {
                    $(".slides-container").iosSlider("prevSlide");
                }
            },
            excludedElements: "",
            allowPageScroll: "vertical"
        });
    } else {
        $(".slides-container").iosSlider({
            desktopClickDrag: true,
            keyboardControls: true,
            snapToChildren: true,
            startAtSlide: h.load("currentSlide") || 1,
            navPrevSelector: $("#SlideLeft"),
            navNextSelector: $("#SlideRight"),
            unselectableSelector: $(".ns"),
            slideStartVelocityThreshold: 5,
            onSliderLoaded: l.slideInit,
            onSlideChange: l.slideChange,
            onSlideStart: l.slideStart,
            onSlideComplete: l.slideComplete
        });
    }
    $("#SiteModal").modal({
        backdrop: false,
        show: false
    }).on("show.bs.modal", function(a) {
        i.close();
    }).on("hidden.bs.modal", function(a) {
        $(this).removeClass("mtype-news mtype-project");
        $(this).find(".modal-header").removeClass("affixed");
        b = 0;
    });
    $(".slide-item,.remote-loading").on("click.modal", ".manual-modal", function(a) {
        a.preventDefault();
        var b = $(this), c = b.attr("data-remote"), d = b.attr("data-pid"), e = b.attr("data-modal-type"), f = b.attr("data-target");
        function g() {
            $(f).addClass(e).data("pid", d).data("remote_data", c).modal("show");
        }
        function h() {
            g();
        }
        if (Modernizr.touch) {
            if (b.closest(".slide-item").hasClass("projects") || b.closest(".slide-item").hasClass("work")) {
                var i = b.closest(".item");
                $(".projects-list > .item").removeClass("active");
                i.addClass("active");
                b.find(".overlay").on("click", function() {
                    if ($(this).is(":visible")) {
                        $(".projects-list > .item").removeClass("active");
                        h();
                    }
                });
            } else {
                h();
            }
        }
        if (!Modernizr.touch) {
            if ($("body").hasClass("modal-open")) {
                $(".remote-loading").modal("hide").one("hidden.bs.modal", function() {
                    h();
                });
            } else {
                h();
            }
        }
    });
    if (!Modernizr.touch) {
        $(".projects .item, .work .item").on("mouseover", function(a) {
            var b = $(this);
            b.addClass("active");
            b.one("mouseleave", function(a) {
                b.removeClass("active");
            });
        });
    }
    function m(a) {
        if ($(".deferred", a).length) {
            $(".deferred", a).each(function() {
                this.src = this.getAttribute("data-deferred-img");
                $(this).removeClass("deferred");
            });
        }
    }
    function n(a, b) {
        $(".inject", b).html(a).closest(".remote-loading").removeClass("loading");
        m(b);
    }
    function o(a) {
        var b = $(".inject > .item.active", a).attr("data-cat-position"), c = "/" + $(".inject > .item.active", a).attr("data-cat-count");
        $(".count-current", a).html(b);
        $(".count-total", a).html(c);
    }
    function p() {
        var a = $(".inject > .active"), c = $(".modal-controllers > .left"), d = $(".modal-controllers > .right"), e = a.closest(".modal-dialog"), f = e.find(".modal-header");
        if (a.hasClass("has-older")) {
            if (!a.next().length) {
                a.after('<article class="item"></article>');
            }
            d.removeClass("hidden");
        } else {
            d.addClass("hidden");
        }
        if (a.hasClass("has-newer")) {
            if (!a.prev().length) {
                a.before('<article class="item"></article>');
            }
            c.removeClass("hidden");
        } else {
            c.addClass("hidden");
        }
        f.removeClass("affixed");
        a.scroll(function(a) {
            var b = $(".item-wrapper", this), c = b.position();
            if (c.top < -10) {
                f.addClass("affixed");
            } else {
                f.removeClass("affixed");
            }
        });
        b = 0;
        o(e);
        q();
    }
    function q() {
        if (c) {
            return false;
        }
        $(".inject > .item.active .ig-element-carousel .item").removeClass("active").eq(0).addClass("active");
        c = 1;
    }
    function r(a, b, d) {
        c = 0;
        if (d === "newer") {
            $(".inject > .item.active", b).prev().replaceWith(a);
        } else {
            $(".inject > .item.active", b).next().replaceWith(a);
        }
        b.closest(".remote-loading").removeClass("loading");
        m(b);
    }
    function s(a) {
        var b = document.getElementById(a), c = $("#SiteModal");
        $("#LoadingIcon").hide();
        var d = setTimeout(function() {
            if (c.hasClass("loading")) {
                $("#LoadingIcon").show();
                b.beginElement();
            } else {
                $("#LoadingIcon").hide();
            }
        }, 500);
    }
    function t(a, b) {
        return $.ajax({
            url: tplUrl + "/q.php",
            dataType: "text",
            cache: true,
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: {
                pid: a
            },
            success: function(a) {
                b();
            },
            error: function() {
                b();
            }
        });
    }
    var u, v;
    var w;
    function x() {
        if (u != null && u < w.length) {
            t(w[u++], x);
        }
    }
    function y() {
        if (v != null && v >= 0) {
            t(w[v--], y);
        }
    }
    function z() {
        clearTimeout(f);
        var a = $(".inject > .active");
        w = JSON.parse(a.attr("pids"));
        var b = a.attr("data-cat-position") - 1;
        u = b + 1;
        v = b - 1;
        f = setTimeout(function() {
            x();
            y();
        }, 1e3);
    }
    function A(a) {
        var c = a || 500;
        setTimeout(function() {
            b = 0;
        }, c);
    }
    function B(a) {
        if ($(".modal-controllers > ." + a).hasClass("hidden")) {
            return;
        }
        var e;
        var f;
        if (a == "right") {
            e = "older";
            f = "next";
        } else {
            e = "newer";
            f = "prev";
        }
        if (b) {
            return false;
        }
        b = 1;
        c = 0;
        $modalEl = $("#SiteModalCarousel");
        $modalEl.closest(".remote-loading").addClass("loading");
        s("loadHand");
        incrementIndex = decrementIndex = null;
        u = v = null;
        d = $.ajax({
            url: tplUrl + "/q.php",
            dataType: "text",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            cache: true,
            data: {
                pid: $(".inject > .active").attr("data-" + e + "-pid")
            },
            success: function(a) {
                r(a, $modalEl, e);
                $modalEl.carousel(f);
                z();
            },
            error: function(a) {
                $(".inject", $modalEl).html("").closest(".remote-loading").removeClass("loading").addClass("failed");
                b = 0;
            }
        });
    }
    $(".modal-controllers > .left").on("click", function() {
        B("left");
    }).bind("touchstart touchend", function(a) {
        $(this).toggleClass("active");
    });
    $(".modal-controllers > .right").on("click", function() {
        B("right");
    }).bind("touchstart touchend", function(a) {
        $(this).toggleClass("active");
    });
    if (Modernizr.touch) {
        $(".modal-controllers").hide();
        $("#SiteModal").swipe({
            swipe: function(a, b, c, d, e, f) {
                if (b == "left") {
                    B("right");
                } else if (b == "right") {
                    B("left");
                }
            },
            allowPageScroll: "vertical"
        });
    }
    $(".remote-loading").each(function() {
        var a = $(this);
        a.on("show.bs.modal", function(b) {
            var e = "";
            if (a.hasClass("mtype-news")) {
                $(".counter-label", a).html("News:");
                e = "news";
            } else {
                $(".counter-label", a).html("Work:");
                e = "projects";
            }
            $(".mtype-news", a).find(".counter-label").html("News:");
            $(".mtype-project", a).find(".counter-label").html("Work:");
            $(".inject", a).html("").closest(".remote-loading").addClass("loading");
            s("loadHand");
            incrementIndex = decrementIndex = null;
            u = v = null;
            d = $.ajax({
                url: tplUrl + "/q.php",
                dataType: "text",
                cache: true,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    pid: a.data("pid")
                },
                success: function(b) {
                    n(b, a);
                    $(".pid-" + a.data("pid"), a).addClass("active");
                    c = 0;
                    p();
                    z();
                },
                error: function(b) {
                    $(".inject", a).html("").closest(".remote-loading").removeClass("loading").addClass("failed");
                }
            });
        }).on("shown.bs.modal", function(a) {
            $("#SiteModalCarousel").height($("#SiteModal .modal-dialog").height() - $("#SiteModal .modal-header").outerHeight());
            $(".carousel .carousel").carousel("pause");
        }).on("hide.bs.modal", function(a) {
            d.abort();
            clearTimeout(f);
        }).on("hidden.bs.modal", function(c) {
            $(".inject", a).html("").closest(".remote-loading").removeClass("failed loading");
            $(".count-current", a).html("");
            $(".count-total", a).html("");
            b = 0;
        });
    });
    $("#SiteModalCarousel").carousel({
        interval: false
    }).on("slide.bs.carousel", function() {
        b = 1;
        $(".carousel .item.active .carousel").carousel("pause").on("slide.bs.carousel slid.bs.carousel", function() {
            b = 1;
        });
    }).on("slid.bs.carousel", function() {
        p();
        $(".carousel .item.active .carousel").carousel("cycle").on("slide.bs.carousel slid.bs.carousel", function() {
            b = 0;
        });
        b = 0;
    });
    $("#SiteModal").on("click", ".project-control.left", function(a) {
        a.preventDefault();
        c = 1;
        var b = $(this), d = b.closest(".carousel");
        d.carousel("prev");
    });
    $("#SiteModal").on("click", ".project-control.right", function(a) {
        a.preventDefault();
        c = 1;
        var b = $(this), d = b.closest(".carousel");
        d.carousel("next");
    });
    if (!Modernizr.touch) {
        $(".clients-list .item a").hover(function() {
            $(this).parent().addClass("with-link");
        }, function() {
            $(this).parent().removeClass("with-link");
        });
    }
    $(".modal,.single-page").on("click", ".drawer-icon", function() {
        var a = $(this), b = ".share-drawer";
        a.closest(b).toggleClass("open");
        $(document).click(function(c) {
            if (!a.is(c.target) && a.has(c.target).length === 0) {
                a.closest(b).removeClass("open");
            }
        });
    });
    function C(a, b, c, d) {
        c = c || 600;
        d = d || 400;
        var e = window.screenLeft !== undefined ? window.screenLeft : screen.left;
        var f = window.screenTop !== undefined ? window.screenTop : screen.top;
        width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var g = width / 2 - c / 2 + e;
        var h = height / 2 - d / 2 + f;
        var i = window.open(a, b, "scrollbars=yes, width=" + c + ", height=" + d + ", top=" + h + ", left=" + g);
        if (window.focus) {
            i.focus();
        }
    }
    $(".modal,.single-page").on("click", '[data-jsp="popup"]', function(a) {
        var b = $(this), c = b.attr("data-popup-width") || 600;
        a.preventDefault();
        C(b.attr("href"), "jsPop");
    });
    $(".hs-connect").on("mouseover click", function(a) {
        var b = $(this).closest(".connect");
        a.preventDefault();
        b.addClass("active");
        b.one("mouseleave", function(a) {
            $(this).removeClass("active");
        });
    });
    $("body").on("click", "a", function(a) {
        var b = $(this), c = b.attr("href") || "", d = b.attr("target") || "";
        if (c.length > 10 && !a.isDefaultPrevented()) {
            if (d === "_blank") {
                window.open(c);
            } else {
                window.location.href = c;
            }
        }
    });
    j();
    $(window).resize(function() {
        j();
    });
    window.onbeforeunload = function() {
        l.setHash();
    };
});