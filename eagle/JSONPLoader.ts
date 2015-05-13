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

        public static completeCall:any = {};

        private callbackName:string;

        constructor(callbackName:string) {
            super();
            this.callbackName = callbackName;
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
                JSONPLoader.completeCall["call_" + id] = (data)=> {
                    this.data = data;
                    document.body.removeChild(document.getElementById("jsonp_" + id))
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    delete JSONPLoader.completeCall["call_" + id];
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
                document.body.removeChild(script);
                JSONPLoader.completeCall["call_" + id]({ret: -1, msg: "Not Found"});
            };
            script.src += (request.url.indexOf("?") === -1 ? "?" : "&") + this.callbackName + "=" + "eagle.JSONPLoader.completeCall.call_" + id;
            document.body.appendChild(script);
        }

    }
}
