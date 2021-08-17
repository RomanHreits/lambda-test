"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairContract = void 0;
const abi_1 = require("./abi");
class PairContract {
    constructor(web3Provider, address) {
        this.web3Provider = web3Provider;
        this.address = address;
        this.web3 = web3Provider;
        this.contract = new web3Provider.eth.Contract(abi_1.UNISWAP_PAIR_ABI, address);
    }
    async token0() {
        return await this.contract.methods.token0().call();
    }
    async token1() {
        return await this.contract.methods.token1().call();
    }
}
exports.PairContract = PairContract;
//# sourceMappingURL=pair.contract.js.map