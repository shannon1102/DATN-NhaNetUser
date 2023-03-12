import { useContext, useState, useEffect} from "react";
import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";
import { AuthContext } from "../../../context/AuthContext";
import ProductCard from "./ProductCard";
import { Paper } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import { SearchContext } from "../../../context/SearchContext";
import axios from "axios";

const FeaturedProperties = () => {
  
 
  const { user: currentUser } = useContext(AuthContext);
  const { search } = useContext(SearchContext);
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

      const res = await axios.get(`${baseURL}/products`,opts);
      // if(res.data.status == 200) {
        setData(res.data.result)
      // }

    }
 
    fetchProducts()
  }, [currentUser,search]);

  

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
            .filter(e=> (
              e?.title?.toLowerCase().includes(search?.toLowerCase()))
           
            
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
