import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import s from './register.css';
import {Link} from 'dva/router';


const FormItem = Form.Item;
class Register extends React.Component{

  constructor(props){
    super(props)
  }

  handleOk = () => {
    const { dispatch,form: {validateFieldsAndScroll,},} = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      const registerInfo = { ...values, type: '管理员' }
      dispatch({ type: 'register/register', payload: registerInfo });
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
   

    return (
      <div className={s.container}>
        <div className={s.form}>
          <div className={s.title}>管理员注册</div>
          <form className={s.login}>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input onPressEnter={this.handleOk} placeholder="输入注册用户名" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input type="password" onPressEnter={this.handleOk} placeholder="输入注册密码" />)}
            </FormItem>
            <Row>
              <Button type="primary" onClick={this.handleOk}  className={s.loginButton}>
              注 册
						</Button>
            </Row>
            <Row>
           <Link to="/"><p className={s.registerEnter}>回登录</p></Link>
            </Row>
          </form>
        </div>
      </div>
    );
  }
 }

Register.propTypes = {
};

export default connect(({ register }) => ({ register }))(Form.create()(Register));