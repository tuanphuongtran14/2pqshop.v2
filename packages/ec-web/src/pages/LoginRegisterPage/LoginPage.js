import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import { withRouter } from "react-router-dom";
import SearchContainer from "../../containers/SearchContainer";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  
  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    axios({
      method: "POST",
      url: "/users/auth/local",
      data: {
        email: document.getElementById("username").value,
        password: document.getElementById("password").value,
      },
    })
      .then((res) => {
        if (res && res.status === 200) {
          this.props.setToken(res.data.jwt);
          if (
            res.data.user.role.key !== "user" &&
            res.data.user.role.key !== "public"
          ) {
            this.props.setAdmin(true);
          } else {
            this.props.setAdmin(false);
          }

          let user = {
            ...res.data.user,
          };
          this.props.getUserLogin(user);
          this.props.fetchCartByIdUserRequest(user.id);
          this.props.fetchUserByIdRequest(user.id);
          this.props.fetchIdUserInCart(user.id);
          this.props.fetchIdUserInOrder(user.id);
          user = JSON.stringify(user);
          localStorage.setItem("user", user);
          this.setState({
            loading: false,
          });
          this.props.history.push("/");

          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        if (error.response) {
          if (error.response.status === 403) {
            if (
              window.confirm(
                "Vui l??ng x??c th???c t??i kho???n c???a b???n qua email tr?????c khi ????ng nh???p!!! C???n g???i l???i mail x??c th???c?"
              )
            ) {
              axios({
                method: "POST",
                url: `resend-confirmed-email`,
                data: {
                  username: document.getElementById("username").value,
                  password: document.getElementById("password").value,
                },
              })
                .then((res) => {
                  alert(
                    "G???i l???i mail x??c nh???n th??nh c??ng!!! Vui l??ng ki???m tra email c???a b???n"
                  );
                })
                .catch((err) => {
                  alert("L???i: " + err.response.data.message);
                });
            }
          } else alert("L???i: " + error.response.data.message);
        }
      });
  };

  render() {
    if (this.props.token) {
      this.props.history.push("/");
    }

    let disabledSubmit = this.state.loading === true ? true : false;
    let contentSubmit =
      this.state.loading === false ? (
        "????ng nh???p"
      ) : (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );

    return (
      <Fragment>
        <div className="container mt-2 mb-5">
          <Helmet>
            <title>????ng nh???p</title>
          </Helmet>
          <form className="row">
            <div
              className="col-md-6 p-4 shadow wow fadeInLeftBig"
              data-wow-duration="1s"
            >
              <div className="form-group">
                <h2 className="text-center">????ng nh???p</h2>
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  aria-describedby="helpId"
                  placeholder="T??n ????ng nh???p"
                />
              </div>
              <div className="form-group">
                <label>M???t kh???u</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  aria-describedby="helpId"
                  placeholder="M???t kh???u"
                />
              </div>
              <p className="text-center">
                <u>
                  <Link to="/forget-password">Qu??n m???t kh???u?</Link>
                </u>
              </p>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-dark w-25"
                  onClick={this.handleLoginSubmit}
                  disabled={disabledSubmit}
                >
                  {contentSubmit}
                </button>
              </div>
            </div>

            <div
              className="col-md-6 p-5 wow fadeInRightBig"
              data-wow-duration="1s"
            >
              <h2>Ng?????i M???i? T???o T??i Kho???n</h2>
              <p>
                B???ng c??ch t???o t??i kho???n v???i c???a h??ng c???a ch??ng t??i, b???n s??? c??
                th??? th???c hi???n quy tr??nh thanh to??n nhanh h??n, l??u tr??? nhi???u ?????a
                ch??? giao h??ng, xem v?? theo d??i ????n ?????t h??ng trong t??i kho???n c???a
                b???n v?? h??n th??? n???a.
              </p>
              <Link to="/register">
                <button type="button" className="btn btn-primary">
                  T???o t??i kho???n m???i
                </button>
              </Link>
            </div>
          </form>
        </div>
        <SearchContainer history={this.props.history} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.authorization,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => {
      dispatch(actions.setToken(token));
    },
    setAdmin: (isAdmin) => {
      dispatch(actions.setAdmin(isAdmin));
    },
    getUserLogin: (user) => {
      dispatch(actions.getUserLogin(user));
    },
    fetchUserByIdRequest: (id) => {
      dispatch(actions.fetchUserByIdRequest(id));
    },
    fetchIdUserInOrder: (id) => {
      dispatch(actions.fetchIdUserInOrder(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));
