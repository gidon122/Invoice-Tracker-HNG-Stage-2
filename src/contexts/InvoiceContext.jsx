import React, { createContext, useContext, useState } from 'react'

// ── Seed data — exactly matching the Desktop Invoices screenshot ──────────────
const SEED_INVOICES = [
  {
    id: 'RT3080',
    clientName: 'Jensen Huang',
    email: 'jensenhuang@mail.com',
    amount: 1800.90,
    status: 'Paid',
    createdAt: '2021-08-19',
    invoiceDate: '05 Aug 2021',
    paymentTerms: 'Net 14 Days',
    description: 'Re-branding',
    billFromStreet: '19 Union Terrace',
    billFromCity: 'London',
    billFromPostcode: 'E1 3EZ',
    billFromCountry: 'United Kingdom',
    billToStreet: '106 Kendell Street',
    billToCity: 'Sharrington',
    billToPostcode: 'NR24 5WQ',
    billToCountry: 'United Kingdom',
    items: [
      { description: 'Brand Guidelines', quantity: 1, price: '1800.90', total: '1800.90' },
    ],
  },
  {
    id: 'XM9141',
    clientName: 'Alex Grim',
    email: 'alexgrim@mail.com',
    amount: 556.00,
    status: 'Pending',
    createdAt: '2021-08-21',
    invoiceDate: '21 Aug 2021',
    paymentTerms: 'Net 30 Days',
    description: 'Graphic Design',
    billFromStreet: '19 Union Terrace',
    billFromCity: 'London',
    billFromPostcode: 'E1 3EZ',
    billFromCountry: 'United Kingdom',
    billToStreet: '84 Church Way',
    billToCity: 'Bradford',
    billToPostcode: 'BD1 9PB',
    billToCountry: 'United Kingdom',
    items: [
      { description: 'Banner Design',  quantity: 1, price: '156.00', total: '156.00' },
      { description: 'Email Design',   quantity: 2, price: '200.00', total: '400.00' },
    ],
  },
  {
    id: 'RG0314',
    clientName: 'John Morrison',
    email: 'jmorrison@mail.com',
    amount: 14002.33,
    status: 'Paid',
    createdAt: '2021-09-24',
    invoiceDate: '24 Sep 2021',
    paymentTerms: 'Net 7 Days',
    description: 'Website Redesign',
    billFromStreet: '19 Union Terrace',
    billFromCity: 'London',
    billFromPostcode: 'E1 3EZ',
    billFromCountry: 'United Kingdom',
    billToStreet: '46 Abbey Row',
    billToCity: 'Cambridge',
    billToPostcode: 'CB5 6EG',
    billToCountry: 'United Kingdom',
    items: [
      { description: 'Website Redesign', quantity: 1, price: '14002.33', total: '14002.33' },
    ],
  },
  {
    id: 'RT2080',
    clientName: 'Alysa Werner',
    email: 'alysawerner@mail.com',
    amount: 102.04,
    status: 'Pending',
    createdAt: '2021-10-11',
    invoiceDate: '11 Oct 2021',
    paymentTerms: 'Net 1 Day',
    description: 'Logo Concept',
    billFromStreet: '19 Union Terrace',
    billFromCity: 'London',
    billFromPostcode: 'E1 3EZ',
    billFromCountry: 'United Kingdom',
    billToStreet: '63 Warwick Road',
    billToCity: 'Carlisle',
    billToPostcode: 'CA20 2TG',
    billToCountry: 'United Kingdom',
    items: [
      { description: 'Logo Sketches', quantity: 1, price: '102.04', total: '102.04' },
    ],
  },
  {
    id: 'AA1449',
    clientName: 'Mellisa Clarke',
    email: 'mellisaclarke@mail.com',
    amount: 4032.33,
    status: 'Pending',
    createdAt: '2021-10-07',
    invoiceDate: '07 Oct 2021',
    paymentTerms: 'Net 7 Days',
    description: 'UI/UX Design',
    billFromStreet: '19 Union Terrace',
    billFromCity: 'London',
    billFromPostcode: 'E1 3EZ',
    billFromCountry: 'United Kingdom',
    billToStreet: '79 Dover Road',
    billToCity: 'Westhall',
    billToPostcode: 'IP19 3PF',
    billToCountry: 'United Kingdom',
    items: [
      { description: 'UI Design',  quantity: 1, price: '2532.33', total: '2532.33' },
      { description: 'UX Research', quantity: 1, price: '1500.00', total: '1500.00' },
    ],
  },
  {
    id: 'TY9141',
    clientName: 'Thomas Wayne',
    email: 'thomaswayne@mail.com',
    amount: 6155.91,
    status: 'Pending',
    createdAt: '2021-10-30',
    invoiceDate: '30 Oct 2021',
    paymentTerms: 'Net 30 Days',
    description: 'App Development',
    billFromStreet: '19 Union Terrace',
    billFromCity: 'London',
    billFromPostcode: 'E1 3EZ',
    billFromCountry: 'United Kingdom',
    billToStreet: '47 Crosby Road',
    billToCity: 'Liverpool',
    billToPostcode: 'L23 0QE',
    billToCountry: 'United Kingdom',
    items: [
      { description: 'App Development', quantity: 1, price: '6155.91', total: '6155.91' },
    ],
  },
  {
    id: 'FV2353',
    clientName: 'Anita Wainwright',
    email: 'anitawainwright@mail.com',
    amount: 3102.04,
    status: 'Draft',
    createdAt: '2021-11-05',
    invoiceDate: '05 Nov 2021',
    paymentTerms: 'Net 30 Days',
    description: 'SEO Strategy',
    billFromStreet: '19 Union Terrace',
    billFromCity: 'London',
    billFromPostcode: 'E1 3EZ',
    billFromCountry: 'United Kingdom',
    billToStreet: '',
    billToCity: '',
    billToPostcode: '',
    billToCountry: '',
    items: [
      { description: 'SEO Strategy Document', quantity: 1, price: '2102.04', total: '2102.04' },
      { description: 'Content Audit',         quantity: 1, price: '1000.00', total: '1000.00' },
    ],
  },
]

