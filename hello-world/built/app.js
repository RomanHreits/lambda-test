"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
const index_1 = require("./index");
exports.lambdaHandler = async (event) => {
    const queries = JSON.stringify(event.queryStringParameters);
    await index_1.getResult();
    return {
        statusCode: 200,
        body: `Queries: ${queries}`
    };
};
//# sourceMappingURL=app.js.map