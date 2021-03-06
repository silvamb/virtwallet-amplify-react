#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkBackendStack } from '../lib/cdk-backend-stack';

const app = new cdk.App();
new CdkBackendStack(app, 'CdkBackendStack', {
  env: "dev"
});
