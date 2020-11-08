interface IClassNames {
    [className: string]: string;
}

declare module '*.css' {
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.module.css' {
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.sass' {
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.module.sass' {
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.scss' {
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.module.scss' {
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.svg' {
    const classNames: ReactComponent;
    export default classNames;
}
