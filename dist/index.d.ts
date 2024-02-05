interface OptionsType {
    top?: string;
    left?: string;
    zIndex?: number;
    onClick?: Function;
}
interface ListenersType {
    mousedown: any;
    mousemove: any;
    mouseup: any;
    click: any;
}
declare enum envEnum {
    mobile = "mobile",
    pc = "pc"
}
declare class Drag<T extends HTMLElement> {
    readonly el: T;
    readonly options: Required<OptionsType>;
    readonly env: envEnum;
    private cacheOptions;
    private opt;
    private mousePos;
    private elPos;
    private startTime;
    private isMoving;
    private isClick;
    private isMobile;
    private cacheListeners;
    constructor(el: T, options?: OptionsType);
    private init;
    private setStyle;
    private computedStyle;
    private addListeners;
    private handleMousedown;
    private handleMousemove;
    private handelMouseup;
    private handleClick;
    private handleTouchstart;
    private handleTouchmove;
    private handleTouchend;
    private clearListeners;
    reset(): void;
    register(): void;
    destroy(): void;
}

export { Drag, ListenersType, OptionsType, Drag as default };
