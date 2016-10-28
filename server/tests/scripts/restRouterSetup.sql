INSERT INTO services(name) VALUES ('Reports');
INSERT INTO services(name) VALUES ('Localization Tool');

INSERT INTO groups(name) VALUES ('PSM');
INSERT INTO groups(name) VALUES ('CS');

INSERT INTO permissions(group_name, service_name) VALUES ('PSM', 'Reports');
INSERT INTO permissions(group_name, service_name) VALUES ('CS', 'Reports');
INSERT INTO permissions(group_name, service_name) VALUES ('CS', 'Localization Tool');

INSERT INTO accounts(username, password, email, group_name) VALUES ('John', 'John', 'John@crfhealth.com', 'PSM');
INSERT INTO accounts(username, password, email, group_name) VALUES ('Mike', 'Mike', 'Mike@crfhealth.com', 'PSM');
INSERT INTO accounts(username, password, email, group_name) VALUES ('Rob', 'Rob', 'Rob@crfhealth.com', 'CS');

