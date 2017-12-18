/* jshint node:true */
'use strict';

var factory = require('./factory.js');
var config = require('../../test-config.json');
var apps = require('../../devAppKeys.json');

module.exports = function() {
    // cleanup before every scenario
    this.Before(function(scenario, callback) {
        this.apickli = factory.getNewApickliInstance();
        this.apickli.storeValueInScenarioScope("apiproxy", config.apiconfig.apiproxy);
        this.apickli.storeValueInScenarioScope("basepath", config.apiconfig.basepath);
        getCredsFromExport(config.apiconfig.app, config.apiconfig.product);
        this.apickli.storeValueInScenarioScope("clientId", creds.clientId);
        this.apickli.storeValueInScenarioScope("clientSecret", creds.clientSecret);
        this.apickli.storeValueInScenarioScope("invalidClientSecret", config.apiconfig.invalidClientSecret);
        this.apickli.storeValueInScenarioScope("oauthDomain", config.apiconfig.oauthDomain );
        this.apickli.storeValueInScenarioScope("oauthBasepath", config.apiconfig.oauthBasepath);
        this.apickli.storeValueInScenarioScope("userUsername", config.apiconfig.userUsername);
        this.apickli.storeValueInScenarioScope("userPassword", config.apiconfig.userPassword);
        console.log( "INIT CREDS: " + creds.clientId + " " + creds.clientSecret);
        callback();
    });
};

var creds = {};

// Just take the first match
function getCredsFromExport(appName, productName){
  for(var app in apps){
    if(apps[app].name === appName){
      var credentials = apps[app].credentials;
      for(var credential in credentials){
        var products = credentials[credential].apiProducts;
        for(var product in products){
          if(products[product].apiproduct === productName){
            creds.clientId = credentials[credential].consumerKey;
            creds.clientSecret = credentials[credential].consumerSecret;
          }
          break;
        }
        break;
      }
      break;
    }
  }
}

