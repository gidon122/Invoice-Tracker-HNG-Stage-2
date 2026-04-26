import React, { useState } from 'react'

const getBadgeClass = (status) => {
  if (status === 'Paid') return 'badge badge-paid'
  if (status === 'Pending') return 'badge badge-pending'
  return 'badge badge-draft'
}

const ViewInvoice = ({ invoice, onEdit, onDelete, onMarkAsPaid, onBack }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!invoice) return null

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false)
    onDelete()
  }

  const ActionButtons = () => (
    <>
      <button
        onClick={onEdit}
        style={{
          background: 'var(--bg-add-item-btn)', border: 'none', cursor: 'pointer',
          borderRadius: '24px', padding: '16px 24px',
          fontSize: '12px', fontWeight: '700',
          color: 'var(--text-muted)', letterSpacing: '-0.25px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#DFE3FA'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-add-item-btn)'}
      >
        Edit
      </button>
      <button
        onClick={() => setShowDeleteModal(true)}
        style={{
          background: '#EC5757', border: 'none', cursor: 'pointer',
          borderRadius: '24px', padding: '16px 24px',
          fontSize: '12px', fontWeight: '700',
          color: '#FFFFFF', letterSpacing: '-0.25px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#FF9797'}
        onMouseLeave={e => e.currentTarget.style.background = '#EC5757'}
      >
        Delete
      </button>
      {invoice.status === 'Pending' && (
        <button
          onClick={onMarkAsPaid}
          style={{
            background: '#7C5DFA', border: 'none', cursor: 'pointer',
            borderRadius: '24px', padding: '16px 24px',
            fontSize: '12px', fontWeight: '700',
            color: '#FFFFFF', letterSpacing: '-0.25px',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#9277FF'}
          onMouseLeave={e => e.currentTarget.style.background = '#7C5DFA'}
        >
          Mark as Paid
        </button>
      )}
    </>
  )

  return (
    <div className="view-invoice-wrapper" style={{ padding: '48px', maxWidth: '780px', width: '100%', margin: '0 auto', overflowY: 'auto' }}>

      {/* Go back */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '24px',
          fontSize: '12px', fontWeight: '700',
          color: 'var(--text-primary)',
          letterSpacing: '-0.25px', padding: 0, marginBottom: '32px',
        }}
      >
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path d="M6 1L2 5l4 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Go back
      </button>

      {/* Status bar */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '8px',
        padding: '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '24px',
        boxShadow: '0 10px 10px -10px rgba(72,84,159,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)' }}>Status</span>
          <span className={getBadgeClass(invoice.status)}>{invoice.status}</span>
        </div>

        {/* Desktop action buttons */}
        <div className="view-actions-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ActionButtons />
        </div>
      </div>

      {/* Invoice detail card */}
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '8px',
        padding: '48px',
        boxShadow: '0 10px 10px -10px rgba(72,84,159,0.1)',
        marginBottom: '0',
      }}
      className="invoice-detail-card"
      >
        {/* Top row */}
        <div className="view-top-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>#</span>{invoice.id}
            </p>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', letterSpacing: '-0.1px' }}>
              {invoice.description || 'Invoice'}
            </p>
          </div>
          <div className="view-bill-from-addr" style={{ textAlign: 'right', fontSize: '11px', fontWeight: '500', color: 'var(--text-secondary)', lineHeight: '1.8', letterSpacing: '-0.23px' }}>
            {invoice.billFromStreet && <div>{invoice.billFromStreet}</div>}
            {invoice.billFromCity && <div>{invoice.billFromCity}</div>}
            {invoice.billFromPostcode && <div>{invoice.billFromPostcode}</div>}
            {invoice.billFromCountry && <div>{invoice.billFromCountry}</div>}
          </div>
        </div>

        {/* Info grid */}
        <div className="view-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', marginBottom: '40px' }}>
          {/* Dates column */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '500', color: 'var(--text-secondary)', letterSpacing: '-0.23px' }}>Invoice Date</p>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.75px' }}>
                {invoice.invoiceDate || new Date(invoice.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '500', color: 'var(--text-secondary)', letterSpacing: '-0.23px' }}>Payment Due</p>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.75px' }}>
                {invoice.paymentTerms || '—'}
              </p>
            </div>
          </div>

          {/* Bill To column */}
          <div>
            <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '500', color: 'var(--text-secondary)', letterSpacing: '-0.23px' }}>Bill To</p>
            <p style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.75px' }}>{invoice.clientName}</p>
            <div style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-secondary)', lineHeight: '1.8', letterSpacing: '-0.23px' }}>
              {invoice.billToStreet && <div>{invoice.billToStreet}</div>}
              {invoice.billToCity && <div>{invoice.billToCity}</div>}
              {invoice.billToPostcode && <div>{invoice.billToPostcode}</div>}
              {invoice.billToCountry && <div>{invoice.billToCountry}</div>}
            </div>
          </div>

          {/* Sent To column */}
          <div className="sent-to-col">
            <p style={{ margin: '0 0 12px', fontSize: '11px', fontWeight: '500', color: 'var(--text-secondary)', letterSpacing: '-0.23px' }}>Sent to</p>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.75px' }}>{invoice.email}</p>
          </div>
        </div>

        {/* Items table */}
        <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
          {/* Table header — hidden on mobile */}
          <div className="items-table-header" style={{
            background: 'var(--bg-item-table)',
            padding: '16px 32px',
            display: 'grid',
            gridTemplateColumns: '1fr auto auto auto',
            gap: '16px',
          }}>
            <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)', letterSpacing: '-0.23px' }}>Item Name</span>
            <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)', letterSpacing: '-0.23px', textAlign: 'center', minWidth: '48px' }}>QTY.</span>
            <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)', letterSpacing: '-0.23px', textAlign: 'right', minWidth: '80px' }}>Price</span>
            <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)', letterSpacing: '-0.23px', textAlign: 'right', minWidth: '80px' }}>Total</span>
          </div>

          {/* Table rows */}
          {invoice.items && invoice.items.map((item, i) => (
            <div key={i} className="items-table-row" style={{
              background: 'var(--bg-item-table)',
              padding: '16px 32px',
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto',
              gap: '16px',
              borderTop: '1px solid var(--bg-input-border)',
              alignItems: 'center',
            }}>
              {/* Desktop: 4-col */}
              <span className="item-name-desktop" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.25px' }}>{item.description}</span>
              <span className="item-qty-desktop" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textAlign: 'center', minWidth: '48px' }}>{item.quantity}</span>
              <span className="item-price-desktop" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textAlign: 'right', minWidth: '80px' }}>£ {item.price}</span>
              <span className="item-total-desktop" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', textAlign: 'right', minWidth: '80px' }}>£ {item.total}</span>

              {/* Mobile: stacked inside the row */}
              <div className="item-mobile-left" style={{ display: 'none' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.25px', marginBottom: '4px' }}>{item.description}</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>{item.quantity} x £ {item.price}</div>
              </div>
              <span className="item-mobile-total" style={{ display: 'none', fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', textAlign: 'right' }}>£ {item.total}</span>
            </div>
          ))}

          {/* Amount Due */}
          <div style={{
            background: 'var(--bg-amount-due)',
            padding: '24px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: '0 0 8px 8px',
          }}>
            <span className="amount-due-label-desktop" style={{ fontSize: '11px', fontWeight: '500', color: '#FFFFFF', letterSpacing: '-0.23px' }}>Amount Due</span>
            <span className="amount-due-label-mobile" style={{ display: 'none', fontSize: '11px', fontWeight: '500', color: '#FFFFFF', letterSpacing: '-0.23px' }}>Grand Total</span>
            <span style={{ fontSize: '24px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-1px' }}>
              £ {Number(invoice.amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile bottom action bar */}
      <div className="view-actions-mobile" style={{ display: 'none' }}>
        <ActionButtons />
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}>
          <div style={{
            background: 'var(--modal-bg)',
            borderRadius: '8px',
            padding: '48px',
            maxWidth: '480px', width: '100%',
          }}>
            <h2 style={{
              margin: '0 0 16px', fontSize: '24px', fontWeight: '700',
              color: 'var(--text-primary)', letterSpacing: '-0.75px',
            }}>
              Confirm Deletion
            </h2>
            <p style={{
              margin: '0 0 24px', fontSize: '13px', fontWeight: '500',
              color: 'var(--text-secondary)', lineHeight: '1.6', letterSpacing: '-0.1px',
            }}>
              Are you sure you want to delete invoice #{invoice.id}? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  background: 'var(--modal-cancel-bg)', border: 'none', cursor: 'pointer',
                  borderRadius: '24px', padding: '16px 24px',
                  fontSize: '12px', fontWeight: '700',
                  color: 'var(--modal-cancel-text)', letterSpacing: '-0.25px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                style={{
                  background: '#EC5757', border: 'none', cursor: 'pointer',
                  borderRadius: '24px', padding: '16px 24px',
                  fontSize: '12px', fontWeight: '700',
                  color: '#FFFFFF', letterSpacing: '-0.25px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FF9797'}
                onMouseLeave={e => e.currentTarget.style.background = '#EC5757'}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .view-invoice-wrapper {
            padding: 28px 24px 120px !important;
            max-width: 100% !important;
          }
          /* Hide desktop action buttons in status bar */
          .view-actions-desktop { display: none !important; }

          /* Sticky bottom action bar */
          .view-actions-mobile {
            display: flex !important;
            position: fixed !important;
            bottom: 0 !important; left: 0 !important; right: 0 !important;
            background: var(--card-bg) !important;
            padding: 20px 24px !important;
            gap: 8px !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.08) !important;
            z-index: 50 !important;
          }
          .view-actions-mobile button {
            flex: 1 !important;
          }

          /* Invoice detail card padding */
          .invoice-detail-card {
            padding: 24px !important;
          }

          /* Top row: stack on mobile */
          .view-top-row {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .view-bill-from-addr {
            text-align: left !important;
          }

          /* Info grid: 2-col */
          .view-info-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
          .view-info-grid .sent-to-col {
            grid-column: 1 / -1 !important;
            margin-top: 0 !important;
          }

          /* Items table: mobile layout */
          .items-table-header { display: none !important; }
          .items-table-row {
            grid-template-columns: 1fr auto !important;
            padding: 16px !important;
          }
          .item-name-desktop,
          .item-qty-desktop,
          .item-price-desktop,
          .item-total-desktop { display: none !important; }
          .item-mobile-left { display: block !important; }
          .item-mobile-total { display: block !important; }

          /* Amount due label */
          .amount-due-label-desktop { display: none !important; }
          .amount-due-label-mobile { display: inline !important; }
        }
      `}</style>
    </div>
  )
}

export default ViewInvoice
