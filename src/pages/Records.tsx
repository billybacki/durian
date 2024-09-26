import { FontSize } from '@/themes'
import { shortenStr } from '@/utils'
import { Box, Stack, Typography, styled } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

enum TransactionType {
  Deposit,
  Withdraw,
  Commission
}

enum Status {
  Pending,
  Confirmed
}

const TabList = ['Game', 'Transaction']

const GameList = [
  {
    type: 1,
    name: 'Durian points',
    point: 10,
    price: 20
  },
  {
    type: 0,
    name: 'Durian points',
    point: 10,
    price: 20
  },
  {
    type: 1,
    name: 'Durian points',
    point: 10,
    price: 20
  }
]

interface Props {
  type: TransactionType
  status: Status
  time: number
  address: string
  price: number
}

const TransactionList: Props[] = [
  {
    type: TransactionType.Withdraw,
    status: Status.Pending,
    time: 1727235383,
    address: '0x7B922BC0C27Fd119F67eC53828C8F7FF20a7c708',
    price: 20
  },
  {
    type: TransactionType.Deposit,
    status: Status.Pending,
    time: 1727235383,
    address: '0x7B922BC0C27Fd119F67eC53828C8F7FF20a7c708',
    price: 18
  },
  {
    type: TransactionType.Commission,
    status: Status.Confirmed,
    time: 1727235383,
    address: '0x7B922BC0C27Fd119F67eC53828C8F7FF20a7c708',
    price: 5
  }
]

const GameBox = () => {
  return (
    <>
      {GameList.map((item, index) => {
        return (
          <ItemBox key={index}>
            <Row>
              <TypeText color={item.type === 0 ? 'var(--ps-drop)' : 'var(--ps-rise)'}>
                {item.type === 0 ? 'lose' : 'win'}
              </TypeText>
              <TypeText color={item.type === 0 ? 'var(--ps-drop)' : 'var(--ps-rise)'} sx={{ fontWeight: 600 }}>
                ${item.price}
              </TypeText>
            </Row>
            <Row>
              <TypeText color={'var(--ps-color-600)'}>{item.name}</TypeText>
              <TypeText color={'var(--ps-color-600)'} sx={{ fontWeight: 600 }}>
                +{item.point}
              </TypeText>
            </Row>
          </ItemBox>
        )
      })}
    </>
  )
}

const TransactionBox = () => {
  const Text = (item: Props) => {
    if (item.type === TransactionType.Commission) {
      return <TypeText>Commission Distribution</TypeText>
    } else if (item.type === TransactionType.Deposit) {
      return <TypeText>Deposit</TypeText>
    } else {
      return (
        <TypeText>
          Withdraw <span style={{ color: 'var(--ps-color-500)' }}>to {shortenStr(item.address)}</span>
        </TypeText>
      )
    }
  }
  return (
    <>
      {TransactionList.map((item, index) => {
        return (
          <ItemBox key={index}>
            <Row>
              {Text(item)}
              <TypeText sx={{ fontWeight: 600 }}>{item.price} USDT</TypeText>
            </Row>
            <Row>
              <TypeText color={'var(--ps-color-500)'} sx={{ fontSize: 12 }}>
                {dayjs(item.time * 1000).format('YYYY/MM/DD HH:mm')}
              </TypeText>
              <TypeText
                color={item.status === Status.Pending ? 'var(--ps-color-500)' : 'var(--ps-rise)'}
                sx={{ fontSize: 12 }}
              >
                {item.status === Status.Pending ? 'Pending' : 'Confirmed'}
              </TypeText>
            </Row>
          </ItemBox>
        )
      })}
    </>
  )
}

export default function Page() {
  const [tab, setTab] = useState('Game')
  return (
    <Box>
      <Stack gap={12} padding={'0 24px 16px'} borderBottom={'1px solid var(--ps-color-300)'}>
        <Typography lineHeight={'140%'} fontSize={FontSize.f22} fontWeight={500} textTransform={'lowercase'}>
          My Records
        </Typography>
        <TabBox>
          {TabList.map((item, index) => {
            return (
              <Tab
                key={index + item}
                onClick={() => setTab(item)}
                bgcolor={tab === item ? 'var(--ps-color-100)' : 'transparent'}
              >
                <TabText color={tab === item ? 'var(--ps-color-600)' : 'var(--ps-color-500)'}>{item}</TabText>
              </Tab>
            )
          })}
        </TabBox>
      </Stack>
      <Stack
        sx={{
          height: '72vh',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: 0
          }
        }}
      >
        {tab === 'Game' ? <GameBox /> : <TransactionBox />}
      </Stack>
    </Box>
  )
}

const TabBox = styled(Box)`
  display: flex;
  padding: 4px;
  align-items: center;
  align-self: stretch;
  border-radius: 120px;
  background: var(--ps-color-200);
`

const Tab = styled(Box)`
  display: flex;
  padding: 7.7px 0px;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  border-radius: 120px;
  flex: 1;
`

const TabText = styled(Typography)`
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: 0.12px;
  text-transform: capitalize;
`

const ItemBox = styled(Box)`
  display: flex;
  padding: 16px 24px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-bottom: 1px solid var(--ps-color-300);
`

const TypeText = styled(Typography)`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: 0.14px;
  text-transform: lowercase;
`

const Row = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
