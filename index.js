const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./secrets/config.json");
const translate = require('@vitalets/google-translate-api');
client.login(config.token);

client.on("messageReactionAdd", async (messageReaction, user) => {

    if (messageReaction.emoji.name.includes("duc_")) {
        const langTo = await messageReaction.emoji.name.substring(4);
        user.send("Translating... \n" + "```" + messageReaction.message.content + "```");
        translate(messageReaction.message.content, { to: langTo }).then(async (res) => {
            user.send("```TRANSLATED VERSION\nTo:" + langTo + "\nFrom: " + res.from.language.iso + "\n" + res.text + "```")


        }).catch(err => {
            user.send("There was an error. Emoji Name: " + "`" + messageReaction.emoji.name + "`\n```" + err + "```");
        });
    }


})



