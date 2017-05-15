'use strict';

var request = require('request');

function CurrencyController(options) {
  this.node = options.node;
  var refresh = options.currencyRefresh || CurrencyController.DEFAULT_CURRENCY_DELAY;
  this.currencyDelay = refresh * 60000;
  // this.bitstampRate = 0;
  /* 
  this.exchange_rates = {
    zcoin_usd: 0.00,
    btc_usd: 0.00,
    btc_zcoin: 0.00
  };*/
  this.timestamp = Date.now();
}

CurrencyController.DEFAULT_CURRENCY_DELAY = 10;

CurrencyController.prototype.index = function(req, res) {
  var self = this;
  var currentTime = Date.now();
  if (self.exchange_rates.zcoin_usd === 0.00 || currentTime >= (self.timestamp + self.currencyDelay)) {
    self.timestamp = currentTime;
    //make price ticker for zcoin (https://www.bitstamp.net/api/ticker/)
    request('WWW.ZCOINPRICETICKER.COM', function(err, response, body) {
      if (err) {
        self.node.log.error(err);
      }
      if (!err && response.statusCode === 200) {
       // self.bitstampRate = parseFloat(JSON.parse(body).last);
       /* var response = JSON.parse(body);
        self.exchange_rates = response.exchange_rates;
        self.exchange_rates.bitstamp = response.exchange_rates.zcoin_usd;
       */
      }
      res.jsonp({
        status: 200,
        data: self.exchange_rates
        });
    });
  } else {
      res.jsonp({
        status: 200,
        data: self.exchange_rates
    });
  }

};

module.exports = CurrencyController;
