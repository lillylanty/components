import * as React from "react";
import { ReactFragment, } from 'react';
import Input from './input';
import classes from '../helpers/classes';
import './form.scss';
export interface formData {
	[K: string]: any
}
interface Props { //extends React.HTMLAttributes<any>
	value: formData;
	fields: Array<{ name: string, label: string, input: { type: string, validator?: object } }>;
	buttons: ReactFragment;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
	onValueChange?: Function;
	onChange: (value: formData) => void;
	errors: { [K: string]: string[] };
	showFirst?: boolean;
	transformError?:(msg:string)=>string;

}
const Form: React.FunctionComponent<Props> = (props) => {

	const { onSubmit, value, fields, buttons, errors, showFirst } = props;
	const formData = value;
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
		console.log(22, e.target.value)
		props.onChange({ ...formData, [type]: e.target.value })
	}

	const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		onSubmit(e)
	}
	return (
		<form onSubmit={formSubmit} className="fui-form">
			<table className="fui-form-table">
				{
					fields.map((item, i) => (
						<tr className={classes('fui-form-row', 'fui-form-tr')} key={item.name}>
							<td className="fui-form-td">
								<span className='fui-label' >{item.label}</span>
							</td>
							<td className="fui-form-td">
								<tr className={classes('fui-form-row', 'fui-form-tr')}>
									{/* <div key={i} className="fui-form-input-wrap"> */}
										<Input
											value={formData[item.name]}
											key={item.name}
											onChange={(e) => { onInputChange(e, item.name) }}
											type={item.input.type}
										/>
									{/* </div> */}
								</tr>
								<tr className={classes('fui-form-row', 'fui-form-tr')}>
									<td className="fui-form-td">
										<div className="tips" >{
											errors[item.name] ?
												showFirst === true ? errors[item.name][0] : errors[item.name]
												: <div className="empty"> &nbsp;</div>
										}</div>
									</td>
								</tr>
							</td>
						</tr>
					))
				}
				<tr className={classes('fui-form-row', 'fui-form-tr')}>
					<td className="fui-form-td"><span className='fui-label' >&nbsp;&nbsp;</span></td>
					<td className="fui-form-td"><div>{buttons}</div></td>
				</tr>
			</table>
		</form>
	)
}
Form.defaultProps = {
	showFirst: true,
	transformError: (message: string)=>{
    const map: any = {
      required:' 必填',
      minLength: '太短',
      maxLength: '太长',
    }
    return map[message] || '未知错误'
  }
}

export default Form;