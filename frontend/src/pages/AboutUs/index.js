import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { images } from "~/assets"
import styles from './AboutUs.module.scss'

const cx = classNames.bind(styles)

const AboutUs = () => {
    return (
        <div className={cx('container')}>
            <Link to="/" className={cx('btn')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back to Home</span>
            </Link>
         
            <img src={images.anime_dancing} className={cx('image')} alt="Not Found image" />
            <div className={cx('box')}>
                <h1>About Us</h1>
                <span>When I was a student, I understand how difficult it is to just sit your desk and focus about your work 🤔. In that case, I usually set up my workplace with lofi music on youtube 😊. With this inspiration, I created this project to help you fix this with lofi songs, calming ambient sounds, peaceful background and easy-to-use tools to adjust by individual. </span>
                <span>Well........All the above sentences are written on <a href="https://app.lofi.co" alt="Link to lofi.co">Lofi.co</a> and I just copied that 😝. This project is created for purpose studying. If you want me to remove this project, please contact with me by email: <a href="mailto:thinhnguyent.2002@gmail.com" alt="email-contact">thinhnguyent.2002@gmail.com</a>.</span>
                <span>Lastly, I hope you will have more enjoyable experiences in my website. Have a nice day and good luck ♥️ </span>
             </div>
        </div>
    )
}

export default AboutUs