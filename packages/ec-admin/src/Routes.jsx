import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Containers/HomePage';
import ManageProductPage from './Containers/ProductPage/ManageProduct';
import CreateProductPage from './Containers/ProductPage/CreateProduct';
import UpdateProductPage from './Containers/ProductPage/UpdateProduct';
import ManageCategoryPage from './Containers/CategoryPage/ManageCategory';
import CreateCategoryPage from './Containers/CategoryPage/CreateCategory';
import ManageTagPage from './Containers/TagPage/ManageTag';
import CreateTagPage from './Containers/TagPage/CreateTag';
import ManageOrderPage from './Containers/OrderPage/ManageOrder';
import CreateOrderPage from './Containers/OrderPage/CreateOrder';
import LoginPage from './Containers/AdminPage/Login';
import RegisterPage from './Containers/AdminPage/Register';
import Layout from './Components/Layout';

function Routes() {
  return (
    <BrowserRouter>
      {true?
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/manage-products" component={ManageProductPage} />
            <Route path="/create-product" component={CreateProductPage} />
            <Route path="/update-product/:slug" component={UpdateProductPage} />
            <Route path="/manage-categorys" component={ManageCategoryPage} />
            <Route path="/create-category" component={CreateCategoryPage} />
            <Route path="/manage-tags" component={ManageTagPage} />
            <Route path="/create-tag" component={CreateTagPage} />
            <Route path="/manage-orders" component={ManageOrderPage} />
            <Route path="/create-order" component={CreateOrderPage} />
            <Route path="/register-admin" component={RegisterPage} />
          </Switch>
        </Layout>
      :
      <Switch><Route path="/login" component={LoginPage} /></Switch>}
    </BrowserRouter>
  );
}

export default Routes;
