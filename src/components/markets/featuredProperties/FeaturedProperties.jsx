import { useContext, useState, useEffect} from "react";
import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";
import { AuthContext } from "../../../context/AuthContext";
import ProductCard from "./ProductCard";
import { Paper } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { SearchContext } from "../../../context/SearchContext";
import axios from "axios";
import Stack from '@mui/material/Stack';

const FeaturedProperties = () => {
  
 
  const { user: currentUser } = useContext(AuthContext);
  const { searchProduct } = useContext(SearchContext);
  console.log("searchProductsearchProductsearchProduct",searchProduct)
  const [data, setData] = useState([]);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + currentUser.token;
  
  const baseURL = `${process.env.REACT_APP_BASE_URL}`;
  useEffect(() => {
    const fetchProducts = async ()=>{
      console.log("SeacrProduct",searchProduct)
      const res = await axios.get(`${baseURL}/products`,opts);
        setData(res.data.result)

    }
 
    fetchProducts()
  }, [currentUser,searchProduct]);

  

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="fp">
  
        <>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          > 
            {data
            .filter(e=> 
              e?.status != "Sold" &&
              // e?.title?.toLowerCase().includes(search?.toLowerCase()))
              e?.city?.toLowerCase().includes(searchProduct.city?.toLowerCase())
              && e?.district?.toLowerCase().includes(searchProduct.district?.toLowerCase())
              && e?.ward?.toLowerCase().includes(searchProduct.ward?.toLowerCase())
              && +e?.price > (searchProduct.minPrice == "" ? 0 : +searchProduct.minPrice)
              && +e?.price < (searchProduct.maxPrice == "" ? 99999999999 : +searchProduct.maxPrice)
              && +e?.squaredMeterArea > (searchProduct.minSquaredMeterArea =="" ? 0 : +searchProduct.minSquaredMeterArea)
              && +e?.squaredMeterArea < (searchProduct.maxSquaredMeterArea =="" ? 9999999: searchProduct.maxSquaredMeterArea)
              )
            .map((item) => (
              <Grid item>
                <Paper>
                  <ProductCard item={item}></ProductCard>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
    </div>
  );
};

export default FeaturedProperties;
