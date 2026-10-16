---
title: "Kubernetes objects and the control loop"
description: "The desired-state idea behind Kubernetes, the cluster's parts, and the core objects (Pod, Deployment, Service, ConfigMap, Secret) with the labels that connect them."
domain: infrastructure
pageType: explanation
status: draft
safetyCritical: false
sources:
  - title: "Kubernetes overview"
    url: "https://kubernetes.io/docs/concepts/overview/"
    publisher: "Kubernetes documentation"
  - title: "Cluster architecture: Kubernetes components"
    url: "https://kubernetes.io/docs/concepts/overview/components/"
    publisher: "Kubernetes documentation"
  - title: "Controllers"
    url: "https://kubernetes.io/docs/concepts/architecture/controller/"
    publisher: "Kubernetes documentation"
  - title: "Objects in Kubernetes"
    url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/"
    publisher: "Kubernetes documentation"
  - title: "Labels and selectors"
    url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/"
    publisher: "Kubernetes documentation"
  - title: "Namespaces"
    url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/"
    publisher: "Kubernetes documentation"
  - title: "Pods"
    url: "https://kubernetes.io/docs/concepts/workloads/pods/"
    publisher: "Kubernetes documentation"
  - title: "Pod lifecycle"
    url: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
    publisher: "Kubernetes documentation"
  - title: "Deployments"
    url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
    publisher: "Kubernetes documentation"
  - title: "Service"
    url: "https://kubernetes.io/docs/concepts/services-networking/service/"
    publisher: "Kubernetes documentation"
  - title: "DNS for Services and Pods"
    url: "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/"
    publisher: "Kubernetes documentation"
  - title: "Ingress"
    url: "https://kubernetes.io/docs/concepts/services-networking/ingress/"
    publisher: "Kubernetes documentation"
  - title: "ConfigMaps"
    url: "https://kubernetes.io/docs/concepts/configuration/configmap/"
    publisher: "Kubernetes documentation"
  - title: "Secrets"
    url: "https://kubernetes.io/docs/concepts/configuration/secret/"
    publisher: "Kubernetes documentation"
  - title: "Resource management for Pods and containers"
    url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    publisher: "Kubernetes documentation"
  - title: "Configure liveness, readiness and startup probes"
    url: "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
    publisher: "Kubernetes documentation"
  - title: "Images"
    url: "https://kubernetes.io/docs/concepts/containers/images/"
    publisher: "Kubernetes documentation"
  - title: "kubectl quick reference"
    url: "https://kubernetes.io/docs/reference/kubectl/quick-reference/"
    publisher: "Kubernetes documentation"
  - title: "Hello Minikube"
    url: "https://kubernetes.io/docs/tutorials/hello-minikube/"
    publisher: "Kubernetes documentation"
  - title: "kind quick start"
    url: "https://kind.sigs.k8s.io/docs/user/quick-start/"
    publisher: "Kubernetes SIGs (kind)"
tags: [kubernetes, orchestration, pods, deployments, services, configmap, secret, control-loop]
sidebar:
  order: 53
---

Running one container is a `docker run`. Running fifty across several machines, replacing the ones that crash, and updating them without downtime is a different job, called **orchestration**. Kubernetes is the most widely used orchestrator. It looks huge until you see that it is built on one idea repeated many times.

Details on this page were read against the Kubernetes documentation on 2026-09-26. Kubernetes releases often, so check the docs for your cluster's version before relying on an exact field or default.

## The one idea: desired state and a control loop

You do not tell Kubernetes what to do. You tell it **what you want to be true**: "three copies of this container, reachable on port 80". Small programs called **controllers** run in a loop forever, compare what you asked for with what is actually running, and act to close the gap.

Analogy: a room thermostat. You set the target temperature. The thermostat does not need instructions to heat; it measures, compares, and switches the heating on or off to close the difference. The Kubernetes documentation uses this same comparison for controllers.

Analogy for a Spring Boot developer: each controller is like a tiny always-running service with a `while (true)` loop that reads the desired state, reads the observed state, and fixes the difference. This is why you can delete a Pod and watch a new one appear: a controller noticed the count was below what you asked for.

Every object therefore has two halves:

| Half | Who writes it | Meaning |
| --- | --- | --- |
| `spec` | You | The desired state |
| `status` | Kubernetes | The current state, as observed |

