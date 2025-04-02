import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="support">
      <h1 className="supportHeader">Terms of Service</h1>
      <p>This is where your terms of service go.</p>

      <br></br> 
      <hr className="divider" />
      <br></br> 

      <Link to="/" className="backToHomeButton">
        Back to Home
      </Link>
    </div>
  );
};

export default TermsOfService;
