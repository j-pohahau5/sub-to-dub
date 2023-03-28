import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_LANGUAGES } from '../../utils/queries';

function LanguageList() {
  const { loading, error, data } = useQuery(QUERY_ALL_LANGUAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {data.getLanguages.map(language => (
          <li key={language.id}>
            {language.name} ({language.languageCode})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LanguageList;
