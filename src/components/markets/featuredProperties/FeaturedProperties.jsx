import { useContext } from "react";
import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";
import { AuthContext } from "../../../context/AuthContext";
import ProductCard from "./ProductCard";
import { Paper } from "@material-ui/core";
import Grid from "@mui/material/Grid";

const FeaturedProperties = () => {
  
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + currentUser.token;
  const baseURL = `${process.env.REACT_APP_BASE_URL}`;

  const { data, loading, error } = useFetch(`${baseURL}/products`,opts);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
        {/* <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="stretch"
          wrap="wrap"
          
        > */}
          

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          > 
            {data.map((item) => (
              <Grid item>
                <Paper>
                  <ProductCard item={item}></ProductCard>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
