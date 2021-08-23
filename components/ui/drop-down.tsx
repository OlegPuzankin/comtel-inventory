import React from 'react';
import { MenuItem } from '../../interfaces/common_interfaces';
import cn from 'classnames'

interface Props {
  buttonText?: string
  menuItems: Array<MenuItem>,
  menuRight?: boolean
}



export function DropDown({ menuItems, buttonText, menuRight = false }: Props) {

  return (
    <div className="drop-down">
      <button className='drop-down-button'>
        <div className="text">{buttonText}</div>
        <div className="arrows-icon">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill='#fff' width="20" height="20" viewBox="0 0 20 20">
            <title>select-arrows</title>
            <path d="M10 1l-5 7h10l-5-7zM10 19l5-7h-10l5 7z"></path>
          </svg>
        </div>

      </button>
      <ul className={cn('drop-down-menu', { 'drop-down-menu--right': menuRight })} >
        {menuItems?.map(mi => {
          return (<li
            key={mi.id}
            onClick={() => mi.clickHandler()}
            className='drop-down-menu--item'>{mi.menuItemText}</li>)
        })}

      </ul>
    </div >
  )
}


