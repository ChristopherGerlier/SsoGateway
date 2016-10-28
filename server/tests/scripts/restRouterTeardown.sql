DELETE FROM accounts WHERE username = 'John';
DELETE FROM accounts WHERE username = 'Mike';
DELETE FROM accounts WHERE username = 'Rob';

DELETE FROM permissions WHERE group_name = 'PSM';
DELETE FROM permissions WHERE group_name = 'CS';

DELETE FROM groups WHERE name = 'PSM';
DELETE FROM groups WHERE name = 'CS';

DELETE FROM services WHERE name = 'Reports';
DELETE FROM services WHERE name = 'Localization Tool';
