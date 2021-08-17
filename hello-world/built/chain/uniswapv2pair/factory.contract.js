"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryContract = void 0;
const facrory_abi_1 = require("./facrory.abi");
class FactoryContract {
    constructor(web3Provider, address) {
        this.web3Provider = web3Provider;
        this.address = address;
        this.web3 = web3Provider;
        this.contract = new web3Provider.eth.Contract(facrory_abi_1.FACTORY_ABI, address);
    }
    async getPairInfo(contractAddress1, contractAddress2) {
        return await this.contract.methods.getPair(contractAddress1, contractAddress2).call();
    }
}
exports.FactoryContract = FactoryContract;
//# sourceMappingURL=factory.contract.js.map