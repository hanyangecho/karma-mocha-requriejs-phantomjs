init:	
	./node_modules/karma/bin/karma init
start:
	./node_modules/karma/bin/karma start
test:
	./node_modules/.bin/mocha-phantomjs index.html
open: 
	open ./coverage/Chrome\ 41.0.2272\ \(Mac\ OS\ X\ 10.10.2\)/index.html
.PHONY: init start test open
