import React, { useEffect } from 'react';
import { Select } from '@mui/material';
import { useState, forwardRef } from 'react';
import { SelectProps } from "@mui/material/Select";
import { Check } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import { FieldError } from "react-hook-form";
import { HiExclamation } from 'react-icons/hi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

type MySelectProps = SelectProps & {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    fieldError: FieldError | undefined;
    sucess?: boolean;
    option?: { value: number, name: string }[];
    value?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlurFunction?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    subHeader?: string;
    divClass?: string
};

const InputSelect = forwardRef<HTMLInputElement, MySelectProps>(
    function InputSelect(data: MySelectProps, ref) {
        const { label, sucess, required, fieldError, option, value, subHeader, onBlurFunction, divClass, ...rest } = data;
        const [isFocused, setIsFocused] = useState(false);
        const [isValue, setIsValue] = useState(value && value > 0 ? true : false);

        useEffect(() => {
            setIsValue(value && value > 0 ? true : false)
        },[value])

        const handleInputFocus = () => {
            setIsFocused(true);
        };

        const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            if (e.target.value) {
                setIsValue(true);
            } else {
                setIsValue(false);
            }
            if(onBlurFunction) onBlurFunction(e)
        };        

        return (
            <div className={"inputContainer select " +
                ((isValue || sucess) ? "sucess " : "") +
                (isFocused ? "active " : "") +
                (!!fieldError ? "error " : "") +
                (rest.disabled ? "disable" : "") +
                (divClass ? divClass : '')
            }>

                <InputLabel className="select-label" id={rest.name}>{label}</InputLabel>                              
                <Select
                    className="input-default select-default"
                    labelId="demo-simple-select-standard-label"
                    required={required}                    
                    id={rest.name}
                    value={value}
                    label={label}
                    autoWidth={false}
                    displayEmpty
                    {...rest}
                    MenuProps={{
                        PaperProps: {
                            style: {
                            },
                            className: 'Menu-Select-Multi',
                        },
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                    }}
                    inputProps={{
                        id: rest.name,
                        endAdornment: (
                            <InputAdornment position="end">
                                {!!fieldError
                                    ? <HiExclamation />
                                    : <Check width={14} height={12} />
                                }
                            </InputAdornment>
                        )
                    }}
                    error={!!fieldError}
                    inputRef={ref}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                >
                    {option?.map((value) => (
                        <MenuItem key={value.value} value={value.value} disabled={value.value === 0 || !value.value} className={value.value === 0 || !value.value ? 'placeholder' : ''}>                            
                            {value.name}
                        </MenuItem>
                    ))}
                    {!!subHeader && subHeader}
                </Select>
                {fieldError && <p className='errorMsg'>*{fieldError.message}</p>}
            </div>
        )
    })

InputSelect.displayName = 'InputSelect';
export default InputSelect;