// ── Due-date helper — add days to a date string ───────────────────────────────
const addDays = (dateStr, days) => {
  try {
    const d = new Date(dateStr)
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  } catch {
    return dateStr
  }
}

// ── ID generator ──────────────────────────────────────────────────────────────
const generateId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const nums  = '0123456789'
  return (
    chars[Math.floor(Math.random() * chars.length)] +
    chars[Math.floor(Math.random() * chars.length)] +
    nums[Math.floor(Math.random() * nums.length)] +
    nums[Math.floor(Math.random() * nums.length)] +
    nums[Math.floor(Math.random() * nums.length)] +
    nums[Math.floor(Math.random() * nums.length)]
  )
}

// ── Context ───────────────────────────────────────────────────────────────────
const InvoiceContext = createContext(null)

export const InvoiceProvider = ({ children }) => {
  const [allInvoices, setAllInvoices] = useState(SEED_INVOICES)
  const [filter, setFilter]           = useState('All')

  // Filtered list exposed to the list view
  const invoices = filter === 'All'
    ? allInvoices
    : allInvoices.filter(inv => inv.status === filter)

  const getInvoiceById = (id) => allInvoices.find(inv => inv.id === id) || null

  const addInvoice = (data) => {
    const invoice = {
      ...data,
      id: generateId(),
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setAllInvoices(prev => [invoice, ...prev])
  }

  const saveAsDraft = (data) => {
    const invoice = {
      ...data,
      id: generateId(),
      status: 'Draft',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setAllInvoices(prev => [invoice, ...prev])
  }

  const updateInvoice = (updated) => {
    setAllInvoices(prev => prev.map(inv => inv.id === updated.id ? { ...inv, ...updated } : inv))
  }

  const deleteInvoice = (id) => {
    setAllInvoices(prev => prev.filter(inv => inv.id !== id))
  }

  const markAsPaid = (id) => {
    setAllInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv))
  }

  return (
    <InvoiceContext.Provider value={{
      invoices,
      allInvoices,
      filter,
      setFilter,
      addInvoice,
      saveAsDraft,
      updateInvoice,
      deleteInvoice,
      markAsPaid,
      getInvoiceById,
    }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export const useInvoice = () => {
  const ctx = useContext(InvoiceContext)
  if (!ctx) throw new Error('useInvoice must be used inside InvoiceProvider')
  return ctx
}

export default InvoiceContext
