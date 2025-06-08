import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
const { Meta } = Card

const Con = ({ hinh, handleChange }) => {
    console.log("value được truyền xuống: ", hinh)
    console.log("handleChange: ", handleChange)

    const value = Math.floor(Math.random() * 70);

    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={hinh} />}
        >
            <Meta title="Europe Street beat"
                description={
                    <>
                        <Button onClick={() => { handleChange(value) }}>Like</Button>

                        <Button onClick={() => { handleChange(value) }}>Unlike</Button>
                    </>
                } />
        </Card>
    )
}

export default Con
