# data.import.sql

INSERT INTO reviews (word_id, user_id, bin, time_to_next_appearance, wrong_attempts) VALUES
  (1, 1, 2, UNIX_TIMESTAMP() + 25, 2),
  (3, 1, 4, UNIX_TIMESTAMP() + (10*60), 1),
  (4, 1, 8, UNIX_TIMESTAMP() + (5*24*60*60), 1),
  (7, 1, 3, UNIX_TIMESTAMP() + (2*60), 1),
  (23, 1, 10, UNIX_TIMESTAMP() + (4 * 30 * 24 * 60 * 60), 1),
  (17, 1, 0, UNIX_TIMESTAMP() + 0, 0),
  (13, 1, 5, UNIX_TIMESTAMP() + (1 * 60 * 60), 7);

INSERT INTO words (word, definition) VALUES
  ('apple', 'A red fruit that is eaten as food.'),
  ('banana', 'A yellow fruit that is eaten as food.'),
  ('orange', 'A round, orange colored citrus fruit.'),
  ('pear', 'A round, green-colored fruit.'),
  ('grape', 'A small, round fruit that grows in clusters.'),
  ('pinapple', 'A cylinderical shape, green to orange fruit.'),
  ('tomato', 'A most used fruit with veggies.'),
  ('iphone', 'A phone, an ipad and an internet navigator.'),
  ('android', 'A human robot or a robot that understands humans.'),
  ('laptop', 'A desktop that can be carried in lap easily.'),
  ('secret', 'Something or some talk that is kept hidden from common consensus.'),
  ('eggplant', 'A commonly used veggie.'),
  ('farmer', 'A person who does plouging of crops.'),
  ('consider', 'deem to be'),
  ('minute', 'infinitely or immeasurably small'),
  ('accord', 'concurrence of opinion'),
  ('evident', 'clearly revealed to the mind or the senses or judgment'),
  ('practice', 'a customary way of operation or behavior'),
  ('intend', 'have in mind as a purpose'),
  ('concern', 'something that interests you because it is important'),
  ('commit', 'perform an act, usually with a negative connotation'),
  ('issue', 'some situation or event that is thought about'),
  ('approach', 'move towards'),
  ('establish', 'set up or found'),
  ('utter', 'without qualification'),
  ('conduct', 'direct the course of; manage or control'),
  ('engage', 'consume all of one''s time or attention'),
  ('obtain', 'come into possession of'),
  ('scarce', 'deficient quantity or number compared wih the demand'),
  ('policy', 'a plan of actio adopted by an individual or social group'),
  ('straight', 'successive or without a break'), ---
  ('grant', 'allow to have'),
  ('dwell', 'think moodily or anxiously about something'),
  ('contract', 'a binding agreement that is enforceable by law'),
  ('earnest', 'characterized by a firm, sincere belief in one''s opinions'),
  ('yield', 'give or supply'),
  ('wander','move or cause to move in a sinuous or circular course'),
  ('insist', 'be emphatic or resolute and refuse to budge');