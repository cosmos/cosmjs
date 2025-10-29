import "ses";
/* global lockdown */

if (globalThis.process.env.SES_ENABLED) {
  lockdown();
}
