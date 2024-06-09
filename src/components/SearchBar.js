import React from 'react'

const SearchBar = ({ search, setSearch, onSearch }) => {
    return (
        <div className="flex bg-white">
            <input className="border-[1px] border-[#c5c5c5] rounded-md bg-transparent px-4 outline-none" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={onSearch} className="m-2 rounded bg-blue-600 px-4 py-2 text-white">
                Search
            </button>
        </div>
    )
}

export default SearchBar