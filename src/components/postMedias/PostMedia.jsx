/* eslint-disable jsx-a11y/anchor-is-valid */
import LightGallery from "lightgallery/react";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "./postMedia.css";
export default function PostMedia({ mediaMaps }) {
  console.log("mediaMaps: ", mediaMaps);
  const getImageUrl = (mediaId) => {
    return `${process.env.REACT_APP_MEDIA_URL}/` + mediaId;
  };

  const getMediaComponent = (media) => {
    let imageUrl = getImageUrl(media.id);
    if (media.type === "image") {
      return (
        <img
          style={{
            width: "100%",
            objectFit: "contain",
          }}
          className="img-responsive"
          alt="img1"
          src={imageUrl}
        />
      );
    }

    if (media.type === "video") {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <video
            style={{
              height: "100%",
              width: "100%",
            }}
            controls
            alt="img1"
            src={imageUrl}
          />
        </div>
      );
    }
  };
  console.log("mediaMaps.length: ", mediaMaps.length);

  return (
    <div className="post-media">
      {mediaMaps.length === 1 && (
        <div
          className="post-media-center post-media__1"
          style={
            mediaMaps[0].media.type === "video"
              ? {
                  backgroundColor: "#000",
                }
              : {}
          }
        >
          {getMediaComponent(mediaMaps[0].media)}
        </div>
      )}
      {mediaMaps.length === 2 && (
        <div className="post-media-center post-media__2">
          <div
            className="post-media__2-1"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getMediaComponent(mediaMaps[0].media)}
          </div>
          <div
            className="post-media__2-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getMediaComponent(mediaMaps[1].media)}
          </div>
        </div>
      )}
      {mediaMaps.length === 3 && (
        <div className="post-media-center post-media__3">
          <div
            className="post-media__3-1"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
              width: "100%",
            }}
          >
            {getMediaComponent(mediaMaps[0].media)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "4px",
            }}
          >
            <div
              className="post-media__3-2"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
                width: "100%",
              }}
            >
              {getMediaComponent(mediaMaps[1].media)}
            </div>

            <div
              className="post-media__3-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "4px",
                backgroundColor: "#000",
                width: "100%",
              }}
            >
              {getMediaComponent(mediaMaps[2].media)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
