
import {formData} from './form'



const Validator = function (data: formData, rules: Array<{key:string, required?:boolean, minLength?: number, maxLength?: number, pattern?: RegExp, tips?: string,}>){
    let errors:any = {};
    const isEmpty = (d:any) => {
        if(d === '' || d === undefined || d === null ){
            return true
        }
        return false
    }
    const addError = (key: string, text: string) => {
        if(errors[key] === undefined){
            errors[key] = []
        }
            errors[key].push(text)
        
    }
    rules.forEach(a => {
        if(isEmpty(data[a.key])){
            addError(a.key, a.tips || '不能为空' )
        }
        if(a.minLength && data[a.key].length < a.minLength ){
            addError(a.key, a.tips || `字段少于${a.minLength}字了` )
        }
        if(a.maxLength && data[a.key].length > a.maxLength ){
            addError(a.key, a.tips || `字段长于${a.maxLength}字了`)
        }
        if(a.pattern && a.pattern.test(data[a.key]) ){
            addError(a.key, a.tips || `字段不符合规则`)
        }
    });
    return errors
}

export default Validator

