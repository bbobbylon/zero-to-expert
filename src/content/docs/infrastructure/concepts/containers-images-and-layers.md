---
title: "Containers, images, and layers"
description: "What a container really is, how images are built from cached layers, and how storage, networking, ports, and Compose behave."
domain: infrastructure
pageType: explanation
status: draft
safetyCritical: false
sources:
  - title: "Docker overview"
    url: "https://docs.docker.com/get-started/docker-overview/"
    publisher: "Docker Docs"
  - title: "What is a container?"
    url: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/"
    publisher: "Docker Docs"
  - title: "What is an image?"
    url: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/"
    publisher: "Docker Docs"
  - title: "What is a registry?"
    url: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/"
    publisher: "Docker Docs"
  - title: "Understanding the image layers"
    url: "https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/"
    publisher: "Docker Docs"
  - title: "Dockerfile reference"
    url: "https://docs.docker.com/reference/dockerfile/"
    publisher: "Docker Docs"
  - title: "Building best practices"
    url: "https://docs.docker.com/build/building/best-practices/"
    publisher: "Docker Docs"
  - title: "Multi-stage builds"
    url: "https://docs.docker.com/build/building/multi-stage/"
    publisher: "Docker Docs"
  - title: "Build context"
    url: "https://docs.docker.com/build/concepts/context/"
    publisher: "Docker Docs"
  - title: "Volumes"
    url: "https://docs.docker.com/engine/storage/volumes/"
    publisher: "Docker Docs"
  - title: "Bind mounts"
    url: "https://docs.docker.com/engine/storage/bind-mounts/"
    publisher: "Docker Docs"
  - title: "Networking overview"
    url: "https://docs.docker.com/engine/network/"
    publisher: "Docker Docs"
  - title: "docker container run"
    url: "https://docs.docker.com/reference/cli/docker/container/run/"
    publisher: "Docker Docs"
  - title: "Running containers (exit status)"
    url: "https://docs.docker.com/engine/containers/run/"
    publisher: "Docker Docs"
  - title: "docker container rm"
    url: "https://docs.docker.com/reference/cli/docker/container/rm/"
    publisher: "Docker Docs"
  - title: "docker image ls"
    url: "https://docs.docker.com/reference/cli/docker/image/ls/"
    publisher: "Docker Docs"
  - title: "docker volume ls"
    url: "https://docs.docker.com/reference/cli/docker/volume/ls/"
    publisher: "Docker Docs"
  - title: "docker network ls"
    url: "https://docs.docker.com/reference/cli/docker/network/ls/"
    publisher: "Docker Docs"
  - title: "docker network create"
    url: "https://docs.docker.com/reference/cli/docker/network/create/"
    publisher: "Docker Docs"
  - title: "Docker Compose overview"
    url: "https://docs.docker.com/compose/"
    publisher: "Docker Docs"
  - title: "Networking in Compose"
    url: "https://docs.docker.com/compose/how-tos/networking/"
    publisher: "Docker Docs"
  - title: "Compose file reference: services"
    url: "https://docs.docker.com/reference/compose-file/services/"
    publisher: "Docker Docs"
  - title: "namespaces(7) - Linux manual page"
    url: "https://man7.org/linux/man-pages/man7/namespaces.7.html"
    publisher: "Linux man-pages project"
  - title: "cgroups(7) - Linux manual page"
    url: "https://man7.org/linux/man-pages/man7/cgroups.7.html"
    publisher: "Linux man-pages project"
  - title: "Images (Kubernetes)"
    url: "https://kubernetes.io/docs/concepts/containers/images/"
    publisher: "Kubernetes documentation"
tags: [containers, docker, images, layers, dockerfile, volumes, networking, compose]
sidebar:
  order: 52
---

A container is a way to run a program together with everything it needs, in a box that behaves the same on your laptop, on a build server, and in production. This page explains the pieces (image, container, registry, volume, network), why a Dockerfile is written the way it is, and the handful of behaviors that trip up almost every newcomer. Commands and flags were read against Docker's documentation on 2026-09-26.

## The idea: a class and an object

Analogy for a Spring Boot developer: an **image** is like a class or a built JAR, a fixed and sharable definition. A **container** is like an object or a running `java -jar` process, one live instance of it. You can start many containers from one image, and stopping or deleting a container never changes the image.

