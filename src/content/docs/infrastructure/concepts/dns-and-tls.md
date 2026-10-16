---
title: "DNS and TLS: names and certificates"
description: "How a host name becomes an address through DNS, how record types and caching behave, and how TLS certificates prove a server is who it claims to be."
domain: infrastructure
pageType: explanation
status: draft
safetyCritical: false
sources:
  - title: "Domain Names - Concepts and Facilities (RFC 1034)"
    url: "https://www.rfc-editor.org/rfc/rfc1034.html"
    publisher: "IETF (RFC Editor)"
  - title: "Domain Names - Implementation and Specification (RFC 1035)"
    url: "https://www.rfc-editor.org/rfc/rfc1035.html"
    publisher: "IETF (RFC Editor)"
  - title: "Negative Caching of DNS Queries (RFC 2308)"
    url: "https://www.rfc-editor.org/rfc/rfc2308.html"
    publisher: "IETF (RFC Editor)"
  - title: "DNS Extensions to Support IP Version 6 (RFC 3596)"
    url: "https://www.rfc-editor.org/rfc/rfc3596.html"
    publisher: "IETF (RFC Editor)"
  - title: "A Null MX No Service Resource Record for Domains That Accept No Mail (RFC 7505)"
    url: "https://www.rfc-editor.org/rfc/rfc7505.html"
    publisher: "IETF (RFC Editor)"
  - title: "Reserved Top Level DNS Names (RFC 2606)"
    url: "https://www.rfc-editor.org/rfc/rfc2606.html"
    publisher: "IETF (RFC Editor)"
  - title: "Root Servers"
    url: "https://www.iana.org/domains/root/servers"
    publisher: "IANA"
  - title: "Root Zone Database"
    url: "https://www.iana.org/domains/root/db"
    publisher: "IANA"
  - title: "nslookup"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup"
    publisher: "Microsoft Learn"
  - title: "The Transport Layer Security (TLS) Protocol Version 1.3 (RFC 8446)"
    url: "https://www.rfc-editor.org/rfc/rfc8446.html"
    publisher: "IETF (RFC Editor)"
  - title: "Internet X.509 Public Key Infrastructure Certificate and CRL Profile (RFC 5280)"
    url: "https://www.rfc-editor.org/rfc/rfc5280.html"
    publisher: "IETF (RFC Editor)"
  - title: "Transport Layer Security (TLS) Extensions: Extension Definitions (RFC 6066)"
    url: "https://www.rfc-editor.org/rfc/rfc6066.html"
    publisher: "IETF (RFC Editor)"
  - title: "Transport Layer Security (TLS)"
    url: "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security"
    publisher: "MDN Web Docs"
  - title: "How It Works"
    url: "https://letsencrypt.org/how-it-works/"
    publisher: "Let's Encrypt"
  - title: "Terminating SSL/TLS traffic"
    url: "https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/"
    publisher: "NGINX documentation"
tags: [dns, tls, certificates, https, nslookup, networking]
sidebar:
  order: 51
---

Two systems turn a name you type into a connection you can trust. **DNS** finds the address that goes with a name. **TLS** proves that the machine at that address is the one you meant and hides the conversation from anyone in between. When either breaks, the error message rarely says so plainly, which is why you learn how they work before you need to debug them.

Dated facts on this page were read against the documents listed in the frontmatter on 2026-09-26. DNS answers that appear as examples were observed on that date and drift over time.

## DNS: the phone book with a hierarchy

DNS is a distributed phone book. You ask for a name and get back numbers (and other data). Analogy for a Spring Boot developer: it is a `Map<String, List<Record>>` that lives across many servers, with a cache in front of it whose entries expire after a time-to-live.

### Names form a tree

A domain name is read right to left, like a file path written backwards. `www.example.com.` (the final dot is the root) means: the root, then `com`, then `example` under `com`, then `www` under `example`. RFC 1034 describes this tree. Each part of the tree can be run by a different organization, which is why no single server knows everything. A **zone** is the slice of the tree one set of name servers is responsible for. IANA publishes the list of top-level domains and their servers (the root zone database) and the root server addresses.

### How a lookup travels

Three kinds of server take part (RFC 1034 calls them resolvers and name servers):

