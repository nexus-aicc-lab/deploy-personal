require('dotenv').config();

module.exports = {
    apps: [{
        name: 'ucti-personal-app',
        script: 'npm',
        args: 'start',
        cwd: '/root/deploy-personal',
        interpreter: '/usr/local/bin/node',
        env: {
            ...process.env,  // 먼저 놓고
            NODE_ENV: 'production',
            PORT: 21005,
            BACKEND_HOST: 'ucti186.nexuscommunity.kr',  // 덮어쓰기
            BACKEND_PORT: '21004',
            USE_HTTPS: 'true',
            NODE_TLS_REJECT_UNAUTHORIZED: '0'
        }
    }]
}