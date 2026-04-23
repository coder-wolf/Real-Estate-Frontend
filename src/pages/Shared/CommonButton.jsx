import React from 'react';

const CommonButton = ({ children }) => {
    return (
        <div>
            <button className='border rounded-lg px-4 py-2 bg-[#7065F0] text-white'>{children}</button>
        </div>
    );
};

export default CommonButton;