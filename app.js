const express = require('express');

const userRoutes = require('./src/routes/user.routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
