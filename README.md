<a href="/tupu-node-sdk/out/TUPU.html">详细文档</a>

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

## for development

#### generate docs
you need jsdoc installed global first

```bash
jsdoc lib/ -R README.md
```

