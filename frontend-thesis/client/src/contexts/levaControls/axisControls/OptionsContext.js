import React, {createContext, useEffect, useState} from 'react';
import { button, folder, useControls } from 'leva';
import { useLabels } from '../../labelsContext/LabelsContext';

const OptionsContext = createContext();
export const OptionsProvider = ({ children }) => {
    const [selectedOptionX, setSelectedOptionX] = useState('BPM');
    const [selectedOptionY, setSelectedOptionY] = useState('Mood');
    const [selectedOptionZ, setSelectedOptionZ] = useState('Instrument');

    const { OptionsLabels } = useLabels();


    const [, set] = useControls('axis controls', () => {

        const optionsX = OptionsLabels.slice(0, 2);
        const optionsY = OptionsLabels.slice(2, 4);
        const optionsZ = OptionsLabels.slice(4);

        return {
            xAxis: {
                options: ['remove axis', ...optionsX], // adding the new option to the previous
                value: selectedOptionX,
                onChange: (value) => setSelectedOptionX(value),
                label: 'x axis',
            },
            yAxis: {
                options: ['remove axis', ...optionsY],
                value: selectedOptionY,
                onChange: (value) => setSelectedOptionY(value),
                label: 'y axis',
            },
            zAxis: {
                options: ['remove axis', ...optionsZ],
                value: selectedOptionZ,
                onChange: (value) => setSelectedOptionZ(value),
                label: 'z axis',
            },


        };
    }, { collapsed: true } );



    return (
        <OptionsContext.Provider
            value={{
                selectedOptionX,
                selectedOptionY,
                selectedOptionZ,
            }}
        >
            {children}
        </OptionsContext.Provider>
    );
};

export function useOptions() {
    return React.useContext(OptionsContext)
}
