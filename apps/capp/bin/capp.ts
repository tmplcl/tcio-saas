#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {CappStack} from '../lib/capp-stack';

const app = new cdk.App();
new CappStack(app, 'CappStack', {
    env: {
        account: '834067345082',
        region: 'eu-central-1'
    }
});
