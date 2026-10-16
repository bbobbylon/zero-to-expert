---
title: "Diagnose from symptoms: network, containers, clusters, pipelines"
description: "Decision tables that turn a symptom into ordered checks, a likely cause, and a fix, for name resolution, routing, ports, TLS, HTTP, Docker, Kubernetes, and CI."
domain: infrastructure
pageType: explanation
status: draft
safetyCritical: false
sources:
  - title: "nslookup"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup"
    publisher: "Microsoft Learn"
  - title: "ipconfig"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig"
    publisher: "Microsoft Learn"
  - title: "ping"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping"
    publisher: "Microsoft Learn"
  - title: "tracert"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert"
    publisher: "Microsoft Learn"
  - title: "netstat"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat"
    publisher: "Microsoft Learn"
  - title: "Test-NetConnection"
    url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection"
    publisher: "Microsoft Learn"
  - title: "curl manual page"
    url: "https://curl.se/docs/manpage.html"
    publisher: "curl project"
  - title: "dig and the BIND 9 manual pages"
    url: "https://bind9.readthedocs.io/en/latest/manpages.html"
    publisher: "Internet Systems Consortium (BIND 9)"
  - title: "ss(8) - Linux manual page"
    url: "https://man7.org/linux/man-pages/man8/ss.8.html"
    publisher: "Linux man-pages project"
  - title: "Domain Names - Implementation and Specification (RFC 1035)"
    url: "https://www.rfc-editor.org/rfc/rfc1035.html"
    publisher: "IETF (RFC Editor)"
  - title: "Negative Caching of DNS Queries (RFC 2308)"
    url: "https://www.rfc-editor.org/rfc/rfc2308.html"
    publisher: "IETF (RFC Editor)"
  - title: "Transmission Control Protocol (TCP) (RFC 9293)"
    url: "https://www.rfc-editor.org/rfc/rfc9293.html"
    publisher: "IETF (RFC Editor)"
  - title: "The Transport Layer Security (TLS) Protocol Version 1.3 (RFC 8446)"
    url: "https://www.rfc-editor.org/rfc/rfc8446.html"
    publisher: "IETF (RFC Editor)"
  - title: "Internet X.509 Public Key Infrastructure Certificate and CRL Profile (RFC 5280)"
    url: "https://www.rfc-editor.org/rfc/rfc5280.html"
    publisher: "IETF (RFC Editor)"
  - title: "HTTP Semantics (RFC 9110)"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
    publisher: "IETF (RFC Editor)"
  - title: "Dynamic Configuration of IPv4 Link-Local Addresses (RFC 3927)"
    url: "https://www.rfc-editor.org/rfc/rfc3927.html"
    publisher: "IETF (RFC Editor)"
  - title: "Running containers (exit status)"
    url: "https://docs.docker.com/engine/containers/run/"
    publisher: "Docker Docs"
  - title: "docker container ls"
    url: "https://docs.docker.com/reference/cli/docker/container/ls/"
    publisher: "Docker Docs"
  - title: "docker container logs"
    url: "https://docs.docker.com/reference/cli/docker/container/logs/"
    publisher: "Docker Docs"
  - title: "docker container exec"
    url: "https://docs.docker.com/reference/cli/docker/container/exec/"
    publisher: "Docker Docs"
  - title: "docker container inspect"
    url: "https://docs.docker.com/reference/cli/docker/container/inspect/"
    publisher: "Docker Docs"
  - title: "docker compose up"
    url: "https://docs.docker.com/reference/cli/docker/compose/up/"
    publisher: "Docker Docs"
  - title: "docker compose down"
    url: "https://docs.docker.com/reference/cli/docker/compose/down/"
    publisher: "Docker Docs"
  - title: "Docker Compose quickstart"
    url: "https://docs.docker.com/compose/gettingstarted/"
    publisher: "Docker Docs"
  - title: "Networking overview"
    url: "https://docs.docker.com/engine/network/"
    publisher: "Docker Docs"
  - title: "Debug Pods"
    url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/"
    publisher: "Kubernetes documentation"
  - title: "Debug Services"
    url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/"
    publisher: "Kubernetes documentation"
  - title: "Get a shell to a running container and debug running Pods"
    url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/"
    publisher: "Kubernetes documentation"
  - title: "Use port forwarding to access applications in a cluster"
    url: "https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/"
    publisher: "Kubernetes documentation"
  - title: "Pod lifecycle"
    url: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
    publisher: "Kubernetes documentation"
  - title: "Resource management for Pods and containers"
    url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    publisher: "Kubernetes documentation"
  - title: "Images (Kubernetes)"
    url: "https://kubernetes.io/docs/concepts/containers/images/"
    publisher: "Kubernetes documentation"
  - title: "kubectl quick reference"
    url: "https://kubernetes.io/docs/reference/kubectl/quick-reference/"
    publisher: "Kubernetes documentation"
  - title: "Enabling debug logging"
    url: "https://docs.github.com/en/actions/how-tos/monitor-workflows/enable-debug-logging"
    publisher: "GitHub Docs"
  - title: "Workflow syntax for GitHub Actions"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
    publisher: "GitHub Docs"
  - title: "Using secrets in GitHub Actions"
    url: "https://docs.github.com/en/actions/how-tos/security-for-github-actions/security-guides/using-secrets-in-github-actions"
    publisher: "GitHub Docs"
  - title: "Events that trigger workflows"
    url: "https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows"
    publisher: "GitHub Docs"
