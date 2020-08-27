import React, {useState} from 'react';

const Checkbox = ({ industries, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleChange = (id) => () => {
        //return the first index or -1
        const currentIndustryId = checked.indexOf(id);
        const newCheckedIndustryId = [...checked];

        //if currently checked was not already in checked state then push
        //else pull/take off
        if(currentIndustryId === -1) {
            newCheckedIndustryId.push(id);
        } else {
            newCheckedIndustryId.splice(currentIndustryId, 1);
        }
        setChecked(newCheckedIndustryId);
        handleFilters(newCheckedIndustryId);
    };

    return industries.map((industry, index) => (
        <li className="list-unstyled" key={index}>
            <input 
                type="checkbox" 
                className="form-check-input" 
                value={checked.indexOf(industry._id === -1)} 
                onChange={handleChange(industry._id)}
            />
            <label className="form-check-label">{industry.name}</label>
        </li>
    ));
};

export default Checkbox;