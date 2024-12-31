install: 
	yarn --cwd pdf-gen install && cd client && npm install

lint: 
	cd client && npm run lint

start: 
	cd client && npm run dev

pdf-lint: 
	yarn --cwd pdf-gen lint
	
pdf-build:
	yarn --cwd pdf-gen build

pdf-test:
	yarn --cwd pdf-gen test

pdf-test-coverage:
	yarn --cwd pdf-gen test:cov

