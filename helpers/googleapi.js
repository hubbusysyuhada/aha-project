const { google } = require("googleapis");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const path = require("path");
const fs = require("fs");
const { zip } = require("zip-a-folder");
const { nanoid } = require("nanoid");

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function uploadFileToGoogleDrive(filename, file) {
  try {
    if (file.length > 1) {
      const zipPath = path.join(__dirname, "output.zip");
      await zip(path.join(__dirname, `files`), zipPath);
      const response = await drive.files.create({
        requestBody: {
          name: nanoid(5) + filename,
          mimeType: "application/zip",
        },
        media: {
          mimeType: "application/zip",
          body: fs.createReadStream(zipPath),
        },
      });
      file.forEach((blob) => {
        fs.unlinkSync(blob.path);
      });
      fs.unlinkSync(zipPath);
      return response.data;
    } else {
      const filepath = path.join(__dirname, `/files/${file[0].filename}`);
      const response = await drive.files.create({
        requestBody: {
          name: nanoid(5) + filename,
          mimeType: file[0].mimetype,
        },
        media: {
          mimeType: file[0].mimetype,
          body: fs.createReadStream(filepath),
        },
      });
      fs.unlinkSync(filepath);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteFile(fileId) {
  try {
    return await drive.files.delete({
      fileId,
    });
  } catch (error) {
    console.error(error);
  }
}

async function generatePublicUrl(fileId) {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    return await drive.files.get({
      fileId,
      fields: "webContentLink, webViewLink",
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  uploadFileToGoogleDrive,
  deleteFile,
  generatePublicUrl,
};
