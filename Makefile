install: 
	yarn --cwd client install && yarn --cwd server install

lint: 
	yarn --cwd client lint

build: 
	yarn --cwd client build

test: 
	yarn --cwd client test

test-coverage: 
	yarn --cwd client test:cov

run: 
	yarn --cwd client build && yarn --cwd server build && yarn --cwd server start

start: 
	yarn --cwd client start

	
	