module eagle {

    /**
     * @class eagle.JSONPLoader
     * @classdesc
     * JSONPLoader 类以文本形式从 URL 下载数据。
     * JSONPLoader 对象会先从 URL 中下载所有数据，然后才将数据用于应用程序中的代码。它会发出有关下载进度的通知，
     * @extends egret.EventDispatcher
     * @link https://github.com/chrisbing/egret-eagle
     */
    export class JSONPLoader extends egret.URLLoader {

        private static _regID:number = 0;

        /** completeCall */
        public static c:any = {};

        private callbackName:string;


        /**
         * 创建 egret.URLLoader 对象
         * @method egret.URLLoader#constructor
         * @param request {URLRequest} 一个 URLRequest 对象，指定要下载的 URL。
         * 如果省略该参数，则不开始加载操作。如果已指定参数，则立即开始加载操作
         */

        /**
         * 创建 eagle.JSONPLoader 对象
         * @method eagle.JSONPLoader#constructor
         * @param request {URLRequest} 一个 URLRequest 对象，指定要下载的 URL。
         * 如果省略该参数，则不开始加载操作。如果已指定参数，则立即开始加载操作
         * @param callbackName JSONP 回调函数
         */
        constructor(callbackName:string, request?:egret.URLRequest) {
            super();
            this.callbackName = callbackName;
            if (request) {
                this.load(request);
            }
        }

        /**
         * 从指定的 URL 发送和加载数据。以文本格式接收数据。
         * 请注意 使用JSONP加载将忽略 dataFormat 属性。
         * 如果想将数据发送至指定的 URL，则可以在 URLRequest 对象中设置 data 属性，data属性应为{egret.URLVariables}或data.toString返回值符合URL查询字符串格式。
         * @method egret.URLLoader#load
         * @param request {URLRequest}  一个 URLRequest 对象，指定要下载的 URL。
         */
        load(request:egret.URLRequest):void {

            // 保证 回调的id是最初生成的id
            !function (id) {
                JSONPLoader.c["call_" + id] = (data)=> {
                    this.data = data;
                    document.body.removeChild(document.getElementById("jsonp_" + id));
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    delete JSONPLoader.c["call_" + id];
                };
            }.call(this, JSONPLoader._regID);

            this.startLoad(request, JSONPLoader._regID++);
        }

        private startLoad(request:egret.URLRequest, id) {
            var script:HTMLScriptElement = document.createElement('script');
            script.src = request.url;
            script.id = "jsonp_" + id;
            if (request.data) {
                script.src += (request.url.indexOf("?") === -1 ? "?" : "&") + "rd=" + (Math.random() + "").replace(/\./, "") + "&" + request.data.toString();
            }
            script.onerror = ()=> {
                JSONPLoader.c["call_" + id]({ret: -1, msg: "Not Found"});
                try {
                    document.body.removeChild(script);
                } catch (e) {
                }
            };
            script.src += (request.url.indexOf("?") === -1 ? "?" : "&") + this.callbackName + "=" + "eagle.JSONPLoader.c.call_" + id;
            document.body.appendChild(script);
        }

    }
}
