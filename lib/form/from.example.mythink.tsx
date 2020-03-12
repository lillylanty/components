// import * as React from 'react';
// import {useState} from 'react';
// import Form from "./form";
// // interface Props { }
// const x: React.FunctionComponent = () => {
//     const initialData = {
//         userName:'',
//         age:''
//     }
//     const [formData,setFormData] = useState(initialData)
//     const [fields] = useState([
//         {name:'userName', label:'用户名', input:{type:'text'}},
//         {name:'age', label:'年龄', input:{type:'password'}}
//     ])   
//     const submit = () => { console.log(11, formData)   }
//     const buttons= (
//         <>
//             <button onClick={submit}>提交</button>
//             <button onClick={()=>setFormData(initialData)}>重置</button>
//         </>
//     )
//     return (
//         <Form 
//         value={formData} 
//         fields={fields} 
//         buttons={buttons}
//         onValueChange={setFormData}
//         onSubmit={submit}
//         />
//     )
// }
// export default x;