-- Create DB 
create Database authenticatorreact




-- Create AuthenticatorReact db

create table logindetails(
    id serial primary key,
    email varchar(100),
    password varchar(100)
)