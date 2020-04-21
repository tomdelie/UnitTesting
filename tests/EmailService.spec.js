const EmailService = require('../classes/EmailService');
const User = require('../classes/User');
const expect = require('chai').expect;

describe('Mail class', () => {

  describe('send()', () => {
    it('should return true if user is older than 18yo', () => {
        const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
        const emailStatus = (new EmailService(user)).send();
        expect(emailStatus).to.be.true;
    });
    it('should return false if user is younger than 18yo', () => {
        const user = new User('Tom', 'Délié', 16, 'tom@gmail.com');
        const emailStatus = (new EmailService(user)).send();
        expect(emailStatus).to.be.false;
    });
  });
});
