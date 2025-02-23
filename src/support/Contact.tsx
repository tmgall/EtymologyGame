import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p>This is where your contact goes.</p>

      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
};

export default Contact;
