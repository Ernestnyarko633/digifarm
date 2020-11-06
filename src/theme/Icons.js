import React from 'react';
import { createIcon } from '@chakra-ui/icon';

export const Shape = createIcon({
  displayName: 'Shape',
  viewBox: '0 0 24 24',
  path: (
    <polygon
      preserveAspectRatio='none'
      fill='currentColor'
      points='50,0 100,0 50,100 0,100'
    />
  ),
});

export const menuOpen = createIcon({
  displayName: 'menuOpen',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M4 6h16M4 12h16m-7 6h7'
    />
  ),
});

export const menuClose = createIcon({
  displayName: 'menuClose',
  viewBox: '0 0 24 24',
  path: (
    <path
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M6 18L18 6M6 6l12 12'
    />
  ),
});

export const chat = createIcon({
  displayName: 'chat',
  viewBox: '0 0 24 24',
  path: (
    <>
      <path
        fill='currentColor'
        d='M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z'
      />
      <path
        fill='currentColor'
        d='M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z'
      />
    </>
  ),
});

export const like = createIcon({
  displayName: 'like',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
      clipRule='evenodd'
      fillRule='evenodd'
    />
  ),
});

export const upload = createIcon({
  displayName: 'upload',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M2 10a4 4 0 004 4h3v3a1 1 0 102 0v-3h3a4 4 0 000-8 4 4 0 00-8 0 4 4 0 00-4 4zm9 4H9V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 9.414V14z'
      clipRule='evenodd'
    />
  ),
});

export const user = createIcon({
  displayName: 'user',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
      clipRule='evenodd'
    />
  ),
});

export const project = createIcon({
  displayName: 'project',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      d='M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
    />
  ),
});

export const Trash = createIcon({
  displayName: 'Trash',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
      clipRule='evenodd'
    />
  ),
});

export const cog = createIcon({
  displayName: 'cog',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
      clipRule='evenodd'
    />
  ),
});

export const notification = createIcon({
  displayName: 'notification',
  viewBox: '0 0 23 23',
  path: (
    <>
      <mask
        id='mask0'
        mask-type='alpha'
        maskUnits='userSpaceOnUse'
        x='3'
        y='1'
        width='17'
        height='21'
      >
        <path
          width='23'
          height='23'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M19.4215 15.329C19.4708 15.3809 19.5182 15.4306 19.5631 15.4789C19.7877 15.72 19.8873 16.009 19.8854 16.2916C19.8817 16.9056 19.3995 17.4895 18.6838 17.4895H4.31625C3.60049 17.4895 3.11871 16.9056 3.11459 16.2916C3.11272 16.009 3.21229 15.7204 3.4369 15.4789C3.48183 15.4306 3.52918 15.3809 3.57849 15.329C4.32303 14.5463 5.51342 13.2948 5.51342 9.70308C5.51342 6.79439 7.55287 4.46594 10.3028 3.89469V3.11454C10.3028 2.45307 10.8389 1.91663 11.5 1.91663C12.1611 1.91663 12.6972 2.45307 12.6972 3.11454V3.89469C15.4471 4.46594 17.4866 6.79439 17.4866 9.70308C17.4866 13.2948 18.677 14.5463 19.4215 15.329ZM13.8947 18.6875C13.8947 20.0108 12.8222 21.0833 11.5 21.0833C10.1778 21.0833 9.1053 20.0108 9.1053 18.6875H13.8947Z'
          fill='currentColor'
        />
      </mask>
      <g mask='url(#mask0)'>
        <rect width='23' height='23' fill='currentColor' />
      </g>
    </>
  ),
});

export const pencil = createIcon({
  displayName: 'pencil',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'
    />
  ),
});

export const home = createIcon({
  displayName: 'home',
  viewBox: '0 0 69 69',
  path: (
    <path
      width='69'
      height='69'
      d='M28.75 57.5V40.25H40.25V57.5H54.625V34.5H63.25L34.5 8.625L5.75 34.5H14.375V57.5H28.75Z'
      fill='currentColor'
    />
  ),
});

