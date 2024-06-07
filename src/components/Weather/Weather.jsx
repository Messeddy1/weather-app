import styles from "./Weather.module.scss";
import { Card, CardTitle } from "react-bootstrap";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import PositionSvg from "../Svgs/PositionSvg";
import Time from "../Svgs/Time";
export const Weather = () => {
  const value = useSelector(({weather}) => weather);
  
  const displayTime = () => {
    const date = new Date();
    const dateH = date.getHours();
    let greeting;
    if (dateH >= 5 && dateH < 12) {
        greeting = "Good morning";
    } else if (dateH >= 12 && dateH < 17) {
        greeting = "Good afternoon";
    } else if (dateH >= 17 && dateH < 21) {
        greeting = "Good evening";
    } else {
      greeting = "Good night";
    }
    return greeting;
}
  return (
    <Fragment>
      <Card className={styles.container}>
        {value.isLoaded ? (
          <Card.Body>
            <Card.Title>
              {value.name} , {value.sys.country} <PositionSvg color={"#bbb"}/>
              <div className={styles.date}>
                <div>
                  <Moment format="dddd DD MMMM YYYY HH:mm"></Moment> <Time width={"20px"}/>
                </div>
              </div>
            </Card.Title>
            <Card.Text as={"div"} className={styles.weather_infos}>
              <div>
                <img src={`https://openweathermap.org/img/wn/${value.weather.icon}@2x.png`} alt="Cloude" />
              </div>
              <div className={styles.temperature}>
                <div>{value.main.feels_like}° C</div>
                <div>
                </div>
              </div>
              <div>
                {displayTime()} {value.name}
                <div className={styles.separator}></div>
              </div>
              <div className={styles.infos}>
                <div className={styles.border_right}>
                  <div>Sunrise</div>
                  <div>
                    <Moment unix={true} format="hh:mm">
                      {value.sys.sunrise}
                    </Moment>
                  </div>
                </div>
                <div className={styles.border_right}>
                  <div>Wind</div>
                  <div>{value.wind.speed}m/s</div>
                </div>
                <div>
                  <div>Temp</div>
                  <div>{value.main.temp_max}°C</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        ) : (
          <Card.Body>
            <CardTitle>Pleas Chose Your city</CardTitle>
          </Card.Body>
        )}
      </Card>
    </Fragment>
  );
};
