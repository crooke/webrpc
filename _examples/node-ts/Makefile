all:
	@echo "please read Makefile source or README to see available commands"

bootstrap:
	rm -rf server/node_modules && rm -rf webapp/node_modules
	cd server && npm install
	cd webapp && npm install

generate:
	../../bin/webrpc-gen -schema=service.ridl -target=ts -server -out=./server/server.gen.ts
	../../bin/webrpc-gen -schema=service.ridl -target=ts -client -out=./webapp/client.gen.ts
	../../bin/webrpc-gen -schema=service.ridl -target=html -client -out=./webapp/docs.gen.html

run-server: generate
	cd server && npm run start

run-client:
	cd webapp && npm run start
