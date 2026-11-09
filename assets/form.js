// Contact form → Google Forms.
//
// Setup: create the Google Form, open ⋮ → "Get pre-filled link", fill every
// field with a dummy value, click "Get link", and copy the IDs from that URL:
//   https://docs.google.com/forms/d/e/<FORM_ID>/viewform?entry.111=Name&entry.222=...
// Paste FORM_ID and each entry.NNN below. Until FORM_ID is set, the form
// runs in demo mode (shows the thank-you message, sends nothing).
var GOOGLE_FORM = {
  FORM_ID: '1FAIpQLSd8zD-Go9B8sByRAhf2PZ_Ed8Sa3mylkw4nU9n62cXTjsxZnA',
  fields: {
    name:    'entry.675801371',
    email:   'entry.456350512',
    topic:   'entry.603509937',
    date:    'entry.493565092',
    message: 'entry.751343943'
  }
};

document.querySelectorAll('form[data-contact]').forEach(function (form) {
  var done = form.querySelector('.form-done');
  var fail = form.querySelector('.form-fail');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.website && form.website.value) return; // honeypot: bots fill hidden fields

    function finish() {
      form.reset();
      button.disabled = false;
      button.textContent = 'Send message';
      if (fail) fail.hidden = true;
      if (done) done.hidden = false;
    }

    var configured = GOOGLE_FORM.FORM_ID && Object.keys(GOOGLE_FORM.fields).every(function (k) {
      return !/^entry\.000/.test(GOOGLE_FORM.fields[k]);
    });
    if (!configured) { finish(); return; } // demo mode until real entry IDs are set

    var data = new URLSearchParams();
    Object.keys(GOOGLE_FORM.fields).forEach(function (key) {
      if (form[key]) data.append(GOOGLE_FORM.fields[key], form[key].value);
    });

    button.disabled = true;
    button.textContent = 'Sending…';

    // Google doesn't send CORS headers, so the response is opaque. A network
    // failure still rejects, which is the case worth reporting.
    fetch('https://docs.google.com/forms/d/e/' + GOOGLE_FORM.FORM_ID + '/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: data
    }).then(finish).catch(function () {
      button.disabled = false;
      button.textContent = 'Send message';
      if (fail) fail.hidden = false;
    });
  });
});