export const farm = createIcon({
  displayName: 'farm',
  viewBox: '0 0 72 60',
  path: (
    <path
      width='72'
      height='60'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M39.154 0H32.035V5.932H39.154V0ZM55.727 8.182L50.694 3.982L45.661 8.182L50.694 12.375L55.727 8.182ZM53.392 23.73H60.511V17.8H53.392V23.73ZM25.526 8.182L20.493 3.982L15.46 8.182L20.493 12.375L25.526 8.182ZM17.8 17.8H10.678V23.73H17.8V17.8ZM3.559 29.662C2.69526 29.5898 1.83778 29.8603 1.17184 30.4151C0.505907 30.9699 0.0849763 31.7644 0 32.627L0 54.379L17.8 29.662H3.559ZM39.152 29.662L42.711 59.324H56.95L46.271 29.662H39.152ZM67.63 29.662H53.392L71.192 54.379V32.627C71.192 30.993 69.592 29.662 67.632 29.662H67.63ZM14.236 59.325H28.474L32.033 29.663H24.914L14.236 59.325ZM21.357 20.765C21.3849 22.8984 22.0747 24.9705 23.331 26.695H47.856C49.1123 24.9705 49.8021 22.8984 49.83 20.765C49.83 14.212 43.456 8.9 35.592 8.9C27.728 8.9 21.355 14.212 21.355 20.765'
      fill='currentColor'
    />
  ),
});

export const activity = createIcon({
  displayName: 'activity',
  viewBox: '0 0 53 58',
  path: (
    <path
      width='53'
      height='58'
      d='M46.375 7.25H35.3333C35.3333 3.25117 31.3721 0 26.5 0C21.6279 0 17.6667 3.25117 17.6667 7.25H6.625C2.96745 7.25 0 9.68555 0 12.6875V52.5625C0 55.5645 2.96745 58 6.625 58H46.375C50.0326 58 53 55.5645 53 52.5625V12.6875C53 9.68555 50.0326 7.25 46.375 7.25ZM13.25 48.0312C11.4143 48.0312 9.9375 46.8191 9.9375 45.3125C9.9375 43.8059 11.4143 42.5938 13.25 42.5938C15.0857 42.5938 16.5625 43.8059 16.5625 45.3125C16.5625 46.8191 15.0857 48.0312 13.25 48.0312ZM13.25 37.1562C11.4143 37.1562 9.9375 35.9441 9.9375 34.4375C9.9375 32.9309 11.4143 31.7188 13.25 31.7188C15.0857 31.7188 16.5625 32.9309 16.5625 34.4375C16.5625 35.9441 15.0857 37.1562 13.25 37.1562ZM13.25 26.2812C11.4143 26.2812 9.9375 25.0691 9.9375 23.5625C9.9375 22.0559 11.4143 20.8438 13.25 20.8438C15.0857 20.8438 16.5625 22.0559 16.5625 23.5625C16.5625 25.0691 15.0857 26.2812 13.25 26.2812ZM26.5 4.53125C28.3357 4.53125 29.8125 5.74336 29.8125 7.25C29.8125 8.75664 28.3357 9.96875 26.5 9.96875C24.6643 9.96875 23.1875 8.75664 23.1875 7.25C23.1875 5.74336 24.6643 4.53125 26.5 4.53125ZM44.1667 46.2188C44.1667 46.7172 43.6698 47.125 43.0625 47.125H23.1875C22.5802 47.125 22.0833 46.7172 22.0833 46.2188V44.4062C22.0833 43.9078 22.5802 43.5 23.1875 43.5H43.0625C43.6698 43.5 44.1667 43.9078 44.1667 44.4062V46.2188ZM44.1667 35.3438C44.1667 35.8422 43.6698 36.25 43.0625 36.25H23.1875C22.5802 36.25 22.0833 35.8422 22.0833 35.3438V33.5312C22.0833 33.0328 22.5802 32.625 23.1875 32.625H43.0625C43.6698 32.625 44.1667 33.0328 44.1667 33.5312V35.3438ZM44.1667 24.4688C44.1667 24.9672 43.6698 25.375 43.0625 25.375H23.1875C22.5802 25.375 22.0833 24.9672 22.0833 24.4688V22.6562C22.0833 22.1578 22.5802 21.75 23.1875 21.75H43.0625C43.6698 21.75 44.1667 22.1578 44.1667 22.6562V24.4688Z'
      fill='currentColor'
    />
  ),
});

