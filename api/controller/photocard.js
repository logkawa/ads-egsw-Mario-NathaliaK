// controller/controller_photocard.js
const { cloudinary, message } = require('../modulo/config.js');
const photocardDAO = require('../model/DAO/photocard.js');
const fs = require('fs');

// POST Photocard
const postPhotocard = async (req, res) => {
  try {
    const file = req.file; // vindo do multer
    const { categoria, usuario_id } = req.body;

    if (!file || !categoria || !usuario_id) {
      return res.status(400).json(message.ERROR_REQUIRED_FIELDS);
    }

    // Upload pro Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'photocards'
    });

    // Salvar no BD
    const novoPhoto = {
      usuario_id,
      categoria,
      image_url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    };

    const result = await photocardDAO.insertPhotocard(novoPhoto);
    fs.unlinkSync(file.path); // remove o arquivo temporário

    if (result) {
      res.status(201).json({
        status: message.SUCCESS_CREATED_ITEM.status,
        status_code: message.SUCCESS_CREATED_ITEM.status_code,
        message: message.SUCCESS_CREATED_ITEM.message,
        data: novoPhoto
      });
    } else {
      res.status(500).json(message.ERROR_INTERNAL_SERVER_DB);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(message.ERROR_INTERNAL_SERVER);
  }
};

// GET Photocard por usuário
const getPhotocardsByUserId = async (req, res) => {
  try {
    const userId = req.params.usuario_id;

    if (!userId || isNaN(userId)) {
      return res.status(400).json(message.ERROR_REQUIRED_FIELDS);
    }

    const result = await photocardDAO.selectPhotocardsByUserId(userId);

    if (result && result.length > 0) {
      res.status(200).json({
        status: message.SUCCESS_FOUND_ITEM.status,
        status_code: message.SUCCESS_FOUND_ITEM.status_code,
        photocards: result
      });
    } else {
      res.status(404).json(message.ERROR_NOT_FOUND);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(message.ERROR_INTERNAL_SERVER);
  }
};

module.exports = {
  postPhotocard,
  getPhotocardsByUserId
};
