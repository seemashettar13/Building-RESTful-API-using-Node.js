// middleware.js

function logRequestDetails(req, res, duration) {
    console.log(`--- Request Log ---`);
    console.log(`Time          : ${new Date().toLocaleString()}`);
    console.log(`Method        : ${req.method}`);
    console.log(`URL           : ${req.originalUrl}`);
    console.log(`Status Code   : ${res.statusCode}`);
    console.log(`Duration      : ${duration}ms`);
    console.log(`IP Address    : ${req.ip}`);
    console.log(`User-Agent    : ${req.headers['user-agent']}`);
    console.log(`Content-Type  : ${req.headers['content-type']}`);
    console.log(`Query Params  : ${JSON.stringify(req.query)}`);
    console.log(`Route Params  : ${JSON.stringify(req.params)}`);
    console.log(`Body          : ${JSON.stringify(req.body)}`);
    console.log(`Referrer      : ${req.headers.referer || 'Direct'}`);
    console.log(`--------------------`);
}

// 1. Logging Middleware
export function requestLogger(req, res, next) {
    const start = Date.now();

    // Wait for response to finish to get status code
    res.on('finish', function callback() {
        const duration = Date.now() - start; // in milliseconds
        logRequestDetails(req, res, duration);        
    })

    next();
}

// 2. Validation Middleware (for POST and PUT requests)
export function validateUserFields(req, res, next) {
    const { method, body } = req;
    if ((method === 'POST' || method === 'PUT') && (!body || Object.keys(body).length === 0)) {
        return res.status(400).json({
            success: false,
            message: "Request body is empty. Please provide required fields.",
        });
    }

    if (method === 'POST' || method === 'PUT') {
        const { firstName, lastName, hobby } = body;

        const missingFields = [];
        if (!firstName) missingFields.push("firstName : missing");
        if (!lastName) missingFields.push("lastName : missing");
        if (!hobby) missingFields.push("hobby : missing");

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "please enter the missing fields",
                details: missingFields
            });
        }
    }

    next();
}

export function validateUpdateFields(req, res, next) {
    const allowedFields = ['firstName', 'lastName', 'hobby'];
    const updates = Object.keys(req.body);
    const invalidFields = updates.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Invalid fields in update: ${invalidFields.join(", ")}`
        });
    }
    next();
}