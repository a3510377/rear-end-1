/* 根路徑 /discord */
const router = require('express').Router();
let routes = [{
    name: "/v1",
    file: require("./v1"),
    info: "版本 1"
}, ]

let routes_map = {}
for (let e of routes) routes_map[e.name] = e.info;

router
    .get("/", (req, res) => res.json({
        router: routes_map
    }))

for (let i of routes) router.use(i.name, i.file)

module.exports = router;