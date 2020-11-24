import React, { useState, useContext } from "react";
import "../css/Loginpage.css";
import { Redirect } from "react-router-dom";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
import Loader from "../components/Loader";
import { Avatar } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { ShoppingCart } from "@material-ui/icons/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { firestore, auth } from "../services/firebase";
import cogoToast from "cogo-toast";
import shortid from "shortid";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Loginpage() {
  const { user } = useContext(AuthunticateContext);
  const [showloader, setShowLoader] = useState(() => {
    return false;
  });
  const [productUrl, setProductUrl] = useState(() => {
    return "";
  });
  const [productDescription, setProductDescription] = useState(() => {
    return "";
  });
  const [productName, setProductName] = useState(() => {
    return "";
  });
  const [productPrice, setProductPrice] = useState(() => {
    return 0;
  });
  const classes = useStyles();
  return !user ? (
    <Redirect to="/login" />
  ) : (
    <Container component="main" maxWidth="xs" style={{ marginTop: "7rem" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ShoppingCart />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Item
        </Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={productUrl}
            id="ProductUrl"
            label="Product Url "
            name="ProductUrl"
            autoComplete="ProductUrl"
            aria-required="true"
            autoFocus
            onChange={handelProductUrlChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={productName}
            name="ProductName"
            label="Product Name"
            type="text"
            aria-required="true"
            id="ProductName"
            autoComplete="current-ProductName"
            onChange={handelProductNameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={productPrice}
            name="ProductPrice"
            label="Product Price In $"
            type="number"
            aria-required="true"
            id="ProductPrice"
            autoComplete="current-ProductPrice"
            onChange={handelProductPriceChange}
          />
          <TextField
            id="itemDescription"
            label="About Product"
            required
            aria-required="true"
            type="text"
            multiline
            rows={2}
            value={productDescription}
            onChange={handelProductDesChange}
            rowsMax={5}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Item
          </Button>

          <Loader hide={!showloader} />
        </form>
      </div>
    </Container>
  );

  function handelProductUrlChange(e) {
    setProductUrl(e.target.value);
  }

  function handelProductNameChange(e) {
    setProductName(e.target.value);
  }
  function handelProductPriceChange(e) {
    setProductPrice(e.target.value);
  }
  function handelProductDesChange(e) {
    setProductDescription(e.target.value);
  }

  function handelSubmit(e) {
    e.preventDefault();
    setShowLoader(true);
    setTimeout(async (e) => {
      let itemsRef = firestore().collection("items");
      let id = shortid.generate();
      let dataToAdd = {
        id: id,
        userid: auth().currentUser.uid,
        productName: productName,
        productImg: productUrl,
        productPrice: productPrice,
        productDescription: productDescription,
        productUrl: "http://localhost:3000/product?id=" + id,
      };
      await itemsRef.add(dataToAdd);
      setShowLoader(false);
      setProductName("");
      setProductPrice("");
      setProductUrl("");
      setProductDescription("");
      cogoToast.success("Item Added Successfully");
    }, 2000);
  }
}
