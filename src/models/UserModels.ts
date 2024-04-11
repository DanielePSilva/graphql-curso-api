import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync} from 'bcryptjs';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';


export interface UseAttributes {

    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createAt?:  string;
    updatedAt?: string;

}

export interface UseInstance extends Sequelize.Instance<UseAttributes>, UseAttributes {
    isPassword(encodePassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UseInstance, UseAttributes> {}

export default (Sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {

    const User: UserModel = Sequelize.define('User', {
     id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true
     },
     name: {
           type: DataTypes.STRING(128),
            allowNull: false

     },
     email:{
           type: DataTypes.STRING(128),
           allowNull: false,
           unique: true
 
     },
     password:{
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            noEmpty: true
        }
     },
     photo: {
        type: DataTypes.BLOB({
             length: 'long'
        }),
        allowNull: true,
     },


    },{
        tableName: 'users',
        hooks: {
            beforeCreate: (user: UseInstance, options: Sequelize.BulkCreateOptions): void => {
                const salt = genSaltSync();
                user.password = hashSync(user.password, salt);
            }
        }
    
    });

    User.associate = (models: ModelsInterface): void =>  {}; 

 User.prototype.isPassword = (encodePassword: string, password: string): boolean => {
    return compareSync(password, encodePassword);
 }

    return User;
}
