import React, { useState, useEffect } from 'react';

const DynamicForm = ({ formElements, employees, addEmployee }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState(employees[0] || {});

    useEffect(() => {
        if (employees.length > 0) {
            setFormData(employees[currentIndex]);
        }
    }, [currentIndex, employees]);

    const handleNext = () => {
        if (currentIndex < employees.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            alert('Reached end of file');
            setFormData({});
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddEmployee = () => {
        addEmployee(formData);
    };

    return (
        <div className="form-container">
            <form>
                {formElements.map((element) => {
                    switch (element.FieldType) {
                        case 'TextInput':
                            return (
                                <div key={element.Name} className="form-group">
                                    <label>{element.Label}</label>
                                    <input
                                        type="text"
                                        name={element.Name}
                                        value={formData[element.Name] || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            );
                        case 'RadioButton':
                            return (
                                <div key={element.Name} className="form-group">
                                    <label>{element.Name}</label>
                                    {element.Label.split('|').map((option, index) => (
                                        <div key={index} className="form-radio">
                                            <input
                                                type="radio"
                                                id={option}
                                                name={element.Name}
                                                value={option}
                                                checked={formData[element.Name] === option}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={option}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            );
                        case 'Select':
                            return (
                                <div key={element.Name} className="form-group">
                                    <label>{element.Name}</label>
                                    <select
                                        name={element.Name}
                                        value={formData[element.Name] || ''}
                                        onChange={handleChange}
                                    >
                                        {element.Label.split('|').map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
                <button type="button" onClick={handleNext} className="btn btn-primary">
                    Next
                </button>
                <button type="button" onClick={handleAddEmployee} className="btn btn-success">
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default DynamicForm;
