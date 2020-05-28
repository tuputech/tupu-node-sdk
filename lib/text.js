var assert = require("assert")
/**
 * call TUPU API for text recognition by texts
 * @param texts [ {content: 'some text', contentId: 'your_contentId', ...others} ]
 * @param options {tag: Array | String, uid: String}
 * @param cb function(data){}
 *           'data' is a json, detail specification can be found in:
 *           <a target="_blank" href="https://www.tuputech.com/api/info">https://www.tuputech.com/api/info </a>
 * @returns {*}
 */
exports.byTexts = function (texts, callback) {
    assert(typeof callback === "function", "Callback must be function")
    return this._jsonApi(this.textApi, callback, function (params) {
        params.text = texts
    })
}
