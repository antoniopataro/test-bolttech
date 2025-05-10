docker:
	docker compose down && docker compose -p test-bolttech up -d --build
