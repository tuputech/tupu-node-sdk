<a href="https://www.tuputech.com/">
    <img src="https://www.tuputech.com/zh/images/brandpage/tuputech_logo_horizontal_black.png" alt="tuputech"
         title="tuputech" align="right" />
</a>

## TUPU NODE SDK USER GUIDE

#### 1、Install tupu-node-sdk
```bash
npm install --save tupu-node-sdk
```

#### 2、Account, Authorization Keys
- Please contact our customer support, to specify your requirements, and apply account / secretId;
- Affter logined, follow <a href="https://www.tuputech.com/account/cert"> these steps </a> to generate your authorization private / public keys.

#### 3、SDK Examples

```js
var secretId = 'you_secretId'
var domain = 'api.open.tuputech.com'
var privateKeyPath = __dirname + '/my_private_key.pem'
var TUPU = require('tupu-node-sdk')
var tupu = new TUPU(secretId, privateKeyPath, { domain: domain, timeout: 10 * 1000 })

var testUrls = [
    'http://sample.com/1469532933675594/953.jpg'
    , 'http://sample.com/1469534372014467/233.jpg'
]

var options = {
	uid: 'you_uid'
	, tag: ['tag-test', 'tag-test-2']
}

tupu.byURLs(testUrls, options, function (data) {
    console.log(data)
})

var testFiles = [
    '/Users/testImage/266.jpg'
    , '/Users/testImage/267.jpg'
]

tupu.byFiles(testFiles, options, function (data) {
    console.log(data)
})

```

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

### Methods

#### 1. call TUPU API by urls
```js
tupu.byURLs(urls, options, cb) → {*}
```
- `urls`		[ 'http://sample.com/path/image.png', 'http://sample.com/path/images.zip' ]
- `options` <strong>[optional]</strong>, {tag: Array | String, uid: String}
- `cb`		function(data) 'data' is a json, detail specification can be found [here.](#https://www.tuputech.com/api/info)

#### 2. call TUPU API by POST Files
```js
tupu.byFiles(files, options, cb) → {*}
```
- `files`		[ '/path/to/file1.jpg', '/path/to/file2.zip' ]
- `options` <strong>[optional]</strong>, {tag: Array | String, uid: String}
- `cb`    	function(data) 'data' is a json, detail specification can be found [here.](#https://www.tuputech.com/api/info)


#### 3. call TUPU API by readable streams
```js
tupu.byStreams(streams, options, cb) → {*}
```
- `streams`		[ read stream1 , read stream2 ]
- `options` <strong>[optional]</strong>, {tag: Array | String, uid: String}
- `cb`    	function(data) 'data' is a json, detail specification can be found [here.](#https://www.tuputech.com/api/info)



## License
[MIT](http://www.opensource.org/licenses/mit-license.php)