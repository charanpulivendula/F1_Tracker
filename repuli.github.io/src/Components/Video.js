import React from 'react';
const Video = ({link,title})=>{
    return (
        <div class="ratio ratio-16x9">
            <iframe width="560" height="315" src={link} title={title} allowFullScreen></iframe>
        </div>
    );
}
export default Video;
