import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_VIDEO } from '../utils/queries';
import CollaboratorForm from '../components/CollaboratorForm';

const VideoPage = () => {
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
    </div>
  );
};

export default VideoPage;
