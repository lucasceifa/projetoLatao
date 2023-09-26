/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import { Box, Flex, FormControl, FormLabel, Img, Input, Text, useToast } from "@chakra-ui/react"
import { Button } from "../../components/Button"
import { FaSave } from "react-icons/fa"
import { iCard } from "../../interfaces"

export const Config: React.FC = () => {

    const toast = useToast()
    
    const [ActiveTab, setActiveTab] = useState(0)
    const [Avatar, setAvatar] = useState('https://static.vecteezy.com/ti/fotos-gratis/p1/6671766-fantastica-lua-magica-luz-e-agua-barco-com-arvore-papel-de-parede-gratis-foto.jpg')
    const [Cards, setCards] = useState<iCard[]>([])
    
    const UpdateFile = (event: any ): void => {
        const formdata = new FormData()
        formdata.append('file', event.target.files[0])
        // appApi.post('User/UploadFile', formdata).then(resposnse => {
        // if (str === 'banner') {
        //     setModel({ ...Model, banner: resposnse.data })
        // }
        // if (str === 'avatar') {
        //     setModel({ ...Model, avatar: resposnse.data })
        // }
        // }).catch(e => console.log(e))
    }

    function UpdateUser(): void {
        toast({
          title: 'Informações atualizadas com sucesso!',
          status: 'success',
          isClosable: false,
          position: 'top',
          duration: 4000
        })
    }

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
                        {Avatar === '' &&
                            <Flex alignItems={'center'} width='100%' justifyContent={'center'}>
                                <label htmlFor='inputAvatar' style={{ cursor: 'pointer', textDecoration: 'underline', borderRadius: '50%', paddingLeft: '.75rem', paddingRight: '.75rem', paddingTop: '4.5rem', backgroundColor: 'var(--light50)', height: '12rem', width: '12rem', fontSize: '16px', textAlign: 'center', verticalAlign: 'bottom', color: 'var(--red-dark)' }}>Clique aqui para adicionar um avatar</label>
                                <Input
                                display={'none'}
                                id='inputAvatar'
                                accept="image/*"
                                type={'file'}
                                onChange={(e) => { UpdateFile(e) }}
                                />
                            </Flex>
                        }
                        {Avatar && Avatar.length > 3 &&
                            <Flex flexDir={'column'}>
                                <Img src={Avatar} objectFit={'cover'} w={'12rem'} h={'12rem'} borderRadius={'50%'}/>
                                {/* <label htmlFor='inputAvatar' style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', bottom: '0', left: '50%', transform: 'translate(-50%, 0)', cursor: 'pointer', textDecoration: 'underline', backgroundColor: 'var(--red-dark)', height: '1.5rem', width: '3rem', borderRadius: '0 0 35% 35%', fontSize: '14px', color: 'var(--white)', fontWeight: '700' }}><FaPencilAlt /></label> */}
                                <label htmlFor='inputAvatar' style={{ cursor: 'pointer', fontWeight: '700', position: 'absolute', opacity: '1', textDecoration: 'underline', borderRadius: '50%', paddingLeft: '.75rem', paddingRight: '.75rem', paddingTop: '4.5rem', backgroundColor: 'var(--light50)', height: '12rem', width: '12rem', fontSize: '16px', textAlign: 'center', verticalAlign: 'bottom', color: 'var(--red-dark)' }}>Clique aqui para atualizar o avatar</label>
                                <Input
                                    display={'none'}
                                    id='inputAvatar'
                                    accept="image/*"
                                    type={'file'}
                                    onChange={(e) => { UpdateFile(e) }}
                                />
                            </Flex>
                        }
                        </Flex>
                        <FormControl>
                            <FormLabel>Nome:</FormLabel>
                            <Input placeholder="Digite o nome"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha atual:</FormLabel>
                            <Input placeholder="Digite sua senha atual"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nova senha:</FormLabel>
                            <Input placeholder="Digite sua nova senha"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Idade:</FormLabel>
                            <Input type="number" placeholder="Digite sua idade"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Número de passaporte:</FormLabel>
                            <Input placeholder="Digite seu passaporte"/>
                        </FormControl>
                        <Flex justifyContent={'end'} mt={'2rem'}>
                            <Button VarColor="sucess" leftIcon={<FaSave/>} onClick={UpdateUser}>Salvar Alterações</Button>
                        </Flex>
                    </Flex>
                )}
                {ActiveTab === 1 && (
                    <Flex gap={'1.5rem'} flexDir={'column'} w={'56rem'} borderRadius={'0 1rem 1rem 1rem'} border={'1px solid var(--primary)'} px={'2rem'} pt={'1rem'} pb={'2rem'}>
                        <Text fontWeight={'700'} fontSize={'22px'}>Métodos de pagamento</Text>
                        {Cards.map(e => {
                            return (
                                <Flex></Flex>
                            )
                        })}
                    </Flex>
                )}
            </Flex>
        </Body>
    )
}