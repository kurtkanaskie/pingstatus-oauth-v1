/* jshint node:true */
'use strict';

var factory = require('./factory.js');
var config = require('../../test-config.json');

module.exports = function() {
    // cleanup before every scenario
    this.Before(function(scenario, callback) {
        this.apickli = factory.getNewApickliInstance();
        this.apickli.storeValueInScenarioScope("apiproxy", config.apiconfig.apiproxy);
        this.apickli.storeValueInScenarioScope("basepath", config.apiconfig.basepath);
        this.apickli.storeValueInScenarioScope("clientId", config.apiconfig.clientId);
        this.apickli.storeValueInScenarioScope("clientSecret", config.apiconfig.clientSecret);
        this.apickli.storeValueInScenarioScope("invalidClientSecret", config.apiconfig.invalidClientSecret);
        this.apickli.storeValueInScenarioScope("oauthDomain", config.apiconfig.oauthDomain );
        this.apickli.storeValueInScenarioScope("oauthBasepath", config.apiconfig.oauthBasepath);
        this.apickli.storeValueInScenarioScope("userUsername", config.apiconfig.userUsername);
        this.apickli.storeValueInScenarioScope("userPassword", config.apiconfig.userPassword);
        callback();
    });
};