| Term | What it is | Analogy | See it with |
| --- | --- | --- | --- |
| Image | A read-only package: files, libraries, configuration, and a default command | A built JAR | `docker image ls` |
| Container | A running (or stopped) instance of an image | A running JVM process | `docker container ls -a` (short form `docker ps -a`) |
| Dockerfile | The text recipe that builds an image | A `pom.xml` for an image | The file itself |
| Registry | A server that stores and serves images (Docker Hub is the default public one) | Maven Central | Where `docker pull` looks |
| Volume | Storage managed by Docker that outlives any one container | A database's data directory | `docker volume ls` |
| Network | A virtual network containers join to reach each other | A private VLAN for your app | `docker network ls` |

Docker itself is a client and a background engine. The `docker` command you type is the client; it sends requests to the engine (the daemon), which builds and runs containers. If the engine is not running, the client cannot do anything. On the Windows 11 machine used for this page, `docker --version` worked while the engine was off, and `docker version` printed the client details and then failed with `failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine` (recorded 2026-09-26, Docker client 29.3.1). The fix is to start Docker Desktop and wait for the engine to report as running.

## What a container is, and is not

A container is **not a small virtual machine**. It is an ordinary process on the host's kernel that Linux has been told to isolate. Two kernel features do the work:

| Feature | What it controls | In short (from the man pages) |
| --- | --- | --- |
| Namespaces | What a process can see: its own process list, network stack, mounts, host name | A namespace wraps a global resource so each set of processes has its own isolated instance |
| Control groups (cgroups) | How much it can use: CPU, memory, and similar | Cgroups limit and account for resources used by groups of processes |

Two consequences you will feel immediately. First, a container starts in moments because there is no operating system to boot. Second, each container has its **own network namespace**, so it has its own idea of `localhost`. The man page lists network devices, IP protocol stacks, routing tables, firewall rules, and port numbers among what a network namespace isolates. A Spring Boot application inside a container that connects to `localhost:3306` is asking its own container for a database, not your machine and not another container.

## Images are stacks of layers

An image is built from **layers**, one for each instruction in the Dockerfile that changes files. Layers are immutable and stacked. A container adds a thin writable layer on top, and that writable layer disappears when the container is removed. Images that start `FROM` the same base share the layers underneath, so they are stored and downloaded once.

### Why layer order decides build speed

Docker reuses a layer from cache when its instruction and its inputs are unchanged. **Once one layer changes, every layer after it is rebuilt.** So you put the things that change rarely first and the things that change often last. Analogy: it is the same reason Maven keeps downloaded dependencies in your local repository. Dependencies change rarely, so their download is cached; your source changes on every build, so it comes last.

Here is the Dockerfile from Docker's own Compose quickstart, with comments moved onto their own lines (a `#` comment must start its own line in a Dockerfile):

```dockerfile
# syntax=docker/dockerfile:1

# Base image: the starting layers
FROM python:3.12-alpine

# Directory that the following instructions work in
WORKDIR /code

# Environment variables stored in the image
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Build-time command: its result becomes a layer
RUN apk add --no-cache gcc musl-dev linux-headers

# Copy only the dependency list first...
COPY requirements.txt .

# ...so this slow step is cached until the list changes
RUN pip install -r requirements.txt

# Now copy the rest of the source, which changes most often
COPY . .

# Documentation: the app listens on 5000
EXPOSE 5000

# The default command when a container starts
CMD ["flask", "run", "--debug"]
```

Swap the two `COPY` steps around (copy everything, then install) and every source edit forces a full reinstall of dependencies. That single ordering mistake is the most common cause of slow Docker builds.

## The Dockerfile instructions you need first

| Instruction | What it does | Watch out |
| --- | --- | --- |
| `FROM` | Picks the base image; a Dockerfile starts here | A moving tag such as `latest` changes under you; see the tags section below |
| `WORKDIR` | Sets the directory for later instructions | Creates the directory if it does not exist |
| `COPY` | Copies files from the **build context** into the image | It cannot see anything outside the context |
| `RUN` | Runs a command while building; the result becomes a layer | Runs at build time, not when the container starts |
| `ENV` | Sets an environment variable that stays in the image | Anyone with the image can read it, so never put a secret here |
| `EXPOSE` | Records which port the app listens on | Documentation only. The reference says it does not publish the port |
| `CMD` | The default command, which `docker run` arguments can replace | Only the last `CMD` in a file takes effect |
| `ENTRYPOINT` | The program that always runs, with `CMD` supplying default arguments | Set it when the image is one tool, such as a CLI |

