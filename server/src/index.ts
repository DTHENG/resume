import express from 'express';
import { resolve } from 'path';

const app = express();

app.use(express.static(resolve('../client/build')));
app.get('/resume', (req, res) =>
  res.sendFile(resolve('../client/build/resume.html')),
);
if (
  process.env.REACT_APP_LOCAL_PROFILE_IMAGE &&
  process.env.REACT_APP_LOCAL_PROFILE_IMAGE === 'true'
) {
  app.get('/profile.jpg', (req, res) =>
    res.sendFile(resolve('../profile.jpg')),
  );
}
app.get('*', (req, res) =>
  res.sendFile(resolve('../client/build/not-found.html')),
);
app.listen('3456');
console.log('Listening on port 3456...');
