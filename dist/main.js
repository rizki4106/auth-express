// membaca file .env
require("dotenv").config();
// 
const express = require("express");
// list router
const { userRouter } = require('./routes');
// inisialisasi app
const app = express();
const port = process.env.APP_PORT;
// enable supaya bisa ambil body json dari request post
app.use(express.json());
// kumpulan route
app.use("/", userRouter);
// jalankan app
app.listen(port, () => {
    console.log(`Berjalan pada port : ${port}`);
});
//# sourceMappingURL=main.js.map