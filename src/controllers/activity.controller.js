const Activity = require("../models/activity.model");

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find().populate("skills");
    res.send({
      success: true,
      activities: activities,
    });
  } catch (err) {
    next(err);
  }
};

exports.createActivity = async (req, res, next) => {
  const newActivity = new Activity({
    name: req.body.name,
    skills: req.body.skills,
  });

  try {
    const activityToSave = await newActivity.save();
    res.send({
      success: true,
      message: "activity successfully create",
      activity: activityToSave,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    const activityToUpdate = await Activity.findById(req.params.id);
    if (!activityToUpdate) {
      const error = new Error("activity not found");
      error.status = 404;
      throw error;
    }
    if (req.body.skill && !activityToUpdate.skills.includes(req.body.skill)) {
      activityToUpdate.skills.push(req.body.skill);
    } else {
      const error = new Error("skill is already attached to this activity");
      error.status = 401;
      throw error;
    }

    if (req.body.name) activityToUpdate.name = req.body.name;
    const activitiSaved = await activityToUpdate.save();
    res.send({
      success: true,
      message: "activity successfully updated",
      skill: activitiSaved,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeActivity = async (req, res, next) => {
  try {
    const activityToDelete = await Activity.findByIdAndRemove(req.params.id);

    if (!activityToDelete) {
      const error = new Error("activity not found");
      error.status = 404;
      throw error;
    }

    res.send({
      success: true,
      message: "activity successfully delete",
      activity: activityToDelete,
    });
  } catch (err) {
    next(err);
  }
};
