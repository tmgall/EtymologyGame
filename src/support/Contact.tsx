import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="support">
      <h1 className="supportHeader">Contact</h1>
      <p>The developer hopes you like the game! For any questions or feedback, please contact: </p>
      <br></br>
      <p>Email: <a href="mailto:lexicongamecontact@gmail.com" className="hover:underline">lexicongamecontact@gmail.com</a></p>

      <br></br> 
      <hr className="divider" />
      <br></br> 

      <Link to="/" className="backToHomeButton">
        Back to Home
      </Link>
    </div>
  );
};

export default Contact;
