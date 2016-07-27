// dev server
var gulp = require('gulp'),
    path = require('path'),
    fs = require('fs'),
    os = require('os'),
    livereload = require('gulp-livereload'),
    express = require('express'),
    body = require('body-parser'),
    openurl = require('openurl'),
    tinylr = require('tiny-lr'),
    server = tinylr();

// deploy git
var deployGit = require('shark-deploy-git');

var config = require('./shark-deploy-conf.json');
// use deployConfigFile to refer to another config file
if (typeof config.deployConfigFile === 'string') {
    config = require(config.deployConfigFile);
}
var appConfig = config;
var ajaxPath = appConfig.ajaxPrefix;
var mockDir = appConfig.mock;
// webapp
var webappDir = appConfig.webapp;
/**
 * 兼容window与mac下的路径问题
 * 
 * @param  {string} rPath 路径
 * @return {string}       处理后的路径
 */
function getPath(rPath) {
    if (os.platform() === 'win32') {
        return (rPath || '').replace(/\\/ig, '/');
    } else {
        return rPath || '.';
    }
}

/**
 * 开发时使用的server
 */
gulp.task('serve', function() {
    var app = express();

    // ajax 
    app.use(getPath(path.join(appConfig.contextPath, ajaxPath)), headerStatic(path.join(mockDir, ajaxPath), {
        'Content-Type': 'application/json'
    }));

    // html
    // app.use('/', headerStatic('./', {}));
    app.use(appConfig.contextPath, headerStatic(webappDir, {}));

    // livereload middleware
    app.use(body()).use(tinylr.middleware({
        app: app
    }));

    app.listen(appConfig.port, function(err) {
        if (err) {
            return console.log(err);
        }
        // 设置了默认打开页面
        if (appConfig.openurl) {
            openurl.open(appConfig.openurl);
        }

        console.log('listening on %d', appConfig.port);
    });


    function watchFiles(ext) {
        // watch
        gulp.watch(path.join(webappDir, '**/*.' + ext), function(event) {
            tinylr.changed(event.path);
        });   
    }
    watchFiles('js');
    watchFiles('html');
    watchFiles('css');
});

/***------------- serve end ---------------***/


function headerStatic(staticPath, headers) {
    return function(req, res, next) {
        // console.log(req.path);
        var reqPath = req.path === '/' ? '/index' : req.path;
        var f = path.join(staticPath, reqPath);
        // console.log(f);
        if (fs.existsSync(f)) {
            if (headers) {
                for (var h in headers) {
                    res.set(h, headers[h]);
                }
            }

            // 处理html格式
            if (/\.html$/.test(reqPath)) {
                res.set('Content-Type', 'text/html');
                // 文本文件
                res.send(injectHtml(fs.readFileSync(f, 'UTF-8')));
            } else {
                if (/\.js$/.test(reqPath)) {
                    res.set('Content-Type', 'text/javascript');
                    res.send(fs.readFileSync(f, 'UTF-8'));
                } else if (/\.css$/.test(reqPath)) {
                    res.set('Content-Type', 'text/css');
                    res.send(fs.readFileSync(f, 'UTF-8'));
                } else {
                    res.send(fs.readFileSync(f));
                }
            }
        } else {
            if (reqPath !== '/livereload.js') {
                // console.warn('Not Found: ' + f);
            }
            next();
        }
    }
}

/**
 * 插入livereload.js到html中
 * 
 * @param  {string} html 需要处理的内容
 * @return {string}      处理后的结果
 */
function injectHtml(html) {
    var index = html.lastIndexOf('</body>');
    if (index !== -1) {
        // 如果有 .page.js,注入一下到html中
        var pageJss = findAllPagejs(html);
        var list = [];
        for (var i = 0; i < pageJss.length; i++) {
            list.push('\n<script type="text/javascript">seajs.use("' + pageJss[i] + '");</script>\n');
        };
        var script1 = list.join('');
        var script2 = '\n<script>document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':' + appConfig.port + '/livereload.js?snipver=1"></\' + \'script>\')</script>\n';

        return html.substr(0, index) + script1 + script2 + html.substr(index);
    } else {
        return html;
    }
}

function findAllPagejs(html) {
    var reg = /src=['"](\/js\/[a-z,A-Z,0-9,\/]+\.page\.js)["']/g;
    var list = [];
    while(true) {
        var matches = reg.exec(html);
        if(matches) {
            list.push(matches[matches.length - 1]);
        } else {
            return list;
        }
    }
}