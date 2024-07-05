import { create } from 'pinch-zoom-pan';
import './pinch-zoom-pan.css';
import { useEffect } from 'react';

const PinchZoomPan = ({ children }) => {
    useEffect(() => {
        create({
            element: document.getElementById('pzp'),
            minZoom: 0.5,
            maxZoom: 2,
            captureWheel: true,
        });
    });

    return (
        <div className="pzp" id="pzp">
            <div className="point">
                <div className="canvas">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PinchZoomPan;