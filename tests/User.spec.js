const User = require('../classes/User');
const expect = require('chai').expect;

/** 
 * TODO : should do a test for each method of User class and cover all exceptions when a user is invalid
 */

describe('User class', () => {
    describe('user is valid', () => {
        const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
        it('should return true', () => {
            expect(user.isValid()).to.be.true;
        });
    });
});
