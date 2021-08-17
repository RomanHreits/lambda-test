import log4js, {configure} from "log4js";

configure({
        appenders: {
            'out': { type: 'console' },
            'err': { type: 'stderr' }
        },
        categories: {
            default: { appenders: ['out'], level: 'INFO' },
            err: { appenders: ['err'], level: 'ERROR' }
        },
    }
);

export const LOGGER = log4js.getLogger();
