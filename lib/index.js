const winston = require('winston');
const { format } = winston;
const { isUndefined, assign } = require('lodash');
const axios = require('axios');
const assert = require('assert');
const axiosRetry = require('axios-retry')

class Klaviyo {
  /**
   * Initialize a new `Analytics` with your Segment project's `writeKey` and an
   * optional dictionary of `options`.
   *
   * @param {String} publicKey
   * @param {Object} [options] (optional)
   *   @property {Winston.Transport} transport (default: Console)
   *   @property {Boolean} log (default: true)
   *   @property {String} logLevel (default: info)
   *   @property {String} apiBasePath (default: https://a.klaviyo.com/api)
   */

  constructor (publicKey, options) {
    options = options || {};

    assert(publicKey, 'You must pass your Klaviyo public key.')

    this.publicKey = publicKey;

    let defaultTransport = new winston.transports.Console({
      format: winston.format.combine(
        format.colorize(),
        format.timestamp({
         format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.align(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
    });

    let defaultOptions = {
      log: true,
      logLevel: 'info',
      transport: defaultTransport,
      apiBasePath: 'https://a.klaviyo.com/api',
      retryCount: 3
    };

    options = assign(defaultOptions, options);
    this.logger = {
      log: () => {}
    };

    this.apiBasePath = options.apiBasePath;

    if ( options.log ) {
      this.logger = winston.createLogger({
        level: options.logLevel,
        format: winston.format.json(),
        transports: [
          options.transport
        ]
      });
    }
    axiosRetry(axios, {
      retries: options.retryCount,
      retryCondition: this._isErrorRetryable,
      retryDelay: axiosRetry.exponentialDelay
    })
  }

  _isErrorRetryable (error) {
    // Retry Network Errors.
    if (axiosRetry.isNetworkError(error)) {
      return true
    }

    if (!error.response) {
      // Cannot determine if the request can be retried
      return false
    }

    // Retry Server Errors (5xx).
    if (error.response.status >= 500 && error.response.status <= 599) {
      return true
    }

    // Retry if rate limited.
    if (error.response.status === 429) {
      return true
    }

    return false
  }

  _requestKlaviyo (verb, data) {

    const endpoint = `${this.apiBasePath}/${verb}`;
    data['token'] = this.publicKey;
    const payload = Buffer.from(JSON.stringify(data)).toString('base64');

    this.logger.log('info', endpoint);
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: endpoint,
        params: {
          'data': payload
        }
      })    
        .then(response => {
          if(response.data === 0) {
            this.logger.log('warn', 'Klaviyo rejected the track request', data);
          } else {
            this.logger.log('verbose', 'Successfully sent an event to Klaviyo', data);  
          }
          resolve(response.data);
        })
        .catch((error) => {
          this.logger.log('error', `Encountered ${error.response.status} from GET to ${endpoint}`, data);
          reject(error);
        });
    });
  }

  track (eventName, email, event_properties={}, customer_properties={}) {
    this.logger.log('verbose', `Sending Klaviyo a track event ${eventName} for user ${email}`);
    assert(email, 'You must pass an email value.')


    customer_properties['$email'] = email;  

    const data = {
      'event' : eventName,
      'properties' : event_properties,
      'customer_properties' : customer_properties,
    }

    this._requestKlaviyo('track', data);
  }

  identify (email, customer_properties={}) {
    this.logger.log('verbose', `Sending Klaviyo an identify event for user ${email}`);
    assert(email, 'You must pass an email value.')

    customer_properties['$email'] = email;  

    const data = {
      'properties' : customer_properties,
    }

    this._requestKlaviyo('identify', data);
  }
}

module.exports = Klaviyo;