const bcrypt = require("bcryptjs");
const hash = "$2b$10$rJ7VWL9y8M3KPqT9Nk5OGuqKJh6yZ4fX7wN8mC9lA0bD2eH3kI1qS";
const password = "nglearn@admin2024";

bcrypt.compare(password, hash).then(res => {
  console.log("Match:", res);
});
