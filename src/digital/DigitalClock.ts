///<reference path="../time/TimeKeeper.ts"/>
namespace digital
{
    import DecimalTime = time.TimeKeeper;

    export class DigitalClock {
        //protected _positionX:number = 110;
        protected _positionX:number = 200;
        //protected _positionY:number = 160;
        protected _positionY:number = 260;
        private readonly _text;
        constructor(svg) {
            this._text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            this._text.setAttribute("id" , "digital_clock");
            this._text.setAttribute('x', this._positionX.toString());
            this._text.setAttribute('y',this._positionY.toString());

            svg.appendChild(this._text);
            this.enterFrame();
        }

        public enterFrame():void
        {
            let hour = (DecimalTime.decimalHour).toString();
            let minute = digital.DigitalClock.plusZero(DecimalTime.decimalMinute);
            let second = digital.DigitalClock.plusZero(DecimalTime.decimalSecond);
            this._text.textContent =  hour + ":" + minute + ":" + second;
        }

        private static plusZero(value:number):string
        {
            return (value + 100).toString().substr(1);
        }
    }
}
