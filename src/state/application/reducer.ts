import { createReducer, nanoid } from '@reduxjs/toolkit'
import {
  addPopup,
  PopupContent,
  removePopup,
  updateBlockNumber,
  ApplicationModal,
  setOpenModal,
  updateThemeMode
} from './actions'
import { PaletteMode } from '@mui/material'
import { DEFAULT_THEME } from '../../constants'

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly popupList: PopupList
  readonly openModal: ApplicationModal | null
  readonly themeModel: PaletteMode
}

const initialState: ApplicationState = {
  blockNumber: {},
  popupList: [],
  openModal: null,
  themeModel: DEFAULT_THEME
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 15000 } }) => {
      state.popupList = (key ? state.popupList.filter(popup => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs
        }
      ])
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach(p => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
    .addCase(updateThemeMode, (state, action) => {
      const { themeModel } = action.payload
      state.themeModel = themeModel

      const themeColorMeta = document.querySelector('meta[name="theme-color"]')
      const backgroundColorMeta = document.querySelector('meta[name="background-color"]')
      const TileColorMeta = document.querySelector('meta[name="msapplication-TileColor"]')

      if (themeModel === 'light') {
        themeColorMeta?.setAttribute('content', '#ffffff')
        backgroundColorMeta?.setAttribute('content', '#ffffff')
        TileColorMeta?.setAttribute('content', '#ffffff')
      } else {
        themeColorMeta?.setAttribute('content', '#000000')
        backgroundColorMeta?.setAttribute('content', '#000000')
        TileColorMeta?.setAttribute('content', '#000000')
      }
    })
)
