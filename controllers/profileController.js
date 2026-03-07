const { Profile, Student } = require("../models");
const commonValidation = require("../validation/commonValidation");
const studentValidation = require("../validation/studentValidation");

exports.UpdateProfile = async function (request, response) {
  try {
    // Validate ID param
    const { error: idError } = commonValidation.idParamsSchema.validate(
      request.params,
    );
    if (idError) {
      return response.status(400).json({ message: idError.message });
    }

    // Validate body
    const { error, value } = studentValidation.updateProfileSchema.validate(
      request.body,
      { abortEarly: false },
    );
    if (error) {
      return response
        .status(400)
        .json({ message: error.details.map((err) => err.message) });
    }

    const profile = await Profile.findOne({
      where: { studentId: request.params.id },
      include: [{ model: Student, attributes: ["id", "email"] }],
    });

    if (!profile) {
      return response.status(404).json({ message: "Profile not found" });
    }

    await profile.update(value.profile);

    return response.json({
      message: "Profile updated successfully",
      data: { profile },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
