namespace hands {
    export class Hand {
        protected _centerX: number = 110;
        protected _centerY: number = 110;
        protected _path;
        protected _radius: number;
        protected _theta: number;
        private _currentTheta:number;
        private _vTheta:number = 0;

        constructor(svg: HTMLElement) {
            this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svg.appendChild(this._path);
            this.angleCalculation();
            this._currentTheta = this._theta;

        }

        public enterFrame(): void {
            this.angleCalculation();
            let dTheta:number = (this._theta - this._currentTheta);
            if(dTheta < -1 *Math.PI)
            {
                dTheta += 2 * Math.PI;
            }else if(dTheta >  Math.PI)
            {
                dTheta -= 2 * Math.PI;
            }

            this._vTheta += dTheta * 0.1 - 0.3*this._vTheta;
            this._currentTheta += this._vTheta;
            if(this._currentTheta > 2 * Math.PI)
            {
                this._currentTheta -= 2 *Math.PI;
            }
            this.draw();
        }

        protected angleCalculation()
        {

        }

        private draw(): void {
            const startX: number = this._centerX + this._radius * Math.cos(this._currentTheta);
            const startY: number = this._centerY + this._radius * Math.sin(this._currentTheta);
            const endX: number = this._centerX;
            const endY: number = this._centerY;
            const value: string = "M " + startX + "," + startY + " L " + endX + "," + endY + " Z";
            this._path.setAttribute("d", value);
        }
    }
}
