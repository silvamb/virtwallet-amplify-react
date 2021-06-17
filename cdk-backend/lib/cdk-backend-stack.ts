import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';

interface VirtwalletCdkProperties {
  readonly env: string
}

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: VirtwalletCdkProperties) {
    super(scope, id);

    const accountFilesBucket = new Bucket(this, 'VirtwalletAccountFilesBucket');

    const requestUploadFileFunction = new lambda.NodejsFunction(this, 'RequestUploadFileFunction', {
      entry: './resources/functions/request-file-upload-lambda.ts',
      handler: 'handler',
      functionName: `virtwallet-request-file-upload-${props.env}`,
      environment: {
        ACCOUNT_FILES_BUCKET: accountFilesBucket.bucketName
      }
    });

    // Add permissions to put objects in the 
    accountFilesBucket.grantRead(requestUploadFileFunction, {
      objectsKeyPattern: "statement-files/*"
    });
    accountFilesBucket.grantPut(requestUploadFileFunction, {
      objectsKeyPattern: "statement-files/*"
    });

    new cdk.CfnOutput(this, "RequestUploadFileFunctionArn", {
      value: requestUploadFileFunction.functionArn
    });

    new cdk.CfnOutput(this, "RequestUploadFileFunctionName", {
      value: requestUploadFileFunction.functionName
    });
  }
}
