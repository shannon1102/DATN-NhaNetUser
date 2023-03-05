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
// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     width: "100%",
//     flexShrink: 0,
//     maxWidth: "400px"
//   },
//   drawerPaper: {
//     width: "100%",
//     maxWidth: "400px"
//   },
//   formControl:{
//     width: "100%"

//   },
//   filterTitle: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(1),
//     width: "100%"
//   },
//   filterSection: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
//   filterOption: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: theme.spacing(1),
//   },
//   filterIcon: {
//     marginRight: theme.spacing(1),
//   },
//   filterInput: {
//     marginLeft: theme.spacing(2),
//     width: '100%',
//   },
//   filterButton: {
//     marginTop: theme.spacing(2),
//   },
// }));

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
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <div className="sideBarFilter">
      <Paper>
      <Typography variant="h6" className={"filterTitle"}>
        Filter
      </Typography>
      </Paper>

      <Typography variant="h6" className={"filterTitle"}>
        Location
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl className={"formControl"}>
            <InputLabel id="location-city-label">City</InputLabel>
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
            <InputLabel id="location-ward-label">Ward</InputLabel>
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
            <InputLabel id="location-district-label">District</InputLabel>
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
        Price
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Price Range"
            secondary={
              <Slider
                className={"slider"}
                value={[minPrice, maxPrice]}
                min={0}
                max={1000000}
                onChange={(event, newValue) => {
                  handleMinPriceChange(event, newValue[0]);
                  handleMaxPriceChange(event, newValue[1]);
                }}
                valueLabelDisplay="auto"
              />
            }
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Min Price"
            variant="outlined"
            size="small"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className={"filterInput"}
          />
    
          <TextField
            label="Max Price"
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
          <Typography variant="subtitle1">Bedrooms</Typography>
          <Select
           disableUnderline multiple value={numBedrooms}>
            {names.map((name) => (
              <MenuItem value="10">Ten</MenuItem>
              //  <MenuItem value="20">Twenty</MenuItem>
            ))}
          </Select>
        </ListItem>
        <ListItem className={"filterSection"}>
          <ListItemIcon className={"filterIcon"}>
            <BathtubIcon />
          </ListItemIcon>
          <Typography variant="subtitle1">Bathrooms</Typography>
          <Select
           disableUnderline>
            <MenuItem value="10">Ten</MenuItem>
            <MenuItem value="20">Twenty</MenuItem>
          </Select>
        </ListItem>
           
      <Typography variant="h6" className={"filterTitle"}>
        Diện tích
      </Typography>
        {/* <ListItem className={"filterSection"}>
          <ListItemIcon className={"filterIcon"}>
            <BathtubIcon />
          </ListItemIcon>
          <Typography variant="subtitle1">Diện tích</Typography>

            
          </ListItem> */}

          <ListItem className={"filterSection"}>
          <TextField
            label="Min Square"
            variant="outlined"
            size="small"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className={"filterInput"}
          />
    
          <TextField
            label="Max Square"
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
        Filter
      </Button>
    </div>
    // </Drawer>
  );
};

export default FilterSidebar;
