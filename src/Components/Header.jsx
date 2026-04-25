import React, { useState } from 'react'
import { useInvoice } from '../contexts/InvoiceContext'

const Header = ({ onAddClick }) => {
  const { filter, setFilter, allInvoices } = useInvoice()
  const [filterOpen, setFilterOpen] = useState(false)

  const filters = ['All', 'Draft', 'Pending', 'Paid']

  const countLabel = allInvoices.length === 0
    ? 'No invoices'
    : `There are ${allInvoices.length} total invoices`

  return (
    <div style={{ padding: '56px 48px 40px', maxWidth: '780px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Title */}
        <div>
          <h1 style={{
            fontSize: '32px', fontWeight: '800',
            color: 'var(--text-primary)',
            letterSpacing: '-1px', margin: 0, lineHeight: 1,
          }}>
            Invoices
          </h1>
          <p style={{
            fontSize: '13px', fontWeight: '500',
            color: 'var(--text-secondary)',
            margin: '4px 0 0', letterSpacing: '-0.1px',
          }}>
            {countLabel}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>

          {/* Filter dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setFilterOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '12px',
                fontSize: '13px', fontWeight: '700',
                color: 'var(--text-primary)',
                letterSpacing: '-0.25px',
              }}
            >
              Filter by status
              <svg width="11" height="7" viewBox="0 0 11 7" fill="none"
                style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M1 1L5.5 5.5L10 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {filterOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 16px)', left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--card-bg)',
                borderRadius: '8px',
                boxShadow: '0 10px 20px rgba(72, 84, 159, 0.25)',
                padding: '16px 24px',
                minWidth: '192px',
                zIndex: 20,
              }}>
                {filters.map(f => (
                  <label key={f} style={{
                    display: 'flex', alignItems: 'center', gap: '13px',
                    cursor: 'pointer', padding: '4px 0',
                    fontSize: '13px', fontWeight: '700',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.25px',
                  }}>
                    <div
                      onClick={() => { setFilter(f); setFilterOpen(false) }}
                      style={{
                        width: '16px', height: '16px',
                        borderRadius: '2px',
                        background: filter === f ? '#7C5DFA' : 'transparent',
                        border: filter === f ? '2px solid #7C5DFA' : '2px solid #DFE3FA',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', flexShrink: 0,
                        transition: 'all 0.15s',
                      }}
                    >
                      {filter === f && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span onClick={() => { setFilter(f); setFilterOpen(false) }}>{f}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* New Invoice button */}
          <button
            onClick={onAddClick}
            style={{
              background: '#7C5DFA',
              border: 'none', cursor: 'pointer',
              borderRadius: '24px',
              padding: '0 14px 0 6px',
              height: '48px',
              display: 'flex', alignItems: 'center', gap: '16px',
              fontSize: '15px', fontWeight: '700',
              color: '#FFFFFF',
              letterSpacing: '-0.25px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#9277FF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7C5DFA'}
          >
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%', background: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M6.313 10.023V6.313h3.71V4.523h-3.71V.813H4.523v3.71H.813v1.79h3.71v3.71z" fill="#7C5DFA"/>
              </svg>
            </div>
            New Invoice
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
