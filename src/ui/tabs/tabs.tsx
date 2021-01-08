import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import classes from '@ui/tabs/tabs.module.scss';

export interface TabProps {
    index: number
    className?: string
    children?: JSX.Element | JSX.Element[]
    selected?: boolean
    onClick?: (index: number | string) => void
}

export const Tab: React.FC<TabProps> = ({ 
    index,
    children, 
    className, 
    selected = false,
    onClick = (index: number | string) => {} 
}: TabProps) => {

    function __onClick(index) {
        onClick(index);
    }

    return (
        <div 
            className={classNames(
                classes['tabs__tab'], 
                classes['tab'], 
                selected ? classes['tab_selected'] : '', 
                className
            )}
            onClick={onClick.bind(this, index)}
        >
            {children}
        </div>
    );
}

export interface TabPanelProps {
    value?: number
    index?: number
    className?: string
    children?: JSX.Element | JSX.Element | string
}

export const TabPanel: React.FC<TabPanelProps> = ({
    value,
    index,
    className,
    children
}: TabPanelProps) => {
    return (
        <div className={classNames(
            classes['tab-panel'],
            className
            )}
        >
            { value === index ? children : null }
        </div>
    );
}

export interface TabsProps {
    value: number
    className?: string
    children?: JSX.Element | JSX.Element[] 
    onChange?: (index: number) => void
}
 
export const Tabs: React.FC<TabsProps> = ({ 
    value,
    className, 
    children, 
    onChange = () => {}
}: TabsProps) => {

    const [val, setVal] = useState<number>(-1);
    
    function __onTabClick(index) {
        setVal(index);
        onChange(index);
    }

    useEffect(() => {
        setVal(value);
    }, [value])

    return (
        <div className={classNames(classes['tabs'], className)}>
            {
                React.Children.map(children, child => 
                    React.cloneElement(child as any, {
                        onClick: __onTabClick,
                        selected: (child as any).props.index === val
                    }
                ))
            }
        </div>
    );
}

export default Tabs;