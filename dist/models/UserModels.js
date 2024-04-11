"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
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
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
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
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: (user, options) => {
                const salt = bcryptjs_1.genSaltSync();
                user.password = bcryptjs_1.hashSync(user.password, salt);
            }
        }
    });
    User.associate = (models) => { };
    User.prototype.isPassword = (encodePassword, password) => {
        return bcryptjs_1.compareSync(password, encodePassword);
    };
    return User;
};
