const Select = (props) => {
    const { name, value, title, handleChange, option_list } = props;
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {title}
            </label>

            <select 
                name={name} 
                className="form-select" 
                value={value} 
                onChange={handleChange}
            >            
                <option className="form-select" disabled>Choose...</option>
                {option_list.map((item, i) => (
                    <option key={i} className="form-select" value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;