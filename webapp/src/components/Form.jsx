import React, { PureComponent } from "react";
import { Modal, Form, Input } from "antd";

const FormItem = Form.Item;

export const FormPerson = Form.create()(
  class extends PureComponent {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      };

      return (
        <Modal
          visible={visible}
          title="Novo"
          onCancel={onCancel}
          cancelText="Cancelar"
          onOk={onCreate}
          okText="Salvar"
        >
          <FormItem {...formItemLayout} label={<span>Nome</span>}>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Por favor, insira um nome!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label={<span>E-mail</span>}>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "E-mail inválido!"
                },
                {
                  required: true,
                  message: "Por favor, insira um e-mail!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>
        </Modal>
      );
    }
  }
); // form
