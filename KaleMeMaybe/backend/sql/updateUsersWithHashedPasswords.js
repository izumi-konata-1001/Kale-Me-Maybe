const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const db = new sqlite3.Database("./project-database.db");

async function updateUsersWithHashedPasswords() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      password: "secure123",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      password: "password456",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Alice Johnson",
      password: "mypassword789",
      email: "alice@example.com",
    },
    {
      id: 4,
      name: "Bob Smith",
      password: "testpassword101",
      email: "bob@example.com",
    },
    {
      id: 5,
      name: "Carol Taylor",
      password: "hellopassword123",
      email: "carol@example.com",
    },
  ];

  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      db.run(
        "UPDATE user SET encrypted_password = ? WHERE email = ?",
        [hashedPassword, user.email],
        function (err) {
          if (err) {
            console.error("Error updating user:", err.message);
          } else {
            console.log(`Password updated successfully for ${user.name}.`);
          }
        }
      );
    })
  );

  db.close();
}

updateUsersWithHashedPasswords();
