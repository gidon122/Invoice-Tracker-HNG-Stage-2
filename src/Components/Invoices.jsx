import React from 'react'
import { useInvoice } from '../contexts/InvoiceContext'

const Invoices = ({ onViewInvoice }) => {
  const { invoices } = useInvoice()

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return `Due ${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`
    } catch {
      return dateString
    }
  }

  const getBadgeClass = (status) => {
    if (status === 'Paid') return 'badge badge-paid'
    if (status === 'Pending') return 'badge badge-pending'
    return 'badge badge-draft'
  }

  return (
    <div className="invoices-wrapper" style={{ padding: '0 48px 48px', maxWidth: '780px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="inv-card"
            onClick={() => onViewInvoice(invoice.id)}
          >
            {/* Desktop layout */}
            <div className="inv-card-desktop" style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: '16px',
            }}>
              {/* ID */}
              <div style={{ minWidth: '80px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700' }}>#</span>
                <span style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: '700', letterSpacing: '-0.25px' }}>
                  {invoice.id}
                </span>
              </div>
              {/* Due date */}
              <div style={{ minWidth: '100px', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', letterSpacing: '-0.25px' }}>
                {formatDate(invoice.createdAt)}
              </div>
              {/* Client */}
              <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', letterSpacing: '-0.25px' }}>
                {invoice.clientName}
              </div>
              {/* Amount */}
              <div style={{
                minWidth: '100px', textAlign: 'right',
                color: 'var(--text-primary)', fontSize: '16px', fontWeight: '700', letterSpacing: '-0.8px',
              }}>
                £ {Number(invoice.amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              {/* Status badge */}
              <div style={{ minWidth: '120px', display: 'flex', justifyContent: 'flex-end' }}>
                <span className={getBadgeClass(invoice.status)}>{invoice.status}</span>
              </div>
              {/* Arrow */}
              <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
                <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Mobile layout */}
            <div className="inv-card-mobile" style={{ display: 'none' }}>
              {/* Row 1: ID + Client name */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700' }}>#</span>
                  <span style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: '700', letterSpacing: '-0.25px' }}>
                    {invoice.id}
                  </span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', letterSpacing: '-0.25px' }}>
                  {invoice.clientName}
                </div>
              </div>

              {/* Row 2: Due date + Amount */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '500', letterSpacing: '-0.25px', marginBottom: '8px' }}>
                    {formatDate(invoice.createdAt)}
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: '700', letterSpacing: '-0.8px' }}>
                    £ {Number(invoice.amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <span className={getBadgeClass(invoice.status)}>{invoice.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .invoices-wrapper {
            padding: 0 24px 48px !important;
            max-width: 100% !important;
          }
          .inv-card-desktop { display: none !important; }
          .inv-card-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
}

export default Invoices
