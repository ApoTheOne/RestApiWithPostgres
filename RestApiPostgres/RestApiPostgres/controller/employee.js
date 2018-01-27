const db = require('../dal/dataAccess');
const util = require('../Common/util');

exports.getAll = function (request, response) {
    db.executeQuery('SELECT * FROM employee', (err, data) => {
        if (err) {
            util.Error500(request, response, err);
        }
        else {
            util.SuccessfulGetResponse(request, response, data);
        }
    })
};

exports.get = function (request, response, id) {
    const query = CreateSelectQuery(id);
    db.executeQuery(query, (err, data) => {
        if (err) {
            util.Error500(request, response, err);
        }
        else {
            util.SuccessfulGetResponse(request, response, data);
        }
    })
};

exports.add = function (request, response, reqBody) {
    try {
        if (!reqBody) throw new Error('Invalid input!');
        let data = JSON.parse(reqBody);
        if (data) {
            const reqObj = CreateInsertQuery(data);
            db.executeQuery(reqObj.queryText, reqObj.params, (err, resp) => {
                if (err) {
                    util.Error500(request, resp, err);
                }
                else {
                    response.writeHead(201, { "Content-Type": "text/plain" });
                    response.end("Registration successfull!");
                }
            });
        }
        else {
            throw new Error('Invalid input!');
        }
    }
    catch (ex) {
        util.Error500(req, resp, ex);
    }
};

exports.update = function (res, resp, requestBody) {

};

exports.delete = function (res, resp, id) {

};


function CreateInsertQuery(requestBody) {
    var reqObject = {
        name: requestBody.employee.name,
        email: requestBody.employee.email,
        age: requestBody.employee.age,
        address: requestBody.employee.address
    };
    const text = `INSERT INTO employee (name, email, age, address) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [reqObject.name, reqObject.email, reqObject.age, reqObject.address];
    return { queryText: text, params: values };
}

function CreateSelectQuery(id){
    const query = {
        name: 'get-emp',
        text: 'SELECT * FROM employee WHERE id = $1 ',
        values: [Number(id)]
      };
      return query;
}
