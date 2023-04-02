import React from "react"; 
import Loader from "react-loader-spinner";
import "./spinner.css";
const LocalSpinner: React.FC = () => {
    return (
        <div className="local-spinner">
            <Loader type="Oval" color="#74b4ff" height="25" width="25" />
        </div>
    );
}

export default LocalSpinner;
