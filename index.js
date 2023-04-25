#!/usr/bin/node
const { parseArgs } = require('node:utils')
const MC = require("minecraft-protocol")

async function main (options) {
    if (options.help || !options.version) {
        console.log(`Usage: ./mchp/index.js [options]
       node ./mchp [options]

Options:
  -v, --version=...                Minecraft version to simulate (required)
  -h, --host=...                   Listening host (default: 0.0.0.0)
  -p, --port=0-65535               Listening port (default: 25565)
  -n, --name=...                   Displayed server name (default: "A Minecraft server")
  -l, --list=name,name2,...        Displayed player list (default: [])
  -m, --maxplayers=0-255           Displayed player limit (default: 20)
  -o, --offline                    Enable offline mode (default: false)
  -k, --keepalive                  Accept and keep new connections open, wasting
                                   time before client times out (default: false)
  -q, --query=host[:port]          Query other Minecraft server for name and player list
  -h, --help                       Show this page
`)
        return
    }
    if (options.query) {
        throw new Error('TODO')
        options.name = ''
        options.list = ''
    }
    const server = MC.createServer({
        port: +options.port,
        host: options.host,
        kickTimeout: options.keepalive ? 30*1000 : 5*1000,
        'online-mode': !options.offline,
        beforePing: (response, client) => console.log('PING', client.socket.remoteAddress),
        beforeLogin: (client) => console.log('LOGIN', client.uuid, client.username, client.socket.remoteAddress),
        motd: options.name,
        maxPlayers: +options.maxplayers,
        version: options.version,
        hideErrors: true
    })

    const mcData = require('minecraft-data')(server.version)
    const defaultLoginPacket = mcData.loginPacket
    server.on('login', function (client) {
        if (!options.keepalive) return client.end()
        client.write('login', {
            entityId: (Math.random() * 50) | 0,
            levelType: 'default',
            gameMode: 0,
            previousGameMode: 255,
            worldNames: loginPacket.worldNames,
            dimensionCodec: loginPacket.dimensionCodec,
            dimension: loginPacket.dimension,
            worldName: 'minecraft:overworld',
            hashedSeed: [(Math.random() * 0x80000000) | 186264, (Math.random() * 0x80000000) | -2083388360],
            difficulty: 0,
            viewDistance: 8,
            reducedDebugInfo: false,
            maxPlayers: +options.maxplayers,
            enableRespawnScreen: true,
            isDebug: false,
            isFlat: false
        })
    })
    
    console.log(`Minecraft Honeypot of version ${options.version} listening at ${options.host}:${options.port} (${options.offline ? 'offline' : 'online'} mode)`)
}

const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
        version: {
            type: 'string',
            short: 'v'
        },
        host: {
            type: 'string',
            short: 'h',
            default: '0.0.0.0',
        },
        port: {
            type: 'string',
            short: 'p',
            default: '25565',
        },
        name: {
            type: 'string',
            short: 'n',
            default: 'A Minecraft server',
        },
        list: {
            type: 'string',
            short: 'l',
            default: '',
        },
        maxplayers: {
            type: 'number',
            short: 'm',
            default: '20'
        },
        offline: {
            type: 'boolean',
            short: 'o',
            default: false,
        },
        keepalive: {
            type: 'boolean',
            short: 'k',
            default: false,
        },
        query: {
            type: 'string',
            short: 'q',
            default: '',
        },
        help: {
            type: 'boolean',
            short: 'h',
            default: false,
        },
}})
main(values)
