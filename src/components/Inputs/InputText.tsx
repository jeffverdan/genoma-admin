import { IconButton, TextField } from '@mui/material';
import { useState, forwardRef } from 'react';
import { TextFieldProps } from "@mui/material/TextField";
import { Visibility, VisibilityOff, Check } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import { FieldError } from "react-hook-form";
import { HiExclamation } from 'react-icons/hi';

type MyTextFieldProps = TextFieldProps & {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    fieldError: FieldError | undefined;
    sucess?: boolean;
    width?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveOnBlur?: (e?: React.ChangeEvent<HTMLInputElement>) => void
    onBlurFunction?: () => void
    iconBefore?: React.ReactNode
    className?: string
};

const InputText = forwardRef<HTMLInputElement, MyTextFieldProps>(
    function InputText(data: MyTextFieldProps, ref) {
        const { label, placeholder, sucess, required, fieldError, width, value, onBlurFunction, iconBefore, type, saveOnBlur, className, ...rest } = data;
        const [isFocused, setIsFocused] = useState(false);
        const [isValue, setIsValue] = useState(value ? true : false);
        const [showPassword, setShowPassword] = useState<boolean>(false);

        const handleInputFocus = () => {
            setIsFocused(true);
        };

        const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            
            if (saveOnBlur) saveOnBlur(e);
            if (e.target.value) {
                setIsValue(true);
            } else {
                setIsValue(false);
            }
            if (onBlurFunction) onBlurFunction();
        };

        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
        };

        return (
            <div style={{ width: width }} className={"inputContainer " +
                (className || '') +
                (isValue || sucess ? " sucess " : "") +
                (isFocused ? " active " : "") +
                (!!fieldError ? " error " : "") +
                (rest.disabled ? " disable" : "")
            }>
                <TextField
                    label={label}
                    className="input-default"
                    variant="standard"
                    id={rest.name}
                    required={required}                    
                    {...rest}
                    value={value}
                    placeholder={placeholder}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    slotProps={{ 
                        inputLabel: {
                            classes: ".css-xiblmv-MuiFormLabel-root-MuiInputLabel-root"
                        },
                        input: {
                        endAdornment: (
                            <InputAdornment position="end" className='icons-container'>
                                {!!iconBefore 
                                    ? iconBefore
                                    : rest.name.includes("password")
                                        ? <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>

                                        :
                                        (isValue && !fieldError) && !rest.name.includes("email")
                                            ? <Check width={14} height={12} />
                                            : ''
                                }
                                {!!fieldError && <HiExclamation />}
                            </InputAdornment>
                        )
                    }}}
                    error={!!fieldError}
                    inputRef={ref}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    type={rest.name.includes("password") ? (showPassword ? "text" : "password") : type ? type : "text"}
                />
                {fieldError && <p className='errorMsg'>*{fieldError.message}</p>}
            </div>
        )
    })

InputText.displayName = 'InputText';
export default InputText;
