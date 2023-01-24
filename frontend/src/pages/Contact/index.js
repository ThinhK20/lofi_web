import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { images } from "~/assets"
import styles from './Contact.module.scss'

const cx = classNames.bind(styles)

const Contact = () => { 

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
                <h1>Contact Us</h1> 
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Your name" />
                    <input type="email" placeholder="Your email" />
                    <input type="text" placeholder="Why are you contacting us ?" />
                    <input type="text" placeholder="Message" /> 
                    <button type="submit">Send</button>
                </form>
             </div>
        </div>
    )
}

export default Contact