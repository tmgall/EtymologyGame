import { Link } from "react-router-dom";

const Archive = () => {
  return (
    <div className="support">
      <h1 className="supportHeader">Archive</h1>
      <p>Coming soon...</p>
      <br></br> 
      <hr className="divider" />
      <br></br> 

      <Link to="/" className="backToHomeButton">
        Back to Home
      </Link>
    </div>
  );
};

export default Archive;
