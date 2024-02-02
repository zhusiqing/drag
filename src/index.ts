export interface OptionsType {
  top?: string;
  left?: string;
  zIndex?: number;
  onClick?: Function;
}

export class Drag {
  el: HTMLElement;
  options: Required<OptionsType>
  private defaultOptions: Required<OptionsType>
  private mousePos: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0
  }
  private elPos: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0
  }
  private startTime: number = Date.now();
  private isMoving: boolean = false;
  private isClick: boolean = false;

  constructor(el: HTMLElement, options: OptionsType) {
    this.el = el;
    this.options = {
      top: el.offsetTop + 'px',
      left: el.offsetLeft + 'px',
      zIndex: 99,
      onClick: () => {},
      ...options
    };
    this.defaultOptions = { ...this.options }
    this.init();
  }
  private init() {
    if (!this.el) {
      return new Error("el is null");
    }
    this.setStyle();
    this.addListeners();
  }
  private setStyle() {
    if (+this.options.top < 0) {
      this.options.top = '0px';
    }
    if (+this.options.left < 0) {
      this.options.left = '0px';
    }
    const oldStyle = this.el.getAttribute('style');
    const constantStyle = 'position:fixed;cursor:pointer;user-select:none;';
    const computedStyle = `top:${this.options.top};left:${this.options.left};z-index:${this.options.zIndex};`;
    this.el.setAttribute('style', `${oldStyle}${constantStyle}${computedStyle}`);
  }
  private addListeners() {
    this.el.addEventListener('mousedown', this.handleMousedown);
    document.addEventListener('mousemove', this.handleMousemove);
    this.el.addEventListener('mouseup', this.handelMouseup);
    this.el.addEventListener('click', this.handleClick);
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
        this.options.left = '0px';
      } else if (moveX > window.innerWidth - this.el.offsetWidth) {
        this.options.left = window.innerWidth - this.el.offsetWidth + 'px';
      } else {
        this.options.left = moveX + 'px';
      }
      if (moveY < 0) {
        this.options.top = '0px';
      } else if (moveY > window.innerHeight - this.el.offsetHeight) {
        this.options.top = window.innerHeight - this.el.offsetHeight + 'px';
      } else {
        this.options.top = moveY + 'px';
      }
      this.setStyle();
  }
  private handelMouseup() {
    this.isMoving = false;
    this.isClick = Date.now() - this.startTime < 200;
  }
  private handleClick(e: MouseEvent) {
    if (!this.isClick) return;
    this.options.onClick.call(this.el, e);
  }
  private clearListeners() {
    this.el.removeEventListener('mousedown', this.handleMousedown);
    document.removeEventListener('mousemove', this.handleMousemove);
    this.el.removeEventListener('mouseup', this.handelMouseup);
    this.el.removeEventListener('click', this.handleClick);
  }
  reset() {
    this.options = { ...this.defaultOptions }
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
}
