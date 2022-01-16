import {Stack, StackProps, Stage, StageProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";

export class CappStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            // The pipeline name
            pipelineName: 'SaasWebAppPipeline',
            // How it will be built and synthesized
            synth: new ShellStep('Synth', {
                // Where the source can be found
                input: CodePipelineSource.connection('tmplcl/tcio-saas', 'main', {
                    connectionArn: 'arn:aws:codestar-connections:eu-central-1:834067345082:connection/aea56bf0-6e1f-438d-a5e3-09845ac5dd73'
                }),
                // Install dependencies, build and run cdk synth
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ],
            })
        });

        pipeline.addStage(new SaasApplication(this, 'Prod', {
            env: {
                account: '834067345082',
                region: 'eu-central-1',
            },
        }));
    }
}

class SaasApplication extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);
        new CappStack(this, 'Prod');
    }
}