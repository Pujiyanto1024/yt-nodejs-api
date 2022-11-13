import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helpers from "../../helpers/Helper";
import User from "../../db/models/User";

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, password, confirmPassword } = req.body;

		const data = {
			name,
			email,
			password,
			confirmPassword
		};

		const rules: Validator.Rules = {
			"name": "required|string|max:50",
			"email": "required|email",
			"password": "required|min:8",
			"confirmPassword": "required|same:password"
		};

		const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res.status(400).send(Helpers.ResponseData(400, "Bad Request", validate.errors, null));
		}

		const user = await User.findOne({
			where: {
				email: data.email
			}
		});

		if (user) {
			const errorData = {
				errors: {
					email: [
						"Email already used"
					]
				}
			};
			return res.status(400).send(Helpers.ResponseData(400, "BadRequest", errorData, null))
		}
		next();
	} catch (error:any) {
		return res.status(500).send(Helpers.ResponseData(500, "", error, null));
	}
	
};

export default { RegisterValidation };