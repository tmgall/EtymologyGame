import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p>This is where your terms of service go.</p>

      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
};

export default TermsOfService;
