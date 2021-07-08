type UIProps = {
    variant?: string;
    text?: string;
    bgImg?: string;
    classes?: string[];
    action?: (params: any) => any;
    value?: string | number;
    data?: { [key: string]: string | number };
    credits?: { author?: string; links?: string[]; description?: string; }
}

type IReduceCall = {
    type: string;
    payload?: string | number;
}