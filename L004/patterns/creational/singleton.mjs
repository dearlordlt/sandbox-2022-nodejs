class DBConnection {
  constructor() {
    this.DBConnection = 'mongo://localhost:27017/test';
  }

  getNewDbConnection() {
    return this.DBConnection;
  }
}

const dbconn = new DBConnection();

export {
  dbconn
}