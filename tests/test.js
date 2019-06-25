
const { Krunker: Api, OrderBy, UserNotFoundError, GameNotFoundError } = require("../src/krunker.js")

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
        const gameInfo = await Krunker.GetGameInfo("FRA:tbqr2");
        console.log(gameInfo);

    }
    catch (e)
    {
        if (e instanceof GameNotFoundError)
            console.log("Game not found!");
        else
            console.log(e.message);
    }
}

PrintUserData();
// PrintLeaderboard();
// PrintGameInfo();
