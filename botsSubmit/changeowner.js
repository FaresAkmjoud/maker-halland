const { Client, GatewayIntentBits } = require("discord.js");
const { Database } = require("st.db");
const tokens = new Database("/tokens/tokens");
const usersdata = new Database("/database/usersdata/usersdata");
const setting = new Database("/database/settingsdata/setting");
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === "owner_Modal") {
        // Defer the reply before performing actions
        await interaction.deferReply({ ephemeral: true });

        // Fetch values submitted in the modal
        const clientId = interaction.fields.getTextInputValue(`clientId`);
        const oldowner = interaction.fields.getTextInputValue(`oldowner`);
          const newowner = interaction.fields.getTextInputValue(`newowner`);

   

        // Check user balance
        const user = interaction.user;
        const balanceKey = `balance_${user.id}_${interaction.guild.id}`;
        let userBalance = await usersdata.get(balanceKey);
        const cost = 1;

        if (!userBalance || userBalance < cost) {
            return interaction.reply({ content: '**عفوا رصيدك غير كافي.**', ephemeral: true });
        }

        // Check if the subscription with clientId exists
      
        const subsearch = await tokens.get(clientId);
        if (!subsearch || !subsearch[0]) {
            return interaction.reply({ content: '**لم يتم العثور على اشتراك بهذا الايدي**', ephemeral: true });
        }

        // Find and update the owner in the subscription
        const updatedSubscription = subsearch.map(sub => {
            if (sub.owner === oldowner) {
                sub.owner = newowner;
            }
            return sub;
        });

        // Deduct points from user balance
        userBalance -= cost;
        await usersdata.set(balanceKey, userBalance);

        // Save the updated subscription in the database
        await tokens.set(clientId, updatedSubscription);

        // Send confirmation message
        const doneEmbed = new EmbedBuilder()
            .setColor('#6586db')
            .setTitle('تم تغير الاونر بنجاح')
            .setDescription('**تم تغير اونر البوت بنجاح \n تم خصم منك 1 عملة**');

        let doneMessage = `**${interaction.user} قام بتغير __اونر البوت__ الخاص به**`;
        let logroom = setting.get(`log_room_${interaction.guild.id}`);
        let theroom = interaction.guild.channels.cache.find(ch => ch.id == logroom);
        await theroom.send(doneMessage);

        await interaction.reply({ embeds: [doneEmbed], ephemeral: true });
    }
}
}
};