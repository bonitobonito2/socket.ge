"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const parse_1 = require("../parser/parse");
class Client {
    constructor(client) {
        this.client = client;
        this.handlers = new Map();
        this.onData();
        this.parse = new parse_1.Parse();
        this.buffer = "";
    }
    on(listener, def) {
        this.handlers.set(listener, def);
        return true;
    }
    handleRequest() {
        while (this.buffer.includes('"end":true}')) {
            // Parse the incoming data from the buffer and return it as an object
            const data = this.parse.parseIncomingData(this.buffer);
            //Taking new buffer to counter a while loop.
            this.buffer = data[1];
            try {
                //Taking a request to handle it.
                console.log(this.handlers);
                this.handlers.get(data[0]["path"])(data[0]["data"]);
            }
            catch (error) {
                console.log("not registered handlers");
            }
        }
    }
    onData() {
        this.client.on("data", (data) => {
            this.buffer += data.toString();
            console.log(this.buffer);
            this.handleRequest();
        });
    }
    emit(eventName, data) {
        this.client.write(JSON.stringify({ path: eventName, data: data, end: true }));
    }
    close() {
        this.client.destroy();
    }
}
exports.Client = Client;
