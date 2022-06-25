const goods = () => import('@/views/main/product/goods/GoodsView.vue')
export default {
  path: '/main/product/goods',
  name: 'goods',
  component: goods,
  children: []
}
