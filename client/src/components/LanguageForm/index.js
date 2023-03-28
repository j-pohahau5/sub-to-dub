import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_LANGUAGE } from './mutations';

function LanguageForm() {
  const [name, setName] = useState('');
  const [languageCode, setLanguageCode] = useState('');
  const [createLanguage] = useMutation(CREATE_LANGUAGE);

  const handleSubmit = (e) => {
    e.preventDefault();
    createLanguage({
      variables: { name, languageCode },
    })
      .then((res) => {
        // Handle success
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Language Code:
        <input
          type="text"
          value={languageCode}
          onChange={(e) => setLanguageCode(e.target.value)}
        />
      </label>
      <button type="submit">Create Language</button>
    </form>
  );
}

export default LanguageForm;