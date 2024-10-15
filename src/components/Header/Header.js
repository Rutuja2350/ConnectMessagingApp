import React from 'react'
import './Header.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// using user's state from state provider --- (1/3)
import { useStateValue } from '../../StateProvider/StateProvider';

function Header() {

  // (2/3)
  const [{ user }] = useStateValue();

  console.log("user ", user)
  console.log("user.photoURL ", user.photoURL)

  return (
    <div className='header'>
      <div className='header_left'>
        <Avatar
          className='header_avatar'
          // (3/3)
          // "displayName" function or the "user", this is not from the DB, rather it is from the google authentication service providing actual google account info
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <AccessTimeIcon />
      </div>
      <div className='header_search'>
        <SearchIcon />
        <input placeholder="Search" />
      </div>
      <div className='header_right'>
        <HelpOutlineIcon />
      </div>
    </div>
  )
}

export default Header;
