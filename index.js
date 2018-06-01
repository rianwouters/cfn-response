/* Copyright 2015 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.
   This file is licensed to you under the AWS Customer Agreement (the "License").
   You may not use this file except in compliance with the License.
   A copy of the License is located at http://aws.amazon.com/agreement/.
   This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied.
   See the License for the specific language governing permissions and limitations under the License. */
const https = require(`https`);
const url = require(`url`);

exports.SUCCESS = "SUCCESS";
exports.FAILED = "FAILED";

const logStreamUrl = (region, group, stream) => `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logEventViewer:group=${group};stream=${stream}`;

exports.send = function({StackId, RequestId, LogicalResourceId, ResponseURL}, Status, Data, PhysicalResourceId) {

    const {AWS_REGION, AWS_LAMBDA_LOG_GROUP_NAME, AWS_LAMBDA_LOG_STREAM_NAME} = process.env;

    const responseBody = JSON.stringify({
        Status,
        PhysicalResourceId,
        Data,
        StackId,
        RequestId,
        LogicalResourceId,
        Reason: `See the details in <a href="${logStreamUrl(AWS_REGION, AWS_LAMBDA_LOG_GROUP_NAME, AWS_LAMBDA_LOG_STREAM_NAME)}">CloudWatch</a>`,
    });
 
    console.log("Response body:\n", responseBody);

    const {hostname, path} = url.parse(ResponseURL);
    const options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: "PUT",
        headers: {
            "content-type": "",
            "content-length": responseBody.length
        }
    };
 
    const request = https.request(options, ({statusCode, statusMessage}) => console.log(`Status code: ${statusCode}\nStatus message: ${statusMessage}`));
 
    request.on("error", err => console.log(`send(..) failed executing https.request(..): ${err}`));
 
    request.write(responseBody);
    request.end();
}