When something is wrong, the whole debugging skill is reading both halves and asking why they differ. The [diagnose-from-symptoms page](/infrastructure/concepts/diagnose-from-symptoms/) applies that to real symptoms.

## The cluster's parts

A cluster is a **control plane** (the brain) and a set of **nodes** (the machines that run your containers).

```
 CONTROL PLANE                                   NODE (a worker machine)
 +-------------------------------------+         +------------------------------------+
 | kube-apiserver   the front door:    |         | kubelet      starts and watches    |
 |                  everything talks   |<------->|              the containers        |
 |                  to it (kubectl too)|         | container    actually runs them    |
 | etcd             the database of    |         | runtime                             |
 |                  all cluster state  |         | kube-proxy   makes Service         |
 | kube-scheduler   picks a node for   |         |              addresses work        |
 |                  each new Pod       |         | [Pod] [Pod] [Pod]                   |
 | kube-controller- runs the control   |         +------------------------------------+
 | manager          loops              |
 +-------------------------------------+
```

You interact with only one component: the **API server**. `kubectl` is a command-line client for its API. You never SSH into the control plane to make a change.

## The shape of every Kubernetes file

Every object you write has the same top-level fields (Kubernetes' "Objects" page): `apiVersion`, `kind`, `metadata` (the name and labels), and `spec` (the desired state). Here is the Deployment example from the Kubernetes documentation, with what each part is for:

```yaml
# Which API group and version defines this kind of object
apiVersion: apps/v1
# The type of object
kind: Deployment
metadata:
  # The name, unique among Deployments in its namespace
  name: nginx-deployment
  labels:
    app: nginx
spec:
  # Desired state: three identical Pods
  replicas: 3
  # How the Deployment finds the Pods it owns
  selector:
    matchLabels:
      app: nginx
  # The blueprint for each Pod
  template:
    metadata:
      # These labels must match the selector above
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

`kubectl apply -f <file>` sends that file to the API server. The word **apply** matters: you are declaring the state you want, and running the same command again with the same file changes nothing.

## The core objects

| Object | What it is | Analogy |
| --- | --- | --- |
| **Pod** | The smallest deployable unit: one or more containers that share one network address and can share storage. Pods are disposable; Kubernetes replaces them rather than repairing them. | One running instance of your application (one JVM), plus any helper process beside it |
| **ReplicaSet** | Keeps a stated number of identical Pods running | The instance-count setting on a scaling group |
| **Deployment** | Manages ReplicaSets so you can roll out a new version gradually and roll back. **You almost always create Deployments, not bare Pods.** | The deployment strategy for a service |
| **Service** | A stable address and name in front of a changing set of Pods | A load-balanced hostname such as `orders` that survives instances coming and going |
| **Ingress** (or Gateway API) | Rules for routing outside HTTP traffic to Services | A reverse proxy in front of your apps |
| **ConfigMap** | Non-secret configuration as key-value pairs | `application.yml` |
| **Secret** | Sensitive values such as passwords and tokens | A secrets file, handled with care |
| **Namespace** | A named partition of the cluster; most names are unique only within one | A package: names in different packages do not clash |

Notes on the ones people get wrong:

- **Pod versus Deployment.** A bare Pod that dies stays dead. A Deployment owns a ReplicaSet that owns the Pods, so if a Pod dies or a node fails, the ReplicaSet creates a replacement. When a Deployment is deleted, its Pods are deleted with it (the `kubectl delete` reference describes this cascading behavior).
- **Ingress.** Kubernetes' documentation describes Ingress as frozen, with new features going to the Gateway API. Ingress and the Gateway API are beyond level 1; at this level you reach applications with `kubectl port-forward` instead.
- **Namespaces.** If you do not pick one, commands act on the `default` namespace. `kubectl get pods -n my-namespace` and `kubectl get pods -A` (all namespaces) are in the kubectl quick reference. A common reason "my Pod has vanished" is that you are looking in the wrong namespace.

## Labels and selectors: the glue

Objects are connected by **labels**, not by names. A label is a key-value pair you attach to an object (`app: nginx`). A **selector** is a query over labels. Analogy: hashtags. A Deployment or a Service says "I mean everything tagged `app=nginx`", and whatever carries that tag is included, whether it exists yet or not.

```
 Deployment  --selector app=nginx-->  Pods labelled app=nginx  <--selector app=nginx--  Service
 (owns and replaces the Pods)                                                        (sends traffic to whichever
                                                                                      Pods carry the label)
```

Two rules follow, and breaking either causes very common failures:

1. The Deployment's `spec.selector.matchLabels` must match the labels in its `spec.template.metadata.labels`, or it cannot find the Pods it creates. (The Deployment documentation states this directly.) Kubernetes also adds a `pod-template-hash` label to distinguish Pods from different revisions.
2. A Service that selects `app=nginx` sends traffic only to Pods **carrying that label and passing their readiness checks**. A typo in the label gives you a Service with no Pods behind it.

## Services: a stable address for disposable Pods

Pods get new IP addresses every time they are replaced, so nothing can depend on a Pod's address. A **Service** solves that: it has one stable virtual IP and DNS name, and it sends traffic to the healthy Pods that match its selector.

The Service example from the Kubernetes documentation:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

`port` is the port the **Service** listens on. `targetPort` is the port the **container** listens on. They are different fields because they are different things, and mixing them up is a classic bug.

| Service type | Reachable from | Use it for |
| --- | --- | --- |
| `ClusterIP` (the default) | Inside the cluster only | Service-to-service traffic |
| `NodePort` | Outside, on a port opened on every node | Quick access, and a building block for the next type |
| `LoadBalancer` | Outside, through a load balancer the cloud provider creates | Exposing a Service on a cloud cluster. On a local cluster it may stay `<pending>` (the Hello Minikube tutorial shows this) |
| `ExternalName` | Inside, as an alias for an outside DNS name | Giving a stable in-cluster name to something outside the cluster |

**Service names work as host names inside the cluster.** Cluster DNS gives a Service a name of the form `my-svc.my-namespace.svc.cluster.local` (with the default cluster domain). From a Pod in the same namespace, the short name `my-svc` also works, because the kubelet sets up each Pod's `/etc/resolv.conf` with search domains that expand it. A Spring Boot service in a Pod calls another service at `http://orders` (a Service named `orders`), using the Service name where you would have used `localhost` and a port number on your laptop.

## Configuration: ConfigMap and Secret

Never bake environment-specific values into the image. Keep the image the same everywhere and inject configuration at runtime, as you would with Spring profiles and environment variables.

| | ConfigMap | Secret |
| --- | --- | --- |
| Holds | Non-confidential configuration | Passwords, tokens, keys |
| Delivered to a Pod as | Environment variables, command arguments, or files in a mounted volume | The same ways |
| Stored | In the cluster database | In the cluster database |
| Spring analogy | `application.yml` and environment properties | A credentials file |

:::caution[A Secret is not encrypted by default]
The values in a Secret's manifest are **base64-encoded, which is an encoding, not encryption**; anyone can decode it. The Kubernetes documentation states that Secrets are, by default, stored unencrypted in the API server's data store (etcd), and that anyone with API access can read them. Treat access to Secrets as access to the passwords. Never commit a Secret manifest with real values to Git.
:::

## Health, resources, and images

**Probes.** Kubernetes checks your containers with three kinds of probe:

| Probe | Question | If it fails |
| --- | --- | --- |
| Liveness | "Is this container stuck?" | The container is restarted |
| Readiness | "Can this Pod accept traffic right now?" | The Pod is removed from its Services' endpoints until it passes; it is not restarted |
| Startup | "Has this slow application finished starting?" | Other probes wait until it passes |

A Spring Boot application's HTTP health endpoint, the kind Actuator provides, is a natural target for these. Analogy: liveness is "is the process alive at all", readiness is "is the shop open for customers". A Pod that is alive but not ready is running yet receives no traffic; that state shows as `READY 0/1` and is a frequent cause of "the Service does not answer".

**Requests and limits.** A container states a **request** (what it needs, which the scheduler uses to choose a node) and a **limit** (the most it may use). A container that goes over its memory limit can be killed for running out of memory, shown as `OOMKilled`; going over a CPU limit slows it down instead. A request that no node can satisfy leaves the Pod `Pending`.

**Image pull policy.** Kubernetes decides whether to pull an image from the tag: an image with the `:latest` tag (or no tag) is pulled every time, while a specific tag is pulled only if it is not already on the node. Use explicit version tags, as the Kubernetes documentation advises, so you know what is running.

## Pod lifecycle

A Pod's `phase` is a one-word summary; each container inside has its own state.

| Phase | Meaning (Kubernetes documentation) |
| --- | --- |
| `Pending` | Accepted by the cluster, but its containers are not all running yet. Includes time waiting to be scheduled and time downloading images |
| `Running` | Bound to a node, all containers created, at least one still running or starting |
| `Succeeded` | All containers ended successfully and will not be restarted |
| `Failed` | All containers ended, at least one in failure |
| `Unknown` | The state could not be obtained |

Containers are `Waiting`, `Running`, or `Terminated`. When a container keeps crashing, Kubernetes restarts it with a growing delay between attempts, and `kubectl get pods` shows `CrashLoopBackOff`. That status means "restarting repeatedly and failing", not a specific cause: find the cause in the logs (`kubectl logs my-pod --previous` shows the previous attempt) and in `kubectl describe pod`.

> TODO(source): the exact maximum delay of the restart back-off for a crashing container, from the Pod lifecycle documentation section on how Pods handle problems with containers.

## Changing a running app: rolling updates and rollback

To update, change the image in the Deployment. The Deployment creates a new ReplicaSet, scales it up while scaling the old one down, and replaces Pods gradually so the application stays available. These commands come from the Kubernetes documentation and the kubectl quick reference:

| Task | Command |
| --- | --- |
| Watch a rollout | `kubectl rollout status deployment/nginx-deployment` |
| Change the container image | `kubectl set image deployment/nginx-deployment nginx=nginx:1.16.0` |
| See earlier revisions | `kubectl rollout history deployment/nginx` |
| Go back one revision | `kubectl rollout undo deployment/nginx-deployment` |
| Restart the Pods with a fresh rollout, without editing your manifest | `kubectl rollout restart deployment/nginx` |

## Where you will practise: local clusters

You do not need a cloud account to learn Kubernetes. Three tools run a real cluster on your own machine.

| Tool | How it works | You need | Create and delete |
| --- | --- | --- | --- |
| **kind** | Runs the cluster's nodes as Docker containers | Docker | `kind create cluster` and `kind delete cluster` |
| **minikube** | Starts a small cluster on your machine | A container or VM driver | `minikube start` and `minikube delete` |
| **Docker Desktop's Kubernetes** | A cluster built into Docker Desktop | Docker Desktop | Turned on and off in its settings (follow Docker's documentation) |

