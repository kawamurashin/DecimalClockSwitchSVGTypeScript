namespace analog.dial
{
    export class Dial {
        private readonly _dial;
        private _theta:number = 0;
        private _rotate:number = 0;

        //constructor(svg , str:string , x:number, y:number ,rotate:number) {
        constructor(svg , str:string  , radius:number ,rotate:number) {

            this._rotate = rotate;
            this._theta =  (Math.PI * (this._rotate /180)) - 0.5 * Math.PI;

            let x: number = radius * Math.cos(this._theta) + AnalogClock.centerX;
            let y: number = radius * Math.sin(this._theta) + AnalogClock.centerY;

            this._dial = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            this._dial.setAttribute("class", "analog_dial");
            this._dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + this._rotate + ")");
            this._dial.textContent = str.toString();
            svg.appendChild(this._dial);
        }



        setRadius(radius: number) {
            let x: number = radius * Math.cos(this._theta) + AnalogClock.centerX;
            let y: number = radius * Math.sin(this._theta) + AnalogClock.centerY;
            this._dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + this._rotate + ")");
        }
    }
}