/* 根路徑 /v1 */
const router = require('express').Router();
const axios = require('axios');

router
    .get("/google/message", (req, res) => {
        axios.get(encodeURI(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${req.query.tl || "zh-tw"}&q=${req.query.q}`), {
                responseType: 'arraybuffer',
            })
            .then((d) => res.send(d.data))
            .catch(error => console.log(error))
    })

router
    .all("/", (req, res, next) => {
        if (!req.query.url || !req.headers.authorization) {
            return res.status(400).json({
                message: "缺少必要參數",
                code: 400
            })
        }
        return next();
    })
    .get("/", (req, res) => {
        axios({
                url: `https://discord.com/api/v${req.query.v || "9"}${req.query.url}`,
                method: req.headers.method || "GET",
                headers: {
                    authorization: req.headers.authorization
                }
            })
            .then(d => {
                for (let [key, value] of Object.entries(d.headers)) res.setHeader(key, value);
                res.status(d.status || 200).json(d.data);
            })
            .catch((error) => {
                res.status(error.response && error.response.status || 500).json({
                    error: error
                })
            })
    })
    .all("/", function (req, res) {
        let data = {
            url: `https://discord.com/api/v9${req.query.url}`,
            method: req.headers.method,
            headers: {
                "Content-Type": "application/json",
                authorization: req.headers.authorization
            },

        }
        req.body && (data = {
            ...data,
            data: JSON.stringify(req.body) || {}
        })
        axios(data)
            .then(d => {
                for (let [key, value] of Object.entries(d.headers)) res.setHeader(key, value);
                res.status(d.status || 200).json(d.data);
            })
            .catch((error) => {
                res.status(error.response && error.response.status || 500).json({
                    error: error
                })
            })
    })

module.exports = router;