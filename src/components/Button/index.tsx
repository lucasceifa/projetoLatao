import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'

interface iButtonProps extends ButtonProps{
  VarColor?: string
  paddingX?: string
}
export const Button: React.FC<iButtonProps> = ({ VarColor, children, paddingX, ...rest }) => {
  return (
        <ChakraButton
            {...rest}
            borderRadius={'10px'}
            filter='auto'
            _hover={{
              brightness: '112%',
              boxShadow: 'var(--ShadowBtns)',
              transition: 'var(--transitionBtns);'
            }}
            px={paddingX ? paddingX : '1rem'}
            color={'#fff'}
            bg={VarColor && `var(--${VarColor})`
        }>{children}</ChakraButton>
  )
}
