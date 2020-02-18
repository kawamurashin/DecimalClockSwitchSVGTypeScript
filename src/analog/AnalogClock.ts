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
        protected _centerX: number = 110;
        protected _centerY: number = 110;
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