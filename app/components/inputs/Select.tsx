'use client';

import React from 'react';
import ReactSelect from 'react-select';

interface SelectProps {
  disabled?: boolean;
  label: string;
  options: Record<string, any>[];
  onChange: (arg: Record<string, any>) => void;
  value?: Record<string, any>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className='z-[100]'>
      <label
        className='
        block
        text-sm
        font-medium
        leading-6
        text-gray-900
      '
      >
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{ control: () => 'text-sm' }}
        />
      </div>
    </div>
  );
};
