build:
	docker build -t gcr.io/voismap/app --build-arg API_KEY=${API_KEY} .

run:
	docker run --rm -p 8888:8080 gcr.io/voismap/app


.PHONY: build run
