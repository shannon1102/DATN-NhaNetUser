import React, { useState } from "react";
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
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./filterSidebar.css";
const FilterSidebar = () => {
  // const = useStyles();

  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [numBedrooms, setNumBedrooms] = useState([]);
  const [numBathrooms, setNumBathrooms] = useState([]);
  const [squareArea, setSquareArea] = useState({});
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleNumBedroomsChange = (e) => {
    const value = parseInt(e.target.value);
    if (numBedrooms.includes(value)) {
      setNumBedrooms(numBedrooms.filter((num) => num !== value));
    } else {
      setNumBedrooms([...numBedrooms, value]);
    }
  };
  const handleNumBathroomsChange = (e) => {
    const value = parseInt(e.target.value);
    if (numBathrooms.includes(value)) {
      setNumBathrooms(numBathrooms.filter((num) => num !== value));
    } else {
      setNumBathrooms([...numBathrooms, value]);
    }
  };
  const handleFilterSubmit = () => {
    // do something with the filter options
  };

  return (
    <div className="sideBarFilter">
      <Paper>
      <Typography  sx={{
       

      }} variant="h4" className={"filterBarTitle"}>
        Bộ lọc tìm kiếm
      </Typography>
      {/* </Paper> */}

      <Typography variant="h6" className={"filterTitle"}>
        Địa chỉ
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl className={"formControl"}>
            <InputLabel id="location-city-label">Tỉnh/Thành phố</InputLabel>
            <Select
             disableUnderline labelId="location-city-label" id="location-city-select">
              <MenuItem value="Hanoi">Hanoi</MenuItem>
              <MenuItem value="Hochiminh">Ho Chi Minh</MenuItem>
              <MenuItem value="Danang">Danang</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl className={"formControl"}>
            <InputLabel id="location-ward-label">Quận/Huyện</InputLabel>
            <Select
             disableUnderline labelId="location-ward-label" id="location-ward-select">
              <MenuItem value="NgocHa">Ngoc Ha</MenuItem>
              <MenuItem value="TrucBach">Truc Bach</MenuItem>
              <MenuItem value="BaDinh">Ba Dinh</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}> 
          <FormControl className={"formControl"}>
            <InputLabel id="location-district-label">Phường/Xã</InputLabel>
            <Select
             disableUnderline
              labelId="location-district-label"
              id="location-district-select"
            >
              <MenuItem value="BaDinh">Ba Dinh</MenuItem>
              <MenuItem value="HoanKiem">Hoan Kiem</MenuItem>
              <MenuItem value="TayHo">Tay Ho</MenuItem>
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
                value={[minPrice, maxPrice]}
                min={100000000}
                max={10000000000}
                onChange={(event, newValue) => {
                  handleMinPriceChange(event, newValue[0]);
                  handleMaxPriceChange(event, newValue[1]);
                }}
                valueLabelDisplay="auto"
                sx={{
                  // width: 300,
                  color: 'success.main',
                  backgrounColor : "none"
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
            value={minPrice}
            onChange={handleMinPriceChange}
            className={"filterInput"}
          />&nbsp;
    
          <TextField
            label="Max"
            variant="outlined"
            size="small"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className={"filterInput"}
          />
          </ListItem>
  
        <ListItem className={"filterSection"}>
          <ListItemIcon className={"filterIcon"}>
            <HotelIcon />
          </ListItemIcon>
          <Typography variant="subtitle1">Phòng ngủ</Typography>
          <Select
           disableUnderline multiple value={numBedrooms}>
            {/* {names.map((name) => (
              <MenuItem value="10">Ten</MenuItem>
              //  <MenuItem value="20">Twenty</MenuItem>
            ))} */}
            {[
              <MenuItem value="1">1</MenuItem>,
              <MenuItem value="2">2</MenuItem>,
              <MenuItem value="3">3</MenuItem>,
              <MenuItem value="4">4</MenuItem>,
              <MenuItem value="5">5</MenuItem>
            ]}
          </Select>
        </ListItem>
        <ListItem className={"filterSection"}>
          <ListItemIcon className={"filterIcon"}>
            <BathtubIcon />
          </ListItemIcon>
          <Typography variant="subtitle1">Phòng tắm: </Typography>
          <Select
           disableUnderline>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
          </Select>
        </ListItem>
           
      <Typography variant="h6" className={"filterTitle"}>
        Diện tích
      </Typography>

          <ListItem className={"filterSection"}>
          <TextField
            label="Min"
            variant="outlined"
            size="small"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className={"filterInput"}
          />&nbsp;
    
          <TextField
            label="Max"
            variant="outlined"
            size="small"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
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
