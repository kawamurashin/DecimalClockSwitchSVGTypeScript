///<reference path="hands/Hand.ts"/>
///<reference path="../time/TimeKeeper.ts"/>
///<reference path="hands/SecondHand.ts"/>
///<reference path="hands/ShortHand.ts"/>
///<reference path="hands/LongHand.ts"/>
///<reference path="dial/DialManager.ts"/>
namespace analog {
    import Hand = hands.Hand;
    import SecondHand = hands.SecondHand;
    import ShortHand = hands.ShortHand;
    import LongHand = hands.LongHand;
    import DialManager = analog.dial.DialManager;
    export class AnalogClock {
        static get centerY(): number {
            return this._centerY;
        }
        static get centerX(): number {
            return this._centerX;
        }
        private static _centerX: number = 200;
        private static _centerY: number = 200;
        private readonly _hands: Hand[];
        private _dialManager:DialManager;
        constructor(svg) {
            this._dialManager = new DialManager(svg);
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