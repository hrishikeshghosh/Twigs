import React, { useState } from 'react'
import { Divider } from '@material-ui/core'
import './style.css'
import { useDispatch } from 'react-redux'
import { deleteAllLibrary, searchLIB } from '../../../../actions/profile'
import { useHistory } from 'react-router'

const LibraryRightElement = ({ type, setType, userID, setLibrarySearch }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [search, setSearch] = useState('')

  const initSearch = () => {
    dispatch(searchLIB(search, userID))
  }

  const pressEnter = e => {
    if (e.keyCode === 13) {
      setLibrarySearch(search)
      history.push(`/Home/library?search=${search}`)
      initSearch()
    }
  }

  const delLib = e => {
    e.preventDefault()
    dispatch(deleteAllLibrary(userID))
  }

  return (
    <div className='lib-right-element-root'>
      <section className='lib-search-bar-box'>
        <i className='fas fa-search'></i>
        <input
          value={search}
          onChange={e => {
            e.preventDefault()
            setSearch(e.target.value)
          }}
          onKeyDown={pressEnter}
          className='lib-search-bar'
          placeholder='Search Library'
        />
      </section>
      <section className='lib-type-box'>
        <p
          style={{
            fontFamily: 'Open Sans',
            fontSize: '1.0rem',
            fontWeight: 900,
            padding: '7%',
            color: 'GrayText',
            textTransform: 'uppercase'
          }}
        >
          Library Genre
        </p>
        <Divider style={{ margin: '2% 5%', padding: 0 }} />
        <div className='blog-select-box'>
          <p
            style={{
              fontFamily: 'Open Sans',
              fontSize: '0.9rem',
              fontWeight: 900
            }}
          >
            BLogs
          </p>
          <input
            type='radio'
            id='blog-select'
            name='radio_btn'
            checked={type === 0 && true}
            onChange={() => setType(0)}
            style={{ height: '1.0rem', width: '1.0rem', cursor: 'pointer' }}
          />
        </div>

        <Divider style={{ margin: '2% 5%', padding: 0 }} />
        <div className='art-select-box'>
          <p
            style={{
              fontFamily: 'Open Sans',
              fontSize: '0.9rem',
              fontWeight: 900
            }}
          >
            Arts
          </p>
          <input
            type='radio'
            id='art-select'
            name='radio_btn'
            checked={type === 1 && true}
            onChange={() => setType(1)}
            style={{ height: '1.0rem', width: '1.0rem', cursor: 'pointer' }}
          />
        </div>
        <Divider style={{ margin: '2% 5%', padding: 0 }} />
      </section>
      <section className='lib-right-end-box'>
        <button className='lib-del-btn' onClick={e => delLib(e)}>
          <i
            className='fas fa-trash'
            style={{
              fontSize: '0.8rem',
              cursor: 'pointer',
              color: ' #ff2442'
            }}
          ></i>
          <p
            className='library-del'
            style={{
              fontFamily: 'Open Sans',
              fontSize: '0.9rem',
              fontWeight: 900,
              marginLeft: '5%',
              cursor: 'pointer',
              color: ' #ff2442'
            }}
          >
            Clear Library
          </p>
        </button>
      </section>
    </div>
  )
}

export default LibraryRightElement
