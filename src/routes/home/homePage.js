import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './homePage.css';
import { Layout, Menu, Icon, Modal } from 'antd';
import logout from '../../assets/loginOut.png';
const { Header, Content, Sider } = Layout;

class homePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuSelected: '',
      visible: false,
    };
  }

  componentWillMount() {
    if (this.props.location.pathname == '/collection') {
      this.state.menuSelected = ['1'];
    } else if (this.props.location.pathname == '/user') {
      this.state.menuSelected = ['2'];
    }
  }


  menuItemClick = (item) => {
    if (item.key == '1') {
      this.props.dispatch(routerRedux.push('/collection'));
    } else if (item.key == '2') {
      this.props.dispatch(routerRedux.push('/user'));
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.history.push("/")
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Header className={styles.top}>
            <div className={styles.title}>博物馆藏品中后台管理系统</div>
            <img className={styles.avatar} src={logout} onClick={this.showModal}></img>
          </Header>
          <Layout>
            <Sider className={styles.left}>
              <Menu theme="dark" defaultSelectedKeys={this.state.menuSelected} mode="inline" onClick={this.menuItemClick}>
                <Menu.Item key="1">
                  <Icon type="desktop" />
                  <span>藏品管理</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="user" />
                  <span>用户列表</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className={styles.right} ref={(div) => { this.divContent = div }}>
              <div>
                {this.props.children}
              </div>
            </Content>
          </Layout>
        </Layout>

        <Modal
          width={300}
          title="退出系统确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p style={{color:'red'}}>是否退出系统?</p>
        </Modal>
      </div>
    );
  }
}

homePage.propTypes = {
};

export default connect()(homePage);
