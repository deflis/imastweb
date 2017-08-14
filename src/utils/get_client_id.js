var requireJSON5 = require('require-json5');

let appConfig ={}

if (!process.env.NODE_ENV)
    appConfig = requireJSON5("appconfig.dev.json5");
else
    appConfig = requireJSON5("appconfig." + process.env.NODE_ENV + ".json5");

const axios = require('axios');

const redirectUri = `${appConfig.imast}/login/callback`
const instance = axios.create({
    "baseURL": `https://${appConfig.host}/api/v1/`,
});



async function createApp() {
    let ret = await instance.post("/apps", {
        "client_name": appConfig.client_name,
        "redirect_uris": redirectUri,
        "scopes": "read write follow"
    });

    return ret.data;
}

createApp().then(x => console.log(JSON.stringify(x, undefined, 4)))