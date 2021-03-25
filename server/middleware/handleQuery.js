const QueryHandler = require('../util/QueryHandler');
const catchAsync = require('../util/catchAsync');

const handleQuery = (model) => {
    return catchAsync(async(req, res, next) => {
        const queryHandler = new QueryHandler(model, req.query);
        req.data = await queryHandler.getData();
        req.pagination = await queryHandler.getPagination();
        next();
    });
}

module.exports = handleQuery;