import { Box, Flex, Img, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BsFillGearFill, BsFillPersonFill } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"
import { appApi } from "../../services/appApi"

export const Header: React.FC = () => {
	const nav = useNavigate()
	const { pathname } = useLocation()
	
	const [UserName, setUserName] = useState<string>('')

	function GetLoginInfos(): void {
		appApi.get('User')
			.then(res => { setUserName(res.data.username); })
			.catch(err => { appApi.defaults.headers.common.Authorization = `bearer ${localStorage.getItem('token')}`;console.log(err) })
	}

	useEffect(() => {
		appApi.defaults.headers.common.Authorization = `bearer ${localStorage.getItem('token')}`
		GetLoginInfos()
	}, [])

	return (
		<Flex fontWeight={'700'} px={'3.5%'} backgroundColor={'var(--primary)'} py={'0rem'} boxSizing={'border-box'}  color={'var(--text)'} alignItems={'center'} justifyContent={'space-between'}>
			<Flex overflowY={'hidden'} minW={'23rem'} width={'35%'} m={'0.75rem 0'} fontWeight={'700'} fontSize={'20px'}>
				<Img h={'5.5rem'} src={'../../public/logo.png'} cursor={'pointer'} onClick={() => nav('/')}/>
			</Flex>
			<nav style={{ display: 'flex', minWidth: '51rem', justifyContent: 'flex-end', alignItems: 'center', gap: '2rem'}}>
				{!pathname.includes('Login') && UserName === '' && (
					<Box _hover={{ textDecor: 'underline' }}  display={'flex'} alignItems={'center'} gap={'1rem'} cursor={'pointer'} onClick={() => nav('/Login')}>
						<BsFillPersonFill size={24}/>
						Login/Cadastro
					</Box>
				)}
				{!pathname.includes('Login') && UserName !== '' && (
					<Flex flexDir={'column'} fontWeight={'700'} alignItems={'flex-end'}>
						<Flex gap={'.3rem'}>Bem Vindo {UserName} <Text color={'var(--red)'}>{UserName}</Text></Flex>
						<Box fontSize={'12px'} onClick={() => { appApi.defaults.headers.common.Authorization = ''; localStorage.setItem('token', ''); window.location.reload() }} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>Logout</Box>
					</Flex>
				)}
				<Box cursor={'pointer'} alignItems={'center'} overflowY={'hidden'} _hover={{ textDecor: 'underline' }} padding={'.75rem'} background={'transparent'} display={'flex'} h={'2.8rem'} gap={'1rem'}>
					<BsFillGearFill size={24}/>
					<Text color={'var(--white)'} overflowY={'hidden'} onClick={() => nav('/Config')}>Configurações</Text>
				</Box>
			</nav>
		</Flex>
	)
}