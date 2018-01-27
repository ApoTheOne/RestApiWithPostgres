const http = require('http');
const empController = require('../controller/employee');
const settings = require('../Settings');
const util = require('../Common/util');
http.createServer(function (req, resp) {
    switch (req.method) {
        case 'GET':
            if (req.url === '/') {
                console.log('Get in there');
                util.ShowHomePage(req, resp);
            }
            else if (req.url === '/employees') {
                empController.getAll(req, resp);
            }
            else {
                const idRegex = "[0-9]+";
                let urlPattern = new RegExp("/employees/" + idRegex);
                if (urlPattern.test(req.url)) {
                    urlPattern = new RegExp(idRegex);
                    let id = urlPattern.exec(req.url);
                    empController.get(req, resp, id);
                }
                else {
                    util.Error404(req, resp);
                }
            }
            break;
        case 'POST':
            if (req.url === '/employees') {
                var reqBody = '';
                req.on("data", function(data){
                    reqBody += data;
                    if(reqBody.length > 1e7){
                        util.Error413(req, resp);
                    }
                })
                req.on("end", function(){
                    empController.add(req, resp, reqBody);
                });
            }
            else {
                util.Error500(req, resp);
            }
            break;
        case 'PUT':
            if (req.url === '/employees') {
                empController.update(req, resp, req.body);
            }
            else {
                util.Error500(req, resp);
            }
        case 'DELETE':
            if (req.url === '/employees') {
                empController.delete(req, resp, req.body);
            }
            else {
                util.Error500(req, resp);
            }
        default:
            util.Error405(req, resp);
            break;
    }
}).listen(settings.webPort, function () {
    console.log(`Server started listening at port: ${settings.webPort}`);
})