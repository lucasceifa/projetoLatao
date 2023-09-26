/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { Container, Div } from './styles'

interface iBodyProps{
  isLoading?: boolean
	children: any
  background?: string
}

export const Body: React.FC<iBodyProps> = ({ isLoading, children, background }) => {
  return (
    <Container>
			{(isLoading) && (
				<Flex h={'100vh'} w={'100vw'} justifyContent={'center'} alignItems={'center'} backgroundImage={'../background.jpg'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'}>
          <Spinner
            thickness='8px'
            speed='0.65s'
            emptyColor='gray.200'
            color='var(--red)'
            height={'18rem'}
            width='18rem'
          />
        </Flex>
			)}
			{(!isLoading) && (
				<Div style={{ maxWidth: '100vw', height: '100vh', boxSizing: 'border-box', background: background !== undefined ? `url(${background})` :  '', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: '25% 75%' }}>{children}</Div>
			)}
		</Container>
  )
}