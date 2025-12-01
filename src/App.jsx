import React from "react";
import NewsList from "./components/NewsList";
import CrudPosts from "./components/CrudPosts";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React News App + CRUD Operations</h1>
      <NewsList />
      <hr style={{ margin: "40px 0" }} />
      <CrudPosts />
    </div>
  );
}

export default App;
