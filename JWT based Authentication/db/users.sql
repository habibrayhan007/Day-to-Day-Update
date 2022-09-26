CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registerd` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  PRIMARY KEY(id)
)