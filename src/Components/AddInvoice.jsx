import React, { useState } from 'react'
import { useInvoice } from '../contexts/InvoiceContext'

const AddInvoice = ({ onCancel, onSave }) => {
  const { addInvoice, saveAsDraft } = useInvoice()

  const [formData, setFormData] = useState({
    billFromStreet: '', billFromCity: '', billFromPostcode: '', billFromCountry: '',
    clientName: '', clientEmail: '',
    billToStreet: '', billToCity: '', billToPostcode: '', billToCountry: '',
    invoiceDate: '', paymentTerms: 'Net 30 Days',
    projectDescription: '',
    items: [{ description: '', quantity: 1, price: '0.00', total: '0.00' }],
  })

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const handleItemChange = (index, field, value) => {
    setFormData(prev => {
      const items = [...prev.items]
      items[index] = { ...items[index], [field]: value }
      if (field === 'quantity' || field === 'price') {
        const q = Number(items[index].quantity)
        const p = Number(items[index].price)
        items[index].total = (!isNaN(q) && !isNaN(p)) ? (q * p).toFixed(2) : items[index].total
      }
      return { ...prev, items }
    })
  }

  const addItem = () => setFormData(prev => ({
    ...prev, items: [...prev.items, { description: '', quantity: 1, price: '0.00', total: '0.00' }]
  }))

  const removeItem = (i) => setFormData(prev => ({
    ...prev, items: prev.items.filter((_, idx) => idx !== i)
  }))

  const buildData = () => ({
    clientName: formData.clientName, email: formData.clientEmail,
    amount: formData.items.reduce((s, it) => s + parseFloat(it.total || 0), 0),
    items: formData.items, description: formData.projectDescription,
    billFromStreet: formData.billFromStreet, billFromCity: formData.billFromCity,
    billFromPostcode: formData.billFromPostcode, billFromCountry: formData.billFromCountry,
    billToStreet: formData.billToStreet, billToCity: formData.billToCity,
    billToPostcode: formData.billToPostcode, billToCountry: formData.billToCountry,
    invoiceDate: formData.invoiceDate, paymentTerms: formData.paymentTerms,
  })

  const DeleteIcon = () => (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
      <path d="M11.583 3.556H8.944V2.667A1.333 1.333 0 007.611 1.333H5.389A1.333 1.333 0 004.056 2.667v.889H1.417a.444.444 0 100 .888h.444l.89 9.334A1.333 1.333 0 004.083 14h4.834a1.333 1.333 0 001.333-1.222l.889-9.334h.444a.444.444 0 100-.888z" fill="#888EB0"/>
    </svg>
  )

  return (
    <div className="form-panel-inner" style={{ padding: '48px 48px 0' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '40px' }}>
        New Invoice
      </h1>

      {/* Bill From */}
      <Section title="Bill From">
        <div style={{ marginBottom: '24px' }}>
          <label className="lbl">Street Address</label>
          <input className="inp" value={formData.billFromStreet} onChange={e => handleChange('billFromStreet', e.target.value)} placeholder="19 Union Terrace" />
        </div>
        <div className="form-3col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <div><label className="lbl">City</label><input className="inp" value={formData.billFromCity} onChange={e => handleChange('billFromCity', e.target.value)} /></div>
          <div><label className="lbl">Post Code</label><input className="inp" value={formData.billFromPostcode} onChange={e => handleChange('billFromPostcode', e.target.value)} /></div>
          <div className="form-3col-last"><label className="lbl">Country</label><input className="inp" value={formData.billFromCountry} onChange={e => handleChange('billFromCountry', e.target.value)} /></div>
        </div>
      </Section>

      {/* Bill To */}
      <Section title="Bill To">
        <div style={{ marginBottom: '24px' }}>
          <label className="lbl">Client's Name</label>
          <input className="inp" value={formData.clientName} onChange={e => handleChange('clientName', e.target.value)} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label className="lbl">Client's Email</label>
          <input className="inp" type="email" value={formData.clientEmail} onChange={e => handleChange('clientEmail', e.target.value)} placeholder="e.g. email@example.com" />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label className="lbl">Street Address</label>
          <input className="inp" value={formData.billToStreet} onChange={e => handleChange('billToStreet', e.target.value)} />
        </div>
        <div className="form-3col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          <div><label className="lbl">City</label><input className="inp" value={formData.billToCity} onChange={e => handleChange('billToCity', e.target.value)} /></div>
          <div><label className="lbl">Post Code</label><input className="inp" value={formData.billToPostcode} onChange={e => handleChange('billToPostcode', e.target.value)} /></div>
          <div className="form-3col-last"><label className="lbl">Country</label><input className="inp" value={formData.billToCountry} onChange={e => handleChange('billToCountry', e.target.value)} /></div>
        </div>
      </Section>

      {/* Date & Terms */}
      <div style={{ marginBottom: '40px' }}>
        <div className="form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <div><label className="lbl">Invoice Date</label><input className="inp" value={formData.invoiceDate} onChange={e => handleChange('invoiceDate', e.target.value)} placeholder="e.g. 21 Aug 2021" /></div>
          <div><label className="lbl">Payment Terms</label><input className="inp" value={formData.paymentTerms} onChange={e => handleChange('paymentTerms', e.target.value)} /></div>
        </div>
        <label className="lbl">Project Description</label>
        <input className="inp" value={formData.projectDescription} onChange={e => handleChange('projectDescription', e.target.value)} placeholder="e.g. Graphic Design" />
      </div>

      {/* Item List */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#777F98', letterSpacing: '-0.38px', marginBottom: '16px' }}>Item List</h3>

        {/* Desktop item header */}
        <div className="item-list-header-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr 64px 100px 80px 18px', gap: '16px', marginBottom: '8px' }}>
          {['Item Name', 'Qty.', 'Price', 'Total', ''].map((h, i) => (
            <span key={i} className="lbl" style={{ margin: 0 }}>{h}</span>
          ))}
        </div>

        {formData.items.map((item, idx) => (
          <div key={idx} className="item-row-wrapper" style={{ marginBottom: '16px' }}>
            {/* Desktop row */}
            <div className="item-row-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr 64px 100px 80px 18px', gap: '16px', alignItems: 'center' }}>
              <input className="inp" value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)} />
              <input className="inp" type="number" value={item.quantity} onChange={e => handleItemChange(idx, 'quantity', e.target.value)} style={{ textAlign: 'center' }} />
              <input className="inp" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} style={{ textAlign: 'right' }} />
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>{item.total}</span>
              <button onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                <DeleteIcon />
              </button>
            </div>

            {/* Mobile row */}
            <div className="item-row-mobile" style={{ display: 'none' }}>
              <div style={{ marginBottom: '12px' }}>
                <label className="lbl">Item Name</label>
                <input className="inp" value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 80px 18px', gap: '12px', alignItems: 'flex-end' }}>
                <div>
                  <label className="lbl">Qty.</label>
                  <input className="inp" type="number" value={item.quantity} onChange={e => handleItemChange(idx, 'quantity', e.target.value)} style={{ textAlign: 'center' }} />
                </div>
                <div>
                  <label className="lbl">Price</label>
                  <input className="inp" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} style={{ textAlign: 'right' }} />
                </div>
                <div>
                  <label className="lbl">Total</label>
                  <span style={{ display: 'flex', alignItems: 'center', height: '48px', fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>{item.total}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '4px' }}>
                  <button onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          style={{
            width: '100%', padding: '16px',
            background: 'var(--bg-add-item-btn)',
            border: 'none', borderRadius: '24px', cursor: 'pointer',
            fontSize: '12px', fontWeight: '700',
            color: 'var(--text-muted)', letterSpacing: '-0.25px',
            marginTop: '8px', transition: 'background 0.2s',
          }}
        >
          + Add New Item
        </button>
      </div>

      {/* Footer buttons */}
      <div className="form-footer" style={{
        position: 'sticky', bottom: 0,
        background: 'var(--form-panel-bg)',
        padding: '24px 0 32px',
        display: 'flex', alignItems: 'center', gap: '8px',
        marginLeft: '-48px', marginRight: '-48px', paddingLeft: '48px', paddingRight: '48px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}>
        <button
          onClick={onCancel}
          style={{
            background: 'var(--bg-add-item-btn)', border: 'none', cursor: 'pointer',
            borderRadius: '24px', padding: '16px 24px',
            fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)',
          }}
        >
          Discard
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { saveAsDraft(buildData()); onCancel() }}
            style={{
              background: '#373B53', border: 'none', cursor: 'pointer',
              borderRadius: '24px', padding: '16px 24px',
              fontSize: '12px', fontWeight: '700', color: '#888EB0',
            }}
          >
            Save as Draft
          </button>
          <button
            onClick={() => { addInvoice(buildData()); onCancel() }}
            style={{
              background: '#7C5DFA', border: 'none', cursor: 'pointer',
              borderRadius: '24px', padding: '16px 24px',
              fontSize: '12px', fontWeight: '700', color: '#FFFFFF',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#9277FF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7C5DFA'}
          >
            Save &amp; Send
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .form-panel-inner {
            padding: 32px 24px 0 !important;
          }
          .form-3col {
            grid-template-columns: 1fr 1fr !important;
          }
          .form-3col .form-3col-last {
            grid-column: 1 / -1 !important;
          }
          .form-footer {
            margin-left: -24px !important;
            margin-right: -24px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .item-list-header-desktop { display: none !important; }
          .item-row-desktop { display: none !important; }
          .item-row-mobile { display: block !important; }
        }
        @media (max-width: 480px) {
          .form-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '40px' }}>
    <p style={{ fontSize: '12px', fontWeight: '700', color: '#7C5DFA', letterSpacing: '-0.25px', marginBottom: '24px' }}>{title}</p>
    {children}
  </div>
)

export default AddInvoice
