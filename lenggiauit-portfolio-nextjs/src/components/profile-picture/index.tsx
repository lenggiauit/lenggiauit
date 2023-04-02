'use client';
import React from "react"; 

type Props  = {
    openToWork: boolean
} 
const ProfilePicture: React.FC<Props> = ({ openToWork }) => {

    const audioRef = React.createRef<HTMLAudioElement>(); 
    const onClickPronunciation: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        audioRef.current?.play();
    }

    return (
        <>
            <figure className="img-profile">
                <img src="/assets/images/GiauLe.jpg" alt="" />
                <div className="name-profile">
                    <span className="name">Giau Le</span><span className="pronoun">(He/Him)</span>
                    <span className="name-pronunciation" onClick={onClickPronunciation} >
                        <i className="bi bi-volume-up" style={{ fontSize: 22 }}></i>
                        <audio controls ref={audioRef}>
                            <source src="/assets/audio/giaule.mp3" type="audio/mpeg" />
                        </audio>
                    </span>
                </div>
                { openToWork &&
                    <figcaption className="profile-status">
                        <span>#OPENTOWORK</span>
                    </figcaption>
                }
            </figure>
        </>
    );
}

export default ProfilePicture;