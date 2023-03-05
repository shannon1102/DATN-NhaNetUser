import "./depositTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox } from "@mui/material";
import { TablePagination } from "@mui/material";
import { useState } from "react";
const DepositTable = () => {

  const handelViewBtnClick = (e) => {
    console.log("e",e);
  };
  const handelDeleteBtnClick = (e) => {
    console.log("E",e)
  };
  const [selectedRow, setSelectedRow] =  useState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

            .map((row) => (
              <TableRow key={row.id} >
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    onChange={handleClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell> */}
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.img} alt="" className="image" />
                    {row.product}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <Button className="actionBtn" variant="outlined" onClick={handelViewBtnClick}>
                    View
                  </Button>
                  <Button className="actionBtn" variant="outlined" onClick={handelDeleteBtnClick}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 15, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
// {
//     "columns": [
//       {
//         "field": "id",
//         "hide": true
//       },
//       {
//         "field": "desk",
//         "headerName": "Desk",
//         "width": 110
//       },
//       {
//         "field": "commodity",
//         "headerName": "Commodity",
//         "width": 180,
//         "editable": true
//       },
//       {
//         "field": "traderName",
//         "headerName": "Trader Name",
//         "width": 120,
//         "editable": true
//       },
//       {
//         "field": "traderEmail",
//         "headerName": "Trader Email",
//         "width": 150,
//         "editable": true
//       },
//       {
//         "field": "quantity",
//         "headerName": "Quantity",
//         "type": "number",
//         "width": 140,
//         "editable": true
//       },
//       {
//         "field": "filledQuantity",
//         "headerName": "Filled Quantity",
//         "availableAggregationFunctions": [
//           "min",
//           "max",
//           "avg",
//           "size"
//         ],
//         "type": "number",
//         "width": 120,
//         "editable": true
//       },
//       {
//         "field": "isFilled",
//         "headerName": "Is Filled",
//         "align": "center",
//         "type": "boolean",
//         "width": 80,
//         "editable": true
//       },
//       {
//         "field": "status",
//         "headerName": "Status",
//         "type": "singleSelect",
//         "valueOptions": [
//           "Open",
//           "PartiallyFilled",
//           "Filled",
//           "Rejected"
//         ],
//         "width": 150,
//         "editable": true
//       },
//       {
//         "field": "unitPrice",
//         "headerName": "Unit Price",
//         "type": "number",
//         "editable": true
//       },
//       {
//         "field": "unitPriceCurrency",
//         "headerName": "Unit Price Currency",
//         "type": "singleSelect",
//         "valueOptions": [
//           "USD",
//           "GBP",
//           "JPY",
//           "EUR",
//           "BRL",
//           "MXN",
//           "AUD",
//           "CAD",
//           "NZD",
//           "ARS",
//           "CHF",
//           "THB",
//           "HKD",
//           "TRY"
//         ],
//         "width": 120,
//         "editable": true
//       },
//       {
//         "field": "incoTerm",
//         "type": "singleSelect",
//         "valueOptions": [
//           "EXW (Ex Works)",
//           "FAS (Free Alongside Ship)",
//           "FCA (Free Carrier)",
//           "CPT (Carriage Paid To)",
//           "DAP (Delivered at Place)",
//           "DPU (Delivered at Place Unloaded)",
//           "DDP (Delivered Duty Paid)"
//         ],
//         "editable": true
//       },
//       {
//         "field": "maturityDate",
//         "headerName": "Maturity Date",
//         "type": "date",
//         "editable": true
//       },
//       {
//         "field": "tradeDate",
//         "headerName": "Trade Date",
//         "type": "date",
//         "editable": true
//       },

//       {
//         "field": "counterPartyCountry",
//         "headerName": "Counterparty Country",
//         "type": "singleSelect",
//         "valueOptions": [
//           {
//             "value": "AF",
//             "code": "AF",
//             "label": "Afghanistan",
//             "phone": "93"
//           },
//           {
//             "value": "AL",
//             "code": "AL",
//             "label": "Albania",
//             "phone": "355"
//           },
//           {
//             "value": "DZ",
//             "code": "DZ",
//             "label": "Algeria",
//             "phone": "213"
//           },
//           {
//             "value": "AX",
//             "code": "AX",
//             "label": "Alland Islands",
//             "phone": "358"
//           },
//           {
//             "value": "AS",
//             "code": "AS",
//             "label": "American Samoa",
//             "phone": "1-684"
//           },
//           {
//             "value": "AD",
//             "code": "AD",
//             "label": "Andorra",
//             "phone": "376"
//           },
//           {
//             "value": "AO",
//             "code": "AO",
//             "label": "Angola",
//             "phone": "244"
//           },
//           {
//             "value": "AI",
//             "code": "AI",
//             "label": "Anguilla",
//             "phone": "1-264"
//           },
//           {
//             "value": "AQ",
//             "code": "AQ",
//             "label": "Antarctica",
//             "phone": "672"
//           },
//           {
//             "value": "AG",
//             "code": "AG",
//             "label": "Antigua and Barbuda",
//             "phone": "1-268"
//           },
//           {
//             "value": "AR",
//             "code": "AR",
//             "label": "Argentina",
//             "phone": "54"
//           },
//           {
//             "value": "AM",
//             "code": "AM",
//             "label": "Armenia",
//             "phone": "374"
//           },
//           {
//             "value": "AW",
//             "code": "AW",
//             "label": "Aruba",
//             "phone": "297"
//           },
//           {
//             "value": "AU",
//             "code": "AU",
//             "label": "Australia",
//             "phone": "61",
//             "suggested": true
//           },
//           {
//             "value": "AT",
//             "code": "AT",
//             "label": "Austria",
//             "phone": "43"
//           },
//           {
//             "value": "AZ",
//             "code": "AZ",
//             "label": "Azerbaijan",
//             "phone": "994"
//           },
//           {
//             "value": "BS",
//             "code": "BS",
//             "label": "Bahamas",
//             "phone": "1-242"
//           },
//           {
//             "value": "BH",
//             "code": "BH",
//             "label": "Bahrain",
//             "phone": "973"
//           },
//           {
//             "value": "BD",
//             "code": "BD",
//             "label": "Bangladesh",
//             "phone": "880"
//           },
//           {
//             "value": "BB",
//             "code": "BB",
//             "label": "Barbados",
//             "phone": "1-246"
//           },
//           {
//             "value": "BY",
//             "code": "BY",
//             "label": "Belarus",
//             "phone": "375"
//           },
//           {
//             "value": "BE",
//             "code": "BE",
//             "label": "Belgium",
//             "phone": "32"
//           },
//           {
//             "value": "BZ",
//             "code": "BZ",
//             "label": "Belize",
//             "phone": "501"
//           },
//           {
//             "value": "BJ",
//             "code": "BJ",
//             "label": "Benin",
//             "phone": "229"
//           },
//           {
//             "value": "BM",
//             "code": "BM",
//             "label": "Bermuda",
//             "phone": "1-441"
//           },
//           {
//             "value": "BT",
//             "code": "BT",
//             "label": "Bhutan",
//             "phone": "975"
//           },
//           {
//             "value": "BO",
//             "code": "BO",
//             "label": "Bolivia",
//             "phone": "591"
//           },
//           {
//             "value": "BA",
//             "code": "BA",
//             "label": "Bosnia and Herzegovina",
//             "phone": "387"
//           },
//           {
//             "value": "BW",
//             "code": "BW",
//             "label": "Botswana",
//             "phone": "267"
//           },
//           {
//             "value": "BV",
//             "code": "BV",
//             "label": "Bouvet Island",
//             "phone": "47"
//           },
//           {
//             "value": "BR",
//             "code": "BR",
//             "label": "Brazil",
//             "phone": "55"
//           },
//           {
//             "value": "IO",
//             "code": "IO",
//             "label": "British Indian Ocean Territory",
//             "phone": "246"
//           },
//           {
//             "value": "VG",
//             "code": "VG",
//             "label": "British Virgin Islands",
//             "phone": "1-284"
//           },
//           {
//             "value": "BN",
//             "code": "BN",
//             "label": "Brunei Darussalam",
//             "phone": "673"
//           },
//           {
//             "value": "BG",
//             "code": "BG",
//             "label": "Bulgaria",
//             "phone": "359"
//           },
//           {
//             "value": "BF",
//             "code": "BF",
//             "label": "Burkina Faso",
//             "phone": "226"
//           },
//           {
//             "value": "BI",
//             "code": "BI",
//             "label": "Burundi",
//             "phone": "257"
//           },
//           {
//             "value": "KH",
//             "code": "KH",
//             "label": "Cambodia",
//             "phone": "855"
//           },
//           {
//             "value": "CM",
//             "code": "CM",
//             "label": "Cameroon",
//             "phone": "237"
//           },
//           {
//             "value": "CA",
//             "code": "CA",
//             "label": "Canada",
//             "phone": "1",
//             "suggested": true
//           },
//           {
//             "value": "CV",
//             "code": "CV",
//             "label": "Cape Verde",
//             "phone": "238"
//           },
//           {
//             "value": "KY",
//             "code": "KY",
//             "label": "Cayman Islands",
//             "phone": "1-345"
//           },
//           {
//             "value": "CF",
//             "code": "CF",
//             "label": "Central African Republic",
//             "phone": "236"
//           },
//           {
//             "value": "TD",
//             "code": "TD",
//             "label": "Chad",
//             "phone": "235"
//           },
//           {
//             "value": "CL",
//             "code": "CL",
//             "label": "Chile",
//             "phone": "56"
//           },
//           {
//             "value": "CN",
//             "code": "CN",
//             "label": "China",
//             "phone": "86"
//           },
//           {
//             "value": "CX",
//             "code": "CX",
//             "label": "Christmas Island",
//             "phone": "61"
//           },
//           {
//             "value": "CC",
//             "code": "CC",
//             "label": "Cocos (Keeling) Islands",
//             "phone": "61"
//           },
//           {
//             "value": "CO",
//             "code": "CO",
//             "label": "Colombia",
//             "phone": "57"
//           },
//           {
//             "value": "KM",
//             "code": "KM",
//             "label": "Comoros",
//             "phone": "269"
//           },
//           {
//             "value": "CD",
//             "code": "CD",
//             "label": "Congo, Democratic Republic of the",
//             "phone": "243"
//           },
//           {
//             "value": "CG",
//             "code": "CG",
//             "label": "Congo, Republic of the",
//             "phone": "242"
//           },
//           {
//             "value": "CK",
//             "code": "CK",
//             "label": "Cook Islands",
//             "phone": "682"
//           },
//           {
//             "value": "CR",
//             "code": "CR",
//             "label": "Costa Rica",
//             "phone": "506"
//           },
//           {
//             "value": "CI",
//             "code": "CI",
//             "label": "Cote d'Ivoire",
//             "phone": "225"
//           },
//           {
//             "value": "HR",
//             "code": "HR",
//             "label": "Croatia",
//             "phone": "385"
//           },
//           {
//             "value": "CU",
//             "code": "CU",
//             "label": "Cuba",
//             "phone": "53"
//           },
//           {
//             "value": "CW",
//             "code": "CW",
//             "label": "Curacao",
//             "phone": "599"
//           },
//           {
//             "value": "CY",
//             "code": "CY",
//             "label": "Cyprus",
//             "phone": "357"
//           },
//           {
//             "value": "CZ",
//             "code": "CZ",
//             "label": "Czech Republic",
//             "phone": "420"
//           },
//           {
//             "value": "DK",
//             "code": "DK",
//             "label": "Denmark",
//             "phone": "45"
//           },
//           {
//             "value": "DJ",
//             "code": "DJ",
//             "label": "Djibouti",
//             "phone": "253"
//           },
//           {
//             "value": "DM",
//             "code": "DM",
//             "label": "Dominica",
//             "phone": "1-767"
//           },
//           {
//             "value": "DO",
//             "code": "DO",
//             "label": "Dominican Republic",
//             "phone": "1-809"
//           },
//           {
//             "value": "EC",
//             "code": "EC",
//             "label": "Ecuador",
//             "phone": "593"
//           },
//           {
//             "value": "EG",
//             "code": "EG",
//             "label": "Egypt",
//             "phone": "20"
//           },
//           {
//             "value": "SV",
//             "code": "SV",
//             "label": "El Salvador",
//             "phone": "503"
//           },
//           {
//             "value": "GQ",
//             "code": "GQ",
//             "label": "Equatorial Guinea",
//             "phone": "240"
//           },
//           {
//             "value": "ER",
//             "code": "ER",
//             "label": "Eritrea",
//             "phone": "291"
//           },
//           {
//             "value": "EE",
//             "code": "EE",
//             "label": "Estonia",
//             "phone": "372"
//           },
//           {
//             "value": "ET",
//             "code": "ET",
//             "label": "Ethiopia",
//             "phone": "251"
//           },
//           {
//             "value": "FK",
//             "code": "FK",
//             "label": "Falkland Islands (Malvinas)",
//             "phone": "500"
//           },
//           {
//             "value": "FO",
//             "code": "FO",
//             "label": "Faroe Islands",
//             "phone": "298"
//           },
//           {
//             "value": "FJ",
//             "code": "FJ",
//             "label": "Fiji",
//             "phone": "679"
//           },
//           {
//             "value": "FI",
//             "code": "FI",
//             "label": "Finland",
//             "phone": "358"
//           },
//           {
//             "value": "FR",
//             "code": "FR",
//             "label": "France",
//             "phone": "33",
//             "suggested": true
//           },
//           {
//             "value": "GF",
//             "code": "GF",
//             "label": "French Guiana",
//             "phone": "594"
//           },
//           {
//             "value": "PF",
//             "code": "PF",
//             "label": "French Polynesia",
//             "phone": "689"
//           },
//           {
//             "value": "TF",
//             "code": "TF",
//             "label": "French Southern Territories",
//             "phone": "262"
//           },
//           {
//             "value": "GA",
//             "code": "GA",
//             "label": "Gabon",
//             "phone": "241"
//           },
//           {
//             "value": "GM",
//             "code": "GM",
//             "label": "Gambia",
//             "phone": "220"
//           },
//           {
//             "value": "GE",
//             "code": "GE",
//             "label": "Georgia",
//             "phone": "995"
//           },
//           {
//             "value": "DE",
//             "code": "DE",
//             "label": "Germany",
//             "phone": "49",
//             "suggested": true
//           },
//           {
//             "value": "GH",
//             "code": "GH",
//             "label": "Ghana",
//             "phone": "233"
//           },
//           {
//             "value": "GI",
//             "code": "GI",
//             "label": "Gibraltar",
//             "phone": "350"
//           },
//           {
//             "value": "GR",
//             "code": "GR",
//             "label": "Greece",
//             "phone": "30"
//           },
//           {
//             "value": "GL",
//             "code": "GL",
//             "label": "Greenland",
//             "phone": "299"
//           },
//           {
//             "value": "GD",
//             "code": "GD",
//             "label": "Grenada",
//             "phone": "1-473"
//           },
//           {
//             "value": "GP",
//             "code": "GP",
//             "label": "Guadeloupe",
//             "phone": "590"
//           },
//           {
//             "value": "GU",
//             "code": "GU",
//             "label": "Guam",
//             "phone": "1-671"
//           },
//           {
//             "value": "GT",
//             "code": "GT",
//             "label": "Guatemala",
//             "phone": "502"
//           },
//           {
//             "value": "GG",
//             "code": "GG",
//             "label": "Guernsey",
//             "phone": "44"
//           },
//           {
//             "value": "GN",
//             "code": "GN",
//             "label": "Guinea",
//             "phone": "224"
//           },
//           {
//             "value": "GW",
//             "code": "GW",
//             "label": "Guinea-Bissau",
//             "phone": "245"
//           },
//           {
//             "value": "GY",
//             "code": "GY",
//             "label": "Guyana",
//             "phone": "592"
//           },
//           {
//             "value": "HT",
//             "code": "HT",
//             "label": "Haiti",
//             "phone": "509"
//           },
//           {
//             "value": "HM",
//             "code": "HM",
//             "label": "Heard Island and McDonald Islands",
//             "phone": "672"
//           },
//           {
//             "value": "VA",
//             "code": "VA",
//             "label": "Holy See (Vatican City State)",
//             "phone": "379"
//           },
//           {
//             "value": "HN",
//             "code": "HN",
//             "label": "Honduras",
//             "phone": "504"
//           },
//           {
//             "value": "HK",
//             "code": "HK",
//             "label": "Hong Kong",
//             "phone": "852"
//           },
//           {
//             "value": "HU",
//             "code": "HU",
//             "label": "Hungary",
//             "phone": "36"
//           },
//           {
//             "value": "IS",
//             "code": "IS",
//             "label": "Iceland",
//             "phone": "354"
//           },
//           {
//             "value": "IN",
//             "code": "IN",
//             "label": "India",
//             "phone": "91"
//           },
//           {
//             "value": "ID",
//             "code": "ID",
//             "label": "Indonesia",
//             "phone": "62"
//           },
//           {
//             "value": "IR",
//             "code": "IR",
//             "label": "Iran, Islamic Republic of",
//             "phone": "98"
//           },
//           {
//             "value": "IQ",
//             "code": "IQ",
//             "label": "Iraq",
//             "phone": "964"
//           },
//           {
//             "value": "IE",
//             "code": "IE",
//             "label": "Ireland",
//             "phone": "353"
//           },
//           {
//             "value": "IM",
//             "code": "IM",
//             "label": "Isle of Man",
//             "phone": "44"
//           },
//           {
//             "value": "IL",
//             "code": "IL",
//             "label": "Israel",
//             "phone": "972"
//           },
//           {
//             "value": "IT",
//             "code": "IT",
//             "label": "Italy",
//             "phone": "39"
//           },
//           {
//             "value": "JM",
//             "code": "JM",
//             "label": "Jamaica",
//             "phone": "1-876"
//           },
//           {
//             "value": "JP",
//             "code": "JP",
//             "label": "Japan",
//             "phone": "81",
//             "suggested": true
//           },
//           {
//             "value": "JE",
//             "code": "JE",
//             "label": "Jersey",
//             "phone": "44"
//           },
//           {
//             "value": "JO",
//             "code": "JO",
//             "label": "Jordan",
//             "phone": "962"
//           },
//           {
//             "value": "KZ",
//             "code": "KZ",
//             "label": "Kazakhstan",
//             "phone": "7"
//           },
//           {
//             "value": "KE",
//             "code": "KE",
//             "label": "Kenya",
//             "phone": "254"
//           },
//           {
//             "value": "KI",
//             "code": "KI",
//             "label": "Kiribati",
//             "phone": "686"
//           },
//           {
//             "value": "KP",
//             "code": "KP",
//             "label": "Korea, Democratic People's Republic of",
//             "phone": "850"
//           },
//           {
//             "value": "KR",
//             "code": "KR",
//             "label": "Korea, Republic of",
//             "phone": "82"
//           },
//           {
//             "value": "XK",
//             "code": "XK",
//             "label": "Kosovo",
//             "phone": "383"
//           },
//           {
//             "value": "KW",
//             "code": "KW",
//             "label": "Kuwait",
//             "phone": "965"
//           },
//           {
//             "value": "KG",
//             "code": "KG",
//             "label": "Kyrgyzstan",
//             "phone": "996"
//           },
//           {
//             "value": "LA",
//             "code": "LA",
//             "label": "Lao People's Democratic Republic",
//             "phone": "856"
//           },
//           {
//             "value": "LV",
//             "code": "LV",
//             "label": "Latvia",
//             "phone": "371"
//           },
//           {
//             "value": "LB",
//             "code": "LB",
//             "label": "Lebanon",
//             "phone": "961"
//           },
//           {
//             "value": "LS",
//             "code": "LS",
//             "label": "Lesotho",
//             "phone": "266"
//           },
//           {
//             "value": "LR",
//             "code": "LR",
//             "label": "Liberia",
//             "phone": "231"
//           },
//           {
//             "value": "LY",
//             "code": "LY",
//             "label": "Libya",
//             "phone": "218"
//           },
//           {
//             "value": "LI",
//             "code": "LI",
//             "label": "Liechtenstein",
//             "phone": "423"
//           },
//           {
//             "value": "LT",
//             "code": "LT",
//             "label": "Lithuania",
//             "phone": "370"
//           },
//           {
//             "value": "LU",
//             "code": "LU",
//             "label": "Luxembourg",
//             "phone": "352"
//           },
//           {
//             "value": "MO",
//             "code": "MO",
//             "label": "Macao",
//             "phone": "853"
//           },
//           {
//             "value": "MK",
//             "code": "MK",
//             "label": "Macedonia, the Former Yugoslav Republic of",
//             "phone": "389"
//           },
//           {
//             "value": "MG",
//             "code": "MG",
//             "label": "Madagascar",
//             "phone": "261"
//           },
//           {
//             "value": "MW",
//             "code": "MW",
//             "label": "Malawi",
//             "phone": "265"
//           },
//           {
//             "value": "MY",
//             "code": "MY",
//             "label": "Malaysia",
//             "phone": "60"
//           },
//           {
//             "value": "MV",
//             "code": "MV",
//             "label": "Maldives",
//             "phone": "960"
//           },
//           {
//             "value": "ML",
//             "code": "ML",
//             "label": "Mali",
//             "phone": "223"
//           },
//           {
//             "value": "MT",
//             "code": "MT",
//             "label": "Malta",
//             "phone": "356"
//           },
//           {
//             "value": "MH",
//             "code": "MH",
//             "label": "Marshall Islands",
//             "phone": "692"
//           },
//           {
//             "value": "MQ",
//             "code": "MQ",
//             "label": "Martinique",
//             "phone": "596"
//           },
//           {
//             "value": "MR",
//             "code": "MR",
//             "label": "Mauritania",
//             "phone": "222"
//           },
//           {
//             "value": "MU",
//             "code": "MU",
//             "label": "Mauritius",
//             "phone": "230"
//           },
//           {
//             "value": "YT",
//             "code": "YT",
//             "label": "Mayotte",
//             "phone": "262"
//           },
//           {
//             "value": "MX",
//             "code": "MX",
//             "label": "Mexico",
//             "phone": "52"
//           },
//           {
//             "value": "FM",
//             "code": "FM",
//             "label": "Micronesia, Federated States of",
//             "phone": "691"
//           },
//           {
//             "value": "MD",
//             "code": "MD",
//             "label": "Moldova, Republic of",
//             "phone": "373"
//           },
//           {
//             "value": "MC",
//             "code": "MC",
//             "label": "Monaco",
//             "phone": "377"
//           },
//           {
//             "value": "MN",
//             "code": "MN",
//             "label": "Mongolia",
//             "phone": "976"
//           },
//           {
//             "value": "ME",
//             "code": "ME",
//             "label": "Montenegro",
//             "phone": "382"
//           },
//           {
//             "value": "MS",
//             "code": "MS",
//             "label": "Montserrat",
//             "phone": "1-664"
//           },
//           {
//             "value": "MA",
//             "code": "MA",
//             "label": "Morocco",
//             "phone": "212"
//           },
//           {
//             "value": "MZ",
//             "code": "MZ",
//             "label": "Mozambique",
//             "phone": "258"
//           },
//           {
//             "value": "MM",
//             "code": "MM",
//             "label": "Myanmar",
//             "phone": "95"
//           },
//           {
//             "value": "NA",
//             "code": "NA",
//             "label": "Namibia",
//             "phone": "264"
//           },
//           {
//             "value": "NR",
//             "code": "NR",
//             "label": "Nauru",
//             "phone": "674"
//           },
//           {
//             "value": "NP",
//             "code": "NP",
//             "label": "Nepal",
//             "phone": "977"
//           },
//           {
//             "value": "NL",
//             "code": "NL",
//             "label": "Netherlands",
//             "phone": "31"
//           },
//           {
//             "value": "NC",
//             "code": "NC",
//             "label": "New Caledonia",
//             "phone": "687"
//           },
//           {
//             "value": "NZ",
//             "code": "NZ",
//             "label": "New Zealand",
//             "phone": "64"
//           },
//           {
//             "value": "NI",
//             "code": "NI",
//             "label": "Nicaragua",
//             "phone": "505"
//           },
//           {
//             "value": "NE",
//             "code": "NE",
//             "label": "Niger",
//             "phone": "227"
//           },
//           {
//             "value": "NG",
//             "code": "NG",
//             "label": "Nigeria",
//             "phone": "234"
//           },
//           {
//             "value": "NU",
//             "code": "NU",
//             "label": "Niue",
//             "phone": "683"
//           },
//           {
//             "value": "NF",
//             "code": "NF",
//             "label": "Norfolk Island",
//             "phone": "672"
//           },
//           {
//             "value": "MP",
//             "code": "MP",
//             "label": "Northern Mariana Islands",
//             "phone": "1-670"
//           },
//           {
//             "value": "NO",
//             "code": "NO",
//             "label": "Norway",
//             "phone": "47"
//           },
//           {
//             "value": "OM",
//             "code": "OM",
//             "label": "Oman",
//             "phone": "968"
//           },
//           {
//             "value": "PK",
//             "code": "PK",
//             "label": "Pakistan",
//             "phone": "92"
//           },
//           {
//             "value": "PW",
//             "code": "PW",
//             "label": "Palau",
//             "phone": "680"
//           },
//           {
//             "value": "PS",
//             "code": "PS",
//             "label": "Palestine, State of",
//             "phone": "970"
//           },
//           {
//             "value": "PA",
//             "code": "PA",
//             "label": "Panama",
//             "phone": "507"
//           },
//           {
//             "value": "PG",
//             "code": "PG",
//             "label": "Papua New Guinea",
//             "phone": "675"
//           },
//           {
//             "value": "PY",
//             "code": "PY",
//             "label": "Paraguay",
//             "phone": "595"
//           },
//           {
//             "value": "PE",
//             "code": "PE",
//             "label": "Peru",
//             "phone": "51"
//           },
//           {
//             "value": "PH",
//             "code": "PH",
//             "label": "Philippines",
//             "phone": "63"
//           },
//           {
//             "value": "PN",
//             "code": "PN",
//             "label": "Pitcairn",
//             "phone": "870"
//           },
//           {
//             "value": "PL",
//             "code": "PL",
//             "label": "Poland",
//             "phone": "48"
//           },
//           {
//             "value": "PT",
//             "code": "PT",
//             "label": "Portugal",
//             "phone": "351"
//           },
//           {
//             "value": "PR",
//             "code": "PR",
//             "label": "Puerto Rico",
//             "phone": "1"
//           },
//           {
//             "value": "QA",
//             "code": "QA",
//             "label": "Qatar",
//             "phone": "974"
//           },
//           {
//             "value": "RE",
//             "code": "RE",
//             "label": "Reunion",
//             "phone": "262"
//           },
//           {
//             "value": "RO",
//             "code": "RO",
//             "label": "Romania",
//             "phone": "40"
//           },
//           {
//             "value": "RU",
//             "code": "RU",
//             "label": "Russian Federation",
//             "phone": "7"
//           },
//           {
//             "value": "RW",
//             "code": "RW",
//             "label": "Rwanda",
//             "phone": "250"
//           },
//           {
//             "value": "BL",
//             "code": "BL",
//             "label": "Saint Barthelemy",
//             "phone": "590"
//           },
//           {
//             "value": "SH",
//             "code": "SH",
//             "label": "Saint Helena",
//             "phone": "290"
//           },
//           {
//             "value": "KN",
//             "code": "KN",
//             "label": "Saint Kitts and Nevis",
//             "phone": "1-869"
//           },
//           {
//             "value": "LC",
//             "code": "LC",
//             "label": "Saint Lucia",
//             "phone": "1-758"
//           },
//           {
//             "value": "MF",
//             "code": "MF",
//             "label": "Saint Martin (French part)",
//             "phone": "590"
//           },
//           {
//             "value": "PM",
//             "code": "PM",
//             "label": "Saint Pierre and Miquelon",
//             "phone": "508"
//           },
//           {
//             "value": "VC",
//             "code": "VC",
//             "label": "Saint Vincent and the Grenadines",
//             "phone": "1-784"
//           },
//           {
//             "value": "WS",
//             "code": "WS",
//             "label": "Samoa",
//             "phone": "685"
//           },
//           {
//             "value": "SM",
//             "code": "SM",
//             "label": "San Marino",
//             "phone": "378"
//           },
//           {
//             "value": "ST",
//             "code": "ST",
//             "label": "Sao Tome and Principe",
//             "phone": "239"
//           },
//           {
//             "value": "SA",
//             "code": "SA",
//             "label": "Saudi Arabia",
//             "phone": "966"
//           },
//           {
//             "value": "SN",
//             "code": "SN",
//             "label": "Senegal",
//             "phone": "221"
//           },
//           {
//             "value": "RS",
//             "code": "RS",
//             "label": "Serbia",
//             "phone": "381"
//           },
//           {
//             "value": "SC",
//             "code": "SC",
//             "label": "Seychelles",
//             "phone": "248"
//           },
//           {
//             "value": "SL",
//             "code": "SL",
//             "label": "Sierra Leone",
//             "phone": "232"
//           },
//           {
//             "value": "SG",
//             "code": "SG",
//             "label": "Singapore",
//             "phone": "65"
//           },
//           {
//             "value": "SX",
//             "code": "SX",
//             "label": "Sint Maarten (Dutch part)",
//             "phone": "1-721"
//           },
//           {
//             "value": "SK",
//             "code": "SK",
//             "label": "Slovakia",
//             "phone": "421"
//           },
//           {
//             "value": "SI",
//             "code": "SI",
//             "label": "Slovenia",
//             "phone": "386"
//           },
//           {
//             "value": "SB",
//             "code": "SB",
//             "label": "Solomon Islands",
//             "phone": "677"
//           },
//           {
//             "value": "SO",
//             "code": "SO",
//             "label": "Somalia",
//             "phone": "252"
//           },
//           {
//             "value": "ZA",
//             "code": "ZA",
//             "label": "South Africa",
//             "phone": "27"
//           },
//           {
//             "value": "GS",
//             "code": "GS",
//             "label": "South Georgia and the South Sandwich Islands",
//             "phone": "500"
//           },
//           {
//             "value": "SS",
//             "code": "SS",
//             "label": "South Sudan",
//             "phone": "211"
//           },
//           {
//             "value": "ES",
//             "code": "ES",
//             "label": "Spain",
//             "phone": "34"
//           },
//           {
//             "value": "LK",
//             "code": "LK",
//             "label": "Sri Lanka",
//             "phone": "94"
//           },
//           {
//             "value": "SD",
//             "code": "SD",
//             "label": "Sudan",
//             "phone": "249"
//           },
//           {
//             "value": "SR",
//             "code": "SR",
//             "label": "Suriname",
//             "phone": "597"
//           },
//           {
//             "value": "SJ",
//             "code": "SJ",
//             "label": "Svalbard and Jan Mayen",
//             "phone": "47"
//           },
//           {
//             "value": "SZ",
//             "code": "SZ",
//             "label": "Swaziland",
//             "phone": "268"
//           },
//           {
//             "value": "SE",
//             "code": "SE",
//             "label": "Sweden",
//             "phone": "46"
//           },
//           {
//             "value": "CH",
//             "code": "CH",
//             "label": "Switzerland",
//             "phone": "41"
//           },
//           {
//             "value": "SY",
//             "code": "SY",
//             "label": "Syrian Arab Republic",
//             "phone": "963"
//           },
//           {
//             "value": "TW",
//             "code": "TW",
//             "label": "Taiwan, Province of China",
//             "phone": "886"
//           },
//           {
//             "value": "TJ",
//             "code": "TJ",
//             "label": "Tajikistan",
//             "phone": "992"
//           },
//           {
//             "value": "TH",
//             "code": "TH",
//             "label": "Thailand",
//             "phone": "66"
//           },
//           {
//             "value": "TL",
//             "code": "TL",
//             "label": "Timor-Leste",
//             "phone": "670"
//           },
//           {
//             "value": "TG",
//             "code": "TG",
//             "label": "Togo",
//             "phone": "228"
//           },
//           {
//             "value": "TK",
//             "code": "TK",
//             "label": "Tokelau",
//             "phone": "690"
//           },
//           {
//             "value": "TO",
//             "code": "TO",
//             "label": "Tonga",
//             "phone": "676"
//           },
//           {
//             "value": "TT",
//             "code": "TT",
//             "label": "Trinidad and Tobago",
//             "phone": "1-868"
//           },
//           {
//             "value": "TN",
//             "code": "TN",
//             "label": "Tunisia",
//             "phone": "216"
//           },
//           {
//             "value": "TR",
//             "code": "TR",
//             "label": "Turkey",
//             "phone": "90"
//           },
//           {
//             "value": "TM",
//             "code": "TM",
//             "label": "Turkmenistan",
//             "phone": "993"
//           },
//           {
//             "value": "TC",
//             "code": "TC",
//             "label": "Turks and Caicos Islands",
//             "phone": "1-649"
//           },
//           {
//             "value": "TV",
//             "code": "TV",
//             "label": "Tuvalu",
//             "phone": "688"
//           },
//           {
//             "value": "UG",
//             "code": "UG",
//             "label": "Uganda",
//             "phone": "256"
//           },
//           {
//             "value": "UA",
//             "code": "UA",
//             "label": "Ukraine",
//             "phone": "380"
//           },
//           {
//             "value": "AE",
//             "code": "AE",
//             "label": "United Arab Emirates",
//             "phone": "971"
//           },
//           {
//             "value": "GB",
//             "code": "GB",
//             "label": "United Kingdom",
//             "phone": "44"
//           },
//           {
//             "value": "TZ",
//             "code": "TZ",
//             "label": "United Republic of Tanzania",
//             "phone": "255"
//           },
//           {
//             "value": "US",
//             "code": "US",
//             "label": "United States",
//             "phone": "1",
//             "suggested": true
//           },
//           {
//             "value": "UY",
//             "code": "UY",
//             "label": "Uruguay",
//             "phone": "598"
//           },
//           {
//             "value": "VI",
//             "code": "VI",
//             "label": "US Virgin Islands",
//             "phone": "1-340"
//           },
//           {
//             "value": "UZ",
//             "code": "UZ",
//             "label": "Uzbekistan",
//             "phone": "998"
//           },
//           {
//             "value": "VU",
//             "code": "VU",
//             "label": "Vanuatu",
//             "phone": "678"
//           },
//           {
//             "value": "VE",
//             "code": "VE",
//             "label": "Venezuela",
//             "phone": "58"
//           },
//           {
//             "value": "VN",
//             "code": "VN",
//             "label": "Vietnam",
//             "phone": "84"
//           },
//           {
//             "value": "WF",
//             "code": "WF",
//             "label": "Wallis and Futuna",
//             "phone": "681"
//           },
//           {
//             "value": "EH",
//             "code": "EH",
//             "label": "Western Sahara",
//             "phone": "212"
//           },
//           {
//             "value": "YE",
//             "code": "YE",
//             "label": "Yemen",
//             "phone": "967"
//           },
//           {
//             "value": "ZM",
//             "code": "ZM",
//             "label": "Zambia",
//             "phone": "260"
//           },
//           {
//             "value": "ZW",
//             "code": "ZW",
//             "label": "Zimbabwe",
//             "phone": "263"
//           }
//         ],
//         "editable": true,
//         "width": 120
//       },
//       {
//         "field": "counterPartyCurrency",
//         "headerName": "Counterparty Currency",
//         "type": "singleSelect",
//         "valueOptions": [
//           "USD",
//           "GBP",
//           "JPY",
//           "EUR",
//           "BRL",
//           "MXN",
//           "AUD",
//           "CAD",
//           "NZD",
//           "ARS",
//           "CHF",
//           "THB",
//           "HKD",
//           "TRY"
//         ],
//         "editable": true
//       },
//       {
//         "field": "counterPartyAddress",
//         "headerName": "Counterparty Address",
//         "width": 200,
//         "editable": true
//       },
//       {
//         "field": "counterPartyCity",
//         "headerName": "Counterparty City",
//         "width": 120,
//         "editable": true
//       },
//       {
//         "field": "taxCode",
//         "headerName": "Tax Code",
//         "type": "singleSelect",
//         "valueOptions": [
//           "BR",
//           "1250L",
//           "20G",
//           "BC45",
//           "IGN179"
//         ],
//         "editable": true
//       },
//       {
//         "field": "contractType",
//         "headerName": "Contract Type",
//         "type": "singleSelect",
//         "valueOptions": [
//           "FP",
//           "TM",
//           "CR"
//         ],
//         "editable": true
//       },
//       {
//         "field": "rateType",
//         "headerName": "Rate Type",
//         "type": "singleSelect",
//         "valueOptions": [
//           "Fixed",
//           "Floating"
//         ],
//         "editable": true
//       },
//       {
//         "field": "lastUpdated",
//         "headerName": "Updated on",
//         "type": "dateTime",
//         "width": 180,
//         "editable": true
//       },
//       {
//         "field": "dateCreated",
//         "headerName": "Created on",
//         "type": "date",
//         "width": 150,
//         "editable": true
//       }
//     ],
//     "rows": [
//       {
//         "id": "679f7548-2e75-5e4e-8ac5-5ecc9f63274c",
//         "desk": "D-2972",
//         "commodity": "Rough Rice",
//         "traderName": "Maud Santos",
//         "traderEmail": "pit@sutaesu.cy",
//         "quantity": 42184,
//         "filledQuantity": 0.6645884695619192,
//         "isFilled": false,
//         "status": "Filled",
//         "unitPrice": 14.31,
//         "unitPriceCurrency": "MXN",
//         "feeRate": 0.169,
//         "incoTerm": "EXW (Ex Works)",
//         "pnl": 67343399.0684,
//         "maturityDate": "2023-07-15T21:02:30.887Z",
//         "tradeDate": "2023-02-27T14:00:29.603Z",
//         "brokerId": "b25e1933-bcfd-5777-8bb8-7e58449fdb4f",
//         "brokerName": "Dun & Bradstreet Inc.",
//         "counterPartyName": "Pittston Brinks Group",
//         "counterPartyCountry": {
//           "value": "FI",
//           "code": "FI",
//           "label": "Finland",
//           "phone": "358"
//         },
//         "counterPartyCurrency": "USD",
//         "counterPartyAddress": "1429 Inosi Key",
//         "counterPartyCity": "Waghikbo",
//         "taxCode": "20G",
//         "contractType": "FP",
//         "rateType": "Floating",
//         "lastUpdated": "2023-02-27T14:28:30.420Z",
//         "dateCreated": "2022-05-18T03:44:42.068Z"
//       },
//       {
//         "id": "6726bd55-0181-5461-a50f-34aeb8f70a10",
//         "desk": "D-2773",
//         "commodity": "Robusta coffee",
//         "traderName": "Hettie Shaw",
//         "traderEmail": "mauvci@nokzuve.er",
//         "quantity": 39046,
//         "filledQuantity": 0.3331967423039492,
//         "isFilled": false,
//         "status": "Open",
//         "unitPrice": 23.65,
//         "unitPriceCurrency": "CAD",
//         "feeRate": 0.214,
//         "incoTerm": "FCA (Free Carrier)",
//         "pnl": -50242012.6461,
//         "maturityDate": "2023-03-29T12:32:46.170Z",
//         "tradeDate": "2023-02-27T00:59:47.287Z",
//         "brokerId": "3e51377d-9ecf-5045-b9a0-d07f22104010",
//         "brokerName": "Scana Corp.",
//         "counterPartyName": "Beazer Homes USA, Inc.",
//         "counterPartyCountry": {
//           "value": "CW",
//           "code": "CW",
//           "label": "Curacao",
//           "phone": "599"
//         },
//         "counterPartyCurrency": "CHF",
//         "counterPartyAddress": "689 Lisfi Junction",
//         "counterPartyCity": "Ojabidre",
//         "taxCode": "20G",
//         "contractType": "FP",
//         "rateType": "Fixed",
//         "lastUpdated": "2023-02-27T06:50:56.100Z",
//         "dateCreated": "2022-04-25T22:39:12.875Z"
//       }
//     ],
//     "initialState": {
//       "columns": {
//         "columnVisibilityModel": {
//           "id": false,
//           "brokerId": false
//         }
//       }
//     }
//   }
export default DepositTable;
