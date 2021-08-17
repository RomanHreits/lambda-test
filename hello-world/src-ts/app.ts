import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import {getResult} from "./index";
export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const queries = JSON.stringify(event.queryStringParameters);
    await getResult();
    return {
        statusCode: 200,
        body: `Queries: ${queries}`
    }
}
