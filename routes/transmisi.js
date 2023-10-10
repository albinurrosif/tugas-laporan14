const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// GET - Mendapatkan daftar transmisi
router.get('/', (req, res) => {
  connection.query('SELECT * FROM transmisi', (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Daftar Transmisi',
      data: rows,
    });
  });
});

// POST - Menambahkan transmisi baru
router.post('/transmisi', [body('nama_transmisi').notEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nama_transmisi } = req.body;

  const newData = {
    nama_transmisi,
  };

  connection.query('INSERT INTO transmisi SET ?', newData, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }

    return res.status(201).json({
      status: true,
      message: 'Transmisi telah ditambahkan',
      data: {
        id: result.insertId,
        ...newData,
      },
    });
  });
});

// PUT - Mengupdate transmisi berdasarkan ID
router.put('/transmisi/:id_transmisi', (req, res) => {
  // Implementasi update transmisi
  const { id_transmisi } = req.params;
  const { nama_transmisi } = req.body;

  connection.query('UPDATE transmisi SET nama_transmisi = ? WHERE id_transmisi = ?', [nama_transmisi, id_transmisi], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Transmisi tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Transmisi telah diupdate',
      data: {
        id_transmisi,
        nama_transmisi,
      },
    });
  });
});

// DELETE - Menghapus transmisi berdasarkan ID
router.delete('/transmisi/:id_transmisi', (req, res) => {
  // Implementasi delete transmisi
  const { id_transmisi } = req.params;

  connection.query('DELETE FROM transmisi WHERE id_transmisi = ?', [id_transmisi], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Server Error',
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Transmisi tidak ditemukan',
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Transmisi telah dihapus',
    });
  });
});

module.exports = router;
