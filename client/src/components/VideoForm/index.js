import { useMutation } from '@apollo/client';
import { UPLOAD_VIDEO } from '../../utils/mutations';
import React, { useState } from 'react';

function VideoUploadForm() {
  const [uploadVideo] = useMutation(UPLOAD_VIDEO);
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    file: null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    uploadVideo({
      variables: {
        title: videoData.title,
        description: videoData.description,
        file: videoData.file,
      },
    })
      .then(() => {
        // handle success
      })
      .catch((error) => {
        // handle error
      });
  }

  function handleChange(event) {
    const { name, value, files } = event.target;
  
    setVideoData({
      ...videoData,
      [name]: files ? files[0] : value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={videoData.title}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        value={videoData.description}
        onChange={handleChange}
      />

      <label htmlFor="file">File</label>
      <input
        type="file"
        name="file"
        id="file"
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default VideoUploadForm;