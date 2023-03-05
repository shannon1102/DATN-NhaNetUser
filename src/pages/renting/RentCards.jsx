import React from 'react'
import RentCard from "../../components/renting/RentCard";
import { styled } from "@material-ui/core";
import { Paper, Grid, Box } from "@material-ui/core";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RentCards() {
  return (
    <>
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={2} md={2}>
        <RentCard>1</RentCard>
      </Grid>
      <Grid item xs={2} md={2}>
        <RentCard>2</RentCard>
      </Grid>
      <Grid item xs={2} md={2}>
        <RentCard>3</RentCard>
      </Grid>
      <Grid item xs={2} md={2}>
        <RentCard>4</RentCard>
      </Grid>
      <Grid item xs={2} md={2}>
        <RentCard>5</RentCard>
      </Grid>
      <Grid item xs={2} md={2}>
        <RentCard>6</RentCard>
      </Grid>
    </Grid>
  </Box>

    
    </>
    
  )
}
