import CircleIcon from '@/assets/images/svg/CircleIcon';
import React, { memo } from 'react';
import { Spacing } from '@/shared/constants/spacing';

interface IProps {
  num: number;
}

const CirtsxcleIcon = ({ num }: IProps) => {
  return <CircleIcon size={Spacing.SPACING_16} number={num} />;
};

export default memo(CirtsxcleIcon);
