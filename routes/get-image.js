const router = require("express").Router();
const fs = require('fs');


router.get("/", (req, res) => {
    fs.readdir("public/uploads", (err, files) => {
        if (err) {
            res.status(404).json({ message: "Some Error Occured" });
            return;
        }

        const filePaths = files.map((fileName) => `http://18.225.37.131:8080/uploads/${fileName}`);
        res.status(200).json(filePaths);
    });

});

module.exports = router;