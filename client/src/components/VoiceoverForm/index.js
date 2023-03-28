import { useMutation } from '@apollo/client';
import { GENERATE_VOICEOVER } from '../../utils/mutations';
import React, { useState } from 'react';

const VoiceoverForm = ({ videoId }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [languages, setLanguage] = useState('');
  const [generateVoiceover, { loading, error }] = useMutation(GENERATE_VOICEOVER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await generateVoiceover({
      variables: {
        videoId,
        languages,
        audioFile,
      },
    });
    // handle success or error
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="audioFile">Audio File:</label>
    <input type="file" id="audioFile" name="audioFile" accept="audio/*" onChange={handleFileChange} required />
  </div>
  <div>
    <label htmlFor="language">Language:</label>
    <select id="language" name="language" onChange={handleLanguageChange} value={languages} required>
      <option value="">Select a language</option>
      {languages.map(language => (
        <option key={language.id} value={language.id}>{language.name}</option>
      ))}
    </select>
  </div>
  <button type="submit">Submit</button>
</form>

  );
};

export default VoiceoverForm;