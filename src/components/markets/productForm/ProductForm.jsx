import React, { useContext, useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./productForm.css";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, FormGroup, TextareaAutosize } from "@material-ui/core";

import { AddAPhoto, Cancel, VideoCall } from "@material-ui/icons";
import AppButton from "../../AppButton/AppButton";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
export default function AddressSelect({ setGeo }) {
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;
  const history = useHistory();
  const { user } = useContext(AuthContext);
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
    ward: "",
    detailAddress: "",
    numberHome: "",
    price: 1400,
    numFloors: "",
    numBedRooms: "",
    squaredMeterArea: "",
    featureImageId: "",
    lengthMeter: "",
    widthMeter: "",
    certificateOfland: 0,
    title: "",
    description: "",
    media: [],
    status: 1,
    houseType: 1,
  });

  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/provinces`,
        opts
      );
      console.log("RESSSSSSSS", response);
      if (response.status === 200) {
        setProvinces(response.data.result);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/districts?provinceId=${provinceId}`,
        opts
      );
      console.log("RESSSSSSSSDisssss", response);
      if (response.status === 200) {
        setDistricts(response.data.result);
      }
    };
    fetchDistricts();
  }, [provinceId]);

  useEffect(() => {
    const fetchWards = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/wards?districtId=${districtId}`,
        opts
      );
      console.log("RESSSSSSSSDisssss", response);
      if (response.status === 200) {
        setWards(response.data.result);
      }
    };
    fetchWards();
  }, [districtId]);
  useEffect(() => {
    const fetchGEO = async () => {
      if (product.ward != "") {
        try {
          let response = await geocodeByAddress(
            `${product?.ward},${product?.district},${product?.city}`
          );
          console.log("GEOOOOOOO", response);
          let geoCode = await getLatLng(response[0]);
          setGeo(geoCode);
          console.log("GEOOOOOOO", geoCode);
        } catch (e) {
          setGeo({ lat: 21.0278, lng: 105.8342 });
        }
      }
    };
    fetchGEO();
  }, [product.ward]);

  const [files, setFiles] = useState(null);
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log("OnChange", event, product);

    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handelSubmit = async (e) => {
    console.log("Stmmmmmm", e, product);
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
        console.log("uploadFilesReps", uploadFilesReps);

        // const uploadMediaRes = await axios.post(mediaUrl, data,opts);
        await axios.post(
          url,
          {
            ...product,
            media: uploadFilesReps,
            featureImageId: uploadFilesReps[0] || 183,
          },
          opts
        );
        history.push("/market");
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
  };
  return (
    <div>
      <form>
        <FormGroup
          className="formAddress"
          sx={{ m: 1, minWidth: 150, width: 600 }}
          onSubmit={handelSubmit}
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
                // value={product.city}
                name="city"
                onChange={(e) => {
                  // setProvinceId(e.target.value);
                  handleFormChange(e);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {provinces?.map((province) => (
                  <MenuItem
                    key={province.id}
                    onClick={(e) => {
                      setProvinceId(province.id);
                    }}
                    value={province.name}
                  >
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <FormHelperText className="address__label">
                Quận/Huyện
              </FormHelperText>
              <Select
                className="productFormSelect"
                value={product.district}
                id="district"
                name="district"
                onChange={(e) => {
                  handleFormChange(e);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {districts?.map((district) => (
                  <MenuItem
                    key={district.id}
                    value={district.name}
                    onClick={(e) => {
                      setDistrictId(district.id);
                    }}
                  >
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <FormHelperText className="address__label">
                Phường/Xã
              </FormHelperText>
              <Select
                className="productFormSelect"
                value={product.ward}
                onChange={handleFormChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                id="ward"
                name="ward"
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {wards?.map((wardI) => (
                  <MenuItem key={wardI.id} value={wardI.name}>
                    {wardI.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormHelperText className="address__label">
                Địa chỉ chính xác
              </FormHelperText>
              <TextField
                className="productFormTextField"
                id="detailAddress"
                name="detailAddress"
                value={product.detailAddress}
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
            name="houseType"
            onChange={handleFormChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Chung cư</MenuItem>
            <MenuItem value={2}>Nhà đất</MenuItem>
          </Select>

          <FormHelperText className="metaDataForm__label">
            Tiêu đề
          </FormHelperText>
          <TextField
            className="productFormTextField"
            id="title"
            name="title"
            value={product.title}
            onChange={handleFormChange}
          />

          <FormHelperText className="metaDataForm__label">
            Thông tin mô tả
          </FormHelperText>
          <TextareaAutosize
            className="productFormTextArea"
            id="description"
            name="description"
            value={product.description}
            onChange={handleFormChange}
            maxRows={20}
            minRows={5}
            width={"300px"}
          />

          <FormHelperText className="metaDataForm__label">
            SĐT liên hệ
          </FormHelperText>
          <TextField
            className="productFormTextField"
            id="contact"
            name="contact"
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
                name="squaredMeterArea"
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
                name="lengthMeter"
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
                name="widthMeter"
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
                name="numBedRooms"
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
                id="numBathRooms"
                name="numBathRooms"
                value={product.numBathRooms}
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
                id="numFloors"
                name="numFloors"
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
                Giá bán (triệu VNĐ)
              </FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="price"
                name="price"
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
