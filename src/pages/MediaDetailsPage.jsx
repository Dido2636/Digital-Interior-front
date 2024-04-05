import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 

function MediaDetailsPage() {
  const [media, setMedia] = useState([]);
  const { mediaId } = useParams();

  useEffect(() => {
    getOneMedia();
  }, []);

  const getOneMedia = async () => {
    try {
      const response = await axios.get(`http://localhost:6789/media/${mediaId}`);
      console.log(response.data);
      setMedia(response.data);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  return (
    <div>

        <>
          <img src={`http://localhost:6789/${media.mediaType}`} width={375} height={300}/>
          <h1>{media.title}</h1>
          <p>{media.description}</p>
          <div className="box-btn-view-details">
          {media.viewUrl && <button
                      className="btn-view-details"
                      onClick={() => {
                        window.open(media.viewUrl, "_blank");
                      }}
                    >
                     Votre view 360°
                    </button>}</div>
        </>

    </div>
  );
}

export default MediaDetailsPage;