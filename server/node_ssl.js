const https = require(`https`);


const certDir = `/etc/letsencrypt/live`;
const domain = `bgs.jedlik.eu`;

const sslServer = https.createServer(
   {
      key: fs.readFileSync(`${certDir}/${domain}/privkey.pem`),
      cert: fs.readFileSync(`${certDir}/${domain}/fullchain.pem`)
   },
   app
)

sslServer.listen(port, () => console.log('Secure server on https://bgs.jedlik.eu:8000'))