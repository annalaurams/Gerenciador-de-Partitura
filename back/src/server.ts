import { app } from "./app";

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
});