Write `CMD` and `ENTRYPOINT` in **exec form**, a JSON array such as `["flask", "run"]`, so the program runs directly and receives stop signals. Shell form runs your command inside a shell instead (Dockerfile reference).

### The build context and .dockerignore

When you run a build, you hand Docker a **context**: the folder whose files the builder may copy from. `COPY` can only reach files inside it. A `.dockerignore` file lists paths that are left out of the context. The Compose quickstart's version excludes `.env`, `*.pyc`, `__pycache__`, and `redis-data`. Excluding files does three jobs: the build sends less data and finishes faster, changes to ignored files do not invalidate the cache, and files that hold secrets never enter the image. Layers are immutable, so a secret copied in one step and deleted in a later step is still present in the earlier layer.

### Multi-stage builds

Analogy: build with the full JDK and Maven, run with only a JRE. A **multi-stage build** has several `FROM` lines. Early stages hold compilers and test tools; the last stage starts from a small runtime image and copies in only the built output.

```
# Pseudo-Dockerfile: the shape only, not a runnable file
FROM <image with build tools> AS build
# ... compile and package the application ...

FROM <small runtime image>
COPY --from=build <path of the built output> <path in the final image>
CMD [ ... ]
```

Only the last stage becomes the image you ship. The build tools stay behind in a stage that is not shipped, which shrinks the image and leaves out tools the running application does not need.

## Registries, repositories, and tags

A **registry** stores images and serves them to whoever asks; a **repository** is one image's collection of versions inside it; a **tag** names one version. An image reference looks like `name:tag`, optionally with a registry host and a namespace in front. Analogy: Maven Central, where group, artifact, and version identify a JAR.

**A tag is a label that can be moved to point at a different image.** `latest` is only a tag name, not a promise of "newest". Kubernetes' image documentation advises against `:latest` in production because it is harder to tell which version is running and harder to roll back, and describes pinning an exact image by digest (a content hash) when you need certainty. Pin an explicit version tag in anything you deploy.

## Running a container

`docker container run` (usually written `docker run`) creates a container from an image and starts it. If the image is not on the machine, Docker pulls it first.

| Flag | Meaning | Example |
| --- | --- | --- |
| `-d`, `--detach` | Run in the background and print the container ID | `docker run -d nginx:alpine` |
| `-p HOST:CONTAINER` | Publish a container port on the host. **Host port first.** | `-p 8080:80` reaches container port 80 at host port 8080 |
| `--name` | Give the container a name you can use in later commands | `--name test` |
| `--rm` | Remove the container (and its anonymous volumes) when it exits | `docker run --rm ...` |
| `-e`, `--env` | Set an environment variable | `--env VAR1=value1` |
| `-v` | Mount a volume or a host folder | `-v awesome:/bar` |
| `--network` | Join a network | `--network my-net` |
| `-it` | Keep input open and attach a terminal | `docker run -it ubuntu ...` |

The examples above follow the forms in Docker's `docker run` reference. The [first Dockerfile walkthrough](/infrastructure/walkthroughs/3-write-and-run-your-first-dockerfile/) uses several of these flags.

A container lives exactly as long as its main process. When that process exits, the container stops but still exists until removed:

```
 image --docker run--> container (running) --process exits or docker stop--> container (exited)
                                                                                   |
                                                                          docker rm removes it;
                                                                          its writable layer goes too
```

`docker rm` refuses to remove a running container unless you add `--force` (it sends the main process a kill signal). `docker rm --volumes` also removes the container's anonymous volumes, but named volumes are kept.

### Exit codes that tell you where it went wrong

