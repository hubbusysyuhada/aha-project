const { Task } = require("../models");
const {
  uploadFileToGoogleDrive,
  generatePublicUrl,
  deleteFile,
} = require("../helpers/googleapi");

class TaskController {
  static async getAllTask(req, res, next) {
    const { id } = req.loggedUser;
    const tasks = await Task.findAll({
      where: { AccountId: id },
      attributes: [
        "id",
        "tanggal",
        "kinerja",
        "keterangan",
        "status",
        "input",
        "hasil",
        "deadline",
      ],
      sort: [["tanggal", "DESC"]],
    });
    if (tasks.length > 0) return res.status(200).json(tasks);
    return next({
      name: "custom error",
      code: 500,
      message: "Internal server error",
    });
  }

  static async getTask(req, res, next) {
    const { taskId } = req.params;
    const tasks = await Task.findByPk(taskId, {
      attributes: [
        "id",
        "tanggal",
        "kinerja",
        "keterangan",
        "status",
        "input",
        "hasil",
      ],
    });
    if (tasks) return res.status(200).json(tasks);
    return next({
      name: "custom error",
      code: 404,
      message: "Task not found",
    });
  }

  static async newTask(req, res, next) {
    const { id } = req.loggedUser;
    const { tanggal, kinerja, keterangan, deadline } = req.body;

    if (!tanggal || !kinerja)
      return next({
        name: "custom error",
        code: 400,
        message: "Field tanggal & kinerja are required",
      });

    const answer = {
      tanggal: new Date(tanggal),
      deadline: new Date(deadline),
      kinerja,
      keterangan,
      AccountId: id,
    };
    const newTask = await Task.create(answer);
    if (newTask) return res.status(201).json(newTask);

    return next({
      name: "custom error",
      code: 500,
      message: "Internal server error",
    });
  }

  static async deleteTask(req, res, next) {
    const { taskId } = req.params;
    const task = await Task.destroy({
      where: {
        id: taskId,
      },
    });
    if (task) return res.status(200).json({ status: "ok" });
    return next({
      name: "custom error",
      code: 404,
      message: "Task not found",
    });
  }

  static async editTask(req, res, next) {
    const { taskId } = req.params;
    const { tanggal, kinerja, keterangan, deadline } = req.body;
    const answer = {
      tanggal,
      deadline,
      kinerja,
      keterangan,
    };
    const [, [task]] = await Task.update(answer, {
      where: {
        id: taskId,
      },
      returning: true,
    });
    if (task) return res.status(200).json({ status: "ok" });
    return next({
      name: "custom error",
      code: 404,
      message: "Task not found",
    });
  }

  static async updateTask(req, res, next) {
    const { taskId } = req.params;
    const { status } = req.body;
    const [, [task]] = await Task.update(
      { status },
      {
        where: {
          id: taskId,
        },
        returning: true,
      }
    );
    if (task) return res.status(200).json({ status: "ok" });
    return next({
      name: "custom error",
      code: 404,
      message: "Task not found",
    });
  }

  static async uploadInput(req, res, next) {
    const { taskId } = req.params;
    const file = await Task.findByPk(taskId);
    if (file.input) await deleteFile(file.input.fileId);
    const fileName =
      req.files.length > 1
        ? `${new Date().toLocaleDateString().split("/").join("")}-${
            req.loggedUser.email.split("@")[0]
          }rar`
        : `${new Date().toLocaleDateString().split("/").join("")}-${
            req.files[0].originalname
          }`;
    const { id: fileId } = await uploadFileToGoogleDrive(fileName, req.files);
    const url = await generatePublicUrl(fileId);
    const input = {
      fileId,
      download: url.data.webViewLink,
    };
    await Task.update(
      { input: JSON.stringify(input) },
      { where: { id: taskId } }
    );
    return res.status(200).json(input);
  }

  static async deleteInput(req, res, next) {
    const { taskId } = req.params;
    const file = await Task.findByPk(taskId);
    await deleteFile(file.input.fileId);
    await Task.update({ input: null }, { where: { id: taskId } });
    return res.status(200).json({ status: "ok" });
  }

  static async changeInputFile(req, res, next) {
    const { taskId } = req.params;
    const file = await Task.findByPk(taskId);
    await deleteFile(file.input.fileId);
    const fileName =
      req.files.length > 1
        ? `${new Date().toLocaleDateString().split("/").join("")}-${
            req.loggedUser.email.split("@")[0]
          }rar`
        : `${new Date().toLocaleDateString().split("/").join("")}-${
            req.files[0].originalname
          }`;
    const { id: fileId } = await uploadFileToGoogleDrive(fileName, req.files);
    const url = await generatePublicUrl(fileId);
    const response = {
      fileId,
      download: url.data.webViewLink,
    };
    await Task.update(
      { input: JSON.stringify(response) },
      { where: { id: taskId } }
    );
    return res.status(200).json({ status: "ok", response });
  }

  static async uploadHasil(req, res, next) {
    const { taskId } = req.params;
    const fileName =
      req.files.length > 1
        ? `${new Date().toLocaleDateString().split("/").join("")}-${
            req.loggedUser.email.split("@")[0]
          }rar`
        : `${new Date().toLocaleDateString().split("/").join("")}-${
            req.files[0].originalname
          }`;
    const { id: fileId } = await uploadFileToGoogleDrive(fileName, req.files);
    const url = await generatePublicUrl(fileId);
    const response = {
      fileId,
      download: url.data.webViewLink,
    };
    await Task.update(
      { hasil: JSON.stringify(response) },
      { where: { id: taskId } }
    );
    return res.status(200).json(response);
  }

  static async deleteHasil(req, res, next) {
    const { taskId } = req.params;
    const file = await Task.findByPk(taskId);
    await deleteFile(file.hasil.fileId);
    await Task.update({ hasil: null }, { where: { id: taskId } });
    return res.status(200).json({ status: "ok" });
  }

  static async changeHasilFile(req, res, next) {
    const { taskId } = req.params;
    const file = await Task.findByPk(taskId);
    await deleteFile(file.hasil.fileId);
    const fileName =
      req.files.length > 1
        ? `${new Date().toLocaleDateString().split("/").join("")}-${
            req.loggedUser.email.split("@")[0]
          }rar`
        : `${new Date().toLocaleDateString().split("/").join("")}-${
            req.files[0].originalname
          }`;
    const { id: fileId } = await uploadFileToGoogleDrive(fileName, req.files);
    const url = await generatePublicUrl(fileId);
    const response = {
      fileId,
      download: url.data.webViewLink,
    };
    await Task.update(
      { hasil: JSON.stringify(response) },
      { where: { id: taskId } }
    );
    return res.status(200).json({ status: "ok", response });
  }
}

module.exports = TaskController;
