import React from 'react';
import { Image } from 'cloudinary-react';

const ShowImage = ({ item }) => (
    <div >
        <div className="card-image">
            <Image 
                className="mb-3"
                publicId={item.pic.cloudinary_id}
                alt="item-pic"
                cloudName='dexkk3lc4'
                height='250'
                width='250'
            />
        </div>
    </div>
);

export default ShowImage;