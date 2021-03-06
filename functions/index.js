const functions = require('firebase-functions')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp()

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check to see if user is an admin
  if (context.auth.token.admin !== true) {
    return {
      error:
        'Only Admins can add other admins, You should be ashamed of yourself!'
    }
  }
  // Get current user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      })
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`
      }
    })
    .catch(err => {
      return err
    })
})
