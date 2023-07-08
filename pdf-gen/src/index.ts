import { build } from './pdf-gen';

build()
  .then(() => console.log('Complete!'))
  .catch((error) => console.log('Error generating pdf', error));
