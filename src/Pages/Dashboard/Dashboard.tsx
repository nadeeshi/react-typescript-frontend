
import './Dashboard.scss';
import { Card } from "@mui/material";
import { Fade } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'

const DashboardPage = () => {

    const fadeImages = [
        "/Images/NR_hotel1.jpg",
        "/Images/NR_hotel2.PNG",
        "/Images/NR_hotel3.jpg"
    ];

    return (
        <>
            <Card sx={{ width: 600, height: 500 }}>
                <div className="slide-container" >
                    <Fade>
                        <div className="each-fade">
                            <img style={{ width: '100%' }} src={fadeImages[0]} />
                        </div>
                        <div className="each-fade">
                            <img style={{ width: '100%' }} src={fadeImages[1]} />
                        </div>
                        <div className="each-fade">
                            <img style={{ width: '100%' }} src={fadeImages[2]} />
                        </div>
                    </Fade>
                </div>
            </Card >
        </>
    )

}

export default DashboardPage;