export const delivery = createIcon({
  displayName: 'delivery',
  viewBox: '0 0 94 94',
  path: (
    <path
      width='94'
      height='94'
      d='M11.7474 52.8724L8.8099 46.9974H29.3724L27.0224 41.1224H7.83073L4.89323 35.2474H35.4432L33.0932 29.3724H4.3449L0.976562 23.4974H15.6641C15.6641 21.4199 16.4894 19.4274 17.9584 17.9584C19.4274 16.4894 21.4199 15.6641 23.4974 15.6641H70.4974V31.3307H82.2474L93.9974 46.9974V66.5807H86.1641C86.1641 69.697 84.9261 72.6857 82.7226 74.8892C80.519 77.0928 77.5304 78.3307 74.4141 78.3307C71.2978 78.3307 68.3091 77.0928 66.1056 74.8892C63.902 72.6857 62.6641 69.697 62.6641 66.5807H46.9974C46.9974 69.697 45.7595 72.6857 43.5559 74.8892C41.3524 77.0928 38.3637 78.3307 35.2474 78.3307C32.1311 78.3307 29.1424 77.0928 26.9389 74.8892C24.7353 72.6857 23.4974 69.697 23.4974 66.5807H15.6641V52.8724H11.7474ZM74.4141 72.4557C75.9722 72.4557 77.4665 71.8368 78.5683 70.735C79.6701 69.6332 80.2891 68.1389 80.2891 66.5807C80.2891 65.0226 79.6701 63.5282 78.5683 62.4265C77.4665 61.3247 75.9722 60.7057 74.4141 60.7057C72.8559 60.7057 71.3616 61.3247 70.2598 62.4265C69.158 63.5282 68.5391 65.0226 68.5391 66.5807C68.5391 68.1389 69.158 69.6332 70.2598 70.735C71.3616 71.8368 72.8559 72.4557 74.4141 72.4557ZM80.2891 37.2057H70.4974V46.9974H87.9657L80.2891 37.2057ZM35.2474 72.4557C36.8055 72.4557 38.2999 71.8368 39.4017 70.735C40.5034 69.6332 41.1224 68.1389 41.1224 66.5807C41.1224 65.0226 40.5034 63.5282 39.4017 62.4265C38.2999 61.3247 36.8055 60.7057 35.2474 60.7057C33.6893 60.7057 32.1949 61.3247 31.0931 62.4265C29.9914 63.5282 29.3724 65.0226 29.3724 66.5807C29.3724 68.1389 29.9914 69.6332 31.0931 70.735C32.1949 71.8368 33.6893 72.4557 35.2474 72.4557Z'
      fill='currentColor'
    />
  ),
});

export const inventory = createIcon({
  displayName: 'inventory',
  viewBox: '0 0 60 66',
  path: (
    <path
      width='60'
      height='66'
      d='M47.25 45.374H12.7875C12.375 45.374 12.0375 45.8381 12.0375 46.4053L12.0281 52.5931C12.0281 53.1603 12.3656 53.6244 12.7781 53.6244H47.25C47.6625 53.6244 48 53.1603 48 52.5931V46.4053C48 45.8381 47.6625 45.374 47.25 45.374ZM47.25 57.7496H12.7594C12.3469 57.7496 12.0094 58.2137 12.0094 58.7809L12 64.9687C12 65.5359 12.3375 66 12.75 66H47.25C47.6625 66 48 65.5359 48 64.9687V58.7809C48 58.2137 47.6625 57.7496 47.25 57.7496ZM47.25 32.9984H12.8063C12.3938 32.9984 12.0563 33.4625 12.0563 34.0297L12.0469 40.2175C12.0469 40.7847 12.3844 41.2488 12.7969 41.2488H47.25C47.6625 41.2488 48 40.7847 48 40.2175V34.0297C48 33.4625 47.6625 32.9984 47.25 32.9984ZM57.2344 15.0795L31.725 0.473762C31.1767 0.160993 30.5889 0 29.9953 0C29.4017 0 28.8139 0.160993 28.2656 0.473762L2.76562 15.0795C1.09688 16.0464 0 18.2895 0 20.7904V64.9687C0 65.5359 0.3375 66 0.75 66H8.25C8.6625 66 9 65.5359 9 64.9687V32.9984C9 30.7295 10.3688 28.8732 12.0563 28.8732H47.9437C49.6312 28.8732 51 30.7295 51 32.9984V64.9687C51 65.5359 51.3375 66 51.75 66H59.25C59.6625 66 60 65.5359 60 64.9687V20.7904C60 18.2895 58.9031 16.0464 57.2344 15.0795Z'
      fill='currentColor'
    />
  ),
});

