import React from 'react'
import { SearchContainer, SearchIcon, Img, SearchInput, SearchClean } from './style'
import icons from '../../icons/icons'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchBarValue } from '../../store/SearchBar/SearchBar.actions'


export const SearchBar = (props) => {
    const searchBarValue = useSelector(state => state.searchBar)
    const dispatch = useDispatch()

    const handleInput = (event) => {
        const {value} = event.target
        // console.log(value)
        // console.log(event)
        dispatch(setSearchBarValue(value))
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {dispatch(setSearchBarValue(''))}
    }

    const cleanSearchBar = () => {
        dispatch(setSearchBarValue(''))
    }

    const placeholder = props.placeholder

    return (
        <SearchContainer>
            <SearchIcon> <Img src={icons.searchIcon} alt='search' /> </SearchIcon>
            <SearchInput
                // placeholder='nova search bar'
                placeholder={placeholder}
                name='search'
                value={searchBarValue}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
            />

            {searchBarValue.length ?
                <SearchClean
                    onClick={cleanSearchBar}
                > x </SearchClean>
              :
                ''
            }
        </SearchContainer>
    )
}