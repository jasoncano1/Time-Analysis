-- seeds.sql
-- BEGIN TRANSACTION;

-- Insert user record (user id 1)
INSERT INTO users (username, password)
VALUES ('jasoncano1', '$2b$10$WtcllE8laEH2AY9ai9h9cuO4M6Fk4GUgfFNvhjjh57b/EKAZmAwl6');

-- 2025-02-12 (Wed, Feb 12, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'development class', 'WedFeb122025_9AM', 'done'),
  (1, 'development class', 'WedFeb122025_10AM', 'done'),
  (1, 'coding', 'WedFeb122025_11AM', 'done'),
  (1, 'Lunch', 'WedFeb122025_12PM', 'done'),
  (1, 'Robotics Development', 'WedFeb122025_1PM', 'done'),
  (1, 'Robotics Development', 'WedFeb122025_2PM', 'done'),
  (1, 'Robotics Development', 'WedFeb122025_3PM', 'done'),
  (1, 'Self Coding', 'WedFeb122025_4PM', 'done'),
  (1, 'Self Coding', 'WedFeb122025_5PM', 'done');

-- 2025-02-13 (Thu, Feb 13, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'development class', 'ThuFeb132025_9AM', 'done'),
  (1, 'development class', 'ThuFeb132025_10AM', 'done'),
  (1, 'coding', 'ThuFeb132025_11AM', 'done'),
  (1, 'lunch', 'ThuFeb132025_12PM', 'done'),
  (1, 'robotic development', 'ThuFeb132025_1PM', 'done'),
  (1, 'robotic development', 'ThuFeb132025_2PM', 'done'),
  (1, 'robotic development', 'ThuFeb132025_3PM', 'done'),
  (1, 'book study', 'ThuFeb132025_4PM', 'done'),
  (1, 'book study', 'ThuFeb132025_5PM', 'done');

-- 2025-02-14 (Fri, Feb 14, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'development class', 'FriFeb142025_9AM', 'done'),
  (1, 'development class', 'FriFeb142025_10AM', 'done'),
  (1, 'coding', 'FriFeb142025_11AM', 'done'),
  (1, 'lunch', 'FriFeb142025_12PM', 'done'),
  (1, 'robotic development', 'FriFeb142025_1PM', 'done'),
  (1, 'robotic development', 'FriFeb142025_2PM', 'done'),
  (1, 'robotic development', 'FriFeb142025_3PM', 'done'),
  (1, 'Work on Livingroom', 'FriFeb142025_4PM', 'done'),
  (1, 'Work on Livingroom', 'FriFeb142025_5PM', 'done');

-- 2025-02-20 (Thu, Feb 20, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'development class', 'ThuFeb202025_9AM', 'done'),
  (1, 'Prepare for Meeting', 'ThuFeb202025_10AM', 'done'),
  (1, 'Head to Meeting', 'ThuFeb202025_11AM', 'done'),
  (1, 'Meeting Northland', 'ThuFeb202025_12PM', 'done'),
  (1, 'Socialize', 'ThuFeb202025_1PM', 'done'),
  (1, 'Go see puppies', 'ThuFeb202025_2PM', 'done'),
  (1, 'Go see puppies', 'ThuFeb202025_3PM', 'done'),
  (1, 'Go see puppies', 'ThuFeb202025_4PM', 'done'),
  (1, 'Taxes', 'ThuFeb202025_5PM', 'done');

-- 2025-02-24 (Mon, Feb 24, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'development class', 'MonFeb242025_9AM', 'done'),
  (1, 'Call with Jason', 'MonFeb242025_10AM', 'done'),
  (1, 'coding', 'MonFeb242025_11AM', 'done'),
  (1, 'Lunch', 'MonFeb242025_12PM', 'done'),
  (1, 'Coding', 'MonFeb242025_1PM', 'done'),
  (1, 'robotic Development', 'MonFeb242025_2PM', 'done'),
  (1, 'robotic Development', 'MonFeb242025_3PM', 'done');

