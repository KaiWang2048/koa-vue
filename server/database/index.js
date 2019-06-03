const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'wangkai5213',
  database: 'nodesql'
})

class Mysql {
  constructor(params) {
    this.params = params
  }
  query() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * from tb_dept', function (error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results)
      });
    })
  }
  get() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * from tb_dept', function (error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results)
      });
    })
  }
  add() {
    const addSql = 'INSERT INTO tb_dept(Name) values (?)'
    let addSqlParams = [];
    if(this.params['name']){
      addSqlParams.push(this.params['name'])
    }
    return new Promise((resolve, reject) => {
      pool.query(addSql, addSqlParams,function(error, results, fields) {
        if (error) {
          throw error
        };
        resolve(results)
      });
    })
  }
}

module.exports = Mysql
