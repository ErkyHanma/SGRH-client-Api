import dotenv from "dotenv";
import app from "@server/server";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
