const WebSocket = require('ws');

class Api
{
    constructor()
    {
        this.socket = undefined;
    }

    connect()
    {
        this.socket = new WebSocket('wss://krunker_social.krunker.io/ws');
    }

    disconnect()
    {
        if (!this.socket && this.socket.readyState !== 1)
            return;

        this.socket.close();
        this.socket = undefined;
    }
}

module.exports = Api
