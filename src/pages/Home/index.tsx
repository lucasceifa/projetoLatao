/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, FormLabel, Img, Input, InputGroup, InputLeftElement, Switch, Text } from "@chakra-ui/react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoAirplane } from 'react-icons/io5';
import { MouseEventHandler, useEffect, useState } from "react";
import './styles.css'
import { Button } from "../../components/Button";
import { iFlight } from "../../interfaces";
import { formatarData } from "../../Utils/Helper";
import { BsFillBagFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { appApi } from "../../services/appApi";

export const Home: React.FC = () => {

    const nav = useNavigate()

    const CustomPrevArrow = (props: { onClick: MouseEventHandler<HTMLDivElement> | undefined; }) => {
        return (
          <div className="custom-prev-arrow" onClick={props.onClick}>
            <FaArrowLeft size={32}/>
          </div>
        );
      };
      
      const CustomNextArrow = (props: { onClick: MouseEventHandler<HTMLDivElement> | undefined; }) => {
        return (
          <div className="custom-next-arrow" onClick={props.onClick}>
            <FaArrowRight size={32}/> {/* Ícone ou imagem de seta para a direita */}
          </div>
        );
      };

    const settings = {
        dots: true, 
        infinite: true,
        speed: 500, 
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow onClick={undefined} />,
        nextArrow: <CustomNextArrow onClick={undefined} />,
      };

      const imgs = ['https://www.jetsetter.com//uploads/sites/7/2018/04/Yq6ObbTP-1380x690.jpeg', 'https://media.cntraveler.com/photos/607ef41f211142d4f98867a3/3:2/w_2560%2Cc_limit/Will%2520Cheaper%2520Pandemic%2520Airfares%2520Last%2520through%2520the%2520Summer_GettyImages-1140598797.jpg', 'https://media.cntraveler.com/photos/5fd26c4ddf72876c320b8001/16:9/w_2560%2Cc_limit/952456172']

      const [Flights, setFlights] = useState<iFlight[]>([{ airportTag: '', baggageWeight: '', company: '', finalDestination: { cityName: '', cityTag: '', country: '', _id: '', zipcode: '' }, flightNumber: 0, goingDate: '', _id: '0', price: '', returnDate: '', startDestination: { cityName: '', cityTag: '', country: '', _id: '', zipcode: '' } }])
      const [FilterFlights, setFilterFlights] = useState<iFlight[]>([])

      const [ReturnDate, setReturnDate] = useState('')
      const [GoingDate, setGoingDate] = useState('')
      const [OriginCity, setOriginCity] = useState('')
      const [DestinationCity, setDestinationCity] = useState('')

      const [DestinationOff, setDestinationOff] = useState(false)
      const [DateOff, setDateOff] = useState(false)


      function OnFilterFlights(): void {
        var copy: iFlight[] = Flights 
        if (OriginCity !== '') {
          copy = copy.filter(e => { return e.startDestination.cityName.toLowerCase().includes(OriginCity.toLowerCase())})
        }
        if (DestinationCity !== '') {
          copy = copy.filter(e => { return e.finalDestination.cityName.toLowerCase().includes(DestinationCity.toLowerCase())})
        }
        if (GoingDate !== '') {
          copy = copy.filter(e => { return e.goingDate.substring(0, 10) === GoingDate })
        }
        if (ReturnDate !== '') {
          copy = copy.filter(e => { return e.returnDate.substring(0, 10) === ReturnDate })
        }
        setFilterFlights(copy)
      }

      function GetFlights() {
        appApi.get('flight')
          .then(res => { setFlights(res.data); setFilterFlights(res.data) })
          .catch(err => console.log(err))
      }

      useEffect(() => {
        GetFlights()
      }, [])

      useEffect(() => {
        setDestinationCity('')
      }, [DestinationOff])

      useEffect(() => {
        setGoingDate('')
        setReturnDate('')
      }, [DateOff])

    return (
    <Body>
        <Header />
        <Box maxW={'1800px'} mx={'auto'}>
            <Slider {...settings} className="overflowY">
                {imgs.map(e => {
                    return (
                        <Box h={'38rem'} overflowY={'hidden'}>
                            <Img src={e} w={'100%'} objectFit={'cover'} mx={'auto'}/>
                        </Box>
                    )
                })}
            </Slider>
            <Box mb={'.25rem'} backgroundColor={'var(--text)'} w={'1600px'} mt={'-.5rem'} borderRadius={'1rem'} boxShadow={'var(--ShadowBtns)'} display={'flex'} flexDir={'column'} px={'1rem'} py={'2rem'}  mx={'auto'}>
                <Flex justifyContent={'space-between'} px={'4rem'} alignItems={'flex-end'}>
                  <Flex gap={'4rem'}>
                    <Flex flexDir={'column'} gap={'.5rem'}>
                        <FormLabel>
                          Cidade de origem
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none'>
                            <FaLocationDot color='var(--black)' />
                          </InputLeftElement>
                          <Input value={OriginCity} onChange={(e) => setOriginCity(e.target.value)} type='text' placeholder='Cidade de origem' />
                        </InputGroup>
                    </Flex>
                    <Flex flexDir={'column'} gap={'.5rem'}>
                        <FormLabel>
                          Cidade de destino
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents='none'>
                            <FaLocationDot color='var(--black)' />
                          </InputLeftElement>
                          <Input isDisabled={DestinationOff} value={DestinationCity} onChange={(e) => setDestinationCity(e.target.value)} type='text' placeholder='Cidade de destino' />
                        </InputGroup>
                    </Flex>
                    <Flex flexDir={'column'} gap={'.5rem'}>
                        <FormLabel>
                          Data de ida
                        </FormLabel>
                        <Input isDisabled={DateOff} value={GoingDate} onChange={(e) => setGoingDate(e.target.value)} type='date' w={'16rem'}/>
                    </Flex>
                    <Flex flexDir={'column'} gap={'.5rem'}>
                        <FormLabel>
                          Data de volta
                        </FormLabel>
                        <Input isDisabled={DateOff} value={ReturnDate} onChange={(e) => setReturnDate(e.target.value)} type='date' w={'16rem'}/>
                    </Flex>
                  </Flex>
                  <Button fontSize={'18px'} onClick={OnFilterFlights} leftIcon={<FaSearch size={14}/>} VarColor="primary">Buscar</Button>
                </Flex>
                <Flex fontWeight={'700'} gap={'2rem'} px={'4rem'} mt={'1.5rem'}>
                  <Flex gap={'1rem'} alignItems={'center'}>
                    <Switch onChange={(e) => { e.target.checked ? setDestinationOff(true) : setDestinationOff(false) }}/>
                    Ainda não defini o destino final
                  </Flex>
                  <Flex gap={'1rem'} alignItems={'center'}>
                    <Switch onChange={(e) => { e.target.checked ? setDateOff(true) : setDateOff(false) }}/>
                    Ainda não defini as datas
                  </Flex>
                </Flex>
            </Box>
        </Box>
        <Flex flexDir={'column'} gap={'3rem'} w={'1600px'} mx={'auto'} my={'2rem'}>
            {FilterFlights.map(e => {
              return (
                <Flex overflowY={'hidden'} pos={'relative'} flexDir={'column'} borderRadius={'1rem'} border={'1px solid var(--primary)'} p={'3rem'}>
                  <Flex justifyContent={'space-between'} gap={'2rem'}>
                    <Flex gap={'4.5rem'}>
                      <Flex flexDir={'column'} gap={'.25rem'}>
                        <Text>Companhia: {e.company}</Text>
                        <Text>Aeroporto: {e.airportTag}</Text>
                        <Text>Número do voo: {e.flightNumber}</Text>
                        <Text>Embarque: {e.startDestination.cityName} - {e.startDestination.cityTag}, {e.startDestination.zipcode} </Text>
                        <Text>País: {e.startDestination.country}</Text>
                      </Flex>
                      <Flex flexDir={'column'} w={'10rem'} alignItems={'center'} justifyContent={'center'} fontWeight={'700'}>
                        <Text>IDA: {formatarData(e.goingDate)}</Text>
                        <IoAirplane size={80}/>
                      </Flex>
                      <Flex flexDir={'column'}>
                        <Text>Desembarque: {e.finalDestination.cityName} - {e.finalDestination.cityTag}, {e.finalDestination.zipcode}</Text>
                        <Text>País: {e.finalDestination.country}</Text>
                      </Flex>
                    </Flex>
                    <Box w={'2px'} h={'13.5rem'} pos={'absolute'} top={'20px'} left={'50%'} transform={'translate(-50%, 0)'} bgColor={'var(--black35)'}></Box>
                    <Flex gap={'3rem'}>
                      <Flex flexDir={'column'} gap={'.25rem'}>
                        <Text>Companhia: {e.company}</Text>
                        <Text>Aeroporto: {e.airportTag}</Text>
                        <Text>Número do voo: {e.flightNumber}</Text>
                        <Text>Embarque: {e.finalDestination.cityName} - {e.finalDestination.cityTag}, {e.finalDestination.zipcode}</Text>
                        <Text>País: {e.finalDestination.country}</Text>
                      </Flex>
                      <Flex flexDir={'column'} w={'11rem'} alignItems={'center'} justifyContent={'center'} fontWeight={'700'}>
                        <Text>VOLTA: {formatarData(e.returnDate)}</Text>
                        <IoAirplane size={80}/>
                      </Flex>
                      <Flex flexDir={'column'}>
                        <Text>Desembarque: {e.startDestination.cityName} - {e.startDestination.cityTag}, {e.startDestination.zipcode}</Text>
                        <Text>País: {e.startDestination.country}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex alignItems={'end'} justifyContent={'space-between'} mt={'1rem'}>
                    <Text fontWeight={'700'}>Limite de bagagem: {e.baggageWeight}</Text>
                    <Text fontWeight={'700'} color={'var(--alert)'}>GANHE ATÉ {parseFloat(e.price.split('$')[1]) * 1.25} PONTOS COM ESSA VIAGEM!</Text>
                    <Flex flexDir={'column'} gap={'1rem'} alignItems={'center'}>
                      <Text fontWeight={'700'} color={'var(--sucess)'} fontSize={'20px'}>
                        {e.price}
                      </Text>
                      <Button VarColor="primary" leftIcon={<BsFillBagFill />} onClick={() => nav(`/Compra/${e._id}`)}>Comprar passagem</Button>
                    </Flex>
                  </Flex>
                </Flex>
              )
            })}
        </Flex>
    </Body>
    )
}