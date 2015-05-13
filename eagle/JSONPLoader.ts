module eagle {

    export class JSONPLoader extends egret.URLLoader {

        private static _regID:number = 0;

        public static completeCall:any = {};

        private callbackName:string;

        constructor(callbackName:string) {
            super();
            this.callbackName = callbackName;
        }

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
