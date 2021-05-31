import { buildAndUpload } from './pdf-gen';

buildAndUpload()
  .then(() => console.log('Complete!'))
  .catch((error) => console.log('Error generating pdf', error));
