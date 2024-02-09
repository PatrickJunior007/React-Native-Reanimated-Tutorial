import React, {FC} from 'react';
import DropDownListItem from './subcomponent/DropDownListItem';
import {useSharedValue} from 'react-native-reanimated';

export type ItemProps = {
  label: string;
  iconName: string;
};

interface DropdownProps {
  header: ItemProps;
  options: ItemProps[];
}

const Dropdown: FC<DropdownProps> = ({header, options}) => {
  const dropdownItems = [header, ...options];
  const isExpanded = useSharedValue(false);
  return (
    <>
      {dropdownItems.map((item, index) => {
        return (
          <DropDownListItem
            item={item}
            index={index}
            key={index}
            dropDownItemCount={dropdownItems.length}
            isExpanded={isExpanded}
          />
        );
      })}
    </>
  );
};

export default Dropdown;
