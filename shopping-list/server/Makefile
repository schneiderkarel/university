up:
	docker network create 'shopperio' || true

	docker-compose --env-file .env.docker up -d --remove-orphans mongo

down:
	docker stop mongo
	docker rm mongo

	docker network remove 'shopperio'
