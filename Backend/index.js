const express = require("express");

const app = express();

// environment variables
const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
