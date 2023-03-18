//
//
//
//---------------------------------------------|
//          check if user owner of task
//---------------------------------------------|

const isTaskOwner = async (req, Model) => {
  const task = await Model.findOne({ _id: req.params.taskId }).populate(
    "user",
    "_id"
  );
  return req.user.id === task.user.id;
};

module.exports = isTaskOwner;
