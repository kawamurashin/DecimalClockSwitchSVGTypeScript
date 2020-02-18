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

    public static type = Main.TYPE_DECIMAL;

    private _digitalClock:DigitalClock;
    private _analogClock:AnalogClock;
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

        let svg:HTMLElement = document.getElementById("svg");

        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("fill", "#CCC");
        rect.setAttribute("width", "220");
        rect.setAttribute("height", "220");
        rect.setAttribute("fill-opacity", "0.3");
        rect.setAttribute("cursor", "pointer");
        rect.addEventListener("mouseover", mouseover);
        rect.addEventListener("mouseout", mouseout);
        rect.addEventListener("click", click);
        svg.appendChild(rect);

        DecimalTime.getInstance();
        DecimalTime.enterFrame();

        this._digitalClock = new DigitalClock(svg);
        this._analogClock = new AnalogClock(svg);

        let fps = 60 / 1000;
        setInterval(interval, fps);
    }
    private enterFrame() {
        DecimalTime.enterFrame();

        this._digitalClock.enterFrame();
        this._analogClock.enterFrame();
    }
    //
    private mouseOverHandler():void
    {

    }
    private mouseOutHandler():void
    {

    }
    private clickHandler():void
    {

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