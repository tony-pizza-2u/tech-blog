const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPass = (pass) => {

    const hash = bcrypt.hashSync(pass, saltRounds);

    return hash;

};

const comparePass = (pass, hash) => {

    var match = false;

    match = bcrypt.compareSync(pass, hash);

    return match;

};

exports.hashPass = hashPass;
exports.comparePass = comparePass;
