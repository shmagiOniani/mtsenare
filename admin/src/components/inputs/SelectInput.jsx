import React, {useState, useEffect} from 'react'
import {Controller} from 'react-hook-form';
import Select from "react-select";

export default function SelectInput({
                                        label,
                                        id,
                                        optionLabel = "label",
                                        optionValue = "value",
                                        callback = null,
                                        control,
                                        getValues,
                                        options,
                                        className,
                                        defaultValue,
                                        index,
                                        placeholder,
                                        name,
                                        register,
                                        reset,
                                        setValue,
                                    }) {
    const customStyles = {
        control: (styles, {isFocused}) => ({
            ...styles,
            padding: 0,
            height: '100%',
            backgrundColor: 'red',
            boxShadow: isFocused ? '0px 1.5px 3.5px 1.5px rgba(0, 0, 0, 0.295) inset' : 'none',
            border: 'none',
            backgroundColor: 'transparent',
            transition: 'all .15s'
        }),
        container: (styles) => ({
            ...styles,
            padding: 0,
        }),
        dropdownIndicator: (styles, {isFocused}) => ({
            ...styles,
            transition: ".2s ease-in-out",
            transform: isFocused ? "rotate(180deg)" : "none",
        }),
        indicatorSeparator: (styles) => ({
            ...styles,
            display: 'none'
        }),
        placeholder: (styles) => ({
            ...styles,
            color: '#21252967'
        })
    };
    const [selectedValue, setSelectValue] = useState(options[index]);

    useEffect(() => {
        const value = getValues(name);
        if (value) {
            const filtered = options.filter(item => value === item[optionValue]);
            setSelectValue(filtered);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register,index]);

    const handleChange = (selected, field) => {
        const value = selected[optionValue];
        field.onChange(value);
        setSelectValue(selected);
        if (callback) callback(value);
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <div style={{display: "flex", flexDirection:"column"}}>
                    {label && <label htmlFor={id}>{label}</label>}
                    <Select
                        styles={customStyles}
                        className="form-controls"
                        id={id}
                        value={selectedValue}
                        onChange={(selected) => handleChange(selected, field)}
                        options={options}
                        getPopupContainer={trigger => trigger.parentNode}
                        getOptionLabel={(option) => option[optionLabel]}
                        getOptionValue={(option) => option[optionValue]}
                        placeholder={placeholder}
                        closeMenuOnSelect={true}
                        isMulti={false}
                        blurInputOnSelect={false}
                    />
                </div>
            )}
        />
    )
}
