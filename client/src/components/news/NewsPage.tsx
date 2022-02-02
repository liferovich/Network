import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../../features/ProfileSlice';
import { id } from '../../features/AuthSlice';
import {
  getPosts,
  addPost,
  editPost,
  deletePost,
  addLike,
  posts,
  profiles,
  addComment,
} from '../../features/PostSlice';
import { PostResponse } from '../../models/response/PostResponse';
import './NewsPage.css';

const NewsPage: FC = () => {
  const [text, setText] = useState('');
  const [editedPost, setEditedPost] = useState(0);
  const userProfile = useSelector(profile);
  const dispatch = useDispatch();
  const userId = useSelector(id);
  const allPosts = useSelector(posts);
  const usersProfiles = useSelector(profiles);
  const [comment, setComment] = useState('');

  const addNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addPost({ userId, text }));
    setText('');
  };

  const editHandle = (postId: number, postText: string) => {
    setText(postText);
    setEditedPost(postId);
  };

  const editUserPost = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editPost({ id: editedPost, text }));
    setText('');
    setEditedPost(0);
  };

  const deleteUserPost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  const cancelPost = () => {
    setText('');
    setEditedPost(0);
  };

  const addUserLike = (id: number, userId: number) => {
    dispatch(addLike({ id, userId }));
  };

  const addUserComment = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (comment) {
      dispatch(addComment({ id, comment }));
      setComment('');
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className='user row news-page'>
      <div className='user-left col m4 s12'>
        <div className='user-left-inner'>
          <div className='user-main-info'>
            <div className='user-image'>
              <div className='user-status'>
                <img src='img/vacations.png' alt='status' />
              </div>
              <img
                className='main-img'
                src={
                  userProfile.avatar ? userProfile.avatar : 'img/no_user.png'
                }
                id='user-image'
                alt='user'
              />
            </div>
            <p className='sex'>
              <span id='sex'>{userProfile.sex === 'male' ? 'Mr' : 'Ms'}</span>
            </p>
            <h4 className='name'>
              <span id='first_name'>{userProfile.firstname}</span>{' '}
              <span id='last_name'>{userProfile.lastname}</span>
            </h4>
          </div>
        </div>
      </div>
      <div className='user-right col m8 s12'>
        <div className='news'>
          <h4>Posts</h4>
          <p>Welcome to the community!</p>
          <br />
          <form
            className='post-form'
            onSubmit={editedPost ? editUserPost : addNewPost}
          >
            <div className='row'>
              <div className='col s12 post-field'>
                <textarea
                  id='icon_prefix2'
                  className='materialize-textarea'
                  placeholder='Input some text'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                {editedPost ? (
                  <button
                    className='btn waves-effect waves btn-post'
                    onClick={editUserPost}
                  >
                    Change
                  </button>
                ) : (
                  <button
                    className='btn waves-effect waves btn-post'
                    onClick={addNewPost}
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </form>
          <br />
          <div className='posts'>
            {allPosts?.map((post: PostResponse) => {
              return (
                <div className='post' key={post.id}>
                  {post.UserId === userId && (
                    <div className='edit-post'>
                      {(editedPost === post.id && (
                        <button
                          className='btn-cancel-post'
                          onClick={cancelPost}
                        >
                          <i className='material-icons'>cancel</i> Cancel
                        </button>
                      )) || (
                        <button
                          className='btn-edit-post'
                          onClick={(e) => editHandle(post.id, post.text)}
                        >
                          <i className='material-icons'>edit</i> Edit
                        </button>
                      )}
                      <button
                        className='btn-edit-post'
                        onClick={(e) => deleteUserPost(post.id)}
                      >
                        <i className='material-icons'>delete</i> Delete
                      </button>
                    </div>
                  )}
                  <div className='row'>
                    <div className='col s12 m3'>
                      <div className='post-user'>
                        <div className='user-status'>
                          <img src='img/vacations.png' alt='status' />
                        </div>
                        <img
                          className='user-img'
                          src={
                            usersProfiles?.filter(
                              (profile: { UserId: number }) =>
                                profile.UserId === post.UserId
                            )[0].avatar
                              ? usersProfiles.filter(
                                  (profile: { UserId: number }) =>
                                    profile.UserId === post.UserId
                                )[0].avatar
                              : 'img/no_user.png'
                          }
                          id='user-image'
                          alt='user'
                        />
                        <h4 className='name'>
                          <span id='first_name'>
                            {
                              usersProfiles?.filter(
                                (profile: { UserId: number }) =>
                                  profile.UserId === post.UserId
                              )[0].firstname
                            }
                          </span>{' '}
                          <span id='last_name'>
                            {
                              usersProfiles?.filter(
                                (profile: { UserId: number }) =>
                                  profile.UserId === post.UserId
                              )[0].lastname
                            }
                          </span>
                        </h4>
                      </div>
                    </div>
                    <div className='col s12 m9'>
                      <div className='post-inner'>
                        <p>{post.text}</p>
                        <p className='time'>
                          Posted on {String(post.date).slice(0, 10)}
                        </p>
                        <div className='likes-block'>
                          <p>Likes: {post?.likes?.length}</p>
                          <p
                            className={`likes ${
                              post?.likes?.includes(userId) && 'active'
                            }`}
                            onClick={() => addUserLike(post.id, userId)}
                          >
                            <i className='material-icons'>
                              {post?.likes?.includes(userId)
                                ? 'favorite'
                                : 'favorite_border'}
                            </i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col m3'></div>
                    <div className='col m9'>
                      <div className='comments'>
                        <p className='comment-title'>Comments</p>
                        {post?.comments?.map((comment: string) => (
                          <div className='comment'>{comment}</div>
                        ))}
                        <div className='block-addcomment'>
                          <form
                            className='comment-form'
                            onSubmit={(e) => addUserComment(e, post.id)}
                          >
                            <div className='row'>
                              <div className='col s12 post-field'>
                                <textarea
                                  id='icon_prefix2'
                                  className='materialize-textarea'
                                  placeholder='Input comment'
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                <button
                                  className='btn waves-effect waves btn-post'
                                  onClick={(e) => addUserComment(e, post.id)}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
