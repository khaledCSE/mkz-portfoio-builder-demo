import { FC } from 'react';
import parse from 'html-react-parser';

interface iProps {
    str: string;
}

export const NewLineToBr: FC<iProps> = (props) => {
    const { str } = props;
    const arr = str.split(/(?:\r\n|\r|\n)/g);
    const newArr = arr.map((item, index) => {
        if (index === 0) {
            return (
                <span key={index}>
                    {item} <br />{' '}
                </span>
            );
        }
        return (
            <span key={index}>
                {parse(item)} <br />
            </span>
        );
    });
    return <>{newArr}</>;
};
