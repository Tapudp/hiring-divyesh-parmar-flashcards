CREATE TABLE words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word VARCHAR(255) NOT NULL,
  definition VARCHAR(255) NOT NULL,
  is_deleted INT NOT NULL DEFAULT 0,
  CONSTRAINT is_deleted_check CHECK (is_deleted IN (0, 1, 2))
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  word_id INT NOT NULL,
  user_id INT NOT NULL,
  bin TINYINT NOT NULL,
  time_to_next_appearance INT NOT NULL,
  wrong_attempts INT NOT NULL
);