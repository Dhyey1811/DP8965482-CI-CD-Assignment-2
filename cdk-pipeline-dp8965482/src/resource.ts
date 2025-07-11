import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CdkPipelineDp8965482Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
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
