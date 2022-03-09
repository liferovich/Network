import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { photos, addPhoto, getPhotos } from '../../features/GallerySlice';
import { id } from '../../features/AuthSlice';
import { PhotoResponse } from '../../models/response/GalleryResponse';
import './Media.css';

const Media = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<FileList | null>();
  const [src, setSrc] = useState('');
  const userPhotos = useSelector(photos);
  const userId = useSelector(id);

  const sendPictures = (e: FormEvent) => {
    e.preventDefault();
    if (files) {
      const data = new FormData();
      data.append('avatar', files[0]);

      dispatch(addPhoto({ data, id: userId }));
    }
  };

  useEffect(() => {
    dispatch(getPhotos(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <form className='mediaForm' encType='multipart/form-data' onSubmit={sendPictures}>
        <div className='form-group'>
          {/* <label htmlFor='picture'>Upload picture</label> */}
          <input
            type='file'
            name='avatar'
            id='avatar'
            className='form-control'
            placeholder=''
            required
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <div className='form-group'>
          <button
            type='submit'
            className='btn btn-upload'
            onClick={sendPictures}
          >
            Upload
          </button>
        </div>
      </form>
      <div className='photos'>
        <div className='row'>
          {userPhotos?.map((photo: PhotoResponse['photo']) => {
            return (
              <div className='col s12 m4 l3' key={photo.id}>
                <div className='photo_item'>
                  <img
                    src={`http://localhost:5000/api/media/photo/${photo.name}`}
                    alt={photo.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Media;
