# egret-eagle
An extension library of egret . egret引擎的拓展库。

Egret-Eagle 用于拓展egret游戏引擎的API, 增强egret的功能.

(目前仅测试1.6版本egret)

* Egret-Eagle 完全基于egret引擎, 在引擎之上加入拓展
* 后续egret更新可能会导致冲突
* Egret-Eagel 采用源代码形式支持, 将代码复制到egret项目中即可使用
* 所有API 兼容HTML5版本和NATIVE版本
* Egret-Eagle 所有类都在eagle包内


## eagle.Graphics 绘制弧线
``` as3
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
arc(    x:number, 
        y:number, 
        r:number, 
        startFrom:number = 0, 
        angle:number = Math.PI * 2, 
        closeLine = false):void;
```

eagle.Graphics可以被eagle.Shape和eagle.Sprite使用

使用示例 :
``` AS3
// shape
var shape = new eagle.Shape();
shape.graphics.beginFill(0x3399cc, 1);
shape.graphics.arc(33, 33, 33, 0, 270, true);
shape.graphics.endFill();

// sprite
var sprite = new eagle.Sprite();
sprite.graphics.beginFill(0x3399cc, 1);
sprite.graphics.arc(33, 33, 33, 0, 270, true);
sprite.graphics.endFill();
```

## eagle.Bitmap不规则遮罩
``` AS3
/**
 * 不规则遮罩
 * @param value
 */
public set irregularMask(value:egret.DisplayObject);

/**
 * 更新不规则遮罩, 在irregularMask绘制改变的时候请手动调用
 */
public updateMask();
```
使用示例 :
``` AS3
var mask = new eagle.Shape();
mask.graphics.beginFill(0x3399cc, 1);
mask.graphics.arc(33, 33, 33, 0, 270, true);
mask.graphics.endFill();
this.bitmap.irregularMask = mask;


mask.graphics.clear
mask.graphics.beginFill(0x00ffff, 1);
mask.graphics.arc(33, 33, 33, 0, 270, true);
mask.graphics.endFill();
this.bitmap.updateMask();
```




