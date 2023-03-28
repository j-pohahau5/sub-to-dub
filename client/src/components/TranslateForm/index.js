import React, { useState } from 'react';
import { TRANSLATE_SUBTITLE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_ALL_SUBTITLES } from '../../utils/queries';

function TranslateForm(thisVideoId) {
  const [subtitleId, setSubtitleId] = useState('');
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  
  const [translateSubtitle] = useMutation(TRANSLATE_SUBTITLE, {
    update(cache, { data: { translateSubtitle } }) {
      const { getSubtitles } = cache.readQuery({ query: QUERY_ALL_SUBTITLES, variables: { videoId: thisVideoId } });
      const updatedSubtitles = getSubtitles.map(subtitle => {
        if (subtitle.id === translateSubtitle.id) {
          return translateSubtitle;
        } else {
          return subtitle;
        }
      });
      cache.writeQuery({ query: QUERY_ALL_SUBTITLES, variables: { videoId: thisVideoId }, data: { getSubtitles: updatedSubtitles } });
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    translateSubtitle({ variables: { subtitleId, language, translatedText } });
    setSubtitleId('');
    setText('');
    setLanguage('');
    setTranslatedText('');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="subtitleId">Subtitle ID:</label>
      <input type="text" id="subtitleId" value={subtitleId} onChange={(e) => setSubtitleId(e.target.value)} />

      <label htmlFor="text">Original Text:</label>
      <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />

      <label htmlFor="language">Language:</label>
      <input type="text" id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />

      <label htmlFor="translatedText">Translated Text:</label>
      <input type="text" id="translatedText" value={translatedText} onChange={(e) => setTranslatedText(e.target.value)} />

      <button type="submit">Translate Subtitle</button>
    </form>
  );
}

export default TranslateForm;