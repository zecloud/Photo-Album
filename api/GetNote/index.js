module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
   
    const name = (req.query.SessionId || (req.body && req.body.SessionId));
    
    if(context.bindings.inputDocumentIn)
    {
        const responseMessage = context.bindings.inputDocumentIn;
        context.res = {
            status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    }
    else
    {
        context.res={status:400};
    }
    context.done();
}