install: 
	yarn --cwd client install && yarn --cwd server install && yarn --cwd pdf-gen install

lint: 
	yarn --cwd client lint

build: 
	yarn --cwd client build

test: 
	yarn --cwd client test

test-coverage: 
	yarn --cwd client test:cov

run: export REACT_APP_ANALYTICS_ID=UA-18339357-1
run: export REACT_APP_DEBUG_ANALYTICS=true
run: 
	yarn --cwd client build && yarn --cwd server build && yarn --cwd server start

start: 
	yarn --cwd client start

pdf-lint: 
	yarn --cwd pdf-gen lint
	
pdf-build:
	yarn --cwd pdf-gen build

pdf-test:
	yarn --cwd pdf-gen test

pdf-test-coverage:
	yarn --cwd pdf-gen test:cov

