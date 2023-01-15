import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import { images } from "~/assets"
import styles from './NotFound.module.scss'

const cx = classNames.bind(styles)

const NotFound = () => {
    return (
        <div className={cx('container')}>
            <Link to="/" className={cx('btn')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back to Home</span>
            </Link>
            <div className={cx('box')}>
                <h1>404</h1>
                <h2>Not Found</h2>
                <span>Uwaa....There's something wrong here. Maybe you lost in your way 😢 </span>
             </div>
            <img src={images.maintenance_img} className={cx('image')} alt="Not Found image" />
        </div>
    )
}

export default NotFound