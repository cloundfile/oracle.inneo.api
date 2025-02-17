"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
class Server {
    async status(req, res) {
        const response = {
            title: "API SERVICES INNEO.ORG",
        };
        return res.status(200).json(response);
    }
}
exports.Server = Server;