| Role | What it does | Where you meet it |
| --- | --- | --- |
| Stub resolver | The small client inside your operating system: asks one configured server and waits | Your laptop, your container |
| Recursive resolver | Does the legwork: asks other servers on your behalf and caches the results | Your router, your ISP, or a resolver you configure |
| Authoritative name server | Holds the real records for a zone and answers for it | The servers listed in a domain's NS records |

```
 your app
    | 1. "address of www.example.com?"
    v
 stub resolver (OS) -- cache hit? answer immediately
    |
    v
 recursive resolver -- cache hit? answer immediately
    | 2. ask a root server: "who runs com?"            -> "ask these .com servers"
    | 3. ask a .com server: "who runs example.com?"    -> "ask these name servers"
    | 4. ask example.com's server: "www.example.com?"  -> the answer
    v
 answer cached for its TTL, then returned to your app
```

Asking servers in turn, each replying "not me, try them", is the iterative part; the recursive resolver does that on your behalf, which is why your machine only ever asks one question.

### Caching and TTL

Every record carries a **TTL**, in seconds, that tells caches how long they may reuse it (RFC 1035). Caching is what makes DNS fast, and it is also why changes seem slow: any resolver that cached the old answer keeps serving it until the TTL runs out. Resolvers also cache failure. RFC 2308 describes **negative caching**: an answer of "that name does not exist" is remembered too, for a period taken from the zone's SOA record. So if you look up a name before you create it, then create it, you can keep seeing "does not exist" for a while.

Analogy: a `@Cacheable` method with an expiry. The fix for a stale answer is never to wait blindly; it is to know the TTL and query the authoritative server directly (the [nslookup walkthrough](/infrastructure/walkthroughs/2-read-dns-records-with-nslookup/) shows how).

### Record types you will read

The example values were observed with `nslookup` on a Windows 11 machine on 2026-09-26, against `example.com`, a name reserved for documentation by RFC 2606. Addresses for that name change over time, so treat them as a snapshot.

| Type | Maps a name to | Example observed on 2026-09-26 | Notes |
| --- | --- | --- | --- |
| A | An IPv4 address | `172.66.147.243` and `104.20.23.154` | A name can have several A records, as this one did |
| AAAA | An IPv6 address | `2606:4700:10::6814:179a` and `2606:4700:10::ac42:93f3` | RFC 3596 |
| CNAME | Another name (an alias) | Not present for `example.com` itself | A name that has a CNAME should have no other records at that name (RFC 1034) |
| NS | The name servers for the zone | `elliott.ns.cloudflare.com` and `hera.ns.cloudflare.com` | Tells you who is authoritative |
| MX | Mail servers, with a preference number | `preference = 0, mail exchanger = (root)` | This is a "null MX": the domain says it accepts no mail (RFC 7505) |
| TXT | Free text, used for verification and email policy | A string `"v=spf1 -all"` and a verification token | Anything can go in a TXT record |
| SOA | Zone bookkeeping: primary server, serial, timers, default TTL | `default TTL = 1800 (30 mins)` | Its timers also drive negative caching |
| PTR | An address back to a name (reverse lookup) | Not queried | Lives under the special `in-addr.arpa` tree (RFC 1035) |

Where a name has both A and AAAA records, a client with IPv4 and IPv6 can use either. That is one reason "it works from my laptop" and "it fails from the server" can differ: the two machines may prefer different address families.

### Reading a DNS answer

`nslookup` labels an answer **Non-authoritative** when it came from a cache and not from the zone's own server, which is the normal case through a resolver. When something is wrong, the reply carries a result code (RCODE, RFC 1035):

