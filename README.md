# cfn-response module

This module contains functions that respond on behalf of custom resources you create using AWS CloudFormation.

The module exports a send method, which sends a response object to a custom resource response to the URL included in the request parameter.

The callback method is called when the response has been sent or failed. If no callback is present, a promise is returned. 

For more information, read the AWS documentation [here][1]

[1]: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-function-code.html#cfn-lambda-function-code-cfnresponsemodule
