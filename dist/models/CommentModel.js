"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (Sequelize, DataTypes) => {
    const Comment = Sequelize.define('comments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'comments'
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'post'
            }
        });
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    };
    return Comment;
};
