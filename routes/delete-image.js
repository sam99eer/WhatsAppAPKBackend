const router = require("express").Router();
const fs = require("fs");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    fs.readdir("public/uploads", (err, files) => {
        if (err) {
            res.status(404).json({ message: "Some Error Occured" });
            return;
        }

        const filePaths = files.map((fileName) => `http://3.15.23.55:8080/uploads/${fileName}`);
        // const filePaths = files.map((fileName) => `http://13.233.225.54:8080/uploads/${fileName}`);
        res.render("delete", { images: filePaths });
    });
});

router.post("/image", (req, res) => {
    const { images } = req.body;

    if (!!images === false) {
        res.status(400).send("Please select a valid image");
        return;
    }

    const filePath = images.split("/");
    const newPath = `${process.cwd()}\\public\\${filePath.at(-2)}\\${filePath.at(-1)}`;
    console.log(newPath);
    fs.unlink(newPath, (err) => {
        if (err) {
            console.log("error -");
            console.log(err);
            res.status(400).send("Unable to delete file");
            return;
        }
        res.redirect("/delete");
    });

});

module.exports = router;