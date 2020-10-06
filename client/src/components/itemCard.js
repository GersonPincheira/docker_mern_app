import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NumberFormat from "react-number-format";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 250,
    backgroundSize: "75%",
  },
  title: {
    fontWeight: 600,
    paddingRight: 5,
  },
  content: {
    display: "flex",
  },
  price: {
    color: "#565656",
    marginRight: "10px"
  },
  sale: {
    width: "35px",
    borderRadius: "16px",
    backgroundColor: "#de1c24",
    fontSize: "14px",
    fontWeight: 700,
    textAlign: "center",
    color: "#fff",
  },
  rootPrice:{
    display:"flex",
    alignItems:"center"
  }
});

const ItemCard = (props) => {
  const classes = useStyles();
  const { brand, description, image, price, sale } = props.info;
  const salePrice = () => {
    if (sale) return <div className={classes.sale}>{sale}</div>;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"http://" + image}
          title={brand}
        />
        <CardContent>
          <div className={classes.content}>
            <div className={classes.title}>{brand}</div>
            <div>{description}</div>
          </div>
          <div className={classes.rootPrice}>
            <h2 className={classes.price}>
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                thousandSeparator={"."}
                decimalSeparator={","}
              />
            </h2>
            {salePrice()}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
