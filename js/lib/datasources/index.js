"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoDatasources = void 0;
const base_1 = __importDefault(require("../base.js"));
// Datasource user endpoints
class OnvoDatasources extends base_1.default {
    list() {
        return this.fetchBase("/api/datasources");
    }
    get(id) {
        return this.fetchBase("/api/datasources/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/datasources/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/datasources/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/datasources", "PUT", body);
    }
}
exports.OnvoDatasources = OnvoDatasources;
