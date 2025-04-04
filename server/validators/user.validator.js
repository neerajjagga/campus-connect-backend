import Joi from "joi";

export const adminValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .trim()
        .required()
        .messages({
            "string.min": "Name should be a minimum of length 3",
            "any.required": "Name is required"
        }),

    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            "string.email": "Invalid email format",
            "any.required": "Email is required"
        }),

    password: Joi.string()
        .min(6)
        .trim()
        .required()
        .messages({
            "string.min": "Password should be a minimum of length 6",
            "any.required": "Password is required"
        }),

    department: Joi.string()
        .valid("CEC", "CCT", "CCE", "CCP", "CBSA", "CCH", "CCHM")
        .required()
        .messages({
            "any.only": "Department must be one of CEC, CCT, CCE, CCP, CBSA, CCH, CCHM",
            "any.required": "Department is required"
        }),

    role: Joi.string()
        .valid("student", "admin")
        .trim()
        .default("student")
        .messages({
            "any.only": "Role must be one of student, admin",
        }),

    profileImageUrl: Joi.string()
        .uri()
        .trim()
        .allow("")
        .messages({
            "string.uri": "Profile Image URL must be a valid URI"
        }),
});



