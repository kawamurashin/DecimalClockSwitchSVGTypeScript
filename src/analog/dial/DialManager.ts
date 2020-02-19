namespace analog.dial
{
    export class DialManager {
        private readonly RADIUS_IN:number = 85;
        private readonly RADIUS_OUT:number = 120;

        private readonly _decimalDialList:Dial[];
        private readonly _duoDecimalDialList:Dial[];

        private _id:number;
        private _count:number;

        constructor(svg) {
            let value:string;
            let radius: number;
            let rotate:number;
            let dial:Dial;
            this._decimalDialList = [];
            if(Main.type == Main.TYPE_DECIMAL)
            {
                radius = this.RADIUS_IN;
            } else {
                radius = this.RADIUS_OUT;
            }
            let n: number = 10;
            for (let i: number = 1; i <= n; i++) {
                value = i.toString();
                rotate = 360 * (i / n);
                dial = new Dial(svg,value,radius,rotate);
                this._decimalDialList.push(dial);
            }

            this._duoDecimalDialList = [];
            if(Main.type == Main.TYPE_DUODECIMAL)
            {
                radius = this.RADIUS_IN;
            } else {
                radius = this.RADIUS_OUT;
            }
            n = 12;
            for (let i: number = 1; i <= n; i++) {
                value = i.toString();
                rotate = 360 * (i / n);
                dial = new Dial(svg,value,radius,rotate);
                this._duoDecimalDialList.push(dial);
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
            let dial:Dial;
            if(Main.type == Main.TYPE_DUODECIMAL)
            {
                if(this._count < this._decimalDialList.length)
                {
                    dial = this._decimalDialList[this._count];
                    dial.setRadius(this.RADIUS_OUT);
                }else
                {
                    dial = this._duoDecimalDialList[this._count - this._decimalDialList.length];
                    dial.setRadius(this.RADIUS_IN);
                }
            }
            else
            {
                if(this._count < this._duoDecimalDialList.length)
                {
                    dial = this._duoDecimalDialList[this._count];
                    dial.setRadius(this.RADIUS_OUT);
                }else
                {
                    dial = this._decimalDialList[this._count - this._duoDecimalDialList.length];
                    dial.setRadius(this.RADIUS_IN);
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