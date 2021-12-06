/* 根路徑 /test */
const router = require('express').Router();

router
    .get("/", (req, res) => res.status(200).json({
        message: "is test page",
        code: 200
    }))
    .get("/status", function (req, res) {
      let status = +req.query.status
      res.status(status).json({
        code: status
      })
    })

module.exports = router;