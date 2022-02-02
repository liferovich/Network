// import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { photos, addPhoto } from '../../features/GallerySlice';

// type PhotoType = {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   destination: string;
//   filename: string;
//   path: string;
//   size: number;
// };

const Media = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState<FileList | null>();
  const [src, setSrc] = useState('');
  const userPhotos = useSelector(photos);

  const sendPictures = (e: FormEvent) => {
    e.preventDefault();
    if (files) {
      const data = new FormData();
      data.append('avatar', files[0]);

      dispatch(addPhoto(data));

      // axios.post('http://localhost:5000/api/media/', data).then((res) => {
      //   setFiles(null);
      //   setSrc(URL.createObjectURL(res.data.files.avatar[0]));
      // });
    }
  };

  return (
    <div>
      <form encType='multipart/form-data' onSubmit={sendPictures}>
        <div className='form-group'>
          <label htmlFor='picture'>Upload picture</label>
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
        {/* {userPhotos &&
          userPhotos[1] &&
          userPhotos?.map((photo: Blob | MediaSource) => {
            if (photo) {
              return ( */}
                {/* {userPhotos && userPhotos[1] && (<div>
                  <img src={URL.createObjectURL(userPhotos[1])} alt='photo1' />
                </div>)} */}
              {/* );
            }
          })} */}
        {/* <img src={src} alt='photo1' /> */}
      </div>
    </div>
  );
};

export default Media;
