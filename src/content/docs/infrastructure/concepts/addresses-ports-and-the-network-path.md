---
title: "Addresses, ports, and the network path"
description: "How IPv4 addresses, CIDR subnets, ports, NAT, firewalls, and load balancers fit together, with the subnet arithmetic done by hand."
domain: infrastructure
pageType: explanation
status: draft
safetyCritical: false
sources:
  - title: "Classless Inter-domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan (RFC 4632)"
    url: "https://www.rfc-editor.org/rfc/rfc4632.html"
    publisher: "IETF (RFC Editor)"
  - title: "Internet Standard Subnetting Procedure (RFC 950)"
    url: "https://www.rfc-editor.org/rfc/rfc950.html"
    publisher: "IETF (RFC Editor)"
  - title: "Using 31-Bit Prefixes on IPv4 Point-to-Point Links (RFC 3021)"
    url: "https://www.rfc-editor.org/rfc/rfc3021.html"
    publisher: "IETF (RFC Editor)"
  - title: "Address Allocation for Private Internets (RFC 1918)"
    url: "https://www.rfc-editor.org/rfc/rfc1918.html"
    publisher: "IETF (RFC Editor)"
  - title: "IPv4 Address Blocks Reserved for Documentation (RFC 5737)"
    url: "https://www.rfc-editor.org/rfc/rfc5737.html"
    publisher: "IETF (RFC Editor)"
  - title: "IANA IPv4 Special-Purpose Address Registry"
    url: "https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml"
    publisher: "IANA"
  - title: "Dynamic Configuration of IPv4 Link-Local Addresses (RFC 3927)"
    url: "https://www.rfc-editor.org/rfc/rfc3927.html"
    publisher: "IETF (RFC Editor)"
  - title: "Dynamic Host Configuration Protocol (RFC 2131)"
    url: "https://www.rfc-editor.org/rfc/rfc2131.html"
    publisher: "IETF (RFC Editor)"
  - title: "IP Version 6 Addressing Architecture (RFC 4291)"
    url: "https://www.rfc-editor.org/rfc/rfc4291.html"
    publisher: "IETF (RFC Editor)"
  - title: "Service Name and Transport Protocol Port Number Registry"
    url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
    publisher: "IANA"
  - title: "IANA Procedures for the Management of the Service Name and Transport Protocol Port Number Registry (RFC 6335)"
    url: "https://www.rfc-editor.org/rfc/rfc6335.html"
    publisher: "IETF (RFC Editor)"
  - title: "Transmission Control Protocol (TCP) (RFC 9293)"
    url: "https://www.rfc-editor.org/rfc/rfc9293.html"
    publisher: "IETF (RFC Editor)"
  - title: "User Datagram Protocol (RFC 768)"
    url: "https://www.rfc-editor.org/rfc/rfc768.html"
    publisher: "IETF (RFC Editor)"
  - title: "Traditional IP Network Address Translator (Traditional NAT) (RFC 3022)"
    url: "https://www.rfc-editor.org/rfc/rfc3022.html"
    publisher: "IETF (RFC Editor)"
  - title: "Guidelines on Firewalls and Firewall Policy (NIST SP 800-41 Rev. 1)"
    url: "https://csrc.nist.gov/pubs/sp/800/41/r1/final"
    publisher: "NIST"
  - title: "Using nginx as HTTP load balancer"
    url: "https://nginx.org/en/docs/http/load_balancing.html"
    publisher: "nginx.org"
  - title: "TCP and UDP load balancing"
    url: "https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/"
    publisher: "NGINX documentation"
  - title: "Proxy servers and tunneling"
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Proxy_servers_and_tunneling"
    publisher: "MDN Web Docs"
  - title: "ipconfig"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig"
    publisher: "Microsoft Learn"
  - title: "Quickstart (Flask): a minimal application and the externally visible server note"
    url: "https://flask.palletsprojects.com/en/stable/quickstart/"
    publisher: "Pallets (Flask documentation)"
tags: [networking, ip, cidr, subnets, ports, nat, firewall, load-balancer]
sidebar:
  order: 50
---

Every networking problem you will meet in DevOps comes down to two questions: can traffic get from A to B, and does something answer on the other end? This page gives you the vocabulary and the arithmetic to answer both. It stays provider-neutral. Cloud providers apply these ideas with their own names; the [AWS guide](/aws/) is where to see one provider's version.

