import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifyPage = () => {
  const { qrId } = useParams();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 9) return alert("Please enter the complete 9-character code.");

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrId: qrId,
          name: name,
          phone: phone,
          code: code
        })
      });

      const data = await response.json();
      setStatus(data.status);
      setMessage(data.message);
    } catch (error) {
      setStatus("invalid");
      setMessage("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setCode(cleanValue.toUpperCase());
  };

  const getStyles = () => {
    if (status === 'valid') return { bg: '#d4edda', color: '#155724', icon: '✅' };
    if (status === 'already_verified') return { bg: '#fff3cd', color: '#856404', icon: '⚠️' };
    if (status === 'invalid') return { bg: '#f8d7da', color: '#721c24', icon: '❌' };
    return null;
  };

  const styles = getStyles();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f4f7f6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>

      {/* Inner Card White box with shadow */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '420px'
      }}>

        <h2 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '24px' }}>Verify Your Product</h2>
        <p style={{ margin: '0 0 30px 0', color: '#666', fontSize: '14px' }}>
          Verify your purchase by filling out the details below
        </p>

        {status !== 'valid' && (
          <form onSubmit={handleSubmit}>

            {/* Full Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={inputStyle}
              />
            </div>

            {/* Phone Number Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                style={inputStyle}
              />
            </div>

            {/* Verification Code Field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '8px' }}>
                Product Verification Code
              </label>
              <input
                type="text"
                maxLength="9"
                required
                value={code}
                onChange={handleCodeChange}
                placeholder="Enter verification code"
                style={{ ...inputStyle, letterSpacing: '2px', textTransform: 'uppercase' }}
                disabled={isLoading || status === 'already_verified'}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || code.length !== 9}
              style={buttonStyle}
            >
              {isLoading ? 'Verifying...' : 'Verify Product'}
            </button>
          </form>
        )}

        {/* Result UI Green Yellow Red boxes */}
        {styles && (
          <div style={{
            marginTop: '25px',
            padding: '15px',
            backgroundColor: styles.bg,
            color: styles.color,
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {styles.icon} {message}
          </div>
        )}

        {/* Bottom Encryption Text */}
        <div style={{
          marginTop: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: '#999'
        }}>
          <span>🔒</span> End - to - End Encryption
        </div>

      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 15px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '15px',
  outline: 'none',
  transition: 'border 0.2s'
};

const buttonStyle = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#0056d2',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
};

export default VerifyPage;