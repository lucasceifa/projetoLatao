import { Box, Flex, Text } from "@chakra-ui/react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import { IoAirplane } from "react-icons/io5"
import { formatarData } from "../../Utils/Helper"
import { iFlight } from "../../interfaces"
import { useEffect, useState } from "react"
import { appApi } from "../../services/appApi"
import { Button } from "../../components/Button"
import { FaDownload } from "react-icons/fa"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TicketPDF } from "./TicketPDF"


export const MyFlights: React.FC = () => {
    const [MyFlights, setMyFlights] = useState<iFlight[]>([])
    const [UserId, setUserId] = useState('')

    function GetFlights() {
        appApi.get('user/flight')
            .then((res) => { setMyFlights(res.data) })
            .catch(err => { console.log(err) })
        appApi.get('user')
            .then((res) => { setUserId(res.data._id) })
            .catch(err => { console.log(err) })
      }

      function GetPlaces(e: iFlight): string {
        let resp = ''
        e.place.forEach(a => { if (a.user_id === UserId) { a.user_places.forEach(response => resp = resp + (resp === '' ? '' : ', ') + response) } })
        return resp
      }

      useEffect(() => {
        GetFlights()
      }, [])

    return (
        <Body>
            <Header />
            <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} gap={'4rem'} mt={'5rem'}>
                {MyFlights.map(e => {
                return (
                    <Flex overflowY={'hidden'} pos={'relative'} flexDir={'column'} maxW={'105rem'} borderRadius={'1rem'} border={'1px solid var(--primary)'} p={'3rem'}>
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
                    <Flex alignItems={'end'} justifyContent={'space-between'} mt={'2rem'} >
                        <Flex gap={'.5rem'}>Seus assentos: <Text fontWeight={'700'}>{GetPlaces(e)}</Text></Flex>
                        <PDFDownloadLink document={<TicketPDF />} fileName="carta_agradecimento.pdf">  
                            <Button VarColor="sucess" leftIcon={<FaDownload/>}>Baixar ticket</Button>
                        </PDFDownloadLink>
                    </Flex>
                    </Flex>
                )
                })}
            </Flex>
        </Body>
    )
}