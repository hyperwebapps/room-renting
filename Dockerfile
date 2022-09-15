# Distro
FROM alpine:3.14
RUN apt-get update && apt-get install -y curl
RUN echo "This is the building image"