tags: [troubleshooting, diagnosis, networking, dns, tls, docker, kubernetes, ci-cd]
sidebar:
  order: 55
---

"It does not work" is not a symptom. A symptom is something you can observe: a command's output, a status column, an exit code, a log line. This page teaches a method and gives you decision tables that start from what you observed. Each row reads the same way: **what you see, the checks to run in order, the likely cause, the fix.**

Command wording and output shown as observed were recorded on a Windows 11 machine on 2026-09-26. Rows that quote no output were built from the documentation only; the closing note lists what still needs testing.

## The method

Analogy: plumbing. When water does not come out of the tap, you check the tap, then the pipe, then the mains, in order from the point of use back toward the source. You do not start by replacing the boiler.

1. **Write down the exact symptom**, including the full error text and where you saw it.
2. **Start at the lowest rung of the ladder that could explain it, and climb one rung at a time.** A problem at a lower rung makes every check above it fail, so skipping ahead wastes time.
3. **Change one thing at a time**, and re-run the same check after each change.
4. **Compare a working case with a failing one**: another machine, another host name, the previous version. The difference is the cause.
5. **Read before you guess.** Logs, `describe` output, and events usually name the cause outright.

## The ladder for "I cannot reach it"

Every request from a client to a service crosses these rungs in order.

| Rung | Question | Windows command | Linux or macOS command | A pass looks like |
| --- | --- | --- | --- | --- |
| 1. Name | Does the name resolve to an address? | `nslookup example.com` | `dig example.com` | `Name:` and `Address:` lines |
| 2. Route | Is that address reachable at all? | `ping example.com`, `tracert example.com` | `ping` | Replies from the address |
| 3. Port | Is something answering on the port? | `Test-NetConnection example.com -Port 443` | `curl -v` shows the connection | `TcpTestSucceeded : True` |
| 4. TLS | Does the secure handshake succeed? | `curl.exe -v https://example.com/` | `curl -v https://example.com/` | The handshake completes with no certificate error |
| 5. Application | Does the app return what you expect? | `curl.exe -I https://example.com/` | `curl -I https://example.com/` | A `2xx` status line |

Find out what is listening on your own machine with `netstat -ano` on Windows or `ss` on Linux. Both are in the tables below.

