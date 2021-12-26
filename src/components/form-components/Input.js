const Input = (props) => {
    const { name, value, title, type, handleChange, placeholder } = props;
    return (
        <div className="mb-3">
            {
                type === 'text' && (
                    <label htmlFor={name} className="form-label">
                        {title}
                    </label>
                )
            }

            <input     
                onChange={handleChange}
                type={type} 
                className="form-control"
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input;