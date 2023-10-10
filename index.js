const express = require('express'); // membuat variabel baru dengan nama express
const app = express(); // membuat variabel bare dengan nama app yang isinya varibel express
const port = 3080; // membuat variabel dengan nama port yang isinya 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());

//import route post
const kendaraanRouter = require('./routes/kendaraan');
app.use('/api/kendaraan', kendaraanRouter);
const transmisiRouter = require('./routes/transmisi');
app.use('/api/transmisi', transmisiRouter);

//kita listen Express.js kedalam port yang kita buat diatas
app.listen(port, () => {
  //dan kita tampilkan log sebagai penanda bahwa Express.js berhasil dijalankan
  console.log('aplikasi berjalan di http:://localhost:${port}');
});
