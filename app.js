const express = require("express");
const helmet = require('helmet');
const app = express();
const path = require("path");
const cors = require('cors');
const postRoutes = require("./routes/post-image");
const homeRoutes = require("./routes/home-routes");
const imagesRoutes = require("./routes/get-image");
const deleteRoutes = require("./routes/delete-image");

app.use(cors());
// app.use(helmet());
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/images", imagesRoutes);
app.use("/upload", postRoutes);
app.use("/add-images", homeRoutes);
app.use("/delete", deleteRoutes);
app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(process.cwd(), "views", "welcome.html"));
});

app.listen(8080);