const User = require('../classes/User');
const TodoList = require('../classes/TodoList');
const sinon = require('sinon');
const expect = require('chai').expect;
const EmailService = require('../classes/EmailService');

describe('TodoList class', () => {

  describe('setContent()', () => {
    it('should set content to its new value if length <= 100', () => {
      const content = 'Content that does not exceed the length limit';
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      const todo = new TodoList('name', content, user);
      expect(todo.content).to.be.equal(content);
    });
    it('should throw an error if its new value.length > 100', () => {
      try {
        new TodoList('name', "Content that exceed the length limit. I got to throw on and go on, you know i gots to flow on, selectors on the radio play us 'cause we're friendly for ozone.");
      } catch (e) {
        expect(e).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('setName()', () => {
    it('should set name to its new value if length > 0 && <= 50', () => {
      const name = 'Correct name';
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      const todo = new TodoList(name, 'content', user);
      expect(todo.name).to.be.equal(name);
    });
    it('should throw an error if name.length === 0', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      try {
        new TodoList('', 'content', user);
      } catch (e) {
        expect(e).to.be.an.instanceOf(Error);
      }
    });
    it('should throw an error if name.length > 50', () => {
      try {
        new TodoList('Name that exceed the size limit i want to exceed this limit please', 'content');
      } catch (e) {
        expect(e).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('addItem()', () => {
    let user;
    let emailServiceMock;
    let emailService;
    beforeEach('Setup', () => {
      user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      emailService = new EmailService(user);
      emailServiceMock = sinon.mock(emailService);
    });

    it('should add item to item list if item list length <= 10 and 30 minutes since the last insert AND send one email if user is older than 18yo', () => {
      const todo = new TodoList('Name', 'Content', user, emailService);
      emailServiceMock.expects('send').once();
      todo.addItem('Item1');
      expect(todo.items.length).to.be.equal(1);
      expect(todo.items[0]).to.be.equal('Item1');
      expect(emailServiceMock.verify()).to.be.true;
    });
    it('should add item to item list if item list length <= 10 and 30 minutes since the last insert AND send 0 email if user is younger than 18yo', () => {
      user.age = 16;
      const todo = new TodoList('Name', 'Content', user, emailService);
      emailServiceMock.expects('send').never(); 
      todo.addItem('Item1');
      expect(todo.items.length).to.be.equal(1);
      expect(todo.items[0]).to.be.equal('Item1');
      expect(emailServiceMock.verify()).to.be.true; 
    });
    it('should throw an error because last item was added less than 30 minutes ago', () => {
      const todo = new TodoList('Name', 'Content', user, emailService);
      emailServiceMock.expects('send').once();
      todo.addItem('Item1');
      try {
        todo.addItem('Item2');
      } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(todo.items.length).to.be.equal(1);
        expect(emailServiceMock.verify()).to.be.true;
      }
    });
    it('should throw an error because item list is full', () => {
      const todo = new TodoList('Name', 'Content', user, emailService);
      todo.items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8', 'Item9', 'Item10'];
      emailServiceMock.expects('send').never();
      try {
        todo.addItem('Item11');
      } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(todo.items.length).to.be.equal(10);
        expect(emailServiceMock.verify()).to.be.true;
      }
    });
  });

  describe('setOwner()', () => {
    it('should set the owner if owner is valid and does not already have a todoList', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      const todo = new TodoList('Name', 'Content', user);
      expect(todo.owner).to.be.deep.equal(user);
      expect(user.todoList).to.be.deep.equal(todo.name);
    });
    it('should throw an error if owner is valid and do already have a todoList', () => {
      const user = new User('Tom', 'Délié', 21, 'tom@gmail.com');
      user.todoList = 'todoList';
      let todo;
      try {
        todo = new TodoList('Name', 'Content', user);
      } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(todo).to.be.undefined;
      }
    });
    it('should throw an error if owner is not valid', () => {
      const user = new User('Tom', 'Délié', 1, 'tom@gmail.com');
      let todo;
      try {
        todo = new TodoList('Name', 'Content', user);
      } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(todo).to.be.undefined;
      }
    });
    it('should throw an error if owner is not an instance of User', () => {
      const user = {firstname: 'Tom', lastname: 'Délié', age: 1, email: 'tom@gmail.com'};
      let todo;
      try {
        todo = new TodoList('Name', 'Content', user);
      } catch(e) {
        expect(e).to.be.instanceOf(Error);
        expect(todo).to.be.undefined;
      }
    });
  });
});
