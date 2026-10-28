import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com)';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message body is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate network submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        timestamp: new Date().toLocaleTimeString(),
      });
      // Reset form fields
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 600);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700,
            marginBottom: '8px'
          }}>
            PRACTICAL 2: STATE & ROUTING
          </div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Controlled form state handling with client-side validation, error cues, and submission feedback.
          </p>
        </div>

        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          {submittedMessage && (
            <div className="toast-alert toast-success" style={{ marginBottom: '24px' }}>
              <div>
                <strong>Thank you, {submittedMessage.name}!</strong> Your inquiry regarding "
                {submittedMessage.subject}" was simulated successfully at {submittedMessage.timestamp}.
              </div>
              <button
                onClick={() => setSubmittedMessage(null)}
                className="btn btn-sm btn-outline"
                style={{ marginLeft: '12px' }}
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Dhruv Patel"
                  value={formData.name}
                  onChange={handleChange}
                  style={errors.name ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. dhruv@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={errors.email ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="e.g. ITUE301 Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  style={errors.subject ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.subject && <div className="form-error">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="form-label">Message *</label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {formData.message.length}/500 chars
                  </span>
                </div>
                <textarea
                  name="message"
                  rows="5"
                  className="form-textarea"
                  placeholder="Please enter your message or question here..."
                  maxLength="500"
                  value={formData.message}
                  onChange={handleChange}
                  style={errors.message ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.message && <div className="form-error">{errors.message}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Validating & Transmitting...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
