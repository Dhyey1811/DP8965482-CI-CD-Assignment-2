"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkPipelineDp8965482Stack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const s3 = __importStar(require("aws-cdk-lib/aws-s3"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const dynamodb = __importStar(require("aws-cdk-lib/aws-dynamodb"));
class CdkPipelineDp8965482Stack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // ✅ S3 Bucket
        const myBucket = new s3.Bucket(this, 'Dp8965482Bucket', {
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
        // ✅ DynamoDB Table
        const myTable = new dynamodb.Table(this, 'Dp8965482Table', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            tableName: 'Dp8965482Table',
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
        // ✅ Lambda Function
        const myLambda = new lambda.Function(this, 'Dp8965482Lambda', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log("Lambda invoked!");
          return { statusCode: 200, body: "Hello from Lambda!" };
        }
      `),
            environment: {
                BUCKET_NAME: myBucket.bucketName,
                TABLE_NAME: myTable.tableName
            }
        });
        // Grant permissions to Lambda
        myBucket.grantReadWrite(myLambda);
        myTable.grantReadWriteData(myLambda);
    }
}
exports.CdkPipelineDp8965482Stack = CdkPipelineDp8965482Stack;
