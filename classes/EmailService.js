module.exports = class EmailService {
  constructor(user) {
    this.user = user;
  }

  send() {
    if (this.user.age >= 18) {
      console.log("Email has been sent to the user!");
      return true;
    } else {
      return false;
    }
  }
}