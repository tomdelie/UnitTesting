module.exports = class User {
  constructor(firstname, lastname, age, email) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.email = email;
  }

  typeCheck(value, type) {
    return typeof value === type;
  }

  firstnameIsValid() {
    return this.typeCheck(this.firstname, 'string') &&
      this.firstname.length >= 3;
  }

  lastnameIsValid() {
    return this.typeCheck(this.lastname, 'string') &&
      this.lastname.length >= 3;
  }

  ageIsValid() {
    return this.typeCheck(this.age, 'number') &&
      this.age > 13;
  }

  emailIsValid() {
    return this.typeCheck(this.email, 'string') &&
      this.email.includes('@');
  }

  isValid() {
    return this.firstnameIsValid() &&
      this.lastnameIsValid() &&
      this.ageIsValid() &&
      this.emailIsValid();
  }

};