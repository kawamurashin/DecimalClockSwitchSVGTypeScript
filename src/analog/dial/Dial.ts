namespace analog.dial
{
    export class Dial {
        private readonly _dial;
        private readonly _theta:number = 0;
        private readonly _rotate:number = 0;

        //constructor(svg , str:string , x:number, y:number ,rotate:number) {
        private _targetX:number;
        private _targetY:number;
        private _x:number;
        private _y:number;
        private _vx:number;
        private _vy:number;
        constructor(svg , str:string  , radius:number ,rotate:number) {

            this._rotate = rotate;
            this._theta =  (Math.PI * (this._rotate /180)) - 0.5 * Math.PI;

            this._vx = this._vy = 0;
            this._targetX = this._x = radius * Math.cos(this._theta) + AnalogClock.centerX;
            this._targetY = this._y = radius * Math.sin(this._theta) + AnalogClock.centerY;

            this._dial = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            this._dial.setAttribute("class", "analog_dial");
            this._dial.setAttribute("transform", "translate(" + this._x + " " + this._y + ") rotate(" + this._rotate + ")");
            this._dial.textContent = str.toString();
            svg.appendChild(this._dial);
        }

        setRadius(radius: number) {

            if(radius > 100)
            {
                let v:number = -3;


                this._vx = v * Math.cos(this._theta);
                this._vy = v * Math.sin(this._theta);
            }


            this._targetX = radius * Math.cos(this._theta) + AnalogClock.centerX;
            this._targetY = radius * Math.sin(this._theta) + AnalogClock.centerY;
        }

        enterFrame() {
            let k = 0.005;
            let u = 0.05;
            let dx = this._targetX - this._x;
            this._vx += dx*k - u* this._vx;
            this._x += this._vx;

            let dy:number = this._targetY - this._y;
            this._vy += dy*k  -u* this._vy;
            this._y += this._vy;
            this._dial.setAttribute("transform", "translate(" + this._x + " " + this._y + ") rotate(" + this._rotate + ")");
        }
    }
}