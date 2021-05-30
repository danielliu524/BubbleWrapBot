const DiscordJS = require("discord.js");
require("dotenv").config()

const client = new DiscordJS.Client()

client.on("ready", () => {
    console.log("Bubble Wrap Bot Online");
})

client.login(process.env.TOKEN);