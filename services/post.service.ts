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
      throw { status: 500, message: 'Crashed editing post' };
    }

    return updatedPost;
  }

  async getLikes(id: number) {
    const likes = await sequelize.model('Post').findOne({
      where: {
        id,
      },
      attributes: ['likes'],
      raw: true,
      nest: true,
    });

    if (!likes) {
      throw { status: 500, message: 'Crashed getting likes' };
    }

    return likes;
  }

  async addLike(likes: number[], id: number) {
    const updatedPost = await sequelize.model('Post').update(
      {
        likes: likes,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    if (!updatedPost) {
      throw { status: 500, message: 'Crashed editing likes' };
    }

    return updatedPost;
  }

  async addComment(comment: string, id: number) {
    const updatedPost = await sequelize.model('Post').update(
      {
        comments: sequelize.fn(
          'array_append',
          sequelize.col('comments'),
          comment
        ),
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    if (!updatedPost) {
      throw { status: 500, message: 'Crashed editing likes' };
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
      throw { status: 500, message: 'Crashed deleting post' };
    }

    return post;
  }

  async getProfiles(ids: [{ UserId: number }]) {
    const users: number[] = ids.map((item) => item.UserId);

    const profiles = await sequelize.model('Profile').findAll({
      attributes: ['id', 'avatar', 'firstname', 'lastname', 'UserId'],
      where: {
        UserId: users,
      },
    });

    if (!profiles) {
      throw { status: 500, message: 'Crashed getting profiles' };
    }

    return profiles;
  }
}

export default new PostService();
