import * as React from 'react';
import {useState} from 'react';
import Form from "./form";
import Validator from "./validator";
// interface Props { }
const x: React.FunctionComponent = () => {
    const initialData = {
        userName:'',
        age:''
    }
    const [formData,setFormData] = useState(initialData)
    const [fields] = useState([
        {name:'userName', label:'用户名', input:{ type:'text', validator: [
            { required: true, tips: '用户名必填' }, 
            { minLength: 2, maxLength: 8, tips: '字段长度应在2-8字符' }, 
            { pattern: /A-Za-z0-9/, tips: '只能填写英文数字' }, 
        ]} },
        {name:'age', label:'年龄', input:{type:'password', validator: [  { required: true }] }}
    ])   
    const submit = (e: React.FormEvent<HTMLFormElement>) => { 
        // console.log(11, formData) 
        const rules = [
            { key:'userName', required: true, tips: '用户名必填' }, 
            { key:'userName', minLength: 2, maxLength: 8, tips: '字段长度应在2-8字符' }, 
            { key:'userName', pattern: /A-Za-z0-9/, tips: '只能填写英文数字' }
        ]
        const errors = Validator(formData, rules)
        console.log(111, errors)
      }
    const buttons= (
        <>
            <button >提交</button>
            <button onClick={()=>setFormData(initialData)}>重置</button>
        </>
    )
    return (
        <Form 
        value={formData} 
        fields={fields} 
        buttons={buttons}
        onChange={setFormData}
        onSubmit={submit}
        />
    )
}
export default x;