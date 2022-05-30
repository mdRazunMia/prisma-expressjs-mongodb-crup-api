const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTask = async (req, res) => {
  const task = await prisma.tasks.create({ data: req.body });
  if (!task) {
    res.status(500).send({
      errorMessage: "Some thing went wrong. Task has not been created.",
    });
  } else {
    res.status(201).send({ message: "Task has been created successfully." });
  }
};

const getAllTask = async (req, res) => {
  const tasks = await prisma.tasks.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });
  if (!tasks) {
    res.status(404).send({
      errorMessage: "There is no task.",
    });
  } else {
    res.status(201).send(tasks);
  }
};

const getSingleTask = async (req, res) => {
  const id = req.params.id;
  const task = await prisma.tasks.findMany({
    where: { id: id },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });
  if (!task) {
    res.status(404).send({
      errorMessage: "There is no task.",
    });
  } else {
    res.status(201).send(task);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const updatedPost = await prisma.tasks.update({
    where: { id: id },
    data: {
      title: req.body.title,
      description: req.body.description,
    },
  });
  if (!updatedPost) {
    res.status(400).send({
      errorMessage: "Task is not updated.",
    });
  } else {
    res.status(201).send({ message: "Task has been updated successfully." });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const deletedTask = await prisma.tasks.delete({ where: { id: id } });
  if (!deletedTask) {
    res.status(400).send({
      errorMessage: "Task is not deleted.",
    });
  } else {
    res.status(201).send({ message: "Task has been deleted successfully." });
  }
};

module.exports = {
  createTask,
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
