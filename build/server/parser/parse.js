"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
class Parse {
    parseIncomingData(data) {
        const endIndex = data.indexOf(',"end":true}');
        let jsonString = data.substring(0, endIndex) + "}";
        if (jsonString[endIndex - 1] == ",") {
            jsonString = jsonString.substring(0, endIndex - 1) + "}";
        }
        data = data.split(data.substring(0, endIndex + 12)).join("");
        //0 -> jsonString, 1 -> socket Buffer stringifed
        return [JSON.parse(jsonString), data];
    }
}
exports.Parse = Parse;
