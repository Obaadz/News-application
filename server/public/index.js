"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/v1/index"));
(0, dotenv_1.config)({ path: ".env.local" });
const PORT = process.env.PORT || 5000, DB_URI = process.env.DB_URI || "";
const app = (0, express_1.default)();
const bodyParser = {
    urlencoded: express_1.default.urlencoded({ limit: "5mb", extended: true }),
    json: express_1.default.json({ limit: "5mb" }),
};
app.use(bodyParser.urlencoded);
app.use(bodyParser.json);
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
app.use(index_1.default);
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect(DB_URI);
});
