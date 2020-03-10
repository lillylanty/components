
import {formData} from './form'



const Validator = function (data: formData, rules: Array<{key:string, required?:boolean, minLength?: number, maxLength?: number, pattern?: RegExp, tips?: string,}>){
    const errors:any = [];
    const isEmpty = (d:any) => {
        if(d === '' || d === undefined || d === null ){
            return true
        }
        return false
    }
    rules.forEach(a => {
        if(isEmpty(data[a.key])){
            errors.push(
                {[a.key]: a.tips || '不能为空'}
                )
        }
        else if(a.minLength && data[a.key].length < a.minLength ){
            errors.push(
                {[a.key]: a.tips || `字段少于${a.minLength}字了`}
            )
        }
        else if(a.maxLength && data[a.key].length > a.maxLength ){
            errors.push(
                {[a.key]: a.tips || `字段长于${a.maxLength}字了`}
            )
        }
        else if(a.pattern && a.pattern.test(data[a.key]) ){
            errors.push(
                {[a.key]: a.tips || `字段不符合规则`}
            )
        }
    });
    return errors
}

export default Validator

