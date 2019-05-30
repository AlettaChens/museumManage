import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import s from './login.css';
import { Link } from 'dva/router';


const FormItem = Form.Item;
class Login extends Component {

  handleOk = () => {
    const { dispatch, form: { validateFieldsAndScroll, }, } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const loginInfo = { ...values, type: '管理员' }
      dispatch({ type: 'login/login', payload: loginInfo });
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;


    return (
      <div className={s.container}>
        <div className={s.form}>
          <div className={s.title}>博物馆藏品后台管理系统</div>
          <form className={s.login}>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input onPressEnter={this.handleOk} placeholder="输入登录用户名" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type="password" onPressEnter={this.handleOk} placeholder="输入登录密码" />)}
            </FormItem>
            <Row>
              <Button type="primary" onClick={this.handleOk} className={s.loginButton}>
                登 录
						</Button>
            </Row>
            <Row>
              <Link to="/register"><p className={s.registerEnter}>去注册</p></Link>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({ login }) => ({ login }))(Form.create()(Login));