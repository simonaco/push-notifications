module.exports = function(context, req) {
  const vapidKeys = {
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
  };
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
  context.res = {
    status: 400,
    body: 'Please pass a name on the query string or in the request body'
  };
  context.done();
};
