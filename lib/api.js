
let debug = require('debug')('TUPU:api')
let request = require('request')
let util = require('util')
let http = require('http')

let httpKeepAliveAgent = new http.Agent({keepAlive: true, maxSockets: 1000})

exports._formApi = function (url, cb, fieldAppendFunc) {
    let that = this
    let timestamp = Math.round(new Date().getTime() / 1000)
    let nonce = Number(Math.random()).toString()
    let start = Date.now()

    let sendSignature = this._signer(timestamp, nonce)

    let params = {
        timestamp: timestamp, nonce: nonce, signature: sendSignature
    }
    debug(params)

    let options = {
        timeout: this.timeout
        , agent: httpKeepAliveAgent
    }
    let req = request.post(url, options, function (err, httpResponse, body) {
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

            debug(recvSignature)
            // 3、verify json with signature
            if (that._verifier(recvSignature, json)) {
                json = JSON.parse(json)
                debug('return json verify succeed ***********')
                debug(util.inspect(json, false, null))
                cb(json)
            } else {
                console.error('TUPU: return json verify failed ***********')
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

    let form = req.form()
    for (let key in params) {
        form.append(key, params[key])
    }
    fieldAppendFunc(form)
}

exports._jsonApi = function (url, cb, fieldAppendFunc) {
    let that = this
    let timestamp = Math.round(new Date().getTime() / 1000)
    let nonce = Number(Math.random()).toString()
    let start = Date.now()

    let sendSignature = this._signer(timestamp, nonce)

    let params = {
        timestamp: timestamp, nonce: nonce, signature: sendSignature
    }
    fieldAppendFunc(params)
    debug(params)

    let options = {
        timeout: this.timeout
        , agent: httpKeepAliveAgent
        , body: params
        , json: true
    }
    request.post(url, options, function (err, httpResponse, body) {
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
            // 1、get signature and json fields
            let recvSignature = body.signature
                , json = body.json

            debug(recvSignature)
            // 2、verify json with signature
            if (that._verifier(recvSignature, json)) {
                json = JSON.parse(json)
                debug('return json verify succeed ***********')
                debug(util.inspect(json, false, null))
                cb(json)
            } else {
                console.error('TUPU: return json verify failed ***********')
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
}
