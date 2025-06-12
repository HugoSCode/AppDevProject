import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (process.env.APP_ENV === "production") {
    console.log(`✅ Server is running on port ${PORT} (Render environment)`);
  } else {
    console.log(`✅ Server is listening locally at http://localhost:${PORT}`);
  }
});