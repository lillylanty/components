
import * as React from 'react';
import classes from "../../lib/helpers/classes";
import { InputHTMLAttributes } from "react";
import  "./input.scss";
interface Props extends InputHTMLAttributes<HTMLInputElement> {

 }
const Input: React.FunctionComponent<Props> = (props) => {
    const {className, ...rest} = props
    return (
        <input 
        className={classes('fui-input',className)}
            {...rest}
        />
    )
}
export default Input