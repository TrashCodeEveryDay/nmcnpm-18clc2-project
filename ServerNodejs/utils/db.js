const mysql = require('mysql2');
const mysql_opts = require('../config/default.json').mysql;

const pool = mysql.createPool(mysql_opts);
const promisePool = pool.promise();
const {paginate} = require('../config/default.json');

module.exports = {
  load(sql) {
    return promisePool.query(sql); // [rows, fields]
  },

  add(entity, table_name) {
    const sql = `insert into ${table_name} set ?`;
    return promisePool.query(sql, entity);
  },

  del(condition, table_name) {
    const sql = `delete from ${table_name} where ?`;
    return promisePool.query(sql, condition);
  },

  patch(new_data, condition, table_name) {
    const sql = `update ${table_name} set ? where ?`;
    return promisePool.query(sql, [new_data, condition]);
  },

  getCateList(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id}`
    return promisePool.query(sql);
  },

  getCateListByPage(id,offset){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id}
    LIMIT ${paginate.limit} offset ${offset}`
    return promisePool.query(sql);
  },

  get5starCourse(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id} AND temp3.overall_star=5`
    return promisePool.query(sql);
  },

  getUp4starCourse(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id} AND temp3.overall_star>=4`
    return promisePool.query(sql);
  },
  getUp3starCourse(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,ROUND(AVG(s.num_star),1) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id} AND temp3.overall_star>=3`
    return promisePool.query(sql);
  },
  getDown3starCourse(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,IFNULL(ROUND(AVG(s.num_star),1),0) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id} AND temp3.overall_star<3`
    return promisePool.query(sql);
  },
  mostStudyByCatID(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,IFNULL(ROUND(AVG(s.num_star),1),0) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id}
		ORDER BY temp3.number_student DESC`
    return promisePool.query(sql);
  },
  mostOverallByCatID(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,IFNULL(ROUND(AVG(s.num_star),1),0) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id}
		ORDER BY temp3.overall_star DESC`
    return promisePool.query(sql);
  },
  newestByCatID(id){

  },
  ascPriceByCatID(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,IFNULL(ROUND(AVG(s.num_star),1),0) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id}
		ORDER BY temp3.reduce_price ASC`
    return promisePool.query(sql);
  },
  descPriceByCatId(id){
    const sql = `SELECT U.name as author_name,U.avatar as author_image,TEMP3.course_id,TEMP3.deal_value,temp3.intro_image, temp3.number_student,temp3.number_rating,temp3.description,temp3.price,temp3.reduce_price,temp3.overall_star,temp3.categoty_id
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,IFNULL(ROUND(AVG(s.num_star),1),0) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id}
		ORDER BY temp3.reduce_price DESC`
    return promisePool.query(sql);
  },
  countByCat(id){
    const sql = `SELECT COUNT(*) AS total
    FROM (
        SELECT temp1.course_id,deal_value,intro_image,temp1.number_student,temp2.overall_star,temp2.number_rating,description,price,ROUND((price-price*deal_value/100)) as reduce_price,lecturer_id,categoty_id
        FROM (SELECT c.*,count( b.course_id ) AS number_student
                    FROM bill b RIGHT JOIN course c ON b.course_id = c.course_id 
                    GROUP BY c.course_id) AS temp1 JOIN 
                    (SELECT c.course_id,IFNULL(ROUND(AVG(s.num_star),1),0) as overall_star,COUNT(s.course_id) as number_rating
                    FROM star_rating s RIGHT JOIN course c on s.course_id=c.course_id
                    GROUP BY c.course_id) AS temp2 ON temp1.course_id=temp2.course_id
    ) AS TEMP3 JOIN USER U ON TEMP3.lecturer_id=U.user_id
    WHERE U.role=1 AND temp3.categoty_id=${id}`
    return promisePool.query(sql);
  }
};
