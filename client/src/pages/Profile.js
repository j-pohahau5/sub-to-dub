import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import VideoForm from '../components/VideoForm';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { id: userParam },
  });

  const user = data?.me || {};
  console.log(user);
  const videos = user.videos;

  if (loading) {
    return <div>Loading...</div>;
  };

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {`${user.name}'s your`} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <h3> Hobbies:</h3>
          <div className='my-5'>
            {videos.map((video) => (
              <div key={video._id} >
                <p>Title: {video.title}</p>
                <p>Description: {video.description}</p>
                <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/videos/${video._id}`}
            >
              View this video's information.
            </Link> 
              </div>

            ))}


          </div>

        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
          >
            <VideoForm />
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;