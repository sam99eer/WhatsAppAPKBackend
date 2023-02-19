const router = require("express").Router();
const fs = require('fs');


router.get("/", (req, res) => {
    fs.readdir("uploads", (err, files) => {
        if (err) {
            res.status(404).json({ message: "Some Error Occured" });
            return;
        }

        const filePaths = files.map((fileName) => `uploads/${fileName}`);
        console.log(filePaths);
        res.status(200).json(filePaths);
    });

});

module.exports = router;