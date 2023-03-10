import React, { useContext, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./productForm.css";
import Grid from "@material-ui/core/Grid";

import TextField from "@mui/material/TextField";
import { Button, FormGroup, TextareaAutosize } from "@material-ui/core";

import { AddAPhoto, Cancel, VideoCall } from "@material-ui/icons";
import AppButton from "../../AppButton/AppButton";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
export default function AddressSelect({ label, placeholder }) {
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;
  const {user} = useContext(AuthContext)
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

  const [product, setProduct] = useState({
    city: "",
    district: "",
    street: "",
    detailAdress: "",
    numberHome: "",
    price: 0,
    numFloors: 0,
    numBedRooms: 0,
    squaredMeterArea: 0,
    featureImageId: 2,
    lengthMeter: 0,
    widthMeter: 0,
    certificateOfland: 0,
    ward: "",
    title: "",
    description: "",
    media: [
      2
    ],
    status:1,
    houseType: 1
  });

  const [files, setFiles] = useState(null);
  const handleFormChange = (event) => {
    const { id, value } = event.target;
    console.log("OnChange",event,product)
    setProduct((prevState) => ({
      ...prevState,
    [id]: value,
    }));
  };
  const handelSubmit = async (e)=>{
    console.log("Stmmmmmm",e,product)
    e.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/products`;

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
          product,
          opts
        );

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        console.log(123123);
        await axios.post(url, product, opts);
       
      } catch (err) {
        console.log("err: ", err);
      }
    }


  }
  return (
    <div>
      <form>
        <FormGroup
          className="formAddress"
          sx={{ m: 1, minWidth: 150, width: 600 }}
          onSub
        >
          <h2 className="addressSelect__title">Địa chỉ cho thuê</h2>
          <Grid container>
            <Grid item xs={6}>
              <FormHelperText className="address__label">
                Tỉnh/Thành phố
              </FormHelperText>
              <Select
                className="productFormSelect"
                id="city"
                value={product.city}
                onChange={handleFormChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>

            {/* </FormControl>
<FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
            <Grid item xs={6}>
              <FormHelperText className="address__label">
                Quận/Huyện
              </FormHelperText>
              <Select
                className="productFormSelect"
                value={product.district}
                id="district"
                onChange={handleFormChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
            {/* </FormControl>
<FormControl sx={{ m: 1, minWidth: 150,  width:200}}> */}
            <Grid item xs={6}>
              <FormHelperText className="address__label">
                Phường/Xã
              </FormHelperText>
              <Select
                className="productFormSelect"
                value={product.street}
                onChange={handleFormChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                id="street"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={6}>
              <FormHelperText className="address__label">Số nhà</FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="numberHome"
                value={product.numberHome}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormHelperText className="address__label">
                Địa chỉ chính xác
              </FormHelperText>
              <TextField
                className="productFormTextField"
                id="detailAdress"
                value={product.detailAdress}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>

          <h2 className="addressSelect__title">Thông tin mô tả</h2>
          <FormHelperText className="metaDataForm__label">
            Loại căn hộ
          </FormHelperText>
          <Select
            className="productFormSelect"
            value={product.houseType}
            id="houseType"
            onChange={handleFormChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>

          <FormHelperText className="metaDataForm__label">
            Tiêu đề
          </FormHelperText>
          <TextField
            className="productFormTextField"
            id="title"
            value={product.title}
            onChange={handleFormChange}
          />

          <FormHelperText className="metaDataForm__label">
            Thông tin mô tả
          </FormHelperText>
          <TextareaAutosize
            className="productFormTextArea"
            id="description"
            value={product.description}
            onChange={handleFormChange}
            maxRows={20}
            minRows={5}
            width={"300px"}
          />

          <FormHelperText className="metaDataForm__label">
            Thông tin liên hệ
          </FormHelperText>
          <TextField
            className="productFormTextField"
            id="contact"
            value={product.contact}
            onChange={handleFormChange}
          />
          <Grid container>
            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Diện tích
              </FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="squaredMeterArea"
                value={product.squaredMeterArea}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Chiều dài
              </FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="lengthMeter"
                value={product.lengthMeter}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Chiều rộng
              </FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="widthMeter"
                value={product.widthMeter}
                onChange={handleFormChange}
              />
            </Grid>

            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Số phòng ngủ
              </FormHelperText>
              <Select
                className="productFormSelect"
                id="numBedRooms"
                value={product.numBedRooms}
                onChange={handleFormChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>
                  <em>1</em>
                </MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Số nhà vệ sinh
              </FormHelperText>
              <Select
                className="productFormSelect"
                id="numBedRooms"
                value={product.numBedRooms}
                onChange={handleFormChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>
                  <em>1</em>
                </MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Số tầng
              </FormHelperText>
              <Select
                className="productFormSelect"
                id="numBedRnumFloorsooms"
                value={product.numFloors}
                onChange={handleFormChange}
                // displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>
                  <em>1</em>
                </MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Giá cho thuê
              </FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="price"
                value={product.price}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
          <div className="createPost__uploadImg">
            <h2 className="uploadImg__title">File minh họa</h2>
            <p>Cập nhật hình ảnh rõ ràng sẽ bán nhanh hơn</p>
            <div className="uploadImg__container">
              <label for="avatar-upload" className="uploadLabel">
                <AddAPhoto htmlColor="tomato" className="uploadImg__icon" />
                <span>
                  <h3> Ảnh/Video</h3>
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  multiple="multiple"
                  id="avatar-upload"
                  accept=".png,.jpeg,.jpg,.mp4"
                  // onChange={(e) => setFileAvatar(e.target.files[0])}
                  onChange={(e) => {
                    if (e.target.files.length > 3) {
                      alert("Bạn chỉ có thể tải lên tối đa 3 files!");
                      return;
                    }
                    setFiles(e.target.files);
                  }}
                />
              </label>
            </div>
          </div>
          {/* <Share></Share> */}
          {/* <div className="createPost__uploadFile">
  <h2 className="uploadImg__title">Video</h2>
  <p>Upload video từ máy của bạn</p>
  <div className="uploadImg__container">
    <label for="avatar-upload" className="uploadLabel">
      <VideoCall htmlColor="tomato" className="uploadImg__icon" />
      <span>
        <h3> Avatar picture</h3>
      </span>
      <input
        style={{ display: "none" }}
        type="file"
        multiple="multiple"
        id="avatar-upload"
        accept=".png,.jpeg,.jpg,.mp4"
        onChange={(e) => setFileAvatar(e.target.files[0])}
      />
    </label>
  </div>
</div> */}
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
                      <source
                        src={URL.createObjectURL(file)}
                        type="video/mp4"
                      />
                    </video>
                  );
                }
              })}
              <Cancel
                className="shareCancelImg"
                onClick={() => setFiles(null)}
              />
            </div>
          )}

          <div className="submitBtnContainer">
            <AppButton
              text="Đăng bán"
              type="submit"
              // isLoading={isFetching}
              addtionalStyles={{
                margin: "15px",
                width: "150px",
              }}
              onClick={handelSubmit}
            >
              Submit
            </AppButton>
          </div>
        </FormGroup>
      </form>
    </div>
  );
}
