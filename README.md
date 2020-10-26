# Minecraft Honeypot (MCHP)
A trap for Minecraft hackers and griefers.
## What a Honeypot does
It is just a "hacker trap". If rats are attracted to cheese, hackers are attracted to Honeypots.

[https://us.norton.com/internetsecurity-iot-what-is-a-honeypot.html](https://us.norton.com/internetsecurity-iot-what-is-a-honeypot.html)
## What this Honeypot does
There are many different types of Honeypots depending on the service you want to setup. This Honeypot is meant to stop hackers that find small servers just to grief them. 
While you could turn on a whitelist, this way wastes the time of a hacker by crashing their game.

# How to use it
## Building From Source
Download and install NodeJS & NPM

[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Clone the repository
```
git clone https://github.com/ethrx/MCHP
```

Change the directory to the newly cloned repository
```
cd MCHP
```

Install dependencies
```
npm install
```

## Compiling the binary (optional)
We can use PKG for this. Run the commands below to generate an executable file.

You are now ready to go. Just replace `mchp.exe` with `node index.js` in the usage section if you are not using a binary.

### Usage
`Usage: ./mchp.exe [port] [version] [online/offline (default online)] [host (default localhost)]`

\[port]: the port that the honeypot will listen on. This is the one the hacker will connect to. (e.g 25565)

\[version]: the version of minecraft that the server will accept connections to. (e.g 1.16.2)

\[online]: specify the mode of the server (online/offline). 

\[host]: specify the host of the server (don't mess with this if you don't know what it does)

### Binaries
See releases.
## Roadmap
- [x] Core functionality (crash the hacker game on join \[after a few seconds to waste their time though\])
- [x] Port specification
- [ ] Compile as a binary and release
- [ ] Setup logging so that we can observe hackers and what packets they send to our servers (identifying hacked client packets)
- [ ] Feign server with fake/random server info, or duplicate info from another server.
