module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if(req.body)
    {
        if(context.bindings.inputDocumentIn)
        {
            context.bindings.inputDocumentOut = context.bindings.inputDocumentIn;
            if(req.body.title)
                context.bindings.inputDocumentOut.title = req.body.title;
            if(req.body.photo)
            {
                if(!context.bindings.inputDocumentOut.photo)
                    context.bindings.inputDocumentOut.photo=[];
                context.bindings.inputDocumentOut.photo.push({filename:req.body.photo[0].filename});
                
            }

        }
        else
        {
            context.bindings.inputDocumentOut =req.body;
            context.bindings.inputDocumentOut.id= req.body.SessionId;
        }
        context.res={status:200};
    }
    else
    {
        context.res={status:400};
    }
    //context.bindings.inputDocumentOut.text = "This was updated!";
    
    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

   context.done;
}