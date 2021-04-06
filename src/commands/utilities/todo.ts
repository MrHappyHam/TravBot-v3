import Command from "../../core/command";
import moment from "moment";
import {Storage} from "../../core/structures";
import {MessageEmbed} from "discord.js";

export default new Command({
    description: "Keep and edit your personal todo list.",
    async run($) {
        const user = Storage.getUser($.author.id);
        const embed = new MessageEmbed().setTitle(`Todo list for ${$.author.tag}`).setColor("BLUE");

        for (const timestamp in user.todoList) {
            const date = new Date(Number(timestamp));
            embed.addField(
                `${moment(date).format("LT")} ${moment(date).format("LL")} (${moment(date).fromNow()})`,
                user.todoList[timestamp]
            );
        }

        $.channel.send(embed);
    },
    subcommands: {
        add: new Command({
            async run($) {
                const user = Storage.getUser($.author.id);
                const note = $.args.join(" ");
                user.todoList[Date.now().toString()] = note;
                console.debug(user.todoList);
                Storage.save();
                $.channel.send(`Successfully added \`${note}\` to your todo list.`);
            }
        }),
        remove: new Command({
            async run($) {
                const user = Storage.getUser($.author.id);
                const note = $.args.join(" ");
                let isFound = false;

                for (const timestamp in user.todoList) {
                    const selectedNote = user.todoList[timestamp];

                    if (selectedNote === note) {
                        delete user.todoList[timestamp];
                        Storage.save();
                        isFound = true;
                        $.channel.send(`Removed \`${note}\` from your todo list.`);
                    }
                }

                if (!isFound) $.channel.send("That item couldn't be found.");
            }
        }),
        clear: new Command({
            async run($) {
                const user = Storage.getUser($.author.id);
                user.todoList = {};
                Storage.save();
                $.channel.send("Cleared todo list.");
            }
        })
    }
});
