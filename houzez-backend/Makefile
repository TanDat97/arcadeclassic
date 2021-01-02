.PHONY: build start stop logs ssh-app create-db

build:
	docker-compose build
start:
	docker-compose up -d
stop:
	docker stop cpos-management-promotion-app
	docker stop cpos-management-promotion-mongodb
logs:
	docker logs -f cpos-management-promotion-app
ssh-app:
	docker exec -it cpos-management-promotion-app bash
create-db:
	docker exec -it cpos-management-mongodb mongo promotion /setup/mongo-init.js