import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { images } from "~/assets"
import styles from './HowItWorks.module.scss'

const cx = classNames.bind(styles)

const HowItWorks = () => { 

    const handleSubmit = (event) => {
        event.preventDefault()
        toast(`Sending successfully`, {
            theme: "dark",
            type: "success"
        })
    }

    return (
        <div className={cx('container')}>
            <Link to="/" className={cx('btn')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back to Home</span>
            </Link>
         
            <img src={images.anime_dancing} className={cx('image')} alt="Not Found image" />
            <div className={cx('box')}>
                <h1>How it works</h1> 
                <span>The techniques using in my website:
                    <ul>
                        <li>ReactJS</li>
                        <li>GridFs</li>
                        <li>ExpressJS</li>
                        <li>PassportJS</li>
                        <li>Redux</li>
                        <li>React Query</li>
                        <li>Tippy</li>
                        <li>JWT</li>
                        <li>Sending automatically email with Sendgrid Service</li>
                        <li>MongoDB</li>
                    </ul>
                </span>
             </div>
        </div>
    )
}

export default HowItWorks