module eagle {
    export class Shape extends egret.Shape {

        /**
         * 获取 Shape 中的 Graphics 对象。
         * @member {egret.Graphics} egret.Shape#graphics
         */
        public get graphics():Graphics {
            if (!this["_graphics"]) {
                this["_graphics"] = new Graphics();
                this.needDraw = true;
            }
            return this["_graphics"];
        }

    }
}