| Result | Meaning | What you saw on Windows |
| --- | --- | --- |
| No error, with answers | The name resolved | `Non-authoritative answer:` followed by `Name:` and `Address:` lines |
| No error, no answer for that type (RFC 2308 calls this NODATA) | The name exists but has no record of the type you asked for | Not reproduced here |
| Name error (NXDOMAIN) | The name does not exist | `*** router.home.local can't find does-not-exist.invalid: Non-existent domain` (recorded on 2026-09-26; the resolver name is that machine's router) |
| Server failure (SERVFAIL) | The resolver could not get a valid answer | Not reproduced here |
| Refused (REFUSED) | The server will not answer this query for you | Not reproduced here |

> TODO(test): Reproduce a NODATA, a SERVFAIL, and a REFUSED result in `nslookup` on Windows and record the exact wording of each.

The name in that NXDOMAIN example ends in `.invalid`, a top-level name RFC 2606 reserves so that it can never exist. Use `.invalid` and `example.com` for practice lookups, and you will never hit a real site by accident.

## TLS: the sealed envelope and the passport check

TLS is the protocol behind the padlock in a browser and the `https` in a URL. MDN summarizes what it gives you: **encryption** (eavesdroppers read gibberish), **integrity** (tampering is detected), and **authentication** (you know who you are talking to). Analogy: you send your message in a sealed envelope (encryption and integrity) and the courier first shows you a passport issued by a government you already trust (authentication). This page describes TLS 1.3 (RFC 8446), as of the documents read on 2026-09-26.

### The handshake in outline

```
 client                                                       server
   |  ClientHello: supported versions and ciphers,             |
   |               key share, the host name you want (SNI)     |
   |---------------------------------------------------------->|
   |  ServerHello: chosen cipher, key share                    |
   |  Certificate: the chain, plus proof it holds the key      |
   |  Finished                                                 |
   |<----------------------------------------------------------|
   |  (client checks the chain, the name, the dates)           |
   |  Finished                                                 |
   |---------------------------------------------------------->|
   |=========== encrypted application data (HTTP) =============|
```

This is a simplification. The idea to hold on to: before any HTTP request is sent, both sides agree on keys, and the server proves its identity with a certificate.

### What a certificate is

A certificate is an X.509 document (RFC 5280) that binds a public key to one or more names. The parts you will read when debugging:

| Field | What it says | Failure it causes |
| --- | --- | --- |
| Subject alternative names | The host names the certificate is valid for | "Name mismatch": you connected to a name the certificate does not list, or by IP address |
| Validity period | The dates between which the certificate is valid | "Expired" (or "not yet valid" if your clock is wrong) |
| Issuer and signature | Who vouched for it, and the proof | "Untrusted issuer" when the signer is unknown, such as a self-signed certificate |
| Public key | The key the server proves it holds | Handshake failure if the proof does not match |

Certificates form a **chain**: the server's certificate is signed by an intermediate certificate authority (CA), which is signed by another, up to a root CA that your operating system or browser already trusts (its **trust store**). The client walks the chain and checks each signature, the dates, and the names (RFC 5280 defines the validation). A common server mistake is sending only its own certificate and leaving out the intermediate, so the chain has a gap and some clients cannot complete it.

The trust store your operating system holds is the same idea as the trust store a JVM uses when your Spring Boot service calls another service over HTTPS: the client only trusts issuers it already knows.

### SNI: many certificates behind one address

One server address and port often serves many sites. The client therefore states the host name it wants inside the ClientHello, in a TLS extension called Server Name Indication (SNI, RFC 6066), so the server can pick the right certificate before encryption starts. This is why connecting to a bare IP address over HTTPS can show a name mismatch: no name was sent, or the certificate does not cover the address.

### Getting a certificate: ACME and Let's Encrypt

You do not buy and paste certificates by hand any more. A certificate authority such as Let's Encrypt automates issuance with the ACME protocol: a software agent on your server proves it controls the domain (Let's Encrypt describes challenges based on a DNS record or an HTTP resource at a well-known address under the domain), receives a certificate, and repeats the process to renew it. Analogy: a landlord who leaves a note under your door to prove you live at the address before issuing a key.

### Where TLS ends

TLS can end at the application, or at a proxy or load balancer in front of it. NGINX's documentation describes **TLS termination**: the proxy holds the certificate and private key, decrypts the traffic, and forwards plain HTTP to the servers behind it. Termination centralises certificates in one place; the cost is that the hop behind the proxy is unencrypted unless you configure the proxy to encrypt it again. Know which box holds the certificate, because that is the box to check when a certificate expires.

## Why this matters when something breaks

Most connection failures live at one of these layers, in this order: the name did not resolve, the address was not reachable, the port was closed, the TLS handshake failed, the application returned an error. The [diagnose-from-symptoms page](/infrastructure/concepts/diagnose-from-symptoms/) turns that order into tables, and the [addresses and ports page](/infrastructure/concepts/addresses-ports-and-the-network-path/) covers the layers below this one.
