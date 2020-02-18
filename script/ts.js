var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var time;
(function (time_1) {
    var TimeKeeper = (function () {
        function TimeKeeper(block) {
            block = null;
        }
        Object.defineProperty(TimeKeeper, "second", {
            get: function () {
                return this._second;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeKeeper, "minute", {
            get: function () {
                return this._minute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeKeeper, "hour", {
            get: function () {
                return this._hour;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeKeeper, "decimalMilliSecond", {
            get: function () {
                return this._decimalMilliSecond;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeKeeper, "decimalSecond", {
            get: function () {
                return this._decimalSecond;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeKeeper, "decimalMinute", {
            get: function () {
                return this._decimalMinute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeKeeper, "decimalHour", {
            get: function () {
                return this._decimalHour;
            },
            enumerable: true,
            configurable: true
        });
        TimeKeeper.getInstance = function () {
            if (this._instance == null) {
                this._instance = new TimeKeeper(new SingletonBlock());
            }
            return this._instance;
        };
        TimeKeeper.enterFrame = function () {
            var now = new Date();
            this._hour = now.getHours();
            this._minute = now.getMinutes();
            this._second = now.getSeconds();
            this._millisecond = now.getMilliseconds();
            var time = (this._hour * 60 * 60 * 1000) + (this._minute * 60 * 1000) + (this._second * 1000) + this._millisecond;
            var decimal = Math.floor((10 * 100 * 100 * 1000) * (time / (24 * 60 * 60 * 1000)));
            this._decimalHour = Math.floor(decimal / (100 * 100 * 1000));
            this._decimalMinute = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000)) / (100 * 1000));
            this._decimalSecond = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000)) / 1000);
            this._decimalMilliSecond = decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000) - (this._decimalSecond * 1000);
        };
        return TimeKeeper;
    }());
    time_1.TimeKeeper = TimeKeeper;
    var SingletonBlock = (function () {
        function SingletonBlock() {
        }
        return SingletonBlock;
    }());
})(time || (time = {}));
var digital;
(function (digital) {
    var DecimalTime = time.TimeKeeper;
    var DigitalClock = (function () {
        function DigitalClock(svg) {
            this._positionX = 110;
            this._positionY = 160;
            this._text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            this._text.setAttribute("id", "digital_clock");
            this._text.setAttribute('x', this._positionX.toString());
            this._text.setAttribute('y', this._positionY.toString());
            svg.appendChild(this._text);
            this.enterFrame();
        }
        DigitalClock.prototype.enterFrame = function () {
            var hour = (DecimalTime.decimalHour).toString();
            var minute = digital.DigitalClock.plusZero(DecimalTime.decimalMinute);
            var second = digital.DigitalClock.plusZero(DecimalTime.decimalSecond);
            this._text.textContent = hour + ":" + minute + ":" + second;
        };
        DigitalClock.plusZero = function (value) {
            return (value + 100).toString().substr(1);
        };
        return DigitalClock;
    }());
    digital.DigitalClock = DigitalClock;
})(digital || (digital = {}));
var hands;
(function (hands) {
    var Hand = (function () {
        function Hand(svg) {
            this._centerX = 110;
            this._centerY = 110;
            this._vTheta = 0;
            this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svg.appendChild(this._path);
            this.angleCalculation();
            this._currentTheta = this._theta;
        }
        Hand.prototype.enterFrame = function () {
            this.angleCalculation();
            var dTheta = (this._theta - this._currentTheta);
            if (dTheta < -1 * Math.PI) {
                dTheta += 2 * Math.PI;
            }
            else if (dTheta > Math.PI) {
                dTheta -= 2 * Math.PI;
            }
            this._vTheta += dTheta * 0.1 - 0.3 * this._vTheta;
            this._currentTheta += this._vTheta;
            if (this._currentTheta > 2 * Math.PI) {
                this._currentTheta -= 2 * Math.PI;
            }
            this.draw();
        };
        Hand.prototype.angleCalculation = function () {
        };
        Hand.prototype.draw = function () {
            var startX = this._centerX + this._radius * Math.cos(this._currentTheta);
            var startY = this._centerY + this._radius * Math.sin(this._currentTheta);
            var endX = this._centerX;
            var endY = this._centerY;
            var value = "M " + startX + "," + startY + " L " + endX + "," + endY + " Z";
            this._path.setAttribute("d", value);
        };
        return Hand;
    }());
    hands.Hand = Hand;
})(hands || (hands = {}));
var hands;
(function (hands) {
    var TimeKeeper = time.TimeKeeper;
    var SecondHand = (function (_super) {
        __extends(SecondHand, _super);
        function SecondHand(svg) {
            var _this = _super.call(this, svg) || this;
            _this._radius = 100;
            _this._path.setAttribute("stroke", "#333");
            _this._path.setAttribute("fill", "none");
            _this._path.setAttribute("stroke-width", "2");
            _this._path.setAttribute("stroke-linejoin", "round");
            _this.enterFrame();
            return _this;
        }
        SecondHand.prototype.angleCalculation = function () {
            _super.prototype.angleCalculation.call(this);
            if (Main.type == Main.TYPE_DECIMAL) {
                this._theta = 2 * Math.PI * (TimeKeeper.decimalSecond / 100) - Math.PI * 0.5;
            }
            else {
                this._theta = 2 * Math.PI * (TimeKeeper.second / 60) - Math.PI * 0.5;
            }
        };
        return SecondHand;
    }(hands.Hand));
    hands.SecondHand = SecondHand;
})(hands || (hands = {}));
var hands;
(function (hands) {
    var TimeKeeper = time.TimeKeeper;
    var ShortHand = (function (_super) {
        __extends(ShortHand, _super);
        function ShortHand(svg) {
            var _this = _super.call(this, svg) || this;
            _this._radius = 75;
            _this._path.setAttribute("stroke", "#333");
            _this._path.setAttribute("fill", "none");
            _this._path.setAttribute("stroke-width", "6");
            _this._path.setAttribute("stroke-linejoin", "round");
            _this.enterFrame();
            return _this;
        }
        ShortHand.prototype.angleCalculation = function () {
            _super.prototype.angleCalculation.call(this);
            if (Main.type == Main.TYPE_DECIMAL) {
                this._theta = 2 * Math.PI * ((TimeKeeper.decimalHour + (TimeKeeper.decimalMinute / 100)) / 10) - Math.PI * 0.5;
            }
            else {
                this._theta = 2 * Math.PI * (((TimeKeeper.hour % 12) + (DecimalTime.minute / 60)) / 10) - Math.PI * 0.5;
            }
        };
        return ShortHand;
    }(hands.Hand));
    hands.ShortHand = ShortHand;
})(hands || (hands = {}));
var hands;
(function (hands) {
    var TimeKeeper = time.TimeKeeper;
    var LongHand = (function (_super) {
        __extends(LongHand, _super);
        function LongHand(svg) {
            var _this = _super.call(this, svg) || this;
            _this._radius = 90;
            _this._path.setAttribute("stroke", "#333");
            _this._path.setAttribute("fill", "none");
            _this._path.setAttribute("stroke-width", "3");
            _this._path.setAttribute("stroke-linejoin", "round");
            _this.enterFrame();
            return _this;
        }
        LongHand.prototype.angleCalculation = function () {
            _super.prototype.angleCalculation.call(this);
            if (Main.type == Main.TYPE_DECIMAL) {
                this._theta = 2 * Math.PI * (TimeKeeper.decimalMinute / 100) - Math.PI * 0.5;
            }
            else {
                this._theta = 2 * Math.PI * (TimeKeeper.minute / 60) - Math.PI * 0.5;
            }
        };
        return LongHand;
    }(hands.Hand));
    hands.LongHand = LongHand;
})(hands || (hands = {}));
var analog;
(function (analog) {
    var SecondHand = hands.SecondHand;
    var ShortHand = hands.ShortHand;
    var LongHand = hands.LongHand;
    var AnalogClock = (function () {
        function AnalogClock(svg) {
            this._centerX = 110;
            this._centerY = 110;
            var n = 10;
            for (var i = 0; i < n; i++) {
                var value = i;
                var radius = 85;
                var theta = 2 * Math.PI * (i / n) - 0.5 * Math.PI;
                var rotate = 360 * (i / n);
                var x = (radius * Math.cos(theta) + this._centerX).toString();
                var y = (radius * Math.sin(theta) + this._centerY).toString();
                var dial = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dial.setAttribute("class", "analog_dial");
                dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rotate + ")");
                dial.textContent = value.toString();
                svg.appendChild(dial);
            }
            this._hands = [];
            var hand;
            hand = new SecondHand(svg);
            this._hands.push(hand);
            hand = new ShortHand(svg);
            this._hands.push(hand);
            hand = new LongHand(svg);
            this._hands.push(hand);
        }
        AnalogClock.prototype.enterFrame = function () {
            var n = this._hands.length;
            for (var i = 0; i < n; i++) {
                var hand = this._hands[i];
                hand.enterFrame();
            }
        };
        return AnalogClock;
    }());
    analog.AnalogClock = AnalogClock;
})(analog || (analog = {}));
var DigitalClock = digital.DigitalClock;
var DecimalTime = time.TimeKeeper;
var AnalogClock = analog.AnalogClock;
var main;
var Main = (function () {
    function Main() {
        var _this = this;
        var interval = function () {
            _this.enterFrame();
        };
        DecimalTime.getInstance();
        DecimalTime.enterFrame();
        var svg = document.getElementById("svg");
        this._digitalClock = new DigitalClock(svg);
        this._analogClock = new AnalogClock(svg);
        var fps = 60 / 1000;
        setInterval(interval, fps);
    }
    Object.defineProperty(Main, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.enterFrame = function () {
        DecimalTime.enterFrame();
        this._digitalClock.enterFrame();
        this._analogClock.enterFrame();
    };
    Main.TYPE_DECIMAL = "decimal";
    Main.TYPE_DUODECIMAL = "duodecimal";
    Main._type = Main.TYPE_DECIMAL;
    return Main;
}());
window.addEventListener("load", function () {
    main = new Main();
});
//# sourceMappingURL=ts.js.map