import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CreateCloudfrontSite} from "cdk-simplewebsite-deploy";

export class CappStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new CreateCloudfrontSite(this, 'test-website', {
            websiteFolder: '../web/out/',
            indexDoc: 'index.html',
            hostedZone: 'coel.link',
            subDomain: 'www.coel.link',
        });
    }
}
