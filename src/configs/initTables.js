const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Task;

DROP TABLE IF EXISTS TaskProgress;

CREATE TABLE User ( 
    user_id INT PRIMARY KEY AUTO_INCREMENT, 
    username TEXT, 
    email TEXT 
  ); 
   
  CREATE TABLE Task ( 
    task_id INT PRIMARY KEY AUTO_INCREMENT, 
    title TEXT, 
    description TEXT, 
    points INT 
  ); 
   
  CREATE TABLE TaskProgress ( 
    progress_id INT PRIMARY KEY AUTO_INCREMENT, 
    user_id INT NOT NULL, 
    task_id INT NOT NULL, 
    completion_date TIMESTAMP, 
    notes TEXT 
  )
  
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});