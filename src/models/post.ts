import Sequelize, {
  CreationOptional, Model, ForeignKey,
} from 'sequelize';
import User from './user';

class Post extends Model {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User['id']>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Post.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate() {
    Post.belongsTo(User);
  }
}

export default Post;
