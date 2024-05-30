import React, { useState } from 'react';
import Joi from 'joi';
import '../stylesheet/ContactForm.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  const schema = Joi.object({
    name: Joi.string().required().label('Name').messages({
      'string.empty': 'Oops! Did you forget to tell us your name?'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email').messages({
      'string.empty': 'Uh-oh, we need your email to stay in touch!',
      'string.email': 'Hmm, that doesn’t look like a valid email address.'
    }),
    message: Joi.string().required().label('Message').messages({
      'string.empty': 'Don’t be shy, write us a message!'
    })
  });

  const validateField = (name, value) => {
    const obj = { [name]: value };
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(obj[name]);
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = schema.validate(formData, { abortEarly: false });
    const { error } = result;
    if (error) {
      const errorData = {};
      error.details.forEach(item => {
        errorData[item.path[0]] = item.message;
      });
      setErrors(errorData);
    } else {
      setErrors({});
      setSubmissionMessage('Message sent!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  const getClassName = (name) => {
    if (errors[name]) {
      return `${name}-input is-invalid`;
    } else if (formData[name] && !errors[name]) {
      return `${name}-input is-valid`;
    }
    return `${name}-input`;
  };

  return (
    <div className="form-container">
        <h1>Contact us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className={getClassName('name')}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={getClassName('email')}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            className={getClassName('message')}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>
        <button type="submit" className="send-button">Send</button>
        {submissionMessage && <div className="submission-message">{submissionMessage}</div>}
      </form>
    </div>
  );
};

export default ContactForm;