-- 2025-02-25 (Tue, Feb 25, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'development class', 'TueFeb252025_9AM', 'done'),
  (1, 'Coding', 'TueFeb252025_10AM', 'done'),
  (1, 'Leave for meeting', 'TueFeb252025_11AM', 'done'),
  (1, 'Meeting', 'TueFeb252025_12PM', 'done'),
  (1, 'Socialize', 'TueFeb252025_1PM', 'done'),
  (1, 'Robotics Development', 'TueFeb252025_3PM', 'done'),
  (1, 'Robotics Development', 'TueFeb252025_4PM', 'done'),
  (1, 'Robotics Development', 'TueFeb252025_5PM', 'done');

-- 2025-03-04 (Mar 04, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'TueMar042025_9AM', 'done'),
  (1, 'Lunch', 'TueMar042025_10AM', 'done'),
  (1, 'Building Work Station', 'TueMar042025_11AM', 'done'),
  (1, 'Building Work Station', 'TueMar042025_12PM', 'done'),
  (1, 'Building Work Station', 'TueMar042025_1PM', 'done'),
  (1, 'Vet for Duke', 'TueMar042025_2PM', 'done'),
  (1, 'Building Work Station', 'TueMar042025_3PM', 'done'),
  (1, 'Building Work Station', 'TueMar042025_4PM', 'done'),
  (1, 'Dr Chavda Call', 'TueMar042025_5PM', 'done');

-- 2025-03-05 (Wed, Mar 05, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'WedMar052025_9AM', 'done'),
  (1, 'Coding Development', 'WedMar052025_10AM', 'done'),
  (1, 'Self Coding', 'WedMar052025_11AM', 'done'),
  (1, 'Lunch', 'WedMar052025_12PM', 'done'),  
  (1, 'Building Work Station', 'WedMar052025_1PM', 'done'),
  (1, 'Building Work Station', 'WedMar052025_2PM', 'done'),
  (1, 'Building Work Station', 'WedMar052025_3PM', 'done'),
  (1, 'Building Work Station', 'WedMar052025_4PM', 'done'),
  (1, 'Building Work Station', 'WedMar052025_5PM', 'done');

-- 2025-03-06 (Thu, Mar 06, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'ThuMar062025_9AM', 'done'),
  (1, 'Lunch', 'ThuMar062025_10AM', 'done'),
  (1, 'Prepare for Meeting', 'ThuMar062025_11AM', 'done'),
  (1, 'Meeting - Northland', 'ThuMar062025_12PM', 'done'),
  (1, 'Socialize & Head Home', 'ThuMar062025_1PM', 'done'),
  (1, 'Building Work Station', 'ThuMar062025_2PM', 'done'),
  (1, 'Building Work Station', 'ThuMar062025_3PM', 'done'),
  (1, 'Robotics Development', 'ThuMar062025_4PM', 'done'),
  (1, 'Robotics Development', 'ThuMar062025_5PM', 'done');

-- 2025-03-07 (Fri, Mar 07, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'FriMar072025_9AM', 'done'),
  (1, 'Self Coding', 'FriMar072025_9AM', 'done'),
  (1, 'Self Coding', 'FriMar072025_9AM', 'done'),
  (1, 'Lunch', 'FriMar072025_12PM', 'done');

