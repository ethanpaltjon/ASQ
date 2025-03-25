function notFound(req, res, err) {
    res.status(404);
    res.json({
        code: "NOT_FOUND",
        message: "Requested resource was not found"
    });
}

function unsupported(req, res, err) {
    res.status(405);
    res.json({
        code: "UNSUPPORTED",
        message: "Requested resource does not support this method"
    });
}

function invalidJSON(req, res, err) {
    res.status(400);
    console.log("got inside");
    res.json({
        code: "INVALID_JSON",
        message: err.message
    });
}

function invalidParams(req, res, err) {
    res.status(400);
    res.json({
        code: "INVALID_PARAMS",
        message: err.message
    })
}

function internalError(req, res, err) {
    res.status(500);
    res.json({
        code: "The server encountered an unexpected error"
    });
}

module.exports = {
    notFound,
    unsupported,
    invalidJSON,
    invalidParams,
    internalError
}