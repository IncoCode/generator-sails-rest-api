/**
 * Exports object that contains names of options as a key and their configuration objects as a value
 *
 * @example
 * export default {
 *   optionName: {
 *     desc: 'Description for the option',
 *     alias: 'Short name for the option',
 *     type: Boolean || String || Number,
 *     defaults: 'Default value',
 *     hide: false
 *   }
 * };
 */

import crypto from 'crypto';

export default {
  'cipher-secret-key': {
    'desc': 'Specifies the secret key to use in CipherService',
    'type': String,
    'defaults': crypto.randomBytes(32).toString('hex'),
    'hide': false
  },

  'image-provider': {
    'desc': 'Specifies the image provider for ImageService',
    'type': String,
    'defaults': 'GM',
    'hide': false
  },

  'location-provider': {
    'desc': 'Specifies the location provider for LocationService',
    'type': String,
    'defaults': 'Google',
    'hide': false
  },

  'mailer-provider': {
    'desc': 'Specifies the mailer provider for MailerService',
    'type': String,
    'defaults': 'sendmail',
    'hide': false
  },

  'payment-provider': {
    'desc': 'Specifies the payment provider for PaymentService',
    'type': String,
    'defaults': 'Stripe',
    'hide': false
  },

  'sms-provider': {
    'desc': 'Specifies the SMS provider for SmsService',
    'type': String,
    'defaults': 'Twilio',
    'hide': false
  },

  'storage-provider': {
    'desc': 'Specifies the storage provider for StorageService',
    'type': String,
    'defaults': 'Amazon',
    'hide': false
  }
};
