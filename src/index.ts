import { isMobile as getIsMobile } from './utils';

export interface OptionsType {
  top?: string;
  left?: string;
  zIndex?: number;
  onClick?: Function;
}
export interface ListenersType {
  mousedown: any;
  mousemove: any;
  mouseup: any;
  click: any;
}

enum envEnum {
  mobile = 'mobile',
  pc = 'pc'
}
export class Drag<T extends HTMLElement> {
  readonly el: T;
  readonly options: Required<OptionsType>;
  readonly env: envEnum = envEnum.pc;
  private cacheOptions: Required<OptionsType>;
  private opt: Required<OptionsType>
  private mousePos: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0
  };
  private elPos: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0
  };
  private startTime: number = Date.now();
  private isMoving: boolean = false;
  private isClick: boolean = false;
  private isMobile: boolean = false;
  private cacheListeners: ListenersType = {
    mousedown: () => {},
    mousemove: () => {},
    mouseup: () => {},
    click: () => {}
  };

  constructor(el: T, options: OptionsType = {}) {
    if (!el) {
      throw new Error("el is null");
    }
    this.el = el;
    this.options = {
      top: el.offsetTop + 'px',
      left: el.offsetLeft + 'px',
      zIndex: 99,
      onClick: () => {},
      ...options
    };
    if (getIsMobile()) {
      this.env = envEnum.mobile;
      this.isMobile = true;
    } else {
      this.env = envEnum.pc;
      this.isMobile = false;
    }
    this.opt = { ...this.options };
    this.cacheOptions = { ...this.options };
    this.init();
  }
  private init() {
    this.setStyle();
    this.addListeners();
  }
  private setStyle() {
    if (+this.opt.top < 0) {
      this.opt.top = '0px';
    }
    if (+this.opt.left < 0) {
      this.opt.left = '0px';
    }
    const oldStyle = this.el.getAttribute('style');
    const constantStyle = 'position:fixed;cursor:pointer;user-select:none;';
    const computedStyle = `top:${this.opt.top};left:${this.opt.left};z-index:${this.opt.zIndex};`;
    this.el.setAttribute('style', `${oldStyle}${constantStyle}${computedStyle}`);
  }
  private addListeners() {
    this.cacheListeners = {
      mousedown: this.isMobile ? this.handleTouchstart.bind(this) : this.handleMousedown.bind(this),
      mousemove: this.isMobile ? this.handleTouchmove.bind(this) : this.handleMousemove.bind(this),
      mouseup: this.isMobile ? this.handleTouchend.bind(this) : this.handelMouseup.bind(this),
      click: this.isMobile ? () => {} : this.handleClick.bind(this)
    }
    if (this.isMobile) {
      this.el.addEventListener('touchstart', this.cacheListeners.mousedown);
      document.addEventListener('touchmove', this.cacheListeners.mousemove);
      this.el.addEventListener('touchend', this.cacheListeners.mouseup);
    } else {
      this.el.addEventListener('mousedown', this.cacheListeners.mousedown);
      document.addEventListener('mousemove', this.cacheListeners.mousemove);
      this.el.addEventListener('mouseup', this.cacheListeners.mouseup);
      this.el.addEventListener('click', this.cacheListeners.click);
    }
  }
  private handleMousedown (e: MouseEvent) {
    e.preventDefault();
    // 左键为1，右键为2
    if (e.buttons !== 1 ) return;
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
    this.elPos.x = this.el.offsetLeft;
    this.elPos.y = this.el.offsetTop;
    this.isMoving = true;
    this.startTime = Date.now();
  }
  private handleMousemove(e: MouseEvent) {
    if (!this.isMoving) return;
    const moveX = e.clientX - (this.mousePos.x - this.elPos.x);
    const moveY = e.clientY - (this.mousePos.y - this.elPos.y);
    if (moveX < 0) {
      this.opt.left = '0px';
    } else if (moveX > window.innerWidth - this.el.offsetWidth) {
      this.opt.left = window.innerWidth - this.el.offsetWidth + 'px';
    } else {
      this.opt.left = moveX + 'px';
    }
    if (moveY < 0) {
      this.opt.top = '0px';
    } else if (moveY > window.innerHeight - this.el.offsetHeight) {
      this.opt.top = window.innerHeight - this.el.offsetHeight + 'px';
    } else {
      this.opt.top = moveY + 'px';
    }
    this.setStyle();
  }
  private handelMouseup() {
    this.isMoving = false;
    this.isClick = Date.now() - this.startTime < 200;
  }
  private handleClick(e: MouseEvent) {
    if (!this.isClick) return;
    this.opt.onClick.call(this.el, e);
  }
  private handleTouchstart(e: TouchEvent) {
    const targetTouch = e.targetTouches[0]
    this.mousePos.x = targetTouch.clientX;
    this.mousePos.y = targetTouch.clientY;
    this.elPos.x = this.el.offsetLeft;
    this.elPos.y = this.el.offsetTop;
    this.isMoving = true;
    this.startTime = Date.now();
  }
  private handleTouchmove(e: TouchEvent) {
    if (!this.isMoving) return;
    const targetTouch = e.targetTouches[0]
    const moveX = targetTouch.clientX - (this.mousePos.x - this.elPos.x);
    const moveY = targetTouch.clientY - (this.mousePos.y - this.elPos.y);
    if (moveX < 0) {
      this.opt.left = '0px';
    } else if (moveX > window.innerWidth - this.el.offsetWidth) {
      this.opt.left = window.innerWidth - this.el.offsetWidth + 'px';
    } else {
      this.opt.left = moveX + 'px';
    }
    if (moveY < 0) {
      this.opt.top = '0px';
    } else if (moveY > window.innerHeight - this.el.offsetHeight) {
      this.opt.top = window.innerHeight - this.el.offsetHeight + 'px';
    } else {
      this.opt.top = moveY + 'px';
    }
    this.setStyle();
  }
  private handleTouchend(e: TouchEvent) {
    this.isMoving = false;
    this.isClick = Date.now() - this.startTime < 200;
    // 移动端下，当注册touch事件，click事件失效，这里判断是否click并触发
    if (this.isClick) {
      this.opt.onClick.call(this.el, e);
    }
  }
  private clearListeners() {
    if (this.isMobile) {
      this.el.removeEventListener('touchstart', this.cacheListeners.mousedown);
      document.removeEventListener('touchmove', this.cacheListeners.mousemove);
      this.el.removeEventListener('touchend', this.cacheListeners.mouseup);
    } else {
      this.el.removeEventListener('mousedown', this.cacheListeners.mousedown);
      document.removeEventListener('mousemove', this.cacheListeners.mousemove);
      this.el.removeEventListener('mouseup', this.cacheListeners.mouseup);
      this.el.removeEventListener('click', this.cacheListeners.click);
    }
    this.cacheListeners = {
      mousedown: () => {},
      mousemove: () => {},
      mouseup: () => {},
      click: () => {}
    }
  }
  reset() {
    this.opt = { ...this.cacheOptions }
    this.clearListeners();
    this.setStyle();
    this.addListeners();
  }
  register() {
    this.addListeners();
  }
  destroy() {
    this.clearListeners();
  }
};

export default Drag;
