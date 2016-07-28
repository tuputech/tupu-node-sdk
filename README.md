<a href="https://www.tuputech.com/">
    <img src="https://www.tuputech.com/zh/images/brandpage/tuputech_logo_horizontal_black.png" alt="图普科技"
         title="图普科技" align="right" />
</a>

## TUPU API 调用流程

#### 1、install tupu-node-sdk
```bash
npm install --save tupu-node-sdk
```

#### 2、账户、公私钥
- 请联系图普售前/客户支持，明确需求，以便申请账户、申请开通secretId；
- 登录后，<a href="https://www.tuputech.com/account/cert">参考此说明</a>生成并上传公钥；


#### 3、sdk 调用示例

```js 
var secretId = 'you_secretId'
var domain = 'api.open.tuputech.com'
var privateKeyPath = __dirname + '/my_private_key.pem'
var TUPU = require('tupu-node-sdk')
var tupu = new TUPU(domain, secretId, privateKeyPath)

var testUrls = [
    'http://sample.com/1469532933675594/953.jpg'
    , 'http://sample.com/1469534372014467/233.jpg'
]
tupu.byURLs(testUrls, function (data) {
    console.log(data)
})

var testFiles = [
    '/Users/testImage/266.jpg'
    , '/Users/testImage/267.jpg'
]

tupu.byFiles(testFiles, function (data) {
    console.log(data)
})

```

## API 说明
#### construct a TUPU API instance
```js
var tupu = new TUPU(domain, secretId, privateKeyPath, options)
```
- `domain` TUPU API domain, e.g. 'API.open.tuputech.com', contact us for the other valid values
- `secretId` your secretId, contact us to apply your own secretId
- `privateKeyPath` /path/to/your/private/key.pem
- `options` default: { timeout: 30 * 1000 }

### Methods

#### 1. call TUPU API by urls
```js 
tupu.byURLs(urls, cb) → {*}
```
- `urls`		[ 'http://sample.com/path/image.png', 'http://sample.com/path/images.zip' ]
- `cb`		function(data) 'data' is a json, detail specification can be found [here](#https://www.tuputech.com/api/info).

#### 2. call TUPU API by POST Files
```js
tupu.byFiles(files, cb) → {*}
```
- `files`		[ '/path/to/file1.jpg', '/path/to/file2.zip' ]
- `cb`    	function(data) 'data' is a json, detail specification can be found [here](#https://www.tuputech.com/api/info).


#### 3. call TUPU API by file streams
```js 
tupu.byStreams(streams, cb) → {*}
```
- `streams`		[ read stream1 , read stream2 ]
- `cb`    	function(data) 'data' is a json, detail specification can be found [here](#https://www.tuputech.com/api/info).


