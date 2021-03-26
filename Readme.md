# CJBoCo Bolierplate

This is my base boilerplate for web development. Designed to be somewhat like Grunt or Gulp, it has automatic functionality that will minify code, CSS and images.

### Setup
You need to create a `.ftpjsrc` file. This holds your FTP credentials. Checkout the `.ftpjsrc-sample` for reference. (This file needs to be created regardless if you use the FTP options or not.

Built in commands are:

`$ yarn build` - Manually trigger the site build. Files go into the "dist" folder.

`$ yarn watch` - Will automatically watch for file changes and build file into dist directory.

`$ yarn start` - Runs express server, so you can see site on localhost:8080. It serves files from the "dist" folder.

`build` and `watch` can take the follow paramters:

| Command          | Description  | Default |
| :--------------: | :---------- | :--------: |
| `ftp`         | Turns **ON** ftp uploads on file change/build (ftp requires you have a .ftpjsrc setup.)          | Off |
| `no-js-minify`   | Turns **OFF** minifying/uglifying JS files. | On |
| `no-html-minify` | Turns **OFF** minifying HTML files | On |
| `no-css-minify` | Turns **OFF** minifying CSS files (Still converts SASS to CSS) | On |
| `no-minify` | Turns **OFF** all minifying. (JS, IMAGE, CSS) | Off |

Examples:

`$ yarn watch no-ftp`

`$ yarn build no-js-minify no-image-minify`

### Usage
I typically run `yarn watch` and `yarn start` in two separate terminals.


### Issues

I know that NODE-SASS has been depreciated. I will get around to removing that and using something different at some point. But other than that, it works fairly good. I'm sure there's room for improvement. Let me know.