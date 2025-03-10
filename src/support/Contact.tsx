import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-dvh bg-sky-950">
      <div className="max-w-96 w-full mx-auto flex flex-col items-center space-y-4 p-4 text-center">
        <h1 className="text-2xl font-bold text-sky-100">Contact</h1>
        <p className="text-sky-100">The developer hopes you like the game! For any questions or feedback, please contact: </p>
        <p className="text-sky-100">Email: <a href="mailto:lexicongamecontact@gmail.com" className="text-sky-100 hover:underline">lexicongamecontact@gmail.com</a></p>

        <Link to="/" className="text-sky-100 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;
