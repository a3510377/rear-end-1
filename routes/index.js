const router = require('express').Router();

router
    .get("/", function (req, res) {
        res.status(200)
            .json({
                message: "此為 猴子架設的後端",
                code: 200,
            })
    })
    .use("/api", require("./API"))

module.exports = router