export const warehouse = createIcon({
  displayName: 'warehouse',
  viewBox: '0 0 60 66',
  path: (
    <path
      width='60'
      height='66'
      d='M47.25 45.374H12.7875C12.375 45.374 12.0375 45.8381 12.0375 46.4053L12.0281 52.5931C12.0281 53.1603 12.3656 53.6244 12.7781 53.6244H47.25C47.6625 53.6244 48 53.1603 48 52.5931V46.4053C48 45.8381 47.6625 45.374 47.25 45.374ZM47.25 57.7496H12.7594C12.3469 57.7496 12.0094 58.2137 12.0094 58.7809L12 64.9687C12 65.5359 12.3375 66 12.75 66H47.25C47.6625 66 48 65.5359 48 64.9687V58.7809C48 58.2137 47.6625 57.7496 47.25 57.7496ZM47.25 32.9984H12.8063C12.3938 32.9984 12.0563 33.4625 12.0563 34.0297L12.0469 40.2175C12.0469 40.7847 12.3844 41.2488 12.7969 41.2488H47.25C47.6625 41.2488 48 40.7847 48 40.2175V34.0297C48 33.4625 47.6625 32.9984 47.25 32.9984ZM57.2344 15.0795L31.725 0.473762C31.1767 0.160993 30.5889 0 29.9953 0C29.4017 0 28.8139 0.160993 28.2656 0.473762L2.76562 15.0795C1.09688 16.0464 0 18.2895 0 20.7904V64.9687C0 65.5359 0.3375 66 0.75 66H8.25C8.6625 66 9 65.5359 9 64.9687V32.9984C9 30.7295 10.3688 28.8732 12.0563 28.8732H47.9437C49.6312 28.8732 51 30.7295 51 32.9984V64.9687C51 65.5359 51.3375 66 51.75 66H59.25C59.6625 66 60 65.5359 60 64.9687V20.7904C60 18.2895 58.9031 16.0464 57.2344 15.0795Z'
      fill='currentColor'
    />
  ),
});

export const wallet = createIcon({
  displayName: 'wallet',
  viewBox: '0 0 58 55',
  path: (
    <path
      width='58'
      height='55'
      d='M52.2453 11.7857H9.0625C8.06109 11.7857 7.25 10.9067 7.25 9.82143C7.25 8.73616 8.06109 7.85714 9.0625 7.85714H52.5625C53.5639 7.85714 54.375 6.97813 54.375 5.89286C54.375 2.63828 51.9406 0 48.9375 0H7.25C3.24551 0 0 3.5173 0 7.85714V47.1429C0 51.4827 3.24551 55 7.25 55H52.2453C55.4195 55 58 52.3568 58 49.1071V17.6786C58 14.4289 55.4195 11.7857 52.2453 11.7857ZM47.125 37.3214C45.1233 37.3214 43.5 35.5622 43.5 33.3929C43.5 31.2235 45.1233 29.4643 47.125 29.4643C49.1267 29.4643 50.75 31.2235 50.75 33.3929C50.75 35.5622 49.1267 37.3214 47.125 37.3214Z'
      fill='currentColor'
    />
  ),
});

export const bookmark = createIcon({
  displayName: 'bookmark',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-bookmark'
      d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'
    />
  ),
});

