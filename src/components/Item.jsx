import React, { useState, useContext, useEffect } from "react";
import "../css/Item.css";
import { CartContext } from "../contexts/CartContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "@material-ui/core/";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    margin: "1rem",
  },
  media: {
    height: 140,
  },
});

export default function Item(props) {
  const { addItemToCart } = useContext(CartContext);
  const [btnDiabled, setBtnDisabled] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setBtnDisabled(props.disabled);
  }, [props]);
  function handelHover(e) {
    e.target.style.borderTop = "5px solid #2c3e50";
  }
  function handelHoverRemove(e) {
    e.target.style.borderTop = 0;
  }
  function handelAddToCart() {
    addItemToCart(props.id, 1);
  }
  return (
    // <div className="item">
    //   <img src={props.img} alt="item" />
    //   <p className="productName">
    //     <a href={props.url}>{props.name}</a>
    //   </p>
    //   <p className="price">{"$" + props.price + ".00"}</p>
    // </div>

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          onMouseOver={handelHover}
          onMouseLeave={handelHoverRemove}
          className={classes.media}
          image={props.img}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Link href={props.url}>{props.name}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="medium" color="primary">
          ${props.price}.00
        </Button>
        <Button
          onClick={handelAddToCart}
          size="small"
          color="primary"
          disabled={btnDiabled}
          style={{ backgroundColor: "lightgray" }}
        >
          {btnDiabled ? "Already Added" : "Add To Cart"}
        </Button>
      </CardActions>
    </Card>
  );
}
