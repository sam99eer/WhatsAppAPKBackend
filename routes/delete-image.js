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

        const filePaths = files.map((fileName) => `http://localhost:8080/uploads/${fileName}`);
        // const filePaths = files.map((fileName) => `http://18.225.37.131:8080/uploads/${fileName}`);
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
    fs.unlink(newPath, (err) => {
        if (err) {
            res.send(400).send("Unable to delete file");
            return;
        }
        res.redirect("/delete");
    });

});

module.exports = router;