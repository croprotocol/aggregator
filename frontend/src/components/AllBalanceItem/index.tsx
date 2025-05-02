import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { ApyData } from 'cro-sdk';
import { Avatar, ConfigProvider, Popover } from 'antd';
import icon_banned from '@/assets/icon_banned.png';
import icon_url from '@/assets/icon_url.png';
import { translateBase } from '@/utils/dict';
import { platformItf } from '@/config/dict.interface';
import { platformMapping } from '@/config/dict.mapping';
import { ICON_URL } from '@/config/iconDefaultUrl';
import { AllCoinsBalanceItem } from '@/hooks/useAllBalance';
const cx = classNames.bind(styles);
export type AllBalanceItemProps = {
  item: AllCoinsBalanceItem;
};
const AllBalanceItem: React.FC<AllBalanceItemProps> = ({ item }) => {
  const clickUrl = () => {
    window.open('https://suivision.xyz/coin/' + item.coinType, '_blank');
  };
  return (
    <div className={cx('first')}>
      <div className={cx('label-left')}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div className={cx('left-top')}>{item.coin?.name}</div>
          <Avatar
            style={{
              marginLeft: '10px',
              width: '16px',
              height: '16px',
            }}
            onClick={clickUrl}
            src={icon_url}
          />
        </div>
        <div
          style={{
            marginTop: '3px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div className={cx('left-bottom')}>
            {Number(item.balance).toFixed(2)}
          </div>
          <Avatar
            style={{
              marginLeft: '10px',
              width: '18px',
              height: '18px',
            }}
            src={icon_banned}
          />
        </div>
      </div>
      <div className={cx('label-left')}>
        <div
          style={{
            marginTop: '19px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div className={cx('left-bottom')}>100M</div>
        </div>
      </div>
      <div className={cx('label-right')}>
        <Avatar
          style={{
            marginRight: '7px',
            width: '39px',
            height: '39px',
          }}
          src={item.coin?.iconUrl || ICON_URL}
        />
        {item.coin?.name}
      </div>
    </div>
  );
};

export default AllBalanceItem;
