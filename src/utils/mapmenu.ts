import { RouteRecordRaw } from 'vue-router'
// 定义一个函数将接收到的用户菜单userMenus映射到route中去
// 由于本案例中拿到的用户菜单是一个any类型的数组，所以通过该函数映射之后的返回值也是一个routes对象RouteRecordRaw类型的数组
export function mapMenutoRoutes(userMenus: any[]): RouteRecordRaw[] {
  // 1.首先定义一个变量用于存储匹配成功之后产生的route对象，由于每个菜单都对应着一个route对象，所以要使用数组进行保存这些route对象
  const routes: RouteRecordRaw[] = []

  // 2.先通过加载该项目中所有的路由模块进而获取该项目下所有的路由对象routes
  // 2.1.先定义一个变量用于存储该项目的所有route对象，由于有很多个route对象，所以可以用数组进行统一保存
  const allRoutes: RouteRecordRaw[] = []
  // 2.2.通过webpack中的require.context 方法：一个 webpack 的 api ，里面可以穿入3个参数（需要匹配的文件夹路径（string），是否递归查询（boolean），需要匹配的目标文件的后缀名（正则表达式）），通过其创建当前模块的上下文，通过该函数可以获取一个上下文，从而实现工程自动化
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 2.3.再通过创建模块中的上下文调用.keys()方法，返回一个由匹配成功的文件所组成的数组，再通过使用数组的forEach方法对数组中的每个元素进行操作
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    // 2.4.再通过commonjs的require方式将数组中的每个文件模块加载到变量route中（现在route中保存的是每个文件模块，而不是真正的route对象），由于key中保存的是匹配到的文件路径，而且是相对路径，类似：./analysis/dashboard/dashboard.ts,为了拿到在项目中的完整路径，所以要去掉该路径最前面的.（第一个字符）， 然后再和前面的@/router/main进行拼接，
    const route = require('../router/main' + key.split('.')[1])
    // 2.5.由于加载后的每个模块的default属性中保存的就是每个路由对象，所以可以通过.push这个方法将这些路由对象添加到allRoutes这一数组中，这样就拿到了该项目所有的路由
    allRoutes.push(route.default)
  })

  console.log(allRoutes)

  // 3.定义一个函数，通过该函数将获取到的用户菜单userMenus中的.path路径属性同项目中所有的路由对象allRoutes对象中的.path进行匹配，把匹配到的路由添加到之前定义的用于存储匹配成功之后的route对象routes数组中
  // 3.1.由于本项目数据结构的要求，我们需要定义一个递归函数进行递归匹配，Menus为获取到当前用户菜单的userMenus数组类型的形参
  const findRoutes = (menus: any[]) => {
    // 3.1.1.由于数据的要求，我们首先需要对数组中每个对象的.type进行筛选，只有type=2的菜单才是我们需要在项目中展示的路由
    for (const item of menus) {
      if (item.type === 2) {
        // 根据用户菜单中的每项路由对象中的.path和allRoutes中的每项路由对象的.url进行匹配，如果匹配成功则翻入route中
        const route = allRoutes.find((route) => {
          return route.path === item.url
        })
        // 判断上面route如果有值，说明匹配成功，则可以将此路由对象放入到前定义的用于存储匹配成功之后的route对象routes数组中
        if (route) {
          routes.push(route)
        }
      } else {
        // 这里是如果type!=2的路由对象，要将其.children传入到递归函数中继续查找
        findRoutes(item.children)
      }
    }
  }
  // 递归函数的调用
  findRoutes(userMenus)

  return routes
}
