const DiscordJS = require("discord.js");
require("dotenv").config()

const client = new DiscordJS.Client();
const getApp = (guildId) => {
    const app = client.api.applications(client.user.id);
    if(guildId) {
        app.guilds(guildId);
    }
    return app;
}

client.on("ready", async () => {
    console.log("Bubble Wrap Bot Online");
    client.user.setActivity("/bubble",
        {
            type: "LISTENING",
        }
    );
    const commands = await getApp().commands.get();
    console.log(commands);
    await getApp().commands.post({
        data: {
            name: "bubble",
            description: "Makes a bubble wrap. Enjoy!",
        }
    })

    client.ws.on("INTERACTION_CREATE", async (interaction) => {
        const command = interaction.data.name.toLowerCase();
        if(command === "bubble") {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||
||)||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||(||
||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||
||)||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||(||
||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||
||)||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||(||
||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||
||)||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||(||
||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||||()||`
                    }
                }
            })
        }
    })
})

client.login(process.env.TOKEN);