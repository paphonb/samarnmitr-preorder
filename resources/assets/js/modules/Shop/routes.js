import RoutePath from '../../routes/RoutePath'
import Home from './scenes/Home'
import Detail from './scenes/Detail'
import Cart from './scenes/Cart'

export default {
    home: new RoutePath({
        path: '/shop/',
        exact: true,
        component: Home
    }),
    detail: new RoutePath({
        path: '/shop/detail/:productId/',
        exact: true,
        component: Detail
    }),
    cart: new RoutePath({
        path: '/shop/cart/',
        exact: true,
        component: Cart
    })
}
