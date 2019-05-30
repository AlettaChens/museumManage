import React from 'react';
import { connect } from 'dva';
import { Table, Pagination } from 'antd';


const columns = [{
  title: '姓名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '地址',
  dataIndex: 'address',
  key: 'address',
}]

class UserPager extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/getUserCount', payload: { type: '游客' } });
    dispatch({ type: 'user/getUserPage', payload: { offset: 1, pageSize: 8 } });
  }

  onChange = (page) => {
    console.log(page);
    const { dispatch } = this.props;
    dispatch({ type: 'user/getUserPage', payload: { offset: page, pageSize: 8 } });
  }

  render() {
    const { userList, total } = this.props.user;
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff' }}>
        <Table dataSource={userList} columns={columns} rowKey={record => record.id} pagination={false} bordered />
        <Pagination className="ant-table-pagination" defaultCurrent={1} total={total} onChange={this.onChange} pageSize={8} showTotal={(e) => { return "共 " + e + " 条" }} />
      </div>
    );
  }
}

UserPager.propTypes = {

};
export default connect(({ user }) => ({ user }))(UserPager);
