
let crypto = require('crypto')
let debug = require('debug')('TUPU:sign')
let fs = require('fs')
let Path = require('path')

let tupu_public_key_path = Path.resolve(__filename + '/../tupu_public_key.pem')
debug('tupu_public_key_path', tupu_public_key_path)
const TUPU_SERVER_PUBLIC_KEY = fs.readFileSync(tupu_public_key_path).toString()

exports._signer = function (timestamp, nonce) {
    let signer = crypto.createSign('RSA-SHA256')

    // 1、push all sign params, by order: secretId, timestamp, nonce
    // 2、sign with 'RSA-SHA256' algorithms, and out put result in 'base64' format

    let signParams = [this.secretId, timestamp, nonce]
    signer.update(signParams.join(','), 'utf-8')
    let signature = signer.sign(this.privateKey, 'base64')
    return signature
}

exports._verifier = function (signature, json) {
    let verifier = crypto.createVerify('RSA-SHA256')

    verifier.update(json, 'utf-8')
    let verification = verifier.verify(TUPU_SERVER_PUBLIC_KEY, signature, 'base64')
    return verification
}
