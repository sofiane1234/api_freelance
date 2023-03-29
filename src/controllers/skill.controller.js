const Skill = require("../models/skill.model");

exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().populate("activity");
    res.send({
      success: true,
      skills: skills,
    });
  } catch (err) {
    next(err);
  }
};

exports.createSkill = async (req, res, next) => {
  const newSkill = new Skill({
    name: req.body.name,
    activity: req.body.activity,
  });

  try {
    const skillToSave = await newSkill.save();
    res.send({
      success: true,
      message: "skill successfully create",
      skill: skillToSave,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skillToUpdate = Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!skillToUpdate) {
      const error = new Error("skill not found");
      error.status = 404;
      throw error;
    }
    res.send({
      success: true,
      message: "skill successfully updated",
      skill: skillToUpdate,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeSkill = async (req, res, next) => {
  try {
    const skillToDelete = await Skill.findByIdAndRemove(req.params.id);
    if (!skillToDelete) {
      const error = new Error("skill not found");
      error.status = 404;
      throw error;
    }
    res.send({
      success: true,
      message: "skill successfully delete",
      skill: skillToDelete,
    });
  } catch (err) {
    next(err);
  }
};
