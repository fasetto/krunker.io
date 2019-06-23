
const { Krunker: Api, OrderBy } = require("../src/krunker.js")

const Krunker = new Api();

const PrintUserData = async () =>
{
    try
    {
        const user = await Krunker.GetProfile("needmoney90");
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

// PrintUserData();
PrintLeaderboard();
