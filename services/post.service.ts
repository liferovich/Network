import { sequelize } from '../database/database.state';

class PostService {
  async getPosts() {
    const posts = await sequelize.model('Post').findAll({
      raw: true,
      nest: true,
      order: [['date', 'DESC']],
    });

    if (!posts) {
      throw new Error('Crashed getting posts');
    }

    const usersIds = await sequelize.model('Post').findAll({
      attributes: ['UserId'],
      raw: true,
      nest: true,
      order: [['date', 'DESC']],
    });

    return { posts, usersIds };
  }

  async addPost(id: number, text: string) {
    const post = await sequelize.model('Post').create({
      text: text,
      UserId: id,
    });

    if (!post) {
      throw new Error('Crashed adding post');
    }

    return post;
  }

  async editPost(id: number, text: string) {
    const updatedPost = await sequelize.model('Post').update(
      {
        text,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    if (!updatedPost) {
      throw new Error('Crashed editing post');
    }

    return updatedPost;
  }

  async deletePost(id: number) {
    const post = await sequelize.model('Post').destroy({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error('Crashed deleting post');
    }

    return post;
  }

  async getProfiles(ids: [{ UserId: number }]) {
    let users: number[] = [];
    ids.forEach((item) => {
      users.push(item.UserId);
    });

    const profiles = await sequelize.model('Profile').findAll({
      attributes: ['id', 'avatar', 'firstname', 'lastname', 'UserId'],
      where: {
        UserId: users,
      },
    });

    if (!profiles) {
      throw new Error('Crashed getting profiles');
    }

    return profiles;
  }
}

export default new PostService();
