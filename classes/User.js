module.exports = class User {
  constructor(firstname, lastname, age, email) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.email = email;
    this.todoList = null;
  }

  addTodoList(todoList) {
    if (this.todoList === null) {
      this.todoList = todoList.name;
      return true;
    } else {
      return false;
    }
  }

  static typeCheck(value, type) {
    return typeof value === type;
  }

  isFirstnameValid() {
    return User.typeCheck(this.firstname, 'string') &&
      this.firstname.length >= 3;
  }

  isLastnameValid() {
    return this.constructor.typeCheck(this.lastname, 'string') &&
      this.lastname.length >= 3;
  }

  isAgeValid() {
    return this.constructor.typeCheck(this.age, 'number') &&
      this.age > 13;
  }

  isEmailValid() {
    return this.constructor.typeCheck(this.email, 'string') &&
      this.email.includes('@');
  }

  isValid() {
    return this.isFirstnameValid() &&
      this.isLastnameValid() &&
      this.isAgeValid() &&
      this.isEmailValid();
  }
};
