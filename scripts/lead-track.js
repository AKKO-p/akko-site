/* ============================================================
   AKKO — lead form submit handler + analytics event
   ------------------------------------------------------------
   - Progressive enhancement: the form still works without JS (native
     POST submit to the configured endpoint).
   - With JS: submits via fetch, shows success/error in-place, and
     emits exactly one analytics event ("contact_form_submitted")
     if a privacy-friendly analytics global is available.
   - Privacy-friendly analytics supported (sniffed, never required):
       * Plausible        -> window.plausible('contact_form_submitted', { props: {...} })
       * Cloudflare WA    -> window.dispatchEvent custom CF beacon (already on the site)
       * No third-party loaded by this script. No cookies. No fingerprint.
   ============================================================ */

(function () {
  'use strict';

  var form = document.querySelector('[data-akko-lead-form]');
  if (!form) return;

  var submitBtns = form.querySelectorAll('button[type="submit"]');
  var statusEl = form.querySelector('.lead-form-status');

  function setStatus(state) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.classList.remove('is-success', 'is-error');
    if (state) statusEl.classList.add('is-' + state);
  }

  function setSubmitting(isSubmitting) {
    submitBtns.forEach(function (b) { b.disabled = !!isSubmitting; });
  }

  function trackSubmitted(payload) {
    // Plausible (cookieless, GDPR-friendly). Only call if globally exposed.
    try {
      if (typeof window.plausible === 'function') {
        window.plausible('contact_form_submitted', {
          props: {
            vertical: payload.vertical || 'unknown',
            deployment: payload.deployment || 'unknown',
            team_size: payload.team_size || 'unknown'
          }
        });
      }
    } catch (e) { /* never block submission on tracking */ }

    // Cloudflare Web Analytics: the existing beacon auto-tracks navigations.
    // We can emit a custom event via a CustomEvent listened to by the page.
    try {
      window.dispatchEvent(new CustomEvent('akko:contact_form_submitted', { detail: payload }));
    } catch (e) { /* ignore */ }
  }

  form.addEventListener('submit', function (evt) {
    // Honeypot check (silent).
    var gotcha = form.querySelector('input[name="_gotcha"]');
    if (gotcha && gotcha.value) {
      evt.preventDefault();
      return;
    }

    // If the form action is the placeholder, let the native submit go through
    // so the operator notices the mis-config in the network tab. Otherwise
    // intercept and submit via fetch.
    var action = form.getAttribute('action') || '';
    var isPlaceholder = !action || action.indexOf('your-endpoint-here') !== -1;
    if (isPlaceholder) {
      // Don't intercept; let the browser show the broken endpoint clearly.
      return;
    }

    evt.preventDefault();
    setSubmitting(true);
    setStatus(null);

    var fd = new FormData(form);
    var payload = {};
    fd.forEach(function (v, k) { payload[k] = typeof v === 'string' ? v : ''; });

    fetch(action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: fd
    }).then(function (res) {
      if (!res.ok) throw new Error('http ' + res.status);
      setStatus('success');
      trackSubmitted(payload);
      form.reset();
    }).catch(function () {
      setStatus('error');
    }).then(function () {
      setSubmitting(false);
    });
  });
})();
