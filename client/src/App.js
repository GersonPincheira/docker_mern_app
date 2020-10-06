import React from "react";
import ItemList from "./components/ItemList";
import Navbar from "./components/navbar";
const App = () => {
  const [text, setText] = React.useState("");

  return (
    <div className="App">
      <Navbar setText={setText}/>
      <ItemList text={text} />
    </div>
  );
};

export default App;
