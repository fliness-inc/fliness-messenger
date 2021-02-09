import React from 'react';
import classNames from 'classnames';
import classes from '@ui/skeleton/skeleton.module.scss';

export interface SkeletonProps {
  className?: string;
  width: string;
  height: string;
  radius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  radius = '4px',
}: SkeletonProps) => {
  return (
    <span
      className={classNames(
        classes['skeleton'],
        classes['skeleton-pulse'],
        className
      )}
      style={{ width, height, borderRadius: radius }}
    ></span>
  );
};

export default Skeleton;
