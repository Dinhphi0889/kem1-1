import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const arrayToDoList = [

]

const ToDoList = () => {
    const [dataToDoList, setDataListToDoList] = useState();

    const [listThem, setListThem] = useState([]);

    const [listHoanThanh, setListHoanThanh] = useState([]);
    const [listTuChoi, setListTuChoi] = useState([]);


    // hàm gọi api
    const fetchDataToDoList = async () => {
        const result = await Axios.get("https://svcy.myclass.vn/api/ToDoList/GetAllTask")
        setDataListToDoList(result.data);
    }

    const handleThemList = (task) => {
        setListThem([...listThem, task])
    }

    const handleHoanThanh = (task) => {
        debugger
        setListHoanThanh([...listHoanThanh, task])
        setListThem(listThem.filter((item) => {
            return item.taskName !== task.taskName
        }));
    }
    // hàm xử lí từ chối
    const handleTuChoi = (task) => {
        setListTuChoi([...listTuChoi, task])
        setListThem(listThem.filter((item) => {
            return item.taskName !== task.taskName
        }));
    }

    const handleXoa = (task) => {
        setListThem(listThem.filter((item) => {
            return item.taskName !== task.taskName
        }));
        setListHoanThanh(listHoanThanh.filter((item) => {
            return item.taskName !== task.taskName
        }));
        setListTuChoi(listTuChoi.filter((item) => {
            return item.taskName !== task.taskName
        }));
    }

    const renderListToDoList = () => {
        // 7 item
        return dataToDoList?.map((item, index) => {
            return (
                <div className='d-flex border justify-content-between mb-2' key={index}>
                    <li className="list-group-item">{item.taskName}</li>
                    <div>
                        <button onClick={() => { handleThemList(item) }} className='btn btn-primary'>Thêm</button>
                        <button className='btn btn-danger'>Xoá</button>
                        <button className='btn btn-success'>Hoàn thành</button>
                        <button className='btn btn-warning'>Từ chối</button>
                    </div>
                </div>
            )
        })
    }

    useEffect(() => {
        fetchDataToDoList();
    }, [])

    return (
        <div className='container'>
            <h1>To do list</h1>
            <ul className="list-group">
                {renderListToDoList()}
            </ul>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h2>DS Thêm</h2>
                        <ul className="list-group">
                            {listThem.map((item, index) => {
                                return (
                                    <div className='d-flex justify-content-between' key={index}>
                                        <li className='list-group-item'>{item.taskName}</li>
                                        <div>

                                            <button className='btn btn-success' onClick={() => { handleHoanThanh(item) }}>Hoàn thành</button>
                                            <button className='btn btn-danger' onClick={() => { handleTuChoi(item) }}>Từ chối</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="col">
                        <h2>DS Hoàn Thành</h2>
                        <ul className="list-group">
                            {listHoanThanh.map((item, index) => {
                                return (
                                    <div className='d-flex justify-content-between' key={index}>
                                        <li className='list-group-item'>{item.taskName}</li>
                                        <button onClick={() => { handleXoa(item) }} className='btn btn-danger'>Xoá</button>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                    <div class="col">
                        <h2>DS Từ Chối</h2>
                        <ul className="list-group">
                            {listTuChoi.map((item, index) => {
                                return (
                                    <div className='d-flex justify-content-between' key={index}>
                                        <li className='list-group-item'>{item.taskName}</li>
                                        <button onClick={() => { handleXoa(item) }} className='btn btn-danger'>Xoá</button>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDoList
