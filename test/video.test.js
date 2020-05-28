'use strict';

var fs = require('fs')


var secretId = '54f50aa037e9880d6d2a86ee'
var domain = 'api.open.tuputech.com'
var privateKeyPath = __dirname + '/my_private_key.pem'
var TUPU = require('../lib/index')
var tupu = new TUPU(secretId, privateKeyPath, {domain: domain, timeout: 30 * 1000})

var syncVideoOptions = {
    interval: 2,
    maxFrames: 5,
    tag: 'video-sdk',
}
var videoFile = '/Users/air/Desktop/video.mp4'
tupu.videoSyncByFile(videoFile, syncVideoOptions, function (data) {
    console.log(data)
})

var videoStream = fs.createReadStream(videoFile)
tupu.videoSyncByStream(videoStream, syncVideoOptions, function (data) {
    console.log(data)
})

var videoUrl = 'http://vfx.mtime.cn/Video/2019/03/14/mp4/190314223540373995.mp4'
tupu.videoSyncByUrl(videoUrl, syncVideoOptions, function (data) {
    console.log(data)
})

var asyncVideoOptions = {
    customInfo: {id: 1},
    interval: 10,
    callbackUrl: 'http://sample.com/callback'
}
tupu.videoAsyncByUrl(videoUrl, asyncVideoOptions, function (data) {
    console.log(data)
})

var videoRtmp = 'rtmp://sample.com/stream'
tupu.videoStreamByUrl(videoRtmp, asyncVideoOptions, function (data) {
    console.log(data)
})

var videoId = '5d4c074058b6cbdbfecaaea4'
tupu.videoClose(videoId, function (data) {
    console.log(data)
})
