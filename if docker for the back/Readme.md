### useful docker commands

(my app was a clicker game so i name my backend "clicker-back")

<!-- build docker image -->

docker build --no-cache -t clicker-back .

<!-- run docker image to a container with the .env -->

docker run --env-file .env -p 8080:80 --name clicker-back clicker-back

<!-- print the .env content from the container -->

docker exec -it clicker-back printenv

<!-- inspect if the container is running -->

docker inspect clicker-back

<!-- ping to see if docker is running -->

ping host.docker.internal

<!-- see the logs of the container -->

docker logs clicker-back

<!-- create a .tar to be able to export it and use as image -->

docker save -o clicker-back.tar clicker-back
