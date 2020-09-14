import React from 'react';
import { Image } from 'cloudinary-react';

import { CLOUD_NAME } from '../../../config'

const ShowImage = ({ id, height = 250, width = 250 }) => (
    <div >
        <div className="card-image">
            <Image 
                className="mb-3"
                publicId={id}
                alt="item-pic"
                cloudName={CLOUD_NAME}
                height={height}
                width={width}
            />
        </div>
    </div>
);

export default ShowImage;