## The idea in one picture

An IP address is a street address. The **prefix** says which street (the network) and the rest says which house (the host). A **port** is the door or desk inside the building where one particular program waits.

```
 Your laptop                    Home router                     A public server
 192.168.1.20                   192.168.1.1 (LAN side)          203.0.113.10
 +---------------+  LAN         +-------------+   internet      +---------------+
 | browser       |------------->| gateway,    |---------------->| web server    |
 | port 51234    |              | NAT         |                 | port 443      |
 +---------------+              +-------------+                 +---------------+
   source: 192.168.1.20:51234                    destination: 203.0.113.10:443
```

The addresses in that picture come from ranges reserved for examples and private use, so nothing here points at a real machine (both ranges are explained below). The ephemeral source port is an example, not a fixed value.

## IPv4 addresses and prefixes

An IPv4 address is 32 bits, written as four decimal numbers (octets) from 0 to 255: `192.168.1.20`. A **prefix length** written after a slash says how many of the leading bits are the network part. RFC 4632 describes this notation, called CIDR (Classless Inter-Domain Routing): `192.168.1.0/24` means "the first 24 bits are the network; the remaining 8 bits number the hosts".

Analogy: the postal code plus the house number. The prefix length is how many characters of the address belong to the postal code.

The **subnet mask** is the same information written as an address: 24 one-bits followed by 8 zero-bits is `255.255.255.0`. Windows `ipconfig` prints the mask rather than the prefix length.

| Prefix | Mask | Addresses in the block | Usable hosts (usual rule) |
| --- | --- | --- | --- |
| /8 | 255.0.0.0 | 16,777,216 | 16,777,214 |
| /16 | 255.255.0.0 | 65,536 | 65,534 |
| /20 | 255.255.240.0 | 4,096 | 4,094 |
| /24 | 255.255.255.0 | 256 | 254 |
| /26 | 255.255.255.192 | 64 | 62 |
| /28 | 255.255.255.240 | 16 | 14 |
| /30 | 255.255.255.252 | 4 | 2 |
| /31 | 255.255.255.254 | 2 | 2 (point-to-point links only, RFC 3021) |
| /32 | 255.255.255.255 | 1 | 1 (one host) |

The addresses in a block are 2 to the power of (32 minus the prefix). The usual rule takes two away: the block's first address (all host bits zero) names the network itself, and its last address (all host bits one) is the broadcast address. RFC 950 is the subnetting procedure behind this, and RFC 3021 is the exception that lets a /31 use both addresses on a link between exactly two devices.

:::note[Cloud providers may reserve more]
The "minus two" is the general rule. A cloud provider can reserve extra addresses in each subnet for its own use, which changes how many hosts you really get. Check your provider's documentation before you size a subnet to the last address.
:::

### Do it by hand: is this address in that block?

You need this skill every time you read a security-group rule, a routing table, or a Kubernetes pod range. The method is a bitwise AND of the address and the mask; a match with the network address means "inside".

Question: is `192.168.1.130` inside `192.168.1.64/26`?

1. `/26` gives the mask `255.255.255.192`. Only the last octet needs work, because the first three octets of the mask are all ones.
2. Write the last octets in binary: `130` is `10000010` and `192` is `11000000`.
3. AND them bit by bit: `10000010 AND 11000000 = 10000000`, which is `128`.
4. The block's network address ends in `64`, not `128`, so the address is **not** inside it. It belongs to `192.168.1.128/26`.

The shortcut that avoids binary: **block size = 256 minus the interesting mask octet**. For `/26` that is 256 - 192 = 64, so the /26 blocks in that /24 start at 0, 64, 128, and 192. Find the block whose start is at or below your number.

| Block | Network address | First usable | Last usable | Broadcast |
| --- | --- | --- | --- | --- |
| 192.168.1.0/26 | 192.168.1.0 | 192.168.1.1 | 192.168.1.62 | 192.168.1.63 |
| 192.168.1.64/26 | 192.168.1.64 | 192.168.1.65 | 192.168.1.126 | 192.168.1.127 |
| 192.168.1.128/26 | 192.168.1.128 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 192.168.1.192/26 | 192.168.1.192 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

