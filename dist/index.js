(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.drag = {}));
})(this, (function (exports) { 'use strict';

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

    var Drag = /** @class */ (function () {
        function Drag(el, options) {
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
            this.el = el;
            this.options = __assign({ top: el.offsetTop + 'px', left: el.offsetLeft + 'px', zIndex: 99, onClick: function () { } }, options);
            this.defaultOptions = __assign({}, this.options);
            this.init();
        }
        Drag.prototype.init = function () {
            if (!this.el) {
                return new Error("el is null");
            }
            this.setStyle();
            this.addListeners();
        };
        Drag.prototype.setStyle = function () {
            if (+this.options.top < 0) {
                this.options.top = '0px';
            }
            if (+this.options.left < 0) {
                this.options.left = '0px';
            }
            var oldStyle = this.el.getAttribute('style');
            var constantStyle = 'position:fixed;cursor:pointer;user-select:none;';
            var computedStyle = "top:".concat(this.options.top, ";left:").concat(this.options.left, ";z-index:").concat(this.options.zIndex, ";");
            this.el.setAttribute('style', "".concat(oldStyle).concat(constantStyle).concat(computedStyle));
        };
        Drag.prototype.addListeners = function () {
            this.el.addEventListener('mousedown', this.handleMousedown);
            document.addEventListener('mousemove', this.handleMousemove);
            this.el.addEventListener('mouseup', this.handelMouseup);
            this.el.addEventListener('click', this.handleClick);
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
                this.options.left = '0px';
            }
            else if (moveX > window.innerWidth - this.el.offsetWidth) {
                this.options.left = window.innerWidth - this.el.offsetWidth + 'px';
            }
            else {
                this.options.left = moveX + 'px';
            }
            if (moveY < 0) {
                this.options.top = '0px';
            }
            else if (moveY > window.innerHeight - this.el.offsetHeight) {
                this.options.top = window.innerHeight - this.el.offsetHeight + 'px';
            }
            else {
                this.options.top = moveY + 'px';
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
            this.options.onClick.call(this.el, e);
        };
        Drag.prototype.clearListeners = function () {
            this.el.removeEventListener('mousedown', this.handleMousedown);
            document.removeEventListener('mousemove', this.handleMousemove);
            this.el.removeEventListener('mouseup', this.handelMouseup);
            this.el.removeEventListener('click', this.handleClick);
        };
        Drag.prototype.reset = function () {
            this.options = __assign({}, this.defaultOptions);
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

    exports.Drag = Drag;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
