import React, { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import Header from './Components/Header'
import Invoices from './Components/Invoices'
import InvoiceBody from './Components/InvoiceBody'
import AddInvoice from './Components/AddInvoice'
import EditInvoice from './Components/EditInvoice'
import ViewInvoice from './Components/ViewInvoice'
import { useInvoice } from './contexts/InvoiceContext'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [currentView, setCurrentView] = useState('list')
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null)
  const { addInvoice, updateInvoice, deleteInvoice, markAsPaid, getInvoiceById, invoices } = useInvoice()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleViewInvoice = (id) => {
    setSelectedInvoiceId(id)
    setCurrentView('view')
  }

  const handleSaveInvoice = (invoiceData) => {
    if (currentView === 'add') {
      addInvoice(invoiceData)
    } else if (currentView === 'edit') {
      updateInvoice({ id: selectedInvoiceId, ...invoiceData })
    }
    setCurrentView('list')
  }

  const handleDeleteInvoice = () => {
    deleteInvoice(selectedInvoiceId)
    setCurrentView('list')
  }

  const handleMarkAsPaid = () => {
    markAsPaid(selectedInvoiceId)
    setCurrentView('list')
  }

  const showFormOverlay = currentView === 'add' || currentView === 'edit'
  const showView = currentView === 'view'

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', display: 'flex' }} className="app-root">
      <Sidebar darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

        {/* List view — always rendered behind overlays */}
        {!showView && (
          <>
            <Header onAddClick={() => setCurrentView('add')} />
            {invoices.length === 0
              ? <InvoiceBody />
              : <Invoices onViewInvoice={handleViewInvoice} />
            }
          </>
        )}

        {/* View Invoice — full page */}
        {showView && (
          <ViewInvoice
            invoice={getInvoiceById(selectedInvoiceId)}
            onEdit={() => setCurrentView('edit')}
            onDelete={handleDeleteInvoice}
            onMarkAsPaid={handleMarkAsPaid}
            onBack={() => setCurrentView('list')}
          />
        )}

        {/* Form Panel — slides in as overlay from left */}
        {showFormOverlay && (
          <>
            {/* Overlay backdrop */}
            <div
              onClick={() => setCurrentView(currentView === 'edit' ? 'view' : 'list')}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.5)',
              }}
            />
            {/* Panel */}
            <div
              className="slide-in form-panel"
              style={{
                position: 'fixed', top: 0, left: '72px', bottom: 0,
                width: '616px', zIndex: 50,
                background: 'var(--form-panel-bg)',
                borderRadius: '0 20px 20px 0',
                overflowY: 'auto',
                paddingBottom: '32px',
              }}
            >
              {currentView === 'add' && (
                <AddInvoice
                  onCancel={() => setCurrentView('list')}
                  onSave={handleSaveInvoice}
                />
              )}
              {currentView === 'edit' && (
                <EditInvoice
                  invoice={getInvoiceById(selectedInvoiceId)}
                  onCancel={() => setCurrentView('view')}
                  onSave={handleSaveInvoice}
                />
              )}
            </div>
          </>
        )}
      </main>

      <style>{`
        /* Mobile/tablet: stack sidebar on top, full-width layout */
        @media (max-width: 900px) {
          .app-root {
            flex-direction: column !important;
          }
          .app-root > main {
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }
          /* Form panel: full width, starts below top navbar */
          .app-root .form-panel {
            left: 0 !important;
            top: 72px !important;
            width: 100% !important;
            border-radius: 0 !important;
            max-width: 100% !important;
          }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          /* Tablet: slightly narrower form panel */
          .app-root .form-panel {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}

export default App
