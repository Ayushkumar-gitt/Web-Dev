import React from 'react'

const FormGroup = ({ label, placeholder, value, onchange }) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}:</label>
            <input value={value} onChange={onchange} type={label} id={label} name={label} placeholder={placeholder} required />
        </div>
    )
}

export default FormGroup
