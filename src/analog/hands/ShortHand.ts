///<reference path="../../time/TimeKeeper.ts"/>
namespace hands {
    import TimeKeeper = time.TimeKeeper;
    export class ShortHand extends Hand {
        constructor(svg: HTMLElement) {
            super(svg);
            this._radius = 75;
            this._path.setAttribute("stroke", "#333");
            this._path.setAttribute("fill", "none");
            this._path.setAttribute("stroke-width", "6");
            this._path.setAttribute("stroke-linejoin", "round");
            this.enterFrame();
        }
        protected angleCalculation() {
            super.angleCalculation();
            if(Main.type == Main.TYPE_DECIMAL){
                this._theta = 2 * Math.PI * ((TimeKeeper.decimalHour + (TimeKeeper.decimalMinute / 100)) / 10) - Math.PI * 0.5;
            }else{
                this._theta = 2 * Math.PI * (((TimeKeeper.hour%12) + (DecimalTime.minute / 60)) / 12) - Math.PI * 0.5;
            }

        }

    }
}
