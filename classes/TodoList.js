const User = require('./User');

module.exports = class TodoList {
  constructor(name, content, owner, emailService) {
    this.setName(name);
    this.setContent(content);
    this.dateCreated = new Date();
    this.items = [];
    this.itemsUpdated = null;
    this.setOwner(owner);
    this.emailService = emailService;
  }

  setOwner(owner) {
    if (owner instanceof User) {
      if (owner.isValid()) {
        this.owner = owner;
        if (!owner.addTodoList(this)) {
          throw new Error('This user already has a todolist.');
        }
      } else {
        throw new Error('This user is not valid.');
      }
    } else {
      throw new Error('Instance of User expected.');
    }
  }

  setContent(content) {
    if (content.length <= 100) {
      this.content = content;
    } else {
      throw new Error(`Maximum content size exceeded (actual size: ${content.length}, max: 100).`);
    }
  }

  setName(name) {
    if (name.length > 0 && name.length <= 50) {
      this.name = name;
    } else {
      throw new Error(`Name size should be between 0 and 50 characters (actual size: ${name.length}).`);
    }
  }

  addItem(itemContent) {
    const itemsUpdatedAdd30minutes = this.itemsUpdated ? this.itemsUpdated.setMinutes(this.itemsUpdated.getMinutes() + 30) : null;
    if (itemsUpdatedAdd30minutes === null || this.itemsUpdated > itemsUpdatedAdd30minutes) {
      if (this.items.length < 10) {
        this.items.push(itemContent);
        this.itemsUpdated = new Date();
        if (this.owner.age >= 18) {
          this.emailService.send();
        }
      } else {
        throw new Error(`Maximum item list size reached.`);
      }
    } else {
      throw new Error(`You added an item less than 30 minutes ago (last added item: ${this.itemsUpdated}).`);
    }
  }
};