export const support = createIcon({
  displayName: 'support',
  viewBox: '0 0 20 20',
  path: (
    <>
      <path
        width='20'
        height='20'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.7778 6.08696H17.6889C17.1478 2.65087 13.9111 0 10 0C6.08889 0 2.85222 2.65087 2.31111 6.08696H2.22222C0.994445 6.08696 0 6.99594 0 8.11594V10.1449C0 11.2649 0.994445 12.1739 2.22222 12.1739H4.44444V7.10145C4.44444 4.30449 6.93667 2.02899 10 2.02899C13.0633 2.02899 15.5556 4.30449 15.5556 7.10145V12.1739H17.7778C19.0056 12.1739 20 11.2649 20 10.1449V8.11594C20 6.99594 19.0056 6.08696 17.7778 6.08696Z'
        fill='currentColor'
      />
      <path
        width='20'
        height='20'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.2857 8.26082C14.2857 6.10278 12.3636 4.34778 10 4.34778C7.63644 4.34778 5.71429 6.10278 5.71429 8.26082C5.71429 10.4179 7.63644 12.1739 10 12.1739C12.3636 12.1739 14.2857 10.4179 14.2857 8.26082Z'
        fill='currentColor'
      />
      <path
        width='20'
        height='20'
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 13.0435C4.67323 13.0435 0.952393 15.4951 0.952393 19.0062V20H19.0476V19.0062C19.0476 15.4951 15.3268 13.0435 10 13.0435Z'
        fill='currentColor'
      />
    </>
  ),
});

export const calendar = createIcon({
  displayName: 'calendar',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
      clipRule='evenodd'
    />
  ),
});

export const help = createIcon({
  displayName: 'help',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
      clipRule='evenodd'
    />
  ),
});

export const logout = createIcon({
  displayName: 'logout',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z'
      clipRule='evenodd'
    />
  ),
});

export const sourcing = createIcon({
  displayName: 'sourcing',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
    />
  ),
});

export const arrowLeft = createIcon({
  displayName: 'arrowLeft',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
      clipRule='evenodd'
    />
  ),
});

export const arrowRight = createIcon({
  displayName: 'arrowRight',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
      clipRule='evenodd'
    />
  ),
});

export const chevronDown = createIcon({
  displayName: 'chevronDown',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
      clipRule='evenodd'
    />
  ),
});

export const chevronUp = createIcon({
  displayName: 'chevronUp',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
      clipRule='evenodd'
    />
  ),
});

export const chevronLeft = createIcon({
  displayName: 'chevronLeft',
  viewBox: '0 0 24 24',
  path: (
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      d='M15 19l-7-7 7-7'
    />
  ),
});

export const chevronRight = createIcon({
  displayName: 'chevronRight',
  viewBox: '0 0 24 24',
  path: (
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      d='M9 5l7 7-7 7'
    />
  ),
});

export const document = createIcon({
  displayName: 'document',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
    />
  ),
});

export const history = createIcon({
  displayName: 'history',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  ),
});

export const mail = createIcon({
  displayName: 'mail',
  viewBox: '0 0 24 24',
  path: (
    <>
      <path
        fill='currentColor'
        d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'
      />
      <path
        fill='currentColor'
        d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'
      />
    </>
  ),
});

export const location = createIcon({
  displayName: 'location',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
      clipRule='evenodd'
    />
  ),
});

export const checkCircle = createIcon({
  displayName: 'checkCircle',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
      clipRule='evenodd'
    />
  ),
});

export const image = createIcon({
  displayName: 'image',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
      clipRule='evenodd'
    />
  ),
});

export const map = createIcon({
  displayName: 'map',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
    />
  ),
});

export const market = createIcon({
  displayName: 'market',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
    />
  ),
});

export const arrowDown = createIcon({
  displayName: 'arrowDown',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z'
      clipRule='evenodd'
    />
  ),
});

export const circle = createIcon({
  displayName: 'circle',
  viewBox: '0 0 24 24',
  path: (
    <circle
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      cx='12'
      cy='12'
      r='10'
    />
  ),
});

export const closeIcon = createIcon({
  displayName: 'closeIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      d='M6 18L18 6M6 6l12 12'
    />
  ),
});

export const Add = createIcon({
  displayName: 'Add',
  viewBox: '0 0 24 24',
  path: (
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
    />
  ),
});

export const elipses = createIcon({
  displayName: 'elipses',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'
    />
  ),
});

export const arrowNarrowRight = createIcon({
  displayName: 'arrowNarrowRigt',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M17 8l4 4m0 0l-4 4m4-4H3'
    />
  ),
});

