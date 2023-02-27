import React from "react";

export default function TextInput({id, label, name, type, rules, placeholder, defaultValue, register, errorMessage}) {
    return (
        <div className="form-group text-input">
            {label && <label htmlFor={id}>{rules.required !== false ? `${label} *` : label}</label>}
            <input className="form-controls" type={type} id={id} placeholder={placeholder}
                   defaultValue={defaultValue} {...register(name, rules)} />
            {errorMessage && (
                <span  className="text-danger">
                    {errorMessage?.message}
				</span>
            )}

        </div>
    );
}
