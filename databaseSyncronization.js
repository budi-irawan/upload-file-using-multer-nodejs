const { sequelize } = require('./config/database')

let normalizedPath = require("path").join(__dirname, "./model")
require("fs").readdirSync(normalizedPath).forEach(function(file) {
    console.log(file);
    require("./model/" + file)
})

sequelize.sync({ alter: true }).then(() => {
    console.log("Successfully database sync ...");
	process.exit(0)
}).catch(error => {
    console.log(error);
})

