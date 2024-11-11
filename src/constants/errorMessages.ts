const messageBuilder = (action: string, objType: string) =>
    `Error while ${action} the ${objType}.`

const errorMessages = {
    todo: {
        remove: messageBuilder("removing", "Todo"),
        update: messageBuilder("updating", "Todo"),
        create: messageBuilder("creating", "Todo"),
    }
}

export default errorMessages;
