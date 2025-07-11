#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkPipelineDp8965482Stack } from '../src/resource';

const app = new cdk.App();
new CdkPipelineDp8965482Stack(app, 'CdkPipelineDp8965482Stack');
