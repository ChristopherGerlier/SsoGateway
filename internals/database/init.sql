CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR,
  stream VARCHAR
);

INSERT INTO users (username, password, stream)
  VALUES ('Mike', 'Mike', 'CS');
INSERT INTO users (username, password, stream)
  VALUES ('Rob', 'Rob', 'PM');

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  service VARCHAR
);

INSERT INTO services (service)
  VALUES ('Localization Tool');
INSERT INTO services (service)
  VALUES ('Reports');

CREATE TABLE access_rights (
  users_id integer REFERENCES users,
  services_id integer REFERENCES services
);

INSERT INTO access_rights (users_id, services_id)
  VALUES (1 , 1);
INSERT INTO access_rights (users_id, services_id)
  VALUES (1 , 2);
INSERT INTO access_rights (users_id, services_id)
  VALUES (2 , 1);

