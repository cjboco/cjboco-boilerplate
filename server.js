/* eslint-disable */
const express = require("express");
const http = require("http");
const path = require("path");
const reload = require("reload");
const logger = require("morgan");
const fs = require("fs");

const app = express();

// directory path
const devDir = path.join(__dirname, "dev");
const distDir = path.join(__dirname, "dist");

// simple function to return file extension
// https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/1203361#1203361
const getFileExtension = function (filename) {
	return (
		filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
		filename
	);
};

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));

// my dist dir struture
app.use("/vendor", express.static(path.join(distDir, "assets/js/vendor")));
app.use("/cjboco", express.static(path.join(distDir, "assets/js/cjboco")));
app.use("/js", express.static(path.join(distDir, "assets/js")));
app.use("/images", express.static(path.join(distDir, "assets/images")));
app.use("/css", express.static(path.join(distDir, "assets/css")));
app.use("/assets", express.static(path.join(distDir, "assets")));

// list all files in the directory
try {
	const files = fs.readdirSync(devDir);

	// files object contains all files names
	// tell express to use the the file, if it's HTML
	files.forEach((file) => {
		if (getFileExtension(file) === "html") {
			app.get("/" + file, (req, res) => {
				res.sendFile(path.join(distDir, file));
			});
		}
	});
} catch (err) {
	console.log(err);
}

app.get("/", (req, res) => {
	res.sendFile(path.join(distDir, "index.html"));
});

var server = http.createServer(app);

// Reload code here
reload(app).then(function (reloadReturned) {
	server.listen(app.get("port"), function () {
		console.log("Web server listening on port " + app.get("port"));
	});
});
