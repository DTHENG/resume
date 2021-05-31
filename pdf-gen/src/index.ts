import PdfGen from './pdf-gen';

new PdfGen()
  .buildAndUpload()
  .then(() => console.log('Complete!'))
  .catch((error) => console.log('Error generating pdf', error));
