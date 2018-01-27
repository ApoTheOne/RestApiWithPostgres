const settings = require('../Settings');

exports.Error500 = function (request, response, err) {
    console.log('Logging error : ' + err.stack)
    if (settings.MessageFormat === 'HTML') {
        response.writeHead(500, 'Internal server error!', { 'Content-type': 'text/html' });
        response.write(`<html><title>500</title><head></head><body>500 : Internal server error. <br/> Details: ${err} </body></html>`);
    }
    else {
        response.writeHead(500, 'Internal server error!', { 'Content-type': 'application/json' });
        response.write(JSON.stringify({ error: `Internal server error: ${err}` }));
    }
    response.end();
}

exports.SuccessfulGetResponse = function (request, response, data) {
    response.writeHead(200, { 'Content-type': 'application/json' });
    if (data) {
        response.write(JSON.stringify(data.rows));
    }
    response.end();
}

exports.Error405 = function (request, response) {
    if (settings.MessageFormat === 'HTML') {
        response.writeHead(405, 'Method not supported!', { 'Content-type': 'text/html' });
        response.write(`<html><title>405</title><head></head><body>405 : Method not supported. </body></html>`);
    }
    else {
        response.writeHead(405, 'Method not supported!', { 'Content-type': 'application/json' });
        response.write(JSON.stringify({ error: `Method not supported!` }));
    }
    response.end();
}

exports.Error404 = function (request, response) {
    if (settings.MessageFormat === 'HTML') {
        response.writeHead(404, 'Resource not found!', { 'Content-type': 'text/html' });
        response.write(`<html><title>404</title><head></head><body>404 : Resource not found! </body></html>`);
    }
    else {
        response.writeHead(404, 'Resource not found!', { 'Content-type': 'application/json' });
        response.write(JSON.stringify({ error: `Resource not found!` }));
    }
    response.end();
}

exports.Error413 = function (request, response) {
    if (settings.MessageFormat === 'HTML') {
        response.writeHead(413, 'Request is too large!', { 'Content-type': 'text/html' });
        response.write(`<html><title>413</title><head></head><body>413 : Request is too large! </body></html>`);
    }
    else {
        response.writeHead(413, 'Request is too large!', { 'Content-type': 'application/json' });
        response.write(JSON.stringify({ error: `Request is too large!` }));
    }
    response.end();
}

exports.Success200 = function (request, response) {
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end();
}

exports.ShowHomePage = function (request, response) {
    console.log('I am in the showHomePage function.');
    if (settings.MessageFormat === 'HTML') {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.write(`<html><title>Home Page</title>
        <head>Home page</head>
        <body>
            <h5>Valid endpoints :</h5>
            <ul>
                <li>/employees     -   GET     -   Get list of all employees. </li>
                <li>/employees/id -   GET     -   Get an employee details. </li>
                <li>/employees      -   POST    -   Add an employee. </li>
            </ul>
        </body>
        </html>`);
    }
    else {
        response.writeHead(200, { 'Content-type': 'application/json' });
        response.write(JSON.stringify([
            {url:'/employees', operation: 'GET', description: 'Get list of all employees.'},
            {url:'/employees/id', operation: 'GET', description: 'Get an employee details.'},
            {url:'/employees', operation: 'POST', description: 'Add an employee.'}
        ]));
    }
    response.end();
}