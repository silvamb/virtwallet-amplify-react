import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkBackend from '../lib/cdk-backend-stack';

test('S3 Bucket Created', () => {
    const app = new cdk.App();

    const stack = new CdkBackend.CdkBackendStack(app, 'MyTestStack', {
      env: "test"
    });

    expectCDK(stack).to(haveResource("AWS::S3::Bucket"));
});
