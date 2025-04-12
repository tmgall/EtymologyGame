import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="support">
      <h1 className="supportHeader">Terms of Service</h1>
      <p className="supportText" style={{ fontWeight: 700 }}>Effective Date: April 12, 2025</p>
      <p className="supportText">Welcome to Lexicon, an online puzzle game where players guess words based on their etymology. By accessing or using Lexicon, you agree to abide by the terms and conditions outlined below. If you do not agree with these Terms of Service, please do not use the app.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>1. Eligibility</p>
      <p className="supportText">Lexicon is intended for users who are at least 13 years old. If you are under the age of 13, please obtain parental or guardian consent before playing.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>2. User Conduct</p>
      <p className="supportText">By using Lexicon, you agree not to:</p>
      <ul>
        <li className="supportText">Attempt to reverse-engineer, hack, or interfere with the functionality of the app.</li>
        <li className="supportText">Use the app for unlawful purposes or activities.</li>
        <li className="supportText">Share harmful, abusive, or offensive content within the app’s community.</li>
      </ul>
      <p className="supportText" style={{ fontWeight: 700 }}>3. LocalStorage</p>
      <p className="supportText">Lexicon stores non-personally identifiable data, such as user stats and play history, in your browser's localStorage. Users are responsible for safeguarding their browser or device to prevent unauthorized access.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>4. Intellectual Property</p>
      <p className="supportText">The content, puzzles, and designs within Lexicon are the intellectual property of Lexicon. Any unauthorized reproduction, distribution, or use is strictly prohibited.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>5. Limitation of Liability</p>
      <p className="supportText">Lexicon is provided "as is" without warranties of any kind. We are not responsible for technical issues, interruptions, or losses resulting from the use of the app.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>6. Modifications to Terms</p>
      <p className="supportText">We reserve the right to update or modify these Terms of Service at any time. Users will be notified of significant changes via [notification method, e.g., on-screen message].</p>
      <p className="supportText">This app uses React and Vite under MIT License.</p>

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