The walkthrough uses kind: its only prerequisite is Docker, and deleting the cluster leaves nothing behind. minikube and Docker Desktop's cluster work for the same exercises. kind, minikube, and the Docker Desktop option all came from their own documentation, read on 2026-09-26; on the machine used for this page, `kubectl version --client` reported `v1.34.1` and neither `kind` nor `minikube` was installed.

### Always know which cluster you are talking to

`kubectl` reads a configuration file that can hold several **contexts**, each one a cluster plus a user. Commands go to the **current context**. Applying a manifest to the wrong cluster is a serious mistake, so check first:

| Task | Command |
| --- | --- |
| List contexts | `kubectl config get-contexts` |
| Show the current one | `kubectl config current-context` |
| Switch | `kubectl config use-context my-cluster-name` |

A kind cluster named `kind` uses the context `kind-kind`.

## From Compose to Kubernetes

If you know Docker Compose, this is the translation:

| In Compose you have | In Kubernetes you write |
| --- | --- |
| A service that runs your image | A Deployment (which creates Pods) |
| Other services reaching it by service name | A Service, whose name cluster DNS resolves |
| `ports:` to reach it from your machine | A Service type for outside access, or `kubectl port-forward` while developing |
| `environment:` values | A ConfigMap (and a Secret for sensitive values) |
| `healthcheck:` | Liveness and readiness probes |

The [Kubernetes walkthrough](/infrastructure/walkthroughs/5-deploy-a-first-app-to-a-local-kubernetes-cluster/) builds a Deployment and a Service on a local kind cluster, and the [cheat sheet](/infrastructure/cheat-sheet/) lists the `kubectl` commands by how often you will need them.

> TODO(test): Run every `kubectl` command in this page's tables against a local cluster and confirm the output.
