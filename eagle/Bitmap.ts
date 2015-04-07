module eagle {
    export class Bitmap extends egret.Bitmap {

        private _irregularMask:egret.DisplayObject;

        private _bitmap:egret.Bitmap;

        private _container:egret.DisplayObjectContainer;

        private _useIrregularMask:boolean = false;

        /**
         * 渲染纹理
         * @member {egret.Texture} egret.Bitmap#texture
         */
        public get texture():egret.Texture{
            return this["_texture"];
        }

        public set texture(value:egret.Texture){
            if(value==this["_texture"]){
                return;
            }
            this._setSizeDirty();
            this["_texture"] = value;
            if (this._useIrregularMask) {
                this._bitmap.texture = value;
                this.updateMask();
            }
        }

        /**
         * 更新不规则遮罩, 在irregularMask绘制改变的时候请手动调用
         */
        public updateMask() {
            // 不规则遮罩，使用 RenderTexture + BlendMode 实现，这个调用方式在未来会进一步简化
            // 实现原理： 创建一个 Container，在其中先添加一个图片，然后再添加一个蒙版，并将蒙版的混合模式设置为擦除，然后将这个 Container 通过 RenderTexture 绘制为一个纹理
            var texture = new egret.RenderTexture();
            //为保证擦除结果正确，传入clipRect参数，规定最终RenderTexture大小只有mask区域大小
            texture.drawToTexture(this._container, new egret.Rectangle(
                this._irregularMask.x,
                this._irregularMask.y,
                this._irregularMask.width,
                this._irregularMask.height));
            this._setSizeDirty();
            this["_texture"] = texture;
        }

        /**
         * 不规则遮罩
         * @param value
         */
        public set irregularMask(value:egret.DisplayObject) {
            if (!this._useIrregularMask) {
                this._container = new egret.DisplayObjectContainer();
                this._bitmap = new egret.Bitmap();
                this._bitmap.texture = this.texture;
                this._container.addChild(this._bitmap);
                value.blendMode = egret.BlendMode.ERASE_REVERSE;
                this._container.addChild(value);
            } else {
                this._container.removeChild(this._irregularMask);
                this._container.addChild(value);
            }
            this._irregularMask = value;
            this.updateMask();
        }

    }
}

