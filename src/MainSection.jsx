import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import headerImg from "./assets/header-img.svg";
import TrackVisibility from 'react-on-screen';

export const MainSection = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = [ "Fullstack dev", "Web Developer", "Web Designer" ];
    const period = 2000;

    useEffect(() => {
        let ticker = setInterval(() => {
        tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
        setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setIndex(prevIndex => prevIndex - 1);
        setDelta(period);
        } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIndex(1);
        setDelta(500);
        } else {
        setIndex(prevIndex => prevIndex + 1);
        }
    }

    return (
    <section className="banner" id="home">
        <h1 className="tagline">PRUEBA TÉCNICA MAQUETACIÓN Y FRONT</h1>
        <Container>
            <Row className="row">
                <Col xs={12} md={6} xl={7}>
                    <TrackVisibility>
                    {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                        <h2>Hola! Soy Alejandro Henao y soy un <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Fullstack dev", "Web Developer", "Web Designer" ]'><span className="wrap">{text}</span></span></h2>
                        <p>Soy un desarrollador Colombiano apasionado por la tecnología y el arte de crear código útil y limpio. Me gusta estar en constante aprendizaje, soy un autodidacta que disfruta aprender de nuevas tecnologías, tendencias mundiales, negocios y productos innovadores y disruptivos, desarrollo ambiental entre otros.<br/> Soy graduado como tecnólogo en negocios internacionales pero la pasión por la tecnología me llevó a convertirme en un desarrollador fullstack certificado por la academia de Henry.</p>
                    </div>}
                    </TrackVisibility>
                </Col>
                {/* <Col >
                    <TrackVisibility>
                    {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                        <img src={headerImg} alt="Header Img"/>
                        </div>}
                    </TrackVisibility>
                </Col> */}
            </Row>
        </Container>
    </section>
  )
}
