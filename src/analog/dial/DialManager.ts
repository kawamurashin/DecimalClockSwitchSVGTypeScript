namespace analog.dial
{
    export class DialManager {

        private readonly _decimalDialList:Dial[];
        private readonly _duoDecimalDialList:Dial[];

        private _id:number;
        private _count:number;

        constructor(svg) {
            this._decimalDialList = [];
            let n: number = 10;
            for (let i: number = 1; i <= n; i++) {
                let value:string = i.toString();
                let radius: number = 85;
                //let theta = 2 * Math.PI * (i / n) - 0.5 * Math.PI;
                let rotate = 360 * (i / n);
                //let x: number = radius * Math.cos(theta) + AnalogClock.centerX;
                //let y: number = radius * Math.sin(theta) + AnalogClock.centerY;

                //let dial = new Dial(svg,value,x,y,rotate);
                let dial = new Dial(svg,value,radius,rotate);
                this._decimalDialList.push(dial);
                /*
                let dial = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dial.setAttribute("class", "analog_dial");
                dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rotate + ")");
                dial.textContent = value.toString();
                svg.appendChild(dial);

                */
            }

            this._duoDecimalDialList = [];
            n = 12;
            for (let i: number = 1; i <= n; i++) {
                let value:string = i.toString();
                let radius: number = 120;
                //let theta:number = 2 * Math.PI * (i / n) - 0.5 * Math.PI;
                let rotate :number= 360 * (i / n);
                //let x: number = radius * Math.cos(theta) + AnalogClock.centerX;
                //let y: number = radius * Math.sin(theta) + AnalogClock.centerY;
                //let dial = new Dial(svg,value,x,y,rotate);
                let dial = new Dial(svg,value,radius,rotate);
                this._duoDecimalDialList.push(dial);
                /*
                let dial = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dial.setAttribute("class", "analog_dial");
                dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rotate + ")");
                dial.textContent = value.toString();
                svg.appendChild(dial);
                 */
            }

        }
        public enterFrame():void
        {
            let n:number = this._decimalDialList.length;
            for (let i: number = 0; i < n; i++) {
                let dial = this._decimalDialList[i];
                dial.enterFrame();

            }

            n = this._duoDecimalDialList.length;
            for (let i: number = 0; i < n; i++) {
                let dial = this._duoDecimalDialList[i];
                dial.enterFrame();
            }
        }

        changeType() {
            /*
            let n:number = this._decimalDialList.length;
            if(Main.type == Main.TYPE_DECIMAL)
            {
                for (let i: number = 0; i < n; i++) {
                    let dial = this._decimalDialList[i];
                    dial.setRadius(85);
                }

                n = this._duoDecimalDialList.length;
                for (let i: number = 0; i < n; i++) {
                    let dial = this._duoDecimalDialList[i];
                    dial.setRadius(120);
                }
            }else{
                for (let i: number = 0; i < n; i++) {
                    let dial = this._decimalDialList[i];
                    dial.setRadius(120);
                }

                n = this._duoDecimalDialList.length;
                for (let i: number = 0; i < n; i++) {
                    let dial = this._duoDecimalDialList[i];
                    dial.setRadius(85);
                }
            }*/

            clearTimeout(this._id);
            this._count = 0;
            this.interval();

        }
        count():void
        {
            const handler = () =>
            {
                this.interval();
            };
            this._id = setTimeout(handler,60)
        }
        private interval():void
        {
            console.log("interval")
            let dial:Dial;

            if(Main.type == Main.TYPE_DUODECIMAL)
            {
                if(this._count < this._decimalDialList.length)
                {
                    dial = this._decimalDialList[this._count];
                    dial.setRadius(120);
                }else
                {
                    dial = this._duoDecimalDialList[this._count - this._decimalDialList.length];
                    dial.setRadius(85);
                }
            }
            else
            {
                if(this._count < this._duoDecimalDialList.length)
                {
                    dial = this._duoDecimalDialList[this._count];
                    dial.setRadius(120);
                }else
                {
                    dial = this._decimalDialList[this._count - this._duoDecimalDialList.length];
                    dial.setRadius(85);
                }
            }

            this._count++;
            if(this._count < this._duoDecimalDialList.length + this._decimalDialList.length)
            {
                this.count();

            }

        }
    }
}