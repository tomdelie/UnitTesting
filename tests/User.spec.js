const User = require('../classes/User');
const expect = require('chai').expect;

describe('User class', () => {

  describe('typeCheck()', () => {
    it('should return true if typeof value is equal to the given type', () => {
      expect(User.typeCheck('Tom', 'string')).to.be.true;
    });
    it('should return false if typeof value is not equal to the given type', () => {
      expect(User.typeCheck('Tom', 'number')).to.be.false;
    });
  });

  describe('isFirstnameValid()', () => {
    it('should return true if firstname is a string and length >= 3', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      expect(user.isFirstnameValid()).to.be.true;
    });
    it('should return false if firstname < 3', () => {
      const user = new User('To', 'Délié', 21, 'tom@gmail.com');
      expect(user.isFirstnameValid()).to.be.false;
    });
    it('should return false if firstname is not a string', () => {
      const user = new User(['Tom'], 'Délié', 21, 'tom@gmail.com');
      expect(user.isFirstnameValid()).to.be.false;
    });
  });

  describe('isLastnameValid()', () => {
    it('should return true if lastname is a string and length >= 3', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      expect(user.isLastnameValid()).to.be.true;
    });
    it('should return false if firstname < 3', () => {
      const user = new User('Tom', 'Dé', 21, 'tom@gmail.com');
      expect(user.isLastnameValid()).to.be.false;
    });
    it('should return false if firstname is not a string', () => {
      const user = new User('Tom', ['Délié'], 21, 'tom@gmail.com');
      expect(user.isLastnameValid()).to.be.false;
    });
  });

  describe('isAgeValid()', () => {
    it('should return true if age is a number and >= 13', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      expect(user.isAgeValid()).to.be.true;
    });
    it('should return false if age < 13', () => {
      const user = new User('Tom', 'Délié', 12, 'tom@gmail.com');
      expect(user.isAgeValid()).to.be.false;
    });
    it('should return false if age is not a number', () => {
      const user = new User('Tom', 'Délié', '21', 'tom@gmail.com');
      expect(user.isAgeValid()).to.be.false;
    });
  });

  describe('isEmailValid()', () => {
    it('should return true if email is a string and includes an @', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      expect(user.isEmailValid()).to.be.true;
    });
    it('should return false if email is not a string', () => {
      const user = new User('Tom', 'Délié', 12, ['tom@gmail.com']);
      expect(user.isEmailValid()).to.be.false;
    });
    it('should return false if age does not include an @', () => {
      const user = new User('Tom', 'Délié', '21', 'tomgmail.com');
      expect(user.isEmailValid()).to.be.false;
    });
  });

  describe('isValid()', () => {
    it('should return true if user is valid', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      expect(user.isValid()).to.be.true;
    });
  });

  describe('addTodoList()', () => {
    it('should return true if todoList is null', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      const todoList = {name: 'todoList'};
      const res = user.addTodoList(todoList);
      expect(res).to.be.true;
      expect(user.todoList).to.be.equal('todoList');
    });
    it('should return false if todoList is not null', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      user.todoList = 'todoList1';
      const todoList2 = {name: 'todoList2'};
      const res = user.addTodoList(todoList2);
      expect(res).to.be.false;
      expect(user.todoList).to.be.equal('todoList1');
    });
  });
});
