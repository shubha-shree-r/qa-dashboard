import { useState } from 'react';
import { useEffect } from 'react';

interface SettingsConfig {
  notifications: boolean;
  autoRun: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsConfig>({
    notifications: true,
    autoRun: false,
    theme: 'light',
    language: 'en',
    timezone: 'UTC'
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    document.title = 'Settings - QA AI Agent';
  }, []);

  const handleSettingChange = (key: keyof SettingsConfig, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        notifications: true,
        autoRun: false,
        theme: 'light',
        language: 'en',
        timezone: 'UTC'
      });
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your application preferences and settings</p>
      </div>
      
      <div className="settings-container">
        <div className="settings-section">
          <h3>General Settings</h3>
          
          <div className="setting-item">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label htmlFor="timezone">Timezone</label>
            <select
              id="timezone"
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Notification Settings</h3>
          
          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <span className="checkmark"></span>
              Enable notifications
            </label>
            <p className="setting-description">
              Receive notifications for test completions and failures
            </p>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Test Execution Settings</h3>
          
          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.autoRun}
                onChange={(e) => handleSettingChange('autoRun', e.target.checked)}
              />
              <span className="checkmark"></span>
              Auto-run tests on schedule
            </label>
            <p className="setting-description">
              Automatically execute tests based on configured schedules
            </p>
          </div>
        </div>
        
        <div className="settings-section">
          <h3>Advanced Settings</h3>
          
          <div className="setting-item">
            <label htmlFor="logLevel">Log Level</label>
            <select id="logLevel" defaultValue="info">
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          
          <div className="setting-item">
            <label htmlFor="maxRetries">Max Retries</label>
            <input
              type="number"
              id="maxRetries"
              min="0"
              max="10"
              defaultValue="3"
            />
          </div>
        </div>
        
        <div className="settings-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
          <button className="btn btn-outline" onClick={handleReset}>
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;





