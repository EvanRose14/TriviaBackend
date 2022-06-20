exports.get404 = (req, res, next) => {
    const error = new Error('Not found.');
    error.statusCode = 404;
    res.status(404);
    res.json({
        error: {
            message: error.message,
            data: error.data
        }
    });
    next(error);
}

exports.get500 = (error, req, res, next) => {
    res.status(error.statuscode || 500);
    res.json({
        error: {
            message: error.message,
            data: error.data
        }
    });
    next(error);
}