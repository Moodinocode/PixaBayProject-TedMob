CREATE TABLE users (
  userEmail varchar(100),
  userPassowrd varchar(255)
);
ALTER TABLE users 
ADD COLUMN id integer AutoIncremet;

ALTER TABLE users
ADD COLUMN id SERIAL PRIMARY KEY;

update users set authorized =TRUE

Delete from users where id = 2
SELECT * FROM users Limit 50;


INSERT INTO users VALUES('Mohamad@Mehdi.com','test')

delete from users where userpassowrd = '$2a$10$W/zZPFrNoOyCGxDpJ6.BOuOQUqv.Z/qaghSU4pkppiaANmsy.H9d6'


Select true FROM users WHERE userEmail = 'mehdi21092005@gmail.com' AND userPassowrd = '$2a$10$5VtrGboujRKuyA6DoHeDi.wEoBSxiC1ETRraQFIzTssLdKjmbiFIK '

SELECT version();