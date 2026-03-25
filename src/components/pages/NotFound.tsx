import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found - QA AI Agent';
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        
        <div className="suggestions">
          <h3>You might want to try:</h3>
          <ul>
            <li>
              <Link to="/dashboard">Go to Dashboard</Link>
            </li>
            <li>
              <Link to="/tests">View Tests</Link>
            </li>
            <li>
              <Link to="/reports">Check Reports</Link>
            </li>
            <li>
              <Link to="/settings">Access Settings</Link>
            </li>
          </ul>
        </div>
        
        <div className="actions">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-outline"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;





