CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  email VARCHAR,
  password VARCHAR
);

INSERT INTO accounts (username, password, email)
  VALUES ('Mike', 'Mike', 'mike@crfhealth.com');
INSERT INTO accounts (username, password, email)
  VALUES ('Rob', 'Rob', 'rob@crfhealth.com');

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR
);

INSERT INTO services (name, description)
  VALUES ('Localization Tool', 'The localization tool');
INSERT INTO services (name, description)
  VALUES ('Reports', 'The reports tool');

CREATE TABLE access_rights (
  account_id integer REFERENCES accounts,
  service_id integer REFERENCES services
);

INSERT INTO access_rights (account_id, service_id)
  VALUES (1 , 1);
INSERT INTO access_rights (account_id, service_id)
  VALUES (1 , 2);
INSERT INTO access_rights (account_id, service_id)
  VALUES (2 , 1);

