import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

export interface CommentAtributes {
    id?: number;
    commennt?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export  interface CommentInstance extends Sequelize.Instance<CommentAtributes> {}

export interface CommentModel extends BaseModelInterface, Sequelize.Model<CommentInstance, CommentAtributes> {}

export default (Sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CommentModel => {

    const Comment: CommentModel = Sequelize.define('comments', {
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

    Comment.associate = (models: ModelsInterface): void => {
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