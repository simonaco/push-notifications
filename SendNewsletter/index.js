const webpush = require('web-push');
module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const vapidKeys = {
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey
  };
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
  // sample notification payload
  const notificationPayload = {
    notification: {
      title: 'No news today',
      body: "You're awesome!!",
      icon: 'https://i.imgur.com/zPwJsyN.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Go to the site'
        }
      ]
    }
  };

  Promise.all(
    context.bindings.subscriptionDocuments.map(sub => {
      context.log(sub);
      webpush.sendNotification(sub, JSON.stringify(notificationPayload));
    })
  )
    .then(() => {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: { message: 'Newsletter sent successfully.' }
      };

      context.done();
    })
    .catch(err => {
      context.res = {
        status: 500 /* Defaults to 200 */,
        body: { message: `Error sending notification, reason: ${err}` }
      };
      context.done();
    });
};
