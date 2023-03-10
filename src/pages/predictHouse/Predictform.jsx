import React, { useContext, useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import "./predictForm.css";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {  FormGroup } from "@material-ui/core";
import AppButton from "../../components/AppButton/AppButton";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import * as tf from "@tensorflow/tfjs"
import { convertInputmodel } from "../../model/convertInput";
import PredictReultModal from "./PredictResultModal";
export default function PredictForm() {
      const [isOpenModal, setIsOpenModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const { user } = useContext(AuthContext);
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
    numFloors: "",
    numBedRooms: "",
    squaredMeterArea: "",
    lengthMeter: "",
    widthMeter: "",
    certificateOfland: 0,
    houseType: "",
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
        setProvinces([response.data.result[0]]);
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



  async function loadModel() {
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/shannon1102/house-predict-price/master/model.json');
    console.log("Eqqqqqqqqqqqqq",model);
    // console.log(model?.sumary());
    return model;
  }

    const handelSubmit = async ()=>{
          const model = await loadModel();
          console.log("MODELLLLLLLLL",model,product)
          // console.log(model?.sumary());
          let a =convertInputmodel(product);
          console.log("MODELLLLLLLLL",a.shape)
          const tensor = tf.tensor2d(a, [1, 280])
          console.log("inputTensor",tensor,tensor.shape)
          let response = model.predict(tensor);
          console.log("Reponseee",response);
          const value = response.dataSync()[0]
          console.log("Valueeeee",value);
          setAmount(value * product.squaredMeterArea);
          console.log("Amount",amount,value * product.squaredMeterArea);
          setIsOpenModal(true);

    }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log("OnChange", event, product);

    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("AterOnChange", event, product);
  };
 
  return (
    <>
    <div>
      <form>
        <FormGroup
          className="formAddress"
          sx={{ m: 1, minWidth: 150, width: 600 }}
          onSubmit={handelSubmit}
        >
          <h2 className="addressSelect__title">?????a ch??? cho thu??</h2>
          <Grid container>
            <Grid item xs={6}>
              <FormHelperText className="address__label">
                T???nh/Th??nh ph???
              </FormHelperText>
              <Select
                className="productFormSelect"
                id="city"
                value={product.city}
                name="city"
                onChange={(e) => {
                  // setProvinceId(e.target.value);
                  handleFormChange(e);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {provinces?.map((province) => (
                  <MenuItem
                    key={province.id}
                    onClick={(e) => {
                      console.log("eeeeeeeeeeeeeeeeeeee",e,province.id)
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
                Qu???n/Huy???n
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
                Ph?????ng/X??
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
                {wards?.map((wardI) => (
                  <MenuItem key={wardI.id} value={wardI.name}>
                    {wardI.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <h2 className="addressSelect__title">Th??ng tin m?? t???</h2>
          <FormHelperText className="metaDataForm__label">
            Lo???i c??n h???
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
            <MenuItem value={1}>{"Nh?? bi???t th???"}</MenuItem>
            <MenuItem value={2}>{"Nh?? m???t ph???, m???t ti???n"}</MenuItem>
            <MenuItem value={3}>{"Nh?? ng??, h???m"}</MenuItem>
            <MenuItem value={4}>{"Nh?? ph??? li???n k???"}</MenuItem>
          </Select>
          <FormHelperText className="metaDataForm__label">
            S??? ?????
          </FormHelperText>
          <Select
            className="productFormSelect"
            value={product.certificateOfland}
            id="certificateOfland"
            name="certificateOfland"
            onChange={handleFormChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>{"Gi???y t??? kh??c"}</MenuItem>
            <MenuItem value={2}>{"??ang ch??? s???"}</MenuItem>
            <MenuItem value={3}>{"???? c?? s???"}</MenuItem>
          </Select>


          <Grid container>
            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                Di???n t??ch
              </FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="squaredMeterArea"
                name="squaredMeterArea"
                value={product.squaredMeterArea}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormHelperText className="metaDataForm__label">
                Chi???u d??i
              </FormHelperText>
              <TextField
                className="productFormSubTextField"
                id="lengthMeter"
                name="lengthMeter"
                value={product.lengthMeter}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={3}>
              <FormHelperText className="metaDataForm__label">
                Chi???u r???ng
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
                S??? ph??ng ng???
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
            {/* <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                S??? nh?? v??? sinh
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
            </Grid> */}
            <Grid item xs={6}>
              <FormHelperText className="metaDataForm__label">
                S??? t???ng
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
          </Grid>
          <div className="submitBtnContainer">
            <AppButton
              text="D??? ??o??n gi?? ti???n"
              type="button"
              // isLoading={isFetching}
              addtionalStyles={{
                margin: "15px",
                width: "150px",
              }}
              onClick={async()=> {await handelSubmit()}}
            >

            </AppButton>
          </div>
        </FormGroup>
      </form>
    </div>
 {isOpenModal && (
        <PredictReultModal setIsOpenModal={setIsOpenModal} price={amount}></PredictReultModal>
)}
  </>
  );
}
