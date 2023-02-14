import React from 'react';
import './InputDateField.css'
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const InputDateField = () => {
    const [age1, setAge1] = React.useState('');
    const [age2, setAge2] = React.useState('');
    const [age3, setAge3] = React.useState('');

    const handleChange1 = (e) => {
        setAge1(e.target.value);
    };

    const handleChange2 = (e) => {
        setAge2(e.target.value);
    };

    const handleChange3 = (e) => {
        setAge3(e.target.value);
    };

    return (
        <div className="inputDateField">
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">연도</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        name="birthYear"
                        id="demo-simple-select"
                        value={age1}
                        label="Age"
                        sx={{width: 100}}
                        onChange={handleChange1}
                    >
                        {
                            Array.from({length: 61}, (v, i) => i + 1950)
                                .map(i => <MenuItem key={'year'+i} value={i}>{i}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">월</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="birthMonth"
                        value={age2}
                        label="Age"
                        sx={{width: 80}}
                        onChange={handleChange2}
                    >
                        {
                            Array.from({length: 12}, (v, i) => i + 1)
                                .map(i => <MenuItem key={'month'+i} value={i}>{i}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">일</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        name="birthDay"
                        id="demo-simple-select"
                        value={age3}
                        label="Age"
                        sx={{width: 80}}
                        onChange={handleChange3}
                    >
                        {
                            Array.from({length: 31}, (v, i) => i + 1)
                                .map(i => <MenuItem key={'day'+i} value={i}>{i}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default InputDateField;
