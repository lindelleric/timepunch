import * as Hapi from "@hapi/hapi";

import * as fs from "fs";

const logFilePath = 'data/logfile.log';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });


    server.route({
        method: 'GET',
        path: '/log',
        handler: (request, h) => {
            fs.appendFileSync(logFilePath, `${new Date().toLocaleString()} ${request.query.type} \n`);
            return 'OK';
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();