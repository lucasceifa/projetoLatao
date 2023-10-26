/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, FormControl, FormLabel, Img, Input, Radio, RadioGroup, Select, Spinner, Stack, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, useToast } from "@chakra-ui/react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import { useState, useEffect } from "react"
import { Button } from "../../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import { iCard, iFlight, iPlaces } from "../../interfaces"
import { dataInput, dataValidade, formatarData } from "../../Utils/Helper"
import { IoAirplane } from "react-icons/io5"
import * as React from "react"
import { FaPlus } from "react-icons/fa"
import { appApi } from "../../services/appApi"

export const Compra: React.FC = () => {

    const nav = useNavigate()
    const toast = useToast()
    const { id } = useParams<{ id: string }>()
    
    const fileiras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
    const steps = [
        { title: 'Confirmar voo', description: 'Confirme se deseja seguir adiante com a compra' },
        { title: 'Escolher assento', description: 'Selecione o assento desejado e os extras caso queira' },
        { title: 'Pagamento', description: 'Escolha o método de pagamento' },
      ]

    const [ActiveStep, setActiveStep] = useState(-1)
    const [SelectedPlaces, setSelectedPlaces] = useState<string[]>([])
    const [BoughtPlaces, setBoughtPlaces] = useState<iPlaces[]>([{ user_id: '', user_places: [] }])
    const [AddCard, setAddCard] = useState(false)
    const [PaymentMethod, setPaymentMethod] = useState('0')
    const [NewCard, setNewCard] = useState<iCard>({ cardNumber: '', propertyName: '', securityNumber: 0o00, validity: '' })

    const [Model, setModel] = useState<iFlight>({ airportTag: '', baggageWeight: '', company: '', finalDestination: { cityName: '', cityTag: '', country: '', _id: '', zipcode: '' }, flightNumber: 0, goingDate: '', _id: '', price: '', returnDate: '', startDestination: { cityName: '', cityTag: '', country: '', _id: '', zipcode: '' }, place: [] })
    const [Cards, setCards] = useState<iCard[]>()

    function formatInput(value: string) {
      const numericValue = value.replace(/\D/g, '');
    
      const formattedValue = numericValue.replace(/(\d{4})/g, '$1 ');
    
      return formattedValue.trim();
    }

    function RegisterCard(): void {
      toast({
        title: 'Cartão cadastrado com sucesso!',
        status: 'success',
        isClosable: false,
        position: 'top',
        duration: 4000
      })
      setAddCard(!AddCard)
    }

    function GetFlight(): void {
      appApi.get(`flight/${id}`)
        .then(res => { setModel(res.data); setActiveStep(0); setBoughtPlaces(res.data.place); console.log(res.data.place) })
        .catch(err => console.log(err))
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
            .then(() => { Cards !== undefined ? setCards([...Cards, NewCard]) : setCards([NewCard]); RegisterCard() })
            .catch(err => { console.log(err) }) })
        .catch(err => { console.log(err) })
    }

    function ComprarPassagem(): void {
      appApi.get('user')
        .then((res) => {
          appApi.post(`user/flight/${id}`)
            .then(() => {
              toast(
                { 
                  title: 'Compra realizada com sucesso! Você será redirecionado em breve',
                  status: 'success', 
                  isClosable: false, 
                  position: 'top', 
                  duration: 4000 
                }); 
                setTimeout(() => { nav('/') }, 4000)
            })
            .catch(err => console.log(err))
          console.log(res.data._id)
          appApi.put(`flight/${Model._id}`, { airportTag: Model.airportTag, baggageWeight: Model.baggageWeight, company: Model.company, finalDestination: { cityName: Model.finalDestination.cityName, cityTag: Model.finalDestination.cityTag, country: Model.finalDestination.country, _id: Model.finalDestination._id, zipcode: Model.finalDestination.zipcode }, flightNumber: Model.flightNumber, goingDate: Model.goingDate,  price: Model.price, returnDate: Model.returnDate, startDestination: { cityName: Model.startDestination.cityName, cityTag: Model.startDestination.cityTag, country: Model.startDestination.country, _id: Model.startDestination._id, zipcode: Model.startDestination.zipcode }, place: [...Model.place, { user_id: res.data._id, user_places: SelectedPlaces }] })
            .then(() => { })
            .catch(err => console.log(err))
          })
        .catch(err => console.log(err))
    }

    function ReturnPlaces(str: string): boolean {
      const places: string[] = []
      BoughtPlaces.forEach(e => e.user_places.forEach(a => places.push(a)))
      if (places.includes(str) ) {
        return true 
      }
      return false
    }

    useEffect(() => {
      GetFlight()
      GetCards()
    }, [])

    return (
        <Body>
            <Header />              
            <Stepper maxW={'1600px'} my={'4rem'} mx={'auto'} size='lg' colorScheme='green' index={ActiveStep}>
                {steps.map((step, index) => (
              <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
                  <Box flexShrink='0'>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Flex w={'1600px'} mx={'auto'} borderRadius={'1rem'} border={'2px solid var(--secondary)'} px={'2rem'} py={'2rem'} flexDir={'column'}>
                  {ActiveStep === -1 && (
                    <Flex justifyContent={'center'} py={'4rem'} w={'100%'} overflowY={'hidden'}>
                      <Spinner
                        thickness='8px'
                        speed='0.65s'
                        emptyColor='green.500'
                        color='var(--light)'
                        height={'18rem'}
                        width='18rem'
                      />
                    </Flex>
                  )
                  }
                  {ActiveStep === 0 && (
                    <>
                      <Text textAlign={'center'} fontWeight={'700'} fontSize={'20px'}>Tem certeza que deseja comprar uma ou mais passagens deste voo?</Text>
                      <Flex overflowY={'hidden'} pos={'relative'} flexDir={'column'} borderRadius={'1rem'} p={'3rem'}>
                        <Flex justifyContent={'space-between'} gap={'2rem'}>
                          <Flex gap={'4.5rem'}>
                            <Flex flexDir={'column'} gap={'.25rem'}>
                              <Text>Companhia: {Model.company}</Text>
                              <Text>Aeroporto: {Model.airportTag}</Text>
                              <Text>Número do voo: {Model.flightNumber}</Text>
                              <Text>Embarque: {Model.startDestination.cityName} - {Model.startDestination.cityTag}, {Model.startDestination.zipcode} </Text>
                              <Text>País: {Model.startDestination.country}</Text>
                            </Flex>
                            <Flex flexDir={'column'} w={'10rem'} alignItems={'center'} justifyContent={'center'} fontWeight={'700'}>
                              <Text>IDA: {formatarData(Model.goingDate)}</Text>
                              <IoAirplane size={80}/>
                            </Flex>
                            <Flex flexDir={'column'}>
                              <Text>Desembarque: {Model.finalDestination.cityName} - {Model.finalDestination.cityTag}, {Model.finalDestination.zipcode}</Text>
                              <Text>País: {Model.finalDestination.country}</Text>
                            </Flex>
                          </Flex>
                          <Box w={'2px'} h={'13.5rem'} pos={'absolute'} top={'20px'} left={'50%'} transform={'translate(-50%, 0)'} bgColor={'var(--black35)'}></Box>
                          <Flex gap={'3rem'}>
                            <Flex flexDir={'column'} gap={'.25rem'}>
                              <Text>Companhia: {Model.company}</Text>
                              <Text>Aeroporto: {Model.airportTag}</Text>
                              <Text>Número do voo: {Model.flightNumber}</Text>
                              <Text>Embarque: {Model.finalDestination.cityName} - {Model.finalDestination.cityTag}, {Model.finalDestination.zipcode}</Text>
                              <Text>País: {Model.finalDestination.country}</Text>
                            </Flex>
                            <Flex flexDir={'column'} w={'11rem'} alignItems={'center'} justifyContent={'center'} fontWeight={'700'}>
                              <Text>VOLTA: {formatarData(Model.returnDate)}</Text>
                              <IoAirplane size={80}/>
                            </Flex>
                            <Flex flexDir={'column'}>
                              <Text>Desembarque: {Model.startDestination.cityName} - {Model.startDestination.cityTag}, {Model.startDestination.zipcode}</Text>
                              <Text>País: {Model.startDestination.country}</Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </>
                  )}
                  {ActiveStep === 1 && (
                    <Flex flexDir={'column'}>
                      <Flex pl={'17.75rem'} alignItems={'center'} w={'1520px'} border={'1px solid var(--secondary)'} mx={'auto'} borderRadius={'1rem'} my={'2rem'} h={'28rem'} objectFit={'cover'} bg={'url(../../public/places.png)'} bgRepeat={'no-repeat'} bgSize={'cover'} bgPosition={'50% 40%'}>
                        {fileiras.map((e) => {
                          return (
                          <Flex overflowY={'hidden'} flexDir={'column'} >
                            {Array.from({ length: 4 }, (_, i) => {
                              return (
                                <Flex
                                  mb={i !== 1 ? '.65rem' : '1.75rem'}
                                  mr={'1rem'}
                                  key={`${e}${i+1}`}
                                  w={'2rem'}
                                  h={'2rem'}
                                  fontSize={'14px'}
                                  fontWeight={'700'}
                                  alignItems={'center'}
                                  bgColor={(SelectedPlaces.includes(`${e}${i+1}`) || ReturnPlaces(`${e}${i+1}`)) ? 'var(--primary)' : 'var(--label)' }
                                  color={'var(--text)'}
                                  justifyContent={'center'}
                                  cursor={'pointer'}
                                  _hover={{ bgColor: !ReturnPlaces(`${e}${i+1}`) ? SelectedPlaces.includes(`${e}${i+1}`) ? 'var(--primary)' : 'var(--black35)' : 'var(--primary)' }}
                                  onClick={() => { if (!ReturnPlaces(`${e}${i+1}`)) { SelectedPlaces.includes(`${e}${i+1}`) ? setSelectedPlaces(SelectedPlaces.filter(a => a !== `${e}${i+1}`)) : setSelectedPlaces([...SelectedPlaces, `${e}${i+1}`]) } }}
                                >
                                  {`${e}${i + 1}`}
                                </Flex>
                              )
                            })}
                          </Flex>
                        )})}
                      </Flex>
                      <Flex pl={'1rem'} fontSize={'19px'} justifyContent={'space-between'} mb={'2rem'}>
                        <Text>Assentos selecionados: {SelectedPlaces.map((e, i) =>  (<Text as={'span'} fontWeight={'700'}>{e}{SelectedPlaces.length - 1 !== i ? ', ' : ''}</Text>))}</Text>
                        <Flex w={'30rem'} alignItems={'center'} gap={'1rem'}>Deseja adicionar bagagem extra?
                          <Select w={'7rem'}>
                            <option value="0">0kg</option>
                            <option value="5">5kg</option>
                            <option value="10">10kg</option>
                            <option value="15">15kg</option>
                            <option value="20">20kg</option>
                          </Select>
                        </Flex>
                      </Flex>
                    </Flex>
                  )}
                  {ActiveStep === 2 && ( 
                    <>
                      <Flex flexDir={'column'}  mt={'2rem'}>
                        <RadioGroup onChange={setPaymentMethod} value={PaymentMethod}>
                          <Stack mb={'2rem'} gap={'3rem'} direction='row' flexWrap={'wrap'} alignItems={'flex-start'} justifyContent={'start'} mx={'auto'} w={'1080px'}>
                          {Cards && Cards.map((e, i) => {
                            return (
                                <Radio value={i.toString()} borderColor={'var(--primary)'}>
                                    <Flex gap={'1rem'} fontWeight={'700'} color={'var(--text)'} minWidth={'30rem'} p={'2rem'} bgColor={'var(--primary)'} flexDir={'column'} w={'10rem'} fontSize={'22px'} borderRadius={'.5rem'}>
                                      <Flex justifyContent={'space-between'}>
                                          <Text>LataoCard</Text>
                                          <Img w={'4rem'} src="../../public/nubank.png"/>
                                      </Flex>
                                      <Text>**** **** **** {e.cardNumber.toString().substring(12)}</Text>
                                      <Text>{dataValidade(e.validity)}</Text>
                                      <Text>{e.propertyName.toUpperCase()}</Text>
                                    </Flex>
                                </Radio>
                                )
                            })}
                          </Stack>
                        </RadioGroup>
                        {AddCard && (
                          <Flex gap={'4rem'} mt={'2rem'}>
                            <Flex flexDir={'column'} w={'30rem'} ml={'16rem'} gap={'1rem'}>
                              <FormControl>
                                  <FormLabel>Nome no cartão</FormLabel>
                                  <Input value={NewCard.propertyName} onChange={(e) => setNewCard({ ...NewCard, propertyName: e.target.value })} placeholder="Nome no cartão"/>
                              </FormControl>
                              <FormControl>
                                  <FormLabel>Número do cartão</FormLabel>
                                  <Input value={NewCard.cardNumber} type="number" onChange={(e) => { if (parseInt(e.target.value) <= 9999999999999999n || isNaN(parseInt(e.target.value))) setNewCard({ ...NewCard, cardNumber: e.target.value })}} placeholder="Número do cartão"/>
                              </FormControl>
                              <FormControl>
                                  <FormLabel>Código de segurança</FormLabel>
                                  <Input value={NewCard.securityNumber} type={'number'} onChange={(e) => { if (parseInt(e.target.value) <= 999 || isNaN(parseInt(e.target.value))) setNewCard({ ...NewCard, securityNumber: parseInt(e.target.value) }) }} placeholder="Código de segurança"/>
                              </FormControl>
                              <FormControl>
                                  <FormLabel>Validade</FormLabel>
                                  <Input onChange={(e) => { if (e.target.valueAsDate !== null) setNewCard({ ...NewCard, validity: dataInput(e.target.value) }) }} type="month"/>
                              </FormControl>
                              <Button mt={'1rem'} VarColor="sucess" onClick={AddCardToUser}>Adicionar um cartão</Button>
                            </Flex>
                            <Flex mt={'2rem'} gap={'1rem'} fontWeight={'700'} color={'var(--text)'} minWidth={'30rem'} h={'17rem'} p={'2rem'} bgColor={'var(--secondary)'} flexDir={'column'} w={'10rem'} fontSize={'22px'} borderRadius={'.5rem'}>
                              <Flex justifyContent={'space-between'}>
                                  <Text>LataoCard</Text>
                                  <Img w={'4rem'} src="../../public/nubank.png"/>
                              </Flex>
                              <Text>{formatInput(NewCard.cardNumber.toString())}</Text>
                              <Text>{dataValidade(NewCard.validity)}</Text>
                              <Text>{NewCard.propertyName.toUpperCase()}</Text>
                            </Flex>
                          </Flex>
                        )}
                        </Flex>
                        {!AddCard && (
                          <Flex flexDir={'column'} w={'30rem'} mx={'auto'} gap={'1rem'}>
                            <Button mt={'1rem'} VarColor="sucess" leftIcon={<FaPlus />} onClick={() => setAddCard(!AddCard)}>Caso queira adicionar um cartão clique aqui</Button>
                          </Flex>
                        )}
                        <Text background={'red'} color={'var(--text)'} borderRadius={'.5rem'} ml={'auto'} w={'13rem'} px={'1rem'} py={'.5rem'} border={'1px solid var(--alert)'} fontSize={'20px'} fontWeight={'700'}  mt={'2rem'} textAlign={'end'} mr={'1rem'}>Preço de <Text as={'span'}fontWeight={'900'}>R${parseFloat(Model.price.split('$')[1]) * SelectedPlaces.length}</Text></Text>
                    </>
                  )}
                  {ActiveStep === 3 && (
                    <Flex justifyContent={'center'} py={'4rem'} w={'100%'} overflowY={'hidden'}>
                      <Spinner
                        thickness='8px'
                        speed='0.65s'
                        emptyColor='green.500'
                        color='var(--light)'
                        height={'18rem'}
                        width='18rem'
                      />
                    </Flex>
                  )}
                  {ActiveStep !== 3 && (
                    <Flex w={'100%'} gap={'1rem'} justifyContent={'end'} mt={'1rem'}>
                      <Button VarColor="secondary" onClick={() => { if (ActiveStep !== 1) { setActiveStep(ActiveStep - 1) } else { nav('/') } }}>Cancelar</Button>
                      <Button VarColor="sucess" onClick={() => { setActiveStep(ActiveStep + 1); if (ActiveStep === 2) { ComprarPassagem() } }}>{ActiveStep !== 2 ? 'Próximo' : 'Finalizar'}</Button>
                    </Flex>
                  )}
            </Flex>
        </Body>
    )
}