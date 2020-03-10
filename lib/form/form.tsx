import * as React from "react";
import {ReactFragment,} from 'react';

export interface formData {
    [K:string]: any
}
interface Props {
    value: formData;
    fields: Array<{ name: string, label: string, input: {type: string, validator?: object} }>;
    buttons: ReactFragment;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onValueChange?: Function;
    onChange:  (value: formData) => void;

}
const Form : React.FunctionComponent<Props> = (props) => {

    const {onSubmit, value, fields, buttons} = props;
    const formData = value;
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        console.log(22,e.target.value)
        props.onChange({...formData,[type]: e.target.value })
    }
    
    const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onSubmit(e)
    }
    return (
        <form onSubmit={formSubmit}>
            {
                fields.map( (item, i) => (
                    <div key={i}>
                        {item.label} ：
                    <input 
                        value={formData[item.name]}
                        onChange={(e)=> { onInputChange(e, item.name) }}
                        type={item.input.type}
                    />
                    </div> 
                ))
            }
            <div>
                { buttons }
            </div>
        </form>
    )
}

export default Form;