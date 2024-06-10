import React, { useState } from 'react';
import DynamicForm from './DynamicForm';

const UploadForm = () => {
    const [formElements, setFormElements] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [addedEmployees, setAddedEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const handleMetadataUpload = (event) => {
        const file = event.target.files[0];
        if (file.name !== 'metadata.csv') {
            alert('Please upload the metadata.csv file for Dynamic Component Creation');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            parseMetadataCSV(text);
        };
        reader.readAsText(file);
    };

    const handleEmployeeUpload = (event) => {
        const file = event.target.files[0];
        if (file.name !== 'Employee.csv') {
            alert('Please upload the Employee.csv file for Data Autofill');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            parseEmployeeCSV(text);
        };
        reader.readAsText(file);
    };

    const parseMetadataCSV = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(header => header.trim().replace(/["]/g, ''));
        const elements = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim().replace(/["]/g, ''));
            let element = {};
            headers.forEach((header, index) => {
                element[header] = values[index];
            });
            return element;
        }).filter(element => element.FieldType);
        setFormElements(elements);
        setShowForm(true);
    };

    const parseEmployeeCSV = (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(header => header.trim().replace(/["]/g, ''));
        const records = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim().replace(/["]/g, ''));
            let record = {};
            headers.forEach((header, index) => {
                record[header] = values[index];
            });
            return record;
        }).filter(record => record.Name); // Filter out any empty lines
        setEmployees(records);
    };

    const addEmployee = (employee) => {
        setAddedEmployees([...addedEmployees, employee]);
    };

    return (
        <div className="upload-container">
            <h1>Upload Metadata and Employee Files</h1>
            <input type="file" accept=".csv" onChange={handleMetadataUpload} className="file-input" />
            {showForm && (
                <>
                    <input type="file" accept=".csv" onChange={handleEmployeeUpload} className="file-input" />
                    <DynamicForm formElements={formElements} employees={employees} addEmployee={addEmployee} />
                </>
            )}
            {addedEmployees.length > 0 && (
                <div className="table-container">
                    <h2>Added Employees</h2>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                {Object.keys(addedEmployees[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {addedEmployees.map((employee, index) => (
                                <tr key={index}>
                                    {Object.values(employee).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UploadForm;
