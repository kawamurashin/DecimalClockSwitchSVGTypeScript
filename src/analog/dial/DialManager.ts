namespace analog.dial
{
    export class DialManager {

        constructor(svg) {
            let n: number = 10;
            for (let i: number = 1; i <= n; i++) {
                let value = i;
                let radius: number = 85;
                let theta = 2 * Math.PI * (i / n) - 0.5 * Math.PI;
                let rotate = 360 * (i / n);
                let x: string = (radius * Math.cos(theta) + AnalogClock.centerX).toString();
                let y: string = (radius * Math.sin(theta) + AnalogClock.centerY).toString();
                let dial = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dial.setAttribute("class", "analog_dial");
                dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rotate + ")");
                dial.textContent = value.toString();
                svg.appendChild(dial);
            }

            n = 12;
            for (let i: number = 1; i <= n; i++) {
                let value = i;
                let radius: number = 120;
                let theta = 2 * Math.PI * (i / n) - 0.5 * Math.PI;
                let rotate = 360 * (i / n);
                let x: string = (radius * Math.cos(theta) + AnalogClock.centerX).toString();
                let y: string = (radius * Math.sin(theta) + AnalogClock.centerY).toString();
                let dial = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dial.setAttribute("class", "analog_dial");
                dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rotate + ")");
                dial.textContent = value.toString();
                svg.appendChild(dial);
            }

        }
    }
}