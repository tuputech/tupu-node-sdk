"use strict"

var fs = require("fs")

var secretId = "5d3a6cad92eea7b32fe6a014"
var domain = "api.open.tuputech.com"
var privateKeyPath = __dirname + "/my_private_key.pem"
var TUPU = require("../lib/index")
var tupu = new TUPU(secretId, privateKeyPath, {
    domain: domain,
    timeout: 5 * 1000
})

var testUrls = [
    "http://oper14.img.ingkee.com/1469532933675594/953.jpg",
    "http://oper7.img.ingkee.com/1469534372014467/233.jpg"
]

var options = { tag: ["tag-test"] }
tupu.byURLs(testUrls, options, function (data) {
    console.log(data)
})

var testFiles = ["./source/images/test.jpg"]
tupu.byFiles(testFiles, options, function (data) {
    console.log(JSON.stringify(data, null, 2))
})

var fs = require("fs")
var testStreams = [fs.createReadStream("./source/images/test.jpg")]

tupu.byStreams(testStreams, options, function (data) {
    console.log(data)
})
