import React, { FC } from 'react';

import TextDataType from '../../types/textDataType';

interface Props {
    textData: TextDataType[];
    className?: string;
}

const DataSplitBetween: FC<Props> = ({ textData, className }) => {
  return (
        <div className={`text-wrap text-break ${className}`}>
            {textData.map((row: TextDataType, index: number) => (
                <div key={index} className='d-flex my-2 flex-column flex-md-row justify-content-between'>
                    <p className='m-0'>{row.text}</p>
                    <p className='m-0'>{row.data}</p>
                </div>
            ))}
        </div>
  );
};

export default DataSplitBetween;
