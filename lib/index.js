'use strict';

let crypto = require('crypto');
let debug = require('debug')('TUPU');
let request = require('request');
let util = require('util');
let fs = require('fs');
let http = require('http');
let Path = require('path');

let tupu_public_key_path = Path.resolve(__filename + '/../tupu_public_key.pem');
debug('tupu_public_key_path', tupu_public_key_path);
const TUPU_SERVER_PUBLIC_KEY = fs.readFileSync(tupu_public_key_path).toString();

/**
 * construct a TUPU API instance
 * @param secretId your secretId, contact us to apply your own secretId
 * @param privateKeyPath /path/to/your/private/key.pem
 * @param options default:  <br/>
 * timeout: 30 * 1000 <br/>
 * domain: 'api.open.tuputech.com' (contact us for the other valid domains)
 * @constructor
 */
function TUPU(secretId, privateKeyPath, options) {
    options = options || {};

    let domain = options.domain || 'api.open.tuputech.com'
    this.interface = 'http://' + domain + '/v3/recognition/' + secretId;
    this.secretId = secretId;
    this.privateKey = fs.readFileSync(privateKeyPath).toString();

    this.timeout = options.timeout || 30 * 1000;

    debug(this.interface, this.secretId, this.privateKey, this.timeout);
}
module.exports = TUPU;

/**
 * add tags to form
 * @param tags
 * @param form
 * @private
 */
let _addTagsToForm = function (tags, form) {
    if (!tags) {
        return
    }
    if (typeof tags === 'string') {
        return form.append('tag', tags);
    }
    if (util.isArray(tags) && tags.length > 0) {
        tags.forEach(function (tag) {
            form.append('tag', tag);
        });
    }
};

/**
 * call TUPU API by urls
 * @param urls [ 'http://sample.com/path/image.png', 'http://sample.com/path/images.zip' ]
 * @param tags [ 'room1', 'room2' ]
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
TUPU.prototype.byURLs = function (urls, tags, cb) {
    if (typeof tags === 'function') {
        cb = tags;
    }
    return this._api('url', cb, function (form) {
        urls.forEach(function (url) {
            form.append('image', url)
        })
        _addTagsToForm(tags, form);
    })
}

/**
 * call TUPU API by POST Files
 * @param files [ '/path/to/file1.jpg', '/path/to/file2.zip' ]
 * @param tags [ 'room1', 'room2' ]
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
TUPU.prototype.byFiles = function (files, tags, cb) {
    if (typeof tags === 'function') {
        cb = tags;
    }
    return this._api('file', cb, function (form) {
        files.forEach(function (file) {
            form.append('image', fs.createReadStream(file))
        })
        _addTagsToForm(tags, form);
    })
}

/**
 * call TUPU API by file streams
 * @param streams [ read stream1 , read stream2 ]
 * @param tags [ 'room1', 'room2' ]
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
TUPU.prototype.byStreams = function (streams, tags, cb) {
    if (typeof tags === 'function') {
        cb = tags;
    }
    return this._api('file', cb, function (form) {
        streams.forEach(function (stream) {
            form.append('image', stream)
        })
        _addTagsToForm(tags, form);
    })
}

let httpKeepAliveAgent = new http.Agent({keepAlive: true, maxSockets: 1000});

TUPU.prototype._api = function (type, cb, imageFieldAppendFunc) {

    let signParams = [];
    let signer = crypto.createSign('RSA-SHA256');
    let timestamp = Math.round(new Date().getTime() / 1000);
    let nonce = Number(Math.random()).toString();
    let start = Date.now();

    // 1、push all sign params, by order: secretId, timestamp, nonce
    // 2、sign with 'RSA-SHA256' algorithms, and out put result in 'base64' format

    signParams.push(this.secretId, timestamp, nonce)
    signer.update(signParams.join(','), 'utf-8')
    let sendSignature = signer.sign(this.privateKey, 'base64')

    let params = {
        secretId: this.secretId, timestamp: timestamp, nonce: nonce, signature: sendSignature
    }
    debug(params)

    let options = {
        timeout: this.timeout
        , agent: httpKeepAliveAgent
    }
    let req = request.post(this.interface, options, function (err, httpResponse, body) {
        console.log('TUPU: API response total time ', (Date.now() - start), 'ms')

        if (err) {
            console.error('TUPU: return error:', err.message)
            return cb({
                code: 101
                , message: err.message
            })
        }
        debug(body)

        try {
            // 1、parse the receive body string to JSON format data
            body = JSON.parse(body)

            // 2、get signature and json fields
            let recvSignature = body.signature
                , json = body.json
                , verifier = crypto.createVerify('RSA-SHA256')

            debug(recvSignature)
            // 3、verify json with signature
            verifier.update(json, 'utf-8')
            if (verifier.verify(TUPU_SERVER_PUBLIC_KEY, recvSignature, 'base64')) {
                json = JSON.parse(json)
                debug('return json verify succeed ***********')
                debug(util.inspect(json, false, null))
                cb(json)
            } else {
                console('TUPU: return json verify failed ***********')
                cb({
                    code: 101
                    , message: 'return json verify failed'
                })
            }
        } catch (err) {
            console.error('TUPU: parse return json exception', err.message)
            console.error('TUPU', body)
            cb({
                code: 101
                , message: 'parse return json exception'
            })
        }
    })

    let form = req.form();
    for (let key in params) {
        form.append(key, params[key])
    }
    imageFieldAppendFunc(form)
}