:::tip[Two commands that split the problem in half]
`ping` by IP address versus by name (Microsoft's documentation states it directly): if pinging the IP address works but pinging the name does not, you have a **name resolution problem**, rung 1. And `curl -v` prints each stage (connect, TLS, request, response), so the last stage you see tells you which rung failed.
:::

## Rung 1: name resolution

| What you see | Ordered checks | Likely cause | Fix |
| --- | --- | --- | --- |
| `nslookup` prints `Non-existent domain` (the observed line was `*** router.home.local can't find does-not-exist.invalid: Non-existent domain`) | 1. Spell-check the name. 2. Find who is authoritative: `nslookup -type=NS example.com`. 3. Ask that server directly: `nslookup name server-name`. | The name has a typo, or no such record exists. It can also be a **negative-cached** miss: you looked the name up before creating the record (RFC 2308) | Fix the spelling; create the record; if the record exists on the authoritative server, wait for the negative-cache time (from the zone's SOA record) or query a resolver that has not cached the miss |
| You changed a record but some machines still get the old address | 1. Ask the authoritative server directly. 2. Compare with `nslookup name` through your resolver. 3. Check the record's TTL | Resolvers cache an answer until its TTL runs out (RFC 1035) | Wait out the TTL. For your own machine, `ipconfig /flushdns` clears the local resolver cache, including negative entries (Microsoft's `ipconfig` documentation). Next time, lower the TTL before a planned change |
| `nslookup` gets no answer or takes very long | 1. `ipconfig /all` and read the DNS servers listed. 2. Ask a different resolver: `nslookup example.com resolver-address`. | The configured resolver is unreachable or wrong | Correct the DNS server settings, or use a working resolver |
| Pinging the IP works, pinging the name fails | Same as above | Name resolution, not the network (Microsoft's `ping` documentation) | Fix DNS rather than routing |
| The name resolves, but to an address you did not expect | 1. `nslookup name`. 2. Check for both A and AAAA records. 3. Try `ping /4 name` and `ping /6 name` | A stale cached answer, the wrong record, or one address family being broken | Correct the record; wait out the TTL; fix whichever family fails |
| A server-side answer says `SERVFAIL` or `REFUSED` | Ask a different resolver; ask the authoritative server | The resolver could not get a valid answer, or will not answer you (RFC 1035 result codes) | Use another resolver; fix the zone or its name servers |

`dig` is the Linux and macOS counterpart of `nslookup`, from the BIND 9 tools. It was not installed on the Windows 11 machine used for this chapter, so its output is not reproduced here.

## Rung 2: is the address reachable

| What you see | Ordered checks | Likely cause | Fix |
| --- | --- | --- | --- |
| `ipconfig` shows an address starting `169.254.` | 1. Check the cable or Wi-Fi. 2. Look for a DHCP server on the network. 3. Try `ipconfig /release` then `ipconfig /renew` (the release discards the current address configuration, so do not run it over a remote session) | The machine gave itself a link-local address because no DHCP answer arrived (RFC 3927) | Restore the connection to the DHCP server. This is a network problem, not an application problem |
| `ipconfig` shows no default gateway | Read the adapter's block in `ipconfig` | The machine can reach only its own subnet | Correct the network configuration or DHCP scope |
| Target is in the same subnet on paper but the machine cannot reach it | Recompute with the AND method on the [addresses page](/infrastructure/concepts/addresses-ports-and-the-network-path/) | A wrong mask, so the target is not actually in the subnet, or two networks use the same range | Correct the mask or the plan; move one network to a different range |
| `ping` prints `Request timed out` | 1. Ping the default gateway. 2. `tracert` the target. 3. Test the real port (rung 3) | No reply within the timeout (4 seconds by default): host down, no route, or ICMP filtered | Judge by rung 3, because **a failed ping is weaker evidence than a success**: a firewall can block ping while the service works |
| `tracert` shows `*` in the middle and then the destination answers | Nothing to fix | Some routers do not send the message tracert relies on and are invisible to it (Microsoft's `tracert` documentation) | Ignore it. Asterisks only matter if they run to the end and the destination never answers |
| `tracert` stops at one hop and shows only `*` afterwards | Which hop is the last good one? | Blocked or dead beyond that hop, or a firewall dropping the probes | Escalate to whoever owns that hop; test the service port |

## Rung 3: the port

`Test-NetConnection example.com -Port 443` reports `TcpTestSucceeded : True` when a TCP connection is made. With `-InformationLevel Quiet` it returns just true or false, which is handy in scripts (Microsoft's documentation).

| What you see | Ordered checks | Likely cause | Fix |
| --- | --- | --- | --- |
| `TcpTestSucceeded : False` and it fails **instantly** | On the server: is anything listening? `netstat -ano` on Windows, `ss -ltn` on Linux | Nothing is listening on that port, so the machine answers with a reset (RFC 9293) | Start the service; fix the port number |
| Fails only after a **long wait** | Check firewall rules and security rules between you and the server | A firewall is silently dropping the traffic, or the address is wrong | Allow the port from your source range; verify the address (rung 2) |
| Works from the same machine but not from another | On the server, read the **Local Address** column in `netstat -ano` | The service is listening only on `127.0.0.1`, not on all addresses | Make it listen on `0.0.0.0` or the right interface, and remember a container has its own `localhost` |
| `netstat -ano` shows the port `LISTENING` under an unexpected process ID | Look up the PID in Task Manager (Microsoft's `netstat` documentation) | Another program owns the port, so yours cannot start | Stop the other program or choose another port |
| The service worked yesterday, now refuses | Did the process crash or restart on a different port? Read its log | The process is down | Restart it and read why it stopped |

On Linux, `ss -ltn` lists listening TCP sockets with numeric ports; `-p` adds the owning process (`ss` manual page). On Windows, `netstat -ano` prints numeric addresses with process IDs; the state you want is `LISTEN` (Microsoft's `netstat` documentation).

## Rung 4: TLS

`curl.exe -v https://example.com/` prints each stage. Use `-k` (which disables certificate checking) only to learn whether a certificate problem is the cause, never as the fix.

| What you see | Ordered checks | Likely cause | Fix |
| --- | --- | --- | --- |
| A certificate error naming a **different host name** | Compare the name in the URL with the names the certificate covers | The certificate does not list the name you used, or you connected by IP address (SNI, RFC 6066) | Use a name the certificate covers; issue a certificate for the right name |
| Certificate **expired** | Read the certificate's dates | The validity period ended (RFC 5280) | Renew it and reload the service. Automate renewal (ACME) so this stops recurring |
| Certificate **not yet valid**, but the dates look fine | Check the clock on the client | The client's clock is wrong | Fix the clock |
| **Unknown issuer** or **self-signed** | Who issued it? Is the issuer in the client's trust store? | The client does not trust the signer | Use a certificate from a trusted authority. For development, install the authority into the client's trust store |
| Works in one client but fails in another (for example a browser works and a Java service fails) | Compare the two clients' trust stores and how they build the chain | The server sends an **incomplete chain** (missing intermediate), and only some clients can fill the gap | Configure the server to send the full chain |
| The handshake fails before any certificate error | Compare the TLS versions each side supports | No common protocol version or cipher (TLS negotiation, RFC 8446) | Update the older side or the server's TLS settings |

> TODO(test): Capture `curl.exe -v` output on this Windows machine for a valid certificate and for an expired or mismatched one, and record what it prints. The curl on this machine is 8.21.0 built with Schannel (from `curl.exe --version`), so the certificate lines may differ from builds that use OpenSSL.

## Rung 5: HTTP status codes

Once the connection and handshake succeed, the response code points at the right side of the problem (RFC 9110). Codes starting with 4 mean the request was at fault; codes starting with 5 mean the server (or something behind it) failed.

| Status | Meaning | Where to look |
| --- | --- | --- |
| 401 | The request lacks valid authentication | The credentials or token you sent |
| 403 | The server understood but refuses | Permissions and roles for this caller |
| 404 | No resource at that path | The URL, and any path the proxy adds or strips |
| 500 | The server hit an unexpected error | The application's own log |
| 502 Bad Gateway | A proxy or gateway received an **invalid response from the server behind it** | Is the backend running, and does it speak HTTP on the port the proxy uses? |
| 503 Service Unavailable | The server is temporarily unable to handle the request, for example overload or maintenance | With a proxy or load balancer, is at least one backend healthy? |
| 504 Gateway Timeout | A proxy or gateway got **no timely response** from the server behind it | Is the backend slow, unreachable, or the proxy's timeout too short? |

The pattern to remember: 502, 503, and 504 usually mean the front door works and something behind it does not. Start on the machine behind the proxy, at rung 3 from the proxy's point of view.

## Containers

For a container, the ladder starts with whether the engine is running at all.

| What you see | Ordered checks | Likely cause | Fix |
| --- | --- | --- | --- |
| `docker version` prints the client details and then `failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine` (observed 2026-09-26) | Is Docker Desktop running and finished starting? | The engine is stopped, so the client has nothing to talk to | Start Docker Desktop and wait until it reports running; run `docker version` again and look for the server section |
| `docker run` fails at once with exit status **125** | Read the message Docker printed | The failure is in Docker itself: a flag it does not know, or a conflict (Docker's exit-status documentation) | Fix the flag or name; `docker run --help` lists the flags |
| Exit status **126** | `docker container ls -a` shows the exit code | The command inside the image was found but cannot be run | Check its permissions and that it is a real executable for this image |
| Exit status **127** | Check the spelling of `CMD` or `ENTRYPOINT` and whether the program exists in the image | The command inside the image cannot be found | Correct the path; install the program in the image; use the exec form |
| The container starts and then exits immediately | 1. `docker container ls -a` for the exit code. 2. `docker container logs name` | Its main process finished (exit code 0) or crashed (non-zero). A container lives only as long as its main process | Run a long-lived main process; fix the crash the log shows |
| The container is running but `localhost:8080` in your browser fails | 1. Look at the PORTS column of `docker container ls`. 2. Check `-p HOST:CONTAINER` order. 3. Is the app listening on `0.0.0.0` inside? | Port not published, the two numbers swapped, or the app bound to `127.0.0.1` inside the container | Publish with `-p`; swap the numbers; bind the app to `0.0.0.0` |
| Starting fails with an error that the host port is in use | `netstat -ano` and find the process ID on that port | Another program already owns the host port | Use a different **host** port (the left number in `-p`), or stop the other program |
| App cannot reach the database container by name | 1. `docker network ls`. 2. Are both on the same user-defined network? 3. Is the name the service or container name? 4. Is the app using `localhost`? | The default bridge network has no name resolution, or the containers are on different networks, or `localhost` refers to the app's own container | Put both on one user-defined network (Compose does this for you) and use the service name |
| Compose: the app crashes at startup because the database refuses connections, but works after a restart | `docker compose logs -f` shows the order of events | The database container started but was not ready yet | Add a `healthcheck` to the database and `depends_on` with `condition: service_healthy` |
| You changed the code and nothing changed in the running app | Did you rebuild the image? | The container is running the old image | `docker compose up --build` rebuilds the images first |
| Compose variables look wrong | `docker compose config` prints the resolved file | A variable is unset or misspelled in `.env` | Fix `.env`; re-run `docker compose config` until it is right |
| Data vanished after you stopped and restarted | Did you use `docker compose down -v`? Is the data path a named volume? | Data lived in the container's own layer, or `down -v` removed the named volume | Declare a named volume at the data directory; use `down` without `-v` unless you mean to delete the data |

To look inside a running container, `docker container exec -it name sh` opens a shell (if the image contains one), and `docker container inspect name` prints its configuration as JSON.

## Kubernetes

Start every investigation the same way, in this order:

| Step | Command | What it tells you |
| --- | --- | --- |
| 1. Right cluster? | `kubectl config current-context` | Which cluster your commands are going to |
| 2. Right namespace? | `kubectl get pods -n my-namespace`, or `kubectl get pods -A` | Whether the object exists elsewhere |
| 3. State | `kubectl get pods`, with `-o wide` for more detail | The STATUS and READY columns |
| 4. The story | `kubectl describe pod my-pod` | Events at the end: scheduling, image pulls, probe failures |
| 5. The app's own words | `kubectl logs my-pod`, and `kubectl logs my-pod --previous` for the last crashed run | Why the application stopped |
| 6. Cluster-wide events | `kubectl get events` | What just happened around the object |

### Pod symptoms

| What you see | Ordered checks | Likely cause | Fix |
| --- | --- | --- | --- |
| `Pending` | `kubectl describe pod` and read the Events | The cluster cannot place the Pod: not enough CPU or memory, or a `hostPort` that limits where it can go (Kubernetes' Debug Pods page) | Delete other Pods, lower the requests, or add nodes; avoid `hostPort` and use a Service instead |
| `ErrImagePull` or `ImagePullBackOff` | 1. `describe` for the pull error. 2. Is the image name and tag spelled correctly? 3. Was the image pushed? 4. Try `docker pull image` on your machine | The image reference is wrong, the image is not in the registry, or the registry needs credentials | Correct the reference; push the image; give the cluster credentials for a private registry (the Kubernetes Images page covers it) |
| `CrashLoopBackOff` | 1. `kubectl logs my-pod --previous`. 2. `describe` for the container's last state and exit code. 3. Check the ConfigMap and Secret values it reads | The application keeps crashing and Kubernetes restarts it with a growing delay. Causes: missing configuration, a wrong command or arguments, a failing liveness probe, running out of memory | Fix the cause the log shows; fix the config; correct the probe |
| The last state shows `OOMKilled` | Compare the container's memory limit with what the app needs | The container went over its memory limit and was killed (Kubernetes' resource management documentation) | Raise the limit, or fix the memory use |
| `Running` but READY shows `0/1` | `describe` and look for readiness-probe failures | The readiness probe is failing, so the Pod receives no traffic | Correct the probe path and port; give a slow app a startup probe or more time |
| A Pod you deleted comes back | `kubectl get deployment` | A Deployment recreates Pods to match its `replicas` | Delete or scale the **Deployment**, not the Pod |
| `No resources found` | Steps 1 and 2 of the table above | Wrong context or namespace | Switch context, or add `-n` or `-A` |
| A rollout never finishes | `kubectl rollout status deployment/name`, then `describe` on a new Pod | The new Pods never become Ready | Fix the cause; roll back with `kubectl rollout undo deployment/name` |

### Service symptoms

Kubernetes' "Debug Services" page gives an order to follow, which is also the ladder for a Service. Stop at the first check that fails.

| Order | Question | Command |
| --- | --- | --- |
| 1 | Does the Service exist? | `kubectl get svc name` |
| 2 | Does its name resolve from inside the cluster? | From a Pod in the same namespace: `nslookup name`; then `nslookup name.namespace`; then the full name `name.namespace.svc.cluster.local` |
| 3 | Does it answer on its cluster IP? | Test the IP from `kubectl get svc` |
| 4 | Is it defined correctly? | `kubectl get svc name -o yaml`: check `selector`, `port`, `targetPort` |
| 5 | Does it have endpoints? | `kubectl get endpointslices -l kubernetes.io/service-name=name` |
| 6 | Are the Pods themselves working? | `kubectl get pods -l app=name`, and test a Pod directly |
| 7 | Is kube-proxy working? | Check that it runs on the nodes |
| 8 | Do network policy rules block the traffic? | Review any NetworkPolicy objects |

| What you see | Likely cause | Fix |
| --- | --- | --- |
| The Service exists but has **no EndpointSlices** or none ready | Its `selector` does not match the Pod labels, or the Pods are not Ready, or they are in another namespace | Make the labels match; fix the readiness problem |
| Endpoints exist but connections are refused through the Service | `targetPort` is not the port the container listens on, or the app listens only on `127.0.0.1` | Set `targetPort` to the container's port; make the app listen on `0.0.0.0` |
| `kubectl port-forward` to the Pod works but the Service does not | The problem is in the Service definition, not the app | Compare `selector` and `targetPort` with the Pod (port-forwarding goes straight to the Pod, skipping the Service) |
| The name does not resolve from a Pod | Wrong namespace in the name | Use `name.namespace`, or the full `.svc.cluster.local` name |
| A `LoadBalancer` Service shows `<pending>` for its external address on a local cluster | A local cluster has no cloud load balancer to create | Use `kubectl port-forward` to reach it while developing |

To test from inside the cluster, `kubectl exec -it my-pod -- sh` opens a shell in a container. If the image has no shell or tools, `kubectl debug -it my-pod --image=busybox --target=container-name` attaches a temporary debug container to the running Pod (Kubernetes' Debug Running Pods page).

## Pipelines

| What you see | Ordered checks | Likely cause | Fix |
| --- | --- | --- | --- |
| The workflow does not run at all | 1. Is the file under `.github/workflows/`? 2. Does the `on` block match what you did (branch, event)? 3. Is the YAML valid? | Wrong location, a filter that excludes your branch, or a syntax error. The `schedule` event also runs only from the default branch (GitHub's events reference) | Fix the location, filter, or YAML |
| A step fails with "command not found" | Read the failing step's log | The runner is a fresh machine: anything you did not install is not there | Add the setup step or action for that tool |
| It passes on your machine but fails in the pipeline | Compare tool versions, environment variables, and the runner's operating system with yours | The runner differs from your machine | Pin the versions in the workflow; read them from the same files you use locally |
| A step that calls the GitHub API is refused | Read the `permissions` block | Once you list any permission, every unlisted one is set to none (workflow syntax reference) | Add the permission the job needs |
| A secret is empty or a step cannot authenticate | 1. Is the name spelled exactly? 2. Is it scoped to an environment the job does not use? 3. Was the run started from a fork or by Dependabot? | An unset secret reads as an empty string, and forks and Dependabot get no secrets (GitHub's secrets documentation) | Fix the name or scope; do not expect secrets in fork runs |
| A job waits and never starts | Open the run page and read the status | An environment protection rule (required reviewer or wait timer) is holding it | Approve it, or change the rule |
| You need more detail | Enable step debug logging | The normal log does not show enough | Set the secret or variable `ACTIONS_STEP_DEBUG` to `true` (and `ACTIONS_RUNNER_DEBUG` for runner diagnostics), then re-run |

## Turn it into a habit

Keep a short incident note as you go: symptom, what you checked, what you saw, what you changed, what happened. When the same symptom returns, the note is the shortcut, and writing it forces you to change one thing at a time.

> TODO(test): The rows that quote no output (Kubernetes statuses, Compose behavior, pipeline symptoms, and the PowerShell and `ipconfig` commands that change state such as `ipconfig /flushdns`, `/release`, and `/renew`) were built from the documentation and were not reproduced. Reproduce each against a real failing setup before this page is promoted from draft.
