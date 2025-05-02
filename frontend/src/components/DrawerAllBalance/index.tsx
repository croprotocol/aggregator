import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { ConfigProvider, Drawer, Flex, Space, Spin } from 'antd';
import { AllBalanceItem, ApyListItem } from '@/components';
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { LeftCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import icon_wallet from '@/assets/icon_wallet.png';
import { useAllBalance } from '@/hooks';
const cx = classNames.bind(styles);
export type DrawerAllBalanceProps = {
  open: boolean;
  afterOpenChange: (value: boolean) => void;
};
const DrawerAllBalance: React.FC<DrawerAllBalanceProps> = ({
  open,
  afterOpenChange,
}) => {
  const currentAccount = useCurrentAccount();
  const [open1, setOpen1] = useState(false);
  const allBalance = useAllBalance(currentAccount?.address);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onWalletClick = () => {
    if (currentAccount) {
      setIsModalOpen(!isModalOpen);
    }
  };
  return (
    <Drawer
      afterOpenChange={afterOpenChange}
      className={cx('glass-container')}
      rootStyle={{
        marginTop: '50px',
        boxShadow: 'none !important',
        height: 'calc(100vh - 408px)',
        maxHeight: '600px',
        minHeight: '300px',
        zIndex: 101,
        borderRadius: '8px',
      }}
      bodyStyle={{
        overflow: 'hidden !important', // 禁用滚动条
        padding: 10,
      }}
      style={{ background: '#0d0d23', color: '#ffffff' }}
      closeIcon={false}
      mask={false}
      maskClosable={false}
      title={
        <Flex vertical={false} align={'center'}>
          <div
            style={{
              marginRight: '10px',
              height: '18px',
              width: '21px',
              backgroundImage: `url(${icon_wallet})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              flexShrink: 0,
            }}
          ></div>
          Your Wallet
        </Flex>
      }
      placement={'left'}
      width={300}
      onClose={() => {
        setOpen1(false);
      }}
      open={open1}
      extra={
        <Space>
          <LeftCircleOutlined
            style={{
              fontSize: '25px',
            }}
            onClick={() => {
              setOpen1(false);
            }}
            type="primary"
          />
        </Space>
      }
    >
      <div
        className={cx('hide-scrollbar')}
        style={{
          maxHeight: '100%',
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!currentAccount ? (
          <div className={cx('drawer')} onClick={onWalletClick}>
            <div
              style={{
                height: '24px',
                width: '28px',
                backgroundImage: `url(${icon_wallet})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                flexShrink: 0,
              }}
            ></div>
            <ConnectModal
              trigger={<div className={cx('drawer-address')}>Connect</div>}
              open={showModal}
              onOpenChange={(isOpen) => setShowModal(isOpen)}
            />
          </div>
        ) : (
          <Flex style={{ background: 'red', width: '100%' }} flex={1}>
            {allBalance.isLoading && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Spin: {
                        colorPrimary: '#fefefe',
                      },
                    },
                  }}
                >
                  <Spin
                    style={{
                      marginTop: '35px',
                    }}
                    indicator={<LoadingOutlined spin />}
                  />
                </ConfigProvider>
              </div>
            )}
            {allBalance.isError && (
              <div
                style={{
                  color: '#fefefe',
                  fontSize: '18px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '35px',
                  fontFamily: 'Bold, serif',
                }}
              >
                error
              </div>
            )}
            {allBalance.isSuccess &&
              (allBalance.data?.length || 0) > 0 &&
              allBalance.data?.map((item, index) => {
                return <AllBalanceItem item={item} key={index} />;
              })}
          </Flex>
        )}
      </div>
    </Drawer>
  );
};

export default React.memo(DrawerAllBalance);
