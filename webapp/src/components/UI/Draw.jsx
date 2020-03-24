import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';

export class ActionDraw extends PureComponent {

  static propTypes = {
    onClick: PropTypes.func
  };

  render() {
    const { onClick } = this.props;
    return (
      <Tooltip
        title={'Sortear'}
        placement="bottom">
        <Icon
          onClick={onClick}
          type="play-circle" />
      </Tooltip>
    );
  }

}