const nodemailer = require('nodemailer');

module.exports = class Mail {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  send() {
    return true;
  }
}