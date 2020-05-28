"use strict"

var secretId = "5d38509d16b05d0fb24f3cc5"
var domain = "api.open.tuputech.com"
var privateKeyPath = __dirname + "/my_private_key.pem"
var TUPU = require("../lib/index")
var tupu = new TUPU(secretId, privateKeyPath, {
    domain: domain,
    timeout: 5 * 1000
})

var texts = [
    { content: "some text", contentId: "your_contentId" },
    { content: "some text 2", contentId: "your_contentId_2" }
]

tupu.byTexts(texts, function (data) {
    console.log(JSON.stringify(data, null, 2))
})
