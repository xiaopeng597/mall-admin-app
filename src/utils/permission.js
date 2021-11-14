// 存储角色对应的路由
const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
  	name: 'ProductEdit',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
  	name: 'ProductEdit',
  }, {
    name: 'Category',
  }],
};

// 过滤掉没有权限的路由
export default function getMenuRoute(role, routes) {
  console.log(role, routes);
  const allowRoutesName = roleToRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
  	const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
