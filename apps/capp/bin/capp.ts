#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {CappStack} from '../lib/capp-stack';
import {PipelineStack} from "aws-cdk-lib/aws-codepipeline-actions/test/integ.pipeline-ecs-separate-source.lit";

const app = new cdk.App();
new CappStack(app, 'CappStack', {
    env: {
        account: '834067345082',
        region: 'eu-central-1'
    }
});
new PipelineStack(app, 'PipelineSTack', {
    env: {
        account: '834067345082',
        region: 'eu-central-1'
    }
});
