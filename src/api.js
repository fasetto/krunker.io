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

// const WebSocket = require('ws');
// const { encode, decode } =  require('msgpack-lite');

// const socket = new WebSocket('wss://krunker_social.krunker.io/ws');

// socket.onopen = () =>
// {
//     const data = encode([ 'r', [ 'profile', 'fasetto', '', null ] ]);
//     socket.send(data.buffer);
// }

// socket.onmessage = buf =>
// {
//     const data = decode(new Uint8Array(buf.data));
//     socket.close();
// }

// [ 'r', [ 'profile', 'fasetto', '124403', null ] ]

// [ '0',
//   [ 'profile',
//     'fasetto',
//     { player_name: 'fasetto',
//       player_id: 124403,
//       player_kills: 7856,
//       player_wins: 409,
//       player_games_played: 989,
//       player_deaths: 5719,
//       player_timeplayed: 292162786,
//       player_funds: 562,
//       player_score: 837390,
//       player_featured: 0,
//       player_clan: 'PUSU',
//       player_hack: 0 },
//     [] ] ]
