
const Api = require("../src/krunker.js")

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

PrintUserData();
