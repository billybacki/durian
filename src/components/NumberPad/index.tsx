import { FunctionComponent, MutableRefObject, useMemo } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import './keyPadstyle.css'
import { useUpdateThemeMode } from '@/state/application/hooks'

export enum KeyboardWrapperType {
  RISE,
  DROP
}

interface IProps {
  keyboardType?: KeyboardWrapperType
  onChange: (input: string) => void
  keyboardRef: MutableRefObject<any>
}

const lightThemeClass = 'hg-theme-default hg-layout-default buttonTheme bkspButtonTheme light-theme'
const darkThemeClass = 'hg-theme-default hg-layout-default buttonTheme bkspButtonTheme dark-theme'
const riseClass = 'rise'
const dropClass = 'drop'

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onChange,
  keyboardRef,
  keyboardType = KeyboardWrapperType.RISE
}) => {
  const { mode } = useUpdateThemeMode()
  const themeClass = useMemo(() => (mode === 'light' ? lightThemeClass : darkThemeClass), [mode])

  const options = useMemo(() => {
    return {
      layoutName: 'NumberPad',
      layout: {
        NumberPad: [`1 2 3`, `4 5 6`, `7 8 9`, `. 0 {bksp}`]
      },
      buttonTheme: [
        {
          class: 'bkspBtn',
          buttons: '{bksp}'
        }
      ],
      buttonAttributes: [
        {
          attribute: 'aria-label',
          value: '{bksp}',
          buttons: '{bksp}'
        }
      ],
      display: { ['{bksp}']: '&nbsp&nbsp' },
      theme: `${themeClass} ${keyboardType === KeyboardWrapperType.RISE ? riseClass : dropClass}`,
      debug: false
    }
  }, [keyboardType, themeClass])

  return (
    <Keyboard
      keyboardRef={r => (keyboardRef.current = r)}
      onChange={onChange}
      onRender={() => console.log('Rendered')}
      {...options}
    />
  )
}

export default KeyboardWrapper
