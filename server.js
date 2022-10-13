const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

//start server
// const PORT = config.app.port;
// app.listen(PORT, () => {
//     console.log('server is running in port ${PORT}.');
// });

async function startSever() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("connected to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log('server is running on port ${PORT}');
        });
    } catch (error) {
        console.log("cannot connect to the database!", error);
        process.exit();
    }
}

startSever();