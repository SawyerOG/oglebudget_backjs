module.exports = {
    apps: [
        {
            name: 'oglebudget',
            script: './app.js',
            watch: true,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
