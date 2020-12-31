import Command from "../../core/command";
import {CommonLibrary} from "../../core/lib";

export default new Command({
    description: "Repeats your message.",
    usage: "<message>",
    run: "Please provide a message for me to say!",
    any: new Command({
        description: "Message to repeat.",
        async run($: CommonLibrary): Promise<any> {
            $.channel.send(`*${$.author} says:*\n${$.args.join(" ")}`);
        }
    })
});