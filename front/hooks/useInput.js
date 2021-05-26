import {useCallback, useState} from 'react';

// 반복되는 코드 => Hooks
const useInput = (initialValue = null) => {
    const [value,setValue] = useState(initialValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    },[]);
    return [value,handler];
}

// const [userId,setUserId] = useState('');
// const onChangeUserId = useCallback((e) => {
//     setUserId(e.target.value);
// },[]);

export default useInput;
