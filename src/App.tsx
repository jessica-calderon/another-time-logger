import Form from "./components/Form";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { FaClock } from "react-icons/fa";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Navbar />
        <h1 className="text-3xl mt-6 text-white flex items-center justify-center ">
          <FaClock />
          <span className="ml-2">TimeLogger</span>
        </h1>
        <Form />
      </div>
      <Footer />
    </div>
  );
};

export default App;
