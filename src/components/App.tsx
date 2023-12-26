import React from 'react'

import { Link, Outlet } from 'react-router-dom'

import {Table} from 'components/Table'

import imagePng from 'assets/image-20230209-153659.png'
import IconSvg from 'assets/v6-icon.svg'

import styles from './App.module.scss'

function TEST(test: number) {
  console.log(test)
}

export const App = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div data-testid="App">
      <h1 data-testid="Platform">Platform {__PLATFORM__}</h1>
      <Table className={styles.table} container={styles.container} />
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src={imagePng} alt='image png' />
        <IconSvg width={50} height={50} fill={'red'} />
      </div>
      <Link to="/shop">Shop</Link>
      <br/>
      <Link to="/about">About</Link>
      <h1>{count}</h1>
      <button className={styles.button} onClick={() => setCount(prev => prev + 1)}>Click me</button>
      <Outlet />
    </div>
  )
}