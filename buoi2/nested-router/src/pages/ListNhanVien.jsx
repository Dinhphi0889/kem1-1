import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Table, Modal } from 'antd'
import ModalChiTietNhanVien from './ModalChiTietNhanVien'

const ListNhanVien = () => {
    const [dsNhanVien, setDsNhanVien] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chiTietNhanVien, setChiTietNhanVien] = useState();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // hàm fetchData để gọi api lấy danh sách nhân viên
    // sử dụng Axios để gửi request GET đến api
    // sau khi nhận được dữ liệu sẽ cập nhật state dsNhanVien
    // state dsNhanVien sẽ được sử dụng để hiển thị danh sách nhân viên trong bảng
    const fetchData = async () => {
        const result = await Axios.get("https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien")
        setDsNhanVien(result.data)
    }

    // sử dụng useEffect để gọi hàm fetchData khi component được mount
    // điều này giúp đảm bảo rằng danh sách nhân viên sẽ được cập nhật khi component được hiển thị lần đầu tiên
    useEffect(() => {
        fetchData()
    }, [])

    // hàm render danh sách nhân viên
    // sử dụng map để lặp qua danh sách nhân viên và hiển thị thông tin
    // mỗi nhân viên sẽ có mã nhân viên, tên nhân viên, lương cơ bản và nút xem chi tiết
    // khi click vào nút xem chi tiết sẽ gọi hàm xemChiTietNhanVien để lấy thông tin chi tiết của nhân viên đó
    const renderDsNhanVien = () => {
        return dsNhanVien.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.maNhanVien}</td>
                    <td>{item.tenNhanVien}</td>
                    <td>{item.luongCoBan}</td>
                    <td>
                        <button type='button' onClick={() => { xemChiTietNhanVien(item.maNhanVien) }} className='btn btn-info'>Xem chi tiết</button>
                    </td>
                </tr>
            )
        })
    }

    // hàm xem chi tiết nhân viên
    // khi click vào nút xem chi tiết sẽ gọi api lấy thông tin nhân viên theo mã nhân viên
    // sau đó hiển thị modal chi tiết nhân viên
    const xemChiTietNhanVien = async (maNhanVien) => {
        const result = await Axios.get("https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=" + maNhanVien)
        setChiTietNhanVien(result.data)
        showModal()
    }

    return (
        <div>
            <h1>Danh Sách Nhân Viên</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Mã Nhân Viên</th>
                        <th scope="col">Tên Nhân Viên</th>
                        <th scope="col">Lương Cơ Bản</th>
                        <th scope="col">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDsNhanVien()}
                </tbody>
            </table>
            <Modal
                title="Chi tiết nhân viên"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Mã Nhân Viên: {chiTietNhanVien?.maNhanVien}</p>
                <p>Tên Nhân Viên: {chiTietNhanVien?.tenNhanVien}</p>
                <p>Hệ Số Chức Vụ: {chiTietNhanVien?.heSoChucVu}</p>
                <p>Chức Vụ: {chiTietNhanVien?.chucVu}</p>
                <p>Lương Cơ Bản: {chiTietNhanVien?.luongCoBan}</p>
                <p>Số Giờ Làm Trong Tháng: {chiTietNhanVien?.soGioLamTrongThang}</p>
            </Modal>
            {/* <Table dataSource={dsNhanVien} columns={columns} /> */}
        </div>
    )
}

export default ListNhanVien
