import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';

export class ActionEdit extends PureComponent {

  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    const { onClick } = this.props;
    return (
      <Tooltip 
        title={'Editar'}
        placement="bottom">
        <Icon 
          onClick={onClick}
          type="edit"/>
      </Tooltip>
    );
  }

}