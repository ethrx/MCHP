const server = require("./server")
const log = require("log-update");

console.log("MCHP - A honeypot to catch hackers and griefers")

var args = process.argv.slice(2);
var usage = `
Usage: ./mchp.exe [port] [version] [online/offline (default online)] [host (default localhost)]
Example Usage: ./mchp.exe 25565 1.16.2 offline 127.0.0.1`
// provided no arguments
if(args.length < 0){
    console.log(usage)
    process.exit()
} else {
    if(args.length > 4){
        console.error("Too many arguments provided.")
        console.log(usage)
        process.exit()
    }
    if(args.length == 2){
        server.start(args[0], args[1], "online", "0.0.0.0")
    } else if(args.length == 3 && (args[2] == "online" || args[2] == "offline")){
        server.start(args[0], args[1], args[2], "0.0.0.0")
    } else {
        server.start(args[0], args[1], "online", args[3])
    }
}

// create log-update logging system
setInterval(() => {
    log(
    `
Status: ${server.online ? "\x1b[32mOnline\x1b[0m": "\x1b[31mOffline\x1b[0m"}
Host: ${server.server.host}
Port: ${server.server.port}
Version: ${server.server.version}`
    )
}, 5000)

