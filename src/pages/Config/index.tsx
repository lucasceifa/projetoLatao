/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import { Box, Divider, Flex, FormControl, FormLabel, Img, Input, Text, useToast } from "@chakra-ui/react"
import { Button } from "../../components/Button"
import { FaSave } from "react-icons/fa"
import { iCard, iUserUpdate } from "../../interfaces"
import { dataInput, dataValidade } from "../../Utils/Helper"
import { appApi } from "../../services/appApi"

export const Config: React.FC = () => {

    const toast = useToast()
    
    const [ActiveTab, setActiveTab] = useState(0)
    const [UserUpdate, setUserUpdate] = useState<iUserUpdate>({ address: '', age: 0, cpf: '', name: '', number: '', password: '', passportNumber: '' })
    const [Cards, setCards] = useState<iCard[]>([{ cardNumber: '', _id: '', propertyName: '', securityNumber: 232, validity: ''  }])
    const [OldPassword, setOldPassword] = useState('')
    const [NewCard, setNewCard] = useState<iCard>({ cardNumber: '', propertyName: '', securityNumber: 0o00, validity: '' })

    function UpdateUser(): void {
        const data: iUserUpdate = { address: UserUpdate.address, age: UserUpdate.age, cpf: UserUpdate.cpf, name: UserUpdate.name, number: UserUpdate.number, password: UserUpdate.password, passportNumber: UserUpdate.passportNumber }
        appApi.post('user/verificate', { password: OldPassword })
			.then((res) => { 
                if (res.data === true) {
                    appApi.put('user', data)
                    .then(res => { 
                        console.log(res.data); 
                        toast({
                        title: 'Informações atualizadas com sucesso!',
                        status: 'success',
                        isClosable: false,
                        position: 'top',
                        duration: 4000
                      })})
                    .catch(err => { console.log(err) })
                }
             })
			.catch(err => { console.log(err) })
    }

    function GetUser(): void {
        appApi.get('user')
			.then(res => { setUserUpdate(res.data); })
			.catch(err => { console.log(err) })
    }

    function GetCards(): void {
        appApi.get('user')
          .then(res => { 
            appApi.get(`card/${res.data._id}`)
              .then(res => { setCards(res.data) })
              .catch(err => { console.log(err) }) })
          .catch(err => { console.log(err) })
      }  

    function AddCardToUser(): void {
      appApi.get('user')
        .then(res => { 
          appApi.post(`card/${res.data._id}`, NewCard)
            .then(() => { Cards !== undefined ? setCards([...Cards, NewCard]) : setCards([NewCard]); toast({
                title: 'Cartão cadastrado com sucesso!',
                status: 'success',
                isClosable: false,
                position: 'top',
                duration: 4000
              }) })
            .catch(err => { console.log(err) }) })
        .catch(err => { console.log(err) })
    }

    useEffect(() => {
        GetUser()
        GetCards()
    }, [])

    return (
        <Body>
            <Header />
            <Flex w={'1200px'} mx={'auto'} mt={'4rem'}>
                <Box borderRadius={'1rem 0 0 1rem'} w={'22rem'} color={'var(--text)'} fontSize={'18px'} fontWeight={'700'}>
                    <Flex py={'.75rem'} px={'1rem'} onClick={() => setActiveTab(0)} bgColor={ActiveTab === 0 ? 'var(--primary)' : 'var(--primary75)'}>Configurações</Flex>
                    <Flex borderRadius={'0 0 0 1rem'} py={'.75rem'} px={'1rem'} onClick={() => setActiveTab(1)} bgColor={ActiveTab === 1 ? 'var(--primary)' : 'var(--primary75)'}>Métodos de pagamento</Flex>
                </Box>
                {ActiveTab === 0 && (
                    <Flex gap={'1.5rem'} flexDir={'column'} w={'56rem'} borderRadius={'0 1rem 1rem 1rem'} border={'1px solid var(--primary)'} px={'2rem'} pt={'1rem'} pb={'2rem'}>
                        <Text fontWeight={'700'} fontSize={'22px'}>Configurações do usuário</Text>
                        <Flex justifyContent={'center'} pos={'relative'}>
                        </Flex>
                        <FormControl>
                            <FormLabel>Nome:</FormLabel>
                            <Input value={UserUpdate.name} onChange={(e) => setUserUpdate({...UserUpdate, name: e.target.value})} placeholder="Digite o nome"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha atual:</FormLabel>
                            <Input value={OldPassword} onChange={(e) => setOldPassword(e.target.value) } placeholder="Digite sua senha atual"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nova senha:</FormLabel>
                            <Input value={UserUpdate.password} onChange={(e) => setUserUpdate({...UserUpdate, password: e.target.value })} placeholder="Digite sua nova senha"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Número de passaporte:</FormLabel>
                            <Input value={UserUpdate.passportNumber} onChange={(e) => setUserUpdate({...UserUpdate, passportNumber: e.target.value })} placeholder="Digite seu passaporte"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Endereço:</FormLabel>
                            <Flex justifyContent={'space-between'}>
                                <Input value={UserUpdate.address} onChange={(e) => setUserUpdate({...UserUpdate, address: e.target.value })} w={'65%'} placeholder="Digite seu endereço"/>
                                <Flex alignItems={'center'}  justifyContent={'flex-end'} gap={'1rem'}>
                                    Nº:
                                    <Input value={UserUpdate.number} onChange={(e) => setUserUpdate({...UserUpdate, number: e.target.value })} w={'11rem'} placeholder="Digite seu Número"/>
                                </Flex>
                            </Flex>
                        </FormControl>
                        <Flex justifyContent={'end'} mt={'2rem'}>
                            <Button VarColor="sucess" leftIcon={<FaSave/>} onClick={UpdateUser}>Salvar Alterações</Button>
                        </Flex>
                    </Flex>
                )}
                {ActiveTab === 1 && (
                    <Flex gap={'1.5rem'} flexDir={'column'} w={'56rem'} borderRadius={'0 1rem 1rem 1rem'} border={'1px solid var(--primary)'} px={'2rem'} pt={'1rem'} pb={'2rem'}>
                        <Text fontWeight={'700'} fontSize={'22px'} textAlign={'center'}>Métodos de pagamento</Text>
                        {Cards.map(e => {
                            return (
                                <Flex my={'1rem'} mx={'auto'} gap={'1rem'} fontWeight={'700'} color={'var(--text)'} minWidth={'30rem'} p={'2rem'} bgColor={'var(--primary)'} flexDir={'column'} w={'10rem'} fontSize={'22px'} borderRadius={'.5rem'}>
                                    <Flex justifyContent={'space-between'}>
                                        <Text>LataoCard</Text>
                                        <Img w={'4rem'} src="../../public/nubank.png"/>
                                    </Flex>
                                    <Text>**** **** **** {e.cardNumber.toString().substring(12)}</Text>
                                    <Text>{dataValidade(e.validity)}</Text>
                                    <Text>{e.propertyName.toUpperCase()}</Text>
                                </Flex>
                            )
                        })}
                        <Divider my={'.5rem'}/>
                        <Flex flexDir={'column'} w={'30rem'} mx={'auto'} gap={'1rem'}>
                            <FormControl>
                                <FormLabel>Nome no cartão</FormLabel>
                                <Input value={NewCard.propertyName} onChange={(e) => setNewCard({...NewCard, propertyName: e.target.value })} placeholder="Nome no cartão"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Número do cartão</FormLabel>
                                <Input value={NewCard.cardNumber} type="number" onChange={(e) => { if (parseInt(e.target.value) <= 9999999999999999n || isNaN(parseInt(e.target.value))) setNewCard({ ...NewCard, cardNumber: e.target.value })}} placeholder="Número do cartão"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Código de segurança</FormLabel>
                                <Input value={NewCard.securityNumber} onChange={(e) => setNewCard({...NewCard, securityNumber: parseInt(e.target.value) })} placeholder="Código de segurança"/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Validade</FormLabel>
                                <Input value={NewCard.validity} onChange={(e) => setNewCard({...NewCard, validity: e.target.value })} type="month"/>
                            </FormControl>
                            <Button mt={'1rem'} VarColor="sucess" onClick={AddCardToUser}>Adicionar um cartão</Button>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Body>
    )
}