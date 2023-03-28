import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_SUBTITLE } from '../../utils/mutations';

function SubtitleForm() {
  const [videoId, setVideoId] = useState('');
  const [language, setLanguage] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const [addSubtitle, { loading, error }] = useMutation(ADD_SUBTITLE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await addSubtitle({
        variables: { videoId, language, text, file },
      });
      console.log('Subtitle added:', result.data.addSubtitle);
      // reset form fields after successful submission
      setVideoId('');
      setLanguage('');
      setText('');
      setFile(null);
    } catch (error) {
      console.error('Error adding subtitle:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="videoId">Video ID:</label>
      <input type="text" id="videoId" value={videoId} onChange={(event) => setVideoId(event.target.value)} />
      <label htmlFor="language">Language:</label>
      <input type="text" id="language" value={language} onChange={(event) => setLanguage(event.target.value)} />
      <label htmlFor="text">Text:</label>
      <textarea id="text" value={text} onChange={(event) => setText(event.target.value)} />
      <label htmlFor="file">Subtitle file:</label>
      <input type="file" id="file" onChange={(event) => setFile(event.target.files[0])} />
      <button type="submit" disabled={loading}>Submit</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

export default SubtitleForm;