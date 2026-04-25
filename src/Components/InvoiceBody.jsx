import React from 'react'
import Fornon from '../assets/Fornon.png'

const InvoiceBody = () => {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center',
    }}>
      <img src={Fornon} alt="" style={{ width: '242px', marginBottom: '40px' }} />
      <h2 style={{
        fontSize: '20px', fontWeight: '700',
        color: 'var(--text-primary)',
        letterSpacing: '-0.63px', margin: '0 0 24px',
      }}>
        There is nothing here
      </h2>
      <p style={{
        fontSize: '13px', fontWeight: '500',
        color: 'var(--text-secondary)',
        letterSpacing: '-0.1px', maxWidth: '220px',
        lineHeight: '1.5', margin: 0,
      }}>
        Create an invoice by clicking the{' '}
        <strong style={{ color: 'var(--text-primary)' }}>New Invoice</strong>{' '}
        button and get started
      </p>
    </div>
  )
}

export default InvoiceBody
