const router = require("express").Router();
const fs = require('fs');


router.get("/", (req, res) => {
    fs.readdir("public/uploads", (err, files) => {
        if (err) {
            res.status(404).json({ message: "Some Error Occured" });
            return;
        }

        const filePaths = files.map((fileName) => `http://3.15.23.55:8080/uploads/${fileName}`);
        // const filePaths = files.map((fileName) => `http://13.233.225.54:8080/uploads/${fileName}`);
        res.status(200).json(filePaths);
    });

});

module.exports = router;