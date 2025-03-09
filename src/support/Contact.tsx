import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="bg-sky-950 flex flex-col items-center space-y-4 p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-sky-100">Contact</h1>
      <p className="text-sky-100">This is where your contact goes.</p>

      <Link to="/" className="text-sky-100 hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

export default Contact;
