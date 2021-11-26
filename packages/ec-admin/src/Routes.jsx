import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import HomePage from './Containers/HomePage';
import ManageProductPage from './Containers/ProductPage/ManageProduct';
import CreateProductPage from './Containers/ProductPage/CreateProduct';
import ManageCategoryPage from './Containers/CategoryPage/ManageCategory';
import CreateCategoryPage from './Containers/CategoryPage/CreateCategory';
import ManageTagPage from './Containers/TagPage/ManageTag';
import CreateTagPage from './Containers/TagPage/CreateTag';
import ManageOrderPage from './Containers/OrderPage/ManageOrder';
import CreateOrderPage from './Containers/OrderPage/CreateOrder';
import LoginPage from './Containers/LoginPage/LoginPage';
import ForgetPasswordPage from './Containers/LoginPage/ForgetPasswordPage';
import ResetPasswordPage from './Containers/LoginPage/ResetPasswordPage';
import Layout from './Components/Layout';
import LoadingScreen from './Components/LoadingScreen';

function Routes({ isLoggedIn, isLoading }) {
  if (isLoading) {
    return (<LoadingScreen />);
  }

  return (
    <BrowserRouter>
      {isLoggedIn ?
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/manage-products" component={ManageProductPage} />
            <Route path="/create-product" component={CreateProductPage} />
            <Route path="/manage-categorys" component={ManageCategoryPage} />
            <Route path="/create-category" component={CreateCategoryPage} />
            <Route path="/manage-tags" component={ManageTagPage} />
            <Route path="/create-tag" component={CreateTagPage} />
            <Route path="/manage-orders" component={ManageOrderPage} />
            <Route path="/create-order" component={CreateOrderPage} />
            <Redirect from="/dang-nhap" to="/" />
            <Redirect from="/quen-mat-khau" to="/" />
            <Redirect from="/dat-lai-mat-khau" to="/" />
          </Switch>
        </Layout>
      :
      <Switch>
        <Route path="/dang-nhap" component={LoginPage} />
        <Route path="/quen-mat-khau" component={ForgetPasswordPage} />
        <Route path="/dat-lai-mat-khau" component={ResetPasswordPage} />
        <Redirect from="*" to="/dang-nhap" />
      </Switch>}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps)(Routes);