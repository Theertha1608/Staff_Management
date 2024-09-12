const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Education = require("../models/userEducation");

exports.postEducationDeatils =
  ("/EducationDetails",
  async (req, res, next) => {
    const { user_id, education1, education2, college_name } = req.body;

    try {
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        return res.status(422).json({ error: "User not exists" });
      }
      let userEducationData = await Education.findOne({ user: user_id });

      if (userEducationData) {
        userEducationData.education1 = education1;
        userEducationData.education2 = education2;
        userEducationData.user_college = college_name;
      } else {
        userEducationData = new Education({
          user: user_id,
          education1,
          education2,
          user_college: college_name,
        });
      }

      await userEducationData.save();
      return res
        .status(200)
        .json({
          message: "education deatils created successfully",
          userEdcuationData,
        });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  });

exports.postExperienceDeatils =
  ("/post-experience-detials",
  async (req, res, next) => {
    const { user_id, exp1, exp2, exp_compn1, exp_compn2 } = req.body;

    try {
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        return res.status(422).json({ error: "User not exists" });
      }
      const usereducation = await Education.findOne({ user: user_id });

      if (usereducation) {
        (usereducation.exp1 = exp1),
          (usereducation.exp2 = exp2),
          (usereducation.exp_compn1 = exp_compn1),
          (usereducation.exp_compn2 = exp_compn2);
      } else {
        usereducation = new Education({
          user: user_id,
          exp1,
          exp2,
          exp_compn1,
          exp_compn2,
        });
      }
      await usereducation.save();
      return res
        .status(200)
        .json({
          message: "expereince details created successfully",
          userEdcuationData,
        });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  });
