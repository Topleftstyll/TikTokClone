type ImageProps = {
    url: string,
    x: number,
    y: number
}

export default function({ url, x, y }: ImageProps) {
    return(
        <div>
            <img src={url} width={x} height={y} />
        </div>
    );
};