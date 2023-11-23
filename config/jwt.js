const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const private_key = SECRET_KEY;

class JWT {
    // minus
    async Sign(data, time) {
        return jwt.sign(data, private_key, { 'expiresIn': time * 60, "algorithm": "HS256" });
    }

    async Verify(data) {
        return jwt.verify(data, private_key);
    }
}



module.exports = new JWT();