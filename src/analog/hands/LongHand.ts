///<reference path="../../time/TimeKeeper.ts"/>
namespace hands {
    import TimeKeeper = time.TimeKeeper;
    export class LongHand extends Hand {
        constructor(svg: HTMLElement) {
            super(svg);
            this._radius = 90;
            this._path.setAttribute("stroke", "#333");
            this._path.setAttribute("fill", "none");
            this._path.setAttribute("stroke-width", "3");
            this._path.setAttribute("stroke-linejoin", "round");
            this.enterFrame();
        }
        protected angleCalculation() {
            super.angleCalculation();
            if (Main.type == Main.TYPE_DECIMAL) {
                this._theta = 2 * Math.PI * (TimeKeeper.decimalMinute / 100) - Math.PI * 0.5;
            } else {
                this._theta = 2 * Math.PI * (TimeKeeper.minute / 60) - Math.PI * 0.5;
            }
        }
    }
}