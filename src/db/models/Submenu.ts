import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface SubmenuAttributes {
	id?: number,
	name?: string | null,
	masterMenuId?: number | null,
	url?: string | null,
	title?: string | null,
	icon?: string | null,
	ordering?: number | null,
	isTargetSelf?: boolean | null,
	active?: boolean | null,

	createdAt?: Date,
	updatedAt? : Date
}

export interface SubmenuInput extends Optional<SubmenuAttributes, 'id'>{ }
export interface SubmenuOutput extends Required<SubmenuAttributes>{ }

class Submenu extends Model<SubmenuAttributes, SubmenuInput> implements SubmenuAttributes {
	public id!: number;
  	public name!: string;
	public masterMenuId!: number;
	public url!: string;
	public title!: string;
	public icon!: string;
	public ordering!: number;
	public isTargetSelf!: boolean;
	public active!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt! : Date;
}

Submenu.init({
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.BIGINT
	},
	name: {
		allowNull: true,
		type: DataTypes.STRING
	},
	masterMenuId: {
		allowNull: true,
		type: DataTypes.BIGINT
	},
	url: {
		allowNull: true,
		type: DataTypes.TEXT
	},
	title: {
		allowNull: true,
		type: DataTypes.STRING
	},
	icon: {
		allowNull: true,
		type: DataTypes.TEXT
	},
	ordering: {
		allowNull: true,
		type: DataTypes.INTEGER
	},
	isTargetSelf: {
		allowNull: true,
		type: DataTypes.BOOLEAN
	},
	active: {
		allowNull: true,
		type: DataTypes.BOOLEAN
	}
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default Submenu;