var express = require("express");
var http = require("http");
var path = require("path");
var reload = require("reload");
var bodyParser = require("body-parser");
var logger = require("morgan");
var chokidar = require("chokidar");

var app = express();

var distDir = path.join(__dirname, "dist");

app.set("port", process.env.PORT || 8080);
app.use(logger("dev"));
app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded

// my dist dir struture
app.use(
	"/vendor",
	express.static(path.join(__dirname, "dist/assets/js/vendor"))
);
app.use(
	"/mylibs",
	express.static(path.join(__dirname, "dist/assets/js/mylibs"))
);
app.use("/js", express.static(path.join(__dirname, "dist/assets/js")));
app.use(
	"/images",
	express.static(path.join(__dirname, "dist/assets/images"))
);
app.use("/css", express.static(path.join(__dirname, "dist/assets/css")));
app.use("/assets", express.static(path.join(__dirname, "dist/assets")));

app.get("/", function (req, res) {
	res.sendFile(path.join(distDir, "index.html"));
});

var server = http.createServer(app);

// Reload code here
reload(app);

// Initialize watcher.
var watcher = chokidar.watch(["dist/assets/"], {
	persistent: true,
	ignored: [".*"],
	ignoreInitial: true,
	followSymlinks: true,
	cwd: ".",
	usePolling: true,
	interval: 500,
	binaryInterval: 1000,
	alwaysStat: false,
	depth: 10,
	awaitWriteFinish: {
		stabilityThreshold: 2000,
		pollInterval: 100,
	},
	ignorePermissionErrors: false,
	atomic: true,
});

watcher.on("change", (path) => {
	reload(app).reload();
});

server.listen(app.get("port"), function () {
	console.log("Web server listening on port " + app.get("port"));
});
