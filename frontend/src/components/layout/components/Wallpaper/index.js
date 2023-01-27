import { memo, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg, { dataURLtoFile } from "./Functions/CropAvatarFunc";
import styles from "./WallpaperComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Wallpaper = ({imgUrl, onCropped, onShow, show}) => { 
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cropArea, setCropArea] = useState(); 


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCropArea(croppedAreaPixels);
    }, []);


    const handlePreviewImg = async () => {
        const canvas = await getCroppedImg(imgUrl, cropArea); 
        const file = dataURLtoFile(canvas.toDataURL(), "wallpaper.png");
		onCropped(URL.createObjectURL(file), file) 
		onShow(false) 
    }; 

	const handleCancel = () => {
		onCropped('', '')
		onShow(false)
	} 
    return ( 
		<>
			{imgUrl && show && 
				<div className={cx("container")}>
							<>
								<div className={cx("cropper")}>
									<Cropper
										image={imgUrl}
										crop={crop}
										zoom={zoom}
										objectFit='auto-cover'
										cropShape='rect'
										aspect={5 / 1} 
										onCropChange={setCrop}
										onZoomChange={setZoom}
										onCropComplete={onCropComplete}
									/>
								</div>
							</>
					<div className={cx('group-btn')}>
							<div className={cx('btn-choose')} onClick={handlePreviewImg}>Upload</div>
						<div className={cx('btn-cancel')} onClick={handleCancel} >Cancel</div>	
					</div>
				</div>
			}
		</>
    );
};

export default memo(Wallpaper);
