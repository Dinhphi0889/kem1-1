import React from "react";

function SoChan() {
    const count = 2
    return (
        <div>
            {count % 2 === 0 ? (
                <p className="soChan">Số chẵn</p>
            ) : (
                <p className="soLe">Số lẻ</p>
            )}
        </div>
    );
}

export default SoChan;