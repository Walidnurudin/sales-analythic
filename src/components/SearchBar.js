import React from 'react'

const SearchBar = ({ search, setSearch, onSearch }) => {
    return (
        <div className="flex w-full mx-10 bg-white border-2 rounded-md">
            <input className=" w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none " type="search" name="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={onSearch} className="m-2 rounded bg-blue-600 px-4 py-2 text-white">
                Search
            </button>
        </div>
    )
}

export default SearchBar