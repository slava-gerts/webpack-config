import {createRoot} from 'react-dom/client'
import {App} from './components/App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Suspense} from 'react'

import {LazyAbout} from 'pages/about/About.lazy'
import {LazyShop} from 'pages/shop/Shop.lazy'

const root = document.getElementById('root')

const container = createRoot(root)

function onlyOne(...args: any[]) {
	var sum = 0;
	for (var i=0; i < args.length; i++) {
        // пропускаем ложные значения,
		// считая их 0, но избегайте NaN.
		if (arguments[i]) {
			sum += arguments[i];
		}
	}
	return sum == 1;
}

onlyOne(1, 0, undefined, NaN)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <h1><Suspense fallback="Loading..."><LazyAbout/></Suspense></h1>
      },
      {
        path: '/shop',
        element: <h1><Suspense fallback="Loading..."><LazyShop /></Suspense></h1>
      }
    ]
  }
])

container.render(<RouterProvider router={router} />)