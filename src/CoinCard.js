import "./index.css";
import App from "./App";
import ReactDOM from 'react-dom/client';
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import {HiRefresh} from "react-icons/hi"
import {
  LineChart,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { CodeOff, WindowSharp } from "@mui/icons-material";
export default function CoinCard(props) {
  const data = [
    {
      key: "1W",
      value: props.coin.priceChange1d,
    },
    {
      key: "1D",
      value: props.coin.priceChange1d,
    },
    {
      key: "1H",
      value: props.coin.priceChange1h,
    },
  ];
  return (
    <Card style={{ width: "100%", height: "100%", background: "black"}}>
      <CardMedia
        style={{
          width: "100px",
          height: "100px",
          justifyContent: "center",
          display: "flex",
          alignContent: "center",
          marginLeft: "auto",
          marginRight: "auto"
        }}
        component="img"
        image={props.image}
      />
      <CardHeader
        title={props.coin.symbol}
        titleTypographyProps={{ align: "center", color: "#009879" }}
        sx={{ mt: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <ResponsiveContainer width="100%" aspect={3} style = {{marginLeft: "auto",marginRight: "auto"}}>
          <LineChart data={data} width="800px" heigh="200px"
                     margin={{top: 5, right: 30, left:20, bottom: 5}}>
            <XAxis dataKey="key" />
            <YAxis dataKey="value" />
            <Line
              type="monotone"
              dataKey="value"
              strok="white"
              dot ={false}
            />
          </LineChart>
        </ResponsiveContainer>
       
        <table style={{fontSize:"20px" }}>
          <tbody style={{ alignContent: "center"}}>
            <tr>
              <td style={{ color: "#009879"}}>Name: </td><td>{props.coin.name}</td>
              <td style={{ color: "#009879"}}>Volume:</td> <td>${(props.coin.volume/1000000).toFixed(0)}M</td>
            </tr>
            <tr>
              <td style={{ color: "#009879"}}>Price: </td><td>${props.coin.price.toFixed(6)}</td>
              <td style={{ color: "#009879"}}>Total Supply:</td> <td>{(props.coin.totalSupply/1000000).toFixed(0)}M</td>
            </tr>
            <tr>
              <td style={{ color: "#009879"}}>Symbol: </td><td>{props.coin.symbol}</td>
              <td style={{ color: "#009879"}}>Market Cap:</td><td> ${(props.coin.marketCap/1000000).toFixed(0)}M</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ px: 6, mx: "auto" }}
          style={{ background: "#009879" }}
          onClick = {()=>{const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>
          );}}
        >
          <HiRefresh size={20}/>
        </Button>
      </CardActions>
    </Card>
  );
}
