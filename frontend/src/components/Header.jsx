import React, { useState } from 'react';
import { FaBars, FaFlask, FaImage } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Header = ({ navigateTo, activeScreen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'BloodTestAnalyzer', key: 'blood', icon: <FaFlask /> },
    { name: 'ImageAnalyzer', key: 'image', icon: <FaImage /> },
  ];

  const activeItem = menuItems.find(item => item.key === activeScreen);

  return (
    <header
      style={{
        width: '100%',
        backgroundColor: 'rgba(44, 62, 78, 0.9)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '16px 100px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 20,
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
        }}
        onClick={() => setMenuOpen(!menuOpen)}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
      >
        <FaBars size={24} color="#fff" />
      </div>

      <h1
        style={{
          fontSize: 20,
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {activeItem.icon}
        <span style={{ marginLeft: 10 }}>
          {activeItem.key === 'blood' ? 'BloodTestAnalyzer' : 'ImageAnalyzer'}
        </span>
      </h1>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {menuItems.map(item => (
            <button
              key={item.key}
              style={{
                background: 'none',
                border: 'none',
                padding: 8,
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: activeScreen === item.key ? 'bold' : 'normal',
                color: activeScreen === item.key ? '#2C3E4E' : '#000',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              onClick={() => {
                navigateTo(item.key);
                setMenuOpen(false);
              }}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  activeScreen: PropTypes.string.isRequired,
};

export default Header;