The same trick works when the interesting octet is not the last. A mask of `255.255.240.0` has 240 in the third octet, so the block size is 256 - 240 = 16 in the third octet, and the prefix length is 8 + 8 + 4 = 20 one-bits. On a Windows 11 machine, `ipconfig` printed `172.30.208.1` with mask `255.255.240.0` for the Hyper-V "Default Switch" adapter (recorded on 2026-09-26; your machine will differ). Since 208 is 13 times 16, that adapter's block is `172.30.208.0/20`, running from `172.30.208.0` to `172.30.223.255`.

The [subnet-planning walkthrough](/infrastructure/walkthroughs/1-plan-a-subnet-layout-by-hand/) turns this into a paper exercise.

### Address ranges you will meet all the time

| Range | What it is | Where it is defined |
| --- | --- | --- |
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | Private ranges: not routed on the public internet, reused inside every home and company network | RFC 1918 (the `/12` block runs from 172.16.0.0 to 172.31.255.255) |
| `127.0.0.0/8` | Loopback: "this machine", so `127.0.0.1` never leaves your computer | IANA IPv4 special-purpose registry |
| `169.254.0.0/16` | Link-local: an address a machine gives itself when it cannot get one | RFC 3927, IANA registry |
| `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | Reserved for documentation and examples | RFC 5737 |

Use the documentation ranges in your own tutorials and diagrams, as this page does, so an example never points at a real machine.

**Why overlapping ranges hurt.** Two networks that both use `192.168.1.0/24` cannot be joined by a VPN or a peering link, because a router looking at `192.168.1.20` cannot tell which of the two you mean. Choose non-overlapping ranges before you build, because renumbering a live network later is painful. The usual habit is to pick less-common private blocks and to keep a written list of who owns which range.

### Getting an address: DHCP and link-local

Almost no machine has its address typed in by hand. A DHCP server hands out addresses on a **lease**: the client may use the address for a limited time and must renew it (RFC 2131). If no DHCP server answers, an IPv4 machine can pick an address for itself in `169.254.0.0/16` (RFC 3927). That address only works on the local link, and routers do not forward it.

This gives you a fast diagnostic: **an address starting `169.254.` means the machine gave up waiting for DHCP.** The problem is the network or DHCP server, not your application.

### IPv6 in brief

IPv6 addresses are 128 bits, written as up to eight groups of hexadecimal digits, with `::` standing for a run of zero groups (RFC 4291). Link-local IPv6 addresses start with `fe80:`; `ipconfig` shows them next to the IPv4 address. A machine with both kinds of address is called dual-stack. DNS stores IPv6 addresses in AAAA records (RFC 3596), which the [DNS and TLS page](/infrastructure/concepts/dns-and-tls/) covers. The rest of this chapter uses IPv4 in its examples because the arithmetic is easier to do by eye; the ideas carry over.

## Ports, TCP, and UDP

An address gets a packet to a machine; a **port** picks the program. A port is a 16-bit number, so it runs from 0 to 65535 (TCP, RFC 9293; UDP, RFC 768). IANA and RFC 6335 divide the space into three ranges:

| Range | Name | Typical use |
| --- | --- | --- |
| 0-1023 | System (well-known) ports | Standard services: 80 is HTTP, 443 is HTTPS, 53 is DNS (IANA registry) |
| 1024-49151 | User (registered) ports | Applications registered with IANA |
| 49152-65535 | Dynamic (private) ports | Set aside by RFC 6335 for temporary or private use, such as the source port of an outgoing connection |

Analogy: the building's front desk is at a well-known room number, and each visitor gets a temporary badge number for the visit. The server listens on the well-known port; your browser uses a temporary one as its own end.

One TCP connection is identified by four values together: source address, source port, destination address, destination port. Many connections can hit the same server port because their source ports differ.

| | TCP | UDP |
| --- | --- | --- |
| Model | A connection, opened by a three-way handshake (SYN, SYN-ACK, ACK) | Individual datagrams, no connection |
| Delivery | Reliable, in-order byte stream | Best effort: packets can be lost or reordered |
| Analogy | A phone call: dial, hear "hello", talk, hang up | Postcards: cheap and fast, no guarantee they arrive |
| Typical use in this chapter | HTTP and HTTPS as your browser and `curl` use them; database connections | DNS queries (normally UDP port 53, with TCP available when needed, per RFC 1035) |

Two connection outcomes matter for debugging, and they look different:

| What you see | What it usually means |
| --- | --- |
| The attempt is **refused** immediately | The machine is reachable, but nothing is listening on that port. In TCP, a segment sent to a closed port draws a reset (RFC 9293). |
| The attempt **times out** with no answer | The packets are not arriving or not being answered. A firewall dropping traffic silently is a common cause, as is a wrong address or a route problem. |

:::tip[The listening address matters too]
A program listens on an address as well as a port. A server bound to `127.0.0.1` accepts only connections made from the same machine. The Flask documentation says exactly this about its development server, and shows `--host=0.0.0.0` to listen on all addresses. The same idea decides whether your Spring Boot application inside a container can be reached from outside it; the [containers page](/infrastructure/concepts/containers-images-and-layers/) shows why.
:::

## What sits between two machines

Traffic between your laptop and a server usually passes several boxes. Each one changes what the other end can see.

### NAT: the company switchboard

Many machines with private addresses share one public address. Network Address Port Translation (NAPT), the common form of the "Traditional NAT" that RFC 3022 describes, rewrites the source address and port of each outgoing connection and remembers the mapping so that replies go back to the right machine. Picture a company switchboard: every employee calls out through the same main number, and the operator remembers who made each call.

The consequence to remember is that traditional NAT is outbound-only by nature. A machine on the internet cannot open a connection to a private address behind the NAT unless a rule (a port forward) says where to send it. This is why a laptop can browse the web freely while a server on your home network is unreachable from outside until you set up something deliberate.

### Firewalls: the security desk

A firewall lets or blocks traffic according to rules, matching on things such as source, destination, port, and protocol. NIST SP 800-41 Rev. 1 (September 2009) surveys the types: simple packet filters, stateful inspection (which tracks connections instead of judging each packet alone), and application-aware firewalls. Analogy: the security desk in the lobby with a visitor list. A firewall that drops silently produces the timeout symptom above; one that rejects produces a refusal that looks like a closed port.

### Reverse proxies and load balancers: the receptionist and the restaurant host

A **reverse proxy** accepts requests on behalf of servers behind it and forwards them; the client only ever talks to the proxy (MDN describes this as a proxy that sits in front of servers). A **load balancer** is a reverse proxy that spreads requests across several identical servers so no single one is overwhelmed and one can fail without an outage. Analogy: the restaurant host who decides which waiter gets the next table.

There are two levels of balancing, and they behave differently.

| | Layer 4 (transport) | Layer 7 (application) |
| --- | --- | --- |
| What it looks at | Connections: addresses and ports, not the HTTP inside | The HTTP request: host name, path, headers |
| NGINX example | The `stream` module balances TCP and UDP | `upstream` and `proxy_pass` in the `http` block |
| Choose it when | You balance non-HTTP traffic, or want the simplest and fastest forwarding | You route by URL path or host, or add headers, or terminate TLS |

NGINX's documentation lists the balancing methods: round-robin (the default, requests spread evenly in turn), least connections (the server with the fewest active connections), and IP hash (the client address decides the server, so a client keeps hitting the same one). The minimal HTTP setup from the NGINX documentation defines a group of servers and forwards to it:

```
http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}
```

Two practical effects follow for a Spring Boot developer:

1. **Your application sees the proxy's address, not the user's.** The client's real address arrives in forwarding headers such as `X-Forwarded-For` or `Forwarded` (MDN lists them), so your logging and rate limiting must read those headers, not the socket address.
2. **TLS often ends at the proxy.** NGINX's documentation describes terminating TLS at the proxy so backend servers speak plain HTTP inside the private network. That is convenient, but it moves the certificate to the proxy and the traffic behind it is unencrypted unless you re-encrypt. The [DNS and TLS page](/infrastructure/concepts/dns-and-tls/) explains what the certificate proves.

## Putting it together

When a request fails, walk the path in order: does the name resolve to an address, is that address reachable, is the port open, does TLS succeed, and does the application answer. The [diagnose-from-symptoms page](/infrastructure/concepts/diagnose-from-symptoms/) turns that order into decision tables. The [cheat sheet](/infrastructure/cheat-sheet/) lists the commands.

> TODO(test): Confirm on your own network that `ipconfig` shows the mask and default gateway as described, and that your DHCP-assigned address falls inside an RFC 1918 range.
