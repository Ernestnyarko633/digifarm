/* eslint-disable */
import React from 'react';
import { useStyletron } from 'baseui';
import { Layer } from 'baseui/layer';
import { ChevronDown, Delete, Overflow, Upload } from 'baseui/icon';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';

import Logo1 from 'assets/images/logo@1x.svg';
import Logo2 from 'assets/images/logo@2x.svg';
import Logo3 from 'assets/images/logo@3x.svg';
import { Box } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

const BaseHeader = () => {
  const [css] = useStyletron();
  const [mainItems, setMainItems] = React.useState([
    { icon: Upload, label: 'Primary A' },
    { icon: Upload, label: 'Primary B' },
    {
      icon: ChevronDown,
      label: 'Primary C',
      navExitIcon: Delete,
      children: [
        { icon: Upload, label: 'Secondary A' },
        { icon: Upload, label: 'Secondary B' },
        { icon: Upload, label: 'Secondary C' },
        { icon: Upload, label: 'Secondary D' },
      ],
    },
    {
      icon: ChevronDown,
      label: 'Primary D',
      navExitIcon: Delete,
      children: [
        {
          icon: ChevronDown,
          label: 'Secondary E',
          children: [
            { icon: Upload, label: 'Tertiary A' },
            { icon: Upload, label: 'Tertiary B' },
          ],
        },
        { icon: Upload, label: 'Secondary F' },
      ],
    },
  ]);
  const [userItems, setUserItems] = React.useState([
    { icon: Overflow, label: 'Account item1' },
    { icon: Overflow, label: 'Account item2' },
    { icon: Overflow, label: 'Account item3' },
    { icon: Overflow, label: 'Account item4' },
  ]);
  const [isNavVisible, setIsNavVisible] = React.useState(false);
  function handleMainItemSelect(item) {
    setMainItems((prev) => setItemActive(prev, item));
  }

  return (
    <Layer>
      <div
        className={css({
          boxSizing: 'border-box',
          width: '100vw',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: 500,
        })}
      >
        <AppNavBar
          title={<Image h={10} w='100%' objectFit='contain' src={Logo3} />}
          mainItems={mainItems}
          userItems={userItems}
          onMainItemSelect={handleMainItemSelect}
          onUserItemSelect={(item) => console.log('user', item)}
          username='Umka Marshmallow'
          usernameSubtitle='5.0'
          userImgUrl=''
          overrides={{
            UserMenuProfileListItem: {
              style: {
                position: 'relative',
                zIndex: 100,
              },
            },
          }}
        />
      </div>
    </Layer>
  );
};

export default BaseHeader;
