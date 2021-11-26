/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/polly-examples.html.
Purpose:
polly.ts demonstrates how to convert text to speech using Amazon Polly,
and automatically upload an audio file of the speech to an
Amazon Simple Storage Service (Amazon S3) bucket.
Inputs (replace in code):
- BUCKET_NAME
- IDENTITY_POOL_ID
Running the code:
node polly_synthesize_to_s3.js
*/
// snippet-start:[Polly.JavaScript.general-examples.synthesizetos3_V3]
import {
  GetSpeechSynthesisTaskCommand,
  StartSpeechSynthesisTaskCommand,
} from '@aws-sdk/client-polly';
import { pollyClient } from './libs/pollyClient.js';

async function speak(params) {
  try {
    const data = await pollyClient.send(
      new StartSpeechSynthesisTaskCommand(params)
    );

    await waitStatus(data.SynthesisTask.TaskId);

    return data;
  } catch (err) {
    return 'Error putting object';
  }
}

async function getTaskStatus(taskId) {
  const task = await pollyClient.send(
    new GetSpeechSynthesisTaskCommand({ TaskId: taskId })
  );
  return task.SynthesisTask.TaskStatus;
}

async function waitStatus(taskId) {
  const status = await getTaskStatus(taskId);
  if (status !== 'scheduled') {
    return Promise.resolve(true);
  } else {
    await new Promise((r) => setTimeout(r, 250));
    return waitStatus(taskId);
  }
}

export { speak };

// snippet-end:[Polly.JavaScript.general-examples.synthesizetos3_V3]
