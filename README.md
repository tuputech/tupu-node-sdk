<a href="https://www.tuputech.com/">
    <img src="https://www.tuputech.com/static/images/logo_w.svg" alt="tuputech"
         title="tuputech" align="right" />
</a>

## TUPU NODE SDK USER GUIDE

#### 1、Install tupu-node-sdk
```bash
npm install --save tupu-node-sdk
```

#### 2、Account, Authorization Keys
- Please contact our customer support, to specify your requirements, and apply account / secretId;
- After logined, follow <a href="https://console.cloud.tuputech.com/account/cert"> these steps </a> to generate your authorization private / public keys.

#### 3、SDK Examples
- test/image.test.js
- test/text.test.js
- test/video.test.js

## API Documentation
### Constructor
#### construct a TUPU API instance
```js
var tupu = new TUPU(secretId, privateKeyPath, options)
```
- `secretId` your secretId, contact us to apply your own secretId
- `privateKeyPath` /path/to/your/private/key.pem
- `options` default: {
                timeout: 30 * 1000
                domain: 'api.open.tuputech.com' # contact us for the other valid values
            }

### Image Methods

#### 1. call TUPU API by urls
```js
tupu.byURLs(urls, options, cb) → {*}
```
- `urls`		[ 'http://sample.com/path/image.png', 'http://sample.com/path/images.zip' ]
- `options` <strong>[optional]</strong>, {tag: Array | String, uid: String}
- `cb`		function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/image/)

#### 2. call TUPU API by POST Files
```js
tupu.byFiles(files, options, cb) → {*}
```
- `files`		[ '/path/to/file1.jpg', '/path/to/file2.zip' ]
- `options` <strong>[optional]</strong>, {tag: Array | String, uid: String}
- `cb`    	function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/image/)

#### 3. call TUPU API by readable streams
```js
tupu.byStreams(streams, options, cb) → {*}
```
- `streams`		[ read stream1 , read stream2 ]
- `options` <strong>[optional]</strong>, {tag: Array | String, uid: String}
- `cb`    	function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/image/)


### Text Methods

#### call TUPU API by texts
```js
tupu.byTexts(texts, options, cb) → {*}
```
- `texts`		[ {content: 'some text', contentId: 'your_contentId', ...others}]
- `cb`		function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/text/textAnalysis.html)


### Video Methods

#### 1. call TUPU Video Sync API by url
```js
tupu.videoSyncByUrl(url, options, cb) → {*}
```
- `url`		'http://sample.com/path/video.mp4'
- `options` <strong>[optional]</strong>, {interval: Number | maxFrames: Number | tag: String}
- `cb`		function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/video/syncscan/)

#### 2. call TUPU Video Sync API by POST File
```js
tupu.videoSyncByFile(file, options, cb) → {*}
```
- `file`	'/path/to/video.mp4'
- `options` <strong>[optional]</strong>, {interval: Number | maxFrames: Number | tag: String}
- `cb`    	function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/video/syncscan/)

#### 3. call TUPU Video Sync API by readable stream
```js
tupu.videoSyncByStream(stream, options, cb) → {*}
```
- `stream`  read stream
- `options` <strong>[optional]</strong>, {interval: Number | maxFrames: Number | tag: String}
- `cb`    	function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/video/syncscan/)

#### 4. call TUPU Video Async API by url
```js
tupu.videoAsyncByUrl(url, options, cb) → {*}
```
- `url`		'http://sample.com/path/video.mp4'
- `options` {customInfo: Object | interval: Number | callbackUrl: String | callbackRules: Object | realTimeCallback: Boolean}
- `cb`		function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/video/asyncscan/#1)

#### 5. call TUPU Video Stream API by url
```js
tupu.videoStreamByUrl(url, options, cb) → {*}
```
- `url`		'rtmp://sample.com/path/stream'
- `options` {customInfo: Object | interval: Number | callbackUrl: String | callbackRules: Object}
- `cb`		function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/video/asyncscan/#2)

#### 6. call TUPU Video Async/Stream Close API
```js
tupu.videoClose(videoId, cb) → {*}
```
- `videoId`	'5d4c074058b6cbdbfecaaea4'
- `cb`		function(data) 'data' is a json, detail specification can be found [here.](http://cloud.doc.tuputech.com/API/video/asyncscan/#3)

## License
[MIT](http://www.opensource.org/licenses/mit-license.php)