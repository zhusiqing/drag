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
declare class Drag {
    el: HTMLElement;
    options: Required<OptionsType>;
    private defaultOptions;
    private mousePos;
    private elPos;
    private startTime;
    private isMoving;
    private isClick;
    private cacheListeners;
    constructor(el: HTMLElement, options: OptionsType);
    private init;
    private setStyle;
    private addListeners;
    private handleMousedown;
    private handleMousemove;
    private handelMouseup;
    private handleClick;
    private clearListeners;
    reset(): void;
    register(): void;
    destroy(): void;
}

export { Drag, ListenersType, OptionsType };
