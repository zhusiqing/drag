interface OptionsType {
    top?: string;
    left?: string;
    zIndex?: number;
    onClick?: Function;
}
declare class Drag {
    el: HTMLElement;
    options: Required<OptionsType>;
    private mousePos;
    private elPos;
    private startTime;
    private isMoving;
    private isClick;
    constructor(el: HTMLElement, options: OptionsType);
    private init;
    private setStyle;
    private addListeners;
    private handleMousedown;
    private handleMousemove;
    private handelMouseup;
    private handleClick;
    private clearListeners;
    register(): void;
    destroy(): void;
}

export { Drag, OptionsType };
