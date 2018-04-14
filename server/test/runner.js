const spawn = require('cross-spawn');

/*
 const server = require('../dist/server');
server.ready.then(() => {
    const runner = spawn('./node_modules/.bin/mocha', ['-r', 'ts-node/register', './!**!/!**.spec.ts'], { stdio: 'inherit' });

    runner.on('exit', function (code) {
        server.close();
        process.exit(code);
    });

    runner.on('error', function (err) {
        server.close();
        throw err;
    });
});*/

const runner = spawn('./node_modules/.bin/mocha', ['-r', 'ts-node/register', './**/**in.spec.ts'], {stdio: 'inherit'});

runner.on('exit', function (code) {
    process.exit(code);
});

runner.on('error', function (err) {
    throw err;
});