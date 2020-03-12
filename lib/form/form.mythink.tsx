// import * as React from "react";
// import {ReactFragment,} from 'react';

// interface Props {
//     value: { [K:string]: any};
//     fields: Array<{ name: string, label: string, input: {type: string} }>;
//     buttons: ReactFragment;
//     onSubmit: React.FormEventHandler<HTMLFormElement>;
//     onValueChange: Function;

// }
// const Form : React.FunctionComponent<Props> = (props) => {

//     const {onSubmit, value, fields, buttons, onValueChange} = props;
//     // const onInputChange = () => {
//     //     console.log(22)
//     // }
    
//     const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
//         e.preventDefault();
//         onSubmit(e)
//     }
//     return (
//         <form onSubmit={formSubmit}>
//             {
//                 fields.map( (item, i) => (
//                     <div key={i}>
//                         {item.label} ：
//                     <input 
//                         value={value[item.name]}
//                         onChange={e=> { 
//                             console.log(e.currentTarget, e);
//                             onValueChange({...value, [item.name]: e.currentTarget.value})
//                           }}
//                         type={item.input.type}
//                     />
//                     </div> 
//                 ))
//             }
//             <div>
//                 { buttons }
//             </div>
//         </form>
//     )
// }

// export default Form;