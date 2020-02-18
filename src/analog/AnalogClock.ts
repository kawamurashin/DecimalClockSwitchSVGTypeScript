///<reference path="hands/Hand.ts"/>
///<reference path="../time/TimeKeeper.ts"/>
///<reference path="hands/SecondHand.ts"/>
///<reference path="hands/ShortHand.ts"/>
///<reference path="hands/LongHand.ts"/>
namespace analog {
    import Hand = hands.Hand;
    import SecondHand = hands.SecondHand;
    import ShortHand = hands.ShortHand;
    import LongHand = hands.LongHand;
    export class AnalogClock {
        protected _centerX: number = 110;
        protected _centerY: number = 110;
        private readonly _hands: Hand[];
        constructor(svg) {
            let n: number = 10;
            for (let i: number = 0; i < n; i++) {
                let value = i;
                let radius: number = 85;
                let theta = 2 * Math.PI * (i / n) - 0.5 * Math.PI;
                let rotate = 360 * (i / n);
                let x: string = (radius * Math.cos(theta) + this._centerX).toString();
                let y: string = (radius * Math.sin(theta) + this._centerY).toString();
                let dial = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dial.setAttribute("class", "analog_dial");
                dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rotate + ")");
                dial.textContent = value.toString();
                svg.appendChild(dial);
            }

            this._hands = [];
            let hand: Hand;
            hand = new SecondHand(svg);
            this._hands.push(hand);
            hand = new ShortHand(svg);
            this._hands.push(hand);
            hand = new LongHand(svg);
            this._hands.push(hand);
        }

        public enterFrame() {
            let n = this._hands.length;
            for (let i = 0; i < n; i++) {
                let hand = this._hands[i];
                hand.enterFrame();
            }
        }
    }
}