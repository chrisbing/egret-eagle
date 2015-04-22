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
                    var script = document.getElementById("JSONPLoader.completeCall.call_" + id);
                    if (script) document.body.removeChild(script);
                    this.data = data;
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    delete JSONPLoader.completeCall["call_" + id];
                };
            }.call(this, JSONPLoader._regID);

            this.startLoad(request, JSONPLoader._regID++);
        }

        private startLoad(request:egret.URLRequest, id) {
            var script:HTMLScriptElement = document.createElement('script');
            script.id = "JSONPLoader.completeCall.call_" + id;
            script.src = request.url;
            if (request.data) {
                script.src += (request.url.indexOf("?") === -1 ? "?" : "&") + request.data.toString();
            }
            script.onerror = ()=> {
                if (script) document.body.removeChild(script);
                JSONPLoader.completeCall["call_" + id]({ret: -1, msg: "Not Found"});
            };
            script.src += (request.url.indexOf("?") === -1 ? "?" : "&") + this.callbackName + "=" + "JSONPLoader.completeCall.call_" + id;
            document.body.appendChild(script);
        }

    }
}