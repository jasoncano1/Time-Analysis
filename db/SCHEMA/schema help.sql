SELECT * 
FROM tasks
WHERE date LIKE '%May13%';

UPDATE tasks
SET status = 'done'
WHERE date LIKE '%May15%';

INSERT INTO tasks (user_id, task, date, status)
VALUES
	(1, 'Driving', 'TueMay132025_2PM', 'done'),
	(1, 'Worked on Home', 'TueMay132025_3PM', 'done'),
	(1, 'Worked on Home', 'TueMay132025_4PM', 'done'),
	(1, 'Worked on Home', 'TueMay132025_5PM', 'done');
	