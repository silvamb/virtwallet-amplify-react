import * as cdk from '@aws-cdk/core';
import { Bucket, HttpMethods } from '@aws-cdk/aws-s3';

interface VirtwalletCdkProperties {
  readonly env: string
}

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: VirtwalletCdkProperties) {
    super(scope, id);

    new Bucket(this, 'VirtwalletAccountFilesBucket', {
      cors: [
        {
          allowedMethods: [HttpMethods.PUT, HttpMethods.GET],
          allowedOrigins: ["*"], // TODO Change this to a parameter
          allowedHeaders: ["*"]
        }
      ]
    });
  }
}
