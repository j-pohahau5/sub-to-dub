import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_VIDEO } from '../utils/queries';
import CollaboratorForm from '../components/CollaboratorForm';
import TranslateForm from '../components/TranslateForm';
import VoiceoverForm from '../components/VoiceoverForm';
import SubtitleForm from '../components/SubtitleForm';
import LanguageList from '../components/LanguageList';
// import CollaboratorForm from '../components/CollaboratorForm';

const SingleVideo = () => {
  const { videoId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_VIDEO, {
    variables: { videoId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const video = data.getVideo;

  return (
    <div>
      <h1>{video.title}</h1>
      <div>{video.description}</div>
      <CollaboratorForm videoId={video.id} />
      <TranslateForm videoId={video.id} />
      <VoiceoverForm videoId={video.id} />
      <SubtitleForm videoId={video.id} />
      <LanguageList />
    </div>
  );
};

export default SingleVideo;
