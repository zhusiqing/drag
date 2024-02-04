/******************************************************************************
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

var envEnum;
(function (envEnum) {
    envEnum["mobile"] = "mobile";
    envEnum["pc"] = "pc";
})(envEnum || (envEnum = {}));
var Drag = /** @class */ (function () {
    function Drag(el, options) {
        if (options === void 0) { options = {}; }
        this.env = envEnum.pc;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.elPos = {
            x: 0,
            y: 0
        };
        this.startTime = Date.now();
        this.isMoving = false;
        this.isClick = false;
        this.isMobile = false;
        this.cacheListeners = {
            mousedown: function () { },
            mousemove: function () { },
            mouseup: function () { },
            click: function () { }
        };
        if (!el) {
            throw new Error("el is null");
        }
        this.el = el;
        this.options = __assign({ top: el.offsetTop + 'px', left: el.offsetLeft + 'px', zIndex: 99, onClick: function () { } }, options);
        if (isMobile()) {
            this.env = envEnum.mobile;
            this.isMobile = true;
        }
        else {
            this.env = envEnum.pc;
            this.isMobile = false;
        }
        this.opt = __assign({}, this.options);
        this.cacheOptions = __assign({}, this.options);
        this.init();
    }
    Drag.prototype.init = function () {
        this.setStyle();
        this.addListeners();
    };
    Drag.prototype.setStyle = function () {
        if (+this.opt.top < 0) {
            this.opt.top = '0px';
        }
        if (+this.opt.left < 0) {
            this.opt.left = '0px';
        }
        var oldStyle = this.el.getAttribute('style');
        var constantStyle = 'position:fixed;cursor:pointer;user-select:none;';
        var computedStyle = "top:".concat(this.opt.top, ";left:").concat(this.opt.left, ";z-index:").concat(this.opt.zIndex, ";");
        this.el.setAttribute('style', "".concat(oldStyle).concat(constantStyle).concat(computedStyle));
    };
    Drag.prototype.addListeners = function () {
        this.cacheListeners = {
            mousedown: this.isMobile ? this.handleTouchstart.bind(this) : this.handleMousedown.bind(this),
            mousemove: this.isMobile ? this.handleTouchmove.bind(this) : this.handleMousemove.bind(this),
            mouseup: this.isMobile ? this.handleTouchend.bind(this) : this.handelMouseup.bind(this),
            click: this.isMobile ? function () { } : this.handleClick.bind(this)
        };
        if (this.isMobile) {
            this.el.addEventListener('touchstart', this.cacheListeners.mousedown);
            document.addEventListener('touchmove', this.cacheListeners.mousemove);
            this.el.addEventListener('touchend', this.cacheListeners.mouseup);
        }
        else {
            this.el.addEventListener('mousedown', this.cacheListeners.mousedown);
            document.addEventListener('mousemove', this.cacheListeners.mousemove);
            this.el.addEventListener('mouseup', this.cacheListeners.mouseup);
            this.el.addEventListener('click', this.cacheListeners.click);
        }
    };
    Drag.prototype.handleMousedown = function (e) {
        e.preventDefault();
        // 左键为1，右键为2
        if (e.buttons !== 1)
            return;
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
        this.elPos.x = this.el.offsetLeft;
        this.elPos.y = this.el.offsetTop;
        this.isMoving = true;
        this.startTime = Date.now();
    };
    Drag.prototype.handleMousemove = function (e) {
        if (!this.isMoving)
            return;
        var moveX = e.clientX - (this.mousePos.x - this.elPos.x);
        var moveY = e.clientY - (this.mousePos.y - this.elPos.y);
        if (moveX < 0) {
            this.opt.left = '0px';
        }
        else if (moveX > window.innerWidth - this.el.offsetWidth) {
            this.opt.left = window.innerWidth - this.el.offsetWidth + 'px';
        }
        else {
            this.opt.left = moveX + 'px';
        }
        if (moveY < 0) {
            this.opt.top = '0px';
        }
        else if (moveY > window.innerHeight - this.el.offsetHeight) {
            this.opt.top = window.innerHeight - this.el.offsetHeight + 'px';
        }
        else {
            this.opt.top = moveY + 'px';
        }
        this.setStyle();
    };
    Drag.prototype.handelMouseup = function () {
        this.isMoving = false;
        this.isClick = Date.now() - this.startTime < 200;
    };
    Drag.prototype.handleClick = function (e) {
        if (!this.isClick)
            return;
        this.opt.onClick.call(this.el, e);
    };
    Drag.prototype.handleTouchstart = function (e) {
        var targetTouch = e.targetTouches[0];
        this.mousePos.x = targetTouch.clientX;
        this.mousePos.y = targetTouch.clientY;
        this.elPos.x = this.el.offsetLeft;
        this.elPos.y = this.el.offsetTop;
        this.isMoving = true;
        this.startTime = Date.now();
    };
    Drag.prototype.handleTouchmove = function (e) {
        if (!this.isMoving)
            return;
        var targetTouch = e.targetTouches[0];
        var moveX = targetTouch.clientX - (this.mousePos.x - this.elPos.x);
        var moveY = targetTouch.clientY - (this.mousePos.y - this.elPos.y);
        if (moveX < 0) {
            this.opt.left = '0px';
        }
        else if (moveX > window.innerWidth - this.el.offsetWidth) {
            this.opt.left = window.innerWidth - this.el.offsetWidth + 'px';
        }
        else {
            this.opt.left = moveX + 'px';
        }
        if (moveY < 0) {
            this.opt.top = '0px';
        }
        else if (moveY > window.innerHeight - this.el.offsetHeight) {
            this.opt.top = window.innerHeight - this.el.offsetHeight + 'px';
        }
        else {
            this.opt.top = moveY + 'px';
        }
        this.setStyle();
    };
    Drag.prototype.handleTouchend = function (e) {
        this.isMoving = false;
        this.isClick = Date.now() - this.startTime < 200;
        // 移动端下，当注册touch事件，click事件失效，这里判断是否click并触发
        if (this.isClick) {
            this.opt.onClick.call(this.el, e);
        }
    };
    Drag.prototype.clearListeners = function () {
        if (this.isMobile) {
            this.el.removeEventListener('touchstart', this.cacheListeners.mousedown);
            document.removeEventListener('touchmove', this.cacheListeners.mousemove);
            this.el.removeEventListener('touchend', this.cacheListeners.mouseup);
        }
        else {
            this.el.removeEventListener('mousedown', this.cacheListeners.mousedown);
            document.removeEventListener('mousemove', this.cacheListeners.mousemove);
            this.el.removeEventListener('mouseup', this.cacheListeners.mouseup);
            this.el.removeEventListener('click', this.cacheListeners.click);
        }
        this.cacheListeners = {
            mousedown: function () { },
            mousemove: function () { },
            mouseup: function () { },
            click: function () { }
        };
    };
    Drag.prototype.reset = function () {
        this.opt = __assign({}, this.cacheOptions);
        this.clearListeners();
        this.setStyle();
        this.addListeners();
    };
    Drag.prototype.register = function () {
        this.addListeners();
    };
    Drag.prototype.destroy = function () {
        this.clearListeners();
    };
    return Drag;
}());

export { Drag, Drag as default };
