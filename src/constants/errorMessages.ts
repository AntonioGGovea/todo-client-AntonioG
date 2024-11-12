const crudMessageBuilder = (action: string, objType: string) =>
    `Error while ${action} the ${objType}.`;

const generalError = 'Something went wrong.'

const errorMessages = {
    todo: {
        remove: crudMessageBuilder("removing", "Todo"),
        update: crudMessageBuilder("updating", "Todo"),
        create: crudMessageBuilder("creating", "Todo"),
    },
    generalError,
}

export default errorMessages;
