module eagle {
    export class Sprite extends egret.Sprite {

        /**
         * 获取 Sprite 中的 Graphics 对象。
         * 指定属于此 sprite 的 Graphics 对象，在此 sprite 中可执行矢量绘图命令。
         * @member {egret.Graphics} egret.Sprite#graphics
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
