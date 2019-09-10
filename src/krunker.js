const Api = require("./api");
const { encode, decode } =  require("msgpack-lite");
const { UserNotFoundError, GameNotFoundError } = require("./error")
const request = require("request");

const OrderBy =
{
    Funds: "player_funds",
    Clans: "player_clan",
    Level: "player_score",
    Kills: "player_kills",
    Time: "player_timeplayed",
    Wins: "player_wins"
}

class Krunker extends Api
{
    // TODO: create game/seek game commands

    GetProfile(username)
    {
        this.connect();

        return new Promise((resolve, reject) =>
        {
            this.socket.onopen = () =>
            {
                const data = encode([ 'r', [ 'profile', username, "000000", null ] ]);
                this.socket.send(data.buffer);
            }

            this.socket.onerror = (e) =>
            {
                this.socket.terminate();
                return reject(e);
            }

            this.socket.onmessage = buff =>
            {
                const data = decode(new Uint8Array(buff.data))[1][2];
                this.disconnect();

                if(!data || !data.player_name)
                    return reject(new UserNotFoundError(`Couldn't get stats for user ${username}`));

                if(!data.player_stats) {
                	var s = 0
                	var h = 0
                    var n = 0
                    var c = -1
                    var mk = 0
                }
                else {
                	var s = JSON.parse(data.player_stats)["s"] || 0
                	var h = JSON.parse(data.player_stats)["h"] || 0
                    var n = JSON.parse(data.player_stats)["n"] || 0
                    var c = JSON.parse(data.player_stats)["c"] || -1
                    var mk = JSON.parse(data.player_stats)["mk"] || 0
                }

                const profile_info =
                {
                    name: data.player_name,
                    id: data.player_id,
                    score: data.player_score,
                    level: this.GetLevel(data),
                    levelProgress: this.GetLevelProgress(data.player_score),
                    kills: data.player_kills,
                    deaths: data.player_deaths,
                    kdr: this.GetKDR(data),
                    kpg: this.GetKPG(data),
                    spk: this.GetSPK(data),
                    totalGamesPlayed: data.player_games_played,
                    wins: data.player_wins,
                    loses: data.player_games_played - data.player_wins,
                    wl: this.GetWL(data),
                    playTime: this.GetPlayTime(data),
                    funds: data.player_funds,
                    clan: data.player_clan ? data.player_clan : false,
                    featured: data.player_featured ? "Yes" : "No",
                    hacker: data.player_hack ? true : false,
                    following: data.player_following || 0,
                    followers: data.player_followed || 0,
                    shots: s,
                    hits: h,
                    nukes: n,
                    meleeKills: mk,
                    createdDate: data.player_datenew.match("(.*)T")[1],
                    createdTime: data.player_datenew.match("T(.*).000Z")[1],
                    lastPlayedClass: this.GetClass(c)
                };

                resolve(profile_info);
            }
        });
    }


    GetLeaderboard(orderby)
    {
        this.connect();

        return new Promise((resolve, reject) =>
        {
            this.socket.onopen = () =>
            {
                const data = encode([ 'r', [ 'leaders', orderby, null, null] ]);
                this.socket.send(data.buffer);
            }

            this.socket.onmessage = buff =>
            {
                const data = decode(new Uint8Array(buff.data))[1][2];
                this.disconnect();

                if (!data)
                    return reject(new Error("Something went wrong!"));

                resolve(data);
            }
        });
    }

    GetGameInfo(gameId)
    {
        return new Promise((resolve, reject) =>
        {
            request(`https://matchmaker.krunker.io/game-info?game=${gameId}`, (err, res, body) =>
            {
                const json = JSON.parse(body);

                if (!json.region)
                    return reject(new GameNotFoundError("Game not found!"));

                const gameInfo =
                {
                    region: this.GetRegion(json.region.slice(-2)),
                    players: `${json.clients}/${json.maxClients}`,
                    map: json.data.i,
                    custom: json.data.cs
                }

                resolve(gameInfo);
            });

        });
    }

    GetRegion(regionStr)
    {
        let region;

        switch (regionStr) {
            case "sv":
                region = "Silicon Valley";
                break;
            case "ia":
            case "fl":
                region = "Miami";
                break;
            case "ra":
                region = "Frankfurt";
                break;
            case "js":
                region = "New Jersey";
                break;
            case "il":
                region = "Chicago";
                break;
            case "tx":
                region = "Dallas";
                break;
            case "wa":
                region = "Seattle";
                break;
            case "la":
                region = "Los Angeles";
                break;
            case "ga":
                region = "Atlanta";
                break;
            case "on":
                region = "London";
                break;
            case "ar":
                region = "Paris";
                break;
            case "ok":
            case "nd":
                region = "Tokyo";
                break;
            case "in":
            case "gp":
                region = "Singapore";
                break;
            case "yd":
                region = "Sydney";
                break;
            default:
                region = "regionStr";
                break;
        }

        return region;
    }

    GetClass(classId)
    {
        let c;

        switch (classId) {
            case -1:
                c = "Triggerman";
                break;
            case 0:
                c = "Triggerman";
                break;
            case 1:
                c = "Hunter";
                break;
            case 2:
                c = "Run N Gun";
                break;
            case 3:
                c = "Spray N Pray";
                break;
            case 4:
                c = "Vince";
                break;
            case 5:
                c = "Detective";
                break;
            case 6:
                c = "Marksman";
                break;
            case 7:
                c = "Rocketeer";
                break;
            case 8:
                c = "Agent";
                break;
            case 9:
                c = "Hands";
                break;
            case 11:
                c = "Crossbow";
                break;
            case 12:
                c = "Commando";
                break;
        }

        return c;
    }


    GetLevel(data)
    {
        const score = data.player_score;
        return Math.max(1, Math.floor(0.03 * Math.sqrt(score)));
    }

    GetLevelProgress(playerScore)
    {
        const PROG_VAR = 0.03;

        const t         = PROG_VAR * (Math.sqrt(playerScore));
        const level     = Math.floor(t);
        const levelProg = Math.round(100 * (t - level));

        return levelProg;
    }

    GetPlayTime(data)
    {
        const time = data.player_timeplayed;
        let timeplayed = "";

        const min = Math.floor(Math.floor(time / 1000) / 60) % 60;
		const hour = Math.floor(Math.floor(Math.floor(time / 1000) / 60) / 60) % 24;
		const day = Math.floor(Math.floor(Math.floor(Math.floor(time / 1000) / 60) / 60) / 24);

        if (day) timeplayed  += `${day}d `;
        if (hour) timeplayed += `${hour}h `;
        if (min) timeplayed  += `${min}m`;
        return timeplayed;
    }

    GetKDR(data)
    {
		const KDR = data.player_kills / data.player_deaths || 0;
		return KDR.toFixed(2);
    }

    GetWL(data)
    {
		const WL = data.player_wins / data.player_games_played || 0;
		return WL.toFixed(2);
	}

    GetSPK(data)
    {
		const SPK = data.player_score / data.player_kills || 0;
		return SPK.toFixed(2);
    }

    GetKPG(data)
    {
        const KPG = data.player_kills / data.player_games_played || 0;
        return KPG.toFixed(2);
    }


}

module.exports = { Krunker, OrderBy, UserNotFoundError, GameNotFoundError }
