import { sequelize } from './database.state';
import {
  User,
  Role,
  Friend,
  // Album,
  Photo,
  Post,
  Message,
  Chat,
  // User_to_Chat,
  Profile,
  Token,
} from './models/index';

User.hasOne(Role);
Role.belongsTo(User);

User.hasOne(Profile);
Profile.belongsTo(User, {
  onDelete: 'cascade',
});

User.hasOne(Token);
Token.belongsTo(User, {
  onDelete: 'cascade',
});

Friend.belongsTo(User, {
  onDelete: 'cascade',
});

// User.hasMany(Album);
// Album.belongsTo(User, {
//   onDelete: 'cascade',
// });
// Album.hasMany(Photo);
Photo.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User, {
  onDelete: 'cascade',
});

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
