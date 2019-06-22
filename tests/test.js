
const Api = require("../src/krunker.js")

const Krunker = new Api();

const PrintUserData = async () =>
{
    const user = await Krunker.GetProfile("fasetto");
    console.log(user);
}

PrintUserData();
