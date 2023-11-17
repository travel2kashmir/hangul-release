import React from 'react'

function RoomLoader({ size }) {
    return (
        <div className={`bg-gray-400 ${size} animate-pulse opacity-10 border border-none rounded inline-block`}>
        </div>
    )
}

export default RoomLoader 