import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import Role from "./Role";
import Submenu from "./Submenu";

interface RoleMenuAccessAttributes {
  id?: number,
  roleId?: number | null,
  submenuId?: number | null,
  active?: boolean | null,

  createdAt?: Date,
  updatedAt? : Date
}

export interface RoleMenuAccessInput extends Optional<RoleMenuAccessAttributes, 'id'>{ }
export interface RoleMenuAccessOutput extends Required<RoleMenuAccessAttributes>{ }

class RoleMenuAccess extends Model<RoleMenuAccessAttributes, RoleMenuAccessInput> implements RoleMenuAccessAttributes {
  public id!: number;
  public roleId!: number;
  public submenuId!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

RoleMenuAccess.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  roleId: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  submenuId: {
    allowNull: true,
    type: DataTypes.BIGINT
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

RoleMenuAccess.belongsTo(Submenu, {
  foreignKey: 'submenuId'
});
RoleMenuAccess.belongsTo(Role, {
  foreignKey: 'roleId'
});

export default RoleMenuAccess;