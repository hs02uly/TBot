const http = require("http")
http.createServer(function (req, res) {
    res.write("online")
    res.end()
}).listen(8080)

const { Client, EmbedBuilder, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const client = new Client({
    "intents": [Guilds, GuildMessages, MessageContent],
    "partials": [Partials.Channel]
});
const vm2 = require("vm2")

client.once("ready", () => {
    console.log(`Ready!${client.user.tags}`)
    client.user.setPresence({ activities: [{ name: `${client.guilds.cache.size}Guilds｜世の中には悪いやつもおるんやで。肝に銘じときや` }],
    status: "dnd" })
})

//                  commands                    //
const c = "#281d4e"
let args = ""
client.on("messageCreate", async message => {
    try{
        const p = "t."
        if (!message.content.startsWith(p)) return
        const cmd = message.content.slice(2).split(" ")[0]
        args = message.content.split(" ").slice(1)
        console.log(args)
        console.log(...args)
        if (cmd === `hello`){
            return message.reply("Hello!")
        }
        if (cmd === "say"){
            return message.reply(...args)
        }
        if(cmd === `ping`){
            const ping = new EmbedBuilder()
                .setTitle("Pong")
                .addFields(
                    { name: "WebSocket", value: `${client.ws.ping}ms`, inline: true},
                    { name: "コマンド受信", value: `${new Date() - message.createdTimestamp}ms`, inline: true}
                )
                .setColor(c)
                .setTimestamp()
            return message.reply({embeds: [ping]})
        }
        if(cmd === `help`){
            const help = new EmbedBuilder()
                .setTitle("Help/Command")
                .setColor(c)
                .setTimestamp()
            return message.reply({embeds: [help]})
        }
        if (cmd === "eval"){
            message.reply("そんなコマンドありませんよばーかばーか")
        }
        if (cmd === `test`){
            return;
        }
    }catch(e){
        return message.reply(e.message)
    }
})
//                  commands                    //

client.login(process.env.TOKEN)