`docker run` reports its own failures with reserved exit codes; anything else is the exit code of the program inside (Docker's "Running containers" page).

| Exit code | Meaning |
| --- | --- |
| 125 | The error came from Docker itself, for example a bad flag |
| 126 | The command inside the container was found but cannot be invoked |
| 127 | The command inside the container cannot be found |
| Anything else | The exit code of the program that ran inside |

## Where data lives

| Place | Survives `docker rm`? | Use it for |
| --- | --- | --- |
| The container's writable layer | No | Scratch files you can afford to lose |
| A **named volume** | Yes (until you delete the volume) | A database's data directory, anything that must persist. Docker's documentation describes volumes as the preferred mechanism for persisting data |
| A **bind mount** | Yes (it is a folder on the host) | Sharing source code from your machine into a container while developing. It ties the container to the host's folder layout |

Rule of thumb: if losing it would hurt, it belongs in a volume, and the volume needs a backup plan because Docker does not back it up for you.

## Networks and ports

Every container joins a network. Two kinds matter to a beginner:

| | Default bridge network | User-defined bridge network |
| --- | --- | --- |
| Containers reach each other by name | **No**, only by IP address | **Yes**, through Docker's built-in DNS (which containers see at `127.0.0.11`) |
| How you get it | Automatically, if you name no network | `docker network create` (default driver `bridge`), or Compose creates one for you |
| Use it | Rarely | For any app made of more than one container |

The default network gives you no name resolution, and that is why "it worked when I used the IP, but the name fails" is such a common first bug.

**A container port is reachable from the host only if you publish it** with `-p`. Other containers on the same user-defined network can reach it directly on the container's own port without any publishing. So the port number you type depends on where you are standing:

| From where | Address to use for a database container named `db` listening on 3306 |
| --- | --- |
| Another container on the same user-defined network | `db:3306` |
| Your host machine, after `-p 3307:3306` | `localhost:3307` |
| Inside the database container itself | `localhost:3306` |

For a Spring Boot application in a container, that is the difference between a datasource URL that names the service (`db`) and one that says `localhost`. Inside the application's container, `localhost` is the application itself.

## Docker Compose: many containers, one file

Running three containers with three long `docker run` commands and keeping the flags straight is error-prone. **Docker Compose** describes the whole application in one file (`compose.yaml`) and starts it with `docker compose up`.

Analogy: a `docker-compose.yml`-style file is to containers what a Spring Boot configuration class is to beans: it declares the pieces and how they connect, and the tool wires them.

Compose creates one default network for the project and attaches every service to it, so services reach each other by **service name**. The `ports` entry uses the same `HOST:CONTAINER` order as `docker run -p`.

Start order is not readiness. A plain `depends_on` only orders startup: the database container can be started but still not accepting connections when the application tries to connect. The Compose file reference lets you make a service wait until its dependency's **healthcheck** passes, using `depends_on` with `condition: service_healthy`. The [Compose walkthrough](/infrastructure/walkthroughs/4-run-a-multi-container-app-with-compose/) builds exactly that.

| | `docker run` | Docker Compose |
| --- | --- | --- |
| Unit of work | One container | A whole application: services, networks, volumes |
| Configuration lives in | A command line you must remember | A file you commit to Git |
| Container-to-container names | You create the network and attach each container | Automatic for the project's network |
| Best for | One-off tests, debugging | Local development and small single-machine setups |

Compose runs your containers on one machine. When you need containers spread across many machines with self-healing and rolling updates, that is the job of an orchestrator; the [Kubernetes page](/infrastructure/concepts/kubernetes-objects-and-the-control-loop/) picks up from here.

## Common mistakes and how to recover

| Mistake | What happens | Recovery |
| --- | --- | --- |
| Writing `-p 80:8080` when you meant host 8080 to container 80 | The wrong port answers or nothing does | Read it as `-p HOST:CONTAINER`; stop the container (`docker stop`), remove it, and run again with the right order |
| App inside the container listens only on `127.0.0.1` | The published port accepts the connection but the app never answers | Make the app listen on `0.0.0.0` (the Compose quickstart's Dockerfile does this with `ENV FLASK_RUN_HOST=0.0.0.0`) |
| Copying all source before installing dependencies | Every edit reinstalls everything | Copy the dependency file, install, then copy the rest |
| Expecting `EXPOSE` to publish a port | The host cannot reach the app | Add `-p`, or `ports:` in Compose |
| Storing data only in the container | The data vanishes with `docker rm` | Mount a named volume at the data directory |
| Using `localhost` to reach another container | Connection refused | Put both on a user-defined network and use the other container's name |
| Relying on `depends_on` alone for readiness | The app starts before the database can answer | Add a healthcheck and `condition: service_healthy` |
| Using a moving tag like `latest` | A rebuild changes behavior without any change from you | Pin an explicit version tag |

The [diagnose-from-symptoms page](/infrastructure/concepts/diagnose-from-symptoms/) has the ordered checks for when a container will not start or cannot be reached.

> TODO(test): With the engine started, run `docker network ls` (the reference shows three predefined networks: `bridge`, `none`, and `host`) and `docker volume ls`, and confirm the behavior described in the tables above.
