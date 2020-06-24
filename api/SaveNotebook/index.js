module.exports = async function (context, req) {
    //context.log('JavaScript HTTP trigger function processed a request.');
    if(!context.bindings.notebookin)
        context.bindings.notebook = [];
    else
        context.bindings.notebook= context.bindings.notebookin;
    if (req.body && req.body.sessionid) {
        context.bindings.notebook.push({
            PartitionKey:  "anonymous",
            RowKey: req.body.sessionid,
            Title: req.body.title
        });
        context.res ={ status:200}
    }
    else{
        context.res ={status:400}
    }
   
    
    context.done()
}