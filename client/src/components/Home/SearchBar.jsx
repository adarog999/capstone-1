import React, { useState } from 'react'

const SearchBar = () => {
  const [search,setSearch] = useState()
  const Search = (e) => {
    e.preventDefault()
    window.location.replace(`search?search=${search}`)
  }
  return (
    <form className='searchBar' onSubmit={Search}>
                        <div className='saerch-inp'>

                    <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder='Search Music' onInput={(e) => setSearch(e.target.value)}/>
                        </div>
    </form>
  )
}

export default SearchBar