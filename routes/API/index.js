/* 根路徑 /api */
const router = require('express').Router();
let routes = [{
    name: "/test",
    file: require("./test"),
    info: "test 用"
}, {
    name: "/discord",
    file: require("./discord"),
    info: "cors 代理"
}]

let routes_map = {};
for (let e of routes) routes_map[e.name] = e.info;

router
    .get("/", (req, res) => res.json({
        message: {
            routes: routes_map
        }
    }))

for (let i of routes) router.use(i.name, i.file)

module.exports = router;