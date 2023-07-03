import React from 'react';


function ImageDemo({ width, height, bgColor = 'bg-gray-400' }) {
  return (
    <div className={`${bgColor} text-white flex items-center justify-center`}
      style={{ height: height+'px', width: width+'px' }}
    >
      {`${height} x ${width}`}
    </div>
  )
}

export default ImageDemo