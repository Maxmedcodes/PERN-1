-- Create DB 
create Database authenticatorreact




-- Create AuthenticatorReact db

create table users(
    id serial ,
    userid int primary key,
    name varchar(50),
    email varchar(100),
    password varchar(300)
)

-- Create Blog Posts table
create table blogposts(
    id serial primary key,
    user_id int not null,
    blog_title varchar(70),
    blog_content varchar(150),
    foreign key user_id references users(userid)
)