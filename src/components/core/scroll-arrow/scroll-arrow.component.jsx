import React from 'react';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

const ScrollArrow = () =>{

  return (
            <div>
                <ScrollUpButton 
                    EasingType="easeOutCirc"
                    AnimationDuration={900}
                    ShowAtPosition={500}
                />
            </div>
  );
}

export default ScrollArrow;