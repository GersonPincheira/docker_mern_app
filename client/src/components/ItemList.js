import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { CircularProgress } from '@material-ui/core';
import ItemCard from "./itemCard";

const useStyles = makeStyles({
  list: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: "5rem",
    marginLeft: "5rem",
  },
  item: {
    border: "none",
    boxShadow: "none",
    margin: "0 0 10px",
    padding: "10px",
    display: "grid",
    minWidth: 250,
  },
  search: {
    padding: "5px",
  },
  pagination:{
    display: "flex",
    justifyContent: "center",
    padding: "30px",
  },
  loading:{
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const ItemList = (props) => {
  const classes = useStyles();
  const { text } = props;
  const [state, SetState] = React.useState({
    results: [],
    loading: false,
    error: false,
    currentPage: 1,
    perPage: 12,
  });

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      SetState((s) => {
        return { ...s, loading: true };
      });
      const url = "/api/v1/searchProducts";
      fetch(url + "?consult=" + text)
        .then((res) => res.json())
        .then((data) => {
          SetState((s) => {
            return {
              ...s,
              loading: false,
              results:
                JSON.stringify(data) === JSON.stringify([])
                  ? []
                  : [].concat(data),
            };
          });
        })
        .catch((err) =>
          SetState((s) => {
            return { ...s, loading: false, error: true };
          })
        );
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const indexOfLastTodo = state.currentPage * state.perPage;
  const indexOfFirstTodo = indexOfLastTodo - state.perPage;
  const current = state.results.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPage = Math.ceil(state.results.length / state.perPage);

  function handleChange(event, page) {
    SetState((s) => {
      return { ...s, currentPage: page };
    });
  }
  const showResults = () => {
    if (state.loading) return<div className={classes.loading}> <CircularProgress/></div>;
    if (state.error)
      return <div>Ocurrio un error, por favor intenta mas tarde.</div>;
    if (current.length > 0) {
      return (
        <React.Fragment>
          <div className={classes.search}>
            Resultados para <strong>{text}</strong>
          </div>
          <ul className={classes.list}>
            {current.map((item) => (
              <li className={classes.item} key={item.id}>
                <ItemCard info={item} />
              </li>
            ))}
          </ul>
          <div className={classes.pagination}>
            <Pagination
              count={totalPage}
              color="primary"
              onChange={handleChange}
            />
          </div>
        </React.Fragment>
      );
    }
    return <></>;
  };

  return <Paper>{showResults()}</Paper>;
};

export default ItemList;
