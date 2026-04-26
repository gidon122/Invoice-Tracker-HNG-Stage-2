import React from 'react'
import Combinedshape from '../assets/Combinedshape.png'
import Oval from '../assets/Oval.png'

const Sidebar = ({ darkMode, onToggleDark }) => {
  return (
    <aside style={{
      background: 'var(--sidebar-bg)',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
      zIndex: 100,
      // Desktop: vertical left sidebar
      width: '72px',
      minHeight: '100vh',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      borderRadius: '0 20px 20px 0',
      overflow: 'hidden',
    }}
    className="app-sidebar"
    >
      {/* Logo */}
      <div style={{
        width: '72px',
        height: '72px',
        background: 'linear-gradient(180deg, #ffffff 0%, #9277FF 100%)',
        borderRadius: '0 20px 20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
      className="sidebar-logo"
      >
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'rgba(124, 93, 250, 0.3)',
          borderRadius: '20px 0 0 0',
        }} />
        <img src={Combinedshape} alt="Logo" style={{ width: '28px', position: 'relative', zIndex: 1 }} />
      </div>

      {/* Bottom section */}
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        paddingBottom: '24px',
        width: '100%',
      }}
      className="sidebar-bottom"
      >
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#858BB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#858BB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        {/* Divider */}
        <div className="sidebar-divider" style={{ width: '100%', height: '1px', background: 'var(--sidebar-divider)' }} />

        {/* Avatar */}
        <div style={{
          width: '32px', height: '32px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #7C5DFA',
        }}>
          <img src={Oval} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .app-sidebar {
            width: 100% !important;
            min-height: unset !important;
            height: 72px !important;
            flex-direction: row !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }
          .app-sidebar .sidebar-logo {
            border-radius: 0 0 20px 0 !important;
            flex-shrink: 0 !important;
          }
          .app-sidebar .sidebar-bottom {
            margin-top: 0 !important;
            flex-direction: row !important;
            padding-bottom: 0 !important;
            padding-right: 24px !important;
            margin-left: auto !important;
            gap: 24px !important;
            align-items: center !important;
            height: 100% !important;
            width: auto !important;
          }
          .app-sidebar .sidebar-divider {
            width: 1px !important;
            height: 72px !important;
          }
        }
      `}</style>
    </aside>
  )
}

export default Sidebar
