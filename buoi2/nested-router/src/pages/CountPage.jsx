import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCountReducer } from '../store/reducer/countReducer'


const CountPage = () => {
    const { count, name } = useSelector(state => state.countReducer)
    const dispatch = useDispatch()

    const handleChangeQuality = (value) => {
        const action = setCountReducer(value)
        dispatch(action)
    }
    return (
        <div>
            <h3>Demo Đếm</h3>
            <div className='d-flex justify-content-center align-items-center space-x-3'>
                <button className='btn btn-success' onClick={() => {
                    handleChangeQuality(1)
                }}>+</button>
                <h1>{count}</h1>
                <button className='btn btn-warning' onClick={() => {
                    handleChangeQuality(-1)
                }}>-</button>

            </div>
        </div>
    )
}

export default CountPage
