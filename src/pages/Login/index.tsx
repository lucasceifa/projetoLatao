import { Box, Checkbox, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import { Button } from "../../components/Button"

export const Login: React.FC = () => {
    return (
        <Body background={'https://i.pinimg.com/originals/f7/ef/fc/f7effc7dd95bfcf8b3a41a0a54910a9c.gif'}>
            <Header />
            <Flex bgColor={'#ffffff99'} flexDir={'column'} w={'40rem'} py={'2rem'} px={'2rem'} mt={'12rem'} borderRadius={'1rem'} border={'1px solid var(--black)'} color={'var(--black)'} mx={'auto'}>
                <Text textAlign={'center'} mb={'2rem'} fontWeight={'700'} fontSize={'20px'}>Bem vindo ao Latão Airlines!</Text>
                <Flex gap={'3rem'} >
                    <Flex flexDir={'column'} gap={'.75rem'} justifyContent={'center'}>
                        <FormControl>
                            <FormLabel>Usuário/Email</FormLabel>
                            <Input placeholder="Digite seu Usuário/Email"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha</FormLabel>
                            <Input placeholder="Digite sua senha"/>
                        </FormControl>
                        <Checkbox borderColor={'var(--black35)'}>Lembrar de mim</Checkbox>
                        <Button mt={'1rem'} VarColor="green">Login</Button>
                    </Flex>
                    <Box w={'1px'} bgColor={'var(--black35)'} mt={'2rem'} h={'24rem'}></Box>
                    <Flex flexDir={'column'} gap={'.75rem'}>
                        <FormControl>
                            <FormLabel>Usuário/Email</FormLabel>
                            <Input placeholder="Digite seu Usuário/Email"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirmar enha</FormLabel>
                            <Input placeholder="Digite sua senha"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Senha</FormLabel>
                            <Input placeholder="Confirme sua senha"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>CPF</FormLabel>
                            <Input placeholder="Confirme seu CPF"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Data de nascimento</FormLabel>
                            <Input type="date"/>
                        </FormControl>
                        <Button mt={'1rem'} VarColor="alert">Cadastrar</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Body>
    )
}