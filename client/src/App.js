import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import CustomerList from "./components/customerList";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<CustomerList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
