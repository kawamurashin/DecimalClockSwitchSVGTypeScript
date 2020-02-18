namespace time {
    export class TimeKeeper {
        static get second(): number {
            return this._second;
        }
        static get minute(): number {
            return this._minute;
        }
        static get hour(): number {
            return this._hour;
        }
        static get decimalMilliSecond(): number {
            return this._decimalMilliSecond;
        }

        static get decimalSecond(): number {
            return this._decimalSecond;
        }

        static get decimalMinute(): number {
            return this._decimalMinute;
        }

        static get decimalHour(): number {
            return this._decimalHour;
        }

        private static _decimalHour: number;
        private static _decimalMinute: number;
        private static _decimalSecond: number;
        private static _decimalMilliSecond: number;
        private static _hour:number;
        private static _minute:number;
        private static _second:number;
        private static _millisecond:number;
        private static _instance: TimeKeeper;

        public static getInstance(): TimeKeeper {
            if (this._instance == null) {
                this._instance = new TimeKeeper(new SingletonBlock());
            }
            return this._instance;
        }

        constructor(block: SingletonBlock) {
            block = null;
        }

        public static enterFrame(): void {
            let now = new Date();
            this._hour = now.getHours();
            this._minute = now.getMinutes();
            this._second = now.getSeconds();
            this._millisecond = now.getMilliseconds();
            //
            let time: number = (this._hour * 60 * 60 * 1000) + (this._minute * 60 * 1000) + (this._second * 1000) + this._millisecond;
            let decimal = Math.floor((10 * 100 * 100 * 1000) * (time / (24 * 60 * 60 * 1000)));
            this._decimalHour = Math.floor(decimal / (100 * 100 * 1000));
            this._decimalMinute = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000)) / (100 * 1000));
            this._decimalSecond = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000)) / 1000);
            this._decimalMilliSecond = decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000) - (this._decimalSecond * 1000);
        }
    }

    class SingletonBlock {

    }
}
