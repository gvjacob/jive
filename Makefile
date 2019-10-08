start:
	npm start

build:
	npm run build

test:
	npm test

deploy:
	rm -rf dist 
	npm run build 
	surge ./dist parcel-react.surge.sh

