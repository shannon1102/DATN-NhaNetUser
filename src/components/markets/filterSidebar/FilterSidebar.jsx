import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  Typography,
  Divider,
  Slider,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Paper,
} from "@material-ui/core";

import "./filterSidebar.css";
import AppButton from "../../AppButton/AppButton";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { SearchContext } from "../../../context/SearchContext";
const FilterSidebar = () => {
  const { user } = useContext(AuthContext);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + user.token;

  // const = useStyles();

  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState([]);
  const [wards, setWards] = useState([]);
  const {
    search,
    searchProduct,
    dispatch: searchDispatch,
  } = useContext(SearchContext);

  const [product, setProduct] = useState({
    city: "",
    district: "",
    ward: "",
    minPrice: "",
    maxPrice: "",
    minSquareArea: "",
    maxSquareArea: "",
    // squaredMeterArea: ""
  });
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    console.log("OnChange", event, product);

    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
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

  const handleFilterSubmit = () => {
    console.log("SubmitInfor", product);
    searchDispatch({
      type: "NEW_SEARCH",
      payload: {
        searchProduct: {
          city: product.city,
          district: product.district,
          ward: product.ward,
          minPrice: product.minPrice,
          maxPrice: product.maxPrice,
          minSquaredMeterArea: product.minSquareArea,
          maxSquaredMeterArea: product.maxSquareArea,
        },
        search: search,
      },
    });
    console.log("searchProduct", searchProduct);
    // do something with the filter options
  };

  return (
    <div className="sideBarFilter">
      <div className=""></div>
      <Paper>
        <Typography sx={{}} variant="h4" className={"filterBarTitle"}>
          Bộ lọc tìm kiếm
        </Typography>
        {/* </Paper> */}

        <Typography variant="h6" className={"filterTitle"}>
          Địa chỉ
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={"formControl"}>
              <InputLabel id="location-city-label">Tỉnh/Thành phố</InputLabel>
              <Select
                disableUnderline
                labelId="location-city-label"
                id="location-city-select"
                onChange={(e) => {
                  handleFormChange(e);
                }}
                name="city"
              >
                <MenuItem value="">None</MenuItem>
                {provinces?.map((province) => (
                  <MenuItem
                    key={province.id}
                    onClick={() => setProvinceId(province.id)}
                    value={province.name}
                  >
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={"formControl"}>
              <InputLabel id="location-ward-label">Quận/Huyện</InputLabel>
              <Select
                disableUnderline
                labelId="location-ward-label"
                id="location-ward-select"
                onChange={(e) => {
                  //  setDistrictId(e.target.value)
                  handleFormChange(e);
                }}
                name="district"
              >
                <MenuItem value="">None</MenuItem>
                {districts?.map((district) => (
                  <MenuItem
                    key={district.id}
                    value={district.name}
                    onClick={() => setDistrictId(district.id)}
                  >
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className={"formControl"}>
              <InputLabel id="location-district-label">Phường/Xã</InputLabel>
              <Select
                disableUnderline
                labelId="location-district-label"
                id="location-district-select"
                onChange={handleFormChange}
                name="ward"
              >
                <MenuItem value="">None</MenuItem>
                {wards?.map((ward) => (
                  <MenuItem key={ward.id} value={ward.name}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Divider />

        <Typography variant="h6" className={"filterTitle"}>
          Giá tiền
        </Typography>
        <List>
          <ListItem className={"filterSection"}>
            <ListItemText
              primary="Khoảng giá"
              secondary={
                <Slider
                  className={"sliderPrice"}
                  value={[100000000, 10000000000]}
                  min={100000000}
                  max={10000000000}
                  // name=""
                  onChange={(event, newValue) => {
                    handleFormChange(event);
                  }}
                  valueLabelDisplay="auto"
                  sx={{
                    // width: 300,
                    color: "success.main",
                    backgrounColor: "none",
                  }}
                />
              }
            />
          </ListItem>
          <ListItem className={"filterSection"}>
            <TextField
              label="Min"
              variant="outlined"
              size="small"
              type="number"
              value={product.minPrice}
              name="minPrice"
              onChange={(e) => {
                handleFormChange(e);
              }}
              className={"filterInput"}
            />
            &nbsp;
            <TextField
              label="Max"
              variant="outlined"
              size="small"
              type="number"
              value={product.maxPrice}
              onChange={(e) => {
                handleFormChange(e);
              }}
              name="maxPrice"
              className={"filterInput"}
            />
          </ListItem>

          {/* <ListItem className={"filterSection"}>
            <ListItemIcon className={"filterIcon"}>
              <HotelIcon />
            </ListItemIcon>
            <Typography variant="subtitle1">Phòng ngủ</Typography>
            <Select disableUnderline 
            // multiple 
            onChange={(e)=>{
              handleFormChange(e)
            }}
             value={product.numBedrooms}>
              {[
                <MenuItem value="1">1</MenuItem>,
                <MenuItem value="2">2</MenuItem>,
                <MenuItem value="3">3</MenuItem>,
                <MenuItem value="4">4</MenuItem>,
                <MenuItem value="5">5</MenuItem>,
              ]}
            </Select>
          </ListItem> */}
          {/* <ListItem className={"filterSection"}>
            <ListItemIcon className={"filterIcon"}>
              <BathtubIcon />
            </ListItemIcon>
            <Typography variant="subtitle1">Phòng tắm: </Typography>
            <Select 
            name="num"
               onChange={(e)=>{
                handleFormChange(e)
              }}
            disableUnderline>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </Select>
          </ListItem> */}

          <Typography variant="h6" className={"filterTitle"}>
            Diện tích
          </Typography>

          <ListItem className={"filterSection"}>
            <TextField
              label="Min"
              variant="outlined"
              size="small"
              type="number"
              value={product.minSquareArea}
              name="minSquareArea"
              // onChange={handleMinSquareArea}
              onChange={(e) => {
                handleFormChange(e);
              }}
              className={"filterInput"}
            />
            &nbsp;
            <TextField
              label="Max"
              variant="outlined"
              size="small"
              type="number"
              value={product.maxSquareArea}
              // onChange={handleMaxSquareArea}
              onChange={(e) => {
                handleFormChange(e);
              }}
              name="maxSquareArea"
              className={"filterInput"}
            />
          </ListItem>
        </List>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={"filterButton"}
          onClick={handleFilterSubmit}
        >
          Tìm kiếm
        </Button>
      </Paper>
      {/* <Paper> */}
    </div>
    // </Drawer>
  );
};

export default FilterSidebar;
