// imaginary library used to send emails

module.exports = class EmailService {
  constructor(user) {
    this.user = user;
  }

  send() {
    console.log("Email has been sent to the user!");
  }
}