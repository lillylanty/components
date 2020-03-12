
import { formData } from './form'



const test = (resolve: any, reject: any) => {
	var timeOut = Math.random() * 2;
	console.log('set timeout to: ' + timeOut + ' seconds.');
	setTimeout(function () {
		if (timeOut < 1) {
			console.log('call resolve()...');
			resolve('200 OK');
		}
		else {
			console.log('call reject()...');
			reject('timeout in ' + timeOut + ' seconds.');
		}
	}, timeOut * 500);
}
export const serverMock = (url: string, data: object) => {
	return new Promise(test)
}

interface oneError {
	message: string;
	promise?: Promise<any>;
}

const Validator = function (data: formData, rules: Array<{
	key: string,
	required?: boolean,
	minLength?: number,
	maxLength?: number,
	pattern?: RegExp,
	tips?: string,
	validator?: (v: string) => Promise<void>,
}>,
	callback: (err: any) => void

) {
	let errors: any = {};
	const isEmpty = (d: any) => {
		if (d === '' || d === undefined || d === null) {
			return true
		}
		return false
	}
	const addError = (
		key: string, text: oneError // string|Promise<any>,
	) => {
		if (errors[key] === undefined) {
			errors[key] = []
		}
		errors[key].push(text)

	}
	rules.forEach(a => {
		if (a.validator) {
			const promise = a.validator(data[a.key])
			addError(a.key, { message: '用户已存在', promise })
			console.log(errors)
		}
		if (isEmpty(data[a.key])) {
			addError(a.key, { message: a.tips || '不能为空' })
		}
		if (a.minLength && data[a.key].length < a.minLength) {
			addError(a.key, { message: a.tips || `字段少于${a.minLength}字了` })
		}
		if (a.maxLength && data[a.key].length > a.maxLength) {
			addError(a.key, { message: a.tips || `字段长于${a.maxLength}字了` })
		}
		if (a.pattern && a.pattern.test(data[a.key])) {
			addError(a.key, { message: a.tips || `字段不符合规则` })
		}
	});
	const promiseList = flat( Object.values(errors)	)
	.filter(a => a.promise)
	.map(b=> b.promise)
	console.log(promiseList)

	// ((obj) => {
	// 	let _r = [];
	// 	for (let i in obj) {
	// 		_r.push(obj[i])
	// 	}
	// 	return _r
	// })(errors)

	Promise.all(promiseList).finally(() => {
		callback(
			fromEntries(
				Object.keys(errors)
					.map<[string, string[]]> ( (key) => //
						[key, errors[key].map((item: oneError) => item.message)]
					)
			)
		)
	}
	)  
}
function fromEntries(arr: Array<[string, any]>) {
	console.log(arr, 'fromEntries')
	const res: { [key: string]: string[]|any } = {}
	for (let i = 0; i < arr.length; i++) {
		console.log(233,arr[i])
		res[arr[i][0]] = arr[i][1]
	}
	return res
}

function flat(arr: any) {
	const result = []
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] instanceof Array) {
			result.push(...arr[i])
		} else {
			result.push(arr[i])
		}
	}
	return result
}

export default Validator

