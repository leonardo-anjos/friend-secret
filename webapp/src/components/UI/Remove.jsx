import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Popconfirm, Tooltip } from 'antd';

export class ActionRemove extends PureComponent {

  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    const { onClick } = this.props;
    return (
      <Popconfirm
        title="Tem certeza que quer remover?"
        okText="Remover"
        cancelText="Cancelar"
        onConfirm={onClick}>
        <Tooltip 
          placement="bottom"
          title={"Remover"}>
          <Icon type="delete"/>
        </Tooltip>
      </Popconfirm>
    );
  }

}