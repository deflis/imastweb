import { Observable } from 'rxjs'


export default class WebSocketClient<T>{
    private ws: WebSocket
    connection: Observable<T>

    close() {
        this.ws.close();
    }

    map<R>(project: (value: T, index: number) => R){
        return new WebSocketClient(this.ws, this.connection.map(project))
    }

    private constructor(ws: WebSocket, connection: Observable<T>) {
        this.ws = ws;
        this.connection = connection;
    }

    static async create<T>(url: string): Promise<WebSocketClient<T>> {
        console.debug("WebSocketClient create");
        const ws = new WebSocket(url);
        return new this(ws, await this.createObservable<T>(ws));
    }

    private static createObservable<T>(ws: WebSocket): Promise<Observable<T>> {
        console.debug("createObservable");
        return new Promise((resolve, reject) => {
            console.debug("streaming connected");

            const rejected = (e: Event) => reject(e);

            ws.addEventListener("error", rejected);
            ws.addEventListener("close", rejected);
            ws.addEventListener("close", (e) => console.error(e));
            const observable =new Observable<T>((observer) => {
                ws.addEventListener("message", (event) => observer.next(JSON.parse(event.data)))
                ws.addEventListener("error", (event) => observer.error(event));;
                ws.onclose = ce => observer.complete();
                return () => ws.close();
                ;
            })

            ws.addEventListener("open", (e) => {
                ws.removeEventListener("error", rejected);
                ws.removeEventListener("close", rejected);
                resolve(observable);
            })
        });
    }
}