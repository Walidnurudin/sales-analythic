import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ startDate, endDate, onChange, onApply }) => {
    return (
        <div className='flex'>
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
                isClearable={true}
                placeholderText='Input Date Range ...'
            />

            <button onClick={onApply} className="m-2 rounded bg-blue-600 px-4 py-2 text-white">
                Apply
            </button>
        </div>
    )
}

export default DateFilter