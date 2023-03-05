import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import AppButton from "../../components/AppButton/AppButton";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const REQUEST_STATES = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

export default function Share({ fetchPosts = () => {} }) {
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [desc, setDesc] = useState();
  const [files, setFiles] = useState(null);
  const [postState, setPostState] = useState(null);

  const fileOpts = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  fileOpts.headers.Authorization = "Bearer " + user.token;

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + user.token;

  const resetForm = () => {
    setFiles([]);
    setDesc("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/posts`;
    setPostState(REQUEST_STATES.REQUEST);
    if (files) {
      try {
        const fileArr = Array.from(files);

        const uploadFilesReps = await Promise.all(
          fileArr.map(async (file) => {
            const data = new FormData();
            data.append("files", file);

            let uploadedMedia = await axios.post(mediaUrl, data, fileOpts);
            console.log("uploadMediaRes", uploadedMedia);
            return uploadedMedia.data.result[0].id;
          })
        );

        // const uploadMediaRes = await axios.post(mediaUrl, data,opts);
        await axios.post(
          url,
          { description: desc, media: [...uploadFilesReps] },
          opts
        );

        fetchPosts();
        setPostState(REQUEST_STATES.SUCCESS);
      } catch (err) {
        console.log(err);
        setPostState(REQUEST_STATES.FAIL);
      }
    } else {
      try {
        console.log(123123);
        await axios.post(url, { description: desc }, opts);
        setPostState(REQUEST_STATES.SUCCESS);
        fetchPosts();
      } catch (err) {
        console.log("err: ", err);
        setPostState(REQUEST_STATES.FAIL);
      }
    }
  };
  useEffect(() => {
    console.log("postState: ", postState);
    if (postState === REQUEST_STATES.SUCCESS) {
      resetForm();
    }
  }, [postState]);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.avatar
                ? `${mediaUrl}/${user.avatar}`
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"Bạn đang nghĩ gì " + user.name + "?"}
            className="shareInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="shareHr" />
        {files && files.length > 0 && (
          <div className="shareImgContainer">
            {Array.from(files ?? []).map((file, index) => {
              if (file.type.split("/")[0] === "image")
                return (
                  <img
                    key={index}
                    className="shareImg"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                );
              if (file.type.split("/")[0] === "video") {
                return (
                  <video key={index} width="150" height="150" controls={true}>
                    <source src={URL.createObjectURL(file)} type="video/mp4" />
                  </video>
                );
              }
            })}
            <Cancel className="shareCancelImg" onClick={() => setFiles(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Ảnh/videos</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.mp4"
                onChange={(e) => {
                  if (e.target.files.length > 3) {
                    alert("Bạn chỉ có thể tải lên tối đa 3 files!");
                    return;
                  }
                  setFiles(e.target.files);
                }}
                multiple
              />
            </label>
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            */}
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Cảm thấy</span>
            </div>
          </div>
          <AppButton
            text="Đăng"
            type="submit"
            isLoading={postState === REQUEST_STATES.REQUEST}
            addtionalStyles={{
              width: "90px",
              height: "36px",
              borderRadius: "6px",
            }}
          ></AppButton>
        </form>
      </div>
    </div>
  );
}