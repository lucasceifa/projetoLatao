import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import { AppRoutes } from './Routes'
import './main.css'

export const App: React.FC = () => {

  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  )
}
