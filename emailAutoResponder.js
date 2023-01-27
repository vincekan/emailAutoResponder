// Configurable script to auto reply in Gmail thread with attachment.
// Set to run at intervals via Triggers. Min frequency of 1 min.
// Based on https://stackoverflow.com/questions/36108478/how-to-trigger-a-google-apps-script-once-an-email-get-in-the-inbox

function emailAutoResponder() {

  // This is the label name used to isolate relevant threads
  const myLabel = "MYTESTLABEL"

  // Gets all threads that are starred and labelled with custom label
  const threads = GmailApp.search('is:starred label:' + myLabel);

  // For every resulting thread, reads the messages within the thread
  for (const thread of threads) {
    const messages = thread.getMessages()

    // Only action if there is only one message in the thread
    if (messages.length == 1) {

      var file = DriveApp.getFilesByName('myattachment.pdf');
      var replyBody = "Hello this is my auto reply. \nKind Regards\n";
      
      thread.reply(replyBody, {
        attachments: [file.next()],
        name: 'My Name'
        });
      
      messages[0].unstar()
    }
  }
}
