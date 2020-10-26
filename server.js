const mc = require("minecraft-protocol");

function start(
    port,
    version,
    onlineMode = true,
    host = '0.0.0.0'
) {
    // exports
    exports.online = true;
    exports.server = {port: port,version: version, host: host, version: version};

    // creates the server
    let server = mc.createServer({ encryption: true, onlineMode, host, port, version });
    
    // all the Minecraft data relevant to the current version
    const mcData = require('minecraft-data')(server.version)
    
    // when someone tries to login to the server
    server.on('login', function (client) {
        // default values for login packet (variable for each different version of Minecraft)
        let loginPacket = mcData.loginPacket

        // send only the login packet
        client.write('login', {
            worldNames: loginPacket.worldNames, // required
            dimensionCodec: loginPacket.dimensionCodec, // required
            dimension: loginPacket.dimension, //required
            worldName: 'minecraft:overworld', // required
            hashedSeed: [0, 0], // required
            maxPlayers: server.maxPlayers, // optional
            enableRespawnScreen: false, // optional 
        });
        
        /* don't send any more packets because we want them to be stuck on "loading terrain" */
    });
}

exports.start = start;

