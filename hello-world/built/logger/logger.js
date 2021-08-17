"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGGER = void 0;
const log4js_1 = __importStar(require("log4js"));
log4js_1.configure({
    appenders: {
        'out': { type: 'console' },
        'err': { type: 'stderr' }
    },
    categories: {
        default: { appenders: ['out'], level: 'INFO' },
        err: { appenders: ['err'], level: 'ERROR' }
    },
});
exports.LOGGER = log4js_1.default.getLogger();
//# sourceMappingURL=logger.js.map