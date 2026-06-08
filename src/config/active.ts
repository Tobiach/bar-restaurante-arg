let _config: any = null;
let _data: any = null;

export const setActiveConfig = (c: any) => { _config = c; };
export const getConfig = () => _config;

export const setActiveData = (d: any) => { _data = d; };
export const getActiveData = () => _data;
