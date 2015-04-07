module eagle {
    export class Graphics extends egret.Graphics {

        /**
         * 画弧线
         *
         * @param x 圆心位置x
         * @param y 圆心位置y
         * @param r 半径
         * @param startFrom 起始位置 (弧度制)
         * @param angle 旋转角度 (弧度制)
         * @param closeLine 绘制弧线两端的到圆心的连线
         */
        arc(x:number, y:number, r:number, startFrom:number = 0, angle:number = Math.PI * 2, closeLine = false):void {
            this.moveTo(x, y);
            angle = (Math.abs(angle) > 360) ? 360 : angle;
            var n:number = Math.ceil(Math.abs(angle) / 45);
            var angleA:number = angle / n;
            angleA = angleA * Math.PI / 180;
            startFrom = startFrom * Math.PI / 180;
            if (closeLine) {
                this.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            }
            else {
                this.moveTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            }
            for (var i = 1; i <= n; i++) {
                startFrom += angleA;
                var angleMid = startFrom - angleA / 2;
                var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
                var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
                var cx = x + r * Math.cos(startFrom);
                var cy = y + r * Math.sin(startFrom);
                this.curveTo(bx, by, cx, cy);
            }
            if (angle != 360 && closeLine) {
                this.lineTo(x, y);
            }
        }
    }
}
