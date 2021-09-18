module.exports = {
    apps: [
        {
            name: 'oglebudget',
            script: './app.js',
            watch: true,
            env_production: {
                NODE_ENV: 'production',
                dbHostprod: '127.0.0.1',
                dbHostdev: '127.0.0.1',
                dbUser: 'node',
                dbPassword: 'so',
                dbDatabase: 'oglebudget',
            },
        },
    ],
};
