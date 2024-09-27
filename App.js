
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/home/Home";
import Signin from "../src/Components/signUp/signin";
import Nav from "./Components/Nav/Nav";
import CompanyInfo from "./Components/companyInfo/CompanyInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company-info"  element={<CompanyInfo/>}/>
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
