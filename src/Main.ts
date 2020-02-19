///<reference path="digital/DigitalClock.ts"/>
///<reference path="time/TimeKeeper.ts"/>
///<reference path="analog/AnalogClock.ts"/>
import DigitalClock = digital.DigitalClock;
import DecimalTime = time.TimeKeeper;
import AnalogClock = analog.AnalogClock;
let main: Main;
class Main {
    public static TYPE_DECIMAL:string = "decimal";
    public static TYPE_DUODECIMAL:string = "duodecimal";
    public static type = Main.TYPE_DUODECIMAL;
    private _digitalClock:DigitalClock;
    private _analogClock:AnalogClock;
    private _startIntervalID:number;
    constructor() {
        const interval = () => {
            this.enterFrame();
        };
        const click = () =>
        {
            this.clickHandler();
        };
        const mouseover = () =>
        {
            this.mouseOverHandler();
        };
        const mouseout =() =>
        {
            this.mouseOutHandler();
        };
        const timeout = () => {
            this.startTimeout();
        };
        let svg:HTMLElement = document.getElementById("svg");
        let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("clip-path", "url(#clip)");
        svg.appendChild(g);

        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("fill", "#CCC");
        rect.setAttribute("width", "220");
        rect.setAttribute("height", "220");
        rect.setAttribute("fill-opacity", "0.0");
        rect.setAttribute("cursor", "pointer");
        rect.addEventListener("mouseover", mouseover);
        rect.addEventListener("mouseout", mouseout);
        rect.addEventListener("click", click);
        g.appendChild(rect);

        DecimalTime.getInstance();
        DecimalTime.enterFrame();

        this._digitalClock = new DigitalClock(g);
        this._analogClock = new AnalogClock(g);


        //let clipPath = document.createElement("clipPath");
        let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
        clipPath.id = "clip";
        svg.appendChild(clipPath);
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, 'cx', "110");
        circle.setAttributeNS(null, 'cy', "110");
        circle.setAttributeNS(null, 'r', "110");
        clipPath.appendChild(circle);

        this._startIntervalID = setTimeout(timeout , 100);

        let fps = 60 / 1000;
        setInterval(interval, fps);
    }
    private enterFrame() {

        DecimalTime.enterFrame();

        this._digitalClock.enterFrame();
        this._analogClock.enterFrame();
    }
    //
    private startTimeout():void
    {
        this._startIntervalID = null;
        this.switch();

    }
    private mouseOverHandler():void
    {

    }
    private mouseOutHandler():void
    {

    }
    private clickHandler():void
    {
        if(this._startIntervalID != null)
        {
            clearTimeout(this._startIntervalID);
            this._startIntervalID = null;
        }
        this.switch();
    }
    private switch():void
    {
        if(Main.type == Main.TYPE_DECIMAL)
        {
            Main.type = Main.TYPE_DUODECIMAL;
        }else{
            Main.type = Main.TYPE_DECIMAL;
        }
        this._analogClock.changeType();
    }
}


window.addEventListener("load", () => {
    main = new Main();
});