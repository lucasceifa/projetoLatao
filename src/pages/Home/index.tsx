import { Box, Img } from "@chakra-ui/react"
import { Body } from "../../components/Body/Index"
import { Header } from "../../components/Header/Index"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MouseEventHandler } from "react";

export const Home: React.FC = () => {


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
        </Box>
    </Body>
    )
}