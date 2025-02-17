"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
class Server {
    async status(req, res) {
        const response = {
            version: "1.0.0",
            title: "API SERVICES INNEO.ORG",
            description: "Serviços inneo.org",
        };
        return res.status(200).json(response);
    }
}
exports.Server = Server;
