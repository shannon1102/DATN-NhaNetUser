import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import AppButton from "../../AppButton/AppButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Paper } from "@material-ui/core";
import "./featuredProperties.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HotelIcon from "@material-ui/icons/Hotel";
import BathtubIcon from "@material-ui/icons/Bathtub";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';

export default function ProductCard({ item }) {
  const history = useHistory();
  const dateFormat = 'dd/MM/yyyy';
  return (
    <Paper level={1} sx={{
      padding: "20px"
    }}>
      <Card sx={{ width: 320 , padding: "20px"}}>
        <Typography
          level="h1"
          fontSize="md"
          sx={{ mb: 0.5 }}
          className="productTitle"
        >
          {item.title || "Yosemite National Park"}
        </Typography>
        <Typography level="body1" sx={{
          marginLeft: "240px"
        }}>
          {format(new Date(item.createdAt),"dd/MM/yyyy") || "April 24  2023"}
        </Typography>
        {/* <Typography level="body2">
          {item.description}
        </Typography> */}
     
        <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/${item.featureImage.id}`}
            srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography level="body3" className="priceProduct">
              Giá:
            </Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {"$" + item.price ||
                Math.floor(Math.random() * (10000 - 1000 + 1) + 1)}
            </Typography>
          </div>
          
            <Button
              variant="solid"
              size="sm"
              color="primary"
              aria-label="Explore Bahamas Islands"
            
              sx={{
                ml: "auto",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "#4F59D4",
                height: "45px",
                borderRadius: "23px",
              }}

              onClick= {()=>{
                history.push(`/products/${item.id}`)
              }}
            >
              Xem chi tiết
            </Button>

        </Box>
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            px: "var(--Card-padding)",
            bgcolor: "background.level1",
          }}
        >
          <HotelIcon className="productIcon" />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {item.numOfBedrooms ||
              Math.floor(Math.random() * (6 - 1 + 1) + 1) + " Phòng ngủ"}
          </Typography>
          <Divider orientation="vertical" />
          <BathtubIcon className="productIcon" />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {item.numOfBathrooms ||
              Math.floor(Math.random() * (5 - 1 + 1) + 1) + " Phòng tắm"}
          </Typography>
          <DashboardIcon className="productIcon" />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {item.squareArea ||
              Math.floor(Math.random() * (100 - 20 + 1) + 1) + "m2"}
          </Typography>
        </CardOverflow>
      </Card>
    </Paper>
  );
}
