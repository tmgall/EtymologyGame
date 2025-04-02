import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="support">
      <h1 className="supportHeader">Privacy Policy</h1>
      <p>This is where your privacy policy goes.</p>

      <br></br> 
      <hr className="divider" />
      <br></br> 

      <Link to="/" className="backToHomeButton">
        Back to Home
      </Link>
    </div>
  );
};

export default PrivacyPolicy;
