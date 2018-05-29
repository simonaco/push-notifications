module.exports = function(context, req) {
  const sub = req.body;
  context.log('Received Subscription on the server: ', sub);
  context.bindings.subscriptionDocuments = sub;
  context.res = {
    body: { message: 'saved' }
  };

  context.done();
};
