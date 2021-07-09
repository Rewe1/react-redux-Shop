var bcrypt = require('bcryptjs');

salt = '$2a$10$dpZWx8dbbYSvIPcmHT0XEuZNnIZSK7ulCNwD5AjtaBSM8jWZ5hgyW'

module.exports = (str) =>
{
    return bcrypt.hashSync(str, salt)
}