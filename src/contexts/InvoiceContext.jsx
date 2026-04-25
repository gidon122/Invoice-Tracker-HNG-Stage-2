import React, { createContext, useContext, useState, useEffect } from 'react'

const InvoiceContext = createContext()

export const useInvoice = () => {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider')
  }
  return context
}

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices')
    if (storedInvoices) {
      try {
        setInvoices(JSON.parse(storedInvoices))
      } catch (error) {
        console.error('Error parsing invoices from LocalStorage:', error)
        setInvoices([])
      }
    } else {
      setInvoices([
        {
          id: 'RT3080',
          clientName: 'Jensen Huang',
          email: 'jensenh@mail.com',
          amount: 1800.90,
          items: [{ description: 'Brand Guidelines', quantity: 1, price: '1800.90', total: '1800.90' }],
          status: 'Paid',
          createdAt: '2021-08-18T00:00:00.000Z',
          description: 'Re-branding'
        },
        {
          id: 'XM9141',
          clientName: 'Alex Grim',
          email: 'alexgrim@mail.com',
          amount: 556.00,
          items: [
            { description: 'Banner Design', quantity: 1, price: '156.00', total: '156.00' },
            { description: 'Email Design', quantity: 2, price: '200.00', total: '400.00' }
          ],
          status: 'Pending',
          createdAt: '2021-08-21T00:00:00.000Z',
          description: 'Graphic Design'
        },
        {
          id: 'RG0314',
          clientName: 'John Morrison',
          email: 'jm@myco.com',
          amount: 14002.33,
          items: [{ description: 'Website Redesign', quantity: 1, price: '14002.33', total: '14002.33' }],
          status: 'Draft',
          createdAt: '2021-09-20T00:00:00.000Z',
          description: 'Website redesign'
        }
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices))
  }, [invoices])

  const generateId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const l = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)]
    const n = String(Math.floor(Math.random() * 9000) + 1000)
    return l + n
  }

  const addInvoice = (invoiceData) => {
    const newInvoice = { id: generateId(), ...invoiceData, status: 'Pending', createdAt: new Date().toISOString() }
    setInvoices(prev => [...prev, newInvoice])
    return newInvoice.id
  }

  const updateInvoice = (updatedInvoice) => {
    setInvoices(prev =>
      prev.map(invoice => {
        if (invoice.id !== updatedInvoice.id) return invoice
        if (invoice.status === 'Paid' && updatedInvoice.status === 'Draft') return invoice
        return { ...invoice, ...updatedInvoice }
      })
    )
  }

  const deleteInvoice = (id) => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== id))
  }

  const markAsPaid = (id) => {
    setInvoices(prev =>
      prev.map(invoice =>
        invoice.id === id && invoice.status === 'Pending' ? { ...invoice, status: 'Paid' } : invoice
      )
    )
  }

  const saveAsDraft = (invoiceData) => {
    const newInvoice = { id: generateId(), ...invoiceData, status: 'Draft', createdAt: new Date().toISOString() }
    setInvoices(prev => [...prev, newInvoice])
    return newInvoice.id
  }

  const changeStatus = (id, status) => {
    setInvoices(prev =>
      prev.map(invoice => {
        if (invoice.id !== id) return invoice
        if (invoice.status === 'Paid' && status === 'Draft') return invoice
        return { ...invoice, status }
      })
    )
  }

  // FIX: was referenced in value object but never defined — caused crash on load
  const getInvoiceById = (id) => {
    return invoices.find(invoice => invoice.id === id) || null
  }

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'All') return true
    return invoice.status.toLowerCase() === filter.toLowerCase()
  })

  const value = {
    invoices: filteredInvoices,
    allInvoices: invoices,
    filter,
    setFilter,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid,
    saveAsDraft,
    changeStatus,
    getInvoiceById,
  }

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  )
}
