
const { Krunker: Api, OrderBy } = require("../src/krunker.js")

const Krunker = new Api();

const PrintUserData = async () =>
{
    try
    {
        const user = await Krunker.GetProfile("fasetto");
        console.log(user);
    }
    catch (e)
    {
        // console.log(e.message);
        console.log("Sorry ):\nWe couldn't find that user!");
    }

}

const PrintLeaderboard = async () =>
{
    try
    {
        const leaderboard = await Krunker.GetLeaderboard(OrderBy.Funds)
        console.log(leaderboard);

    }
    catch (e)
    {
        console.log(e.message);
    }
}

const PrintGameInfo = async () =>
{
    try
    {
        const gameInfo = await Krunker.GetGameInfo("FRA:piucd");
        console.log(gameInfo);

    }
    catch (e)
    {
        console.log(e.message);
    }
}

PrintUserData();
// PrintLeaderboard();
// PrintGameInfo();

// const { decode } =  require('msgpack-lite');

// const fromHexString = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

// const decoded = decode(fromHexString("92a17294a76c656164657273a573636f7265a6313234343033c00d01"));

// console.log(decoded);

// Normal
// { player_name: 'esmmotario',
//     player_featured: 0,
//     player_clan: 'boda',
//     player_score: 5714125,
//     player_hack: 0 }

// Krunkies
// { player_name: 'JHXC',
// player_featured: 1,
// player_clan: '',
// player_funds: 22196,
// player_hack: 0 } ]

// Clans
// { clan_name: 'hi',
// clan_score: 16040555,
// creatorname: 'superman2505',
// player_clan: 'hi',
// clan_membercount: 93,
// clan_hackcount: 2 }
