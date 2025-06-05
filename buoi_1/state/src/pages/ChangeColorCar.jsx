import React, { useState } from 'react'
import { Fragment } from 'react'
import redCar from '../assets/img/red-car.jpg'
import blackCar from '../assets/img/black-car.jpg'
import silverCar from '../assets/img/silver-car.jpg'

function ChangeColorCar() {
    const [color, setColor] = useState("./src/assets/img/black-car.jpg")

    return (<Fragment >
        <img style={{ width: "600px", height: "400px", objectFit: "cover" }} src={color} />
        <button onClick={() => { setColor(blackCar) }}>Đen</button>
        <button onClick={() => { setColor(redCar) }}>Đỏ</button>
        <button onClick={() => { setColor(silverCar) }}>Bạc</button>
    </Fragment>
    )
}

export default ChangeColorCar
