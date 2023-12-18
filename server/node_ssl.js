const https = require(`https`);


const certDir = `/etc/letsencrypt/live`;
const domain = `bgs.jedlik.eu`;
const options = {
   key: fs.readFileSync(`${certDir}/${domain}/privkey.pem`),
   cert: fs.readFileSync(`${certDir}/${domain}/fullchain.pem`)
};


https.createServer(options, app).listen(8000);