import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helpers from "../../helpers/Helper";
import MasterMenu from "../../db/models/MasterMenu";

const CreateMenuValidation = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, icon, ordering } = req.body;
		const data = {
			name, icon, ordering
		};

		const rules: Validator.Rules = {
			"name": "required|string|max:50",
			"icon": "required|string",
			"oradering": "required|number",
		};

		const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res.status(400).send(Helpers.ResponseData(400, "Bad Request", validate.errors, null));
		}

		next();
	} catch (error: any) {
		return res.status(500).send(Helpers.ResponseData(500, "", error, null));
	}
};

const CreateSubmenuValidation = async(req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, masterMenuId, url, title, icon, ordering, isTargetSelf } = req.body;
		const data = {
			name, masterMenuId, url, title, icon, ordering, isTargetSelf
		};

		const rules: Validator.Rules = {
			"name": "required|string|max:50",
			"masterMenuId": "required|number",
			"url": "required|string",
			"title": "required|string|max:50",
			"icon": "required|string",
			"oradering": "required|number",
			"isTargetSelf": "required|boolean"
		};

		const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res.status(400).send(Helpers.ResponseData(400, "Bad Request", validate.errors, null));
		}

		const menu = await MasterMenu.findOne({
			where: {
				id: masterMenuId,
				active: true
			}
		});

		if (!menu) {
			const errorData = {
				errors: {
					masterMenuId: [
						"Master menu not found"
					]
				}
			};
			return res.status(400).send(Helpers.ResponseData(400, "Bad Request", errorData, null));
		}

		next();
	} catch (error:any) {
		return res.status(500).send(Helpers.ResponseData(500, "", error, null));
	}
}

export default { CreateMenuValidation, CreateSubmenuValidation }