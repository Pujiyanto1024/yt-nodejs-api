import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helpers from "../../helpers/Helper";
import MasterMenu from "../../db/models/MasterMenu";
import Submenu from "../../db/models/Submenu";
import Role from "../../db/models/Role";

const CreateMenuValidation = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, icon, ordering } = req.body;
		const data = {
			name, icon, ordering
		};

		const rules: Validator.Rules = {
			"name": "required|string|max:50",
			"icon": "required|string",
			"ordering": "required|numeric",
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
			"masterMenuId": "required|numeric",
			"url": "required|string",
			"title": "required|string|max:50",
			"icon": "required|string",
			"ordering": "required|numeric",
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

const CreateRoleMenuAccess = async(req: Request, res: Response, next: NextFunction) => {
	try {
		const { roleId, submenuId } = req.body;
		const data = {
			roleId, submenuId
		};

		const rules: Validator.Rules = {
			"roleId": "required|numeric",
			"submenuId": "required|numeric",
		};

		const validate = new Validator(data, rules);

		if (validate.fails()) {
			return res.status(400).send(Helpers.ResponseData(400, "Bad Request", validate.errors, null));
		}

		const role = await Role.findOne({
			where: {
				id: roleId,
				active: true
			}
		});
		if (!role) {
			const errorData = {
				errors: {
					roleId: [
						"Role not found"
					]
				}
			};
			return res.status(400).send(Helpers.ResponseData(400, "Bad Request", errorData, null));
		}

		const submenu = await Submenu.findOne({
			where: {
				id: submenuId,
				active: true
			}
		});

		if (!submenu) {
			const errorData = {
				errors: {
					submenuId: [
						"Submenu not found"
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

export default { CreateMenuValidation, CreateSubmenuValidation, CreateRoleMenuAccess }