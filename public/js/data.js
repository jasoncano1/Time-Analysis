
let data = [
    {id: 2, user_id: 1, task: 'development class', date: 'WedFeb122025_10AM', status: 'done'},
    {id: 3, user_id: 1, task: 'coding', date: 'WedFeb122025_11AM', status: 'done'},
    {id: 4, user_id: 1, task: 'Lunch', date: 'WedFeb122025_12PM', status: 'done'},
    {id: 5, user_id: 1, task: 'Robotics Development', date: 'WedFeb122025_1PM', status: 'done'},
    {id: 6, user_id: 1, task: 'Robotics Development', date: 'WedFeb122025_2PM', status: 'done'},
    {id: 7, user_id: 1, task: 'Robotics Development', date: 'WedFeb122025_3PM', status: 'done'},
    {id: 8, user_id: 1, task: 'Self Coding', date: 'WedFeb122025_4PM', status: 'done'},
    {id: 9, user_id: 1, task: 'Self Coding', date: 'WedFeb122025_5PM', status: 'done'},
    {id: 10, user_id: 1, task: 'development class', date: 'ThuFeb132025_9AM', status: 'done'},
    {id: 11, user_id: 1, task: 'development class', date: 'ThuFeb132025_10AM', status: 'done'},
    {id: 12, user_id: 1, task: 'coding', date: 'ThuFeb132025_11AM', status: 'done'},
    {id: 13, user_id: 1, task: 'lunch', date: 'ThuFeb132025_12PM', status: 'done'},
    {id: 14, user_id: 1, task: 'robotic development', date: 'ThuFeb132025_1PM', status: 'done'},
    {id: 15, user_id: 1, task: 'robotic development', date: 'ThuFeb132025_2PM', status: 'done'},
    {id: 16, user_id: 1, task: 'robotic development', date: 'ThuFeb132025_3PM', status: 'done'},
    {id: 17, user_id: 1, task: 'book study', date: 'ThuFeb132025_4PM', status: 'done'},
    {id: 18, user_id: 1, task: 'book study', date: 'ThuFeb132025_5PM', status: 'done'},
    {id: 19, user_id: 1, task: 'development class', date: 'FriFeb142025_9AM', status: 'done'},
    {id: 20, user_id: 1, task: 'development class', date: 'FriFeb142025_10AM', status: 'done'},
    {id: 21, user_id: 1, task: 'coding', date: 'FriFeb142025_11AM', status: 'done'},
    {id: 22, user_id: 1, task: 'lunch', date: 'FriFeb142025_12PM', status: 'done'},
    {id: 23, user_id: 1, task: 'robotic development', date: 'FriFeb142025_1PM', status: 'done'},
    {id: 24, user_id: 1, task: 'robotic development', date: 'FriFeb142025_2PM', status: 'done'},
    {id: 25, user_id: 1, task: 'robotic development', date: 'FriFeb142025_3PM', status: 'done'},
    {id: 26, user_id: 1, task: 'Work on Livingroom', date: 'FriFeb142025_4PM', status: 'done'},
    {id: 27, user_id: 1, task: 'Work on Livingroom', date: 'FriFeb142025_5PM', status: 'done'},
    {id: 28, user_id: 1, task: 'development class', date: 'ThuFeb202025_9AM', status: 'done'},
    {id: 29, user_id: 1, task: 'Prepare for Meeting', date: 'ThuFeb202025_10AM', status: 'done'},
    {id: 30, user_id: 1, task: 'Head to Meeting', date: 'ThuFeb202025_11AM', status: 'done'},
    {id: 31, user_id: 1, task: 'Meeting Northland', date: 'ThuFeb202025_12PM', status: 'done'},
    {id: 32, user_id: 1, task: 'Socialize', date: 'ThuFeb202025_1PM', status: 'done'},
    {id: 33, user_id: 1, task: 'Go see puppies', date: 'ThuFeb202025_2PM', status: 'done'},
    {id: 34, user_id: 1, task: 'Go see puppies', date: 'ThuFeb202025_3PM', status: 'done'},
    {id: 35, user_id: 1, task: 'Go see puppies', date: 'ThuFeb202025_4PM', status: 'done'},
    {id: 36, user_id: 1, task: 'Taxes', date: 'ThuFeb202025_5PM', status: 'done'},
    {id: 37, user_id: 1, task: 'development class', date: 'MonFeb242025_9AM', status: 'done'},
    {id: 38, user_id: 1, task: 'Call with Jason', date: 'MonFeb242025_10AM', status: 'done'},
    {id: 39, user_id: 1, task: 'coding', date: 'MonFeb242025_11AM', status: 'done'},
    {id: 40, user_id: 1, task: 'Lunch', date: 'MonFeb242025_12PM', status: 'done'},
    {id: 41, user_id: 1, task: 'Coding', date: 'MonFeb242025_1PM', status: 'done'},
    {id: 42, user_id: 1, task: 'robotic Development', date: 'MonFeb242025_2PM', status: 'done'},
    {id: 43, user_id: 1, task: 'robotic Development', date: 'MonFeb242025_3PM', status: 'done'},
    {id: 44, user_id: 1, task: 'development class', date: 'TueFeb252025_9AM', status: 'done'},
    {id: 45, user_id: 1, task: 'Coding', date: 'TueFeb252025_10AM', status: 'done'},
    {id: 46, user_id: 1, task: 'Leave for meeting', date: 'TueFeb252025_11AM', status: 'done'},
    {id: 47, user_id: 1, task: 'Meeting', date: 'TueFeb252025_12PM', status: 'done'},
    {id: 48, user_id: 1, task: 'Socialize', date: 'TueFeb252025_1PM', status: 'done'},
    {id: 49, user_id: 1, task: 'Robotics Development', date: 'TueFeb252025_3PM', status: 'done'},
    {id: 50, user_id: 1, task: 'Robotics Development', date: 'TueFeb252025_4PM', status: 'done'},
    {id: 51, user_id: 1, task: 'Robotics Development', date: 'TueFeb252025_5PM', status: 'done'},
    {id: 52, user_id: 1, task: 'Coding Development', date: 'TueMar042025_9AM', status: 'done'},
    {id: 53, user_id: 1, task: 'Lunch', date: 'TueMar042025_10AM', status: 'done'},
    {id: 54, user_id: 1, task: 'Building Work Station', date: 'TueMar042025_11AM', status: 'done'},
    {id: 55, user_id: 1, task: 'Building Work Station', date: 'TueMar042025_12PM', status: 'done'},
    {id: 56, user_id: 1, task: 'Building Work Station', date: 'TueMar042025_1PM', status: 'done'},
    {id: 57, user_id: 1, task: 'Vet for Duke', date: 'TueMar042025_2PM', status: 'done'},
    {id: 58, user_id: 1, task: 'Building Work Station', date: 'TueMar042025_3PM', status: 'done'},
    {id: 59, user_id: 1, task: 'Building Work Station', date: 'TueMar042025_4PM', status: 'done'},
    {id: 60, user_id: 1, task: 'Dr Chavda Call', date: 'TueMar042025_5PM', status: 'done'},
    {id: 61, user_id: 1, task: 'Coding Development', date: 'WedMar052025_9AM', status: 'done'},
    {id: 62, user_id: 1, task: 'Coding Development', date: 'WedMar052025_10AM', status: 'done'},
    {id: 63, user_id: 1, task: 'Self Coding', date: 'WedMar052025_11AM', status: 'done'},
    {id: 64, user_id: 1, task: 'Lunch', date: 'WedMar052025_12PM', status: 'done'},
    {id: 65, user_id: 1, task: 'Building Work Station', date: 'WedMar052025_1PM', status: 'done'},
    {id: 66, user_id: 1, task: 'Building Work Station', date: 'WedMar052025_2PM', status: 'done'},
    {id: 67, user_id: 1, task: 'Building Work Station', date: 'WedMar052025_3PM', status: 'done'},
    {id: 68, user_id: 1, task: 'Building Work Station', date: 'WedMar052025_4PM', status: 'done'},
    {id: 69, user_id: 1, task: 'Building Work Station', date: 'WedMar052025_5PM', status: 'done'},
    {id: 70, user_id: 1, task: 'Coding Development', date: 'ThuMar062025_9AM', status: 'done'},
    {id: 71, user_id: 1, task: 'Lunch', date: 'ThuMar062025_10AM', status: 'done'},
    {id: 72, user_id: 1, task: 'Prepare for Meeting', date: 'ThuMar062025_11AM', status: 'done'},
    {id: 73, user_id: 1, task: 'Meeting - Northland', date: 'ThuMar062025_12PM', status: 'done'},
    {id: 74, user_id: 1, task: 'Socialize & Head Home', date: 'ThuMar062025_1PM', status: 'done'},
    {id: 75, user_id: 1, task: 'Building Work Station', date: 'ThuMar062025_2PM', status: 'done'},
    {id: 76, user_id: 1, task: 'Building Work Station', date: 'ThuMar062025_3PM', status: 'done'},
    {id: 77, user_id: 1, task: 'Robotics Development', date: 'ThuMar062025_4PM', status: 'done'},
    {id: 78, user_id: 1, task: 'Robotics Development', date: 'ThuMar062025_5PM', status: 'done'},
    {id: 79, user_id: 1, task: 'Coding Development', date: 'FriMar072025_9AM', status: 'done'},
    {id: 84, user_id: 1, task: 'Coding Development', date: 'FriMar142025_9AM', status: 'done'},
    {id: 85, user_id: 1, task: 'work on Self', date: 'FriMar142025_10AM', status: 'done'},
    {id: 86, user_id: 1, task: 'Get Ready', date: 'FriMar142025_11AM', status: 'done'},
    {id: 87, user_id: 1, task: 'Drive to Tax Office', date: 'FriMar142025_12PM', status: 'done'},
    {id: 88, user_id: 1, task: 'Tax Office - Registartation', date: 'FriMar142025_1PM', status: 'done'},
    {id: 89, user_id: 1, task: 'Drive Home', date: 'FriMar142025_2PM', status: 'done'},
    {id: 90, user_id: 1, task: 'Work on Work Satation', date: 'FriMar142025_3PM', status: 'done'},
    {id: 91, user_id: 1, task: 'Work on Work Station', date: 'FriMar142025_4PM', status: 'done'},
    {id: 92, user_id: 1, task: 'Clean Living Room', date: 'FriMar142025_5PM', status: 'done'},
    {id: 93, user_id: 1, task: 'Coding Development', date: 'MonMar172025_9AM', status: 'done'},
    {id: 94, user_id: 1, task: 'Coding Development', date: 'MonMar172025_10AM', status: 'done'},
    {id: 95, user_id: 1, task: 'Lunch', date: 'MonMar172025_11AM', status: 'done'},
    {id: 96, user_id: 1, task: 'Work on My Office', date: 'MonMar172025_12PM', status: 'done'},
    {id: 97, user_id: 1, task: 'Work on My Office', date: 'MonMar172025_1PM', status: 'done'},
    {id: 98, user_id: 1, task: 'Work on My Office', date: 'MonMar172025_2PM', status: 'done'},
    {id: 99, user_id: 1, task: 'Work on Work Satation', date: 'MonMar172025_3PM', status: 'done'},
    {id: 100, user_id: 1, task: 'Work on Work Satation', date: 'MonMar172025_4PM', status: 'done'},
    {id: 101, user_id: 1, task: 'Work on Work Satation', date: 'MonMar172025_5PM', status: 'done'},
    {id: 102, user_id: 1, task: 'Slept', date: 'FriMar212025_9AM', status: 'done'},
    {id: 103, user_id: 1, task: 'Slept', date: 'FriMar212025_10AM', status: 'done'},
    {id: 111, user_id: 1, task: 'Coding Development', date: 'MonMar242025_9AM', status: 'done'},
    {id: 112, user_id: 1, task: 'Coding Development', date: 'MonMar242025_10AM', status: 'done'},
    {id: 113, user_id: 1, task: 'lunch', date: 'MonMar242025_11AM', status: 'done'},
    {id: 114, user_id: 1, task: 'Work on Workstation', date: 'MonMar242025_12PM', status: 'done'},
    {id: 115, user_id: 1, task: 'Work on Workstation', date: 'MonMar242025_1PM', status: 'done'},
    {id: 116, user_id: 1, task: 'Work on Workstation', date: 'MonMar242025_2PM', status: 'done'},
    {id: 117, user_id: 1, task: 'Work on Workstation', date: 'MonMar242025_3PM', status: 'done'},
    {id: 118, user_id: 1, task: 'Work on Workstation', date: 'MonMar242025_4PM', status: 'done'},
    {id: 119, user_id: 1, task: 'Work on Workstation', date: 'MonMar242025_5PM', status: 'done'},
    {id: 120, user_id: 1, task: 'Coding Development', date: 'TueMar252025_9AM', status: 'done'},
    {id: 121, user_id: 1, task: 'Coding Development', date: 'WedMar262025_9AM', status: 'done'},
    {id: 122, user_id: 1, task: 'Coding Development', date: 'WedMar262025_10AM', status: 'done'},
    {id: 123, user_id: 1, task: 'Lunch', date: 'WedMar262025_11AM', status: 'done'},
    {id: 124, user_id: 1, task: 'Work on Workstation', date: 'WedMar262025_12PM', status: 'done'},
    {id: 125, user_id: 1, task: 'Work on Workstation', date: 'WedMar262025_1PM', status: 'done'},
    {id: 126, user_id: 1, task: 'Work on Workstation', date: 'WedMar262025_2PM', status: 'done'},
    {id: 127, user_id: 1, task: 'Work on Workstation', date: 'WedMar262025_3PM', status: 'done'},
    {id: 128, user_id: 1, task: 'Work on Workstation', date: 'WedMar262025_4PM', status: 'done'},
    {id: 129, user_id: 1, task: 'Work on Workstation', date: 'WedMar262025_5PM', status: 'done'},
    {id: 130, user_id: 1, task: 'Clean Livingroom', date: 'ThuMar272025_9AM', status: 'done'},
    {id: 131, user_id: 1, task: 'Clean Livingroom', date: 'ThuMar272025_10AM', status: 'done'},
    {id: 132, user_id: 1, task: 'Lunch', date: 'ThuMar272025_11AM', status: 'done'},
    {id: 133, user_id: 1, task: 'Clean Livingroom', date: 'ThuMar272025_12PM', status: 'done'},
    {id: 134, user_id: 1, task: 'Clean Livingroom', date: 'ThuMar272025_1PM', status: 'done'},
    {id: 135, user_id: 1, task: 'Clean Livingroom', date: 'ThuMar272025_2PM', status: 'done'},
    {id: 136, user_id: 1, task: 'Clean Livingroom', date: 'ThuMar272025_3PM', status: 'done'},
    {id: 137, user_id: 1, task: 'Clean Livingroom', date: 'ThuMar272025_4PM', status: 'done'},
    {id: 138, user_id: 1, task: 'Leave for Dallas', date: 'ThuMar272025_5PM', status: 'done'},
    {id: 139, user_id: 1, task: 'Self Coding', date: 'FriMar282025_9AM', status: 'done'},
    {id: 140, user_id: 1, task: 'Self Coding', date: 'FriMar282025_10AM', status: 'done'},
    {id: 141, user_id: 1, task: 'Self Coding', date: 'FriMar282025_11AM', status: 'done'},
    {id: 142, user_id: 1, task: 'Socialize With Mom', date: 'FriMar282025_12PM', status: 'done'},
    {id: 143, user_id: 1, task: 'Socialize With Mom', date: 'FriMar282025_1PM', status: 'done'},
    {id: 144, user_id: 1, task: 'Get Ready for Hospital', date: 'FriMar282025_2PM', status: 'done'},
    {id: 145, user_id: 1, task: 'Wait for Surgery', date: 'FriMar282025_3PM', status: 'done'},
    {id: 146, user_id: 1, task: 'Wait for Surgery', date: 'FriMar282025_4PM', status: 'done'},
    {id: 147, user_id: 1, task: 'Have Surgery', date: 'FriMar282025_5PM', status: 'done'},
    {id: 158, user_id: 1, task: 'Coding Development', date: 'TueApr152025_9AM', status: 'done'},
    {id: 161, user_id: 1, task: 'RENO: Time with Deb', date: 'MonApr212025_11AM', status: 'done'},
    {id: 162, user_id: 1, task: 'RENO: Time with Deb', date: 'MonApr212025_12PM', status: 'done'},
    {id: 163, user_id: 1, task: 'RENO: Time with Dad', date: 'MonApr212025_1PM', status: 'done'},
    {id: 164, user_id: 1, task: 'RENO: Time with Dad', date: 'MonApr212025_2PM', status: 'done'},
    {id: 165, user_id: 1, task: 'RENO: Time with Dad', date: 'MonApr212025_3PM', status: 'done'},
    {id: 166, user_id: 1, task: 'RENO: Lunch with Dad', date: 'MonApr212025_4PM', status: 'done'},
    {id: 167, user_id: 1, task: 'RENO: Rest at Hotel', date: 'MonApr212025_5PM', status: 'done'},
    {id: 159, user_id: 1, task: 'RENO: Slept', date: 'MonApr212025_9AM', status: 'done'},
    {id: 160, user_id: 1, task: 'RENO: Breakfast', date: 'MonApr212025_10AM', status: 'done'},
    {id: 168, user_id: 1, task: 'Coding Development', date: 'MonMay052025_9AM', status: 'done'},
    {id: 169, user_id: 1, task: 'Coding Development', date: 'MonMay052025_10AM', status: 'done'},
    {id: 170, user_id: 1, task: 'Lunch', date: 'MonMay052025_11AM', status: 'pending'},
    {id: 171, user_id: 1, task: 'Robotics Development', date: 'MonMay052025_12PM', status: 'pending'},
    {id: 172, user_id: 1, task: 'Robotics Development', date: 'MonMay052025_1PM', status: 'pending'},
    {id: 173, user_id: 1, task: 'Batteries for Powerchairs', date: 'MonMay052025_2PM', status: 'pending'},
    {id: 174, user_id: 1, task: 'Batteries for Powerchairs', date: 'MonMay052025_3PM', status: 'pending'},
    {id: 175, user_id: 1, task: 'Batteries for Powerchairs', date: 'MonMay052025_4PM', status: 'pending'},
    {id: 176, user_id: 1, task: 'Clean up Mess from living room', date: 'MonMay052025_5PM', status: 'pending'},
    {id: 177, user_id: 1, task: 'Coding Development', date: 'TueMay062025_9AM', status: 'done'},
    {id: 178, user_id: 1, task: 'Meet Pedro for Metal', date: 'TueMay062025_1PM', status: 'done'},
    {id: 192, user_id: 1, task: 'Camping', date: 'ThuMay082025_3PM', status: 'pending'},
    {id: 193, user_id: 1, task: 'Camping', date: 'ThuMay082025_4PM', status: 'pending'},
    {id: 194, user_id: 1, task: 'Camping', date: 'ThuMay082025_5PM', status: 'pending'},
    {id: 198, user_id: 1, task: 'Driving', date: 'ThuMay082025_1PM', status: 'pending'},
    {id: 191, user_id: 1, task: 'Driving', date: 'ThuMay082025_2PM', status: 'pending'},
    {id: 201, user_id: 1, task: 'Goodwill', date: 'TueMay062025_2PM', status: 'done'},
    {id: 202, user_id: 1, task: 'HEB Curbside', date: 'TueMay062025_3PM', status: 'done'},
    {id: 203, user_id: 1, task: 'Drive Home', date: 'TueMay062025_4PM', status: 'done'},
    {id: 204, user_id: 1, task: 'Prepare for Camping', date: 'TueMay062025_10AM', status: 'done'},
    {id: 205, user_id: 1, task: 'Prepare for Camping', date: 'TueMay062025_11AM', status: 'done'},
    {id: 206, user_id: 1, task: 'Get Ready for Pedro', date: 'TueMay062025_12PM', status: 'done'},
    {id: 207, user_id: 1, task: 'Unload truck', date: 'TueMay062025_5PM', status: 'done'},
    {id: 180, user_id: 1, task: 'Coding Development', date: 'WedMay072025_10AM', status: 'done'},
    {id: 199, user_id: 1, task: 'Go get Batteries', date: 'WedMay072025_11AM', status: 'done'},
    {id: 208, user_id: 1, task: 'Drive Home', date: 'WedMay072025_1PM', status: 'done'},
    {id: 209, user_id: 1, task: 'Install Battery', date: 'WedMay072025_2PM', status: 'done'},
    {id: 210, user_id: 1, task: 'Install Battery', date: 'WedMay072025_3PM', status: 'done'},
    {id: 211, user_id: 1, task: 'Prepare for Camping', date: 'WedMay072025_4PM', status: 'done'},
    {id: 181, user_id: 1, task: 'Coding Development', date: 'ThuMay082025_9AM', status: 'done'},
    {id: 195, user_id: 1, task: 'Prepare for Camping', date: 'ThuMay082025_10AM', status: 'done'},
    {id: 196, user_id: 1, task: 'Prepare for Camping', date: 'ThuMay082025_11AM', status: 'done'},
    {id: 197, user_id: 1, task: 'Prepare for Camping', date: 'ThuMay082025_12PM', status: 'done'},
    {id: 182, user_id: 1, task: 'Camping', date: 'FriMay092025_9AM', status: 'done'},
    {id: 186, user_id: 1, task: 'Driving', date: 'FriMay092025_1PM', status: 'done'},
    {id: 187, user_id: 1, task: 'Driving', date: 'FriMay092025_2PM', status: 'done'},
    {id: 188, user_id: 1, task: 'Driving', date: 'FriMay092025_3PM', status: 'done'},
    {id: 189, user_id: 1, task: 'Driving', date: 'FriMay092025_4PM', status: 'done'},
    {id: 190, user_id: 1, task: 'Driving', date: 'FriMay092025_5PM', status: 'done'},
    {id: 183, user_id: 1, task: 'Camping', date: 'FriMay092025_10AM', status: 'done'},
    {id: 184, user_id: 1, task: 'Camping', date: 'FriMay092025_11AM', status: 'done'},
    {id: 185, user_id: 1, task: 'Camping', date: 'FriMay092025_12PM', status: 'done'},
    {id: 104, user_id: 1, task: 'Work on Table', date: 'FriMar212025_11AM', status: 'done'},
    {id: 105, user_id: 1, task: 'Work on table', date: 'FriMar212025_12PM', status: 'done'},
    {id: 106, user_id: 1, task: 'Work on Table', date: 'FriMar212025_1PM', status: 'done'},
    {id: 179, user_id: 1, task: 'Coding Development', date: 'WedMay072025_9AM', status: 'done'},
    {id: 213, user_id: 1, task: 'Go get Batteries', date: 'WedMay072025_12PM', status: 'done'},
    {id: 214, user_id: 1, task: 'Prepare for Camping', date: 'WedMay072025_5PM', status: 'done'},
    {id: 247, user_id: 1, task: 'Work on Office', date: 'MonMay122025_4PM', status: 'pending'},
    {id: 215, user_id: 1, task: 'Coding Development', date: 'MonMay122025_9AM', status: 'done'},
    {id: 216, user_id: 1, task: 'Coding Development', date: 'MonMay122025_10AM', status: 'done'},
    {id: 223, user_id: 1, task: 'Robotics Learning', date: 'MonMay122025_11AM', status: 'done'},
    {id: 224, user_id: 1, task: 'Robotics Learning', date: 'MonMay122025_12PM', status: 'done'},
    {id: 231, user_id: 1, task: 'Lunch', date: 'MonMay122025_1PM', status: 'done'},
    {id: 248, user_id: 1, task: 'Work on Living Room', date: 'MonMay122025_5PM', status: 'done'},
    {id: 236, user_id: 1, task: 'Work on Office', date: 'MonMay122025_2PM', status: 'done'},
    {id: 241, user_id: 1, task: 'Robotics Development', date: 'FriMay162025_3PM', status: 'done'},
    {id: 237, user_id: 1, task: 'Slept', date: 'MonMay122025_3PM', status: 'done'},
    {id: 218, user_id: 1, task: 'Coding Development', date: 'WedMay142025_9AM', status: 'done'},
    {id: 219, user_id: 1, task: 'Coding Development', date: 'WedMay142025_10AM', status: 'done'},
    {id: 226, user_id: 1, task: 'Robotics Learning', date: 'WedMay142025_11AM', status: 'done'},
    {id: 227, user_id: 1, task: 'Robotics Learning', date: 'WedMay142025_12PM', status: 'done'},
    {id: 233, user_id: 1, task: 'Lunch', date: 'WedMay142025_1PM', status: 'done'},
    {id: 250, user_id: 1, task: 'Robotics Development', date: 'FriMay162025_4PM', status: 'done'},
    {id: 238, user_id: 1, task: 'Robotics Learning', date: 'WedMay142025_2PM', status: 'done'},
    {id: 239, user_id: 1, task: 'Work on Living Room', date: 'WedMay142025_3PM', status: 'done'},
    {id: 249, user_id: 1, task: 'Work on Living Room', date: 'WedMay142025_4PM', status: 'done'},
    {id: 251, user_id: 1, task: 'Work on Living Room', date: 'WedMay142025_5PM', status: 'done'},
    {id: 217, user_id: 1, task: 'Coding Development', date: 'TueMay132025_9AM', status: 'done'},
    {id: 225, user_id: 1, task: 'Robotics Learning', date: 'TueMay132025_10AM', status: 'done'},
    {id: 232, user_id: 1, task: 'Lunch & Driving', date: 'TueMay132025_11AM', status: 'done'},
    {id: 253, user_id: 1, task: 'Northland AA', date: 'TueMay132025_12PM', status: 'done'},
    {id: 254, user_id: 1, task: 'Socialize', date: 'TueMay132025_1PM', status: 'done'},
    {id: 220, user_id: 1, task: 'Coding Development', date: 'ThuMay152025_9AM', status: 'done'},
    {id: 228, user_id: 1, task: 'Robotics Learning', date: 'ThuMay152025_10AM', status: 'done'},
    {id: 234, user_id: 1, task: 'Lunch', date: 'ThuMay152025_11AM', status: 'done'},
    {id: 242, user_id: 1, task: 'Attorney-Jeremy', date: 'ThuMay152025_2PM', status: 'done'},
    {id: 243, user_id: 1, task: 'Attorney-Jeremy', date: 'ThuMay152025_3PM', status: 'done'},
    {id: 244, user_id: 1, task: 'Attorney-Jeremy', date: 'ThuMay152025_4PM', status: 'done'},
    {id: 245, user_id: 1, task: 'Hair Consult', date: 'ThuMay152025_12PM', status: 'done'},
    {id: 246, user_id: 1, task: 'Driving', date: 'ThuMay152025_1PM', status: 'done'},
    {id: 255, user_id: 1, task: 'Family Meeting', date: 'ThuMay152025_5PM', status: 'done'},
    {id: 256, user_id: 1, task: 'Driving', date: 'TueMay132025_2PM', status: 'done'},
    {id: 257, user_id: 1, task: 'Worked on Home', date: 'TueMay132025_3PM', status: 'done'},
    {id: 258, user_id: 1, task: 'Worked on Home', date: 'TueMay132025_4PM', status: 'done'},
    {id: 259, user_id: 1, task: 'Worked on Home', date: 'TueMay132025_5PM', status: 'done'},
    {id: 252, user_id: 1, task: 'Robotics Development', date: 'FriMay162025_5PM', status: 'done'},
    {id: 221, user_id: 1, task: 'Worked on House', date: 'FriMay162025_9AM', status: 'done'},
    {id: 222, user_id: 1, task: 'Coding Development', date: 'FriMay162025_10AM', status: 'done'},
    {id: 229, user_id: 1, task: 'Robotics Learning', date: 'FriMay162025_11AM', status: 'done'},
    {id: 230, user_id: 1, task: 'Robotics Learning', date: 'FriMay162025_12PM', status: 'done'},
    {id: 235, user_id: 1, task: 'Lunch', date: 'FriMay162025_1PM', status: 'done'},
    {id: 240, user_id: 1, task: 'Robotics Development', date: 'FriMay162025_2PM', status: 'done'},
    {id: 264, user_id: 1, task: 'Work on Station', date: 'TueMay112025_1PM', status: 'done'},
    {id: 265, user_id: 1, task: 'Work on Station', date: 'TueMay112025_2PM', status: 'done'},
    {id: 266, user_id: 1, task: 'Work on Station', date: 'TueMay112025_3PM', status: 'done'},
    {id: 267, user_id: 1, task: 'Work on Station', date: 'TueMay112025_4PM', status: 'done'},
    {id: 268, user_id: 1, task: 'Work on Station', date: 'TueMay112025_5PM', status: 'done'},
    {id: 296, user_id: 1, task: 'Coding Development', date: 'TueMar112025_9AM', status: 'done'},
    {id: 315, user_id: 1, task: 'Coding Development', date: 'WedMar122025_9AM', status: 'done'},
    {id: 297, user_id: 1, task: 'Coding Development', date: 'TueMar112025_10AM', status: 'done'},
    {id: 298, user_id: 1, task: 'Bail Bonds Checkin', date: 'TueMar112025_11AM', status: 'done'},
    {id: 300, user_id: 1, task: 'Work on Station', date: 'TueMar112025_1PM', status: 'done'},
    {id: 301, user_id: 1, task: 'Work on Station', date: 'TueMar112025_2PM', status: 'done'},
    {id: 302, user_id: 1, task: 'Work on Station', date: 'TueMar112025_3PM', status: 'done'},
    {id: 303, user_id: 1, task: 'Work on Station', date: 'TueMar112025_4PM', status: 'done'},
    {id: 304, user_id: 1, task: 'Work on Station', date: 'TueMar112025_5PM', status: 'done'},
    {id: 316, user_id: 1, task: 'Coding Development', date: 'WedMar122025_10AM', status: 'done'},
    {id: 317, user_id: 1, task: 'Self Coding', date: 'WedMar122025_11AM', status: 'done'},
    {id: 318, user_id: 1, task: 'Lunch', date: 'WedMar122025_12PM', status: 'done'},
    {id: 319, user_id: 1, task: 'Work on Station', date: 'WedMar122025_1PM', status: 'done'},
    {id: 320, user_id: 1, task: 'Work on Station', date: 'WedMar122025_2PM', status: 'done'},
    {id: 321, user_id: 1, task: 'Work on Station', date: 'WedMar122025_3PM', status: 'done'},
    {id: 322, user_id: 1, task: 'Work on Station', date: 'WedMar122025_4PM', status: 'done'},
    {id: 323, user_id: 1, task: 'Work on Station', date: 'WedMar122025_5PM', status: 'done'},
    {id: 324, user_id: 1, task: 'Coding Development', date: 'ThuMar132025_9AM', status: 'done'},
    {id: 325, user_id: 1, task: 'Lunch and Get ready', date: 'ThuMar132025_10AM', status: 'done'},
    {id: 326, user_id: 1, task: 'Leave for Meeting', date: 'ThuMar132025_11AM', status: 'done'},
    {id: 327, user_id: 1, task: 'Northland', date: 'ThuMar132025_12PM', status: 'done'},
    {id: 328, user_id: 1, task: 'Socialize', date: 'ThuMar132025_1PM', status: 'done'},
    {id: 333, user_id: 1, task: 'Work on Station', date: 'ThuMar132025_2PM', status: 'done'},
    {id: 334, user_id: 1, task: 'Work on Station', date: 'ThuMar132025_3PM', status: 'done'},
    {id: 335, user_id: 1, task: 'Work on Station', date: 'ThuMar132025_4PM', status: 'done'},
    {id: 336, user_id: 1, task: 'Work on Station', date: 'ThuMar132025_5PM', status: 'done'},
    {id: 337, user_id: 1, task: 'Coding Development', date: 'MonMar032025_9AM', status: 'done'},
    {id: 338, user_id: 1, task: 'Coding Development', date: 'MonMar032025_10AM', status: 'done'},
    {id: 339, user_id: 1, task: 'Self Coding', date: 'MonMar032025_11AM', status: 'done'},
    {id: 340, user_id: 1, task: 'Lunch', date: 'MonMar032025_12PM', status: 'done'},
    {id: 341, user_id: 1, task: 'Phone Calls', date: 'MonMar032025_1PM', status: 'done'},
    {id: 342, user_id: 1, task: 'Robotics Development', date: 'MonMar032025_2PM', status: 'done'},
    {id: 343, user_id: 1, task: 'Spasms', date: 'MonMar032025_3PM', status: 'done'},
    {id: 344, user_id: 1, task: 'Work on Station', date: 'MonMar032025_4PM', status: 'done'},
    {id: 345, user_id: 1, task: 'Work on Station', date: 'MonMar032025_5PM', status: 'done'},
    {id: 346, user_id: 1, task: 'Self Coding', date: 'FriMar072025_10AM', status: 'done'},
    {id: 347, user_id: 1, task: 'Self Coding', date: 'FriMar072025_11AM', status: 'done'},
    {id: 348, user_id: 1, task: 'Lunch', date: 'FriMar072025_12PM', status: 'done'},
    {id: 350, user_id: 1, task: 'Lunch', date: 'TueMar112025_12PM', status: 'done'},
    {id: 369, user_id: 1, task: 'Coding Development', date: 'ThuApr172025_9AM', status: 'done'},
    {id: 370, user_id: 1, task: 'Reno', date: 'ThuApr172025_10AM', status: 'done'},
    {id: 371, user_id: 1, task: 'Reno', date: 'ThuApr172025_11AM', status: 'done'},
    {id: 372, user_id: 1, task: 'Reno', date: 'ThuApr172025_12PM', status: 'done'},
    {id: 373, user_id: 1, task: 'Reno', date: 'ThuApr172025_1PM', status: 'done'},
    {id: 374, user_id: 1, task: 'Reno', date: 'ThuApr172025_2PM', status: 'done'},
    {id: 375, user_id: 1, task: 'Reno', date: 'ThuApr172025_3PM', status: 'done'},
    {id: 376, user_id: 1, task: 'Reno', date: 'ThuApr172025_4PM', status: 'done'},
    {id: 377, user_id: 1, task: 'Reno', date: 'ThuApr172025_5PM', status: 'done'},
    {id: 378, user_id: 1, task: 'Reno', date: 'FriApr182025_9AM', status: 'done'},
    {id: 379, user_id: 1, task: 'Reno', date: 'FriApr182025_10AM', status: 'done'},
    {id: 380, user_id: 1, task: 'Reno', date: 'FriApr182025_11AM', status: 'done'},
    {id: 381, user_id: 1, task: 'Reno', date: 'FriApr182025_12PM', status: 'done'},
    {id: 382, user_id: 1, task: 'Reno', date: 'FriApr182025_1PM', status: 'done'},
    {id: 383, user_id: 1, task: 'Reno', date: 'FriApr182025_2PM', status: 'done'},
    {id: 384, user_id: 1, task: 'Reno', date: 'FriApr182025_3PM', status: 'done'},
    {id: 385, user_id: 1, task: 'Reno', date: 'FriApr182025_4PM', status: 'done'},
    {id: 386, user_id: 1, task: 'Reno', date: 'FriApr182025_5PM', status: 'done'},
    {id: 107, user_id: 1, task: 'Work on Workstation', date: 'FriMar212025_2PM', status: 'done'},
    {id: 108, user_id: 1, task: 'Work on Workstation', date: 'FriMar212025_3PM', status: 'done'},
    {id: 109, user_id: 1, task: 'Work on Workstation', date: 'FriMar212025_4PM', status: 'done'},
    {id: 110, user_id: 1, task: 'Work on Workstation', date: 'FriMar212025_5PM', status: 'done'},
    {id: 396, user_id: 1, task: 'Reno', date: 'TueApr222025_9AM', status: 'done'},
    {id: 397, user_id: 1, task: 'Reno', date: 'TueApr222025_10AM', status: 'done'},
    {id: 398, user_id: 1, task: 'Reno', date: 'TueApr222025_11AM', status: 'done'},
    {id: 399, user_id: 1, task: 'Reno', date: 'TueApr222025_12PM', status: 'done'},
    {id: 400, user_id: 1, task: 'Reno', date: 'TueApr222025_1PM', status: 'done'},
    {id: 401, user_id: 1, task: 'LasVegas', date: 'TueApr222025_2PM', status: 'done'},
    {id: 402, user_id: 1, task: 'LasVegas', date: 'TueApr222025_3PM', status: 'done'},
    {id: 403, user_id: 1, task: 'LasVegas', date: 'TueApr222025_4PM', status: 'done'},
    {id: 404, user_id: 1, task: 'LasVegas', date: 'TueApr222025_5PM', status: 'done'},
    {id: 405, user_id: 1, task: 'LasVegas', date: 'WedApr232025_9AM', status: 'done'},
    {id: 406, user_id: 1, task: 'LasVegas', date: 'WedApr232025_10AM', status: 'done'},
    {id: 407, user_id: 1, task: 'LasVegas', date: 'WedApr232025_11AM', status: 'done'},
    {id: 408, user_id: 1, task: 'LasVegas', date: 'WedApr232025_12PM', status: 'done'},
    {id: 409, user_id: 1, task: 'LasVegas', date: 'WedApr232025_1PM', status: 'done'},
    {id: 410, user_id: 1, task: 'LasVegas', date: 'WedApr232025_2PM', status: 'done'},
    {id: 411, user_id: 1, task: 'LasVegas', date: 'WedApr232025_3PM', status: 'done'},
    {id: 412, user_id: 1, task: 'LasVegas', date: 'WedApr232025_4PM', status: 'done'},
    {id: 413, user_id: 1, task: 'LasVegas', date: 'WedApr232025_5PM', status: 'done'},
    {id: 414, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_9AM', status: 'done'},
    {id: 415, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_10AM', status: 'done'},
    {id: 416, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_11AM', status: 'done'},
    {id: 417, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_12PM', status: 'done'},
    {id: 418, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_1PM', status: 'done'},
    {id: 419, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_2PM', status: 'done'},
    {id: 420, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_3PM', status: 'done'},
    {id: 421, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_4PM', status: 'done'},
    {id: 422, user_id: 1, task: 'LasVegas', date: 'ThuApr242025_5PM', status: 'done'},
    {id: 423, user_id: 1, task: 'Coding Development', date: 'MonMay192025_9AM', status: 'pending'},
    {id: 424, user_id: 1, task: 'Coding Development', date: 'MonMay192025_10AM', status: 'pending'},
    {id: 425, user_id: 1, task: 'Coding Development', date: 'TueMay202025_9AM', status: 'pending'},
    {id: 426, user_id: 1, task: 'Coding Development', date: 'WedMay212025_9AM', status: 'pending'},
    {id: 427, user_id: 1, task: 'Coding Development', date: 'WedMay212025_10AM', status: 'pending'},
    {id: 428, user_id: 1, task: 'Coding Development', date: 'ThuMay222025_9AM', status: 'pending'},
    {id: 429, user_id: 1, task: 'Robotics Development', date: 'FriMay232025_9AM', status: 'pending'},
    {id: 430, user_id: 1, task: 'Robotics Development', date: 'FriMay232025_10AM', status: 'pending'},
    {id: 431, user_id: 1, task: 'Robotics Development', date: 'FriMay232025_11AM', status: 'pending'},
    {id: 432, user_id: 1, task: 'Robotics Development', date: 'MonMay192025_11AM', status: 'pending'},
    {id: 434, user_id: 1, task: 'Robotics Development', date: 'WedMay212025_11AM', status: 'pending'},
    {id: 435, user_id: 1, task: 'Robotics Development', date: 'WedMay212025_12PM', status: 'pending'},
    {id: 436, user_id: 1, task: 'Lunch', date: 'TueMay202025_10AM', status: 'pending'},
    {id: 438, user_id: 1, task: 'Lunch', date: 'WedMay212025_1PM', status: 'pending'},
    {id: 439, user_id: 1, task: 'Lunch', date: 'ThuMay222025_10AM', status: 'pending'},
    {id: 440, user_id: 1, task: 'Lunch', date: 'FriMay232025_12PM', status: 'pending'},
    {id: 441, user_id: 1, task: 'Driving', date: 'TueMay202025_11AM', status: 'pending'},
    {id: 442, user_id: 1, task: 'Driving', date: 'ThuMay222025_11AM', status: 'pending'},
    {id: 443, user_id: 1, task: 'Northland', date: 'TueMay202025_12PM', status: 'pending'},
    {id: 444, user_id: 1, task: 'Northland', date: 'ThuMay222025_12PM', status: 'pending'},
    {id: 446, user_id: 1, task: 'Socialize', date: 'ThuMay222025_1PM', status: 'pending'},
    {id: 452, user_id: 1, task: 'Driving', date: 'ThuMay222025_2PM', status: 'pending'},
    {id: 453, user_id: 1, task: 'Work on Office', date: 'WedMay212025_2PM', status: 'pending'},
    {id: 454, user_id: 1, task: 'Work on Office', date: 'WedMay212025_3PM', status: 'pending'},
    {id: 457, user_id: 1, task: 'Robotics Development', date: 'ThuMay222025_3PM', status: 'pending'},
    {id: 458, user_id: 1, task: 'Robotics Development', date: 'ThuMay222025_4PM', status: 'pending'},
    {id: 459, user_id: 1, task: 'Coding', date: 'FriMay232025_1PM', status: 'pending'},
    {id: 460, user_id: 1, task: 'Coding', date: 'FriMay232025_2PM', status: 'pending'},
    {id: 461, user_id: 1, task: 'Coding', date: 'ThuMay222025_5PM', status: 'pending'},
    {id: 462, user_id: 1, date: 'MonMay192025_12PM', task: 'Lunch & Bondsman', status: 'pending'},
    {id: 463, user_id: 1, date: 'MonMay192025_2PM', task: 'Meet Debora', status: 'pending'},
    {id: 464, user_id: 1, date: 'MonMay192025_1PM', task: 'Driving', status: 'pending'},
    {id: 465, user_id: 1, date: 'MonMay192025_3PM', task: 'Driving', status: 'pending'},
    {id: 466, user_id: 1, date: 'MonMay192025_5PM', task: 'Driving', status: 'pending'},
    {id: 467, user_id: 1, date: 'TueMay202025_1PM', task: 'Socialize', status: 'pending'},
    {id: 468, user_id: 1, date: 'TueMay202025_2PM', task: 'Driving', status: 'pending'},
    {id: 469, user_id: 1, date: 'TueMay202025_4PM', task: 'Vet', status: 'pending'},
    {id: 470, user_id: 1, date: 'TueMay202025_5PM', task: 'Driving', status: 'pending'},
    {id: 471, user_id: 1, date: 'TueMay202025_3PM', task: 'Robotics Development', status: 'pending'},
    {id: 472, user_id: 1, date: 'MonMay192025_4PM', task: 'Domain', status: 'pending'}
]