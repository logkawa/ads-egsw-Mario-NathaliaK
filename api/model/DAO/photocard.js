// model/DAO/photocard.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Insert Photocard
const insertPhotocard = async (data) => {
  try {
    const sql = `
      INSERT INTO photocard (usuario_id, categoria, image_url, public_id)
      VALUES (${data.usuario_id}, '${data.categoria}', '${data.image_url}', '${data.public_id}');
    `;
    return await prisma.$executeRawUnsafe(sql);
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Get photocards by user ID
const selectPhotocardsByUserId = async (userId) => {
  try {
    const sql = `SELECT * FROM photocard WHERE usuario_id = ${userId}`;
    return await prisma.$queryRawUnsafe(sql);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  insertPhotocard,
  selectPhotocardsByUserId
};
