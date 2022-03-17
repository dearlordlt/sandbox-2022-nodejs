class User {

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin',
      }
    ];
  }

  getUser(id) {
    return this.users.find(user => user.id === parseInt(id, 10));
  }

  addUser(username, password) {
    const user = {
      id: this.users.length + 1,
      username,
      password,
    };
    this.users.push(user);
    return user;
  }

}

export default new User();