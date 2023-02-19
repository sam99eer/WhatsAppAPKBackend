const express = require("express");
const helmet = require('helmet');
const app = express();
const path = require("path");
const PORT = 4000;

const postRoutes = require("./routes/post-image");
const homeRoutes = require("./routes/home-routes");
const imagesRoutes = require("./routes/get-image");

app.use(helmet());
app.use(express.static(path.join(process.cwd(), "uploads")));

app.use("/images", imagesRoutes);
app.use("/upload", postRoutes);
app.use("/add-images", homeRoutes);
app.use("/", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "views", "welcome.html"));
});

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `);
});

module.exports = app;