export const Refresh = createIcon({
  displayName: 'Refresh',
  viewBox: '0 0 61 60',
  path: (
    <path
      width='61'
      height='60'
      d='M59.5528 36.6158L52.1569 49.4254C50.7073 51.9695 48.0153 53.3008 45.2936 53.1233H39.3769V59.04L31.9811 45.7275L39.3769 32.415V38.3316H47.7194L41.1519 26.942L53.9615 19.5462L59.2865 28.7762C60.8248 31.0541 61.0319 34.1012 59.5528 36.6158ZM22.2482 0.0507812H37.0398C39.939 0.0507812 42.4536 1.73703 43.6665 4.16286L46.6248 9.31037L51.7428 6.35203L43.9328 19.3983L28.6973 19.6645L33.8153 16.7062L29.644 9.45828L23.1061 20.8479L10.2669 13.452L15.5919 4.22203C16.8048 1.76661 19.3194 0.0507812 22.2482 0.0507812ZM9.94151 49.455L2.54568 36.6454C1.09609 34.1308 1.30318 31.1133 2.81193 28.8354L5.77026 23.7175L0.652344 20.7591L15.8582 20.9958L23.6978 34.0716L18.5798 31.1133L14.4086 38.3316H27.5436V53.1233H16.8936C14.1423 53.3304 11.4207 51.9695 9.94151 49.455Z'
      fill='currentColor'
    />
  ),
});

export const info = createIcon({
  displayName: 'info',
  viewBox: '0 0 24 24',
  path: (
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  ),
});

export const calender = createIcon({
  displayName: 'calender',
  viewBox: '0 0 448 512',
  path: (
    <path
      fill='currentColor'
      d='M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z'
    />
  ),
});

export const editPencil = createIcon({
  displayName: 'editPencil',
  viewBox: '0 0 29 29',
  path: (
    <path
      fill='currentColor'
      width='29'
      height='29'
      stroke='currentColor'
      fillRule='evenodd'
      d='M26.25 11l1.043-1.042c2.277-2.273 2.275-5.978 0-8.252-2.275-2.275-5.978-2.274-8.25 0L18 2.75 26.25 11zM15.901 5L3 17.969 8.174 19 19 8.115zM.446 28.556c.375.377.924.527 1.442.4L9 27.175l-1.187-5.99L1.823 20 .045 27.11c-.128.521.022 1.067.4 1.446M20.883 10L10 20.828 11.03 26 24 13.1z'
    />
  ),
});

export const addCircle = createIcon({
  displayName: 'addCircle',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
      clipRule='evenodd'
    />
  ),
});

export const Woman = createIcon({
  displayName: 'Woman',
  viewBox: '0 0 22 33',
  path: (
    <path
      width='22'
      height='33'
      d='M17.3853 1.64997C17.2426 1.21817 16.9671 0.842453 16.5983 0.576348C16.2295 0.310243 15.7861 0.16733 15.3313 0.167971H6.66468C6.20997 0.167659 5.76673 0.310702 5.39798 0.57676C5.02923 0.842819 4.75374 1.21835 4.61068 1.64997L0.277344 14.65L4.12318 15.9348L2.33134 24.0013H6.66468V32.668H15.3313V24.0013H19.6647L17.8728 15.9326L21.7187 14.6478L17.3853 1.64997Z'
      fill='currentColor'
    />
  ),
});

export const Man = createIcon({
  displayName: 'Man',
  viewBox: '0 0 16 44',
  path: (
    <path
      width='16'
      height='44'
      d='M3.43624 44V27.0986H0V14.7394C0 13.4718 0.447427 12.3979 1.34228 11.5176C2.23714 10.6373 3.32886 10.1972 4.61745 10.1972H11.4899C12.7069 10.1972 13.7629 10.6373 14.6577 11.5176C15.5526 12.3979 16 13.4718 16 14.7394V27.0986H12.5638V44H3.43624ZM8 7.97887C6.7472 7.97887 5.67338 7.53873 4.77852 6.65845C3.88367 5.77817 3.43624 4.72183 3.43624 3.48944C3.43624 2.25704 3.88367 1.2007 4.77852 0.320423C5.67338 -0.559859 6.7472 -1 8 -1C9.2528 -1 10.3266 -0.559859 11.2215 0.320423C12.1163 1.2007 12.5638 2.25704 12.5638 3.48944C12.5638 4.72183 12.1163 5.77817 11.2215 6.65845C10.3266 7.53873 9.2528 7.97887 8 7.97887Z'
      fill='currentColor'
    />
  ),
});
