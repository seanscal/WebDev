module.exports = function(app, db, mongoose) {
    var rosterModel = require("./models/roster.model.js")(mongoose, db);
    var userModel = require("./models/user.model.js")(mongoose, db);

    require("./services/roster.service.server.js")(app, rosterModel);
    require("./services/user.service.server.js")(app, userModel);
};