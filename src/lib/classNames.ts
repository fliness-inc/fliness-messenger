
export const classNames = (...args: string[]): string => {
	return [...args].join(' ');
}

export default classNames;