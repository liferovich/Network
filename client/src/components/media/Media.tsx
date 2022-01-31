const Media = () => {
  return (
    <div>
      <form action='/media' method='post' encType='multipart/form-data'>
        <div className='form-group'>
            <label htmlFor="picture">Upload file</label>
            <input type="file" name="picture" id="picture" className="form-control" required/>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-upload">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default Media;
