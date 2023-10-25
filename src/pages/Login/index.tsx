import { Box, Checkbox, Flex, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import { Button } from "../../components/Button"
import { useState } from "react"
import { appApi } from "../../services/appApi"
import { validarCPF } from "../../Utils/Helper"
import { useNavigate } from "react-router-dom"

interface iRegister {
	name: string
	password: string
	cpf: string
	age: number
	adress: string
	number: string
	passportNumber: string
}
interface iLogin {
	cpf: string
    password: string
}

export const Login: React.FC = () => {
    const toast = useToast()
    const nav = useNavigate()

    const [LoginData, setLoginData] = useState<iLogin>({ cpf: '', password: '' })
    const [RegisterData, setRegisterData] = useState<iRegister>({ cpf: '', password: '', adress: '', age: 0, name: '', number: '', passportNumber: '' })
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [DateAge, setDateAge] = useState('')

    function Login(): void {
        if (LoginData.cpf === '' || LoginData.password === '') {
            toast({
                title: 'Preencha todos os campos',
                status: 'error',
                isClosable: false,
                position: 'top',
                duration: 4000
              })
            return
        }
        appApi.post('user/login', LoginData)
            .then(res => { appApi.defaults.headers.common.Authorization = `${res.data as string}`; localStorage.setItem('token', res.data); nav('/');
                toast({
                    title: 'Usuário logado com sucesso!',
                    status: 'success',
                    isClosable: false,
                    position: 'top',
                    duration: 4000
                })
            })
            .catch(err => {
                if (err.response.status === 401) {
                    toast({
                        title: 'Usuário ou senha inválido.',
                        status: 'error',
                        isClosable: false,
                        position: 'top',
                        duration: 4000
                      })
                }
            })
    }
    function Register(): void {
        if (RegisterData.cpf === '' || RegisterData.age === 0 || RegisterData.name === '') {
            toast({
                title: 'Preencha todos os campos',
                status: 'error',
                isClosable: false,
                position: 'top',
                duration: 4000
              })
            return
        }
        else if (RegisterData.password !== ConfirmPassword) {
            toast({
                title: 'Senha e confirmação estão diferentes',
                status: 'error',
                isClosable: false,
                position: 'top',
                duration: 4000
              })
            return
        } 
        else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(RegisterData.password)) {
            toast({
              title: 'Sua senha deve ter pelo menos oito caracteres, um número, uma letra minúscula, uma letra maiúscula e um caractere especial',
              status: 'error',
              isClosable: false,
              position: 'top',
              duration: 4000
            })
            return
          }
        if (!validarCPF(RegisterData.cpf)) {
            toast({
                title: 'Digite um CPF válido por favor.',
                status: 'error',
                isClosable: false,
                position: 'top',
                duration: 4000
              })
              return
        }
        appApi.post('user/register', RegisterData)
            .then(res => { appApi.defaults.headers.common.Authorization = `${res.data as string}`; localStorage.setItem('token', res.data); nav('/'); 
                toast({
                    title: 'Usuário logado com sucesso!',
                    status: 'success',
                    isClosable: false,
                    position: 'top',
                    duration: 4000
                })
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    toast({
                        title: 'CPF já cadastrado.',
                        status: 'error',
                        isClosable: false,
                        position: 'top',
                        duration: 4000
                      })
                }
            })
    }

    function TakeYears(dataInput: string) {

        const dataAtual = new Date();
      
        const dataSelecionada = new Date(dataInput);
      
        const diferencaEmMilissegundos = dataAtual.getTime() - dataSelecionada.getTime();
      
        const milissegundosPorAno = 1000 * 60 * 60 * 24 * 365.25;
        const diferencaEmAnos = diferencaEmMilissegundos / milissegundosPorAno;
      
        return Math.abs(Math.floor(diferencaEmAnos));
      }

    return (
        <Body background={'https://i.pinimg.com/originals/f7/ef/fc/f7effc7dd95bfcf8b3a41a0a54910a9c.gif'}>
            <Header />
            <Flex bgColor={'#ffffff99'} flexDir={'column'} w={'40rem'} py={'2rem'} px={'2rem'} mt={'12rem'} borderRadius={'1rem'} border={'1px solid var(--black)'} color={'var(--black)'} mx={'auto'}>
                <Text textAlign={'center'} mb={'2rem'} fontWeight={'700'} fontSize={'20px'}>Bem vindo ao Latão Airlines!</Text>
                <Flex gap={'3rem'} >
                    <Flex flexDir={'column'} gap={'.75rem'} justifyContent={'center'}>
                        <FormControl>
                            <FormLabel>CPF</FormLabel>
                            <Input value={LoginData.cpf} onChange={(e) => setLoginData({...LoginData, cpf: e.target.value })} placeholder="Digite seu CPF"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha</FormLabel>
                            <Input value={LoginData.password} onChange={(e) => setLoginData({...LoginData, password: e.target.value })} placeholder="Digite sua senha"/>
                        </FormControl>
                        <Checkbox borderColor={'var(--black35)'}>Lembrar de mim</Checkbox>
                        <Button mt={'1rem'} VarColor="green" onClick={Login}>Login</Button>
                    </Flex>
                    <Box w={'1px'} bgColor={'var(--black35)'} mt={'2rem'} h={'24rem'}></Box>
                    <Flex flexDir={'column'} gap={'.75rem'}>
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <Input value={RegisterData.name} onChange={(e) => setRegisterData({...RegisterData, name: e.target.value })} placeholder="Digite seu Nome"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha</FormLabel>
                            <Input value={RegisterData.password} onChange={(e) => setRegisterData({...RegisterData, password: e.target.value })} placeholder="Digite sua senha"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirmar senha</FormLabel>
                            <Input value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme sua senha"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>CPF</FormLabel>
                            <Input value={RegisterData.cpf} onChange={(e) => setRegisterData({...RegisterData, cpf: e.target.value })} placeholder="Confirme seu CPF"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Data de nascimento</FormLabel>
                            <Input value={DateAge} onChange={(e) => { setRegisterData({...RegisterData, age: TakeYears(e.target.value) }); setDateAge(e.target.value) }} type="date"/>
                        </FormControl>
                        <Button mt={'1rem'} VarColor="alert" onClick={Register}>Cadastrar</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Body>
    )
}