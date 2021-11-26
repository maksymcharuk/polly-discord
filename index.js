import express from 'express';
import { speak } from './src/pollySpeak.js';

const app = express();

app.use(express.json());

app.get('/speak', async function (req, res) {
  const defaultParams = {
    OutputFormat: 'mp3',
    OutputS3BucketName: 'polly-discord',
    Text: 'Привет. Как дела?',
    TextType: 'text',
    VoiceId: 'Maxim',
    SampleRate: '22050',
  };
  console.log(req);
  const params = {
    ...defaultParams,
    Text: req.query.text,
  };
  try {
    const data = await speak(params);
    res.send(data.SynthesisTask.OutputUri);
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000);
