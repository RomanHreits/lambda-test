"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Provider = void 0;
const web3_1 = __importDefault(require("web3"));
class Web3Provider {
    constructor() {
    }
    static instanceEth() {
        console.log(process.env.BSC_URL);
        if (!Web3Provider.web3Eth) {
            Web3Provider.web3Eth = new web3_1.default(String(process.env.ETH_URL));
        }
        return Web3Provider.web3Eth;
    }
    static instanceBsc() {
        if (!Web3Provider.web3Bsc) {
            Web3Provider.web3Bsc = new web3_1.default(String(process.env.BSC_URL));
        }
        return Web3Provider.web3Bsc;
    }
}
exports.Web3Provider = Web3Provider;
//# sourceMappingURL=web3.provider.js.map