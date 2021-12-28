const Input = (props) => {
    const { name, value, title, type, handleChange, placeholder, className, errorDiv, errorMsg } = props;
    return (
        <div className="mb-3">
            {
                type !== 'hidden' && (
                    <label htmlFor={name} className="form-label">
                        {title}
                    </label>
                )
            }

            <input     
                onChange={handleChange}
                type={type} 
                className={`form-control ${className}`}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
            />
            <div className={errorDiv}>{errorMsg}</div>
        </div>
    )
}

export default Input;