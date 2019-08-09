<div align="center">
  	<p>
		<a href="https://krunker.io"><img src="https://krunker.io/img/krunker_logo_0.png" width="546"></a>
  	</p>
  	<br>
  	<p>
		<a href="https://www.npmjs.com/package/@fasetto/krunker.io">
			<img src="https://img.shields.io/npm/v/@fasetto/krunker.io.svg?maxAge=3600" alt="NPM version">
		</a>
		<a href="https://www.npmjs.com/package/@fasetto/krunker.io">
			<img src="https://img.shields.io/npm/dt/@fasetto/krunker.io.svg?maxAge=3600" alt="NPM downloads">
		</a>
		<a href="https://david-dm.org/fasetto/krunker.io">
			<img src="https://img.shields.io/david/fasetto/krunker.io.svg?maxAge=3600" alt="Dependencies">
		</a>
	</p>
  	<p>
		<a href="https://nodei.co/npm/@fasetto/krunker.io/">
			<img src="https://nodei.co/npm/@fasetto/krunker.io.png?downloads=true&stars=true" alt="npm installnfo">
		</a>
  	</p>
</div>

UnOfficial Api for interacting with the [Krunker.io Social Page](https://krunker.io/social.html)

## Setup and Installation

```
$ npm i @fasetto/krunker.io
```

## Getting Started

### Profile Informations
```js
const { Krunker: Api, OrderBy, UserNotFoundError } = require("@fasetto/krunker.io")

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
        if (e instanceof UserNotFoundError)
            console.log("Sorry ):\nWe couldn't find that user!");
        else
            console.log(e.message);
    }

}

// {
//   name: 'fasetto',
//   id: 124403,
//   score: 846605,
//   level: 27,
//   levelProgress: 60,
//   kills: 7935,
//   deaths: 5774,
//   kdr: '1.37',
//   spk: '106.69',
//   totalGamesPlayed: 1003,
//   wins: 413,
//   loses: 590,
//   wl: '0.41',
//   playTime: '3d 9h 44m',
//   funds: 550,
//   clan: 'PUSU',
//   featured: 'No',
//   hacker: false,
//   following: 1,
//   followers: 0,
//   shots: 1453,
//   hits: 554,
//   nukes: 0,
//   createdDate: '2018-07-09',
//   createdTime: '13:13:25',
//   lastPlayedClass: 'Vince'
// }

PrintUserData();
```

### Leaderboard Informations
```js
const { Krunker: Api, OrderBy } = require("@fasetto/krunker.io")

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

PrintLeaderboard();
```

### Game Informations
```js
const { Krunker: Api, GameNotFoundError } = require("@fasetto/krunker.io")

const PrintGameInfo = async () =>
{
    try
    {
        const gameInfo = await Krunker.GetGameInfo("FRA:piucd");
        console.log(gameInfo);

    }
    }
    catch (e)
    {
        if (e instanceof GameNotFoundError)
            console.log("Game not found!");
        else
            console.log(e.message);
    }
}

// {
//   region: 'Frankfurt',
//   players: '8/8',
//   map: 'ffa_Subzero',
//   custom: false
// }

PrintGameInfo();
```


## Contact

Discord: fasetto#5885
