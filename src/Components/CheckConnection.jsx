import React from "react";
import "../Styles/CheckConnection.scss";
import { Detector } from "react-detect-offline";
import noWifi from "../Assets/NoWiFi.png";
import offLine from "../Assets/OffLine.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next"
export default function CheckConnection(props) {
  const { t } = useTranslation();
  return (
    <>
      <Detector render={({ online }) => online ? (props.children) : (
            <>
              <Helmet>
                <title>{t('TitleNoConnection')}</title>
                <link rel="icon" href={noWifi} />
              </Helmet>

              <section>
                <figure data-aos='zoom-out' data-aos-duration="1000" data-aos-delay="50" >
                  <LazyLoadImage src={offLine} alt="OffLine" />
                  <h1>{t('TitleNoConnection')}</h1>
                </figure>
              </section>
            </>
          )
        }
      />
    </>
  )
}