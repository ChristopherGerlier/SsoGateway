CREATE TABLE groups (
  name text,
  description text,
  UNIQUE (name)
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  username text,
  email text,
  password text,
  group_name text REFERENCES groups(name),
  UNIQUE (email)
);

CREATE TABLE services (
  name text,
  description text,
  UNIQUE (name)
);

CREATE TABLE permissions (
  group_name text REFERENCES groups(name),
  service_name text REFERENCES services(name)
);
