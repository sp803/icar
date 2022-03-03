const fs = require('fs');
const path = require('path');

const userDataFile = path.resolve(__dirname, '..', '..', 'data', 'user.json');

class User {
  static save(users) {
    return fs.promises.writeFile(userDataFile, JSON.stringify(users));
  }

  static async create({ phone, password }) {
    const users = JSON.parse(await fs.promises.readFile(userDataFile));
    const user = new User(phone, password);
    users.push(user);
    await User.save(users);
    return user;
  }

  static async findAll() {
    const users = await JSON.parse(await fs.promises.readFile(userDataFile));
    return users.map((user) => new User(user.phone, user.password));
  }

  static async findByPhone(phone) {
    const users = await User.findAll();
    return users.find((user) => user.phone === phone);
  }

  constructor(phone, password) {
    this.phone = phone;
    this.password = password;
  }

  async save() {
    const users = await User.findAll();
    for(let i= 0; i<users.length; i++){
      if(users[i].phone === this.phone){
        users[i] = this;
      }
    }
    return User.save(users);
  }
}

module.exports = User;
