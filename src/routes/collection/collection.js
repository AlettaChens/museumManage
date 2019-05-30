import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import PropTypes from 'prop-types';
import CollectionModal from '../../component/CollectionModal'


class Collection extends React.Component {
  constructor(props) {
    super(props);
  }

  createHandler = (values) => {
    this.props.dispatch({
        type: 'collection/publish',
        payload: values.publish
    })
  }
  editHandler = (values) => {
    const editInfo=values.publish;
    const id=values.id;
    const endInfo={...editInfo,id}
    this.props.dispatch({
        type: 'collection/updateInfo',
        payload: endInfo
    })
  }
  deleteHandler = ({ id }) => {
    this.props.dispatch({
      type: 'collection/deleteInfoById',
      payload: { id }
    })
  }

  /**
   * 组件加载完毕后请求数据(藏品总数与首页的藏品条目)
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'collection/getInfoCount' });
    dispatch({ type: 'collection/getInfoByPage', payload: { offset: 1, pageSize: 8 } });
  }


  /**
   * 点击切换页码重新请求后台藏品条目
   */
  onChange = (page) => {
    const { dispatch } = this.props;
    dispatch({ type: 'collection/getInfoByPage', payload: { offset: page, pageSize: 8 } });
  }


  render() {
    const { collectionList, total } = this.props.collection;

    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '是否推荐',
      dataIndex: 'recommend',
      key: 'recommend',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '入库日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '管理',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) =>
        <span>
          <CollectionModal record={record} onOk={this.editHandler}>
            <Button type="primary">编辑</Button></CollectionModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={this.deleteHandler.bind(null, {
              id: record.id
            })}
          >
            <Button type="danger">删除</Button>
          </Popconfirm>
        </span>
    },];
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff' }}>
        <div>
          <CollectionModal record={{}} onOk={this.createHandler}>
            <Button type="primary">发布藏品</Button>
          </CollectionModal>
        </div>
        <Table dataSource={collectionList} columns={columns} rowKey={record => record.id} pagination={false} bordered style={{ marginTop: '10px' }} />
        <Pagination className="ant-table-pagination" defaultCurrent={1} total={total} onChange={this.onChange} pageSize={8} showTotal={(e) => { return "共 " + e + " 条" }} />
      </div>
    );
  }
}
Collection.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(({ collection }) => ({ collection }))(Collection);
