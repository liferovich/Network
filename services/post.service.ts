import { sequelize } from '../database/database.state';

class PostService {
  async getPosts() {
    const posts = await sequelize.model('Post').findAll({
        order: [
            ['date', 'DESC'],
        ]
    });

    if (!posts) {
      throw new Error('Crashed getting posts');
    }

    return posts;
  }

  async addPost(id: number, text: string) {
    const post = await sequelize.model('Post').create({
        text: text,
        UserId: id
    });

    if (!post) {
      throw new Error('Crashed adding post');
    }

    return post;
  }

  async editPost(id: number, text: string) {
    const updatedPost = await sequelize.model('Post').update({
        text
    }, {
      where: {
        id,
      },
      returning: true,
    });

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
}

export default new PostService();
