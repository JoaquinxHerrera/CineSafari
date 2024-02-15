import React from 'react';
import '../index.css'

const VideoModal = ({ video, onClose }) => {
  if (!video) {
    return null;
  }

  return (
    <div className='video-modal-overlay'>
      <div className='video-modal'>
        <p className='close-btn' onClick={onClose}>
          &times;
        </p>
        <iframe
          
          title={video.name}
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${video.key}`}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;