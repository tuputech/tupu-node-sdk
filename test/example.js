'use strict';

var fs = require('fs')


var secretId = '54f50aa037e9880d6d2a86ee'
var domain = 'api.open.tuputech.com'
var privateKeyPath = __dirname + '/my_private_key.pem'
var TUPU = require('../lib/index')
var tupu = new TUPU(secretId, privateKeyPath, {domain: domain, timeout: 5 * 1000})

var testUrls = [
    'http://oper14.img.ingkee.com/1469532933675594/953.jpg'
    , 'http://oper7.img.ingkee.com/1469534372014467/233.jpg'
]
var options =  {uid: 'your-uid', tag: ['tag-test','tag-test-2']}
tupu.byURLs(testUrls, options, function (data) {
    console.log(data)
})

var testFiles = [
    '/Users/zouyixiong/testImage/WD-test/266.jpg'
    , '/Users/zouyixiong/testImage/WD-test/99.jpg'
]
tupu.byFiles(testFiles, options, function (data) {
    console.log(data)
})

var fs = require('fs')
var testStreams = [
    fs.createReadStream('/Users/zouyixiong/testImage/WD-test/946.jpg')
    , fs.createReadStream('/Users/zouyixiong/testImage/WD-test/99328470.png')
]

tupu.byStreams(testStreams, options, function (data) {
    console.log(data)
})
