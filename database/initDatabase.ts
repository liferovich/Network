import { sequelize } from './database.state';
import {
  User,
  Role,
  Friend,
  Album,
  Photo,
  Post,
  Message,
  Chat,
  User_to_Chat,
  Profile,
  Token,
} from './models/index';

User.hasOne(Role);
Role.belongsTo(User);

User.hasOne(Profile);
Profile.belongsTo(User, {
  onDelete: 'CASCADE',
});

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Friend);
Friend.belongsTo(User);

User.hasMany(Album);
Album.belongsTo(User);
Album.hasMany(Photo);
Photo.belongsTo(Album);

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Chat, { through: User_to_Chat });
Chat.belongsToMany(User, { through: User_to_Chat });
Chat.hasMany(Message);
Message.belongsTo(Chat);

export const initDatabase = async () => {
  try {
    await sequelize.sync();

    console.log('Postgres connected');
  } catch (e) {
    console.log('Failed to connect' + (e as Error).message);
    process.exit(1);
  }
};
