import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="support">
      <h1 className="supportHeader">Contact</h1>
      <p>This game is made by a solo developer, and I hope you like the game! To report any bugs, suggest a word, ask a question, or provide feedback, please contact: </p>
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
