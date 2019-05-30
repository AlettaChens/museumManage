import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import { Upload, Icon, Row, Col, Button } from 'antd';
const { TextArea } = Input;


class EditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loading: false,
            avatar: '',
        }
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file.response.data);
            this.setState({ avatar: info.file.response.data, loading: false, });
        }
    }

    beforeUpload = (file) => {
        const isJPG = file.type === "image/jpeg";
        const isGIF = file.type === "image/gif";
        const isPNG = file.type === "image/png";
        const isBMP = file.type === "image/bmp";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
            this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
        }
        if (!isLt2M) {
            this.$message.error("上传图片大小不能超过 2MB!");
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    }
    showModalHandler = e => {
        if (e) e.stopPropagation()
        this.setState({
            visible: true
        })
    }

    hideModalHandler = e => {
        if (e) e.stopPropagation()
        this.setState({
            visible: false
        })
    }

    okHandler = e => {
        if (e) e.stopPropagation()
        const { onOk, record: { id } } = this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const publish = { name: values.name, description: values.description, type: values.type, recommend: values.recommend, avatar: this.state.avatar }
                const info = { publish, id }
                onOk(info)
                this.hideModalHandler()
            }
        })
    }

    render() {
        const { children } = this.props
        const { getFieldDecorator } = this.props.form
        const { name, type, recommend, description } = this.props.record
        const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 }, };
        return (
            <span>
                <span onClick={this.showModalHandler}>
                    {children}
                    <Modal
                        title="藏品"
                        visible={this.state.visible}
                        onOk={this.okHandler}
                        onCancel={this.hideModalHandler}
                    >
                        <Form layout="horizontal" onSubmit={this.okHandler}>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item {...formItemLayout} label='名称'>
                                        {getFieldDecorator('name', {
                                            initialValue: name,
                                            rules: [
                                                { required: true, message: '请输入名称', }
                                            ]
                                        })(
                                            <Input placeholder='请输入藏品名称' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item {...formItemLayout} label='类型'>
                                        {getFieldDecorator('type', {
                                            initialValue: type,
                                            rules: [
                                                { required: true, message: '请输入类型', }
                                            ]
                                        })(
                                            <Input placeholder='请输入藏品类型' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={30}>
                                <Col span={22}>
                                    <Form.Item {...formItemLayout} label='是否推荐'>
                                        {getFieldDecorator('recommend', {
                                            initialValue: recommend,
                                            rules: [
                                                { required: true, message: '请输入是否推荐', }
                                            ]
                                        })(
                                            <Input placeholder='请输入推荐或者不推荐' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item {...formItemLayout} label='描述'>
                                        {getFieldDecorator('description', {
                                            initialValue: description,
                                            rules: [
                                                { required: true, message: '请输入描述', }
                                            ]
                                        })(
                                            <TextArea rows={4} placeholder='请输入藏品的描述信息' />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Form.Item {...formItemLayout} label='图片'>
                                        {getFieldDecorator('file', {
                                            rules: [
                                                { required: true, message: '请选择图片', }
                                            ]
                                        })(
                                            <Upload
                                                name="file"
                                                className="avatar-uploader"
                                                action="http://139.199.64.249:8080/museum-0.0.1-SNAPSHOT/collection/updateInfoUrl"
                                                beforeUpload={this.beforeUpload}
                                                onChange={this.handleChange}
                                            >
                                                <Button><Icon type="upload" />点击上传图片</Button>
                                            </Upload>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </span>
            </span>
        )
    }
}

export default Form.create()(EditModal)
