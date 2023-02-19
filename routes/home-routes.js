const router = require("express").Router();

const path = require("path");

router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "views", "index.html"));
});

module.exports = router;