-- 2025-03-13 (Thu, Mar 13, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Class', 'ThuMar132025_9AM', 'done');

-- 2025-03-14 (Fri, Mar 14, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'FriMar142025_9AM', 'done'),
  (1, 'work on Self', 'FriMar142025_10AM', 'done'),
  (1, 'Get Ready', 'FriMar142025_11AM', 'done'),
  (1, 'Drive to Tax Office', 'FriMar142025_12PM', 'done'),
  (1, 'Tax Office - Registartation', 'FriMar142025_1PM', 'done'),
  (1, 'Drive Home', 'FriMar142025_2PM', 'done'),
  (1, 'Work on Work Satation', 'FriMar142025_3PM', 'done'),
  (1, 'Work on Work Station', 'FriMar142025_4PM', 'done'),
  (1, 'Clean Living Room', 'FriMar142025_5PM', 'done');

-- 2025-03-17 (Mon, Mar 17, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'MonMar172025_9AM', 'done'),
  (1, 'Coding Development', 'MonMar172025_10AM', 'done'),
  (1, 'Lunch', 'MonMar172025_11AM', 'done'),
  (1, 'Work on My Office', 'MonMar172025_12PM', 'done'),
  (1, 'Work on My Office', 'MonMar172025_1PM', 'done'),
  (1, 'Work on My Office', 'MonMar172025_2PM', 'done'),
  (1, 'Work on Work Satation', 'MonMar172025_3PM', 'done'),
  (1, 'Work on Work Satation', 'MonMar172025_4PM', 'done'),
  (1, 'Work on Work Satation', 'MonMar172025_5PM', 'done');

-- 2025-03-21 (Fri, Mar 21, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Slept', 'FriMar212025_9AM', 'done'),
  (1, 'Slept', 'FriMar212025_10AM', 'done'),
  (1, 'Work on Table', 'FriMar212025_11AM', 'done'),
  (1, 'Work on table', 'FriMar212025_12PM', 'done'),
  (1, 'Work on Table', 'FriMar212025_1PM', 'done'),
  (1, 'Work on Workstation', 'FriMar212025_2PM', 'done'),
  (1, 'Work on Workstation', 'FriMar212025_3PM', 'done'),
  (1, 'Work on Workstation', 'FriMar212025_4PM', 'done'),
  (1, 'Work on Workstation', 'FriMar212025_5PM', 'done');

-- 2025-03-24 (Mon, Mar 24, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'MonMar242025_9AM', 'done'),
  (1, 'Coding Development', 'MonMar242025_10AM', 'done'),
  (1, 'lunch', 'MonMar242025_11AM', 'done'),
  (1, 'Work on Workstation', 'MonMar242025_12PM', 'done'),
  (1, 'Work on Workstation', 'MonMar242025_1PM', 'done'),
  (1, 'Work on Workstation', 'MonMar242025_2PM', 'done'),
  (1, 'Work on Workstation', 'MonMar242025_3PM', 'done'),
  (1, 'Work on Workstation', 'MonMar242025_4PM', 'done'),
  (1, 'Work on Workstation', 'MonMar242025_5PM', 'done');

-- 2025-03-25 (Tue, Mar 25, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'TueMar252025_9AM', 'done');

-- 2025-03-26 (Wed, Mar 26, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Coding Development', 'WedMar262025_9AM', 'done'),
  (1, 'Coding Development', 'WedMar262025_10AM', 'done'),
  (1, 'Lunch', 'WedMar262025_11AM', 'done'),
  (1, 'Work on Workstation', 'WedMar262025_12PM', 'done'),
  (1, 'Work on Workstation', 'WedMar262025_1PM', 'done'),
  (1, 'Work on Workstation', 'WedMar262025_2PM', 'done'),
  (1, 'Work on Workstation', 'WedMar262025_3PM', 'done'),
  (1, 'Work on Workstation', 'WedMar262025_4PM', 'done'),
  (1, 'Work on Workstation', 'WedMar262025_5PM', 'done');

-- 2025-03-27 (Thu, Mar 27, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Clean Livingroom', 'ThuMar272025_9AM', 'done'),
  (1, 'Clean Livingroom', 'ThuMar272025_10AM', 'done'),
  (1, 'Lunch', 'ThuMar272025_11AM', 'done'),
  (1, 'Clean Livingroom', 'ThuMar272025_12PM', 'done'),
  (1, 'Clean Livingroom', 'ThuMar272025_1PM', 'done'),
  (1, 'Clean Livingroom', 'ThuMar272025_2PM', 'done'),
  (1, 'Clean Livingroom', 'ThuMar272025_3PM', 'done'),
  (1, 'Clean Livingroom', 'ThuMar272025_4PM', 'done'),
  (1, 'Leave for Dallas', 'ThuMar272025_5PM', 'done');

-- 2025-03-28 (Fri, Mar 28, 2025)
INSERT INTO tasks (user_id, task, date, status) VALUES
  (1, 'Self Coding', 'FriMar282025_9AM', 'done'),
  (1, 'Self Coding', 'FriMar282025_10AM', 'done'),
  (1, 'Self Coding', 'FriMar282025_11AM', 'done'),
  (1, 'Socialize With Mom', 'FriMar282025_12PM', 'done'),
  (1, 'Socialize With Mom', 'FriMar282025_1PM', 'done'),
  (1, 'Get Ready for Hospital', 'FriMar282025_2PM', 'done'),
  (1, 'Wait for Surgery', 'FriMar282025_3PM', 'done'),
  (1, 'Wait for Surgery', 'FriMar282025_4PM', 'done'),
  (1, 'Have Surgery', 'FriMar282025_5PM', 'done');

COMMIT;
