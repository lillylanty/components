import * as React from 'react';
import { useState } from 'react';
import Form from "./form";
import Button from './button';

import Validator from "./validator";
// interface Props { 
//  
// }
const userNames = ['lily', 'jack', 'bob']
const checkUserName = (name: string, succeed: () => void, failed: () => void) => {
  setTimeout(() => {
    console.log('开始异步')
    if (userNames.indexOf(name) !== -1) {
      succeed()
    } else {
      failed()
    }
  }, 600);
}

const x: React.FunctionComponent = () => {
  const initialData = {
    userName: '',
    age: ''
  }
  const [formData, setFormData] = useState(initialData)
  const [errors, 
    setErrors
  ] = useState({})
  const [fields] = useState([
    {
      name: 'userName', label: '用户名(必须填写)', input: {
        type: 'text', validator: [
          { required: true, tips: '用户名必填' },
          { minLength: 2, maxLength: 8, tips: '字段长度应在2-8字符' },
          { pattern: /A-Za-z0-9/, tips: '只能填写英文数字' },
        ]
      }
    },
    { name: 'age', label: '年龄', input: { type: 'password', validator: [{ required: true }] } }
  ])
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(11, formData) 
    const rules = [
      { key: 'userName', required: true, tips: '用户名必填' },
      { key: 'userName', minLength: 4, maxLength: 8, tips: '字段长度应在2-8字符' },
      { key: 'userName', pattern: /A-Za-z0-9/, tips: '只能填写英文数字' },
      {
        key: 'userName', validator: (userName: any) => {
          console.log('调用alidator')
          return new Promise<void>((resolve, reject) => {
            checkUserName(name,
              resolve,
              reject
            )
          })
        }
      },
      { key: 'age', required: true, tips: '必填' }
    ]
    Validator(formData, rules, (errors)=>{
      console.log('回调')
      console.log(111, errors)
      setErrors(errors)
    })

  }
  const buttons = (
    <>
      <Button
        level="important"
      >提交</Button>
      <Button
        level="normal"
        onClick={() => setFormData(initialData)}>重置</Button>
    </>
  )
  return (
    <Form
      value={formData}
      fields={fields}
      buttons={buttons}
      onChange={setFormData}
      errors={errors}
      onSubmit={submit}
    />
  )
}

export default x;