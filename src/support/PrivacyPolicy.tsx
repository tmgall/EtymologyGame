import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="support">
      <h1 className="supportHeader">Privacy Policy</h1>
      <p className="supportText" style={{ fontWeight: 700 }}>1. Data Collection</p>
      <p className="supportText">Lexicon does not collect any personally identifiable information (PII). The app uses localStorage to store game-related data, such as user stats and play history. The game also uses Vercel Analytics, which collects location and device information. </p>
      <p className="supportText">In the future, Lexicon may integrate third-party services, such as Google Ads, which may collect additional data. These services are governed by their own privacy policies.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>2. Use of Data</p>
      <p className="supportText">The data stored in localStorage is used solely to enhance the user experience within Lexicon, such as tracking your progress and stats. No data is shared with third parties unless otherwise stated.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>3. Third-Party Services</p>
      <p className="supportText">Lexicon may use Google Ads for monetization. Any data collected by Google Ads is managed by their policies, which can be reviewed here: https://policies.google.com/privacy.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>4. User Rights</p>
      <p className="supportText">You may delete your game stats stored in localStorage at any time through your browser settings. If you wish to opt out of data collection related to ads, you can adjust your browser's ad preferences or use an ad blocker.</p>
      <p className="supportText" style={{ fontWeight: 700 }}>5. Security</p>
      <p className="supportText">While Lexicon does not store sensitive data, we prioritize maintaining a secure app environment and follow industry best practices.</p>
      
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
