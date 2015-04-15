test:
	./node_modules/.bin/mocha-phantomjs index.html
start:
	./node_modules/.bin/karma start
.PHONY: test start
