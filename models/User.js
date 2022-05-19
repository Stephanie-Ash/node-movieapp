const { dbCon } = require('../configuration');
const { userValidator } = require('../validator');
const { hashSync } = require('bcryptjs');

class User {
    constructor(userData) {
        this.userData = { ...userData };
    };

    save(cb) {
        dbCon('users', async (db) => {
            try {
                const hashedPass = hashSync(this.userData['password'], 12);
                this.userData['password'] = hashedPass;
                await db.insertOne(this.userData);
                cb();
            } catch(err){
                cb(err);
            }
        });
    }

    checkExistence() {
        return new Promise((resolve, reject) => {
            dbCon('users', async (db) => {
                try {
                    const user = await db.findOne({
                        '$or': [{ username: this.userData['username'] },
                        { email: this.userData['email'] }]
                    });

                    if (!user) {
                        resolve({
                            check: false
                        })
                    } else if (this.userData['username'] === user.username) {
                        resolve({
                            check: true,
                            message: 'This username is already in use.'
                        })
                    } else if (this.userData['email'] === user.email) {
                        resolve({
                            check: true,
                            message: 'There is already a user with this email.'
                        })
                    }
                }catch(err) {
                    reject(err);
                }
            });
        });
    };

    static validate(userData) {
        return userValidator.validate(userData);
    };
};

module.exports = User;